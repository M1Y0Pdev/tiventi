'use client'

import { useCart } from '@/context/CartProvider'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import CheckoutAddressForm from '@/components/CheckoutAddressForm'; // New component for address selection
import { placeOrder } from '@/app/checkout/order-actions'; // Import the Server Action
import { getUserIp } from '@/lib/actions/get-ip'; // Import the new Server Action to get IP

// Define UserAddress type here for now, ideally this should be in types/index.ts
interface UserAddress {
    id: number;
    title: string | null;
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    state: string | null;
    zip_code: string | null;
    country: string;
    is_default: boolean;
}

export default function CheckoutPage() {
  const { cartItems, cartCount, totalPrice, isLoading, clearCart } = useCart();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null); // To store user from auth
  const [addresses, setAddresses] = useState<UserAddress[]>([]); // To store user addresses
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderMessage, setOrderMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const checkUserAndCart = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (isLoading) return; // Wait for cart to load

      if (!currentUser) {
        // Redirect to login if not logged in
        router.push('/login?redirect=/checkout');
        return;
      }
      
      if (cartItems.length === 0 && !isLoading) {
        // Redirect to cart if cart is empty
        router.push('/cart');
        return;
      }

      // Fetch addresses if user is logged in
      const { data: userAddresses, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching addresses:', error);
      } else {
        setAddresses(userAddresses as UserAddress[]);
        const defaultAddress = userAddresses.find(addr => addr.is_default);
        if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);
        } else if (userAddresses.length > 0) {
            setSelectedAddressId(userAddresses[0].id); // Select first if no default
        }
      }
    };

    checkUserAndCart();
  }, [isLoading, cartItems, router, supabase]);

  const handlePlaceOrder = async () => {
    setOrderLoading(true);
    setOrderMessage(null);

    if (cartItems.length === 0) {
        setOrderMessage({ type: 'error', text: 'Sepetiniz boş.' });
        setOrderLoading(false);
        return;
    }

    if (!selectedAddressId) {
        setOrderMessage({ type: 'error', text: 'Lütfen bir teslimat adresi seçin.' });
        setOrderLoading(false);
        return;
    }

    // 1. Get User IP
    const userIp = await getUserIp();

    // 2. Call the Server Action
    const result = await placeOrder(selectedAddressId, cartItems, userIp);

    if (result.success) {
        setOrderMessage({ type: 'success', text: result.message });
        clearCart(); // Clear the client-side cart after order is placed
        
        // 3. Redirect to PayTR (if parameters are provided)
        if (result.paytrParams) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://www.paytr.com/odeme/guvenli/pos.js'; // PayTR payment gateway URL
            form.target = '_self'; // Open in the same window

            for (const key in result.paytrParams) {
                if (Object.prototype.hasOwnProperty.call(result.paytrParams, key)) {
                    const hiddenField = document.createElement('input');
                    hiddenField.type = 'hidden';
                    hiddenField.name = key;
                    hiddenField.value = (result.paytrParams as any)[key]; // Type assertion to access value
                    form.appendChild(hiddenField);
                }
            }
            document.body.appendChild(form);
            form.submit(); // Submit the form to PayTR
        } else {
            router.push(`/checkout/success?orderId=${result.orderId}`); // Fallback if no paytrParams (e.g., test mode)
        }
    } else {
        setOrderMessage({ type: 'error', text: result.message });
    }
    setOrderLoading(false);
  };

  if (isLoading || !user || cartItems.length === 0) {
    // Show a loading/redirecting state
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p>Yükleniyor veya yönlendiriliyor...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">Ödeme Sayfası</h1>
        {orderMessage && (
            <div className={`p-4 mb-4 rounded-lg text-white ${orderMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                {orderMessage.text}
            </div>
        )}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Adres ve Ödeme Bilgileri */}
          <div className="lg:col-span-2 space-y-8">
            {/* Adres Bölümü */}
            <CheckoutAddressForm initialAddresses={addresses} onSelectAddress={setSelectedAddressId} selectedAddressId={selectedAddressId}/>

            {/* Ödeme Yöntemi */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 border-b pb-4">Ödeme Yöntemi</h2>
              {/* PayTR integration will redirect, no in-page display here */}
              {/* Buraya ödeme yöntemi seçim bileşenleri gelecek */}
            </div>
          </div>

          {/* Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-24">
              <h2 className="text-xl font-semibold mb-4 border-b pb-4">Sipariş Özeti</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{item.product.name} ({item.selectedSize}, {item.selectedColor}) x {item.quantity}</span>
                    <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Ara Toplam</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Kargo</span>
                  <span>{formatPrice(0)}</span> {/* Şimdilik 0 */}
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2">
                  <span>Toplam</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <button onClick={handlePlaceOrder} disabled={orderLoading || !selectedAddressId} className="w-full mt-6 bg-tiventi-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50">
                {orderLoading ? 'Sipariş Oluşturuluyor...' : 'Siparişi Tamamla'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}