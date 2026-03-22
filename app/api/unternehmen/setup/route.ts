import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const { firma, ansprechpartner, branche, city, website } = await request.json()
  if (!firma || !ansprechpartner) return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })

  const service = createServiceClient()
  const { data, error } = await service
    .from('company_profiles')
    .upsert({ user_id: user.id, firma, ansprechpartner, branche, city: city || 'Frankfurt', website }, { onConflict: 'user_id' })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, id: data.id })
}

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const service = createServiceClient()
  const { data } = await service
    .from('company_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return NextResponse.json(data || null)
}
