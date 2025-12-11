'use server'

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(formData: FormData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const id = user.id;
  const first_name = formData.get('first_name') as string;
  const last_name = formData.get('last_name') as string;
  const phone = formData.get('phone') as string;
  const birth_date = formData.get('birth_date') as string;

  const { error } = await supabase
    .from('profiles')
    .update({ first_name, last_name, phone, birth_date })
    .eq('id', id);

  if (error) {
    console.error('Error updating profile:', error);
    // You might want to return a more user-friendly error message
    return { success: false, message: 'Profil güncellenirken bir hata oluştu.' };
  }

  revalidatePath('/account'); // Revalidate the account page to show updated data
  return { success: true, message: 'Profil başarıyla güncellendi!' };
}
