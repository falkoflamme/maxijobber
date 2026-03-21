'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from 'react'

const WORKERS = [
  {
    photo: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop&q=80',
    name: 'Marco B.',
    role: 'Sous Chef',
    city: 'Frankfurt Sachsenhausen',
    years: '7 Jahre',
    quote: 'Ich koche seit 7 Jahren auf höchstem Niveau. Meine Arbeit spricht für sich.',
    rate: '38 €/h',
  },
  {
    photo: 'https://images.unsplash.com/photo-1621905251189-08b1d44e5b3a?w=150&h=150&fit=crop&q=80',
    name: 'Thomas K.',
    role: 'Elektriker',
    city: 'Frankfurt Nord',
    years: '9 Jahre',
    quote: 'Sauber. Pünktlich. Fertig. So arbeite ich — immer.',
    rate: '42 €/h',
  },
  {
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&q=80',
    name: 'Ayse D.',
    role: 'Hauswirtschaft',
    city: 'Frankfurt Mitte',
    years: '6 Jahre',
    quote: 'Details machen den Unterschied. Das weiß ich nach 6 Jahren.',
    rate: '28 €/h',
  },
  {
    photo: 'https://images.unsplash.com/photo-1559339352-11d035aa65ce?w=150&h=150&fit=crop&q=80',
    name: 'Sandra K.',
    role: 'Chef de Partie',
    city: 'Frankfurt Bornheim',
    years: '5 Jahre',
    quote: 'Qualität erkennt man erst wenn der Gast wiederkommt.',
    rate: '32 €/h',
  },
  {
    photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=150&h=150&fit=crop&q=80',
    name: 'Kevin M.',
    role: 'Sanitärinstallateur',
    city: 'Frankfurt Sachsenhausen',
    years: '8 Jahre',
    quote: 'Ich liefere saubere Arbeit — pünktlich, ohne Ausreden.',
    rate: '36 €/h',
  },
]

export default function WorkerSlideshow() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="py-28 px-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-4">Für Unternehmen</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">ECHTE MENSCHEN.<br />ECHTE SKILLS.</h2>
            <p className="text-gray-500 font-medium mt-4 max-w-xl">
              Handverlesen geprüft — jeder ein Profi, kein Zufallskandidat.
              Bereit für reguläre Minijob-Einsätze.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={scrollPrev} className="w-12 h-12 border-2 border-[#1a1a1a] flex items-center justify-center font-black text-lg hover:bg-gray-900 hover:text-white transition" aria-label="Zurück">←</button>
            <button onClick={scrollNext} className="w-12 h-12 border-2 border-[#1a1a1a] flex items-center justify-center font-black text-lg hover:bg-gray-900 hover:text-white transition" aria-label="Weiter">→</button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {WORKERS.map((w, i) => (
              <div key={w.name} className="shrink-0 w-[300px]">
                <div
                  className="bg-white border-2 border-[#1a1a1a] rounded-xl p-6 h-full flex flex-col transition-all duration-200 hover:shadow-[6px_6px_0px_#F5C518] group"
                  style={{ boxShadow: '4px 4px 0px #1a1a1a' }}
                >
                  {/* Photo + Info */}
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={w.photo}
                      alt={w.name}
                      width={72}
                      height={72}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#1a1a1a] shrink-0"
                      onError={e => {
                        const el = e.currentTarget as HTMLImageElement
                        el.style.display = 'none'
                        const fb = el.nextElementSibling as HTMLElement | null
                        if (fb) fb.style.display = 'flex'
                      }}
                    />
                    <div
                      className="w-16 h-16 rounded-full bg-gray-900 text-white font-black text-xl items-center justify-center shrink-0 border-2 border-[#1a1a1a]"
                      style={{ display: 'none' }}
                    >
                      {w.name[0]}
                    </div>
                    <div>
                      <div className="font-black text-sm">{w.name}</div>
                      <div className="text-gray-500 text-xs">{w.role}</div>
                      <div className="text-gray-400 text-xs">{w.city} · {w.years}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-5">
                    &ldquo;{w.quote}&rdquo;
                  </p>

                  {/* Rate + CTA */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-black text-xl">{w.rate}</span>
                      <span className="text-xs font-black text-green-700 bg-green-50 px-2 py-1">● Verfügbar</span>
                    </div>
                    <a
                      href="/profis"
                      className="block w-full py-2.5 text-center text-xs font-black uppercase tracking-widest border-2 border-[#1a1a1a] hover:bg-gray-900 hover:text-white transition"
                    >
                      Profil ansehen →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a href="/profis" className="inline-block px-8 py-4 font-black bg-gray-900 text-white rounded hover:bg-yellow-500 hover:text-black transition text-sm tracking-widest uppercase">
            Alle Fachkräfte ansehen →
          </a>
        </div>
      </div>
    </section>
  )
}
