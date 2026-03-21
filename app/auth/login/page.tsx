'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
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
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) {
      setError('Fehler beim Senden. Bitte versuche es erneut.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <a href="/" className="inline-block mb-10 text-xl font-black tracking-tighter">
          MAXI<span className="text-yellow-500">JOBBER</span>
        </a>

        {sent ? (
          <div>
            <h1 className="text-3xl font-black tracking-tighter mb-3">Link gesendet.</h1>
            <p className="text-gray-400 font-medium">
              Wir haben einen Login-Link an <strong className="text-gray-900">{email}</strong> geschickt.
              Öffne dein E-Mail-Postfach und klicke auf den Link.
            </p>
            <p className="text-xs text-gray-300 mt-6">Kein E-Mail? Spam-Ordner prüfen.</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Anmelden</h1>
            <p className="text-gray-400 mb-8 font-medium">Wir schicken dir einen Magic Link — kein Passwort nötig.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>

              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 font-black bg-gray-900 text-white rounded-full hover:bg-gray-700 transition text-sm tracking-wide disabled:opacity-50"
              >
                {loading ? 'Sende Link...' : 'Magic Link senden'}
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-400 text-center">
              Noch kein Konto?{' '}
              <a href="/auth/register" className="font-black text-gray-900 underline underline-offset-2">
                Registrieren
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
