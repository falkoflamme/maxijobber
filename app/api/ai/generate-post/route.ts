import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const { profile, profile_url } = await request.json()
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Du schreibst Social-Media-Posts für MaxiJobber, eine Plattform für Fachkräfte in Frankfurt.
Erstelle ZWEI Posts in diesem exakten JSON-Format:
{
  "linkedin": "...",
  "instagram": "..."
}

LinkedIn: professionell, 3-4 Sätze, endet mit Link
Instagram: energetisch, 2-3 Sätze + 5-8 relevante Hashtags, endet mit Link

Ton: direkt, menschlich, keine Unternehmenssprache
Sprache: Deutsch
Kein Emojis auf LinkedIn, max 3 auf Instagram`,
        },
        {
          role: 'user',
          content: `Fachkraft:
Name: ${profile.full_name}
Rolle: ${profile.role}
Stadt: ${profile.city}
Bio: ${profile.bio || '—'}
Skills: ${profile.skills?.join(', ') || '—'}
Stundensatz: ab ${profile.hourly_rate}€/h
Profil-URL: ${profile_url}`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 500,
    })

    const content = JSON.parse(response.choices[0].message.content || '{}')
    return NextResponse.json(content)
  } catch (error) {
    console.error('Post generation error:', error)
    return NextResponse.json({ error: 'Generierung fehlgeschlagen' }, { status: 500 })
  }
}
