import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil eingereicht — MaxiJobber',
  robots: { index: false },
}

export default function DankePage() {
  return (
    <div className="min-h-screen bg-[#F5F4F0] flex flex-col">
      <div className="h-[3px] bg-yellow-500 w-full" />

      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <a href="/" className="text-xl font-black tracking-tighter">
            <img src="/logo2.png" alt="MaxiJobber" className="h-10 w-auto" />
          </a>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full">
          <div className="bg-white border-2 border-[#1a1a1a] p-10 text-center" style={{ boxShadow: '4px 4px 0px #F5C518' }}>
            <div className="w-14 h-14 bg-yellow-500 border-2 border-[#1a1a1a] flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-black tracking-tighter mb-3">Profil eingereicht.</h1>
            <p className="text-gray-500 font-medium leading-relaxed mb-2">
              Wir prüfen jetzt, ob alles passt. Nach Freischaltung erscheint dein Profil bei den Profis.
            </p>
            <p className="text-gray-400 text-sm font-medium mb-8">
              Wir melden uns nur, wenn etwas fehlt oder angepasst werden muss.
            </p>

            <div className="bg-[#F5F4F0] border-2 border-gray-200 p-5 text-left mb-8 space-y-3">
              {[
                "Profil wird manuell geprüft",
                "Kontaktdaten bleiben geschützt und sind niemals öffentlich",
                "Nach Freischaltung erscheinst du auf /profis",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-[3px] h-4 bg-yellow-500 shrink-0" />
                  <span className="text-sm font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="/profis"
              className="inline-block px-8 py-3 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase"
            >
              Profis ansehen →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
