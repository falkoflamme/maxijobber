'use client'

import { useState } from 'react'

interface Props {
  profileId: string
  action: 'approve' | 'reject' | 'generate-post'
  label: string
}

export default function AdminActions({ profileId, action, label }: Props) {
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<{ linkedin?: string; instagram?: string } | null>(null)
  const [copied, setCopied] = useState<'linkedin' | 'instagram' | null>(null)

  async function handleClick() {
    setLoading(true)

    if (action === 'generate-post') {
      const profileRes = await fetch(`/api/admin/profile?id=${profileId}`)
      if (!profileRes.ok) { setLoading(false); return }
      const profile = await profileRes.json()
      const url = `${window.location.origin}/profil/${profileId}`
      const res = await fetch('/api/ai/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, profile_url: url }),
      })
      if (res.ok) setPost(await res.json())
      setLoading(false)
      return
    }

    await fetch('/api/admin/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: profileId, action }),
    })
    setLoading(false)
    window.location.reload()
  }

  function copy(type: 'linkedin' | 'instagram') {
    navigator.clipboard.writeText(post?.[type] || '')
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const styles: Record<string, string> = {
    approve: 'bg-green-500 text-white hover:bg-green-600',
    reject: 'border border-gray-200 hover:border-red-300 hover:text-red-500',
    'generate-post': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-xs font-black transition disabled:opacity-50 ${styles[action]}`}
      >
        {loading ? '...' : label}
      </button>

      {post && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setPost(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-black tracking-tight mb-6">Posts generiert</h3>

            <div className="space-y-5">
              {[
                { key: 'linkedin' as const, label: 'LinkedIn' },
                { key: 'instagram' as const, label: 'Instagram' },
              ].map(({ key, label }) => post[key] && (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</span>
                    <button
                      onClick={() => copy(key)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        copied === key ? 'bg-green-100 text-green-700' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {copied === key ? 'Kopiert!' : 'Kopieren'}
                    </button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {post[key]}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPost(null)}
              className="mt-6 w-full py-3 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
