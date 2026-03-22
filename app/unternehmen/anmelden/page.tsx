'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function UnternehmenAnmelden() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?type=company` },
    })

    if (error) {
      setError('Fehler beim Senden. Bitte versuche es erneut.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <div className="h-[3px] bg-yellow-500 w-full" />
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <a href="/"><img src="/logo2.png" alt="MaxiJobber" className="h-8 w-auto" /></a>
          <a href="/profis" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Fachkräfte ansehen</a>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-3">Für Unternehmen</p>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Firmenzugang.</h1>
          <p className="text-gray-400 font-medium">Kein Passwort nötig — wir schicken dir einen sicheren Link.</p>
        </div>

        {sent ? (
          <div className="bg-white border-2 border-[#1a1a1a] p-8" style={{ boxShadow: '4px 4px 0px #F5C518' }}>
            <div className="text-2xl font-black mb-3">Link gesendet.</div>
            <p className="text-gray-500 font-medium text-sm">
              Wir haben einen Zugangs-Link an <strong className="text-gray-900">{email}</strong> geschickt.
              Öffne dein Postfach und klicke auf den Link.
            </p>
            <p className="text-xs text-gray-300 mt-4">Kein E-Mail? Spam-Ordner prüfen.</p>
          </div>
        ) : (
          <div className="bg-white border-2 border-[#1a1a1a] p-8" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">E-Mail Adresse</p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="kontakt@firma.de"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>
              {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase disabled:opacity-50 border-2 border-[#1a1a1a]"
              >
                {loading ? 'Sende Link...' : 'Zugang anfordern →'}
              </button>
            </form>
            <p className="mt-5 text-xs text-gray-400 font-medium text-center">
              Noch kein Konto? Einfach E-Mail eingeben — wir erstellen es automatisch.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
