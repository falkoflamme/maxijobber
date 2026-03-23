'use client'

import { useState } from 'react'

const BEREICHE = ['Gastronomie & Hotellerie', 'Handel & Verkauf', 'Handwerk & Technik', 'Logistik & Transport', 'Büro & Verwaltung', 'IT & Digitales', 'Pflege & Gesundheit', 'Reinigung & Facility', 'Veranstaltung & Event', 'Sicherheit & Ordnung', 'Bildung & Soziales', 'Marketing & Kreativ']
const MODELLE = ['Minijob', 'Kurzfristige Beschäftigung', 'Teilzeit', 'Offen']

export default function ContactForm({ profileId, profileName }: { profileId: string; profileName: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [berufsbereich, setBerufsbereich] = useState('')
  const [beschaeftigungsmodell, setBeschaeftigungsmodell] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function toggleModell(m: string) {
    setBeschaeftigungsmodell(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) { setError('Name, E-Mail und Nachricht sind Pflicht.'); return }
    setLoading(true)
    setError('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile_id: profileId,
        sender_name: name,
        sender_email: email,
        sender_company: company,
        berufsbereich,
        beschaeftigungsmodell,
        message,
      }),
    })

    if (res.ok) {
      setSent(true)
    } else {
      const d = await res.json()
      setError(d.error || 'Fehler beim Senden.')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #F5C518' }}>
      <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Kontakt aufnehmen</h2>
      <p className="text-sm font-medium text-gray-500 mb-5">
        Anfragen laufen zuerst geschützt über die Plattform — <strong className="text-gray-900">{profileName}</strong> entscheidet selbst, ob Kontaktdaten freigegeben werden.
      </p>

      {sent ? (
        <div className="flex items-start gap-3 px-4 py-4 bg-green-50 border-l-[3px] border-green-500">
          <p className="text-sm font-bold text-green-800">Anfrage gesendet. Wenn Interesse besteht, meldet sich {profileName} direkt bei dir.</p>
        </div>
      ) : !open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a]"
        >
          Anfrage stellen →
        </button>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          {/* Name + Firma */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400 font-semibold mb-1.5">Ihr Name *</p>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Max Muster"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold mb-1.5">Firmenname</p>
              <input
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Muster GmbH"
                className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
            </div>
          </div>

          {/* E-Mail */}
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-1.5">Ihre E-Mail *</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="max@firma.de"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
            />
          </div>

          {/* Berufsbereich */}
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-1.5">Wofür suchen Sie?</p>
            <select
              value={berufsbereich}
              onChange={e => setBerufsbereich(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition bg-white"
            >
              <option value="">— Berufsbereich wählen (optional)</option>
              {BEREICHE.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Beschäftigungsmodell */}
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-2">Beschäftigungsmodell</p>
            <div className="flex flex-wrap gap-2">
              {MODELLE.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleModell(m)}
                  className={`px-3 py-1.5 text-xs font-bold border-2 transition ${
                    beschaeftigungsmodell.includes(m)
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-900'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Nachricht */}
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-1.5">Ihre Nachricht *</p>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={`Hallo, ich habe Ihr Profil auf MaxiJobber gesehen und würde gerne mit Ihnen sprechen...`}
              rows={4}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

          <div className="flex gap-3">
            <button type="button" onClick={() => setOpen(false)}
              className="px-5 py-3 font-black border-2 border-gray-200 text-sm hover:border-gray-900 transition uppercase tracking-widest">
              Abbrechen
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase disabled:opacity-40 border-2 border-[#1a1a1a]">
              {loading ? 'Wird gesendet...' : 'Anfrage stellen →'}
            </button>
          </div>
          <p className="text-xs text-gray-400 font-medium">Deine Angaben werden nur für diese Anfrage verwendet.</p>
        </form>
      )}
    </div>
  )
}
