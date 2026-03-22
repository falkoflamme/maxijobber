import WorkerSlideshow from '@/components/WorkerSlideshow'
import EmployerSlideshow from '@/components/EmployerSlideshow'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

      {/* Power stripe */}
      <div className="h-[3px] bg-yellow-500 w-full" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <a href="/"><img src="/logo.png" alt="MaxiJobber" className="h-8 w-auto" /></a>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-400">
            <a href="#wie" className="hover:text-gray-900 transition">Wie es funktioniert</a>
            <a href="/mitmachen" className="hover:text-gray-900 transition">Für Fachkräfte</a>
            <a href="/unternehmen/anmelden" className="hover:text-gray-900 transition">Für Unternehmen</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/profis" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Profis ansehen</a>
            <a href="/mitmachen" className="px-5 py-2.5 text-sm font-black bg-yellow-500 text-black hover:bg-yellow-400 transition uppercase tracking-widest">
              Profil erstellen
            </a>
          </div>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="relative px-8 pt-20 pb-28 overflow-hidden bg-[#F5F4F0]">
        <div className="absolute top-0 right-0 w-80 h-full bg-gray-900/[0.03] border-l border-gray-300/60 hidden lg:block" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300" />
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-xs font-black text-yellow-700 tracking-widest uppercase">Frankfurt · Rhein-Main · Geprüfte Fachkräfte</span>
          </div>
          <h1 className="text-7xl md:text-[96px] font-black leading-none tracking-tighter mb-8 max-w-5xl">
            WIR MACHEN<br />
            AUS MINIJOBS<br />
            <span className="text-yellow-500">MAXIJOBS.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end gap-12 mt-2">
            <div>
              <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium mb-5">
                Qualifizierte Fachkräfte, faire Stundenlöhne ab 20&nbsp;€ und geschützte Anfragen über die Plattform.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50">
                <span className="text-sm font-bold text-yellow-800">Öffentliche Profile. Geschützte Kontaktdaten. Freigabe nur nach Zustimmung.</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="/mitmachen" className="px-8 py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase text-center">
                Profil erstellen
              </a>
              <a href="/profis" className="px-8 py-4 font-black border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition text-sm tracking-widest uppercase text-center">
                Fachkräfte finden
              </a>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-gray-300 grid grid-cols-3 gap-8 max-w-2xl">
            {[
              ["Geprüft", "Jedes Profil wird manuell geprüft"],
              ["20 €/h", "Fairer Mindest-Stundensatz"],
              ["Geschützt", "Kontaktdaten erst nach Zustimmung"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-[3px] border-yellow-500 pl-5">
                <div className="text-4xl font-black text-yellow-500">{n}</div>
                <div className="text-sm text-gray-400 font-medium mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. KOSTENLOS-LEISTE ── */}
      <div className="bg-[#1a1a1a] py-5 px-8 text-center">
        <p className="font-black text-yellow-400 text-sm md:text-base uppercase tracking-widest">
          KEINE PROVISION. KEINE VERMITTLUNGSGEBÜHR. KEINE VERSTECKTEN KOSTEN.
        </p>
        <p className="text-white/40 text-xs font-medium mt-1">Für Fachkräfte und Unternehmen kostenlos. Immer.</p>
      </div>

      {/* ── 3. WAS MAXIJOBBER MACHT ── */}
      <section className="py-16 px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-px bg-white/5">
          {[
            ["Keine offene Massenbörse.", "Jedes Profil wird geprüft, bevor es sichtbar wird. Nur passende Fachkräfte gehen live."],
            ["Kein Dumping.", "Qualifizierte Fachkräfte legen ihren fairen Stundenlohn selbst fest — ab 20\u00a0€/h."],
            ["Kein unnötiger Umweg.", "Anfragen laufen zuerst geschützt über die Plattform. Kontaktdaten nur nach Zustimmung."],
          ].map(([title, desc]) => (
            <div key={title} className="p-10">
              <div className="text-yellow-500 font-black text-xl mb-4 tracking-tight">{title}</div>
              <p className="text-white/50 text-sm leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FACHKRÄFTE SLIDESHOW ── */}
      <WorkerSlideshow />

      {/* ── 4.5 CONNECTOR ── */}
      <div className="bg-[#F5C518] py-8 px-8 text-center">
        <p className="text-5xl md:text-[48px] font-black tracking-tighter text-black leading-none">
          Fachkräfte werden fair sichtbar.
        </p>
        <p className="text-base text-black/70 font-medium mt-3">
          Arbeitgeber finden echte Leistung.
        </p>
      </div>

      {/* ── 5. UNTERNEHMEN SLIDESHOW ── */}
      <EmployerSlideshow />

      {/* ── 6. REALITY CHECK ── */}
      <section className="py-28 px-8 bg-[#F5F4F0] border-t border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Der Unterschied</p>
            <h2 className="text-5xl font-black tracking-tighter leading-tight">
              DU ZAHLST NICHT FÜR ZEIT.<br />FÜR <span className="text-yellow-500">ERGEBNIS.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-gray-300">
            <div className="bg-white p-12">
              <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-8">Ohne MaxiJobber</p>
              <div className="space-y-5">
                {[
                  "Ungelernte Hilfe, die erst im Einsatz lernen muss",
                  "Unklare Qualität und wenig Verlässlichkeit",
                  "Zu viel Einarbeitung für zu wenig Wirkung",
                  "Teure Umwege und wenig Transparenz",
                  "Blindflug bei der Auswahl",
                ].map(item => (
                  <div key={item} className="flex gap-3 items-start">
                    <div className="w-[3px] h-4 bg-red-300 shrink-0 mt-1" />
                    <span className="text-sm text-gray-500 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F5F4F0] p-12">
              <p className="text-xs font-black uppercase tracking-widest text-yellow-600 mb-8">Mit MaxiJobber</p>
              <div className="space-y-5">
                {[
                  "Geprüfte Fachkräfte mit klarer Erfahrung",
                  "Faire Stundenlöhne ab 20\u00a0€/h",
                  "Weniger Einarbeitung, mehr Leistung",
                  "Geschützte Anfragen über die Plattform",
                  "Kontaktdaten nur nach Zustimmung",
                ].map(item => (
                  <div key={item} className="flex gap-3 items-start">
                    <div className="w-[3px] h-4 bg-yellow-500 shrink-0 mt-1" />
                    <span className="text-sm font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FÜR FACHKRÄFTE ── */}
      <section className="py-28 px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-6">Für Fachkräfte</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
              DEINE SKILLS.<br />DEIN PREIS.<br />
              <span className="text-yellow-500">DEINE ENTSCHEIDUNG.</span>
            </h2>
            <p className="text-gray-500 mb-5 leading-relaxed font-medium text-lg">
              Zeig, was du kannst, lege deinen fairen Stundenlohn fest und entscheide selbst, welche Anfragen du annehmen willst.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50 mb-10">
              <span className="text-sm font-bold text-yellow-800">Kein offener Lebenslauf. Kein öffentliches Telefon. Kein unnötiges Bewerben.</span>
            </div>
            <div className="space-y-0 mb-12 border-t border-gray-200">
              {[
                "Geprüftes Profil schafft Vertrauen",
                "Anfragen kommen geschützt über die Plattform",
                "Faire Stundenlöhne ab 20 €/h",
                "Du entscheidest, welche Kontakte du freigibst",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-gray-200">
                  <div className="w-[3px] h-4 bg-yellow-500 shrink-0" />
                  <span className="font-semibold text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <a href="/mitmachen" className="inline-block px-8 py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase">
              Profil erstellen
            </a>
          </div>
          <div className="space-y-2">
            {[
              { alias: "ElektroProfi Nord", job: "Elektriker", years: "8 Jahre", loc: "Frankfurt", rate: "42 €/h", avail: true },
              { alias: "SanitärKraft 24", job: "Sanitärinstallateur", years: "5 Jahre", loc: "Rhein-Main", rate: "38 €/h", avail: true },
              { alias: "MalerProfi West", job: "Maler & Lackierer", years: "12 Jahre", loc: "Frankfurt", rate: "34 €/h", avail: false },
              { alias: "AusbauTalent Main", job: "Trockenbauerin", years: "6 Jahre", loc: "Frankfurt", rate: "36 €/h", avail: true },
            ].map(({ alias, job, years, loc, rate, avail }) => (
              <div key={alias} className="flex items-center gap-5 p-5 bg-white border-2 border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:border-[#1a1a1a] hover:shadow-md transition-all">
                <div className="w-11 h-11 bg-gray-900 flex items-center justify-center text-white font-black text-base shrink-0">
                  {alias[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm">{alias}</span>
                    <svg className="w-3.5 h-3.5 text-yellow-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">{job} · {years} · {loc}</div>
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

      {/* ── 8. FÜR UNTERNEHMEN ── */}
      <section className="py-28 px-8 bg-[#F5F4F0] border-t border-gray-300">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="bg-white border-2 border-[#1a1a1a] p-8" style={{ boxShadow: '4px 4px 0 #1a1a1a' }}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Fachkraft suchen</p>
            <div className="space-y-0 mb-8 border-t border-gray-200">
              {[
                { label: "Bereich", value: "Handwerk & Technik" },
                { label: "Standort", value: "Frankfurt" },
                { label: "Modell", value: "Minijob" },
                { label: "Stundensatz", value: "ab 20 €/h" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-4 border-b border-gray-200">
                  <span className="text-sm text-gray-400 font-semibold">{label}</span>
                  <span className="text-sm font-black">{value}</span>
                </div>
              ))}
            </div>
            <a href="/profis" className="block w-full py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase text-center">
              Fachkräfte finden →
            </a>
            <p className="text-center text-xs text-gray-400 mt-3 font-medium">Keine Provision · Kein Konto nötig · Geschützter Kontakt</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-6">Für Arbeitgeber</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-8">
              VIELE AUFGABEN<br />BRAUCHEN KEINE<br />
              <span className="text-yellow-500">AUSHILFE.</span>
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium text-lg">
              Finde qualifizierte Fachkräfte, die ohne lange Einarbeitung einsatzbereit sind und ihren Wert klar zeigen.
            </p>
            <div className="space-y-0 mb-12 border-t border-gray-300">
              {[
                "Geprüfte Profile statt Zufallstreffer",
                "Faire Stundenlöhne ab 20 €/h",
                "Geschützter Kontakt statt offener Daten",
                "Schnelle Antworten von echten Fachkräften",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-gray-300">
                  <div className="w-[3px] h-4 bg-yellow-500 shrink-0" />
                  <span className="font-semibold text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 items-start">
              <a href="/profis" className="inline-block px-8 py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase">
                Fachkräfte finden
              </a>
              <p className="text-xs text-gray-400 font-medium">Keine Provision. Kein offener Datenzugriff. Keine unnötigen Umwege.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. WIE ES LÄUFT ── */}
      <section id="wie" className="py-28 px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">So läuft es</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">EINFACH FÜR ALLE.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-gray-200">
            <div className="bg-[#F5F4F0] p-12">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Für Fachkräfte</p>
              <div className="space-y-8">
                {[
                  ["01", "Profil erstellen", "Alias, Rolle, Skills, Stundenlohn und Verfügbarkeit eintragen. Kein Konto nötig."],
                  ["02", "Wir prüfen dein Profil", "Nur passende Fachkräfte gehen live. Manuell geprüft, nicht automatisch."],
                  ["03", "Anfragen erhalten", "Arbeitgeber fragen geschützt über die Plattform an. Du entscheidest, ob Kontaktdaten freigegeben werden."],
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
              <a href="/mitmachen" className="inline-block mt-10 px-6 py-3 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-xs tracking-widest uppercase">
                Jetzt Profil erstellen →
              </a>
            </div>
            <div className="bg-white p-12">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Für Arbeitgeber</p>
              <div className="space-y-8">
                {[
                  ["01", "Profile ansehen", "Nach Bereich, Region und Modell filtern. Alle Profile öffentlich, keine Registrierung nötig."],
                  ["02", "Passende Fachkraft finden", "Erfahrung, Skills und Stundenlohn direkt sehen. Kein Rätselraten."],
                  ["03", "Anfrage stellen", "Anfrage über die Plattform — die Fachkraft entscheidet, ob Kontaktdaten freigegeben werden."],
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
              <a href="/profis" className="inline-block mt-10 px-6 py-3 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-xs tracking-widest uppercase">
                Profis ansehen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. VERTRAUENSBLOCK ── */}
      <section className="py-20 px-8 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-white/5">
          <div className="p-10">
            <p className="font-black text-yellow-500 mb-3 text-sm uppercase tracking-widest">Sichtbar, aber geschützt.</p>
            <p className="text-white/50 text-sm leading-relaxed font-medium">
              Profile sind öffentlich sichtbar. Kontaktdaten nicht.
              Anfragen laufen zuerst über MaxiJobber.
              Freigabe nur nach Zustimmung der Fachkraft.
            </p>
          </div>
          <div className="p-10">
            <p className="font-black text-yellow-500 mb-3 text-sm uppercase tracking-widest">Plattform, nicht Arbeitgeber.</p>
            <p className="text-white/50 text-sm leading-relaxed font-medium">
              MaxiJobber ist Plattform, nicht Arbeitgeber.
              Verträge entstehen direkt zwischen Fachkraft und Unternehmen.
            </p>
          </div>
        </div>
      </section>

      {/* ── 11. FOOTER CTA ── */}
      <section className="py-28 px-8 bg-gray-950 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-4">
              QUALITÄT.<br />
              <span className="text-yellow-500">DIREKT.</span><br />
              FAIR.
            </h2>
            <p className="text-white/30 font-medium max-w-sm">
              Geprüfte Fachkräfte für faire Einsätze und direkte Anfragen über die Plattform.
            </p>
            <p className="text-yellow-400 font-black text-sm mt-3 uppercase tracking-widest">
              Profil erstellen — dauert 5 Minuten.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3">
            <a href="/mitmachen" className="px-8 py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase text-center">
              Profil erstellen
            </a>
            <a href="/profis" className="px-8 py-4 font-black border-2 border-white/30 hover:border-white hover:bg-white/5 transition text-sm tracking-widest uppercase text-center">
              Fachkräfte finden
            </a>
            <p className="text-white/20 text-xs text-center font-medium mt-1">Fair. Direkt. Geschützt.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-gray-950 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div>
              <a href="/"><img src="/logo.png" alt="MaxiJobber" className="h-8 w-auto brightness-0 invert" /></a>
              <p className="text-white/30 text-sm font-medium mt-2 max-w-xs leading-relaxed">
                Geprüfte Fachkräfte für faire Minijobs, kurzfristige Einsätze und flexible Arbeit in Frankfurt und Rhein-Main.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-4">Plattform</p>
                <div className="space-y-2">
                  <a href="/profis" className="block text-sm text-white/40 hover:text-white transition font-medium">Fachkräfte finden</a>
                  <a href="/mitmachen" className="block text-sm text-white/40 hover:text-white transition font-medium">Profil erstellen</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-4">Info</p>
                <div className="space-y-2">
                  <a href="/impressum" className="block text-sm text-white/40 hover:text-white transition font-medium">Impressum</a>
                  <a href="/datenschutz" className="block text-sm text-white/40 hover:text-white transition font-medium">Datenschutz</a>
                  <a href="/agb" className="block text-sm text-white/40 hover:text-white transition font-medium">AGB</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-sm font-medium">© 2026 MaxiJobber · Frankfurt am Main</p>
            <div className="flex gap-6 text-sm text-white/20 font-medium">
              <a href="/datenschutz" className="hover:text-white transition">Datenschutz</a>
              <a href="/impressum" className="hover:text-white transition">Impressum</a>
              <a href="/agb" className="hover:text-white transition">AGB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
