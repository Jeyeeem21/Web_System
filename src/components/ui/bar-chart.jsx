export function BarChart({ data, title, legend }) {
  const maxValue = Math.max(...data.flatMap(d => [d.appointments || 0, d.revenue ? d.revenue / 100 : 0]))

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {legend && (
          <div className="flex gap-4 text-sm flex-wrap">
            {legend.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
                <span className="text-gray-600 text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="h-72 flex items-end justify-between gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex flex-col items-center gap-1 h-full justify-end">
              {item.appointments && (
                <div className="relative w-full group">
                  <div
                    className="w-full bg-gradient-to-t from-[#D4AF37] to-[#E5C158] rounded-t-lg transition-all duration-300 hover:from-[#E5C158] hover:to-[#D4AF37]"
                    style={{ height: `${(item.appointments / maxValue) * 100}%`, minHeight: '20px' }}
                  >
                    <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-1 rounded shadow-lg">
                      {item.appointments}
                    </span>
                  </div>
                </div>
              )}
              {item.revenue && (
                <div className="relative w-full group">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-300 hover:from-emerald-400 hover:to-emerald-500"
                    style={{ height: `${((item.revenue / 100) / maxValue) * 100}%`, minHeight: '20px' }}
                  >
                    <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-1 rounded shadow-lg">
                      ${(item.revenue / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-gray-500 mt-2">{item.month || item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
