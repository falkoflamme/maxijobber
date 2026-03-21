import { createServiceClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@maxijobber.de'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const formData = await request.formData()
  const worker_id = formData.get('worker_id') as string

  const service = createServiceClient()
  await service.from('profiles').update({ verified: true }).eq('id', worker_id)

  return NextResponse.redirect(new URL('/admin', request.url))
}
