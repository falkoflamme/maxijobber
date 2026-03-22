import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'admin@maxijobber.de').split(',')

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type') as 'company' | null

  if (code) {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && user) {
      // Admin check
      if (ADMIN_EMAILS.includes(user.email || '')) {
        return NextResponse.redirect(`${origin}/admin`)
      }

      // Company flow
      if (type === 'company') {
        const service = createServiceClient()
        const { data: company } = await service
          .from('company_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (!company) {
          return NextResponse.redirect(`${origin}/unternehmen/einrichten`)
        }
        return NextResponse.redirect(`${origin}/unternehmen/dashboard`)
      }

      // Default fallback
      return NextResponse.redirect(`${origin}/`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_fehler`)
}
