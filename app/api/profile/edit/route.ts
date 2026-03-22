import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Token fehlt' }, { status: 400 })

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, bio, hourly_rate, available, beschaeftigungsmodell, verfuegbar_ab, wochentage, tageszeiten, einsatzdauer')
    .eq('edit_token', token)
    .eq('status', 'approved')
    .single()

  if (error || !data) return NextResponse.json({ error: 'Ungültiger Link' }, { status: 404 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Token fehlt' }, { status: 400 })

  const supabase = createServiceClient()

  // Verify token exists
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('edit_token', token)
    .eq('status', 'approved')
    .single()

  if (!profile) return NextResponse.json({ error: 'Ungültiger Link' }, { status: 404 })

  const body = await request.json()
  const { bio, hourly_rate, available, beschaeftigungsmodell, verfuegbar_ab, wochentage, tageszeiten, einsatzdauer } = body

  const { error } = await supabase
    .from('profiles')
    .update({
      bio: bio || null,
      hourly_rate: parseInt(hourly_rate) || null,
      available: Boolean(available),
      beschaeftigungsmodell: beschaeftigungsmodell || [],
      verfuegbar_ab: verfuegbar_ab || null,
      wochentage: wochentage || [],
      tageszeiten: tageszeiten || [],
      einsatzdauer: einsatzdauer || null,
    })
    .eq('id', profile.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
