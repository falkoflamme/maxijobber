import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function UnternehmenDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!profile || profile.type !== 'company') redirect('/auth/login')

  const { data: jobs } = await supabase
    .from('job_requests')
    .select(`
      *,
      matches (id, status, score, worker_id,
        profiles!matches_worker_id_fkey (full_name, roles, skill_level, hourly_rate, phone, whatsapp)
      )
    `)
    .eq('company_id', profile.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/anfrage/neu"
              className="px-5 py-2.5 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
            >
              Neue Anfrage
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-1">Unternehmen Dashboard</p>
          <h1 className="text-3xl font-black tracking-tighter">{profile.full_name}</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Offene Anfragen', value: jobs?.filter(j => j.status === 'open').length || 0 },
            { label: 'Mit Matches', value: jobs?.filter(j => j.status === 'matched').length || 0 },
            { label: 'Abgeschlossen', value: jobs?.filter(j => j.status === 'closed').length || 0 },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-3xl font-black">{value}</div>
              <div className="text-xs text-gray-400 font-semibold mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Job requests */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black tracking-tight">Anfragen</h2>
          <a href="/anfrage/neu" className="text-sm font-black text-yellow-600 hover:text-yellow-700 transition">
            + Neue Anfrage
          </a>
        </div>

        {!jobs?.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <div className="text-2xl font-black text-gray-200 mb-2">Noch keine Anfragen</div>
            <p className="text-gray-400 text-sm font-medium mb-6">
              Stellen Sie Ihre erste Anfrage — unsere KI findet die passenden Fachkräfte.
            </p>
            <a
              href="/anfrage/neu"
              className="inline-block px-6 py-3 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
            >
              Erste Anfrage stellen →
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job: {
              id: string
              title: string
              role: string
              location: string
              hours: number | null
              rate_offered: number | null
              status: string
              created_at: string
              matches: Array<{
                id: string
                status: string
                score: number
                worker_id: string
                profiles: {
                  full_name: string
                  roles: string[]
                  skill_level: string
                  hourly_rate: number | null
                  phone: string | null
                  whatsapp: string | null
                } | null
              }>
            }) => (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <a href={`/anfrage/${job.id}`} className="font-black text-base hover:text-yellow-600 transition">
                        {job.title}
                      </a>
                      <div className="text-gray-400 text-xs mt-1">
                        {job.role} · {job.location}
                        {job.rate_offered && ` · ${job.rate_offered} €/h`}
                        {job.hours && ` · ${job.hours}h`}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                      job.status === 'matched' ? 'bg-green-100 text-green-700' :
                      job.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {job.status === 'open' ? 'Offen' : job.status === 'matched' ? 'Matches gefunden' : 'Abgeschlossen'}
                    </span>
                  </div>

                  {/* Matches preview */}
                  {job.matches?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-50">
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                        Top Matches ({job.matches.length})
                      </p>
                      <div className="space-y-2">
                        {job.matches.slice(0, 3).map(match => (
                          <div key={match.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                            <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white font-black text-sm shrink-0">
                              {match.profiles?.full_name?.[0] || '?'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-black text-sm">{match.profiles?.full_name}</div>
                              <div className="text-gray-400 text-xs">
                                {match.profiles?.roles?.[0]} · {match.profiles?.skill_level}
                                {match.profiles?.hourly_rate && ` · ${match.profiles.hourly_rate} €/h`}
                              </div>
                            </div>
                            <div className="text-right shrink-0 flex items-center gap-3">
                              <div>
                                <div className="font-black text-sm">{match.score}%</div>
                                <div className="text-xs text-gray-400">Match</div>
                              </div>
                              {match.profiles?.whatsapp && (
                                <a
                                  href={`https://wa.me/${match.profiles.whatsapp.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 transition"
                                >
                                  WhatsApp
                                </a>
                              )}
                              {!match.profiles?.whatsapp && match.profiles?.phone && (
                                <a
                                  href={`tel:${match.profiles.phone}`}
                                  className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-700 transition"
                                >
                                  Anrufen
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
