import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'

export default async function AnfragePage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: job } = await supabase
    .from('job_requests')
    .select(`
      *,
      matches (
        id, score, status, reasons, created_at,
        profiles!matches_worker_id_fkey (
          id, full_name, roles, skills, skill_level, hourly_rate,
          phone, whatsapp, bio, city, available, verified
        )
      )
    `)
    .eq('id', params.id)
    .single()

  if (!job) notFound()

  const matches = job.matches?.sort((a: { score: number }, b: { score: number }) => b.score - a.score) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <a href="/dashboard/unternehmen" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">
            ← Dashboard
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Job header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-1">Anfrage</p>
              <h1 className="text-2xl font-black tracking-tight">{job.title}</h1>
              <div className="text-gray-400 text-sm mt-1 font-medium">
                {job.role} · {job.location}
                {job.rate_offered && ` · ${job.rate_offered} €/h`}
                {job.hours && ` · ${job.hours}h`}
                {job.date_needed && ` · Ab ${new Date(job.date_needed).toLocaleDateString('de-DE')}`}
              </div>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 ${
              job.status === 'matched' ? 'bg-green-100 text-green-700' :
              job.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-500'
            }`}>
              {job.status === 'open' ? 'Sucht noch' : job.status === 'matched' ? 'Matches vorhanden' : 'Abgeschlossen'}
            </span>
          </div>

          {job.skills_needed?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
              {job.skills_needed.map((s: string) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Matches */}
        <h2 className="text-lg font-black tracking-tight mb-4">
          {matches.length > 0 ? `${matches.length} Matches gefunden` : 'Keine Matches'}
        </h2>

        {matches.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <div className="text-2xl font-black text-gray-200 mb-2">Matching läuft</div>
            <p className="text-gray-400 text-sm font-medium">
              Sobald passende Fachkräfte gefunden werden, erscheinen sie hier.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {matches.map((match: {
            id: string
            score: number
            status: string
            reasons: string[]
            created_at: string
            profiles: {
              id: string
              full_name: string
              roles: string[]
              skills: string[]
              skill_level: string
              hourly_rate: number | null
              phone: string | null
              whatsapp: string | null
              bio: string | null
              city: string
              available: boolean
              verified: boolean
            } | null
          }, i: number) => (
            <div key={match.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-black text-xl shrink-0">
                  {match.profiles?.full_name?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-base">{match.profiles?.full_name}</span>
                        {i === 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                            Bester Match
                          </span>
                        )}
                        {match.profiles?.verified && (
                          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                            Verifiziert
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400 text-sm mt-0.5 font-medium">
                        {match.profiles?.roles?.[0]} · {match.profiles?.city}
                        {match.profiles?.hourly_rate && ` · ${match.profiles.hourly_rate} €/h`}
                        {match.profiles?.skill_level && ` · ${match.profiles.skill_level}`}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-black">{match.score}%</div>
                      <div className="text-xs text-gray-400 font-medium">Match-Score</div>
                    </div>
                  </div>

                  {match.profiles?.bio && (
                    <p className="text-gray-500 text-sm mt-3 font-medium leading-relaxed">{match.profiles.bio}</p>
                  )}

                  {match.reasons?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {match.reasons.map((r: string, ri: number) => (
                        <span key={ri} className="px-2.5 py-1 rounded-full bg-yellow-50 border border-yellow-100 text-xs font-semibold text-yellow-700">
                          {r}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 mt-5">
                    {match.profiles?.whatsapp && (
                      <a
                        href={`https://wa.me/${match.profiles.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 font-black bg-green-500 text-white rounded-full text-xs hover:bg-green-600 transition text-center"
                      >
                        WhatsApp schreiben
                      </a>
                    )}
                    {match.profiles?.phone && (
                      <a
                        href={`tel:${match.profiles.phone}`}
                        className="px-5 py-2.5 font-black bg-gray-900 text-white rounded-full text-xs hover:bg-gray-700 transition text-center"
                      >
                        Anrufen
                      </a>
                    )}
                    {match.profiles?.id && (
                      <a
                        href={`/profil/${match.profiles.id}`}
                        className="px-5 py-2.5 font-black border-2 border-gray-200 rounded-full text-xs hover:border-gray-400 transition text-center"
                      >
                        Profil ansehen
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
