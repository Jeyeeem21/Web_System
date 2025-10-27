import { X, User, Mail, Phone, Calendar, MapPin, Users, Baby, Heart, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function PatientViewModal({ isOpen, onClose, patient }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Add blur to sidebar, footer, and patients content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (patientsContent) patientsContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      // Remove blur from sidebar, footer, and patients content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (patientsContent) patientsContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      // Cleanup: Remove blur
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (patientsContent) patientsContent.style.filter = 'none'
    }
  }, [isOpen])

  if (!isOpen || !patient) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Generate initials from patient name
  const getInitials = (name) => {
    const parts = name.split(' ')
    return parts.map(part => part[0]).join('').toUpperCase()
  }

  // Gender badge styling
  const getGenderColor = (gender) => {
    switch (gender) {
      case 'Male':
        return 'from-blue-50 to-blue-100 border-blue-200 text-blue-700'
      case 'Female':
        return 'from-pink-50 to-pink-100 border-pink-200 text-pink-700'
      default:
        return 'from-gray-50 to-gray-100 border-gray-200 text-gray-700'
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-[#D4AF37] to-[#C4A030]">
          <h2 className="text-2xl font-semibold text-white">
            Patient Details
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
            
            {/* Patient Photo & Basic Info */}
            <div className="flex flex-col items-center">
              {patient.patient_photo ? (
                <img 
                  src={patient.patient_photo} 
                  alt={patient.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37] shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center border-4 border-[#D4AF37] shadow-lg">
                  <span className="text-4xl font-bold text-[#D4AF37]">
                    {getInitials(patient.name)}
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mt-4">{patient.name}</h3>
              
              <div className="flex items-center gap-3 mt-3">
                {patient.gender && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-br border ${getGenderColor(patient.gender)}`}>
                    <Users className="w-4 h-4" />
                    {patient.gender}
                  </span>
                )}
                {patient.age && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                    <Calendar className="w-4 h-4" />
                    {patient.age} years old
                  </span>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                {patient.email && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                      <Mail className="w-5 h-5" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <p className="text-sm font-semibold text-blue-900 break-all">{patient.email}</p>
                  </div>
                )}

                {/* Phone */}
                {patient.phone && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 mb-1">
                      <Phone className="w-5 h-5" />
                      <span className="text-sm font-medium">Phone</span>
                    </div>
                    <p className="text-sm font-semibold text-green-900">{patient.phone}</p>
                  </div>
                )}

                {/* Address */}
                {patient.address && (
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200 md:col-span-2">
                    <div className="flex items-center gap-2 text-pink-700 mb-1">
                      <MapPin className="w-5 h-5" />
                      <span className="text-sm font-medium">Address</span>
                    </div>
                    <p className="text-sm font-semibold text-pink-900">{patient.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Personal Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date of Birth */}
                {patient.date_of_birth && (
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center gap-2 text-indigo-700 mb-1">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-medium">Date of Birth</span>
                    </div>
                    <p className="text-sm font-semibold text-indigo-900">{patient.date_of_birth}</p>
                  </div>
                )}

                {/* Civil Status */}
                {patient.civil_status && (
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center gap-2 text-orange-700 mb-1">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">Civil Status</span>
                    </div>
                    <p className="text-sm font-semibold text-orange-900">{patient.civil_status}</p>
                  </div>
                )}

                {/* Occupation */}
                {patient.occupation && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 text-purple-700 mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Occupation</span>
                    </div>
                    <p className="text-sm font-semibold text-purple-900">{patient.occupation}</p>
                  </div>
                )}

                {/* Nationality */}
                {patient.nationality && (
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200">
                    <div className="flex items-center gap-2 text-teal-700 mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Nationality</span>
                    </div>
                    <p className="text-sm font-semibold text-teal-900">{patient.nationality}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Guardian Information (for minors) */}
            {(patient.guardian_name || patient.guardian_contact) && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Baby className="w-4 h-4" />
                  Guardian Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patient.guardian_name && (
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center gap-2 text-yellow-700 mb-1">
                        <User className="w-5 h-5" />
                        <span className="text-sm font-medium">Guardian Name</span>
                      </div>
                      <p className="text-sm font-semibold text-yellow-900">{patient.guardian_name}</p>
                    </div>
                  )}
                  {patient.guardian_contact && (
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                      <div className="flex items-center gap-2 text-amber-700 mb-1">
                        <Phone className="w-5 h-5" />
                        <span className="text-sm font-medium">Guardian Contact</span>
                      </div>
                      <p className="text-sm font-semibold text-amber-900">{patient.guardian_contact}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Medical Information */}
            {(patient.blood_type || patient.allergies) && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Medical Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patient.blood_type && (
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center gap-2 text-red-700 mb-1">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">Blood Type</span>
                      </div>
                      <p className="text-sm font-semibold text-red-900">{patient.blood_type}</p>
                    </div>
                  )}
                  {patient.allergies && (
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center gap-2 text-orange-700 mb-1">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Allergies</span>
                      </div>
                      <p className="text-sm font-semibold text-orange-900">{patient.allergies}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            {patient.emergency_contact && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Emergency Contact</h4>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                  <p className="text-sm font-semibold text-red-900">{patient.emergency_contact}</p>
                </div>
              </div>
            )}

            {/* Notes */}
            {patient.notes && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Notes</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{patient.notes}</p>
                </div>
              </div>
            )}

            {/* Registration Date */}
            {patient.registration_date && (
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-500">
                  Registered on: <span className="font-medium text-gray-900">{patient.registration_date}</span>
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
