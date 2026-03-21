import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { scoreMatch } from '@/lib/matching'

export async function POST(request: NextRequest) {
  try {
    const { job_request_id } = await request.json()
    const supabase = createServiceClient()

    const { data: job, error: jobError } = await supabase
      .from('job_requests')
      .select('*')
      .eq('id', job_request_id)
      .single()

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job nicht gefunden' }, { status: 404 })
    }

    const { data: workers } = await supabase
      .from('profiles')
      .select('*')
      .eq('type', 'worker')
      .eq('available', true)
      .eq('verified', true)

    if (!workers?.length) {
      return NextResponse.json({ matches: 0 })
    }

    // Score all workers in parallel (capped at 20 to avoid OpenAI rate limits)
    const results = await Promise.all(
      workers.slice(0, 20).map(worker => scoreMatch(worker, job))
    )

    const top3 = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .filter(m => m.score >= 35)

    if (top3.length > 0) {
      await supabase.from('matches').insert(
        top3.map(m => ({
          job_request_id,
          worker_id: m.worker_id,
          score: m.score,
          reasons: m.reasons,
          status: 'suggested',
        }))
      )
      await supabase
        .from('job_requests')
        .update({ status: 'matched' })
        .eq('id', job_request_id)
    }

    return NextResponse.json({ matches: top3.length })
  } catch (error) {
    console.error('Matching error:', error)
    return NextResponse.json({ error: 'Matching fehlgeschlagen' }, { status: 500 })
  }
}
