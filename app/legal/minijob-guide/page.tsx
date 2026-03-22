export default function MinijobGuide() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-8 py-5">
        <a href="/" className="text-xl font-black tracking-tighter">
          <img src="/logo2.png" alt="MaxiJobber" className="h-10 w-auto" />
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Legal</p>
        <h1 className="text-5xl font-black tracking-tighter mb-4">MINIJOB-GUIDE</h1>
        <p className="text-gray-400 font-medium text-lg mb-16">
          Alles was Fachkräfte über den Minijob wissen müssen. Stand: 2026.
        </p>

        <div className="space-y-12">
          {[
            {
              title: 'Was ist ein Minijob?',
              content: 'Ein Minijob (geringfügige Beschäftigung) ist ein Arbeitsverhältnis, bei dem der monatliche Verdienst die Grenze von 538 € nicht überschreitet (Stand 2024). Diese Grenze wird regelmäßig angepasst. Minijobber zahlen keine Einkommensteuer und in der Regel keine Sozialversicherungsbeiträge.',
            },
            {
              title: 'Wie viel kann ich verdienen?',
              content: 'Bis zu 538 € monatlich (6.456 € jährlich) sind komplett steuerfrei für dich als Arbeitnehmer. Der Arbeitgeber zahlt pauschale Abgaben (ca. 30% Gesamtbelastung für ihn), aber du als Fachkraft bekommst den vereinbarten Betrag netto.',
            },
            {
              title: 'Kann ich mehrere Minijobs haben?',
              content: 'Du kannst mehrere Minijobs haben, aber alle zusammen dürfen die 538 €-Grenze nicht überschreiten. Hast du bereits einen sozialversicherungspflichtigen Hauptjob, darfst du daneben einen Minijob steuer- und abgabenfrei ausüben — solange der Minijob die Grenze nicht überschreitet.',
            },
            {
              title: 'Was muss im Vertrag stehen?',
              content: 'Auch Minijobs brauchen einen schriftlichen Arbeitsvertrag. Dieser muss enthalten: Namen und Adressen beider Parteien, Beginn und Dauer des Arbeitsverhältnisses, Arbeitszeit und Arbeitsort, Vergütung, Urlaub. MaxiJobber stellt einen Mustermustervertrag zur Verfügung.',
            },
            {
              title: 'Habe ich Anspruch auf Urlaub?',
              content: 'Ja. Auch Minijobber haben gesetzlichen Urlaubsanspruch. Bei einer 5-Tage-Woche sind das mindestens 20 Tage pro Jahr. Bei weniger Arbeitstagen wird entsprechend anteilig berechnet.',
            },
            {
              title: 'Was ist mit Rentenversicherung?',
              content: 'Seit 2013 sind Minijobber automatisch rentenversicherungspflichtig. Du kannst dich davon befreien lassen, wenn du es schriftlich beim Arbeitgeber beantragst. Bei Befreiung hast du keinen Rentenanspruch aus dem Minijob.',
            },
          ].map(({ title, content }) => (
            <div key={title} className="border-b border-gray-100 pb-10">
              <h2 className="text-xl font-black mb-4">{title}</h2>
              <p className="text-gray-500 font-medium leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
          <h3 className="font-black text-lg mb-3">Wichtiger Hinweis</h3>
          <p className="text-gray-600 font-medium leading-relaxed text-sm">
            Dieser Guide dient nur zur allgemeinen Information und ersetzt keine Rechtsberatung.
            Bei individuellen Fragen wende dich an einen Steuerberater oder die Minijob-Zentrale
            (minijob-zentrale.de).
          </p>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/auth/register"
            className="inline-block px-8 py-4 font-black bg-gray-900 text-white rounded-full hover:bg-gray-700 transition text-sm tracking-wide"
          >
            Jetzt Profil anlegen
          </a>
        </div>
      </div>
    </div>
  )
}
