'use server'

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function addAddress(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const userId = user.id;
  const title = formData.get('title') as string;
  const fullName = formData.get('full_name') as string;
  const phone = formData.get('phone') as string;
  const addressLine1 = formData.get('address_line1') as string;
  const addressLine2 = formData.get('address_line2') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const zipCode = formData.get('zip_code') as string;
  const country = formData.get('country') as string;
  const isDefault = formData.get('is_default') === 'on';

  // If new address is set as default, clear existing default for this user
  if (isDefault) {
    await supabase.from('user_addresses').update({ is_default: false }).eq('user_id', userId).eq('is_default', true);
  }

  const { error } = await supabase.from('user_addresses').insert({
    user_id: userId,
    title,
    full_name: fullName,
    phone,
    address_line1: addressLine1,
    address_line2: addressLine2 || null, // Allow null
    city,
    state,
    zip_code: zipCode || null, // Allow null
    country,
    is_default: isDefault,
  });

  if (error) {
    console.error('Error adding address:', error);
    return { success: false, message: 'Adres eklenirken bir hata oluştu.' };
  }

  revalidatePath('/account'); // Revalidate account page to update addresses
  return { success: true, message: 'Adres başarıyla eklendi!' };
}

export async function updateAddress(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const addressId = formData.get('id') as string;
  const title = formData.get('title') as string;
  const fullName = formData.get('full_name') as string;
  const phone = formData.get('phone') as string;
  const addressLine1 = formData.get('address_line1') as string;
  const addressLine2 = formData.get('address_line2') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const zipCode = formData.get('zip_code') as string;
  const country = formData.get('country') as string;
  const isDefault = formData.get('is_default') === 'on';

  // If updated address is set as default, clear existing default for this user (excluding this address)
  if (isDefault) {
    await supabase.from('user_addresses').update({ is_default: false }).eq('user_id', user.id).eq('is_default', true).neq('id', addressId);
  }

  const { error } = await supabase.from('user_addresses').update({
    title,
    full_name: fullName,
    phone,
    address_line1: addressLine1,
    address_line2: addressLine2 || null,
    city,
    state,
    zip_code: zipCode || null,
    country,
    is_default: isDefault,
  })
  .eq('id', addressId)
  .eq('user_id', user.id); // Ensure user can only update their own addresses

  if (error) {
    console.error('Error updating address:', error);
    return { success: false, message: 'Adres güncellenirken bir hata oluştu.' };
  }

  revalidatePath('/account');
  return { success: true, message: 'Adres başarıyla güncellendi!' };
}

export async function deleteAddress(addressId: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { error } = await supabase
    .from('user_addresses')
    .delete()
    .eq('id', addressId)
    .eq('user_id', user.id); // Ensure user can only delete their own addresses

  if (error) {
    console.error('Error deleting address:', error);
    return { success: false, message: 'Adres silinirken bir hata oluştu.' };
  }

  revalidatePath('/account');
  return { success: true, message: 'Adres başarıyla silindi!' };
}

export async function setDefaultAddress(addressId: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Clear existing default for this user
  await supabase.from('user_addresses').update({ is_default: false }).eq('user_id', user.id).eq('is_default', true);

  // Set new default
  const { error } = await supabase.from('user_addresses').update({ is_default: true })
    .eq('id', addressId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error setting default address:', error);
    return { success: false, message: 'Varsayılan adres belirlenirken bir hata oluştu.' };
  }

  revalidatePath('/account');
  revalidatePath('/checkout'); // Revalidate checkout page as well, in case it uses default address
  return { success: true, message: 'Varsayılan adres başarıyla belirlendi!' };
}
