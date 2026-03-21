'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const SKILL_OPTIONS = [
  'Elektroinstallation', 'Sanitär & Heizung', 'Malern & Lackieren',
  'Trockenbau', 'Fliesenlegen', 'Schreiner & Tischler',
  'Metallbau', 'Klimatechnik', 'Gerüstbau', 'Bodenlegen',
  'Koch', 'Service & Gastronomie', 'Lagerlogistik', 'Reinigung',
]

const ROLE_OPTIONS = [
  'Elektriker', 'Klempner', 'Maler', 'Schreiner', 'Fliesenleger',
  'Trockenbauer', 'Koch', 'Chef de Partie', 'Sous Chef', 'Servicekraft',
  'Lagerist', 'Reinigungskraft', 'Metallbauer', 'Allrounder',
]

export default function ProfilBearbeiten() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    full_name: '', city: '', phone: '', whatsapp: '', bio: '',
    skills: [] as string[], skill_level: '', roles: [] as string[],
    hourly_rate: '', available: true,
  })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!profile) { router.push('/auth/login'); return }

      setForm({
        full_name: profile.full_name || '',
        city: profile.city || 'Frankfurt',
        phone: profile.phone || '',
        whatsapp: profile.whatsapp || '',
        bio: profile.bio || '',
        skills: profile.skills || [],
        skill_level: profile.skill_level || '',
        roles: profile.roles || [],
        hourly_rate: profile.hourly_rate?.toString() || '',
        available: profile.available ?? true,
      })
      setLoading(false)
    }
    load()
  }, [router])

  function set<K extends keyof typeof form>(field: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleArray(field: 'skills' | 'roles', item: string) {
    setForm(prev => {
      const arr = prev[field]
      return { ...prev, [field]: arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item] }
    })
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: form.full_name,
        city: form.city,
        phone: form.phone,
        whatsapp: form.whatsapp,
        bio: form.bio,
        skills: form.skills,
        skill_level: form.skill_level,
        roles: form.roles,
        hourly_rate: form.hourly_rate ? parseInt(form.hourly_rate) : null,
        available: form.available,
      })
      .eq('user_id', user.id)

    if (error) {
      setError('Speichern fehlgeschlagen.')
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-sm font-semibold text-gray-400">Lädt...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <a href="/dashboard/profi" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">
            ← Dashboard
          </a>
          <span className="text-lg font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-10">
        <h1 className="text-3xl font-black tracking-tighter mb-2">Profil bearbeiten</h1>
        <p className="text-gray-400 mb-10 font-medium">Ändere deine Daten jederzeit.</p>

        <form onSubmit={handleSave} className="space-y-8">

          {/* Basis */}
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Kontakt</p>
            {[
              { key: 'full_name', label: 'Vollständiger Name', placeholder: 'Max Mustermann', type: 'text' },
              { key: 'city', label: 'Stadt', placeholder: 'Frankfurt', type: 'text' },
              { key: 'phone', label: 'Telefon', placeholder: '+49 170 1234567', type: 'tel' },
              { key: 'whatsapp', label: 'WhatsApp', placeholder: '+49 170 1234567', type: 'tel' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form] as string}
                  onChange={e => set(key as 'full_name' | 'city' | 'phone' | 'whatsapp', e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>
            ))}
          </div>

          {/* Roles */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">Berufsbezeichnung</label>
            <div className="flex flex-wrap gap-2">
              {ROLE_OPTIONS.map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleArray('roles', role)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold border-2 transition ${
                    form.roles.includes(role)
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">Skills</label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleArray('skills', skill)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold border-2 transition ${
                    form.skills.includes(skill)
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">Level</label>
            <div className="grid grid-cols-4 gap-2">
              {[['junior', '0–2 J.'], ['mid', '2–5 J.'], ['senior', '5–10 J.'], ['expert', '10+ J.']].map(([val, sub]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => set('skill_level', val)}
                  className={`p-3 rounded-xl border-2 text-center transition ${
                    form.skill_level === val
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="font-black text-xs capitalize">{val}</div>
                  <div className={`text-xs mt-0.5 ${form.skill_level === val ? 'text-white/60' : 'text-gray-400'}`}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Kurzbeschreibung</label>
            <textarea
              value={form.bio}
              onChange={e => set('bio', e.target.value)}
              rows={3}
              placeholder="Ein paar Sätze über dich..."
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none"
            />
          </div>

          {/* Rate + Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Stundensatz (€)</label>
              <div className="relative">
                <input
                  type="number"
                  value={form.hourly_rate}
                  onChange={e => set('hourly_rate', e.target.value)}
                  placeholder="35"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition pr-10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">€</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">Verfügbarkeit</label>
              <button
                type="button"
                onClick={() => set('available', !form.available)}
                className={`w-full py-3.5 rounded-xl border-2 text-sm font-black transition ${
                  form.available
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-500'
                }`}
              >
                {form.available ? 'Verfügbar' : 'Belegt'}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-4 font-black rounded-full text-sm tracking-wide transition ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-50'
            }`}
          >
            {saving ? 'Speichert...' : saved ? 'Gespeichert' : 'Änderungen speichern'}
          </button>
        </form>
      </div>
    </div>
  )
}
