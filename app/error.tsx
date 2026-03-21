'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl font-black text-gray-100 mb-4">!</div>
        <h1 className="text-3xl font-black tracking-tighter mb-3">Etwas ist schiefgelaufen.</h1>
        <p className="text-gray-400 font-medium mb-8">Ein unerwarteter Fehler ist aufgetreten.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="px-6 py-3 font-black border-2 border-gray-200 rounded-full text-sm hover:border-gray-400 transition"
          >
            Startseite
          </a>
        </div>
      </div>
    </div>
  )
}
