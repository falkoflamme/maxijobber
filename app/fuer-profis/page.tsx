export default function FuerProfis() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

      {/* Power stripe */}
      <div className="h-[3px] bg-yellow-500 w-full" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <a href="/"><img src="/logo2.png" alt="MaxiJobber" className="h-10 w-auto" /></a>
          <div className="flex items-center gap-4">
            <a href="/profis" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition">Profis ansehen</a>
            <a href="/mitmachen" className="px-5 py-2.5 text-sm font-black bg-gray-900 text-white rounded hover:bg-gray-700 transition uppercase tracking-widest">
              Mitmachen
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
            <span className="text-xs font-black text-yellow-700 tracking-widest uppercase">Für Fachkräfte</span>
          </div>

          <h1 className="text-6xl md:text-[80px] font-black tracking-tighter leading-none mb-8 max-w-4xl">
            DEINE SKILLS.<br />
            <span className="text-yellow-500">DEIN PREIS.</span><br />
            DEINE REGELN.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-10">
            <div>
              <p className="text-xl text-gray-500 max-w-xl font-medium leading-relaxed mb-5">
                MaxiJobber bringt dich direkt zu den Unternehmen, die dich brauchen —
                ohne Agentur, ohne Aufschlag, ohne Bürokratie.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50">
                <span className="text-sm font-bold text-yellow-800">Bis zu 538&nbsp;€ steuerfrei im Monat dazuverdienen.</span>
              </div>
            </div>
            <div className="shrink-0">
              <a href="/mitmachen" className="inline-block px-8 py-4 font-black bg-gray-900 text-white rounded hover:bg-gray-700 transition text-sm tracking-widest uppercase">
                Profil einreichen — kostenlos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Wie es funktioniert */}
      <section className="py-28 px-8 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Dein Weg</p>
            <h2 className="text-5xl font-black tracking-tighter">DREI SCHRITTE.<br />FERTIG.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {[
              ["01", "Profil einreichen", "Name, Rolle, Skills, Stundensatz, Kontakt — ausgefüllt in 5 Minuten. Kein Konto, keine Passwörter."],
              ["02", "Wir prüfen dich", "Wir checken dein Profil und schalten es frei. Meistens innerhalb von 24 Stunden."],
              ["03", "Werde gefunden", "Unternehmen durchsuchen MaxiJobber und kontaktieren dich direkt — per WhatsApp oder Telefon."],
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
          <h2 className="text-5xl font-black tracking-tighter mb-16">WAS DU BEKOMMST.</h2>

          <div className="grid md:grid-cols-2 gap-0 border-t border-gray-200">
            {[
              ["Verifiziertes Profil", "Einmal prüfen lassen — dauerhaft Vertrauen bei Auftraggebern. Kein Bewerbermappe, kein Lebenslauf."],
              ["Direkter Kontakt", "Unternehmen schreiben dir per WhatsApp oder rufen an. Kein Ticket-System, kein Callcenter."],
              ["Dein Stundensatz", "Du setzt deinen Preis — ab 25 €/h. Kein Agentur-Abzug. Was du verdienst, bekommst du."],
              ["Flexible Einsätze", "Minijob, Teilzeit, Vollzeit — du entscheidest. MaxiJobber passt sich deinem Leben an."],
              ["Schnell sichtbar", "Profil einreichen, freischalten lassen, gefunden werden. In Frankfurt und ganz Rhein-Main."],
              ["Kostenlos für dich", "MaxiJobber ist für Fachkräfte immer kostenlos. Ohne Wenn und Aber."],
            ].map(([title, desc]) => (
              <div key={title} className="border-b border-r-0 border-gray-200 py-8 px-0 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0">
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

      {/* Minijob 538 */}
      <section className="py-28 px-8 bg-[#F5F4F0] border-t border-gray-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Minijob</p>
            <h2 className="text-5xl font-black tracking-tighter mb-6 leading-none">
              538 € STEUERFREI.<br />
              JEDEN MONAT.
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-8 text-lg">
              Als Minijobber verdienst du bis zu 538 € pro Monat vollständig steuerfrei
              und sozialversicherungsfrei. Ideal für alle, die flexibel neben dem Hauptjob
              oder der Familie dazuverdienen wollen.
            </p>
            <a
              href="/legal/minijob-guide"
              className="inline-block text-sm font-black border-b-2 border-gray-900 hover:border-yellow-500 hover:text-yellow-600 transition pb-0.5"
            >
              Minijob-Leitfaden lesen →
            </a>
          </div>
          <div className="space-y-0 border-t border-gray-300">
            {[
              ["Bis zu 538 €/Monat", "Steuerfrei. Ohne Abzüge. Direkt auf dein Konto."],
              ["Parallel zum Hauptjob", "Erlaubt, solange dein Gesamteinkommen die Grenze nicht überschreitet."],
              ["Keine Papierschlacht", "Du und das Unternehmen regeln das direkt. Kein Overhead."],
              ["Direkte Abrechnung", "Zwischen dir und dem Auftraggeber. MaxiJobber ist nur die Bühne."],
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

      {/* CTA */}
      <section className="py-28 px-8 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h2 className="text-6xl font-black tracking-tighter leading-none">
            BEREIT ZU<br />
            <span className="text-yellow-500">STARTEN?</span>
          </h2>
          <div className="shrink-0">
            <p className="text-white/40 mb-8 font-medium max-w-sm leading-relaxed">
              Profil einreichen dauert 5 Minuten. Kostenlos. Kein Risiko. Kein Konto nötig.
            </p>
            <a href="/mitmachen" className="inline-block px-8 py-4 font-black bg-yellow-500 text-black rounded hover:bg-yellow-400 transition text-sm tracking-widest uppercase">
              Jetzt Profil einreichen →
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 px-8 bg-gray-950 border-t border-white/5 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/"><img src="/logo2.png" alt="MaxiJobber" className="h-7 w-auto brightness-0 invert" /></a>
          <p className="text-white/20 text-sm font-medium">© 2026 MaxiJobber · Frankfurt am Main</p>
          <div className="flex gap-6 text-sm text-white/30 font-medium">
            <a href="/legal/minijob-guide" className="hover:text-white transition">Minijob-Guide</a>
            <a href="/datenschutz" className="hover:text-white transition">Datenschutz</a>
            <a href="/impressum" className="hover:text-white transition">Impressum</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
