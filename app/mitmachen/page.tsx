'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Note: metadata in app/mitmachen/layout.tsx

// ── Data ─────────────────────────────────────────────────────────────────────

const BERUFSFELDER: Record<string, string[]> = {
  'Hotellerie & Gastronomie': ['Koch', 'Sous Chef', 'Chef de Partie', 'Commis de Cuisine', 'Head Waiter', 'Servicekraft', 'Barista', 'Bartender', 'Rezeptionist/in', 'Hausdame'],
  'Handwerk & Technik': ['Elektriker', 'Klempner', 'Sanitärinstallateur', 'Maler & Lackierer', 'Schreiner', 'Trockenbauer', 'Fliesenleger', 'Metallbauer', 'Dachdecker'],
  'Reinigung & Facility': ['Reinigungskraft', 'Hausmeister', 'Facility Manager', 'Hauswirtschaft', 'Gebäudereiniger'],
  'Lager & Logistik': ['Lagerist', 'Staplerfahrer', 'Kommissionierer', 'Lagermitarbeiter'],
  'Büro & Verwaltung': ['Bürokraft', 'Sachbearbeiter/in', 'Sekretär/in', 'Empfang'],
  'Verkauf & Handel': ['Verkäufer/in', 'Kassierer/in', 'Merchandiser', 'Kundenberater/in'],
  'Garten & Landschaft': ['Gärtner/in', 'Landschaftspfleger/in', 'Grünpflege'],
  'Bau & Ausbau': ['Maurer', 'Baufacharbeiter', 'Gerüstbauer', 'Bauhelfer'],
}

const ROLE_SKILLS: Record<string, string[]> = {
  'Koch': ['À la carte', 'Bankett', 'HACCP', 'Frühstück', 'Fine Dining', 'Mise en place', 'Postenführung', 'Warenkontrolle'],
  'Sous Chef': ['Mise en place', 'Menüplanung', 'Teamführung', 'HACCP', 'Bankett', 'Wareneinkauf'],
  'Chef de Partie': ['Patisserie', 'Garde Manger', 'Saucier', 'Grillade', 'Fischküche', 'Mise en place'],
  'Head Waiter': ['Weinberatung', 'Bankettservice', 'Kassensystem', 'Barista', 'Gästebetreuung'],
  'Servicekraft': ['Kassensystem', 'Bankettservice', 'Barista', 'Frühstücksservice', 'Gästebetreuung'],
  'Elektriker': ['Installation', 'Wartung', 'Schaltschrank', 'Störungsbehebung', 'Altbau', 'Neubau', 'Industrie', 'DGUV V3', 'Lesen von Plänen'],
  'Klempner': ['Heizung', 'Sanitär', 'Gas', 'Solar', 'Klimaanlage'],
  'Sanitärinstallateur': ['Heizung', 'Sanitär', 'Gas', 'Badezimmer', 'Rohrleitungsbau'],
  'Maler & Lackierer': ['Tapezieren', 'Fassade', 'Lackierung', 'Dekorputz', 'Graffiti-Schutz'],
  'Schreiner': ['Möbelbau', 'Innenausbau', 'CNC', 'Restaurierung', 'Türen & Fenster'],
  'Trockenbauer': ['Rigips', 'Akustikdecken', 'Brandschutz', 'Unterkonstruktion', 'Metall-Stud'],
  'Fliesenleger': ['Naturstein', 'Großformate', 'Schwimmbad', 'Fußbodenheizung', 'Mosaik'],
  'Reinigungskraft': ['Unterhaltsreinigung', 'Glasreinigung', 'Maschinenreinigung', 'Büroreinigung', 'Sonderreinigung'],
  'Lagerist': ['Staplerführerschein', 'Kommissionierung', 'Wareneingang', 'Inventur', 'SAP'],
}

const WARUM_TAGS = [
  'Keine lange Einarbeitung', 'Eigenständiges Arbeiten', 'Erfahrung in Spitzenzeiten',
  'Teamleitungserfahrung', 'Zuverlässig & pünktlich', 'Schnelle Auffassungsgabe',
  'Mehrsprachig', 'Spezialkenntnisse', 'Belastbar unter Druck', 'Gästekompetenz',
  'Langjährige Berufspraxis', 'Zertifizierungen & Nachweise',
]

