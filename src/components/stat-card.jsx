export function StatCard({ title, value, change, icon: Icon, gradient }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-md`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}
