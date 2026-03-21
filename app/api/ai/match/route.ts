import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  try {
    const { worker, job } = await request.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Du bist ein Matching-Algorithmus. Bewerte wie gut eine Fachkraft zu einer Stellenanfrage passt.
Antworte NUR mit einem JSON-Objekt:
- score: number (0-100, Übereinstimmung)
- reasons: string[] (2-3 kurze Begründungen auf Deutsch)
Keine Erklärungen. Nur JSON.`,
        },
        {
          role: 'user',
          content: `Fachkraft:
Rollen: ${worker.roles?.join(', ')}
Skills: ${worker.skills?.join(', ')}
Level: ${worker.skill_level}
Stadt: ${worker.city}
Verfügbar: ${worker.available ? 'Ja' : 'Nein'}
Stundensatz: ${worker.hourly_rate}€/h

Stellenanfrage:
Rolle: ${job.role}
Skills benötigt: ${job.skills_needed?.join(', ')}
Level: ${job.skill_level}
Standort: ${job.location}
Budget: ${job.rate_offered}€/h`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 200,
    })

    const content = response.choices[0].message.content
    if (!content) throw new Error('Keine Antwort')

    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    console.error('Match error:', error)
    return NextResponse.json({ score: 50, reasons: ['Manuelle Prüfung empfohlen'] })
  }
}
