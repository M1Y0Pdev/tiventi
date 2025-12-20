import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AccountClientPage from './AccountClientPage' // We will extract client logic here

// Define a basic Profile type for now, ideally this would be in types/index.ts
interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  birth_date: string | null; // Assuming DATE type from DB will be string
  avatar_url: string | null;
  created_at: string;
}

interface Order {
    id: string;
    date: string;
    total: string;
    status: string;
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: { tab: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch the user's profile data
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
      console.error('Error fetching profile:', profileError);
      // If profile not found (e.g., new user before trigger fires profile), create a minimal one.
      if (profileError.code === 'PGRST116') { // PGRST116 means "exact one row not found"
          const { error: insertError } = await supabase.from('profiles').insert({ id: user.id, email: user.email });
          if (insertError) console.error("Error creating fallback profile:", insertError);
          // Try fetching again, or use a default, or redirect with error
          return redirect('/login?error=profile_missing'); // Redirect to avoid infinite loop
      }
  }

  // Fetch the user's orders
  const { data: ordersData, error: ordersError } = await supabase
    .from('orders')
    .select('id, created_at, total_price, status') // Select basic order info
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (ordersError) {
      console.error('Error fetching orders:', ordersError);
  }

  const userOrders: Order[] = ordersData ? ordersData.map(order => ({
      id: order.id.toString(),
      date: new Date(order.created_at).toLocaleDateString('tr-TR'), // Format date for display
      total: `${order.total_price.toFixed(2)} TL`,
      status: order.status,
  })) : [];


  const activeTab = searchParams.tab || 'profile'

  const getInitials = (email: string) => {
    const name = email.split('@')[0]
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom">
          <div
            className="flex items-center gap-6"
          >
            <div className="w-20 h-20 bg-tiventi-orange rounded-full flex items-center justify-center text-3xl font-bold">
              {getInitials(user.email || 'UU')}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Hesabım</h1>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* This component will now handle client-side interactions */}
          <AccountClientPage 
            activeTab={activeTab} 
            userEmail={user.email || ''} 
            initialProfile={profileData as Profile || { id: user.id, email: user.email, first_name: null, last_name: null, phone: null, birth_date: null, avatar_url: null, created_at: user.created_at }}
            orders={userOrders}
          />
        </div>
      </section>
    </div>
  )
}
