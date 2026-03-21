export default function Impressum() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-8 py-5">
        <a href="/" className="text-xl font-black tracking-tighter">
          MAXI<span className="text-yellow-500">JOBBER</span>
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Legal</p>
        <h1 className="text-5xl font-black tracking-tighter mb-4">IMPRESSUM</h1>
        <p className="text-gray-400 font-medium text-lg mb-16">
          Angaben gemäß § 5 TMG
        </p>

        <div className="space-y-12 text-sm text-gray-700 leading-relaxed">

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">Betreiber</h2>
            <p className="text-gray-500">
              MaxiJobber<br />
              Falko Flamme<br />
              Ringelstraße 45<br />
              60385 Frankfurt am Main<br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">Kontakt</h2>
            <p className="text-gray-500">
              E-Mail: <a href="mailto:hallo@maxijobber.de" className="text-yellow-600 hover:underline">hallo@maxijobber.de</a>
            </p>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">Verantwortlich für den Inhalt</h2>
            <p className="text-gray-500">
              Falko Flamme<br />
              Ringelstraße 45, 60385 Frankfurt am Main
            </p>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">Haftungsausschluss</h2>
            <p className="text-gray-500 mb-4">
              <strong className="text-gray-700">Haftung für Inhalte:</strong> Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
            <p className="text-gray-500 mb-4">
              <strong className="text-gray-700">Haftung für Links:</strong> Unser Angebot enthält Links zu externen Webseiten Dritter,
              auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">Hinweis zur Plattform</h2>
            <p className="text-gray-500">
              MaxiJobber ist ein öffentliches Verzeichnis von Fachkräften. Die Plattform vermittelt keine Arbeitnehmer
              im arbeitsrechtlichen Sinne und ist kein Arbeitgeber. Vertragsbeziehungen entstehen ausschließlich direkt
              zwischen Fachkraft und Auftraggeber. MaxiJobber ist an keiner Vergütung beteiligt.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400 font-medium">Stand: März 2026</p>
          </div>

        </div>
      </div>

      <footer className="py-10 px-8 border-t border-gray-100">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-6 text-sm text-gray-400 font-medium">
          <a href="/datenschutz" className="hover:text-gray-900 transition">Datenschutz</a>
          <a href="/impressum" className="hover:text-gray-900 transition">Impressum</a>
          <a href="/agb" className="hover:text-gray-900 transition">AGB</a>
          <a href="/legal/minijob-guide" className="hover:text-gray-900 transition">Minijob-Guide</a>
        </div>
      </footer>
    </div>
  )
}
