import { createClient } from '@/lib/supabase/server'

const ROLES = ['Alle', 'Elektriker', 'Klempner', 'Maler', 'Schreiner', 'Trockenbauer', 'Fliesenleger', 'Koch', 'Servicekraft']
const LEVELS = ['Alle', 'junior', 'mid', 'senior', 'expert']

export default async function SuchePage({
  searchParams,
}: {
  searchParams: { rolle?: string; level?: string; verfuegbar?: string }
}) {
  const supabase = createClient()

  let query = supabase
    .from('profiles')
    .select('id, full_name, roles, skills, skill_level, hourly_rate, city, available, verified, bio')
    .eq('type', 'worker')
    .eq('verified', true)
    .order('available', { ascending: false })

  if (searchParams.verfuegbar === '1') query = query.eq('available', true)
  if (searchParams.level && searchParams.level !== 'Alle') query = query.eq('skill_level', searchParams.level)
  if (searchParams.rolle && searchParams.rolle !== 'Alle') {
    query = query.contains('roles', [searchParams.rolle])
  }

  const { data: workers } = await query

  const activeRolle = searchParams.rolle || 'Alle'
  const activeLevel = searchParams.level || 'Alle'
  const onlyAvailable = searchParams.verfuegbar === '1'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/anfrage/neu" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">
              Anfrage stellen
            </a>
            <a
              href="/dashboard/unternehmen"
              className="px-4 py-2 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
            >
              Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-2">Fachkräfte</p>
          <h1 className="text-4xl font-black tracking-tighter">
            {workers?.length || 0} Fachkräfte verfügbar.
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8">
          <div className="flex flex-wrap gap-6">
            {/* Rolle */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Rolle</p>
              <div className="flex flex-wrap gap-2">
                {ROLES.map(rolle => (
                  <a
                    key={rolle}
                    href={`/suche?rolle=${encodeURIComponent(rolle)}&level=${activeLevel}${onlyAvailable ? '&verfuegbar=1' : ''}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 transition ${
                      activeRolle === rolle
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {rolle}
                  </a>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Level</p>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map(level => (
                  <a
                    key={level}
                    href={`/suche?rolle=${activeRolle}&level=${level}${onlyAvailable ? '&verfuegbar=1' : ''}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 transition capitalize ${
                      activeLevel === level
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {level}
                  </a>
                ))}
              </div>
            </div>

            {/* Verfügbar */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Verfügbarkeit</p>
              <a
                href={`/suche?rolle=${activeRolle}&level=${activeLevel}${onlyAvailable ? '' : '&verfuegbar=1'}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 transition ${
                  onlyAvailable
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                Nur Verfügbare
              </a>
            </div>
          </div>
        </div>

        {/* Results */}
        {!workers?.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
            <div className="text-3xl font-black text-gray-100 mb-3">Keine Treffer</div>
            <p className="text-gray-400 font-medium">Versuche andere Filter oder stell direkt eine Anfrage.</p>
            <a href="/anfrage/neu" className="inline-block mt-6 px-6 py-3 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition">
              Anfrage stellen →
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workers.map(worker => (
              <a
                key={worker.id}
                href={`/profil/${worker.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-yellow-200 hover:shadow-md transition block group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black text-lg shrink-0">
                    {worker.full_name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm">{worker.full_name}</div>
                    <div className="text-gray-400 text-xs mt-0.5 truncate">
                      {worker.roles?.[0]} · {worker.city}
                    </div>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${worker.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>

                {worker.bio && (
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 font-medium">{worker.bio}</p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {worker.skills?.slice(0, 3).map((skill: string) => (
                    <span key={skill} className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                  {(worker.skills?.length || 0) > 3 && (
                    <span className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-400">
                      +{worker.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    {worker.skill_level && (
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs font-bold capitalize">{worker.skill_level}</span>
                    )}
                  </div>
                  <div className="font-black text-sm">
                    {worker.hourly_rate ? `${worker.hourly_rate} €/h` : 'Auf Anfrage'}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
