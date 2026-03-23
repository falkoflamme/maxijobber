import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const vorname = formData.get('vorname') as string
    const nachname = formData.get('nachname') as string
    const display_name = formData.get('display_name') as string
    const full_name = display_name || formData.get('full_name') as string
    const role = formData.get('role') as string
    const berufsbereich = formData.get('berufsbereich') as string
    const city = formData.get('city') as string
    const mobil_einsetzbar = formData.get('mobil_einsetzbar') === 'true'
    const ausbildung = formData.get('ausbildung') as string
    const abschluss = formData.get('abschluss') as string
    const berufspraxis = formData.get('berufspraxis') as string
    const bio = formData.get('bio') as string
    const skillsRaw = formData.get('skills') as string
    const warum_tags_raw = formData.get('warum_tags') as string
    const warum_freitext = formData.get('warum_freitext') as string
    const beschaeftigungsmodell_raw = formData.get('beschaeftigungsmodell') as string
    const verfuegbar_ab = formData.get('verfuegbar_ab') as string
    const wochentage_raw = formData.get('wochentage') as string
    const tageszeiten_raw = formData.get('tageszeiten') as string
    const einsatzdauer = formData.get('einsatzdauer') as string
    const hourly_rate = parseInt(formData.get('hourly_rate') as string)
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const whatsapp = formData.get('whatsapp') as string
    const photoFile = formData.get('photo') as File | null

    if (!full_name || !role || !city) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
    }
    if (hourly_rate < 20) {
      return NextResponse.json({ error: 'Mindeststundensatz ist 20 €/h' }, { status: 400 })
    }
    if (!email) {
      return NextResponse.json({ error: 'E-Mail ist Pflicht' }, { status: 400 })
    }

    const skills = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : []
    const warum_tags = warum_tags_raw ? warum_tags_raw.split(',').map(s => s.trim()).filter(Boolean) : []
    const beschaeftigungsmodell = beschaeftigungsmodell_raw ? beschaeftigungsmodell_raw.split(',').map(s => s.trim()).filter(Boolean) : []
    const wochentage = wochentage_raw ? wochentage_raw.split(',').map(s => s.trim()).filter(Boolean) : []
    const tageszeiten = tageszeiten_raw ? tageszeiten_raw.split(',').map(s => s.trim()).filter(Boolean) : []

    // AI bio improvement
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
      } catch { /* fallback */ }
    }

    const supabase = createServiceClient()

    // Photo upload
    let photo_url: string | null = null
    if (photoFile && photoFile.size > 0) {
      const ext = photoFile.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
      const buffer = await photoFile.arrayBuffer()
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, buffer, { contentType: photoFile.type, upsert: false })
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('photos').getPublicUrl(fileName)
        photo_url = urlData.publicUrl
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        // Public fields
        full_name,
        display_name,
        role,
        berufsbereich: berufsbereich || null,
        city,
        mobil_einsetzbar,
        bio: improvedBio,
        skills,
        hourly_rate,
        ausbildung: ausbildung || null,
        abschluss: abschluss || null,
        berufspraxis: berufspraxis || null,
        warum_tags,
        warum_freitext: warum_freitext || null,
        beschaeftigungsmodell,
        verfuegbar_ab: verfuegbar_ab || null,
        wochentage,
        tageszeiten,
        einsatzdauer: einsatzdauer || null,
        photo_url,
        available: true,
        // Private fields
        vorname: vorname || null,
        nachname: nachname || null,
        email: email || null,
        phone: phone || null,
        whatsapp: whatsapp || null,
        // Meta
        verified: false,
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Profile insert error:', error)
      return NextResponse.json({ error: 'Einreichung fehlgeschlagen' }, { status: 500 })
    }

    // Admin notification email
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const adminEmails = (process.env.ADMIN_EMAILS || 'flamme.falko@gmail.com').split(',')
        await resend.emails.send({
          from: 'MaxiJobber <noreply@maxijobber.de>',
          to: adminEmails,
          subject: `Neues Profil: ${display_name || full_name} (${role})`,
          html: `
            <h2 style="font-family:sans-serif">Neues Profil eingereicht</h2>
            <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
              <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${display_name || full_name}</strong> (${vorname} ${nachname})</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">Rolle</td><td>${role} · ${berufsbereich || ''}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">Stadt</td><td>${city}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">Stundensatz</td><td>${hourly_rate} €/h</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">Berufspraxis</td><td>${berufspraxis || '—'}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">E-Mail</td><td>${email}</td></tr>
              ${whatsapp ? `<tr><td style="padding:4px 12px 4px 0;color:#666">WhatsApp</td><td>${whatsapp}</td></tr>` : ''}
              ${phone ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Telefon</td><td>${phone}</td></tr>` : ''}
            </table>
            ${bio ? `<p style="font-family:sans-serif;font-size:14px;color:#444;margin-top:16px">${improvedBio}</p>` : ''}
            <p style="margin-top:24px">
              <a href="https://www.maxijobber.de/admin" style="background:#1a1a1a;color:#fff;padding:12px 24px;text-decoration:none;font-family:sans-serif;font-weight:bold;font-size:14px">
                Im Admin freischalten →
              </a>
            </p>
          `,
        })
      } catch { /* non-critical */ }
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
