'use client'

import { useState, useEffect, useCallback } from 'react'

const TESTIMONIALS = [
  {
    type: 'worker' as const,
    photo: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=80&h=80&fit=crop&crop=face&auto=format',
    name: 'Marco B.',
    role: 'Sous Chef',
    city: 'Frankfurt Sachsenhausen',
    quote: 'Ich arbeite wenn ich will, verdiene was ich wert bin. Kein Chef der mir sagt was ich verdiene.',
    rate: '38 €/h',
    available: 'Verfügbar ab Wochenende',
  },
  {
    type: 'company' as const,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face&auto=format',
    name: 'Sarah M.',
    role: 'Restaurantleiterin',
    company: 'Bistro Central Frankfurt',
    quote: 'Samstag Abend, Notfall. Zwei Stunden später stand ein Profi in meiner Küche.',
    badge: 'Verifizierter Auftraggeber',
  },
  {
    type: 'worker' as const,
    photo: 'https://images.unsplash.com/photo-1621905251189-08b1d44e5b3a?w=80&h=80&fit=crop&crop=face&auto=format',
    name: 'Thomas K.',
    role: 'Elektriker',
    city: 'Frankfurt Nord',
    quote: 'Drei Anfragen in der ersten Woche. Ich hab noch nicht mal aktiv gesucht.',
    rate: '42 €/h',
    available: 'Verfügbar',
  },
  {
    type: 'company' as const,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face&auto=format',
    name: 'Daniel F.',
    role: 'Betriebsleiter',
    company: 'Hotel am Main',
    quote: 'Keine Agentur, kein Aufschlag, kein Stress. Direkt. Fertig.',
    badge: 'Verifizierter Auftraggeber',
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next, paused])

  const t = TESTIMONIALS[current]

  return (
    <section className="py-28 px-8 bg-[#F5F4F0] border-t border-gray-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Stimmen</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter">WAS SIE SAGEN.</h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card */}
          <div className="bg-white border-2 border-[#1a1a1a] p-10 md:p-14 max-w-3xl mx-auto shadow-md">
            {/* Badge */}
            <div className="mb-8">
              {t.type === 'worker' ? (
                <span className="text-xs font-black uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1">
                  Fachkraft
                </span>
              ) : (
                <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1">
                  {t.badge}
                </span>
              )}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-10 text-gray-900">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Person */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={t.photo}
                alt={t.name}
                width={60}
                height={60}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#1a1a1a]"
                onError={e => {
                  const el = e.currentTarget as HTMLImageElement
                  el.style.display = 'none'
                  const next = el.nextElementSibling as HTMLElement | null
                  if (next) next.style.display = 'flex'
                }}
              />
              <div
                className="w-14 h-14 rounded-full bg-gray-900 text-white font-black text-xl items-center justify-center border-2 border-[#1a1a1a] shrink-0"
                style={{ display: 'none' }}
              >
                {t.name[0]}
              </div>
              <div>
                <div className="font-black text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">
                  {t.role} · {'city' in t ? t.city : t.company}
                </div>
              </div>
              {t.type === 'worker' && (
                <div className="ml-auto text-right shrink-0">
                  <div className="font-black text-lg">{t.rate}</div>
                  <div className="text-xs font-bold text-green-600">{t.available}</div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 border-2 border-[#1a1a1a] flex items-center justify-center font-black hover:bg-gray-900 hover:text-white transition text-lg"
              aria-label="Vorheriges"
            >
              ←
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 transition-all ${i === current ? 'bg-yellow-500 w-6' : 'bg-gray-300 hover:bg-gray-500'}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border-2 border-[#1a1a1a] flex items-center justify-center font-black hover:bg-gray-900 hover:text-white transition text-lg"
              aria-label="Nächstes"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
