export default function MockupB() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-2xl font-black text-blue-600">
              Maxi<span className="text-gray-900">Jobber</span>
            </span>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-500 font-medium">
              <a href="#wie" className="hover:text-gray-900 transition">So funktioniert&apos;s</a>
              <a href="#fachkraefte" className="hover:text-gray-900 transition">Fachkräfte</a>
              <a href="#unternehmen" className="hover:text-gray-900 transition">Unternehmen</a>
              <a href="#preise" className="hover:text-gray-900 transition">Preise</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition">Anmelden</button>
            <button className="px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm">
              Kostenlos starten
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Jetzt live in Frankfurt
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900 mb-5">
              Geprüfte Fachkräfte.<br />
              <span className="text-blue-600">Sofort vermittelt.</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              MaxiJobber ist der direkte Weg zwischen qualifizierten Handwerkern
              und Unternehmen — verifiziert, schnell, fair.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button className="px-6 py-3.5 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm text-sm">
                Als Fachkraft registrieren →
              </button>
              <button className="px-6 py-3.5 font-bold border border-gray-200 rounded-xl hover:border-gray-300 bg-white text-sm transition">
                Fachkraft finden
              </button>
            </div>
            <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
              {[["500+", "Fachkräfte"], ["120+", "Partner-Unternehmen"], ["4.9★", "Durchschnittsbewertung"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-xl font-black text-gray-900">{n}</div>
                  <div className="text-xs text-gray-400">{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Search card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-5">Fachkraft suchen</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Was suchen Sie?</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition">
                  <option>Elektriker</option>
                  <option>Klempner / Sanitär</option>
                  <option>Maler & Lackierer</option>
                  <option>Schreiner / Tischler</option>
                  <option>Trockenbauer</option>
                  <option>Fliesenleger</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Standort</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition">
                  <option>Frankfurt Innenstadt</option>
                  <option>Sachsenhausen</option>
                  <option>Bornheim</option>
                  <option>Westend</option>
                  <option>Nordend</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Verfügbarkeit</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition">
                  <option>Ab sofort</option>
                  <option>Diese Woche</option>
                  <option>Diesen Monat</option>
                </select>
              </div>
            </div>
            <button className="w-full py-3.5 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm">
              Jetzt Fachkraft finden →
            </button>
            <p className="text-xs text-center text-gray-400 mt-3">Kostenlos · Keine Agenturgebühren · Sofort Ergebnisse</p>
          </div>
        </div>
      </section>

      {/* Wie es funktioniert */}
      <section id="wie" className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Einfacher Prozess</span>
          <h2 className="text-4xl font-black mt-3 mb-4">In 3 Schritten zur Fachkraft</h2>
          <p className="text-gray-500">Keine komplizierten Bewerbungsprozesse. Direkt verbinden und loslegen.</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              icon: "👤",
              title: "Profil anlegen",
              desc: "Fachkraft oder Unternehmen? In wenigen Minuten verifiziertes Konto erstellen und Qualifikationen hinterlegen.",
            },
            {
              step: "2",
              icon: "🔍",
              title: "Matching",
              desc: "Unser System findet automatisch die besten Matches in Frankfurt — basierend auf Qualifikation, Standort und Verfügbarkeit.",
            },
            {
              step: "3",
              icon: "✅",
              title: "Direkt verbinden",
              desc: "Kein Mittelsmann, kein Agentur-Aufschlag. Direkt kommunizieren, Konditionen klären, loslegen.",
            },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="relative p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:shadow-md transition group">
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-black flex items-center justify-center shadow">
                {step}
              </div>
              <div className="text-3xl mb-4 mt-2">{icon}</div>
              <h3 className="font-black text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Für Fachkräfte */}
      <section id="fachkraefte" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Für Fachkräfte</span>
              <h2 className="text-4xl font-black mt-3 mb-5">Mehr Aufträge.<br />Bessere Konditionen.</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Zeige was du kannst und werde direkt von Unternehmen in Frankfurt gefunden.
                Du entscheidest, welche Aufträge du annimmst.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  ["Verifiziertes Profil", "Lass deine Qualifikationen prüfen und genieße mehr Vertrauen bei Auftraggebern."],
                  ["Direkte Anfragen", "Unternehmen kontaktieren dich direkt — kein Aufwand für dich."],
                  ["Flexible Einsätze", "Du wählst selbst wann und wo du arbeitest."],
                  ["Faire Vergütung", "Setze deinen eigenen Stundensatz. Kein Agentur-Abzug."],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-100 transition">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{title}</div>
                      <div className="text-gray-500 text-sm mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="px-7 py-3.5 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm shadow-sm">
                Jetzt Profil anlegen — kostenlos
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Michael R.", job: "Elektriker", loc: "Frankfurt Mitte", stars: 5, rate: "42 €/h" },
                { name: "Sandra K.", job: "Sanitärinstallateur", loc: "Sachsenhausen", stars: 5, rate: "38 €/h" },
                { name: "Thomas B.", job: "Maler & Lackierer", loc: "Bornheim", stars: 4, rate: "34 €/h" },
                { name: "Ayse D.", job: "Trockenbauerin", loc: "Nordend", stars: 5, rate: "36 €/h" },
              ].map(({ name, job, loc, stars, rate }) => (
                <div key={name} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600 shrink-0">
                    {name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{name}</div>
                    <div className="text-gray-500 text-xs">{job} · 📍 {loc}</div>
                    <div className="text-yellow-500 text-xs mt-0.5">{"★".repeat(stars)}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black text-sm text-gray-900">{rate}</div>
                    <div className="text-xs text-green-600 font-semibold mt-0.5">Verfügbar</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Für Unternehmen */}
      <section id="unternehmen" className="bg-blue-600 py-24 px-6 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-200 font-bold text-sm uppercase tracking-widest">Für Unternehmen</span>
            <h2 className="text-4xl font-black mt-3 mb-5">Qualifizierte Fachkräfte<br />in 24 Stunden.</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Schluss mit langen Recruiting-Zyklen. MaxiJobber liefert geprüfte Fachkräfte
              für Ihr Unternehmen — in Frankfurt und Umgebung.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                ["Geprüfte Profile", "Alle Qualifikationen sind verifiziert"],
                ["Kein Aufwand", "Wir übernehmen das Matching für Sie"],
                ["Keine Agentur", "Direkt mit Fachkraft kommunizieren"],
                ["Schnell", "Besetzung oft innerhalb von 24 Stunden"],
              ].map(([title, desc]) => (
                <div key={title} className="p-4 rounded-xl bg-white/10 border border-white/10">
                  <div className="font-bold text-sm">{title}</div>
                  <div className="text-blue-200 text-xs mt-1">{desc}</div>
                </div>
              ))}
            </div>
            <button className="px-7 py-3.5 font-bold bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition text-sm">
              Kostenlos testen →
            </button>
          </div>
          <div className="bg-white/10 rounded-2xl border border-white/20 p-6 backdrop-blur">
            <h4 className="font-bold text-sm mb-4 text-blue-100">So nutzen Unternehmen MaxiJobber</h4>
            <div className="space-y-4">
              {[
                { q: "Wie schnell finde ich eine Fachkraft?", a: "Im Schnitt 18 Stunden — von Anfrage bis Bestätigung." },
                { q: "Welche Branchen abgedeckt?", a: "Elektro, Sanitär, Maler, Schreiner, Trockenbau, Fliesen uvm." },
                { q: "Was kostet MaxiJobber?", a: "Für Unternehmen: kleine Vermittlungsgebühr nur bei Erfolg." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-white/10 pb-4">
                  <div className="font-semibold text-sm mb-1">{q}</div>
                  <div className="text-blue-200 text-sm">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-4">Bereit für den Start?</h2>
          <p className="text-gray-500 mb-8">MaxiJobber ist kostenlos für Fachkräfte. Jetzt registrieren und erste Anfragen erhalten.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-7 py-3.5 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm shadow-sm">
              Als Fachkraft starten
            </button>
            <button className="px-7 py-3.5 font-bold border border-gray-200 rounded-xl hover:border-gray-300 bg-white text-sm transition">
              Als Unternehmen testen
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black">Maxi<span className="text-blue-400">Jobber</span></span>
          <p className="text-gray-500 text-sm">© 2026 MaxiJobber · Frankfurt am Main</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition">Datenschutz</a>
            <a href="#" className="hover:text-white transition">Impressum</a>
            <a href="#" className="hover:text-white transition">AGB</a>
          </div>
        </div>
      </footer>

      {/* Mockup switcher */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50 items-end">
        <span className="text-xs text-gray-400 text-right mb-1">Style wählen</span>
        <a href="/mockup-a" className="px-4 py-2 text-xs font-bold bg-black text-yellow-400 rounded shadow-lg">A · Urban</a>
        <a href="/mockup-b" className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded shadow-lg">B · Clean</a>
        <a href="/mockup-c" className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded shadow-lg">C · Energy</a>
      </div>
    </div>
  )
}
