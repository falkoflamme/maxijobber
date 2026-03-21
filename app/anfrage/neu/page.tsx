'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface StructuredJob {
  title: string
  role: string
  skill_level: string
  skills_needed: string[]
  location: string
  date_needed: string
  hours: number
  rate_offered: number
}

export default function AnfrageNeu() {
  const router = useRouter()
  const [step, setStep] = useState<'input' | 'review' | 'saving'>('input')
  const [rawInput, setRawInput] = useState('')
  const [structured, setStructured] = useState<StructuredJob | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleStructure() {
    if (!rawInput.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/ai/structure-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_input: rawInput }),
      })

      if (!res.ok) throw new Error()
      const data = await res.json()
      setStructured(data)
      setStep('review')
    } catch {
      setError('KI-Analyse fehlgeschlagen. Bitte versuche es erneut.')
    }
    setLoading(false)
  }

  async function handleSave() {
    if (!structured) return
    setStep('saving')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!profile) return

    const { data: job, error } = await supabase
      .from('job_requests')
      .insert({
        company_id: profile.id,
        title: structured.title,
        raw_input: rawInput,
        role: structured.role,
        skill_level: structured.skill_level,
        skills_needed: structured.skills_needed,
        location: structured.location,
        date_needed: structured.date_needed || null,
        hours: structured.hours || null,
        rate_offered: structured.rate_offered || null,
        status: 'open',
      })
      .select('id')
      .single()

    if (error) {
      setError('Speichern fehlgeschlagen.')
      setStep('review')
      return
    }

    // Trigger matching
    await fetch('/api/matching/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_request_id: job.id }),
    })

    router.push(`/anfrage/${job.id}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <a href="/dashboard/unternehmen" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">
            Dashboard
          </a>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {step === 'input' && (
          <>
            <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-3">Neue Anfrage</p>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Wen suchen Sie?</h1>
            <p className="text-gray-400 mb-8 font-medium">
              Beschreiben Sie einfach was Sie brauchen — unsere KI strukturiert den Rest.
            </p>

            <div className="mb-6">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">
                Ihre Anfrage
              </label>
              <textarea
                value={rawInput}
                onChange={e => setRawInput(e.target.value)}
                placeholder="Wir brauchen ab nächste Woche einen erfahrenen Elektriker für ca. 3 Wochen, 40h/Woche. Projekt in Frankfurt Innenstadt, Neubau-Verkabelung. Budget ca. 45€/h."
                rows={6}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none leading-relaxed"
              />
              <p className="text-xs text-gray-400 mt-2 font-medium">
                Je mehr Details, desto besser das Matching. Rolle, Standort, Zeitraum, Stundenrate.
              </p>
            </div>

            {error && <p className="text-red-500 text-sm font-medium mb-4">{error}</p>}

            <button
              onClick={handleStructure}
              disabled={loading || !rawInput.trim()}
              className="w-full py-4 font-black bg-gray-900 text-white rounded-full hover:bg-gray-700 transition text-sm tracking-wide disabled:opacity-40"
            >
              {loading ? 'KI analysiert...' : 'Analysieren & Fachkräfte finden →'}
            </button>
          </>
        )}

        {step === 'review' && structured && (
          <>
            <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-3">Überprüfen</p>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Alles korrekt?</h1>
            <p className="text-gray-400 mb-8 font-medium">
              So haben wir Ihre Anfrage verstanden. Anpassen wenn nötig, dann Matching starten.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-0">
              {[
                ['Titel', structured.title],
                ['Rolle', structured.role],
                ['Level', structured.skill_level],
                ['Skills', structured.skills_needed.join(', ')],
                ['Standort', structured.location],
                ['Datum', structured.date_needed || 'Flexibel'],
                ['Stunden', structured.hours ? `${structured.hours}h` : 'Offen'],
                ['Budget', structured.rate_offered ? `${structured.rate_offered} €/h` : 'Offen'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start gap-4 py-4 border-b border-gray-200 last:border-0">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400 w-24 shrink-0 pt-0.5">{label}</span>
                  <span className="text-sm font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm font-medium mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep('input')}
                className="flex-1 py-4 font-black border-2 border-gray-200 rounded-full hover:border-gray-400 transition text-sm"
              >
                ← Anpassen
              </button>
              <button
                onClick={handleSave}
                className="flex-[2] py-4 font-black bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition text-sm tracking-wide"
              >
                Matching starten →
              </button>
            </div>
          </>
        )}

        {step === 'saving' && (
          <div className="text-center py-20">
            <div className="text-4xl font-black tracking-tighter mb-3">Matching läuft...</div>
            <p className="text-gray-400 font-medium">Wir suchen die besten Fachkräfte für Sie.</p>
          </div>
        )}
      </div>
    </div>
  )
}