const BESCHAEFTIGUNGSMODELLE = ['Minijob', 'Kurzfristige Beschäftigung', 'Midijob', 'Teilzeit', 'Offen für mehrere Modelle']
const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const TAGESZEITEN = ['Früh (6–14 Uhr)', 'Mittel (10–18 Uhr)', 'Spät (14–22 Uhr)', 'Nacht', 'Flexibel']
const EINSATZDAUER_OPTIONS = ['Einzelne Schichten', '1–4 Wochen', 'Bis 3 Monate', 'Langfristig', 'Flexibel']
const ERFAHRUNG_STUFEN = ['Unter 2 Jahre', '2–5 Jahre', '5–10 Jahre', '10+ Jahre']

function generateDisplayName(vorname: string, nachname: string): string {
  if (!vorname) return ''
  const initial = nachname?.trim()?.[0] ?? ''
  return initial ? `${vorname.trim()} ${initial}.` : vorname.trim()
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  // Block 1 — Identität
  vorname: string
  nachname: string
  display_name: string
  // Block 2 — Beruf
  berufsbereich: string
  role: string
  role_custom: string
  city: string
  mobil_einsetzbar: boolean
  // Block 3 — Qualifikation
  ausbildung: string
  ausbildungsberuf: string
  erfahrung_stufe: string
  // Block 4 — Skills
  skills: string[]
  skillInput: string
  // Block 5 — Mehrwert
  bio: string
  warum_tags: string[]
  warum_freitext: string
  // Block 6 — Verfügbarkeit
  beschaeftigungsmodell: string[]
  verfuegbar_ab: string
  wochentage: string[]
  tageszeiten: string[]
  einsatzdauer: string
  // Block 7 — Lohn
  hourly_rate: string
  // Block 9 — Kontakt
  email: string
  phone: string
  whatsapp: string
  // Block 10 — Einwilligung
  consent_correct: boolean
  consent_data: boolean
  consent_profile: boolean
}

const INITIAL: FormState = {
  vorname: '', nachname: '', display_name: '',
  berufsbereich: '', role: '', role_custom: '', city: 'Frankfurt', mobil_einsetzbar: false,
  ausbildung: '', ausbildungsberuf: '', erfahrung_stufe: '',
  skills: [], skillInput: '',
  bio: '', warum_tags: [], warum_freitext: '',
  beschaeftigungsmodell: [], verfuegbar_ab: '', wochentage: [], tageszeiten: [], einsatzdauer: '',
  hourly_rate: '20',
  email: '', phone: '', whatsapp: '',
  consent_correct: false, consent_data: false, consent_profile: false,
}

// ── Chip helper ───────────────────────────────────────────────────────────────

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 text-xs font-bold border-2 transition ${
        active ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900'
      }`}
    >
      {label}
    </button>
  )
}

function YellowChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 text-xs font-bold border-2 transition ${
        active ? 'border-yellow-500 bg-yellow-50 text-yellow-800' : 'border-gray-200 hover:border-yellow-500 hover:bg-yellow-50'
      }`}
    >
      {label}
    </button>
  )
}

function Label({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-black uppercase tracking-widest text-gray-400">{children}</p>
      {sub && <p className="text-xs text-gray-400 font-medium mt-1">{sub}</p>}
    </div>
  )
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3.5 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition ${props.className ?? ''}`}
    />
  )
}

function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3.5 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none ${props.className ?? ''}`}
    />
  )
}

function SectionTitle({ step, total, title }: { step: number; total: number; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-1">Schritt {step} von {total}</p>
      <h2 className="text-2xl font-black tracking-tighter">{title}</h2>
    </div>
  )
}

// ── DragDrop Photo ─────────────────────────────────────────────────────────────

