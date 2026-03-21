'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const ROLES = [
  'Sous Chef', 'Chef de Partie', 'Head Waiter', 'Elektriker', 'Klempner',
  'Maler', 'Schreiner', 'Trockenbauer', 'Fliesenleger', 'Koch', 'Servicekraft',
  'Metallbauer', 'Lagerist', 'Reinigungskraft', 'Allrounder',
]

const SKILL_SUGGESTIONS: Record<string, string[]> = {
  'Sous Chef': ['Mise en Place', 'Menüplanung', 'Teamführung', 'HACCP', 'Bankett'],
  'Chef de Partie': ['Patisserie', 'Garde Manger', 'Saucier', 'Grillade', 'Fischküche'],
  'Head Waiter': ['Weinberatung', 'Bankettservice', 'Kassensystem', 'Barista', 'REFA'],
  'Elektriker': ['Installation', 'Schaltschrankbau', 'Photovoltaik', 'BUS-Systeme', 'DGUV V3'],
  'Klempner': ['Heizung', 'Sanitär', 'Gas', 'Solar', 'Klimaanlage'],
  'Maler': ['Tapezieren', 'Fassade', 'Lackierung', 'Dekorputz', 'Graffiti-Schutz'],
  'Schreiner': ['Möbelbau', 'Innenausbau', 'CNC', 'Restaurierung', 'Türen & Fenster'],
  'Trockenbauer': ['Rigips', 'Akustikdecken', 'Brandschutz', 'Unterkonstruktion', 'Metall-Stud'],
  'Fliesenleger': ['Naturstein', 'Großformate', 'Schwimmbad', 'Fußbodenheizung', 'Mosaik'],
}

