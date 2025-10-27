import { Sparkles, Scissors, Smile, Calendar, DollarSign, Eye, Edit, Trash2 } from 'lucide-react'

// Icon mapping for services
const iconMap = {
  'Dental Cleaning': Sparkles,
  'Tooth Extraction': Scissors,
  'Teeth Whitening': Smile,
  'Root Canal': Calendar,
  'Dental Implants': DollarSign,
  'Orthodontics': Smile,
  'Periodontal': Sparkles,
  'Cosmetic': Smile
}

export function ServiceCard({ service, onView, onEdit, onDelete }) {
  const IconComponent = iconMap[service.name] || Sparkles

  return (
    <div className="group bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-6 flex flex-col h-full min-h-[420px] relative">
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => onView(service)}
          className="p-2 rounded-lg bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white transition-all"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => onEdit(service)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-[#D4AF37] text-gray-600 hover:text-white transition-all"
          title="Edit Service"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(service)}
          className="p-2 rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition-all"
          title="Delete Service"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {/* Icon */}
      <div className="mb-4 flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
          <IconComponent className="h-8 w-8 text-[#D4AF37]" strokeWidth={2} />
        </div>
      </div>

      {/* Service Info */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 flex-shrink-0 min-h-[56px]">
        {service.name}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
        {service.description}
      </p>

      {/* Price & Duration */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 flex-shrink-0">
        <div>
          <p className="text-xs text-gray-500 mb-1">Starting from</p>
          <p className="text-2xl font-bold text-[#D4AF37]">${service.price}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Duration</p>
          <p className="text-base font-semibold text-gray-900">{service.duration}</p>
        </div>
      </div>
    </div>
  )
}
