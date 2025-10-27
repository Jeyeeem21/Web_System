export function DoughnutChart({ data, title }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  const colors = [
    { from: '#D4AF37', to: '#C4A030' },
    { from: '#3b82f6', to: '#2563eb' },
    { from: '#10b981', to: '#059669' },
    { from: '#8b5cf6', to: '#7c3aed' },
    { from: '#ec4899', to: '#db2777' }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-lg font-bold text-gray-900 mb-6">{title}</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Doughnut Chart */}
        <div className="relative w-44 h-44 flex-shrink-0">
          <svg className="transform -rotate-90" width="176" height="176" viewBox="0 0 176 176">
            <circle
              cx="88"
              cy="88"
              r="70"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="28"
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100
              const circumference = 2 * Math.PI * 70
              const strokeDasharray = `${(percentage * circumference) / 100} ${circumference}`
              const rotation = (cumulativePercentage * circumference) / 100
              cumulativePercentage += percentage

              return (
                <circle
                  key={index}
                  cx="88"
                  cy="88"
                  r="70"
                  fill="none"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth="28"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={-rotation}
                  className="transition-all duration-500 hover:opacity-80"
                  style={{ cursor: 'pointer' }}
                />
              )
            })}
            
            {/* Gradients */}
            <defs>
              {data.map((item, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors[index % colors.length].from} />
                  <stop offset="100%" stopColor={colors[index % colors.length].to} />
                </linearGradient>
              ))}
            </defs>
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-gray-900">{total}</p>
            <p className="text-xs text-gray-500 font-medium">Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 flex-1">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1)
            return (
              <div key={index} className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div 
                    className={`w-3 h-3 rounded-sm flex-shrink-0`}
                    style={{ 
                      background: `linear-gradient(135deg, ${colors[index % colors.length].from}, ${colors[index % colors.length].to})` 
                    }}
                  ></div>
                  <span className="text-sm text-gray-700 truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  <span className="text-xs text-gray-500 w-12 text-right">{percentage}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
