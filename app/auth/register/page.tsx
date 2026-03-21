'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const [step, setStep] = useState<'type' | 'email'>('type')
  const [type, setType] = useState<'worker' | 'company' | null>(null)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!type) return
    setLoading(true)
    setError('')

    const supabase = createClient()
    const redirectTo = `${window.location.origin}/auth/callback?type=${type}`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    })

    if (error) {
      setError('Fehler beim Senden. Bitte versuche es erneut.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <a href="/" className="inline-block mb-10 text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <h1 className="text-3xl font-black tracking-tighter mb-3">Link gesendet.</h1>
          <p className="text-gray-400 font-medium">
            Wir haben einen Registrierungslink an <strong className="text-gray-900">{email}</strong> geschickt.
            Öffne den Link — dein Profil wird automatisch angelegt.
          </p>
          <p className="text-xs text-gray-300 mt-6">Kein E-Mail? Spam-Ordner prüfen.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <a href="/" className="inline-block mb-10 text-xl font-black tracking-tighter">
          MAXI<span className="text-yellow-500">JOBBER</span>
        </a>

        {step === 'type' ? (
          <>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Wer bist du?</h1>
            <p className="text-gray-400 mb-8 font-medium">Wähle deinen Kontotyp.</p>

            <div className="space-y-3">
              <button
                onClick={() => { setType('worker'); setStep('email') }}
                className="w-full p-6 border-2 border-gray-100 rounded-2xl text-left hover:border-yellow-400 transition group"
              >
                <div className="font-black text-lg mb-1 group-hover:text-yellow-600 transition">Fachkraft</div>
                <div className="text-gray-400 text-sm font-medium">
                  Ich biete meine Fähigkeiten an — flexibel, als Minijob oder mehr.
                </div>
              </button>

              <button
                onClick={() => { setType('company'); setStep('email') }}
                className="w-full p-6 border-2 border-gray-100 rounded-2xl text-left hover:border-gray-900 transition group"
              >
                <div className="font-black text-lg mb-1">Unternehmen</div>
                <div className="text-gray-400 text-sm font-medium">
                  Ich suche geprüfte Fachkräfte — schnell, direkt, ohne Agentur.
                </div>
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-400 text-center">
              Bereits registriert?{' '}
              <a href="/auth/login" className="font-black text-gray-900 underline underline-offset-2">
                Anmelden
              </a>
            </p>
          </>
        ) : (
          <>
            <button onClick={() => setStep('type')} className="text-sm text-gray-400 font-semibold mb-8 hover:text-gray-900 transition">
              ← Zurück
            </button>
            <h1 className="text-3xl font-black tracking-tighter mb-2">
              {type === 'worker' ? 'Als Fachkraft registrieren' : 'Als Unternehmen registrieren'}
            </h1>
            <p className="text-gray-400 mb-8 font-medium">Wir schicken dir einen Magic Link — kein Passwort nötig.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">E-Mail</label>
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
                {loading ? 'Sende Link...' : 'Registrierungslink senden'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
