import { createClient } from '@/lib/supabase/server'
import ProfileCard from '@/components/ProfileCard'

const CITIES = ['Alle', 'Frankfurt', 'Offenbach', 'Wiesbaden', 'Darmstadt', 'Mainz']
const ROLES = [
  'Alle', 'Sous Chef', 'Chef de Partie', 'Head Waiter', 'Koch',
  'Elektriker', 'Klempner', 'Maler', 'Schreiner', 'Trockenbauer', 'Servicekraft',
]

export default async function ProfisPage({
  searchParams,
}: {
  searchParams: { rolle?: string; city?: string; verfuegbar?: string }
}) {
  const supabase = createClient()

  let query = supabase
    .from('profiles')
    .select('id, full_name, role, city, bio, skills, hourly_rate, phone, whatsapp, email, photo_url, available, verified')
    .eq('status', 'approved')
    .eq('verified', true)
    .order('available', { ascending: false })
    .order('created_at', { ascending: false })

  if (searchParams.verfuegbar === '1') query = query.eq('available', true)
  if (searchParams.city && searchParams.city !== 'Alle') query = query.ilike('city', `%${searchParams.city}%`)
  if (searchParams.rolle && searchParams.rolle !== 'Alle') query = query.ilike('role', `%${searchParams.rolle}%`)

  const { data: profiles } = await query

  const activeRolle = searchParams.rolle || 'Alle'
  const activeCity = searchParams.city || 'Alle'
  const onlyAvailable = searchParams.verfuegbar === '1'

  function filterLink(update: Record<string, string>) {
    const p = new URLSearchParams({
      rolle: activeRolle,
      city: activeCity,
      ...(onlyAvailable ? { verfuegbar: '1' } : {}),
      ...update,
    })
    if (p.get('verfuegbar') === '0') p.delete('verfuegbar')
    return `/profis?${p.toString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <a
            href="/mitmachen"
            className="px-5 py-2.5 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
          >
            Mitmachen
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-2">Frankfurt & Umgebung</p>
          <h1 className="text-4xl font-black tracking-tighter">
            {profiles?.length || 0} {onlyAvailable ? 'verfügbare' : ''} Fachkräfte.
          </h1>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 space-y-4">
          {/* Rollen */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2.5">Rolle</p>
            <div className="flex flex-wrap gap-2">
              {ROLES.map(r => (
                <a
                  key={r}
                  href={filterLink({ rolle: r })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 transition ${
                    activeRolle === r
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {r}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            {/* Stadt */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Stadt</p>
              <div className="flex flex-wrap gap-2">
                {CITIES.map(c => (
                  <a
                    key={c}
                    href={filterLink({ city: c })}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 transition ${
                      activeCity === c
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {c}
                  </a>
                ))}
              </div>
            </div>

            {/* Verfügbar toggle */}
            <div className="ml-auto">
              <a
                href={filterLink({ verfuegbar: onlyAvailable ? '0' : '1' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
                  onlyAvailable
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${onlyAvailable ? 'bg-green-500' : 'bg-gray-300'}`} />
                Nur Verfügbare
              </a>
            </div>
          </div>
        </div>

        {/* Grid */}
        {!profiles?.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
            <div className="text-3xl font-black text-gray-200 mb-3">Keine Treffer</div>
            <p className="text-gray-400 font-medium mb-6">Versuche andere Filter oder melde dich selbst an.</p>
            <a
              href="/mitmachen"
              className="inline-block px-6 py-3 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
            >
              Jetzt mitmachen →
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {profiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 bg-gray-900 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-black tracking-tighter mb-3">Du bist Fachkraft?</h2>
          <p className="text-white/40 font-medium mb-6">Stell dich vor — kostenlos, in 5 Minuten.</p>
          <a
            href="/mitmachen"
            className="inline-block px-8 py-4 font-black bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition text-sm"
          >
            Profil einreichen →
          </a>
        </div>
      </div>
    </div>
  )
}
