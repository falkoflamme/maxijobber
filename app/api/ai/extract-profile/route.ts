import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  try {
    const formData = await request.formData()
    const cvFile = formData.get('cv') as File

    if (!cvFile) {
      return NextResponse.json({ error: 'Keine Datei' }, { status: 400 })
    }

    const cvText = await cvFile.text()

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Du bist ein HR-Assistent. Extrahiere aus dem folgenden Lebenslauf strukturierte Daten.
Antworte NUR mit einem JSON-Objekt mit folgenden Feldern:
- skills: string[] (technische Fähigkeiten, max 8)
- skill_level: "junior" | "mid" | "senior" | "expert" (basierend auf Erfahrungsjahren)
- roles: string[] (Berufsbezeichnungen, max 3)
- bio: string (2-3 Sätze Zusammenfassung auf Deutsch)
- suggested_rate: number (empfohlener Stundensatz in EUR basierend auf Erfahrung und Branche)
Keine Erklärungen. Nur JSON.`,
        },
        {
          role: 'user',
          content: cvText.slice(0, 4000),
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 500,
    })

    const content = response.choices[0].message.content
    if (!content) throw new Error('Keine Antwort von KI')

    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    console.error('CV extraction error:', error)
    return NextResponse.json({ error: 'Extraktion fehlgeschlagen' }, { status: 500 })
  }
}
