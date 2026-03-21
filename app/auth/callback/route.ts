import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type') as 'worker' | 'company' | null

  if (code) {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && user) {
      // Check if profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, type, onboarding_complete')
        .eq('user_id', user.id)
        .single()

      if (!profile) {
        // New user — create profile with type from registration
        const profileType = type || 'worker'
        await supabase.from('profiles').insert({
          user_id: user.id,
          type: profileType,
          full_name: user.email?.split('@')[0] || '',
          city: 'Frankfurt',
        })

        const redirectPath = profileType === 'worker' ? '/profil/erstellen' : '/anfrage/neu'
        return NextResponse.redirect(`${origin}${redirectPath}`)
      }

      // Existing user
      if (!profile.onboarding_complete) {
        const redirectPath = profile.type === 'worker' ? '/profil/erstellen' : '/anfrage/neu'
        return NextResponse.redirect(`${origin}${redirectPath}`)
      }

      const dashPath = profile.type === 'worker' ? '/dashboard/profi' : '/dashboard/unternehmen'
      return NextResponse.redirect(`${origin}${dashPath}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_fehler`)
}
