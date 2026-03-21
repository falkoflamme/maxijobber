import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Als Fachkraft bewerben — MaxiJobber Frankfurt',
  description: 'Profil einreichen und von Unternehmen in Frankfurt gefunden werden. Kostenlos. Kein Konto. Minijobs ab 25 €/h. Bis zu 538 € steuerfrei im Monat.',
  alternates: { canonical: 'https://www.maxijobber.de/mitmachen' },
  openGraph: {
    title: 'Dein Minijob-Profil in Frankfurt — MaxiJobber',
    description: 'Profil einreichen, freigeschaltet werden, gefunden werden. Kostenlos. In 5 Minuten.',
    url: 'https://www.maxijobber.de/mitmachen',
  },
}

export default function MitmachenLayout({ children }: { children: React.ReactNode }) {
  return children
}
