import { X, User, Mail, Phone, Calendar, Briefcase, Tag, CheckCircle, XCircle, MapPin } from 'lucide-react'
import { useEffect } from 'react'

export default function StaffViewModal({ isOpen, onClose, staff }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Add blur to sidebar, footer, and staff content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const staffContent = document.getElementById('staff-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (staffContent) staffContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      // Remove blur from sidebar, footer, and staff content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const staffContent = document.getElementById('staff-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (staffContent) staffContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      // Cleanup: Remove blur
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const staffContent = document.getElementById('staff-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (staffContent) staffContent.style.filter = 'none'
    }
  }, [isOpen])

  if (!isOpen || !staff) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Generate initials from staff name
  const getInitials = (name) => {
    const parts = name.split(' ')
    return parts.map(part => part[0]).join('').toUpperCase()
  }

  // Status badge styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'from-green-50 to-green-100 border-green-200 text-green-700'
      case 'Inactive':
        return 'from-red-50 to-red-100 border-red-200 text-red-700'
      default:
        return 'from-gray-50 to-gray-100 border-gray-200 text-gray-700'
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-[#D4AF37] to-[#C4A030]">
          <h2 className="text-2xl font-semibold text-white">
            Staff Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
            title="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-8 py-6 space-y-6">
            
            {/* Staff Photo & Basic Info */}
            <div className="flex flex-col items-center">
              {staff.profile_image ? (
                <img 
                  src={staff.profile_image} 
                  alt={staff.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37] shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center border-4 border-[#D4AF37] shadow-lg">
                  <span className="text-4xl font-bold text-[#D4AF37]">
                    {getInitials(staff.name)}
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mt-4">{staff.name}</h3>
              
              <div className="flex items-center gap-3 mt-3">
                {staff.position && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                    <Briefcase className="w-4 h-4" />
                    {staff.position}
                  </span>
                )}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-br border ${getStatusColor(staff.status)}`}>
                  <CheckCircle className="w-4 h-4" />
                  {staff.status}
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700 mb-1">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-sm font-semibold text-blue-900 break-all">{staff.email}</p>
                </div>

                {/* Phone */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="text-sm font-semibold text-green-900">{staff.phone}</p>
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Employment Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hire Date */}
                {staff.hire_date && (
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center gap-2 text-indigo-700 mb-1">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-medium">Hire Date</span>
                    </div>
                    <p className="text-sm font-semibold text-indigo-900">{staff.hire_date}</p>
                  </div>
                )}

                {/* Employee ID */}
                {staff.employee_id && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 text-purple-700 mb-1">
                      <Tag className="w-5 h-5" />
                      <span className="text-sm font-medium">Employee ID</span>
                    </div>
                    <p className="text-sm font-semibold text-purple-900">{staff.employee_id}</p>
                  </div>
                )}

                {/* Address */}
                {staff.address && (
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200 md:col-span-2">
                    <div className="flex items-center gap-2 text-pink-700 mb-1">
                      <MapPin className="w-5 h-5" />
                      <span className="text-sm font-medium">Address</span>
                    </div>
                    <p className="text-sm font-semibold text-pink-900">{staff.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Notes/Description */}
            {staff.notes && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Notes</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{staff.notes}</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
