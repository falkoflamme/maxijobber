'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Step = 1 | 2 | 3

interface ProfileData {
  full_name: string
  city: string
  phone: string
  whatsapp: string
  bio: string
  skills: string[]
  skill_level: string
  roles: string[]
  hourly_rate: string
  available: boolean
  cv_url: string
}

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

export default function ProfilErstellen() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)

  const [data, setData] = useState<ProfileData>({
    full_name: '',
    city: 'Frankfurt',
    phone: '',
    whatsapp: '',
    bio: '',
    skills: [],
    skill_level: '',
    roles: [],
    hourly_rate: '',
    available: true,
    cv_url: '',
  })

  function set(field: keyof ProfileData, value: ProfileData[keyof ProfileData]) {
    setData(prev => ({ ...prev, [field]: value }))
  }

  function toggleArrayItem(field: 'skills' | 'roles', item: string) {
    setData(prev => {
      const arr = prev[field] as string[]
      return {
        ...prev,
        [field]: arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item],
      }
    })
  }

  async function handleCvUpload() {
    if (!cvFile) return
    setAiLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Upload CV to storage
      const filePath = `${user.id}/${Date.now()}_${cvFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(filePath, cvFile)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('cvs').getPublicUrl(filePath)
      set('cv_url', urlData.publicUrl)

      // Extract profile via AI
      const formData = new FormData()
      formData.append('cv', cvFile)

      const res = await fetch('/api/ai/extract-profile', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const extracted = await res.json()
        setData(prev => ({
          ...prev,
          skills: extracted.skills || prev.skills,
          skill_level: extracted.skill_level || prev.skill_level,
          roles: extracted.roles || prev.roles,
          bio: extracted.bio || prev.bio,
          hourly_rate: extracted.suggested_rate?.toString() || prev.hourly_rate,
        }))
      }
    } catch {
      setError('CV-Upload fehlgeschlagen. Skills bitte manuell eingeben.')
    }
    setAiLoading(false)
  }

  async function handleFinish() {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.full_name,
        city: data.city,
        phone: data.phone,
        whatsapp: data.whatsapp,
        bio: data.bio,
        skills: data.skills,
        skill_level: data.skill_level,
        roles: data.roles,
        hourly_rate: data.hourly_rate ? parseInt(data.hourly_rate) : null,
        available: data.available,
        cv_url: data.cv_url,
        onboarding_complete: true,
      })
      .eq('user_id', user.id)

    if (error) {
      setError('Speichern fehlgeschlagen. Bitte versuche es erneut.')
      setLoading(false)
      return
    }

    router.push('/dashboard/profi')
  }

  const progress = (step / 3) * 100

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-lg font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </span>
          <span className="text-sm font-semibold text-gray-400">Schritt {step} von 3</span>
        </div>
        <div className="max-w-lg mx-auto mt-3">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-10">

        {/* STEP 1: Basics */}
        {step === 1 && (
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-3">Schritt 1</p>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Basis-Infos</h1>
            <p className="text-gray-400 mb-8 font-medium">Wie können Unternehmen dich erreichen?</p>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                  Vollständiger Name *
                </label>
                <input
                  type="text"
                  required
                  value={data.full_name}
                  onChange={e => set('full_name', e.target.value)}
                  placeholder="Max Mustermann"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                  Stadt *
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={e => set('city', e.target.value)}
                  placeholder="Frankfurt"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="+49 170 1234567"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                  WhatsApp <span className="text-gray-300 font-normal normal-case">(falls abweichend)</span>
                </label>
                <input
                  type="tel"
                  value={data.whatsapp}
                  onChange={e => set('whatsapp', e.target.value)}
                  placeholder="+49 170 1234567"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!data.full_name}
              className="w-full mt-10 py-4 font-black bg-gray-900 text-white rounded-full hover:bg-gray-700 transition text-sm tracking-wide disabled:opacity-40"
            >
              Weiter →
            </button>
          </div>
        )}

        {/* STEP 2: Skills */}
        {step === 2 && (
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-3">Schritt 2</p>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Deine Skills</h1>
            <p className="text-gray-400 mb-8 font-medium">CV hochladen — KI extrahiert alles. Oder manuell wählen.</p>

            {/* CV Upload */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 mb-6 text-center hover:border-gray-300 transition">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={e => setCvFile(e.target.files?.[0] || null)}
                className="hidden"
                id="cv-upload"
              />
              <label htmlFor="cv-upload" className="cursor-pointer">
                {cvFile ? (
                  <div>
                    <div className="font-black text-sm mb-1">{cvFile.name}</div>
                    <div className="text-gray-400 text-xs">Datei ausgewählt</div>
                  </div>
                ) : (
                  <div>
                    <div className="font-black text-sm mb-1">CV hier ablegen oder klicken</div>
                    <div className="text-gray-400 text-xs">PDF, DOC, DOCX</div>
                  </div>
                )}
              </label>
            </div>

            {cvFile && (
              <button
                onClick={handleCvUpload}
                disabled={aiLoading}
                className="w-full py-3.5 font-black border-2 border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition text-sm tracking-wide mb-8 disabled:opacity-50"
              >
                {aiLoading ? 'KI analysiert CV...' : 'CV mit KI analysieren'}
              </button>
            )}

            {/* Roles */}
            <div className="mb-6">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">
                Berufsbezeichnung *
              </label>
              <div className="flex flex-wrap gap-2">
                {ROLE_OPTIONS.map(role => (
                  <button
                    key={role}
                    onClick={() => toggleArrayItem('roles', role)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold border-2 transition ${
                      data.roles.includes(role)
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
            <div className="mb-6">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleArrayItem('skills', skill)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold border-2 transition ${
                      data.skills.includes(skill)
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div className="mb-6">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">
                Erfahrungslevel
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { val: 'junior', label: 'Junior', sub: '0-2 J.' },
                  { val: 'mid', label: 'Mid', sub: '2-5 J.' },
                  { val: 'senior', label: 'Senior', sub: '5-10 J.' },
                  { val: 'expert', label: 'Expert', sub: '10+ J.' },
                ].map(({ val, label, sub }) => (
                  <button
                    key={val}
                    onClick={() => set('skill_level', val)}
                    className={`p-3 rounded-xl border-2 text-center transition ${
                      data.skill_level === val
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-black text-xs">{label}</div>
                    <div className={`text-xs mt-0.5 ${data.skill_level === val ? 'text-white/60' : 'text-gray-400'}`}>{sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                Kurzbeschreibung
              </label>
              <textarea
                value={data.bio}
                onChange={e => set('bio', e.target.value)}
                placeholder="Ein paar Sätze über dich, deine Stärken und was du suchst..."
                rows={3}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 font-black border-2 border-gray-200 rounded-full hover:border-gray-400 transition text-sm"
              >
                ← Zurück
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={data.roles.length === 0}
                className="flex-[2] py-4 font-black bg-gray-900 text-white rounded-full hover:bg-gray-700 transition text-sm tracking-wide disabled:opacity-40"
              >
                Weiter →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Verfügbarkeit + Rate */}
        {step === 3 && (
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-3">Schritt 3</p>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Fast fertig.</h1>
            <p className="text-gray-400 mb-8 font-medium">Verfügbarkeit und dein Wunsch-Stundensatz.</p>

            {/* Availability */}
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-3">
                Verfügbarkeit
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => set('available', true)}
                  className={`p-5 rounded-2xl border-2 text-left transition ${
                    data.available ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="font-black text-sm">Verfügbar</div>
                  <div className={`text-xs mt-1 ${data.available ? 'text-white/60' : 'text-gray-400'}`}>
                    Bereit für Anfragen
                  </div>
                </button>
                <button
                  onClick={() => set('available', false)}
                  className={`p-5 rounded-2xl border-2 text-left transition ${
                    !data.available ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="font-black text-sm">Derzeit belegt</div>
                  <div className={`text-xs mt-1 ${!data.available ? 'text-white/60' : 'text-gray-400'}`}>
                    Nicht sichtbar
                  </div>
                </button>
              </div>
            </div>

            {/* Hourly Rate */}
            <div className="mb-10">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-2">
                Wunsch-Stundensatz (€)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={data.hourly_rate}
                  onChange={e => set('hourly_rate', e.target.value)}
                  placeholder="35"
                  min="10"
                  max="200"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-gray-900 transition pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">€/h</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">
                Richtwert: Elektriker 38–50€ · Maler 28–38€ · Koch 20–30€
              </p>
            </div>

            {error && <p className="text-red-500 text-sm font-medium mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 font-black border-2 border-gray-200 rounded-full hover:border-gray-400 transition text-sm"
              >
                ← Zurück
              </button>
              <button
                onClick={handleFinish}
                disabled={loading}
                className="flex-[2] py-4 font-black bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition text-sm tracking-wide disabled:opacity-50"
              >
                {loading ? 'Speichert...' : 'Profil erstellen'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
