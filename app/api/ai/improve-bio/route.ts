import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const { bio, role, skills } = await request.json()
    if (!bio?.trim()) return NextResponse.json({ bio })

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Du verbesserst kurze Selbstbeschreibungen von Fachkräften auf Deutsch.
Regeln:
- Max 280 Zeichen
- Erste Person ("Ich bin...", "Ich biete...")
- Konkret, professionell, menschlich
- Keine Phrasen wie "Ich bin ein echter Profi" oder "Ich bin leidenschaftlich"
- Nur den verbesserten Text zurückgeben, ohne Anführungszeichen`,
        },
        {
          role: 'user',
          content: `Rolle: ${role}
Skills: ${skills?.join(', ') || '—'}
Text: ${bio}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const improved = response.choices[0].message.content?.trim() || bio
    return NextResponse.json({ bio: improved.slice(0, 280) })
  } catch {
    return NextResponse.json({ bio: request.body ? (await request.json().catch(() => ({ bio: '' }))).bio : '' })
  }
}
