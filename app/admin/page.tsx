import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminActions from './AdminActions'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'admin@maxijobber.de').split(',')

export default async function AdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email || '')) redirect('/')

  const service = createServiceClient()

  const { data: pending } = await service
    .from('profiles')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  const { data: approved } = await service
    .from('profiles')
    .select('id, full_name, display_name, vorname, nachname, role, berufsbereich, city, hourly_rate, available, created_at, photo_url, verified, email')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(50)

  const { data: rejected } = await service
    .from('profiles')
    .select('id, full_name, display_name, role, created_at')
    .eq('status', 'rejected')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <div className="h-[3px] bg-yellow-500 w-full" />
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
            <span className="ml-3 text-xs text-gray-400 font-semibold normal-case tracking-normal">Admin</span>
          </a>
          <a href="/profis" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Profis ansehen</a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Ausstehend', value: pending?.length || 0, color: 'text-yellow-500' },
            { label: 'Freigeschaltet', value: approved?.length || 0, color: 'text-green-600' },
            { label: 'Abgelehnt', value: rejected?.length || 0, color: 'text-gray-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border-2 border-[#1a1a1a] p-6" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
              <div className={`text-4xl font-black ${color}`}>{value}</div>
              <div className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>

        {/* Pending queue */}
        {(pending?.length || 0) > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-black tracking-tight mb-5">
              Warten auf Freischaltung ({pending!.length})
            </h2>
            <div className="space-y-4">
              {pending!.map(p => {
                const displayName = p.display_name || p.full_name
                const realName = (p.vorname && p.nachname) ? `${p.vorname} ${p.nachname}` : p.full_name
                return (
                  <div key={p.id} className="bg-white border-2 border-yellow-400 p-6" style={{ boxShadow: '4px 4px 0px #F5C518' }}>
                    <div className="flex items-start gap-5">
                      {/* Avatar */}
                      <div className="w-16 h-16 overflow-hidden bg-gray-100 shrink-0 border-2 border-[#1a1a1a] flex items-center justify-center">
                        {p.photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.photo_url} alt={realName} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl font-black text-gray-400">{realName[0]}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-black text-lg leading-tight">{displayName}</h3>
                            <div className="text-xs text-gray-400 font-medium">Echter Name: {realName}</div>
                            <div className="text-gray-500 text-sm font-medium mt-1">
                              {p.role}{p.berufsbereich ? ` · ${p.berufsbereich}` : ''} · {p.city}
                              {p.hourly_rate ? ` · ab ${p.hourly_rate}€/h` : ''}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 font-medium shrink-0">
                            {new Date(p.created_at).toLocaleDateString('de-DE')}
                          </span>
                        </div>

                        {/* Qualifikation */}
                        {(p.ausbildung || p.erfahrung_stufe) && (
                          <div className="flex flex-wrap gap-3 text-xs mb-3">
                            {p.ausbildung && (
                              <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 font-semibold">
                                {p.ausbildung}{p.ausbildungsberuf ? `: ${p.ausbildungsberuf}` : ''}
                              </span>
                            )}
                            {p.erfahrung_stufe && (
                              <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 font-semibold">{p.erfahrung_stufe}</span>
                            )}
                          </div>
                        )}

                        {p.bio && (
                          <p className="text-gray-600 text-sm mb-3 leading-relaxed font-medium">{p.bio}</p>
                        )}

                        {/* Warum-Tags */}
                        {p.warum_tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {p.warum_tags.map((t: string) => (
                              <span key={t} className="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-xs font-bold text-yellow-800">{t}</span>
                            ))}
                          </div>
                        )}
                        {p.warum_freitext && (
                          <p className="text-gray-500 text-xs mb-3 italic">{p.warum_freitext}</p>
                        )}

                        {p.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {p.skills.map((s: string) => (
                              <span key={s} className="px-2.5 py-1 bg-gray-100 border border-gray-200 text-xs font-semibold">{s}</span>
                            ))}
                          </div>
                        )}

                        {/* Beschäftigungsmodell */}
                        {p.beschaeftigungsmodell?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {p.beschaeftigungsmodell.map((m: string) => (
                              <span key={m} className="px-2 py-0.5 border-2 border-[#1a1a1a] text-xs font-bold">{m}</span>
                            ))}
                          </div>
                        )}

                        {/* Kontaktdaten (nur für Admin sichtbar) */}
                        <div className="flex flex-wrap gap-3 text-xs font-medium border-t border-gray-100 pt-3 mt-1">
                          <span className="text-gray-400 uppercase tracking-widest font-black">Privat:</span>
                          {p.email && <span className="text-blue-600">✉ {p.email}</span>}
                          {p.whatsapp && <span className="text-green-600">WA: {p.whatsapp}</span>}
                          {p.phone && <span className="text-gray-600">Tel: {p.phone}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-5 pt-5 border-t-2 border-gray-100">
                      <AdminActions profileId={p.id} action="approve" label="✓ Freischalten" />
                      <AdminActions profileId={p.id} action="reject" label="✕ Ablehnen" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Approved */}
        {(approved?.length || 0) > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-black tracking-tight mb-5">Freigeschaltet</h2>
            <div className="bg-white border-2 border-[#1a1a1a] overflow-hidden" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#1a1a1a]">
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Anzeigename</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Rolle / Bereich</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Stadt</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Rate</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">E-Mail</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {approved!.map(p => {
                    const displayName = p.display_name || p.full_name
                    return (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="px-5 py-3 font-semibold">
                          <a href={`/profil/${p.id}`} className="hover:text-yellow-600 transition">{displayName}</a>
                          {p.full_name && p.full_name !== displayName && (
                            <div className="text-xs text-gray-400">{p.full_name}</div>
                          )}
                        </td>
                        <td className="px-5 py-3 text-gray-500">
                          <div>{p.role}</div>
                          {p.berufsbereich && <div className="text-xs text-gray-400">{p.berufsbereich}</div>}
                        </td>
                        <td className="px-5 py-3 text-gray-500">{p.city}</td>
                        <td className="px-5 py-3 font-semibold">{p.hourly_rate ? `${p.hourly_rate}€/h` : '—'}</td>
                        <td className="px-5 py-3 text-xs text-gray-400">{p.email || '—'}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <a
                              href={`/profil/${p.id}`}
                              className="px-3 py-1.5 text-xs font-bold border-2 border-gray-200 hover:border-gray-900 transition"
                            >
                              Ansehen
                            </a>
                            <AdminActions profileId={p.id} action="reject" label="Sperren" />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rejected */}
        {(rejected?.length || 0) > 0 && (
          <div>
            <h2 className="text-xl font-black tracking-tight mb-5 text-gray-400">Abgelehnt</h2>
            <div className="bg-white border-2 border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {rejected!.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-5 py-3 font-semibold text-gray-400">{p.display_name || p.full_name}</td>
                      <td className="px-5 py-3 text-gray-400">{p.role}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs">{new Date(p.created_at).toLocaleDateString('de-DE')}</td>
                      <td className="px-5 py-3">
                        <AdminActions profileId={p.id} action="approve" label="Wiederherstellen" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {pending?.length === 0 && approved?.length === 0 && (
          <div className="bg-white border-2 border-[#1a1a1a] p-14 text-center" style={{ boxShadow: '4px 4px 0px #1a1a1a' }}>
            <div className="text-3xl font-black text-gray-200 mb-3">Noch nichts hier</div>
            <p className="text-gray-400 font-medium">Profile erscheinen hier sobald jemand sich über /mitmachen anmeldet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
