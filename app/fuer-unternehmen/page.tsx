export default function FuerUnternehmen() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

      <div className="h-[3px] bg-yellow-500 w-full" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <a href="/"><img src="/logo.png" alt="MaxiJobber" className="h-8 w-auto" /></a>
          <div className="flex items-center gap-4">
            <a href="/mitmachen" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Für Fachkräfte</a>
            <a href="/unternehmen/anmelden" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Firmenzugang</a>
            <a href="/profis" className="px-5 py-2.5 text-sm font-black bg-gray-900 text-white hover:bg-gray-700 transition uppercase tracking-widest border-2 border-[#1a1a1a]">
              Fachkräfte finden
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-8 pt-20 pb-28 bg-[#F5F4F0] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gray-900/[0.03] border-l border-gray-300/60 hidden lg:block" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300" />

        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-xs font-black text-yellow-700 tracking-widest uppercase">Für Unternehmen</span>
          </div>

          <h1 className="text-6xl md:text-[80px] font-black tracking-tighter leading-none mb-8 max-w-4xl">
            FACHKRAFT<br />
            <span className="text-yellow-500">FEHLT?</span><br />
            WIR LIEFERN.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-10">
            <p className="text-xl text-gray-500 max-w-xl font-medium leading-relaxed">
              Kein Recruiting, kein Headhunter, keine Agentur. MaxiJobber zeigt Ihnen
              geprüfte Fachkräfte in Frankfurt — geschützt anfragen, ohne Aufschlag.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="/profis" className="inline-block px-8 py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a]">
                Fachkräfte finden →
              </a>
              <a href="/unternehmen/anmelden" className="inline-block px-8 py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a]">
                Firmenzugang →
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 pt-10 border-t border-gray-300 grid grid-cols-3 gap-8 max-w-2xl">
            {[
              ["0 €", "Keine Agenturgebühr"],
              ["20 €/h", "Fairer Mindeststundensatz"],
              ["Geschützt", "Kontakt über die Plattform"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-[3px] border-yellow-500 pl-5">
                <div className="text-4xl font-black">{n}</div>
                <div className="text-sm text-gray-400 font-medium mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wie es funktioniert */}
      <section className="py-28 px-8 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Prozess</p>
            <h2 className="text-5xl font-black tracking-tighter">SO EINFACH.<br />SO SCHNELL.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {[
              ["01", "Fachkraft finden", "Alle geprüften Profile in Frankfurt — nach Bereich, Stadt und Verfügbarkeit filterbar. Kostenlos, ohne Anmeldung."],
              ["02", "Passende Person erkennen", "Stundensatz, Skills, Erfahrung — alles direkt sichtbar. Kein Rätselraten, kein Blind Date mit der falschen Person."],
              ["03", "Geschützt anfragen", "Anfrage läuft zuerst über die Plattform. Die Fachkraft entscheidet selbst, ob Kontaktdaten freigegeben werden."],
            ].map(([num, title, desc]) => (
              <div key={num} className="p-10 bg-gray-950 hover:bg-gray-900 transition group">
                <div className="text-7xl font-black text-white/5 group-hover:text-yellow-500/10 transition mb-6 leading-none">{num}</div>
                <h3 className="text-xl font-black mb-4 tracking-tight">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Vorteile</p>
          <h2 className="text-5xl font-black tracking-tighter mb-16">WAS SIE BEKOMMEN.</h2>

          <div className="grid md:grid-cols-2 gap-0 border-t border-gray-200">
            {[
              ["Geprüfte Qualifikationen", "Jede Fachkraft wird von MaxiJobber verifiziert — bevor sie online geht. Kein Risiko, keine bösen Überraschungen."],
              ["Transparente Preise", "Jeder Stundensatz ist öffentlich sichtbar. Ab 20 €/h — fairer Markt, kein Agentur-Aufschlag."],
              ["Geschützte Anfragen", "Kontakt läuft zuerst über die Plattform. Datenschutz für beide Seiten — Fachkraft entscheidet über Freigabe."],
              ["Schnelle Besetzung", "Verfügbare Fachkräfte direkt erkennbar. Von erstem Klick bis zur Anfrage — in Minuten."],
              ["Eigener Firmenzugang", "Als Unternehmen anmelden, Bedarf eingeben, Anfragen verwalten — alles an einem Ort."],
              ["Lokaler Fokus", "Fachkräfte aus Frankfurt und Rhein-Main. Kurze Wege, lokale Kenntnis, kein Ferndienstleister."],
            ].map(([title, desc]) => (
              <div key={title} className="border-b border-gray-200 py-8 px-0 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0">
                <div className="flex items-start gap-4">
                  <div className="w-[3px] h-5 bg-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black text-base mb-1">{title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preismodell */}
      <section className="py-28 px-8 bg-[#F5F4F0] border-t border-gray-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Preismodell</p>
            <h2 className="text-5xl font-black tracking-tighter mb-6 leading-none">
              KEINE<br />AGENTUR&shy;GEBÜHR.
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed text-lg mb-8">
              MaxiJobber ist ein kuratiertes Verzeichnis — Sie finden, Sie fragen an.
              Was Sie mit der Fachkraft vereinbaren, bleibt zwischen Ihnen.
            </p>
            <a href="/profis" className="inline-block px-8 py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase border-2 border-[#1a1a1a]">
              Verzeichnis öffnen →
            </a>
          </div>
          <div className="space-y-0 border-t border-gray-300">
            {[
              ["Suchen & Filtern", "Kostenlos. Unbegrenzt. Ohne Anmeldung."],
              ["Profil ansehen", "Alle Infos öffentlich — Skills, Rate, Erfahrung."],
              ["Anfrage stellen", "Geschützt über die Plattform. Die Fachkraft entscheidet über Kontaktfreigabe."],
              ["Konditionen verhandeln", "Direkt mit der Fachkraft. MaxiJobber verdient nichts daran."],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-4 py-6 border-b border-gray-300">
                <div className="w-[3px] h-5 bg-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-black text-sm">{title}</div>
                  <div className="text-gray-500 text-sm font-medium mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-16">Stimmen</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Endlich keine Agentur mehr. Direkter Kontakt, faire Preise, schnelle Besetzung.", name: "Bau GmbH Frankfurt", role: "Bauwesen · Innenstadt" },
              { quote: "In 4 Stunden hatte ich eine geprüfte Elektrikerin vor Ort. Unglaublich.", name: "Hotel Metropol", role: "Gastronomie · Sachsenhausen" },
              { quote: "Transparente Stundensätze, echte Profile. So muss das sein.", name: "Küchenstudio Braun", role: "Handwerk · Bornheim" },
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
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h2 className="text-6xl font-black tracking-tighter leading-none">
            FACHKRAFT<br />
            <span className="text-yellow-500">JETZT</span><br />
            FINDEN.
          </h2>
          <div className="shrink-0">
            <p className="text-white/40 mb-8 font-medium max-w-sm leading-relaxed">
              Geprüfte Fachkräfte in Frankfurt — geschützte Anfragen, kein Aufschlag, kein Mittelsmann.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/profis" className="px-8 py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase text-center border-2 border-yellow-500">
                Fachkräfte finden →
              </a>
              <a href="/unternehmen/anmelden" className="px-8 py-4 font-black border-2 border-white/30 hover:border-white hover:bg-white/5 transition text-sm tracking-widest uppercase text-center">
                Firmenzugang →
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 px-8 bg-gray-950 border-t border-white/5 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/"><img src="/logo.png" alt="MaxiJobber" className="h-7 w-auto brightness-0 invert" /></a>
          <p className="text-white/20 text-sm font-medium">© 2026 MaxiJobber · Frankfurt am Main</p>
          <div className="flex gap-6 text-sm text-white/30 font-medium">
            <a href="/mitmachen" className="hover:text-white transition">Für Fachkräfte</a>
            <a href="/datenschutz" className="hover:text-white transition">Datenschutz</a>
            <a href="/impressum" className="hover:text-white transition">Impressum</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
