import OpenAI from 'openai'

interface Worker {
  id: string
  roles?: string[]
  skills?: string[]
  skill_level?: string
  city?: string
  available?: boolean
  hourly_rate?: number
}

interface Job {
  role?: string
  skills_needed?: string[]
  skill_level?: string
  location?: string
  rate_offered?: number
}

export interface MatchResult {
  worker_id: string
  score: number
  reasons: string[]
}

export async function scoreMatch(worker: Worker, job: Job): Promise<MatchResult> {
  // Fast rule-based pre-score to avoid wasting AI calls on bad matches
  let preScore = 0

  if (!worker.available) return { worker_id: worker.id, score: 0, reasons: [] }

  // Role match
  const workerRoles = worker.roles?.map(r => r.toLowerCase()) || []
  const jobRole = job.role?.toLowerCase() || ''
  if (workerRoles.some(r => jobRole.includes(r) || r.includes(jobRole))) preScore += 40

  // Skill overlap
  const workerSkills = worker.skills?.map(s => s.toLowerCase()) || []
  const jobSkills = job.skills_needed?.map(s => s.toLowerCase()) || []
  const overlap = jobSkills.filter(s => workerSkills.some(ws => ws.includes(s) || s.includes(ws)))
  preScore += Math.min(overlap.length * 10, 30)

  // Level match
  const levels = ['junior', 'mid', 'senior', 'expert']
  const wLevel = levels.indexOf(worker.skill_level || 'junior')
  const jLevel = levels.indexOf(job.skill_level || 'junior')
  if (Math.abs(wLevel - jLevel) <= 1) preScore += 15

  // Rate match
  if (job.rate_offered && worker.hourly_rate) {
    if (worker.hourly_rate <= job.rate_offered * 1.1) preScore += 15
  } else {
    preScore += 10
  }

  // Not worth AI call for very low matches
  if (preScore < 20) return { worker_id: worker.id, score: preScore, reasons: ['Geringe Übereinstimmung'] }

  // Use AI for borderline/good matches
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Matching-Algorithmus. Bewerte Fachkraft ↔ Stelle.
JSON mit: score (0-100), reasons (2-3 kurze Stichpunkte auf Deutsch).`,
        },
        {
          role: 'user',
          content: `Fachkraft: ${worker.roles?.join(', ')} | ${worker.skills?.join(', ')} | ${worker.skill_level} | ${worker.city} | ${worker.hourly_rate}€/h
Stelle: ${job.role} | ${job.skills_needed?.join(', ')} | ${job.skill_level} | ${job.location} | ${job.rate_offered}€/h`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 150,
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')
    return {
      worker_id: worker.id,
      score: result.score ?? preScore,
      reasons: result.reasons ?? [],
    }
  } catch {
    return { worker_id: worker.id, score: preScore, reasons: [] }
  }
}
