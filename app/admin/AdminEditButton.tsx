'use client'

import { useState } from 'react'

interface Props {
  profileId: string
  initialBio: string
  initialRate: number
  initialDisplayName: string
}

export default function AdminEditButton({ profileId, initialBio, initialRate, initialDisplayName }: Props) {
  const [open, setOpen] = useState(false)
  const [bio, setBio] = useState(initialBio || '')
  const [rate, setRate] = useState(String(initialRate || ''))
  const [displayName, setDisplayName] = useState(initialDisplayName || '')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  async function save() {
    setLoading(true)
    await fetch('/api/admin/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: profileId, bio, hourly_rate: parseInt(rate), display_name: displayName }),
    })
    setLoading(false)
    setSaved(true)
    setTimeout(() => { setSaved(false); setOpen(false); window.location.reload() }, 800)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-xs font-black border-2 border-gray-200 hover:border-gray-900 transition uppercase tracking-widest"
      >
        Bearbeiten
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setOpen(false)}>
          <div
            className="bg-white border-2 border-[#1a1a1a] w-full max-w-lg"
            style={{ boxShadow: '6px 6px 0px #F5C518' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b-2 border-[#1a1a1a]">
              <p className="text-xs font-black uppercase tracking-widest">Profil bearbeiten</p>
            </div>

            <div className="px-6 py-5 space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Anzeigename</p>
                <input
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Kurzprofil (Bio)</p>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition resize-none"
                />
                <p className="text-xs text-gray-400 font-medium mt-1">{bio.length} / 280 Zeichen</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Stundensatz (€/h)</p>
                <input
                  type="number"
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                  min={20}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-gray-900 transition"
                />
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-3 font-black border-2 border-gray-200 text-sm hover:border-gray-900 transition uppercase tracking-widest"
              >
                Abbrechen
              </button>
              <button
                onClick={save}
                disabled={loading || saved}
                className="flex-1 py-3 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a] disabled:opacity-40"
              >
                {saved ? 'Gespeichert ✓' : loading ? '...' : 'Speichern →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
