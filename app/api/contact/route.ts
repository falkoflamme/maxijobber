import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const { profile_id, sender_name, sender_company, message } = await request.json()

    if (!profile_id || !sender_name || !message) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
    }

    // Fetch profile — service role so we can access private email
    const supabase = createServiceClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('display_name, full_name, role, email')
      .eq('id', profile_id)
      .eq('status', 'approved')
      .single()

    if (!profile || !profile.email) {
      return NextResponse.json({ error: 'Profil nicht gefunden' }, { status: 404 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'E-Mail nicht konfiguriert' }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const name = profile.display_name || profile.full_name

    await resend.emails.send({
      from: 'MaxiJobber <noreply@maxijobber.de>',
      to: [profile.email],
      subject: `Neue Anfrage von ${sender_name}${sender_company ? ` (${sender_company})` : ''} über MaxiJobber`,
      html: `
        <div style="font-family:sans-serif;max-width:560px">
          <h2 style="font-size:20px;font-weight:900;margin-bottom:4px">Hallo ${name},</h2>
          <p style="color:#555;margin-top:0">ein Unternehmen hat dich über MaxiJobber kontaktiert.</p>

          <table style="font-size:14px;border-collapse:collapse;margin:20px 0;width:100%">
            <tr><td style="padding:6px 16px 6px 0;color:#888;white-space:nowrap">Von</td><td style="font-weight:700">${sender_name}</td></tr>
            ${sender_company ? `<tr><td style="padding:6px 16px 6px 0;color:#888">Unternehmen</td><td>${sender_company}</td></tr>` : ''}
          </table>

          <div style="background:#f9f9f9;border-left:3px solid #F5C518;padding:16px;margin:20px 0;font-size:14px;color:#333;line-height:1.6">
            ${message.replace(/\n/g, '<br/>')}
          </div>

          <p style="font-size:13px;color:#888;margin-top:24px">
            Du kannst direkt auf diese E-Mail antworten um Kontakt aufzunehmen.
            MaxiJobber ist nur die Plattform — alle weiteren Absprachen laufen direkt zwischen dir und dem Auftraggeber.
          </p>

          <p style="font-size:12px;color:#bbb;margin-top:32px;border-top:1px solid #eee;padding-top:16px">
            MaxiJobber · Frankfurt am Main · <a href="https://www.maxijobber.de" style="color:#bbb">maxijobber.de</a>
          </p>
        </div>
      `,
      replyTo: undefined, // sender has no email here — they contact via the form
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
