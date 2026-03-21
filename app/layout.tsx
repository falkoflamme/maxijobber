import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'MaxiJobber — Geprüfte Fachkräfte für Minijobs in Frankfurt.',
  description: 'MaxiJobber verbindet geprüfte Fachkräfte direkt mit Unternehmen in Frankfurt — für reguläre Minijobs, ohne Agentur, ohne Aufschlag.',
  keywords: 'Fachkräfte Frankfurt, Minijob Frankfurt, Elektriker Minijob, Handwerker Frankfurt, Minijob Vermittlung Frankfurt, 538 Euro Job',
  metadataBase: new URL('https://www.maxijobber.de'),
  openGraph: {
    title: 'MaxiJobber — Geprüfte Fachkräfte für Minijobs in Frankfurt.',
    description: 'Geprüfte Fachkräfte für reguläre Minijob-Einsätze — direkt, ohne Mittelsmann, ohne Aufschlag.',
    url: 'https://www.maxijobber.de',
    siteName: 'MaxiJobber',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaxiJobber — Geprüfte Fachkräfte für Minijobs in Frankfurt.',
    description: 'Direkte Vermittlung. Kein Aufschlag. Handverlesen geprüft.',
  },
  alternates: {
    canonical: 'https://www.maxijobber.de',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
