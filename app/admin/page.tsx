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
    .select('id, full_name, role, city, hourly_rate, available, created_at, photo_url, verified')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(50)

  const { data: rejected } = await service
    .from('profiles')
    .select('id, full_name, role, created_at')
    .eq('status', 'rejected')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
            <span className="ml-3 text-xs text-gray-400 font-semibold normal-case tracking-normal">Admin</span>
          </a>
          <div className="flex items-center gap-4 text-sm font-semibold text-gray-400">
            <a href="/profis" className="hover:text-gray-900 transition">Profis ansehen</a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Ausstehend', value: pending?.length || 0, color: 'text-yellow-500' },
            { label: 'Freigeschalten', value: approved?.length || 0, color: 'text-green-600' },
            { label: 'Abgelehnt', value: rejected?.length || 0, color: 'text-gray-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6">
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
              {pending!.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border border-yellow-100 p-6">
                  <div className="flex items-start gap-5">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                      {p.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.photo_url} alt={p.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-black text-gray-400">{p.full_name[0]}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-black text-lg">{p.full_name}</h3>
                          <div className="text-gray-500 text-sm font-medium mt-0.5">
                            {p.role} · {p.city} · ab {p.hourly_rate}€/h
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium shrink-0">
                          {new Date(p.created_at).toLocaleDateString('de-DE')}
                        </span>
                      </div>

                      {p.bio && (
                        <p className="text-gray-600 text-sm mt-3 leading-relaxed font-medium">{p.bio}</p>
                      )}

                      {p.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.skills.map((s: string) => (
                            <span key={s} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-semibold">{s}</span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400 font-medium">
                        {p.whatsapp && <span>WhatsApp: {p.whatsapp}</span>}
                        {p.phone && <span>Tel: {p.phone}</span>}
                        {p.email && <span>Mail: {p.email}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-50">
                    <AdminActions profileId={p.id} action="approve" label="Freischalten" />
                    <AdminActions profileId={p.id} action="reject" label="Ablehnen" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved */}
        {(approved?.length || 0) > 0 && (
          <div>
            <h2 className="text-xl font-black tracking-tight mb-5">Freigeschaltet</h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Name</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Rolle</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Stadt</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Rate</th>
                    <th className="text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {approved!.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-5 py-3 font-semibold">
                        <a href={`/profil/${p.id}`} className="hover:text-yellow-600 transition">{p.full_name}</a>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{p.role}</td>
                      <td className="px-5 py-3 text-gray-500">{p.city}</td>
                      <td className="px-5 py-3 font-semibold">{p.hourly_rate}€/h</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <a
                            href={`/profil/${p.id}`}
                            className="px-3 py-1.5 text-xs font-bold border border-gray-200 rounded-lg hover:border-gray-400 transition"
                          >
                            Ansehen
                          </a>
                          <AdminActions profileId={p.id} action="generate-post" label="Post" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {pending?.length === 0 && approved?.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
            <div className="text-3xl font-black text-gray-100 mb-3">Noch nichts hier</div>
            <p className="text-gray-400 font-medium">Profile erscheinen hier sobald jemand sich über /mitmachen anmeldet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
