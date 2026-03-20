export default function MockupA() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/90 backdrop-blur">
        <span className="text-xl font-black tracking-tight">
          MAXI<span className="text-yellow-400">JOBBER</span>
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#wie" className="hover:text-white transition">Wie es funktioniert</a>
          <a href="#fachkraefte" className="hover:text-white transition">Für Fachkräfte</a>
          <a href="#unternehmen" className="hover:text-white transition">Für Unternehmen</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white transition">Login</button>
          <button className="px-5 py-2 text-sm font-bold bg-yellow-400 text-black rounded hover:bg-yellow-300 transition">Jetzt starten</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/5 text-yellow-400 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Jetzt live in Frankfurt
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-6">
            GEPRÜFTE<br />
            <span className="text-yellow-400">FACHKRÄFTE.</span><br />
            SOFORT.
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
            MaxiJobber verbindet verifizierte Handwerker, Elektriker, Klempner und mehr
            mit Unternehmen — ohne Agentur, ohne Wartezeit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-black bg-yellow-400 text-black rounded hover:bg-yellow-300 transition">
              Fachkraft werden
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-black border border-white/20 rounded hover:border-white/50 transition">
              Fachkraft finden
            </button>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[["500+", "Fachkräfte"], ["120+", "Unternehmen"], ["98%", "Vermittlungsrate"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black text-yellow-400">{n}</div>
                <div className="text-sm text-white/40 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wie es funktioniert */}
      <section id="wie" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4">Der Prozess</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">Drei Schritte.<br />Fertig.</h2>
          <div className="grid md:grid-cols-3 gap-0 relative">
            <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-px bg-white/10" />
            {[
              ["01", "Profil anlegen", "In 5 Minuten verifiziertes Fachkraft-Profil erstellen — Qualifikationen, Erfahrung, Verfügbarkeit."],
              ["02", "Matches erhalten", "Unser Algorithmus findet passende Aufträge in Frankfurt und Umgebung — sofort benachrichtigt."],
              ["03", "Loslegen", "Direkt mit dem Unternehmen verbinden, Konditionen klären, Auftrag annehmen."],
            ].map(([num, title, desc]) => (
              <div key={num} className="relative p-8 border border-white/10 hover:border-yellow-400/30 transition group">
                <div className="text-6xl font-black text-white/5 group-hover:text-yellow-400/10 transition mb-4">{num}</div>
                <h3 className="text-xl font-black mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Für Fachkräfte */}
      <section id="fachkraefte" className="py-24 px-6 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4">Für Fachkräfte</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Deine Skills.<br />Dein Preis.</h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              Erstelle dein Profil, zeige deine Zertifikate und werde von Unternehmen gefunden.
              Du bestimmst wann, wo und zu welchen Konditionen du arbeitest.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Verifiziertes Profil mit Qualifikationsnachweis",
                "Direkte Anfragen ohne Mittelsmänner",
                "Faire Bezahlung — du setzt deinen Stundensatz",
                "Flexible Einsätze in Frankfurt & Rhein-Main",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="text-yellow-400 mt-0.5 shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 font-black bg-yellow-400 text-black rounded hover:bg-yellow-300 transition">
              Profil anlegen — kostenlos
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Elektriker", "Frankfurt"],
              ["Klempner", "Sachsenhausen"],
              ["Maler", "Bornheim"],
              ["Schreiner", "Westend"],
            ].map(([job, loc]) => (
              <div key={job} className="p-5 border border-white/10 rounded hover:border-yellow-400/20 transition">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400 font-black text-sm mb-3">
                  {job[0]}
                </div>
                <div className="font-bold text-sm">{job}</div>
                <div className="text-white/40 text-xs mt-1">📍 {loc}</div>
                <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Verfügbar
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Für Unternehmen */}
      <section id="unternehmen" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 p-8 border border-white/10 rounded">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4">Fachkraft suchen</div>
            <div className="space-y-3 mb-6">
              {[
                { label: "Branche", val: "Elektrotechnik" },
                { label: "Standort", val: "Frankfurt Mitte" },
                { label: "Verfügbarkeit", val: "Ab sofort" },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-white/5 text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className="font-semibold">{val}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-3 font-black bg-yellow-400 text-black rounded text-sm hover:bg-yellow-300 transition">
              8 Fachkräfte gefunden →
            </button>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4">Für Unternehmen</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Fachkraft<br />finden. Heute.</h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              Keine langen Recruiting-Prozesse. Zugang zu hunderten geprüften Fachkräften
              in Frankfurt — direkt buchbar, sofort verfügbar.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Verifizierte Qualifikationen — kein Risiko",
                "Direkter Kontakt ohne Agentur-Aufschlag",
                "Bewertungssystem für Qualitätssicherung",
                "Schnelle Besetzung — oft innerhalb von 24h",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="text-yellow-400 mt-0.5 shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 font-black border border-white/20 rounded hover:border-yellow-400/30 transition">
              Jetzt Fachkraft finden →
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Frankfurt braucht<br />
            <span className="text-yellow-400">echte Fachkräfte.</span>
          </h2>
          <p className="text-white/40 mb-10 text-lg">Werde Teil der Bewegung — als Fachkraft oder Unternehmen.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 font-black bg-yellow-400 text-black rounded hover:bg-yellow-300 transition">
              Als Fachkraft registrieren
            </button>
            <button className="px-8 py-4 font-black border border-white/20 rounded hover:border-white/50 transition">
              Als Unternehmen registrieren
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black">MAXI<span className="text-yellow-400">JOBBER</span></span>
          <p className="text-white/30 text-sm">© 2026 MaxiJobber · Frankfurt am Main · Alle Rechte vorbehalten</p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white transition">Datenschutz</a>
            <a href="#" className="hover:text-white transition">Impressum</a>
            <a href="#" className="hover:text-white transition">AGB</a>
          </div>
        </div>
      </footer>

      {/* Mockup switcher */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        <span className="text-xs text-white/30 text-right mb-1">Style wählen</span>
        <a href="/mockup-a" className="px-4 py-2 text-xs font-bold bg-yellow-400 text-black rounded shadow-lg">A · Urban</a>
        <a href="/mockup-b" className="px-4 py-2 text-xs font-bold bg-white text-black rounded shadow-lg">B · Clean</a>
        <a href="/mockup-c" className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded shadow-lg">C · Energy</a>
      </div>
    </div>
  )
}
