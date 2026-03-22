import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import CopyButton from '@/components/CopyButton'
import ContactForm from '@/components/ContactForm'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('display_name, full_name, role, city, bio, photo_url')
    .eq('id', params.id)
    .eq('verified', true)
    .single()

  if (!data) return { title: 'Profil nicht gefunden — MaxiJobber' }
  const name = data.display_name || data.full_name

  return {
    title: `${name} — ${data.role} in ${data.city} | MaxiJobber`,
    description: data.bio || `${name} ist ${data.role} in ${data.city} und auf MaxiJobber verfügbar.`,
    openGraph: {
      title: `${name} — ${data.role}`,
      description: data.bio || `${data.role} in ${data.city} · Kontakt über MaxiJobber`,
      images: data.photo_url ? [data.photo_url] : [],
    },
  }
}

export default async function ProfilPage({ params }: Props) {
  const supabase = createClient()

  // Only select public fields — contact data stays server-side
  const { data: profile } = await supabase
    .from('profiles')
    .select(`
      id, display_name, full_name, role, berufsbereich, city, bio, skills,
      hourly_rate, photo_url, available, verified,
      ausbildung, ausbildungsberuf, erfahrung_stufe,
      warum_tags, warum_freitext,
      beschaeftigungsmodell, verfuegbar_ab, wochentage, tageszeiten, einsatzdauer,
      mobil_einsetzbar, created_at
    `)
    .eq('id', params.id)
    .eq('verified', true)
    .single()

  if (!profile) notFound()

  const name = profile.display_name || profile.full_name
  const initials = name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
  const shareUrl = `https://www.maxijobber.de/profil/${profile.id}`

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <div className="h-[3px] bg-yellow-500 w-full" />

      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/"><img src="/logo2.png" alt="MaxiJobber" className="h-10 w-auto" /></a>
          <a href="/profis" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition">← Alle Profis</a>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-5">

        {/* Hero */}
        <div className="bg-white border-2 border-[#1a1a1a] p-8" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 overflow-hidden bg-gray-100 shrink-0 relative border-2 border-[#1a1a1a]">
              {profile.photo_url ? (
                <Image src={profile.photo_url} alt={name} fill className="object-cover" sizes="96px" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white font-black text-3xl">{initials}</div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-3xl font-black tracking-tighter">{name}</h1>
                {profile.verified && (
                  <svg className="w-5 h-5 text-yellow-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="text-gray-500 font-semibold">{profile.role}{profile.berufsbereich ? ` · ${profile.berufsbereich}` : ''}</div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                <span className="text-gray-400 text-sm font-medium">{profile.city}</span>
                {profile.mobil_einsetzbar && <span className="text-xs font-bold text-gray-400">· Mobil einsetzbar</span>}
                <span className={`flex items-center gap-1.5 text-sm font-bold ${profile.available ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${profile.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                  {profile.available ? 'Verfügbar' : 'Derzeit belegt'}
                </span>
              </div>
            </div>
          </div>

          {/* Rate */}
          {profile.hourly_rate && (
            <div className="mt-6 pt-6 border-t-2 border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Stundensatz</div>
                <div className="text-4xl font-black">ab {profile.hourly_rate}€<span className="text-gray-400 text-xl font-semibold">/h</span></div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Konditionen</div>
                <div className="text-sm font-semibold text-gray-600">Individuell abstimmbar</div>
              </div>
            </div>
          )}
        </div>

        {/* Qualifikation */}
        {(profile.ausbildung || profile.erfahrung_stufe) && (
          <div className="bg-white border-2 border-[#1a1a1a] p-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Qualifikation</h2>
            <div className="grid grid-cols-2 gap-4">
              {profile.ausbildung && (
                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-1">Ausbildung</div>
                  <div className="text-sm font-black">{profile.ausbildung}</div>
                  {profile.ausbildungsberuf && <div className="text-xs text-gray-500 font-medium mt-0.5">{profile.ausbildungsberuf}</div>}
                </div>
              )}
              {profile.erfahrung_stufe && (
                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-1">Berufserfahrung</div>
                  <div className="text-sm font-black">{profile.erfahrung_stufe}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bio */}
        {profile.bio && (
          <div className="bg-white border-2 border-[#1a1a1a] p-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Kurzprofil</h2>
            <p className="text-gray-700 font-medium leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* Warum */}
        {((profile.warum_tags?.length || 0) > 0 || profile.warum_freitext) && (
          <div className="bg-white border-2 border-[#1a1a1a] p-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Warum diesen Stundenlohn</h2>
            {(profile.warum_tags?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.warum_tags.map((t: string) => (
                  <span key={t} className="px-3 py-1.5 bg-yellow-50 border-2 border-yellow-200 text-xs font-bold text-yellow-800">{t}</span>
                ))}
              </div>
            )}
            {profile.warum_freitext && <p className="text-gray-600 text-sm font-medium leading-relaxed">{profile.warum_freitext}</p>}
          </div>
        )}

        {/* Skills */}
        {(profile.skills?.length || 0) > 0 && (
          <div className="bg-white border-2 border-[#1a1a1a] p-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s: string) => (
                <span key={s} className="px-4 py-2 bg-gray-50 border-2 border-gray-200 text-sm font-bold">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Verfügbarkeit */}
        {((profile.beschaeftigungsmodell?.length || 0) > 0 || profile.einsatzdauer || (profile.wochentage?.length || 0) > 0) && (
          <div className="bg-white border-2 border-[#1a1a1a] p-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Verfügbarkeit</h2>
            <div className="space-y-4">
              {(profile.beschaeftigungsmodell?.length || 0) > 0 && (
                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-2">Beschäftigungsmodell</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.beschaeftigungsmodell.map((m: string) => (
                      <span key={m} className="px-3 py-1.5 border-2 border-[#1a1a1a] text-xs font-bold">{m}</span>
                    ))}
                  </div>
                </div>
              )}
              {profile.verfuegbar_ab && (
                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-1">Verfügbar ab</div>
                  <div className="text-sm font-black">{new Date(profile.verfuegbar_ab).toLocaleDateString('de-DE')}</div>
                </div>
              )}
              {(profile.wochentage?.length || 0) > 0 && (
                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-2">Wochentage</div>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.wochentage.map((t: string) => (
                      <span key={t} className="px-2.5 py-1 bg-gray-100 text-xs font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {(profile.tageszeiten?.length || 0) > 0 && (
                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-2">Tageszeiten</div>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.tageszeiten.map((t: string) => (
                      <span key={t} className="px-2.5 py-1 bg-gray-100 text-xs font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {profile.einsatzdauer && (
                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-1">Einsatzdauer</div>
                  <div className="text-sm font-black">{profile.einsatzdauer}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact form */}
        <ContactForm profileId={profile.id} profileName={name} />

        {/* Share */}
        <div className="bg-white border-2 border-[#1a1a1a] p-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Profil teilen</h2>
          <CopyButton url={shareUrl} />
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white px-6 py-8 mt-10">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="/"><img src="/logo2.png" alt="MaxiJobber" className="h-7 w-auto" /></a>
          <p className="text-gray-400 text-xs font-medium">Frankfurt am Main · Direktvermittlung · Keine Agentur</p>
          <a href="/mitmachen" className="text-xs font-black text-yellow-600 hover:text-yellow-700 transition">Profil erstellen →</a>
        </div>
      </footer>
    </div>
  )
}
