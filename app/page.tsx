import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">
        <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-4">Design Review</p>
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          <span className="text-yellow-400">Maxi</span>Jobber
        </h1>
        <p className="text-gray-400 text-lg mb-14">
          Geprüfte Fachkräfte. Sofort vermittelt. — Frankfurt am Main
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          <Link href="/mockup-a" className="group p-7 rounded-2xl bg-black border border-white/10 hover:border-yellow-400/40 transition text-left block">
            <div className="text-yellow-400 font-black text-xs tracking-widest uppercase mb-3">Style A</div>
            <h2 className="text-xl font-black mb-2">Urban Premium</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Dark, bold, stark. Schwarz + Gelb. Maximaler Kontrast, klare Aussage.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-semibold">Dark</span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/50 text-xs font-semibold">Bold</span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/50 text-xs font-semibold">Stark</span>
            </div>
          </Link>

          <Link href="/mockup-b" className="group p-7 rounded-2xl bg-white border border-gray-200 hover:border-blue-400 transition text-left block text-gray-900">
            <div className="text-blue-600 font-black text-xs tracking-widest uppercase mb-3">Style B</div>
            <h2 className="text-xl font-black mb-2">Clean Marketplace</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Hell, strukturiert, vertrauenswürdig. Blau + Weiß. Professionelles SaaS-Feeling.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">Clean</span>
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">Modern</span>
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">Trust</span>
            </div>
          </Link>

          <Link href="/mockup-c" className="group p-7 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/20 hover:border-purple-400/50 transition text-left block">
            <div className="font-black text-xs tracking-widest uppercase mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Style C</div>
            <h2 className="text-xl font-black mb-2">Energetic Social</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Lebendig, bunt, social-media-feel. Lila + Pink + Orange. Community-Energie.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">Energetic</span>
              <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold">Social</span>
              <span className="px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold">Vivid</span>
            </div>
          </Link>
        </div>

        <p className="mt-10 text-gray-600 text-sm">
          Klicke auf einen Style um die Landing Page zu sehen →
        </p>
      </div>
    </div>
  )
}
