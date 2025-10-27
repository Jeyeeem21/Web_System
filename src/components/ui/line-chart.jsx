export function LineChart({ data, title, dataKey1, dataKey2, label1, label2 }) {
  const maxValue = Math.max(...data.flatMap(d => [d[dataKey1] || 0, d[dataKey2] || 0]))
  const points1 = []
  const points2 = []
  
  const width = 100
  const height = 100
  const padding = 10

  data.forEach((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2)
    const y1 = height - padding - ((item[dataKey1] / maxValue) * (height - padding * 2))
    const y2 = height - padding - ((item[dataKey2] / maxValue) * (height - padding * 2))
    points1.push({ x, y: y1, value: item[dataKey1] })
    points2.push({ x, y: y2, value: item[dataKey2] })
  })

  const createPath = (points) => {
    return points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x},${point.y}`).join(' ')
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <div className="flex gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#D4AF37]"></div>
            <span className="text-gray-600 text-xs">{label1}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
            <span className="text-gray-600 text-xs">{label2}</span>
          </div>
        </div>
      </div>

      <div className="relative h-72">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1={padding}
              y1={height - padding - (percent / 100) * (height - padding * 2)}
              x2={width - padding}
              y2={height - padding - (percent / 100) * (height - padding * 2)}
              stroke="#f3f4f6"
              strokeWidth="0.3"
            />
          ))}
          
          {/* Area under Line 1 */}
          <path
            d={`${createPath(points1)} L ${points1[points1.length - 1].x},${height - padding} L ${points1[0].x},${height - padding} Z`}
            fill="url(#areaGradient1)"
            opacity="0.2"
          />
          
          {/* Area under Line 2 */}
          <path
            d={`${createPath(points2)} L ${points2[points2.length - 1].x},${height - padding} L ${points2[0].x},${height - padding} Z`}
            fill="url(#areaGradient2)"
            opacity="0.2"
          />
          
          {/* Line 1 */}
          <path
            d={createPath(points1)}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Line 2 */}
          <path
            d={createPath(points2)}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {points1.map((point, index) => (
            <g key={`point1-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill="#D4AF37"
                stroke="white"
                strokeWidth="0.5"
                className="hover:r-2 transition-all cursor-pointer"
              />
            </g>
          ))}
          
          {points2.map((point, index) => (
            <g key={`point2-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="1.5"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="0.5"
                className="hover:r-2 transition-all cursor-pointer"
              />
            </g>
          ))}
          
          <defs>
            <linearGradient id="areaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="areaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Labels */}
        <div className="flex justify-between mt-3">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-500 font-medium">{item.label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
