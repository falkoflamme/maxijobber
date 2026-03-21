export default function MockupD() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

      {/* Power stripe */}
      <div className="h-[3px] bg-yellow-500 w-full" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </span>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-400">
            <a href="#wie" className="hover:text-gray-900 transition">Wie es funktioniert</a>
            <a href="/fuer-profis" className="hover:text-gray-900 transition">Fachkräfte</a>
            <a href="/fuer-unternehmen" className="hover:text-gray-900 transition">Unternehmen</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/profis" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Profis ansehen</a>
            <a href="/mitmachen" className="px-5 py-2.5 text-sm font-black bg-gray-900 text-white rounded hover:bg-gray-700 transition uppercase tracking-widest">
              Mitmachen
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-8 pt-20 pb-28 overflow-hidden bg-[#F5F4F0]">
        <div className="absolute top-0 right-0 w-80 h-full bg-gray-900/[0.03] border-l border-gray-300/60 hidden lg:block" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300" />

        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-xs font-black text-yellow-700 tracking-widest uppercase">Frankfurt · Rhein-Main · Nur geprüfte Talente</span>
          </div>

          <h1 className="text-7xl md:text-[96px] font-black leading-none tracking-tighter mb-8 max-w-5xl">
            NICHT JEDER<br />
            KOMMT <span className="text-yellow-500">REIN.</span><br />
            DU SCHON.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-12 mt-2">
            <div>
              <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium mb-5">
                MaxiJobber ist kein Marktplatz für jeden. Wir wählen
                handverlesen aus — und verbinden nur das beste Handwerk
                direkt mit den besten Unternehmen. Kein Mittelsmann.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50">
                <span className="text-sm font-bold text-yellow-800">Bis zu 538&nbsp;€ steuerfrei im Monat dazuverdienen.</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="/mitmachen" className="px-8 py-4 font-black bg-gray-900 text-white rounded hover:bg-gray-700 transition text-sm tracking-widest uppercase text-center">
                Als Fachkraft bewerben
              </a>
              <a href="/profis" className="px-8 py-4 font-black border-2 border-gray-900 rounded hover:bg-gray-900 hover:text-white transition text-sm tracking-widest uppercase text-center">
                Fachkräfte finden
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-20 pt-10 border-t border-gray-300 grid grid-cols-3 gap-8 max-w-2xl">
            {[
              ["100%", "Handverlesen & geprüft"],
              ["25 €/h", "Fairer Mindest-Stundensatz"],
              ["24h", "Bis zur Freischaltung"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-[3px] border-yellow-500 pl-5">
                <div className="text-4xl font-black text-gray-900">{n}</div>
                <div className="text-sm text-gray-400 font-medium mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualitätsversprechen */}
      <section className="py-20 px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {[
              ["Kein Marktplatz.", "Jeder kann sich auf Marktplätzen eintragen. Bei MaxiJobber prüfen wir jedes Profil manuell — bevor es online geht."],
              ["Kein Preiskampf.", "Kein Bieten, kein Unterbieten. Jede Fachkraft setzt ihren fairen Preis ab 25 €/h — transparent und verhandelbar."],
              ["Kein Mittelsmann.", "Unternehmen kontaktieren Fachkräfte direkt per WhatsApp oder Telefon. Keine Plattform-Gebühr, kein Callcenter."],
            ].map(([title, desc]) => (
              <div key={title} className="p-10">
                <div className="text-yellow-500 font-black text-xl mb-4 tracking-tight">{title}</div>
                <p className="text-white/50 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wie es funktioniert — Split */}
      <section id="wie" className="py-28 px-8 bg-[#F5F4F0] border-t border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Der Prozess</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">WIE ES LÄUFT.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-gray-300">
            {/* Für Fachkräfte */}
            <div className="bg-[#F5F4F0] p-12">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Für Fachkräfte</p>
              <div className="space-y-8">
                {[
                  ["01", "Profil einreichen", "Name, Rolle, Skills, Stundensatz — in 5 Minuten. Kein Konto nötig."],
                  ["02", "Wir prüfen dich", "Wir checken manuell ob du wirklich gut bist. Nur echte Profis kommen rein."],
                  ["03", "Werde gefunden", "Dein Profil geht online. Unternehmen sehen dich und melden sich direkt."],
                ].map(([num, title, desc]) => (
                  <div key={num} className="flex gap-6 items-start">
                    <div className="text-3xl font-black text-gray-200 leading-none shrink-0 w-10">{num}</div>
                    <div>
                      <div className="font-black text-base mb-1">{title}</div>
                      <div className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="/mitmachen" className="inline-block mt-10 px-6 py-3 font-black bg-gray-900 text-white rounded hover:bg-gray-700 transition text-xs tracking-widest uppercase">
                Jetzt bewerben →
              </a>
            </div>

            {/* Für Unternehmen */}
            <div className="bg-white p-12">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Für Unternehmen</p>
              <div className="space-y-8">
                {[
                  ["01", "Verzeichnis durchsuchen", "Alle geprüften Fachkräfte in Frankfurt — filterbar nach Rolle, Stadt, Verfügbarkeit."],
                  ["02", "Richtige Person finden", "Stundensatz, Skills und Bio sind transparent. Kein Rätselraten."],
                  ["03", "Direkt Kontakt aufnehmen", "WhatsApp, Telefon oder E-Mail — direkt mit der Person. Ohne Aufschlag."],
                ].map(([num, title, desc]) => (
                  <div key={num} className="flex gap-6 items-start">
                    <div className="text-3xl font-black text-gray-200 leading-none shrink-0 w-10">{num}</div>
                    <div>
                      <div className="font-black text-base mb-1">{title}</div>
                      <div className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="/profis" className="inline-block mt-10 px-6 py-3 font-black bg-yellow-500 text-black rounded hover:bg-yellow-400 transition text-xs tracking-widest uppercase">
                Fachkräfte durchsuchen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Für Fachkräfte */}
      <section id="fachkraefte" className="py-28 px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-6">Für Fachkräfte</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
              DEINE SKILLS.<br />DEIN PREIS.<br />
              <span className="text-yellow-500">DEIN TEMPO.</span>
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed font-medium text-lg">
              Kein Bewerben, kein Warten, kein Vermittler der 30% mitnimmt.
              Du setzt deinen Preis, du entscheidest wann du arbeitest.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50 mb-10">
              <span className="text-sm font-bold text-yellow-800">Bis zu 538&nbsp;€ steuerfrei im Monat dazuverdienen.</span>
            </div>
            <div className="space-y-0 mb-12 border-t border-gray-200">
              {[
                "Geprüftes Profil — sofort Vertrauen bei Auftraggebern",
                "Direkte Anfragen per WhatsApp oder Telefon",
                "Dein Stundensatz — ab 25 €/h, fairer Markt",
                "Minijob, Teilzeit oder Vollzeit — du entscheidest",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-gray-200">
                  <div className="w-[3px] h-4 bg-yellow-500 shrink-0" />
                  <span className="font-semibold text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <a href="/mitmachen" className="inline-block px-8 py-4 font-black bg-gray-900 text-white rounded hover:bg-gray-700 transition text-sm tracking-widest uppercase">
              Jetzt bewerben — kostenlos
            </a>
          </div>

          {/* Profile previews */}
          <div className="space-y-2">
            {[
              { name: "Michael Reuter", job: "Elektriker", exp: "8 Jahre", loc: "Frankfurt Mitte", rate: "42 €/h", avail: true },
              { name: "Sandra Koch", job: "Sanitärinstallateur", exp: "5 Jahre", loc: "Sachsenhausen", rate: "38 €/h", avail: true },
              { name: "Thomas Braun", job: "Maler & Lackierer", exp: "12 Jahre", loc: "Bornheim", rate: "34 €/h", avail: false },
              { name: "Ayse Demir", job: "Trockenbauerin", exp: "6 Jahre", loc: "Nordend", rate: "36 €/h", avail: true },
            ].map(({ name, job, exp, loc, rate, avail }) => (
              <div key={name} className="flex items-center gap-5 p-5 border border-gray-200 hover:border-gray-900 transition">
                <div className="w-11 h-11 bg-gray-900 flex items-center justify-center text-white font-black text-base shrink-0">
                  {name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm">{name}</span>
                    <svg className="w-3.5 h-3.5 text-yellow-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">{job} · {exp} · {loc}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-sm">{rate}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${avail ? "text-green-600" : "text-gray-400"}`}>
                    {avail ? "Verfügbar" : "Belegt"}
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-400 font-medium pt-2 text-center">Alle Profile handverlesen geprüft · Verifiziert durch MaxiJobber</p>
          </div>
        </div>
      </section>

      {/* Für Unternehmen */}
      <section id="unternehmen" className="py-28 px-8 bg-[#F5F4F0] border-t border-gray-300">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          {/* Search UI mockup */}
          <div className="bg-white border border-gray-300 p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Fachkraft suchen</p>
            <div className="space-y-0 mb-8 border-t border-gray-200">
              {[
                { label: "Branche", value: "Elektrotechnik" },
                { label: "Standort", value: "Frankfurt Innenstadt" },
                { label: "Verfügbarkeit", value: "Ab sofort" },
                { label: "Stundensatz", value: "ab 38 €/h" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-4 border-b border-gray-200">
                  <span className="text-sm text-gray-400 font-semibold">{label}</span>
                  <span className="text-sm font-black">{value}</span>
                </div>
              ))}
            </div>
            <a href="/profis" className="block w-full py-4 font-black bg-gray-900 text-white rounded hover:bg-gray-700 transition text-sm tracking-widest uppercase text-center">
              Fachkräfte durchsuchen →
            </a>
            <p className="text-center text-xs text-gray-400 mt-3 font-medium">Kostenlos · Keine Registrierung · Direktkontakt</p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-6">Für Unternehmen</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-8">
              NUR ECHTE<br />
              <span className="text-yellow-500">PROFIS.</span><br />
              DIREKT.
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium text-lg">
              Kein Recruiting. Kein Headhunter. Kein Bieten.
              Alle Fachkräfte auf MaxiJobber sind manuell geprüft —
              Sie sehen nur wen wir wirklich empfehlen.
            </p>
            <div className="space-y-0 mb-12 border-t border-gray-300">
              {[
                "Manuell geprüfte Profile — kein Spam, kein Risiko",
                "Transparente Stundensätze ab 25 €/h",
                "Direktkontakt ohne Agentur-Aufschlag",
                "Oft in 24h besetzt — lokal in Frankfurt",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-gray-300">
                  <div className="w-[3px] h-4 bg-yellow-500 shrink-0" />
                  <span className="font-semibold text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <a href="/profis" className="inline-block px-8 py-4 font-black bg-yellow-500 text-black rounded hover:bg-yellow-400 transition text-sm tracking-widest uppercase">
              Jetzt Fachkraft finden
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Stimmen</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">WAS ANDERE<br />SAGEN.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "In 2 Tagen meinen ersten Auftrag erhalten. Kein Vergleich zu früher — und kein Vermittler der mitverdient.", name: "Michael R.", role: "Elektriker · Frankfurt" },
              { quote: "Endlich keine Agentur mehr. Direkter Kontakt, faire Preise, echte Profis. So muss das sein.", name: "Bau GmbH Frankfurt", role: "Unternehmen · Innenstadt" },
              { quote: "Ich verdiene jetzt 538 € steuerfrei dazu — einfach mit dem was ich eh schon kann.", name: "Sandra K.", role: "Sanitär · Sachsenhausen" },
            ].map(({ quote, name, role }) => (
              <div key={name} className="p-8 border border-gray-200 hover:border-gray-900 transition border-t-[3px] border-t-yellow-500">
                <p className="text-gray-700 text-base leading-relaxed mb-8 font-semibold">&ldquo;{quote}&rdquo;</p>
                <div className="font-black text-sm">{name}</div>
                <div className="text-gray-400 text-xs mt-1 font-medium">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-8 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-4">
              QUALITÄT.<br />
              <span className="text-yellow-500">DIREKT.</span><br />
              SOFORT.
            </h2>
            <p className="text-white/30 font-medium max-w-sm">
              Kein Marktplatz für jeden. Nur das beste Handwerk — direkt vermittelt.
            </p>
          </div>
          <div className="shrink-0">
            <div className="flex flex-col gap-3">
              <a href="/mitmachen" className="px-8 py-4 font-black bg-yellow-500 text-black rounded hover:bg-yellow-400 transition text-sm tracking-widest uppercase text-center">
                Als Fachkraft bewerben
              </a>
              <a href="/profis" className="px-8 py-4 font-black border-2 border-white/30 rounded hover:border-white hover:bg-white/5 transition text-sm tracking-widest uppercase text-center">
                Fachkräfte durchsuchen
              </a>
              <p className="text-white/20 text-xs text-center font-medium mt-1">Kostenlos · Kein Konto nötig</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-gray-950 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div>
              <span className="text-2xl font-black tracking-tighter">MAXI<span className="text-yellow-500">JOBBER</span></span>
              <p className="text-white/30 text-sm font-medium mt-2 max-w-xs leading-relaxed">
                Handverlesene Fachkräfte. Direkte Vermittlung. Frankfurt & Rhein-Main.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-4">Plattform</p>
                <div className="space-y-2">
                  <a href="/fuer-profis" className="block text-sm text-white/40 hover:text-white transition font-medium">Für Fachkräfte</a>
                  <a href="/fuer-unternehmen" className="block text-sm text-white/40 hover:text-white transition font-medium">Für Unternehmen</a>
                  <a href="/profis" className="block text-sm text-white/40 hover:text-white transition font-medium">Fachkräfte suchen</a>
                  <a href="/mitmachen" className="block text-sm text-white/40 hover:text-white transition font-medium">Profil einreichen</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-4">Info</p>
                <div className="space-y-2">
                  <a href="/legal/minijob-guide" className="block text-sm text-white/40 hover:text-white transition font-medium">Minijob-Guide</a>
                  <a href="/admin" className="block text-sm text-white/40 hover:text-white transition font-medium">Admin</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-sm font-medium">© 2026 MaxiJobber · Frankfurt am Main</p>
            <div className="flex gap-6 text-sm text-white/20 font-medium">
              <a href="#" className="hover:text-white transition">Datenschutz</a>
              <a href="#" className="hover:text-white transition">Impressum</a>
              <a href="#" className="hover:text-white transition">AGB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
