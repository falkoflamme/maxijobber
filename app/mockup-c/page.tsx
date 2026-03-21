export default function MockupC() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            MaxiJobber
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#wie" className="hover:text-purple-600 transition">Wie&apos;s läuft</a>
            <a href="#fachkraefte" className="hover:text-purple-600 transition">Fachkräfte</a>
            <a href="#unternehmen" className="hover:text-purple-600 transition">Unternehmen</a>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition">Login</button>
            <button className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition shadow-md shadow-purple-200">
              Jetzt mitmachen
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 pb-20 px-5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-orange-200/20 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 text-sm font-semibold mb-8">
            <span className="text-base">📍</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Jetzt live in Frankfurt — sei von Anfang an dabei!
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Fachkräfte &<br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Unternehmen
            </span><br />
            — direkt verbunden.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Kein BS. Kein Mittelsmann. MaxiJobber bringt geprüfte Fachkräfte
            direkt mit den Unternehmen zusammen, die sie brauchen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition shadow-lg shadow-purple-200 text-sm">
              ✨ Profil anlegen — kostenlos
            </button>
            <button className="w-full sm:w-auto px-8 py-4 font-black border-2 border-gray-200 rounded-full hover:border-purple-300 transition text-sm">
              Fachkraft finden →
            </button>
          </div>

          {/* Floating tags */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {["⚡ Elektriker", "🔧 Klempner", "🎨 Maler", "🪵 Schreiner", "🏗️ Trockenbauer", "🪟 Fliesenleger", "+mehr"].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-semibold hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition cursor-pointer">
                {tag}
              </span>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-gray-100">
            <div className="flex -space-x-3">
              {["M", "S", "T", "A", "R"].map((l, i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-black text-xs text-white ${["bg-purple-500", "bg-pink-500", "bg-orange-400", "bg-blue-500", "bg-green-500"][i]}`}>
                  {l}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                +495
              </div>
            </div>
            <div className="text-left">
              <div className="font-black text-sm">500+ Fachkräfte dabei</div>
              <div className="text-gray-500 text-xs mt-0.5">⭐⭐⭐⭐⭐ Durchschnitt 4.9/5</div>
            </div>
          </div>
        </div>
      </section>

      {/* Wie es funktioniert */}
      <section id="wie" className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-bold text-sm mb-4">
              Einfach. Direkt. Fair.
            </span>
            <h2 className="text-4xl md:text-5xl font-black">So läuft&apos;s ab</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🙋",
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-50 to-purple-100",
                step: "Schritt 1",
                title: "Profil anlegen",
                desc: "5 Minuten — Qualifikationen, Erfahrung, Verfügbarkeit. Foto rein, fertig. Fachkräfte und Unternehmen gleichermaßen.",
              },
              {
                emoji: "🤝",
                gradient: "from-pink-500 to-pink-600",
                bgGradient: "from-pink-50 to-pink-100",
                step: "Schritt 2",
                title: "Match finden",
                desc: "Algorithmus matched Fachkräfte mit passenden Unternehmen in Frankfurt — nach Skills, Standort, Verfügbarkeit.",
              },
              {
                emoji: "🚀",
                gradient: "from-orange-400 to-orange-500",
                bgGradient: "from-orange-50 to-orange-100",
                step: "Schritt 3",
                title: "Direkt loslegen",
                desc: "Chat, Konditionen klären, Auftrag bestätigen. Kein Papierkram. Kein Mittelsmann. Direkt ist das neue normal.",
              },
            ].map(({ emoji, gradient, bgGradient, step, title, desc }) => (
              <div key={step} className={`p-7 rounded-3xl bg-gradient-to-br ${bgGradient} relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                  {emoji}
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                  {step}
                </div>
                <h3 className="text-xl font-black mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Für Fachkräfte */}
      <section id="fachkraefte" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mb-5">
                👷 Für Fachkräfte
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-5">
                Du bist gut.<br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Zeig&apos;s der Welt.
                </span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Schluss damit, auf Aufträge zu warten. Bei MaxiJobber wirst du gefunden —
                von Unternehmen in Frankfurt, die wirklich auf dich angewiesen sind.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  ["✅", "Verifiziertes Profil"],
                  ["📩", "Direkte Anfragen"],
                  ["💰", "Eigener Stundensatz"],
                  ["🕐", "Flexible Einsätze"],
                ].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <span className="text-xl">{icon}</span>
                    <span className="font-bold text-sm">{label}</span>
                  </div>
                ))}
              </div>
              <button className="px-7 py-3.5 font-black bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition shadow-lg shadow-purple-200 text-sm">
                Profil anlegen — kostenlos ✨
              </button>
            </div>
            {/* Profile cards */}
            <div className="space-y-4">
              {[
                { name: "Michael Reuter", job: "Elektriker · 8 Jahre Erfahrung", loc: "Frankfurt Mitte", rate: "42 €/h", badge: "Top Rated", badgeColor: "bg-yellow-100 text-yellow-700" },
                { name: "Sandra Koch", job: "Sanitärinstallateur · 5 Jahre", loc: "Sachsenhausen", rate: "38 €/h", badge: "Schnell verfügbar", badgeColor: "bg-green-100 text-green-700" },
                { name: "Thomas Braun", job: "Maler & Lackierer · 12 Jahre", loc: "Bornheim", rate: "34 €/h", badge: "Sehr beliebt", badgeColor: "bg-purple-100 text-purple-700" },
              ].map(({ name, job, loc, rate, badge, badgeColor }) => (
                <div key={name} className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-md transition group bg-white">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-black text-xl shrink-0">
                    {name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm">{name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{job}</div>
                    <div className="text-gray-400 text-xs mt-0.5">📍 {loc}</div>
                    <div className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeColor}`}>
                      {badge}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black text-base">{rate}</div>
                    <div className="text-xs text-gray-400 mt-0.5">⭐⭐⭐⭐⭐</div>
                    <button className="mt-2 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
                      Anfragen →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Für Unternehmen */}
      <section id="unternehmen" className="py-20 px-5 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-bold text-sm mb-5 border border-white/30">
                🏢 Für Unternehmen
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-5">
                Fachkraft fehlt?<br />
                MaxiJobber liefert.
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Kein Recruiting. Kein Agentur-Stress. Einfach suchen, finden, buchen —
                geprüfte Fachkräfte in Frankfurt und Rhein-Main.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "🔐 Alle Qualifikationen verifiziert — kein Risiko",
                  "⚡ Durchschnittlich 18h bis zur Besetzung",
                  "💬 Direkt kommunizieren — kein Mittelsmann",
                  "⭐ Bewertungssystem für echte Qualitätssicherung",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/90">
                    <span>{item.slice(0, 2)}</span>
                    <span>{item.slice(3)}</span>
                  </div>
                ))}
              </div>
              <button className="px-8 py-4 font-black bg-white text-purple-600 rounded-full hover:bg-purple-50 transition text-sm shadow-lg">
                Jetzt Fachkraft finden →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "⚡", label: "Elektro", count: "84 verfügbar" },
                { icon: "🔧", label: "Sanitär", count: "61 verfügbar" },
                { icon: "🎨", label: "Maler", count: "47 verfügbar" },
                { icon: "🪵", label: "Schreiner", count: "39 verfügbar" },
                { icon: "🏗️", label: "Trockenbau", count: "55 verfügbar" },
                { icon: "🪟", label: "Fliesen", count: "28 verfügbar" },
              ].map(({ icon, label, count }) => (
                <div key={label} className="p-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-black text-sm">{label}</div>
                  <div className="text-white/60 text-xs mt-0.5">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Vibe */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-black mb-3">Die Community spricht</h2>
          <p className="text-gray-500">Was Fachkräfte und Unternehmen über MaxiJobber sagen</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
          {[
            { quote: "Innerhalb von 2 Tagen hatte ich meinen ersten Auftrag. Einfacher geht's nicht.", name: "Michael R.", role: "Elektriker, Frankfurt" },
            { quote: "Endlich keine Agentur mehr! Direkter Kontakt, faire Preise, schnelle Besetzung.", name: "GmbH Bau Frankfurt", role: "Unternehmen, Innenstadt" },
            { quote: "Mein Profil läuft seit Woche 1. Ich lehne inzwischen Aufträge ab — so viele Anfragen.", name: "Sandra K.", role: "Sanitär, Sachsenhausen" },
          ].map(({ quote, name, role }) => (
            <div key={name} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-purple-100 hover:shadow-md transition">
              <div className="text-yellow-500 text-sm mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5 font-medium">&ldquo;{quote}&rdquo;</p>
              <div>
                <div className="font-black text-sm">{name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-5xl font-black mb-5">
            Frankfurt.<br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Deine Stadt.
            </span>
          </h2>
          <p className="text-gray-500 mb-10 text-lg">
            MaxiJobber startet in Frankfurt — und du kannst von Anfang an dabei sein.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition shadow-lg shadow-purple-200 text-sm">
              ✨ Als Fachkraft registrieren
            </button>
            <button className="px-8 py-4 font-black border-2 border-gray-200 rounded-full hover:border-purple-300 transition text-sm">
              🏢 Als Unternehmen starten
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            MaxiJobber
          </span>
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
        <a href="/mockup-a" className="px-4 py-2 text-xs font-bold bg-black text-yellow-400 rounded-full shadow-lg">A · Urban</a>
        <a href="/mockup-b" className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-full shadow-lg">B · Clean</a>
        <a href="/mockup-c" className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg">C · Energy</a>
      </div>
    </div>
  )
}
