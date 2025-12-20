'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // This will redirect the user to the home page if they are already
      // logged in, or after they have successfully signed in.
      if (session) {
        router.push('/')
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  return (
    <div className="pt-32 pb-12 flex justify-center items-start">
        <div className="w-full max-w-md p-8 mx-4 space-y-6 bg-white rounded-lg shadow-xl">
            {/* The Auth component renders a complete login/signup form */}
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={[]} // Starting with email and password only
                localization={{
                  variables: {
                    sign_in: {
                      email_label: 'Email address',
                      password_label: 'Password',
                    },
                    sign_up: {
                      email_label: 'Email address',
                      password_label: 'Password',
                    }
                  }
                }}
            />
        </div>
    </div>
  )
}
