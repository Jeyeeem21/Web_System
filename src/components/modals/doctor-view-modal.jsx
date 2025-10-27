import { X, User, Mail, Phone, Calendar, Briefcase, UserCheck, Tag, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react'
import { useEffect } from 'react'

export default function DoctorViewModal({ isOpen, onClose, doctor }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Add blur to sidebar, footer, and doctors content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const doctorsContent = document.getElementById('doctors-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (doctorsContent) doctorsContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      // Remove blur from sidebar, footer, and doctors content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const doctorsContent = document.getElementById('doctors-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (doctorsContent) doctorsContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      // Cleanup: Remove blur
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const doctorsContent = document.getElementById('doctors-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (doctorsContent) doctorsContent.style.filter = 'none'
    }
  }, [isOpen])

  if (!isOpen || !doctor) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Generate initials from doctor name
  const getInitials = (name) => {
    const parts = name.replace('Dr. ', '').split(' ')
    return parts.map(part => part[0]).join('').toUpperCase()
  }

  // Status badge styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'from-green-50 to-green-100 border-green-200 text-green-700'
      case 'Busy':
        return 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700'
      case 'On Leave':
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
            Doctor Details
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
            
            {/* Doctor Photo & Basic Info */}
            <div className="flex flex-col items-center">
              {doctor.profile_image ? (
                <img 
                  src={doctor.profile_image} 
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37] shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center border-4 border-[#D4AF37] shadow-lg">
                  <span className="text-4xl font-bold text-[#D4AF37]">
                    {getInitials(doctor.name)}
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mt-4">{doctor.name}</h3>
              
              <div className="flex items-center gap-3 mt-3">
                {doctor.specialization && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                    <Briefcase className="w-4 h-4" />
                    {doctor.specialization}
                  </span>
                )}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-br border ${getStatusColor(doctor.status)}`}>
                  <CheckCircle className="w-4 h-4" />
                  {doctor.status}
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
                  <p className="text-sm font-semibold text-blue-900 break-all">{doctor.email}</p>
                </div>

                {/* Phone */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="text-sm font-semibold text-green-900">{doctor.phone}</p>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Professional Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* License Number */}
                {doctor.license_number && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 text-purple-700 mb-1">
                      <Tag className="w-5 h-5" />
                      <span className="text-sm font-medium">License Number</span>
                    </div>
                    <p className="text-sm font-semibold text-purple-900">{doctor.license_number}</p>
                  </div>
                )}

                {/* Years of Experience */}
                {doctor.years_of_experience && (
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center gap-2 text-orange-700 mb-1">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <p className="text-sm font-semibold text-orange-900">{doctor.years_of_experience} years</p>
                  </div>
                )}

                {/* Hire Date */}
                {doctor.hire_date && (
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center gap-2 text-indigo-700 mb-1">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-medium">Hire Date</span>
                    </div>
                    <p className="text-sm font-semibold text-indigo-900">{doctor.hire_date}</p>
                  </div>
                )}

                {/* Address */}
                {doctor.address && (
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
                    <div className="flex items-center gap-2 text-pink-700 mb-1">
                      <MapPin className="w-5 h-5" />
                      <span className="text-sm font-medium">Address</span>
                    </div>
                    <p className="text-sm font-semibold text-pink-900">{doctor.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Assistant */}
            {doctor.assistant && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Assistant</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-gray-600" />
                    <p className="text-gray-900 font-medium">{doctor.assistant}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Consultation Fee */}
            {doctor.consultation_fee && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Consultation Fee</h4>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <p className="text-3xl font-bold text-green-900">₱{parseFloat(doctor.consultation_fee).toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* Bio/Description */}
            {doctor.bio && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Biography</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
                </div>
              </div>
            )}

            {/* Status Toggle */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
              {doctor.is_active ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-700">Active Doctor</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600" />
                  <span className="text-lg font-semibold text-red-700">Inactive Doctor</span>
                </>
              )}
            </div>

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
