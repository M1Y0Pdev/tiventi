'use server'

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { CartItem } from '@/types';
import { generatePayTRParameters } from '@/lib/paytr'; // PayTR yardımcı fonksiyonu

export async function placeOrder(selectedAddressId: number, cartItems: CartItem[], userIp: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  if (!selectedAddressId) {
    return { success: false, message: 'Lütfen bir teslimat adresi seçin.' };
  }

  if (!cartItems || cartItems.length === 0) {
    return { success: false, message: 'Sepetiniz boş.' };
  }

  // Fetch selected address details
  const { data: addressData, error: addressError } = await supabase
    .from('user_addresses')
    .select('*')
    .eq('id', selectedAddressId)
    .eq('user_id', user.id) // Ensure address belongs to user
    .single();

  if (addressError || !addressData) {
    console.error('Error fetching selected address:', addressError);
    return { success: false, message: 'Seçilen adres bulunamadı veya bir hata oluştu.' };
  }

  let totalPrice = 0;
  cartItems.forEach(item => {
    totalPrice += item.product.price * item.quantity;
  });

  // 1. Create the Order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_price: totalPrice,
      status: 'pending', // Initial status
      shipping_address: addressData, // Snapshot of the address
    })
    .select('id')
    .single();

  if (orderError || !order) {
    console.error('Error creating order:', orderError);
    return { success: false, message: 'Sipariş oluşturulurken bir hata oluştu.' };
  }

  // 2. Create Order Items
  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product.id,
    quantity: item.quantity,
    price_at_purchase: item.product.price,
    // Store size and color for order items too, if needed for records (recommended)
  }));

  const { error: orderItemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (orderItemsError) {
    console.error('Error creating order items:', orderItemsError);
    // Rollback order if order items fail? For simplicity, we'll just log for now.
    return { success: false, message: 'Sipariş kalemleri oluşturulurken bir hata oluştu.' };
  }

  // 3. Clear User's Cart
  const { error: clearCartError } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id);

  if (clearCartError) {
    console.error('Error clearing cart:', clearCartError);
  }

  // 4. Generate PayTR Parameters
  const paytrProducts = cartItems.map(item => ({
    name: item.product.name,
    price: Math.round(item.product.price * 100), // PayTR expects amount in cents/kurus
    qty: item.quantity,
  }));

  const paytrCustomer = {
    email: user.email!, // Email is guaranteed to exist for logged-in user
    name: addressData.full_name.split(' ')[0] || '',
    surname: addressData.full_name.split(' ').slice(1).join(' ') || '',
    phone: addressData.phone,
  };

  const paytrAddress = {
    address: `${addressData.address_line1} ${addressData.address_line2 || ''}`,
    city: addressData.city,
    district: addressData.state || '', // Use state for district
  };

  // !!! IMPORTANT: Get User IP from request headers on the client, then pass it here


  try {
    const paytrParams = generatePayTRParameters(
      order.id,
      Math.round(totalPrice * 100), // Total amount in kurus/cents
      paytrProducts,
      paytrCustomer,
      paytrAddress,
      userIp // Needs to be real user IP
    );
    // Server Action returns parameters for client to POST to PayTR
    return { success: true, message: 'Sipariş başarıyla oluşturuldu!', paytrParams, orderId: order.id };
  } catch (paytrError: any) {
    console.error('Error generating PayTR parameters:', paytrError);
    return { success: false, message: `PayTR ödeme hazırlanırken bir hata oluştu: ${paytrError.message}` };
  }
}