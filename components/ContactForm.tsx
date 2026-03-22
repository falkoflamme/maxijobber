'use client'

import { useState } from 'react'

export default function ContactForm({ profileId, profileName }: { profileId: string; profileName: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !message) { setError('Name und Nachricht sind Pflicht.'); return }
    setLoading(true)
    setError('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: profileId, sender_name: name, sender_company: company, message }),
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
        Anfragen laufen geschützt über die Plattform — <strong className="text-gray-900">{profileName}</strong> erhält deine Nachricht per E-Mail.
      </p>

      {sent ? (
        <div className="flex items-start gap-3 px-4 py-4 bg-green-50 border-l-[3px] border-green-500">
          <p className="text-sm font-bold text-green-800">Nachricht gesendet. {profileName} meldet sich bei dir.</p>
        </div>
      ) : !open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a]"
        >
          Anfrage senden →
        </button>
      ) : (
        <form onSubmit={submit} className="space-y-4">
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
              <p className="text-xs text-gray-400 font-semibold mb-1.5">Unternehmen</p>
              <input
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Muster GmbH"
                className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
            </div>
          </div>
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
              {loading ? 'Wird gesendet...' : 'Anfrage senden →'}
            </button>
          </div>
          <p className="text-xs text-gray-400 font-medium">Kein Spam · Deine Daten werden nur zur Kontaktaufnahme verwendet.</p>
        </form>
      )}
    </div>
  )
}
