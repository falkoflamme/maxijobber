'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Profile {
  id: string
  full_name: string
  display_name?: string | null
  role: string
  berufsbereich?: string | null
  city: string
  bio?: string | null
  skills?: string[]
  hourly_rate?: number | null
  photo_url?: string | null
  available: boolean
  verified: boolean
  erfahrung_stufe?: string | null
  beschaeftigungsmodell?: string[] | null
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  const name = profile.display_name || profile.full_name
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div
      className="bg-white border-2 border-[#1a1a1a] flex flex-col transition-all duration-200 hover:shadow-[6px_6px_0px_#F5C518] group"
      style={{ boxShadow: '4px 4px 0px #1a1a1a' }}
    >
      <Link href={`/profil/${profile.id}`} className="block p-6 flex-1">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 overflow-hidden bg-gray-100 shrink-0 relative border-2 border-[#1a1a1a]">
            {profile.photo_url ? (
              <Image src={profile.photo_url} alt={name} fill className="object-cover" sizes="56px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white font-black text-base">{initials}</div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-base leading-tight">{name}</span>
              {profile.verified && (
                <svg className="w-4 h-4 text-yellow-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="text-gray-500 text-sm font-medium mt-0.5">{profile.role}</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-gray-400 text-xs font-medium">{profile.city}</span>
              {profile.erfahrung_stufe && <span className="text-gray-300 text-xs">· {profile.erfahrung_stufe}</span>}
              <span className={`w-2 h-2 rounded-full ${profile.available ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={`text-xs font-semibold ${profile.available ? 'text-green-600' : 'text-gray-400'}`}>
                {profile.available ? 'Verfügbar' : 'Belegt'}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 font-medium">{profile.bio}</p>
        )}

        {/* Skills */}
        {(profile.skills?.length || 0) > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {profile.skills!.slice(0, 4).map(skill => (
              <span key={skill} className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-xs font-semibold">{skill}</span>
            ))}
            {profile.skills!.length > 4 && (
              <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-400">+{profile.skills!.length - 4}</span>
            )}
          </div>
        )}

        {/* Rate */}
        {profile.hourly_rate && (
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">ab</span>
            <span className="text-2xl font-black">{profile.hourly_rate}€</span>
            <span className="text-gray-400 text-sm font-semibold">/h</span>
          </div>
        )}
      </Link>

      {/* Footer */}
      <div className="px-6 pb-5 border-t-2 border-[#1a1a1a] pt-4">
        <Link
          href={`/profil/${profile.id}`}
          className="block w-full py-2.5 font-black border-2 border-[#1a1a1a] text-xs text-center hover:bg-gray-900 hover:text-white transition uppercase tracking-widest"
        >
          Profil ansehen →
        </Link>
      </div>
    </div>
  )
}
