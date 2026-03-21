import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const full_name = formData.get('full_name') as string
    const role = formData.get('role') as string
    const city = formData.get('city') as string
    const bio = formData.get('bio') as string
    const skillsRaw = formData.get('skills') as string
    const hourly_rate = parseInt(formData.get('hourly_rate') as string)
    const phone = formData.get('phone') as string
    const whatsapp = formData.get('whatsapp') as string
    const email = formData.get('email') as string
    const photoFile = formData.get('photo') as File | null

    if (!full_name || !role || !city) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
    }

    if (hourly_rate < 25) {
      return NextResponse.json({ error: 'Mindeststundensatz ist 25€' }, { status: 400 })
    }

    const skills = skillsRaw
      ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean)
      : []

    // Improve bio with AI
    let improvedBio = bio
    if (bio?.trim() && process.env.OPENAI_API_KEY) {
      try {
        const baseUrl = process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000'
        const aiRes = await fetch(`${baseUrl}/api/ai/improve-bio`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bio, role, skills }),
        })
        if (aiRes.ok) {
          const { bio: improved } = await aiRes.json()
          improvedBio = improved || bio
        }
      } catch {
        // Fallback to original bio
      }
    }

    const supabase = createServiceClient()

    // Upload photo if provided
    let photo_url: string | null = null
    if (photoFile && photoFile.size > 0) {
      const ext = photoFile.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
      const buffer = await photoFile.arrayBuffer()

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, buffer, {
          contentType: photoFile.type,
          upsert: false,
        })

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('photos').getPublicUrl(fileName)
        photo_url = urlData.publicUrl
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        full_name,
        role,
        city,
        bio: improvedBio,
        skills,
        hourly_rate,
        phone: phone || null,
        whatsapp: whatsapp || null,
        email: email || null,
        photo_url,
        available: true,
        verified: false,
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Profile insert error:', error)
      return NextResponse.json({ error: 'Einreichung fehlgeschlagen' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
