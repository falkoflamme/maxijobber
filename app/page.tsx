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
          <a href="/" className="text-xl font-black tracking-tighter">
            MAXI<span className="text-yellow-500">JOBBER</span>
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-400">
            <a href="#wie" className="hover:text-gray-900 transition">Wie es funktioniert</a>
            <a href="/profis" className="hover:text-gray-900 transition">Fachkräfte</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/profis" className="text-sm font-semibold text-gray-400 hover:text-gray-900 transition">Profis ansehen</a>
            <a href="/mitmachen" className="px-5 py-2.5 text-sm font-black bg-yellow-500 text-black hover:bg-yellow-400 transition uppercase tracking-widest">
              Mitmachen
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
                MaxiJobber verbindet dich mit geprüften Fachkräften —
                für reguläre Minijobs direkt und ohne Mittelsmann.
                Handverlesen. Fair. Transparent.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50">
                <span className="text-sm font-bold text-yellow-800">Bis zu 538&nbsp;€ steuerfrei im Monat dazuverdienen.</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="/mitmachen" className="px-8 py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase text-center">
                Als Fachkraft bewerben
              </a>
              <a href="/profis" className="px-8 py-4 font-black border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition text-sm tracking-widest uppercase text-center">
                Fachkräfte finden
              </a>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-gray-300 grid grid-cols-3 gap-8 max-w-2xl">
            {[
              ["100%", "Handverlesen & geprüft"],
              ["20 €/h", "Fairer Mindest-Stundensatz"],
              ["24h", "Bis zur Freischaltung"],
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
          MAXIJOBBER IST 100%&nbsp;KOSTENLOS — FÜR FACHKRÄFTE UND UNTERNEHMEN.
        </p>
        <p className="text-white/40 text-xs font-medium mt-1">Kein Abo. Keine Provision. Keine versteckten Kosten. Nie.</p>
      </div>

      {/* ── 3. WAS MAXIJOBBER MACHT ── */}
      <section className="py-16 px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-px bg-white/5">
          {[
            ["Kein Marktplatz.", "Jeder kann sich auf Marktplätzen eintragen. Bei MaxiJobber prüfen wir jedes Profil manuell — bevor es online geht."],
            ["Kein Preiskampf.", "Kein Bieten, kein Unterbieten. Jede Fachkraft setzt ihren fairen Preis ab 20\u00a0€/h — transparent und verhandelbar."],
            ["Kein Mittelsmann.", "Anfragen laufen geschützt über die Plattform. Kontaktdaten werden nur nach Zustimmung der Fachkraft freigegeben."],
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
          Beide Seiten gewinnen.
        </p>
        <p className="text-base text-black/70 font-medium mt-3">
          Das ist das System.
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
              <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-8">Das Problem ohne MaxiJobber</p>
              <div className="space-y-5">
                {[
                  "Ungelernte Kräfte die lernen während sie arbeiten — auf deine Kosten",
                  "Agenturen die 30–50% Aufschlag nehmen ohne Qualitätssicherung",
                  "Keine Ahnung wen du bekommst bis er vor der Tür steht",
                  "Preise ohne Transparenz — versteckte Kosten überall",
                  "Kein direkter Ansprechpartner — alles läuft über Callcenter",
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
                  "Nur geprüfte Fachkräfte mit nachgewiesener Erfahrung",
                  "Anfragen laufen geschützt über die Plattform — kein Agentur-Aufschlag",
                  "Transparente Profile: Alias, Foto, Skills, Stundensatz — alles öffentlich",
                  "Fairer Mindest-Stundensatz ab 20\u00a0€/h — Qualität hat ihren Preis",
                  "Kontaktdaten werden nur nach Zustimmung der Fachkraft freigegeben",
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
              <span className="text-yellow-500">DEIN TEMPO.</span>
            </h2>
            <p className="text-gray-500 mb-5 leading-relaxed font-medium text-lg">
              Kein Bewerben, kein Warten, kein Vermittler der 30% mitnimmt.
              Du setzt deinen Preis, du entscheidest wann du arbeitest —
              und schließt deinen Minijob-Vertrag direkt mit dem Unternehmen ab.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 border-l-[3px] border-yellow-500 bg-yellow-50 mb-10">
              <span className="text-sm font-bold text-yellow-800">Bis zu 538&nbsp;€ steuerfrei im Monat dazuverdienen.</span>
            </div>
            <div className="space-y-0 mb-12 border-t border-gray-200">
              {[
                "Geprüftes Profil — dauerhaftes Vertrauen bei Auftraggebern",
                "Anfragen kommen geschützt über die Plattform — du entscheidest wer deine Daten sieht",
                "Dein Stundensatz ab 20 €/h — fairer Markt, kein Abzug",
                "Minijob-Vertrag direkt mit dem Unternehmen — kein Middleman",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-gray-200">
                  <div className="w-[3px] h-4 bg-yellow-500 shrink-0" />
                  <span className="font-semibold text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <a href="/mitmachen" className="inline-block px-8 py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase">
              Jetzt Profil einreichen — kostenlos
            </a>
          </div>
          <div className="space-y-2">
            {[
              { alias: "Der Frankfurter Elektriker", job: "Elektriker", years: "8 Jahre", loc: "Frankfurt Mitte", rate: "42 €/h", avail: true },
              { alias: "Sanitär Profi Rhein-Main", job: "Sanitärinstallateur", years: "5 Jahre", loc: "Sachsenhausen", rate: "38 €/h", avail: true },
              { alias: "Malermeister Bornheim", job: "Maler & Lackierer", years: "12 Jahre", loc: "Bornheim", rate: "34 €/h", avail: false },
              { alias: "Trockenbau Nordend", job: "Trockenbauerin", years: "6 Jahre", loc: "Nordend", rate: "36 €/h", avail: true },
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
                { label: "Branche", value: "Elektrotechnik" },
                { label: "Standort", value: "Frankfurt Innenstadt" },
                { label: "Einsatz", value: "Regulärer Minijob" },
                { label: "Stundensatz", value: "ab 38 €/h" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-4 border-b border-gray-200">
                  <span className="text-sm text-gray-400 font-semibold">{label}</span>
                  <span className="text-sm font-black">{value}</span>
                </div>
              ))}
            </div>
            <a href="/profis" className="block w-full py-4 font-black bg-gray-900 text-white hover:bg-gray-700 transition text-sm tracking-widest uppercase text-center">
              Fachkräfte durchsuchen →
            </a>
            <p className="text-center text-xs text-gray-400 mt-3 font-medium">Kostenlos · Keine Registrierung · Geschützter Kontakt</p>
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
              Alle Fachkräfte sind manuell geprüft — Anfragen laufen geschützt
              über die Plattform. Ohne Aufschlag.
            </p>
            <div className="space-y-0 mb-12 border-t border-gray-300">
              {[
                "Manuell geprüfte Profile — kein Spam, kein Risiko",
                "Transparente Stundensätze ab 20 €/h",
                "Anfragen laufen geschützt — Kontaktdaten nur nach Zustimmung",
                "Antwort oft am selben Tag — lokal in Frankfurt",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-gray-300">
                  <div className="w-[3px] h-4 bg-yellow-500 shrink-0" />
                  <span className="font-semibold text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <a href="/profis" className="inline-block px-8 py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase">
              Jetzt Fachkraft finden
            </a>
          </div>
        </div>
      </section>

      {/* ── 9. WIE ES LÄUFT ── */}
      <section id="wie" className="py-28 px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Der Prozess</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">WIE ES LÄUFT.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-gray-200">
            <div className="bg-[#F5F4F0] p-12">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Für Fachkräfte</p>
              <div className="space-y-8">
                {[
                  ["01", "Profil einreichen", "Alias, Rolle, Skills, Stundensatz — in 5 Minuten. Kein Konto nötig."],
                  ["02", "Wir prüfen dich", "Wir checken manuell ob du wirklich gut bist. Nur echte Profis kommen rein."],
                  ["03", "Anfragen erhalten", "Unternehmen finden dein Profil und schicken eine Anfrage über die Plattform. Du entscheidest ob deine Kontaktdaten freigegeben werden."],
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
                Jetzt Profil einreichen →
              </a>
            </div>
            <div className="bg-white p-12">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Für Unternehmen</p>
              <div className="space-y-8">
                {[
                  ["01", "Verzeichnis durchsuchen", "Alle geprüften Fachkräfte in Frankfurt — filterbar nach Rolle, Stadt, Verfügbarkeit."],
                  ["02", "Richtige Person finden", "Stundensatz, Skills und Bio sind transparent. Kein Rätselraten, kein Blindflug."],
                  ["03", "Anfrage stellen", "Anfrage direkt über die Plattform — die Fachkraft entscheidet ob Kontaktdaten freigegeben werden."],
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
                Fachkräfte durchsuchen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. LEGAL ── */}
      <section className="py-20 px-8 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-white/5">
          <div className="p-10">
            <p className="font-black text-yellow-500 mb-3 text-sm uppercase tracking-widest">Kostenlos</p>
            <p className="text-white/50 text-sm leading-relaxed font-medium">
              MaxiJobber ist für Fachkräfte und Unternehmen komplett kostenlos.
              Kein Abo, keine Provision. Transparenz von Anfang an.
            </p>
          </div>
          <div className="p-10">
            <p className="font-black text-yellow-500 mb-3 text-sm uppercase tracking-widest">Kein Arbeitgeber</p>
            <p className="text-white/50 text-sm leading-relaxed font-medium">
              MaxiJobber ist Plattform, kein Arbeitgeber.
              Minijob-Verträge werden direkt zwischen Fachkraft
              und Unternehmen abgeschlossen. Ihr regelt das selbst.
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
              Kein Marktplatz für jeden. Geprüfte Fachkräfte für reguläre Minijobs — direkt vermittelt.
            </p>
            <p className="text-yellow-400 font-black text-sm mt-3 uppercase tracking-widest">
              Profil einreichen — dauert 5 Minuten.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3">
            <a href="/mitmachen" className="px-8 py-4 font-black bg-yellow-500 text-black hover:bg-yellow-400 transition text-sm tracking-widest uppercase text-center">
              Als Fachkraft bewerben
            </a>
            <a href="/profis" className="px-8 py-4 font-black border-2 border-white/30 hover:border-white hover:bg-white/5 transition text-sm tracking-widest uppercase text-center">
              Fachkräfte durchsuchen
            </a>
            <p className="text-white/20 text-xs text-center font-medium mt-1">Kostenlos · Kein Konto nötig · Geschützter Kontakt</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-gray-950 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div>
              <a href="/" className="text-2xl font-black tracking-tighter">MAXI<span className="text-yellow-500">JOBBER</span></a>
              <p className="text-white/30 text-sm font-medium mt-2 max-w-xs leading-relaxed">
                Handverlesene Fachkräfte für reguläre Minijobs.<br />
                Direkte Vermittlung. Frankfurt & Rhein-Main.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/20 mb-4">Plattform</p>
                <div className="space-y-2">
                  <a href="/profis" className="block text-sm text-white/40 hover:text-white transition font-medium">Fachkräfte suchen</a>
                  <a href="/mitmachen" className="block text-sm text-white/40 hover:text-white transition font-medium">Profil einreichen</a>
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