function DragDropPhoto({ preview, onFile }: { preview: string | null; onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) onFile(file)
  }, [onFile])

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative w-full h-48 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition ${
        dragging ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-gray-900 bg-gray-50'
      }`}
    >
      {preview ? (
        <Image src={preview} alt="Vorschau" fill className="object-cover" />
      ) : (
        <div className="text-center px-4">
          <div className="text-3xl text-gray-300 mb-2 font-black">↑</div>
          <p className="text-sm font-bold text-gray-500">Foto hier hineinziehen oder anklicken</p>
          <p className="text-xs text-gray-400 font-medium mt-1">JPG, PNG · max. 5 MB · optional</p>
          <p className="text-xs text-gray-400 font-medium mt-1">Ein professionelles Foto schafft Vertrauen.</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f) }}
      />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Mitmachen() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const TOTAL_STEPS = 4

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleArray<K extends keyof FormState>(field: K, value: string) {
    setForm(prev => {
      const arr = (prev[field] as string[])
      return { ...prev, [field]: arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value] }
    })
  }

  function handlePhoto(file: File) {
    if (file.size > 5 * 1024 * 1024) { setError('Foto max 5 MB'); return }
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
    setError('')
  }

  function addSkill(s: string) {
    const t = s.trim()
    if (!t || form.skills.includes(t) || form.skills.length >= 8) return
    set('skills', [...form.skills, t])
    set('skillInput', '')
  }

  const effectiveRole = form.role || form.role_custom
  const roleSkills = ROLE_SKILLS[effectiveRole] ?? ROLE_SKILLS[form.role] ?? []
  const roleOptions = form.berufsbereich ? BERUFSFELDER[form.berufsbereich] ?? [] : []

  // ── Step validation ─────────────────────────────────────────────────────────

  function canAdvance(): boolean {
    if (step === 1) return !!(form.vorname && form.nachname && form.display_name)
    if (step === 2) return !!(form.berufsbereich && effectiveRole && form.city && form.ausbildung && form.erfahrung_stufe)
    if (step === 3) return !!(form.bio && form.beschaeftigungsmodell.length > 0 && form.hourly_rate && parseInt(form.hourly_rate) >= 20)
    return true
  }

  function next() {
    if (!canAdvance()) { setError('Bitte alle Pflichtfelder ausfüllen.'); return }
    setError('')
    setStep(s => s + 1)
    window.scrollTo(0, 0)
  }

  function back() {
    setError('')
    setStep(s => s - 1)
    window.scrollTo(0, 0)
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email) { setError('E-Mail ist Pflicht.'); return }
    if (!form.consent_correct || !form.consent_data || !form.consent_profile) {
      setError('Bitte alle Einwilligungen bestätigen.'); return
    }

    setLoading(true)
    setError('')

    const fd = new FormData()
    fd.append('vorname', form.vorname)
    fd.append('nachname', form.nachname)
    fd.append('display_name', form.display_name)
    fd.append('full_name', form.display_name)
    fd.append('role', effectiveRole)
    fd.append('berufsbereich', form.berufsbereich)
    fd.append('city', form.city)
    fd.append('mobil_einsetzbar', String(form.mobil_einsetzbar))
    fd.append('ausbildung', form.ausbildung)
    fd.append('ausbildungsberuf', form.ausbildungsberuf)
    fd.append('erfahrung_stufe', form.erfahrung_stufe)
    fd.append('skills', form.skills.join(','))
    fd.append('bio', form.bio)
    fd.append('warum_tags', form.warum_tags.join(','))
    fd.append('warum_freitext', form.warum_freitext)
    fd.append('beschaeftigungsmodell', form.beschaeftigungsmodell.join(','))
    fd.append('verfuegbar_ab', form.verfuegbar_ab)
    fd.append('wochentage', form.wochentage.join(','))
    fd.append('tageszeiten', form.tageszeiten.join(','))
    fd.append('einsatzdauer', form.einsatzdauer)
    fd.append('hourly_rate', form.hourly_rate)
    fd.append('email', form.email)
    fd.append('phone', form.phone)
    fd.append('whatsapp', form.whatsapp)
    if (photo) fd.append('photo', photo)

    const res = await fetch('/api/profiles/submit', { method: 'POST', body: fd })
    const data = await res.json()

    if (!res.ok) { setError(data.error || 'Fehler beim Einreichen.'); setLoading(false); return }
    router.push('/mitmachen/danke')
  }

  // ── Progress bar ─────────────────────────────────────────────────────────────

  const progress = ((step - 1) / TOTAL_STEPS) * 100

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <div className="h-[3px] bg-yellow-500 w-full" />

      {/* Nav */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter">MAXI<span className="text-yellow-500">JOBBER</span></a>
          <a href="/profis" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Profile ansehen</a>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10">

        {/* Header — only step 1 */}
        {step === 1 && (
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-3">Fachkraft werden</p>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Stell dich vor.</h1>
            <p className="text-gray-400 font-medium mb-4">Kein Konto nötig. Wir prüfen dein Profil und schalten es frei.</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border-l-[3px] border-yellow-500">
              <span className="text-sm font-bold text-yellow-800">Bis zu 538&nbsp;€ steuerfrei im Monat dazuverdienen.</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ── STEP 1: Identität ─────────────────────────────────────────── */}
          {step === 1 && (
            <div className="space-y-8">
              <SectionTitle step={1} total={TOTAL_STEPS} title="Wer bist du?" />

              {/* Namen */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label sub="Nur intern sichtbar — nicht öffentlich.">Dein Name *</Label>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-1.5">Vorname</p>
                    <Input
                      value={form.vorname}
                      onChange={e => {
                        set('vorname', e.target.value)
                        set('display_name', generateDisplayName(e.target.value, form.nachname))
                      }}
                      placeholder="Marco"
                      required
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-1.5">Nachname</p>
                    <Input
                      value={form.nachname}
                      onChange={e => {
                        set('nachname', e.target.value)
                        set('display_name', generateDisplayName(form.vorname, e.target.value))
                      }}
                      placeholder="Bauer"
                      required
                    />
                  </div>
                </div>

                {/* Display name */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs text-gray-400 font-semibold">Öffentlicher Profilname</p>
                    <button
                      type="button"
                      onClick={() => set('display_name', generateDisplayName(form.vorname, form.nachname))}
                      className="text-xs text-yellow-600 font-bold hover:underline"
                    >
                      ↺ Vorschlag
                    </button>
                  </div>
                  <Input
                    value={form.display_name}
                    onChange={e => set('display_name', e.target.value)}
                    placeholder="Marco B."
                  />
                  <p className="text-xs text-gray-400 font-medium mt-1.5">So wirst du auf der Plattform angezeigt — z.B. &bdquo;Marco B.&ldquo;</p>
                </div>
              </div>

              {/* Foto */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label sub="Optional. Schafft Vertrauen bei Arbeitgebern.">Profilfoto</Label>
                <DragDropPhoto preview={photoPreview} onFile={handlePhoto} />
                {photoPreview && (
                  <button type="button" onClick={() => { setPhoto(null); setPhotoPreview(null) }}
                    className="mt-3 text-xs text-red-400 font-bold hover:text-red-600 transition">
                    Foto entfernen
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 2: Beruf + Qualifikation ────────────────────────────── */}
          {step === 2 && (
            <div className="space-y-8">
              <SectionTitle step={2} total={TOTAL_STEPS} title="Was machst du?" />

              {/* Standort */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label>Standort *</Label>
                <Input
                  value={form.city}
                  onChange={e => set('city', e.target.value)}
                  placeholder="Frankfurt"
                  required
                />
                <label className="flex items-center gap-3 mt-4 cursor-pointer">
                  <div
                    onClick={() => set('mobil_einsetzbar', !form.mobil_einsetzbar)}
                    className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition ${form.mobil_einsetzbar ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}
                  >
                    {form.mobil_einsetzbar && <span className="text-white text-xs font-black">✓</span>}
                  </div>
                  <span className="text-sm font-medium text-gray-600">Auch in anderen Städten / mobil einsetzbar</span>
                </label>
              </div>

              {/* Berufsbereich */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label sub="Wähle zuerst deinen Bereich, dann deine Rolle.">Berufsbereich *</Label>
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.keys(BERUFSFELDER).map(b => (
                    <Chip key={b} label={b} active={form.berufsbereich === b}
                      onClick={() => { set('berufsbereich', b); set('role', ''); set('skills', []) }} />
                  ))}
                </div>

                {form.berufsbereich && (
                  <>
                    <Label>Berufsrolle *</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {roleOptions.map(r => (
                        <Chip key={r} label={r} active={form.role === r}
                          onClick={() => { set('role', r); set('role_custom', ''); set('skills', []) }} />
                      ))}
                    </div>
                    <Input
                      value={form.role_custom}
                      onChange={e => { set('role_custom', e.target.value); set('role', '') }}
                      placeholder="Andere Rolle eingeben..."
                    />
                  </>
                )}
              </div>

              {/* Qualifikation */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label>Ausbildung *</Label>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Ja, abgeschlossen', 'In Ausbildung', 'Nein, aber Berufserfahrung'].map(a => (
                    <Chip key={a} label={a} active={form.ausbildung === a} onClick={() => set('ausbildung', a)} />
                  ))}
                </div>

                {form.ausbildung === 'Ja, abgeschlossen' && (
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 font-semibold mb-1.5">Ausbildungsberuf</p>
                    <Input
                      value={form.ausbildungsberuf}
                      onChange={e => set('ausbildungsberuf', e.target.value)}
                      placeholder="z.B. Koch, Elektriker, ..."
                    />
                  </div>
                )}

                <Label>Berufserfahrung *</Label>
                <div className="flex flex-wrap gap-2">
                  {ERFAHRUNG_STUFEN.map(s => (
                    <Chip key={s} label={s} active={form.erfahrung_stufe === s} onClick={() => set('erfahrung_stufe', s)} />
                  ))}
                </div>
              </div>

              {/* Skills */}
              {effectiveRole && (
                <div className="bg-white border-2 border-[#1a1a1a] p-6">
                  <Label sub="Wähle bis zu 8 Skills — passend zu deiner Rolle.">Skills</Label>
                  {roleSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {roleSkills.map(s => (
                        <YellowChip key={s} label={s} active={form.skills.includes(s)}
                          onClick={() => {
                            if (form.skills.includes(s)) set('skills', form.skills.filter(x => x !== s))
                            else if (form.skills.length < 8) set('skills', [...form.skills, s])
                          }} />
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={form.skillInput}
                      onChange={e => set('skillInput', e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(form.skillInput) } }}
                      placeholder="Eigener Skill + Enter"
                      className="flex-1"
                    />
                    <button type="button" onClick={() => addSkill(form.skillInput)}
                      className="px-4 py-3.5 font-black bg-gray-100 border-2 border-gray-200 text-sm hover:bg-gray-200 hover:border-gray-900 transition">+</button>
                  </div>
                  {form.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {form.skills.map(s => (
                        <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold border-2 border-[#1a1a1a]">
                          {s}
                          <button type="button" onClick={() => set('skills', form.skills.filter(x => x !== s))} className="hover:text-gray-300 font-black">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 3: Mehrwert + Verfügbarkeit + Lohn ──────────────────── */}
          {step === 3 && (
            <div className="space-y-8">
              <SectionTitle step={3} total={TOTAL_STEPS} title="Was bietest du?" />

              {/* Kurzprofil */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label sub="Beschreibe dich fachlich — kurz und konkret.">Kurzprofil *</Label>
                <Textarea
                  value={form.bio}
                  onChange={e => set('bio', e.target.value)}
                  placeholder="Gelernter Elektriker mit 8 Jahren Erfahrung im gewerblichen Innenausbau und in Wartung. Arbeite sauber, eigenständig und zuverlässig, auch unter Zeitdruck."
                  rows={4}
                  maxLength={500}
                  required
                />
                <p className="text-xs text-gray-300 text-right mt-1 font-medium">{form.bio.length}/500 · KI verbessert deinen Text automatisch</p>
              </div>

              {/* Warum den Stundenlohn wert */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label sub="Pflichtfeld — zeig Arbeitgebern warum du deinen Preis wert bist.">Warum bist du deinen Stundenlohn wert? *</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {WARUM_TAGS.map(t => (
                    <YellowChip key={t} label={t} active={form.warum_tags.includes(t)}
                      onClick={() => toggleArray('warum_tags', t)} />
                  ))}
                </div>
                <Textarea
                  value={form.warum_freitext}
                  onChange={e => set('warum_freitext', e.target.value)}
                  placeholder="Ergänzend in eigenen Worten..."
                  rows={2}
                  maxLength={200}
                />
              </div>

              {/* Verfügbarkeit */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label>Beschäftigungsmodell *</Label>
                <div className="flex flex-wrap gap-2 mb-6">
                  {BESCHAEFTIGUNGSMODELLE.map(m => (
                    <Chip key={m} label={m} active={form.beschaeftigungsmodell.includes(m)}
                      onClick={() => toggleArray('beschaeftigungsmodell', m)} />
                  ))}
                </div>

                <Label sub="Leer lassen = ab sofort.">Verfügbar ab</Label>
                <Input
                  type="date"
                  value={form.verfuegbar_ab}
                  onChange={e => set('verfuegbar_ab', e.target.value)}
                  className="mb-6"
                />

                <Label>Wochentage</Label>
                <div className="flex flex-wrap gap-2 mb-6">
                  {WOCHENTAGE.map(t => (
                    <Chip key={t} label={t} active={form.wochentage.includes(t)}
                      onClick={() => toggleArray('wochentage', t)} />
                  ))}
                </div>

                <Label>Tageszeiten</Label>
                <div className="flex flex-wrap gap-2 mb-6">
                  {TAGESZEITEN.map(t => (
                    <Chip key={t} label={t} active={form.tageszeiten.includes(t)}
                      onClick={() => toggleArray('tageszeiten', t)} />
                  ))}
                </div>

                <Label>Einsatzdauer</Label>
                <div className="flex flex-wrap gap-2">
                  {EINSATZDAUER_OPTIONS.map(e => (
                    <Chip key={e} label={e} active={form.einsatzdauer === e} onClick={() => set('einsatzdauer', e)} />
                  ))}
                </div>
              </div>

              {/* Stundenlohn */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <Label>Dein gewünschter Stundenlohn *</Label>
                <div className="relative max-w-40">
                  <Input
                    type="number"
                    min={20}
                    max={300}
                    value={form.hourly_rate}
                    onChange={e => set('hourly_rate', e.target.value)}
                    required
                    className="pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">€/h</span>
                </div>
                <p className="text-xs text-gray-400 font-medium mt-2">
                  Bei MaxiJobber starten qualifizierte Profile ab 20&nbsp;€/h — weil Erfahrung, Ausbildung und Verlässlichkeit einen Wert haben.
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 4: Kontakt + Einwilligung ───────────────────────────── */}
          {step === 4 && (
            <div className="space-y-8">
              <SectionTitle step={4} total={TOTAL_STEPS} title="Kontakt & Abschluss" />

              <div className="bg-white border-2 border-[#1a1a1a] p-6">
                <div className="flex items-start gap-3 px-4 py-3 bg-yellow-50 border-l-[3px] border-yellow-500 mb-6">
                  <p className="text-sm font-bold text-yellow-800">
                    Deine Kontaktdaten bleiben geschützt. Arbeitgeber nehmen zuerst über die Plattform Kontakt auf — du entscheidest ob du antwortest.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>E-Mail *</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="deine@email.de"
                      required
                    />
                    <p className="text-xs text-gray-400 font-medium mt-1.5">Nur intern sichtbar · Arbeitgeber-Anfragen kommen hierher</p>
                  </div>
                  <div>
                    <Label>WhatsApp <span className="font-medium normal-case tracking-normal text-gray-300">(optional)</span></Label>
                    <Input
                      type="tel"
                      value={form.whatsapp}
                      onChange={e => set('whatsapp', e.target.value)}
                      placeholder="+49 170 1234567"
                    />
                    <p className="text-xs text-gray-400 font-medium mt-1.5">Nur intern · nicht öffentlich sichtbar</p>
                  </div>
                  <div>
                    <Label>Telefon <span className="font-medium normal-case tracking-normal text-gray-300">(optional)</span></Label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+49 170 1234567"
                    />
                  </div>
                </div>
              </div>

              {/* Einwilligungen */}
              <div className="bg-white border-2 border-[#1a1a1a] p-6 space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Einwilligung</p>
                {[
                  { key: 'consent_correct' as const, label: 'Ich bestätige, dass meine Angaben korrekt und vollständig sind.' },
                  { key: 'consent_data' as const, label: 'Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu.' },
                  { key: 'consent_profile' as const, label: 'Ich verstehe, dass mein öffentliches Profil nur ausgewählte Daten zeigt — Kontaktdaten bleiben geschützt.' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer">
                    <div
                      onClick={() => set(key, !form[key])}
                      className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${form[key] ? 'bg-gray-900 border-gray-900' : 'border-gray-300 hover:border-gray-900'}`}
                    >
                      {form[key] && <span className="text-white text-xs font-black">✓</span>}
                    </div>
                    <span className="text-sm font-medium text-gray-600 leading-relaxed">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ── Error ──────────────────────────────────────────────────────── */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-[3px] border-red-500">
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* ── Navigation ─────────────────────────────────────────────────── */}
          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button type="button" onClick={back}
                className="px-6 py-4 font-black border-2 border-gray-300 text-sm hover:border-gray-900 transition uppercase tracking-widest">
                ← Zurück
              </button>
            )}

            {step < TOTAL_STEPS ? (
              <button type="button" onClick={next}
                className="flex-1 py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase">
                Weiter →
              </button>
            ) : (
              <button type="submit" disabled={loading}
                className="flex-1 py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase disabled:opacity-40">
                {loading ? 'Wird eingereicht...' : 'Profil einreichen →'}
              </button>
            )}
          </div>

          {step === TOTAL_STEPS && (
            <p className="text-xs text-center text-gray-400 font-medium mt-4">
              Dein Profil wird vor Veröffentlichung geprüft. Private Kontaktdaten bleiben geschützt.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
