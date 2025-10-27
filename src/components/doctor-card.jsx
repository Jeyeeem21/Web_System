import { Mail, Phone, Calendar, Users, UserCheck, Eye, Edit, Trash2 } from 'lucide-react'

export function DoctorCard({ doctor, onView, onEdit, onDelete }) {
  // Generate initials from doctor name
  const getInitials = (name) => {
    const parts = name.replace('Dr. ', '').split(' ')
    return parts.map(part => part[0]).join('').toUpperCase()
  }

  // Status badge styling
  const statusStyles = {
    Available: 'bg-green-100 text-green-700',
    Busy: 'bg-yellow-100 text-yellow-700',
    'On Leave': 'bg-red-100 text-red-700'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-6 flex flex-col items-center h-[480px] w-full relative group">
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {onView && (
          <button
            onClick={() => onView(doctor)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white transition-all"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(doctor)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-[#D4AF37] text-gray-600 hover:text-white transition-all"
            title="Edit Doctor"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(doctor)}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition-all"
            title="Delete Doctor"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Avatar with Initials */}
      <div className="relative mb-4">
        <div 
          className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold border-4 border-[#D4AF37]"
        >
          {getInitials(doctor.name)}
        </div>
      </div>

      {/* Doctor Info */}
      <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
        {doctor.name}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{doctor.specialization}</p>

      {/* Status Badge */}
      <span className={`px-3 py-1 rounded-full text-xs font-medium mb-4 ${statusStyles[doctor.status]}`}>
        {doctor.status}
      </span>

      {/* Contact Info */}
      <div className="w-full space-y-2 mb-4 flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Mail className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
          <span className="truncate">{doctor.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Phone className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
          <span className="truncate">{doctor.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
          <span className="truncate">{doctor.experience}</span>
        </div>
        {doctor.assistant && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <UserCheck className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
            <span className="truncate">{doctor.assistant}</span>
          </div>
        )}
      </div>

      {/* Active Patients */}
      <div className="w-full border-t border-gray-200 pt-4 mt-auto">
        <div className="flex items-center justify-center gap-2 text-gray-900">
          <Users className="h-5 w-5 text-[#D4AF37]" />
          <span className="font-bold text-lg">{doctor.activePatients}</span>
          <span className="text-sm text-gray-600">Active Patients</span>
        </div>
      </div>
    </div>
  )
}
