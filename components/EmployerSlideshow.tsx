'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from 'react'

const EMPLOYERS = [
  {
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80',
    quote: 'Wir haben über MaxiJobber unseren festen Minijobber für Wochenenden gefunden. Kein Stress mehr, kein Personalmangel.',
    name: 'Sarah M.',
    role: 'Restaurantleiterin',
    company: 'Bistro Central Frankfurt',
  },
  {
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80',
    quote: 'Direktkontakt, fairer Preis, kein Aufschlag. So stelle ich mir moderne Personalvermittlung vor. Nie wieder Agentur.',
    name: 'Daniel F.',
    role: 'Betriebsleiter',
    company: 'Hotel am Main Frankfurt',
  },
  {
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80',
    quote: 'Der Elektriker war top qualifiziert, kam pünktlich und hat sauber gearbeitet. Genau das was wir brauchten.',
    name: 'Marcus T.',
    role: 'Facility Manager',
    company: 'Bürokomplex Sachsenhausen',
  },
  {
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&q=80',
    quote: 'Für Events brauchen wir verlässliche Fachkräfte für feste Minijob-Einsätze. MaxiJobber hat uns genau das geliefert — ohne Kompromisse.',
    name: 'Julia R.',
    role: 'Event-Managerin',
    company: 'Catering Frankfurt',
  },
]

export default function EmployerSlideshow() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="py-28 px-8 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Von Unternehmen</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">WAS BETRIEBE<br />SAGEN.</h2>
            <p className="text-white/40 font-medium mt-4 max-w-xl">
              Keine Agentur. Kein Aufschlag. Echte Verbindungen —
              Fachkräfte die direkt einen Minijob-Vertrag abschließen.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={scrollPrev} className="w-12 h-12 border-2 border-white/20 flex items-center justify-center font-black text-lg hover:border-yellow-500 hover:text-yellow-500 transition" aria-label="Zurück">←</button>
            <button onClick={scrollNext} className="w-12 h-12 border-2 border-white/20 flex items-center justify-center font-black text-lg hover:border-yellow-500 hover:text-yellow-500 transition" aria-label="Weiter">→</button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {EMPLOYERS.map((e, i) => (
              <div key={e.name} className="shrink-0 w-[340px]">
                <div className="bg-[#2a2a2a] border border-[#3a3a3a] border-l-[4px] border-l-yellow-500 rounded-xl p-8 h-full flex flex-col hover:border-yellow-500 transition-colors duration-200">
                  {/* Quote */}
                  <blockquote className="text-white text-base leading-relaxed italic flex-1 mb-8">
                    &ldquo;{e.quote}&rdquo;
                  </blockquote>

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={e.photo}
                        alt={e.name}
                        width={48}
                        height={48}
                        loading={i < 2 ? 'eager' : 'lazy'}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shrink-0"
                        onError={ev => {
                          const el = ev.currentTarget as HTMLImageElement
                          el.style.display = 'none'
                          const fb = el.nextElementSibling as HTMLElement | null
                          if (fb) fb.style.display = 'flex'
                        }}
                      />
                      <div
                        className="w-12 h-12 rounded-full bg-gray-700 text-white font-black text-base items-center justify-center border-2 border-white/20 shrink-0"
                        style={{ display: 'none' }}
                      >
                        {e.name[0]}
                      </div>
                      <div>
                        <div className="font-black text-sm text-white">{e.name}</div>
                        <div className="text-white/40 text-xs">{e.role}</div>
                        <div className="text-white/30 text-xs">{e.company}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">★</span>
                        ))}
                      </div>
                      <span className="text-white/30 text-xs font-bold">Verifizierter Auftraggeber</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a href="/profis" className="inline-block px-8 py-4 font-black bg-yellow-500 text-black rounded hover:bg-yellow-400 transition text-sm tracking-widest uppercase">
            Jetzt Fachkraft finden →
          </a>
        </div>
      </div>
    </section>
  )
}
