'use client'

export default function CopyButton({ url }: { url: string }) {
  function copy() {
    navigator.clipboard.writeText(url).catch(() => {})
    const btn = document.getElementById('copy-btn')
    if (btn) {
      btn.textContent = 'Kopiert!'
      setTimeout(() => { if (btn) btn.textContent = 'Kopieren' }, 2000)
    }
  }

  return (
    <div className="flex gap-2">
      <input
        readOnly
        value={url}
        className="flex-1 px-4 py-2.5 bg-gray-50 border-2 border-gray-200 text-xs font-medium text-gray-500 focus:outline-none"
      />
      <button
        id="copy-btn"
        onClick={copy}
        className="px-4 py-2.5 font-black bg-gray-900 text-white text-xs hover:bg-gray-700 transition border-2 border-[#1a1a1a]"
      >
        Kopieren
      </button>
    </div>
  )
}
