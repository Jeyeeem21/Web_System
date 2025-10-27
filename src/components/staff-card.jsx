import { Mail, Phone, Eye, Edit, Trash2 } from 'lucide-react'

export function StaffCard({ staff, onView, onEdit, onDelete }) {
  // Generate initials from staff name
  const getInitials = (name) => {
    const parts = name.split(' ')
    return parts.map(part => part[0]).join('').toUpperCase()
  }

  // Status badge styling
  const statusStyles = {
    Active: 'bg-green-100 text-green-700',
    'On Leave': 'bg-yellow-100 text-yellow-700',
    Inactive: 'bg-red-100 text-red-700'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-6 relative group">
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onView && (
          <button
            onClick={() => onView(staff)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white transition-all"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(staff)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-[#D4AF37] text-gray-600 hover:text-white transition-all"
            title="Edit Staff"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(staff)}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition-all"
            title="Delete Staff"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex items-start gap-4">
        {/* Avatar with Initials */}
        <div className="flex-shrink-0">
          <div 
            className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-xl font-bold border-4 border-[#D4AF37]"
          >
            {getInitials(staff.name)}
          </div>
        </div>

        {/* Staff Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {staff.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{staff.role}</p>

          {/* Status Badge */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${statusStyles[staff.status]}`}>
            {staff.status}
          </span>

          {/* Contact Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
              <span>{staff.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Mail className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
              <span className="truncate">{staff.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
