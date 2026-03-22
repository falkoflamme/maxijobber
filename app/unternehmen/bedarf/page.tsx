'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BEREICHE = ['Hotellerie & Gastronomie', 'Handwerk & Technik', 'Reinigung & Facility', 'Lager & Logistik', 'Büro & Verwaltung', 'Verkauf & Handel', 'Garten & Landschaft', 'Bau & Ausbau']
const MODELLE = ['Minijob', 'Kurzfristige Beschäftigung', 'Midijob', 'Teilzeit', 'Offen für mehrere Modelle']
const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const TAGESZEITEN = ['Früh (6–14 Uhr)', 'Mittel (10–18 Uhr)', 'Spät (14–22 Uhr)', 'Nacht', 'Flexibel']
const EINSATZDAUER = ['Einzelne Schichten', '1–4 Wochen', 'Bis 3 Monate', 'Langfristig', 'Flexibel']

export default function UnternehmenBedarf() {
  const router = useRouter()
  const [berufsbereich, setBerufsbereich] = useState('')
  const [rolle, setRolle] = useState('')
  const [beschaeftigungsmodell, setBeschaeftigungsmodell] = useState<string[]>([])
  const [city, setCity] = useState('Frankfurt')
  const [startdatum, setStartdatum] = useState('')
  const [stundenlohn_max, setStundenlohn] = useState('')
  const [einsatzdauer, setEinsatzdauer] = useState('')
  const [wochentage, setWochentage] = useState<string[]>([])
  const [tageszeiten, setTageszeiten] = useState<string[]>([])
  const [beschreibung, setBeschreibung] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggle(arr: string[], setArr: (v: string[]) => void, val: string) {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  async function save() {
    if (!berufsbereich) { setError('Bitte mindestens den Berufsbereich angeben.'); return }
    setLoading(true)
    setError('')
    const res = await fetch('/api/unternehmen/bedarf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ berufsbereich, rolle, beschaeftigungsmodell, city, startdatum, stundenlohn_max, einsatzdauer, wochentage, tageszeiten, beschreibung }),
    })
    if (res.ok) {
      router.push('/unternehmen/dashboard')
    } else {
      const d = await res.json()
      setError(d.error || 'Fehler.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <div className="h-[3px] bg-yellow-500 w-full" />
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <a href="/"><img src="/logo2.png" alt="MaxiJobber" className="h-10 w-auto" /></a>
          <a href="/unternehmen/dashboard" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition">← Dashboard</a>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-2">Intern · Nicht öffentlich</p>
          <h1 className="text-3xl font-black tracking-tighter">Wen suchen Sie?</h1>
          <p className="text-gray-400 font-medium mt-1 text-sm">Dieser Bedarf ist nur intern sichtbar und hilft uns, passende Fachkräfte vorzuschlagen.</p>
        </div>

        {/* Berufsbereich */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Berufsbereich *</p>
          <div className="flex flex-wrap gap-2">
            {BEREICHE.map(b => (
              <button key={b} type="button" onClick={() => setBerufsbereich(berufsbereich === b ? '' : b)}
                className={`px-3.5 py-2 text-xs font-bold border-2 transition ${berufsbereich === b ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}>
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Rolle + Stadt */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Spezifische Rolle</p>
              <input value={rolle} onChange={e => setRolle(e.target.value)} placeholder="z.B. Elektriker"
                className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Einsatzort</p>
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="Frankfurt"
                className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition" />
            </div>
          </div>
        </div>

        {/* Beschäftigungsmodell */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Beschäftigungsmodell</p>
          <div className="flex flex-wrap gap-2">
            {MODELLE.map(m => (
              <button key={m} type="button" onClick={() => toggle(beschaeftigungsmodell, setBeschaeftigungsmodell, m)}
                className={`px-3.5 py-2 text-xs font-bold border-2 transition ${beschaeftigungsmodell.includes(m) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Zeitraum */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Startdatum</p>
              <input type="date" value={startdatum} onChange={e => setStartdatum(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Budget max. (€/h)</p>
              <input type="number" value={stundenlohn_max} onChange={e => setStundenlohn(e.target.value)} placeholder="z.B. 30"
                className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition" />
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Einsatzdauer</p>
            <div className="flex flex-wrap gap-2">
              {EINSATZDAUER.map(o => (
                <button key={o} type="button" onClick={() => setEinsatzdauer(einsatzdauer === o ? '' : o)}
                  className={`px-3 py-1.5 text-xs font-bold border-2 transition ${einsatzdauer === o ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wochentage + Tageszeiten */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6 space-y-4" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Wochentage</p>
            <div className="flex flex-wrap gap-2">
              {WOCHENTAGE.map(t => (
                <button key={t} type="button" onClick={() => toggle(wochentage, setWochentage, t)}
                  className={`px-3 py-1.5 text-xs font-bold border-2 transition ${wochentage.includes(t) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Tageszeiten</p>
            <div className="flex flex-wrap gap-2">
              {TAGESZEITEN.map(t => (
                <button key={t} type="button" onClick={() => toggle(tageszeiten, setTageszeiten, t)}
                  className={`px-3 py-1.5 text-xs font-bold border-2 transition ${tageszeiten.includes(t) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Beschreibung */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Kurze Beschreibung</p>
          <p className="text-xs text-gray-400 font-medium mb-3">Was genau wird benötigt? Kontext hilft bei der Auswahl.</p>
          <textarea value={beschreibung} onChange={e => setBeschreibung(e.target.value)} rows={4}
            placeholder="Wir suchen einen erfahrenen Elektriker für die Instandhaltung unserer Produktionsanlage..."
            className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none" />
        </div>

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <button onClick={save} disabled={loading}
          className="w-full py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a] disabled:opacity-40"
          style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          {loading ? 'Wird gespeichert...' : 'Bedarf speichern →'}
        </button>
        <p className="text-xs text-gray-400 font-medium text-center pb-10">Dieser Bedarf ist nicht öffentlich sichtbar.</p>
      </div>
    </div>
  )
}
