import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const service = createServiceClient()
  const { data: company } = await service
    .from('company_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!company) return NextResponse.json({ error: 'Kein Firmenprofil' }, { status: 404 })

  const body = await request.json()
  const { berufsbereich, rolle, beschaeftigungsmodell, city, startdatum, stundenlohn_max, einsatzdauer, wochentage, tageszeiten, beschreibung } = body

  const { error } = await service.from('job_requests').insert({
    company_id: company.id,
    berufsbereich, rolle, beschaeftigungsmodell,
    city: city || 'Frankfurt',
    startdatum: startdatum || null,
    stundenlohn_max: stundenlohn_max ? parseInt(stundenlohn_max) : null,
    einsatzdauer, wochentage, tageszeiten, beschreibung,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const service = createServiceClient()
  const { data: company } = await service
    .from('company_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!company) return NextResponse.json([])

  const { data } = await service
    .from('job_requests')
    .select('*')
    .eq('company_id', company.id)
    .order('created_at', { ascending: false })

  return NextResponse.json(data || [])
}
