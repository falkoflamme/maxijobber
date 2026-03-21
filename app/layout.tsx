import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'MaxiJobber — Geprüfte Fachkräfte für Minijobs in Frankfurt.',
  description: 'MaxiJobber verbindet geprüfte Fachkräfte direkt mit Unternehmen in Frankfurt — für reguläre Minijobs, ohne Agentur, ohne Aufschlag.',
  keywords: 'Fachkräfte, Frankfurt, Minijob, Elektriker, Handwerk, Vermittlung',
  openGraph: {
    title: 'MaxiJobber — Geprüfte Fachkräfte für Minijobs in Frankfurt.',
    description: 'Geprüfte Fachkräfte für reguläre Minijob-Einsätze — direkt, ohne Mittelsmann, ohne Aufschlag.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
