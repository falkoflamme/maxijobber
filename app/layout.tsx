import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'MaxiJobber — Geprüfte Fachkräfte. Sofort.',
  description: 'MaxiJobber verbindet geprüfte Fachkräfte direkt mit Unternehmen in Frankfurt — ohne Agentur, ohne Aufschlag.',
  keywords: 'Fachkräfte, Frankfurt, Minijob, Elektriker, Handwerk, Vermittlung',
  openGraph: {
    title: 'MaxiJobber — Geprüfte Fachkräfte. Sofort.',
    description: 'Die direkte Verbindung zwischen Fachkräften und Unternehmen in Frankfurt.',
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
