export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl font-black text-gray-100 mb-4">404</div>
        <h1 className="text-3xl font-black tracking-tighter mb-3">Seite nicht gefunden.</h1>
        <p className="text-gray-400 font-medium mb-8">Die gesuchte Seite existiert nicht.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 font-black bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition"
        >
          Zurück zur Startseite
        </a>
      </div>
    </div>
  )
}
