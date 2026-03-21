import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'admin@maxijobber.de').split(',')

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 })
  }

  const { id, action } = await request.json()
  const service = createServiceClient()

  const updates =
    action === 'approve'
      ? { status: 'approved', verified: true }
      : { status: 'rejected', verified: false }

  const { error } = await service.from('profiles').update(updates).eq('id', id)
  if (error) return NextResponse.json({ error: 'Update fehlgeschlagen' }, { status: 500 })

  return NextResponse.json({ success: true })
}
