'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Company {
  firma: string
  ansprechpartner: string
  branche?: string
  city?: string
}

interface JobRequest {
  id: string
  berufsbereich?: string
  rolle?: string
  beschaeftigungsmodell?: string[]
  city?: string
  startdatum?: string
  stundenlohn_max?: number
  beschreibung?: string
  status: string
  created_at: string
}

export default function UnternehmenDashboard() {
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [requests, setRequests] = useState<JobRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/unternehmen/setup').then(r => r.ok ? r.json() : null),
      fetch('/api/unternehmen/bedarf').then(r => r.ok ? r.json() : []),
    ]).then(([co, reqs]) => {
      if (!co) { router.push('/unternehmen/einrichten'); return }
      setCompany(co)
      setRequests(reqs || [])
      setLoading(false)
    })
  }, [router])

  if (loading) return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center">
      <p className="text-gray-400 font-semibold">Wird geladen...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <div className="h-[3px] bg-yellow-500 w-full" />
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/"><img src="/logo2.png" alt="MaxiJobber" className="h-10 w-auto" /></a>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500">{company?.firma}</span>
            <a href="/profis" className="px-5 py-2.5 font-black bg-gray-900 text-white text-sm hover:bg-gray-700 transition uppercase tracking-widest border-2 border-[#1a1a1a]">
              Fachkräfte finden
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Welcome */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-2">Dashboard</p>
          <h1 className="text-4xl font-black tracking-tighter">Hallo, {company?.ansprechpartner}.</h1>
          <p className="text-gray-400 font-medium mt-1">Hier siehst du deine gesendeten Bedarfe und kannst neue Anfragen stellen.</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4">
          <a href="/profis"
            className="bg-white border-2 border-[#1a1a1a] p-6 hover:shadow-[6px_6px_0px_#F5C518] transition-all"
            style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
            <div className="text-2xl font-black mb-1">Fachkräfte</div>
            <div className="text-gray-400 text-sm font-medium">Geprüfte Profile durchsuchen →</div>
          </a>
          <a href="/unternehmen/bedarf"
            className="bg-yellow-500 border-2 border-[#1a1a1a] p-6 hover:bg-yellow-400 transition-all"
            style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
            <div className="text-2xl font-black mb-1">Bedarf eingeben</div>
            <div className="text-gray-900 text-sm font-medium">Wen suchen Sie genau? →</div>
          </a>
        </div>

        {/* Job requests */}
        <div>
          <h2 className="text-xl font-black tracking-tight mb-4">Deine Bedarfe ({requests.length})</h2>
          {requests.length === 0 ? (
            <div className="bg-white border-2 border-[#1a1a1a] p-10 text-center" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
              <div className="text-2xl font-black text-gray-200 mb-3">Noch kein Bedarf eingegeben.</div>
              <p className="text-gray-400 font-medium mb-6">Gib ein, wen du suchst — damit können wir passende Profile vorschlagen.</p>
              <a href="/unternehmen/bedarf"
                className="inline-block px-6 py-3 font-black bg-yellow-500 text-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition border-2 border-[#1a1a1a]">
                Bedarf eingeben →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map(r => (
                <div key={r.id} className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-black text-lg">{r.rolle || r.berufsbereich || 'Offener Bedarf'}</div>
                      <div className="text-gray-400 text-sm font-medium mt-1">
                        {[r.berufsbereich, r.city, r.beschaeftigungsmodell?.join(', ')].filter(Boolean).join(' · ')}
                      </div>
                      {r.beschreibung && <p className="text-gray-600 text-sm font-medium mt-3 leading-relaxed">{r.beschreibung}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      {r.stundenlohn_max && <div className="font-black text-lg">bis {r.stundenlohn_max}€/h</div>}
                      {r.startdatum && <div className="text-xs text-gray-400 font-medium mt-1">ab {new Date(r.startdatum).toLocaleDateString('de-DE')}</div>}
                      <div className="mt-2">
                        <span className={`text-xs font-bold px-2 py-1 border-2 ${r.status === 'open' ? 'border-green-500 text-green-700 bg-green-50' : 'border-gray-200 text-gray-400'}`}>
                          {r.status === 'open' ? 'Aktiv' : 'Geschlossen'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings link */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <a href="/unternehmen/einrichten" className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition">
            Firmenprofil bearbeiten
          </a>
          <form action="/auth/signout" method="POST">
            <button type="submit" className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition">
              Abmelden
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
