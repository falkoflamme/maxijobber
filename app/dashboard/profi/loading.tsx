export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="h-10 w-48 bg-gray-100 rounded-xl animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-24 animate-pulse" />
          ))}
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 h-24 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
