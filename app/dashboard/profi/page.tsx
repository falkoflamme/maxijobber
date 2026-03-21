import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfiDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!profile || profile.type !== 'worker') redirect('/auth/login')

  const { data: matches } = await supabase
    .from('matches')
    .select(`
      *,
      job_requests (
        title, role, location, hours, rate_offered, date_needed,
        profiles!job_requests_company_id_fkey (full_name, city)
      )
    `)
    .eq('worker_id', profile.id)
    .order('created_at', { ascending: false })

  const stats = {
    total: matches?.length || 0,
    suggested: matches?.filter(m => m.status === 'suggested').length || 0,
    contacted: matches?.filter(m => m.status === 'contacted').length || 0,
    confirmed: matches?.filter(m => m.status === 'confirmed').length || 0,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <div className="flex items-center gap-4">
            <a href={`/profil/${profile.id}`} className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">
              Profil ansehen
            </a>
            <form action="/auth/signout" method="post">
              <button className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Abmelden</button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-1">Mein Dashboard</p>
            <h1 className="text-3xl font-black tracking-tighter">
              Hallo, {profile.full_name.split(' ')[0]}.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!profile.verified && (
              <span className="px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-bold">
                Verifizierung ausstehend
              </span>
            )}
            {profile.verified && (
              <span className="px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold">
                Verifiziert
              </span>
            )}
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              profile.available
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-gray-100 border-gray-200 text-gray-500'
            }`}>
              {profile.available ? 'Verfügbar' : 'Belegt'}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Matches gesamt', value: stats.total },
            { label: 'Neu', value: stats.suggested },
            { label: 'Kontaktiert', value: stats.contacted },
            { label: 'Bestätigt', value: stats.confirmed },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-3xl font-black">{value}</div>
              <div className="text-xs text-gray-400 font-semibold mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Profile completeness */}
        {!profile.onboarding_complete && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div>
              <div className="font-black text-sm mb-0.5">Profil vervollständigen</div>
              <div className="text-xs text-yellow-700 font-medium">Vollständige Profile erhalten 3x mehr Anfragen.</div>
            </div>
            <a
              href="/profil/erstellen"
              className="px-4 py-2 font-black bg-yellow-500 text-black rounded-full text-xs hover:bg-yellow-400 transition shrink-0"
            >
              Jetzt →
            </a>
          </div>
        )}

        {/* Matches */}
        <div>
          <h2 className="text-lg font-black tracking-tight mb-4">Anfragen & Matches</h2>

          {!matches?.length ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <div className="text-2xl font-black text-gray-200 mb-2">Noch keine Matches</div>
              <p className="text-gray-400 text-sm font-medium">
                Sobald Unternehmen eine passende Anfrage stellen, erscheinen deine Matches hier.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {matches.map((match: {
                id: string
                status: string
                score: number
                reasons: string[]
                created_at: string
                job_requests: {
                  title: string
                  role: string
                  location: string
                  hours: number | null
                  rate_offered: number | null
                  date_needed: string | null
                  profiles: { full_name: string; city: string } | null
                }
              }) => (
                <div key={match.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-yellow-200 transition">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-black text-sm">{match.job_requests?.title}</div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {match.job_requests?.location}
                        {match.job_requests?.rate_offered && ` · ${match.job_requests.rate_offered} €/h`}
                        {match.job_requests?.hours && ` · ${match.job_requests.hours}h`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-xl font-black">{match.score}%</div>
                        <div className="text-xs text-gray-400">Match</div>
                      </div>
                    </div>
                  </div>

                  {match.reasons?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {match.reasons.map((r: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-600">
                          {r}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      match.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      match.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {match.status === 'suggested' ? 'Neu' :
                       match.status === 'contacted' ? 'Kontaktiert' : 'Bestätigt'}
                    </span>
                    <span className="text-xs text-gray-300 font-medium">
                      {new Date(match.created_at).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
