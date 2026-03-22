'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BRANCHEN = ['Hotellerie & Gastronomie', 'Handwerk & Technik', 'Reinigung & Facility', 'Lager & Logistik', 'Büro & Verwaltung', 'Verkauf & Handel', 'Garten & Landschaft', 'Bau & Ausbau', 'Sonstige']

export default function UnternehmenEinrichten() {
  const router = useRouter()
  const [firma, setFirma] = useState('')
  const [ansprechpartner, setAnsprechpartner] = useState('')
  const [branche, setBranche] = useState('')
  const [city, setCity] = useState('Frankfurt')
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function save() {
    if (!firma || !ansprechpartner) { setError('Firmenname und Ansprechpartner sind Pflicht.'); return }
    setLoading(true)
    setError('')
    const res = await fetch('/api/unternehmen/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firma, ansprechpartner, branche, city, website }),
    })
    if (res.ok) {
      router.push('/unternehmen/dashboard')
    } else {
      const d = await res.json()
      setError(d.error || 'Fehler beim Speichern.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <div className="h-[3px] bg-yellow-500 w-full" />
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-xl mx-auto">
          <a href="/"><img src="/logo2.png" alt="MaxiJobber" className="h-10 w-auto" /></a>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-3">Willkommen</p>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Firmenprofil einrichten.</h1>
          <p className="text-gray-400 font-medium">Einmalig — danach direkt zu den Fachkräften.</p>
        </div>

        <div className="bg-white border-2 border-[#1a1a1a] p-8 space-y-5" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Firmenname *</p>
            <input value={firma} onChange={e => setFirma(e.target.value)} placeholder="Muster GmbH"
              className="w-full px-4 py-3.5 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Ansprechpartner *</p>
            <input value={ansprechpartner} onChange={e => setAnsprechpartner(e.target.value)} placeholder="Max Muster"
              className="w-full px-4 py-3.5 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Branche</p>
              <select value={branche} onChange={e => setBranche(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition bg-white">
                <option value="">— wählen</option>
                {BRANCHEN.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Stadt</p>
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="Frankfurt"
                className="w-full px-4 py-3.5 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition" />
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Website <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span></p>
            <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="www.firma.de"
              className="w-full px-4 py-3.5 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition" />
          </div>

          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

          <button onClick={save} disabled={loading}
            className="w-full py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a] disabled:opacity-40"
            style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
            {loading ? 'Wird gespeichert...' : 'Weiter zum Dashboard →'}
          </button>
        </div>
      </div>
    </div>
  )
}
