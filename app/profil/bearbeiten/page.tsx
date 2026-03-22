'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const BESCHAEFTIGUNGSMODELLE = ['Minijob', 'Kurzfristige Beschäftigung', 'Midijob', 'Teilzeit', 'Offen für mehrere Modelle']
const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const TAGESZEITEN = ['Früh (6–14 Uhr)', 'Mittel (10–18 Uhr)', 'Spät (14–22 Uhr)', 'Nacht', 'Flexibel']
const EINSATZDAUER_OPTIONS = ['Einzelne Schichten', '1–4 Wochen', 'Bis 3 Monate', 'Langfristig', 'Flexibel']

export default function ProfilBearbeitenPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center"><p className="text-gray-400 font-semibold">Wird geladen...</p></div>}>
      <ProfilBearbeiten />
    </Suspense>
  )
}

function ProfilBearbeiten() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(true)
  const [invalid, setInvalid] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [bio, setBio] = useState('')
  const [hourlyRate, setHourlyRate] = useState('20')
  const [available, setAvailable] = useState(true)
  const [beschaeftigungsmodell, setBeschaeftigungsmodell] = useState<string[]>([])
  const [verfuegbarAb, setVerfuegbarAb] = useState('')
  const [wochentage, setWochentage] = useState<string[]>([])
  const [tageszeiten, setTageszeiten] = useState<string[]>([])
  const [einsatzdauer, setEinsatzdauer] = useState('')

  useEffect(() => {
    if (!token) { setInvalid(true); setLoading(false); return }
    fetch(`/api/profile/edit?token=${token}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) { setInvalid(true); setLoading(false); return }
        setBio(data.bio || '')
        setHourlyRate(String(data.hourly_rate || 20))
        setAvailable(data.available ?? true)
        setBeschaeftigungsmodell(data.beschaeftigungsmodell || [])
        setVerfuegbarAb(data.verfuegbar_ab?.slice(0, 10) || '')
        setWochentage(data.wochentage || [])
        setTageszeiten(data.tageszeiten || [])
        setEinsatzdauer(data.einsatzdauer || '')
        setLoading(false)
      })
  }, [token])

  function toggle(arr: string[], setArr: (v: string[]) => void, val: string) {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  async function save() {
    if (!token) return
    setSaving(true)
    setError('')
    const res = await fetch(`/api/profile/edit?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio, hourly_rate: hourlyRate, available, beschaeftigungsmodell, verfuegbar_ab: verfuegbarAb, wochentage, tageszeiten, einsatzdauer }),
    })
    if (res.ok) {
      setSaved(true)
    } else {
      const d = await res.json()
      setError(d.error || 'Fehler beim Speichern.')
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center">
      <p className="text-gray-400 font-semibold">Wird geladen...</p>
    </div>
  )

  if (invalid) return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center px-6">
      <div className="bg-white border-2 border-[#1a1a1a] p-10 text-center max-w-sm" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
        <div className="text-3xl font-black mb-3">Link ungültig</div>
        <p className="text-gray-400 font-medium">Dieser Link ist abgelaufen oder nicht korrekt. Bitte wende dich an MaxiJobber.</p>
      </div>
    </div>
  )

  if (saved) return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center px-6">
      <div className="bg-white border-2 border-[#1a1a1a] p-10 text-center max-w-sm" style={{ boxShadow: '4px 4px 0px #F5C518' }}>
        <div className="text-3xl font-black mb-3">Gespeichert ✓</div>
        <p className="text-gray-400 font-medium mb-6">Dein Profil wurde aktualisiert und ist sofort sichtbar.</p>
        <a href="/profis" className="inline-block px-6 py-3 font-black bg-gray-900 text-white text-sm uppercase tracking-widest hover:bg-gray-700 transition">
          Alle Profile ansehen →
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <div className="h-[3px] bg-yellow-500 w-full" />
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-xl mx-auto">
          <a href="/" className="text-xl font-black tracking-tighter">MAXI<span className="text-yellow-500">JOBBER</span></a>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-2">Dein Profil</p>
          <h1 className="text-3xl font-black tracking-tighter">Profil aktualisieren.</h1>
          <p className="text-gray-400 font-medium mt-2">Änderungen sind sofort auf der Plattform sichtbar.</p>
        </div>

        {/* Verfügbarkeit */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Verfügbarkeit</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAvailable(true)}
              className={`flex-1 py-3 text-sm font-black border-2 uppercase tracking-widest transition ${available ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 hover:border-gray-900'}`}
            >
              Verfügbar
            </button>
            <button
              type="button"
              onClick={() => setAvailable(false)}
              className={`flex-1 py-3 text-sm font-black border-2 uppercase tracking-widest transition ${!available ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}
            >
              Derzeit belegt
            </button>
          </div>
        </div>

        {/* Kurzprofil */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Kurzprofil</p>
          <p className="text-xs text-gray-400 font-medium mb-3">Max. 280 Zeichen. Konkret und fachlich.</p>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value.slice(0, 280))}
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none"
          />
          <p className="text-xs text-gray-400 font-medium mt-1 text-right">{bio.length} / 280</p>
        </div>

        {/* Stundensatz */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Stundensatz (€/h)</p>
          <input
            type="number"
            value={hourlyRate}
            onChange={e => setHourlyRate(e.target.value)}
            min={20}
            className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
          />
          <p className="text-xs text-gray-400 font-medium mt-2">Mindest 20 €/h.</p>
        </div>

        {/* Beschäftigungsmodell */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Beschäftigungsmodell</p>
          <div className="flex flex-wrap gap-2">
            {BESCHAEFTIGUNGSMODELLE.map(m => (
              <button key={m} type="button"
                onClick={() => toggle(beschaeftigungsmodell, setBeschaeftigungsmodell, m)}
                className={`px-3.5 py-2 text-xs font-bold border-2 transition ${beschaeftigungsmodell.includes(m) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}
              >{m}</button>
            ))}
          </div>
        </div>

        {/* Verfügbar ab */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Verfügbar ab</p>
          <input
            type="date"
            value={verfuegbarAb}
            onChange={e => setVerfuegbarAb(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
          />
        </div>

        {/* Wochentage */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Wochentage</p>
          <div className="flex flex-wrap gap-2">
            {WOCHENTAGE.map(t => (
              <button key={t} type="button"
                onClick={() => toggle(wochentage, setWochentage, t)}
                className={`px-3.5 py-2 text-xs font-bold border-2 transition ${wochentage.includes(t) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Tageszeiten */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Tageszeiten</p>
          <div className="flex flex-wrap gap-2">
            {TAGESZEITEN.map(t => (
              <button key={t} type="button"
                onClick={() => toggle(tageszeiten, setTageszeiten, t)}
                className={`px-3.5 py-2 text-xs font-bold border-2 transition ${tageszeiten.includes(t) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Einsatzdauer */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Einsatzdauer</p>
          <div className="flex flex-wrap gap-2">
            {EINSATZDAUER_OPTIONS.map(o => (
              <button key={o} type="button"
                onClick={() => setEinsatzdauer(einsatzdauer === o ? '' : o)}
                className={`px-3.5 py-2 text-xs font-bold border-2 transition ${einsatzdauer === o ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'}`}
              >{o}</button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <button
          onClick={save}
          disabled={saving}
          className="w-full py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a] disabled:opacity-40"
          style={{ boxShadow: '4px 4px 0px #1a1a1a' }}
        >
          {saving ? 'Wird gespeichert...' : 'Änderungen speichern →'}
        </button>

        <p className="text-xs text-gray-400 font-medium text-center pb-10">
          Dieser Link ist nur für dich. Teile ihn nicht öffentlich.
        </p>
      </div>
    </div>
  )
}