export default function Mitmachen() {
  const [form, setForm] = useState({
    full_name: '',
    role: '',
    city: 'Frankfurt',
    bio: '',
    skillInput: '',
    skills: [] as string[],
    hourly_rate: '25',
    phone: '',
    whatsapp: '',
    email: '',
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (field === 'role') {
      setForm(prev => ({ ...prev, role: value, skills: [] }))
    }
  }

  function addSkill(skill: string) {
    const trimmed = skill.trim()
    if (!trimmed || form.skills.includes(trimmed) || form.skills.length >= 8) return
    setForm(prev => ({ ...prev, skills: [...prev.skills, trimmed], skillInput: '' }))
  }

  function removeSkill(skill: string) {
    setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError('Foto max 5 MB'); return }
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name || !form.role || !form.city) {
      setError('Bitte Name, Rolle und Stadt ausfüllen.')
      return
    }
    if (parseInt(form.hourly_rate) < 25) {
      setError('Mindeststundensatz ist 25€/h.')
      return
    }

    setLoading(true)
    setError('')

    const fd = new FormData()
    fd.append('full_name', form.full_name)
    fd.append('role', form.role)
    fd.append('city', form.city)
    fd.append('bio', form.bio)
    fd.append('skills', form.skills.join(','))
    fd.append('hourly_rate', form.hourly_rate)
    fd.append('phone', form.phone)
    fd.append('whatsapp', form.whatsapp)
    fd.append('email', form.email)
    if (photo) fd.append('photo', photo)

    const res = await fetch('/api/profiles/submit', { method: 'POST', body: fd })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Etwas ist schiefgelaufen.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  const suggestions = SKILL_SUGGESTIONS[form.role] || []

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <div className="w-6 h-6 rounded-full bg-green-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-3">Eingereicht.</h1>
          <p className="text-gray-400 font-medium mb-2">
            Dein Profil wird jetzt geprüft.
            Du bekommst eine Nachricht sobald es online ist.
          </p>
          <p className="text-gray-300 text-sm font-medium mb-8">Meistens innerhalb von 24 Stunden.</p>
          <a
            href="/profis"
            className="inline-block px-6 py-3 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
          >
            Andere Profile ansehen
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <a href="/profis" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">
            Profile ansehen
          </a>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-3">Fachkraft werden</p>
        <h1 className="text-4xl font-black tracking-tighter mb-2">Stell dich vor.</h1>
        <p className="text-gray-400 font-medium mb-3">
          Kein Konto nötig. Einfach ausfüllen, einreichen — wir schalten dich frei.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
          <span className="text-sm font-bold text-yellow-700">Bis zu 538&nbsp;€ steuerfrei im Monat dazuverdienen.</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Foto */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">
              Foto <span className="text-gray-300 font-medium normal-case tracking-normal">(optional)</span>
            </label>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 hover:border-gray-400 transition overflow-hidden shrink-0 flex items-center justify-center"
              >
                {photoPreview ? (
                  <Image src={photoPreview} alt="Vorschau" width={80} height={80} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-gray-300 text-2xl font-black">+</span>
                )}
              </button>
              <div className="text-sm text-gray-400 font-medium leading-relaxed">
                JPG oder PNG, max 5 MB.<br />
                Profis mit Foto werden 2× häufiger kontaktiert.
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} className="hidden" />
          </div>

          {/* Name + Rolle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Name *</label>
              <input
                type="text"
                required
                value={form.full_name}
                onChange={e => set('full_name', e.target.value)}
                placeholder="Max Mustermann"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Stadt *</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={e => set('city', e.target.value)}
                placeholder="Frankfurt"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
            </div>
          </div>

          {/* Rolle */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">Deine Rolle *</label>
            <div className="flex flex-wrap gap-2">
              {ROLES.map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => set('role', role)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
                    form.role === role
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <input
                type="text"
                value={form.role && !ROLES.includes(form.role) ? form.role : ''}
                onChange={e => set('role', e.target.value)}
                placeholder="Andere Rolle eingeben..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
              Was kannst du? *
              <span className="text-gray-300 font-medium normal-case tracking-normal ml-2">KI verbessert deinen Text</span>
            </label>
            <textarea
              required
              value={form.bio}
              onChange={e => set('bio', e.target.value)}
              placeholder="Ich bin seit 8 Jahren als Elektriker tätig, spezialisiert auf Industrie-Installationen..."
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none"
            />
            <div className="text-xs text-gray-300 text-right mt-1 font-medium">{form.bio.length}/500</div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">
              Skills <span className="text-gray-300 font-medium normal-case tracking-normal">(max 8)</span>
            </label>

            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestions.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSkill(s)}
                    disabled={form.skills.includes(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                      form.skills.includes(s)
                        ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                        : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={form.skillInput}
                onChange={e => setForm(prev => ({ ...prev, skillInput: e.target.value }))}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(form.skillInput) } }}
                placeholder="Skill eingeben + Enter"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
              <button
                type="button"
                onClick={() => addSkill(form.skillInput)}
                className="px-4 py-3 font-black bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>

            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-900 text-white text-xs font-bold">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-gray-300 transition font-black">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Rate */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
              Stundensatz *
            </label>
            <div className="relative max-w-40">
              <input
                type="number"
                required
                min={25}
                max={300}
                value={form.hourly_rate}
                onChange={e => set('hourly_rate', e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">€/h</span>
            </div>
            <p className="text-xs font-bold text-gray-400 mt-2">
              MaxiJobber starten ab 25&nbsp;€/h — weil Qualität ihren Preis hat.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">Kontakt</label>
            <div className="space-y-3">
              <input
                type="tel"
                value={form.whatsapp}
                onChange={e => set('whatsapp', e.target.value)}
                placeholder="WhatsApp +49 170 1234567"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
              <input
                type="tel"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="Telefon +49 170 1234567"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="E-Mail (optional)"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              Mindestens WhatsApp oder Telefon angeben.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !form.full_name || !form.role || !form.bio || !form.hourly_rate}
            className="w-full py-4 font-black bg-gray-900 text-white rounded-full hover:bg-gray-700 transition text-sm tracking-wide disabled:opacity-40"
          >
            {loading ? 'Wird eingereicht...' : 'Profil einreichen →'}
          </button>

          <p className="text-xs text-center text-gray-400 font-medium">
            Dein Profil wird vor Veröffentlichung geprüft. Keine versteckten Kosten.
          </p>
        </form>
      </div>
    </div>
  )
}
