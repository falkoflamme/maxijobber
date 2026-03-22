import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

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

  // On approval: send welcome + edit link email to the Fachkraft
  if (action === 'approve' && process.env.RESEND_API_KEY) {
    try {
      const { data: profile } = await service
        .from('profiles')
        .select('display_name, full_name, email, edit_token, role, city')
        .eq('id', id)
        .single()

      if (profile?.email && profile?.edit_token) {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const name = profile.display_name || profile.full_name
        const profileUrl = `https://www.maxijobber.de/profil/${id}`
        const editUrl = `https://www.maxijobber.de/profil/bearbeiten?token=${profile.edit_token}`

        await resend.emails.send({
          from: 'MaxiJobber <noreply@maxijobber.de>',
          to: [profile.email],
          subject: `Dein Profil ist live — ${name} auf MaxiJobber`,
          html: `
            <div style="font-family:sans-serif;max-width:560px">
              <div style="height:3px;background:#F5C518;margin-bottom:32px"></div>

              <h2 style="font-size:22px;font-weight:900;margin-bottom:8px">Dein Profil ist live.</h2>
              <p style="color:#555;margin-top:0;font-size:15px">
                Hallo ${name}, dein MaxiJobber-Profil wurde geprüft und freigeschaltet.
                Arbeitgeber können dich ab sofort finden und kontaktieren.
              </p>

              <p style="margin:24px 0">
                <a href="${profileUrl}"
                   style="background:#1a1a1a;color:#fff;padding:14px 28px;text-decoration:none;font-weight:900;font-size:14px;display:inline-block;letter-spacing:0.1em;text-transform:uppercase">
                  Mein Profil ansehen →
                </a>
              </p>

              <div style="background:#fffbeb;border:2px solid #F5C518;padding:20px;margin:24px 0">
                <p style="font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#333;margin:0 0 8px">
                  Profil jederzeit anpassen
                </p>
                <p style="font-size:13px;color:#555;margin:0 0 16px">
                  Bio, Stundensatz, Verfügbarkeit und Zeiten kannst du über diesen Link selbst aktualisieren — jederzeit, ohne Login:
                </p>
                <a href="${editUrl}"
                   style="background:#F5C518;color:#1a1a1a;padding:12px 24px;text-decoration:none;font-weight:900;font-size:13px;display:inline-block;letter-spacing:0.05em;text-transform:uppercase;border:2px solid #1a1a1a">
                  Profil bearbeiten →
                </a>
                <p style="font-size:11px;color:#999;margin:12px 0 0">
                  Dieser Link ist nur für dich — teile ihn nicht öffentlich.
                </p>
              </div>

              <p style="font-size:13px;color:#888;margin-top:24px">
                Wenn du Fragen hast, antworte einfach auf diese E-Mail.
              </p>

              <p style="font-size:12px;color:#bbb;margin-top:32px;border-top:1px solid #eee;padding-top:16px">
                MaxiJobber · Frankfurt am Main · <a href="https://www.maxijobber.de" style="color:#bbb">maxijobber.de</a>
              </p>
            </div>
          `,
        })
      }
    } catch { /* non-critical */ }
  }

  return NextResponse.json({ success: true })
}
