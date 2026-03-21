import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  try {
    const { raw_input } = await request.json()

    if (!raw_input?.trim()) {
      return NextResponse.json({ error: 'Kein Text' }, { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Du bist ein Recruiting-Assistent. Analysiere die folgende Stellenanfrage und extrahiere strukturierte Daten.
Antworte NUR mit einem JSON-Objekt mit folgenden Feldern:
- title: string (kurzer Titel, z.B. "Elektriker für Neubau Frankfurt")
- role: string (Berufsbezeichnung, z.B. "Elektriker")
- skill_level: "junior" | "mid" | "senior" | "expert"
- skills_needed: string[] (benötigte Skills, max 5)
- location: string (Standort, Standard: "Frankfurt")
- date_needed: string | null (ISO-Datum wenn angegeben, sonst null)
- hours: number | null (Gesamtstunden oder wöchentliche Stunden)
- rate_offered: number | null (Stundensatz in EUR)
Keine Erklärungen. Nur JSON.`,
        },
        {
          role: 'user',
          content: raw_input.slice(0, 2000),
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 400,
    })

    const content = response.choices[0].message.content
    if (!content) throw new Error('Keine Antwort von KI')

    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    console.error('Job structure error:', error)
    return NextResponse.json({ error: 'Analyse fehlgeschlagen' }, { status: 500 })
  }
}
