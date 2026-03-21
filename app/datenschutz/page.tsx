export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-8 py-5">
        <a href="/" className="text-xl font-black tracking-tighter">
          MAXI<span className="text-yellow-500">JOBBER</span>
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Legal</p>
        <h1 className="text-5xl font-black tracking-tighter mb-4">DATENSCHUTZ</h1>
        <p className="text-gray-400 font-medium text-lg mb-16">
          Datenschutzerklärung gemäß DSGVO/GDPR. Stand: März 2026.
        </p>

        <div className="space-y-12 text-sm text-gray-700 leading-relaxed">

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">1. Verantwortlicher</h2>
            <p className="text-gray-500">
              Verantwortlicher im Sinne der DSGVO ist:<br /><br />
              MaxiJobber<br />
              Falko Flamme<br />
              Ringelstraße 45<br />
              60385 Frankfurt am Main<br />
              E-Mail: <a href="mailto:hallo@maxijobber.de" className="text-yellow-600 hover:underline">hallo@maxijobber.de</a>
            </p>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">2. Welche Daten wir verarbeiten</h2>
            <div className="space-y-4 text-gray-500">
              <div>
                <strong className="text-gray-700">Fachkräfte (Profil-Einreichung):</strong> Name, Berufsbezeichnung,
                Erfahrungsjahre, Stundensatz, Standort, Kontaktdaten (Telefon/WhatsApp/E-Mail),
                Profilfoto, Kurzbio. Diese Daten werden nach Prüfung öffentlich sichtbar gemacht.
              </div>
              <div>
                <strong className="text-gray-700">Besucher der Plattform:</strong> Server-Logs (IP-Adresse, Browser,
                Zeitstempel) — automatisch durch den Hosting-Anbieter (Vercel) erhoben.
                Diese Daten werden nicht personenbezogen ausgewertet.
              </div>
              <div>
                <strong className="text-gray-700">Admin-Bereich:</strong> E-Mail-Adresse für Magic-Link-Authentifizierung
                (Supabase Auth). Keine Passwörter gespeichert.
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">3. Rechtsgrundlagen</h2>
            <div className="space-y-3 text-gray-500">
              <p><strong className="text-gray-700">Art. 6 Abs. 1 lit. a DSGVO</strong> — Einwilligung: Fachkräfte reichen ihr Profil freiwillig ein und erklären sich mit der öffentlichen Darstellung einverstanden.</p>
              <p><strong className="text-gray-700">Art. 6 Abs. 1 lit. f DSGVO</strong> — Berechtigte Interessen: Server-Logs zur Sicherstellung des Betriebs der Plattform.</p>
            </div>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">4. Speicherdauer</h2>
            <p className="text-gray-500">
              Profile werden gespeichert solange die Fachkraft aktiv auf der Plattform ist.
              Auf schriftliche Anfrage an <a href="mailto:hallo@maxijobber.de" className="text-yellow-600 hover:underline">hallo@maxijobber.de</a> werden
              Profile vollständig gelöscht. Server-Logs werden nach spätestens 30 Tagen automatisch gelöscht.
            </p>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">5. Weitergabe an Dritte</h2>
            <div className="space-y-3 text-gray-500">
              <p>Wir geben Ihre Daten nicht an Dritte zu kommerziellen Zwecken weiter. Folgende Dienstleister werden eingesetzt:</p>
              <ul className="space-y-2 ml-4">
                <li><strong className="text-gray-700">Vercel Inc.</strong> (USA) — Hosting. Datenschutz: <span className="text-gray-400">vercel.com/legal/privacy-policy</span></li>
                <li><strong className="text-gray-700">Supabase Inc.</strong> (USA) — Datenbank und Authentifizierung. Datenschutz: <span className="text-gray-400">supabase.com/privacy</span></li>
                <li><strong className="text-gray-700">OpenAI LLC</strong> (USA) — KI-Unterstützung bei Profil-Texten (optional). Datenschutz: <span className="text-gray-400">openai.com/policies/privacy-policy</span></li>
              </ul>
              <p>Bei US-Diensten: Datenübertragung auf Basis von Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO.</p>
            </div>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">6. Öffentliche Profile</h2>
            <p className="text-gray-500">
              Fachkraft-Profile sind nach Freischaltung öffentlich zugänglich und für Suchmaschinen indexierbar.
              Fachkräfte, die ihr Profil einreichen, erklären sich mit dieser Sichtbarkeit ausdrücklich einverstanden.
              Die Kontaktdaten (Telefon, WhatsApp, E-Mail) werden auf dem Profil angezeigt, um Unternehmen den
              Direktkontakt zu ermöglichen.
            </p>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">7. Ihre Rechte (DSGVO)</h2>
            <div className="text-gray-500 space-y-2">
              <p>Sie haben folgende Rechte gegenüber uns:</p>
              <ul className="space-y-1 ml-4">
                <li>✓ Auskunft über gespeicherte Daten (Art. 15 DSGVO)</li>
                <li>✓ Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>✓ Löschung Ihrer Daten (Art. 17 DSGVO — &ldquo;Recht auf Vergessen&rdquo;)</li>
                <li>✓ Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>✓ Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
                <li>✓ Datenportabilität (Art. 20 DSGVO)</li>
              </ul>
              <p className="mt-3">Kontaktieren Sie uns per E-Mail: <a href="mailto:hallo@maxijobber.de" className="text-yellow-600 hover:underline">hallo@maxijobber.de</a></p>
              <p>Sie haben außerdem das Recht, bei der zuständigen Aufsichtsbehörde Beschwerde einzulegen
              (Hessischer Beauftragter für Datenschutz und Informationsfreiheit, Wiesbaden).</p>
            </div>
          </div>

          <div>
            <h2 className="font-black text-base text-gray-900 mb-3 uppercase tracking-tight">8. Cookies</h2>
            <p className="text-gray-500">
              MaxiJobber setzt keine Tracking-Cookies und keine Werbe-Cookies ein.
              Technisch notwendige Session-Cookies können durch den Browser gesetzt werden.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400 font-medium">Stand: März 2026 · Diese Datenschutzerklärung kann bei Änderungen der Plattform aktualisiert werden.</p>
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
