import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('full_name, role, city, bio, photo_url')
    .eq('id', params.id)
    .eq('verified', true)
    .single()

  if (!data) return { title: 'Profil nicht gefunden — MaxiJobber' }

  return {
    title: `${data.full_name} — ${data.role} in ${data.city} | MaxiJobber`,
    description: data.bio || `${data.full_name} ist ${data.role} in ${data.city} und auf MaxiJobber verfügbar.`,
    openGraph: {
      title: `${data.full_name} — ${data.role}`,
      description: data.bio || `${data.role} in ${data.city} · Direktkontakt auf MaxiJobber`,
      images: data.photo_url ? [data.photo_url] : [],
    },
  }
}

export default async function ProfilPage({ params }: Props) {
  const supabase = createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .eq('verified', true)
    .single()

  if (!profile) notFound()

  const initials = profile.full_name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const shareUrl = `https://maxijobber.de/profil/${profile.id}`

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <a
            href="/profis"
            className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition"
          >
            ← Alle Profis
          </a>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 relative">
            {profile.photo_url ? (
              <Image
                src={profile.photo_url}
                alt={profile.full_name}
                fill
                className="object-cover"
                sizes="96px"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white font-black text-3xl">
                {initials}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-3xl font-black tracking-tighter">{profile.full_name}</h1>
              {profile.verified && (
                <svg className="w-5 h-5 text-yellow-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="text-gray-500 font-semibold text-lg">{profile.role}</div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-400 text-sm font-medium">{profile.city}</span>
              <span className="text-gray-200">·</span>
              <span className={`flex items-center gap-1.5 text-sm font-bold ${profile.available ? 'text-green-600' : 'text-gray-400'}`}>
                <span className={`w-2 h-2 rounded-full ${profile.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                {profile.available ? 'Verfügbar' : 'Derzeit belegt'}
              </span>
            </div>
          </div>
        </div>

        {/* Rate — prominent */}
        {profile.hourly_rate && (
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Stundensatz</div>
              <div className="text-4xl font-black">ab {profile.hourly_rate}€<span className="text-gray-400 text-xl font-semibold">/h</span></div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Konditionen</div>
              <div className="text-sm font-semibold text-gray-600">Direkt verhandelbar</div>
            </div>
          </div>
        )}

        {/* Contact — THE MAIN THING */}
        <div className="border-2 border-gray-900 rounded-2xl p-6 mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Direkt Kontakt aufnehmen</h2>
          <div className="space-y-3">
            {profile.whatsapp && (
              <a
                href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}?text=Hallo%20${encodeURIComponent(profile.full_name)},%20ich%20habe%20dein%20Profil%20auf%20MaxiJobber%20gesehen%20und%20w%C3%BCrde%20gerne%20mit%20dir%20sprechen.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 font-black bg-green-500 text-white rounded-xl hover:bg-green-600 transition text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp schreiben
              </a>
            )}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center justify-center gap-2 w-full py-4 font-black bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                </svg>
                {profile.phone} anrufen
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}?subject=Anfrage%20über%20MaxiJobber&body=Hallo%20${encodeURIComponent(profile.full_name)},%0A%0Aich%20habe%20dein%20Profil%20auf%20MaxiJobber%20gesehen%20und%20würde%20gerne%20mit%20dir%20zusammenarbeiten.`}
                className="flex items-center justify-center gap-2 w-full py-4 font-black border-2 border-gray-200 rounded-xl hover:border-gray-400 transition text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-Mail schreiben
              </a>
            )}
          </div>
          <p className="text-xs text-center text-gray-400 mt-4 font-medium">
            Direktkontakt · Kein Mittelsmann · Keine Plattform-Gebühr
          </p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mb-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Über mich</h2>
            <p className="text-gray-700 font-medium leading-relaxed text-base">{profile.bio}</p>
          </div>
        )}

        {/* Skills */}
        {(profile.skills?.length || 0) > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-bold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Profil teilen</h2>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-500 focus:outline-none"
            />
            <button
              onClick={undefined}
              className="px-4 py-2.5 font-black bg-gray-900 text-white rounded-xl text-xs hover:bg-gray-700 transition"
              id="copy-url"
            >
              Kopieren
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8 mt-10">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="/" className="text-lg font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <p className="text-gray-400 text-xs font-medium">Frankfurt am Main · Direktvermittlung · Keine Agentur</p>
          <a href="/mitmachen" className="text-xs font-black text-yellow-600 hover:text-yellow-700 transition">
            Selbst mitmachen →
          </a>
        </div>
      </footer>
    </div>
  )
}
