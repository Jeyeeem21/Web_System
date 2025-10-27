import { X, Upload, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PatientModal({ isOpen, onClose, onSubmit, patient = null }) {
  const isEdit = !!patient
  const [photoPreview, setPhotoPreview] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Set initial photo preview if editing
      if (patient?.patient_photo) {
        setPhotoPreview(patient.patient_photo)
      } else {
        setPhotoPreview(null)
      }
      
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
  }, [isOpen, patient])

  if (!isOpen) return null

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    // Include the photo file if uploaded
    const photoFile = formData.get('patient_photo')
    if (photoFile && photoFile.size > 0) {
      // Keep the file in formData for backend upload
      formData.set('patient_photo', photoFile)
    } else {
      formData.delete('patient_photo')
    }
    
    const data = Object.fromEntries(formData)
    
    // Calculate age from birthdate
    const birthdate = new Date(data.birthdate)
    const today = new Date()
    let age = today.getFullYear() - birthdate.getFullYear()
    const monthDiff = today.getMonth() - birthdate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--
    }
    data.age = age

    // If there's a photo preview but no new file, keep existing URL
    if (photoPreview && !photoFile) {
      data.patient_photo = photoPreview
    }

    onSubmit(data)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isEdit ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
            title="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-8 py-6 space-y-8">
            
            {/* PROFILE PHOTO */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Patient Photo
              </h3>
              
              <div className="flex flex-col items-center gap-4">
                {/* Photo Preview */}
                <div className="relative">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Patient preview" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37]"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex items-center gap-3">
                  <label 
                    htmlFor="patient_photo" 
                    className="px-4 py-2 bg-[#D4AF37] text-white text-sm font-medium rounded-lg hover:bg-[#C4A030] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    id="patient_photo"
                    name="patient_photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 font-medium transition-all"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">Recommended: Square image, at least 400x400px</p>
              </div>
            </div>

            {/* Personal Information Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Full Name */}
                <div className="lg:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    defaultValue={patient?.name || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Nickname */}
                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                    Nickname
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    maxLength={50}
                    defaultValue={patient?.nickname || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="Nickname"
                  />
                </div>

                {/* Sex */}
                <div>
                  <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">
                    Sex <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    required
                    defaultValue={patient?.sex || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Birthdate */}
                <div>
                  <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-2">
                    Birthdate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    required
                    defaultValue={patient?.birthdate || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                  />
                </div>

                {/* Religion */}
                <div>
                  <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-2">
                    Religion <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="religion"
                    name="religion"
                    required
                    maxLength={50}
                    defaultValue={patient?.religion || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="Religion"
                  />
                </div>

                {/* Nationality */}
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    required
                    maxLength={50}
                    defaultValue={patient?.nationality || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="Nationality"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    maxLength={100}
                    defaultValue={patient?.occupation || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="Occupation"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Home Address */}
                <div className="md:col-span-2">
                  <label htmlFor="home_address" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="home_address"
                    name="home_address"
                    required
                    maxLength={255}
                    defaultValue={patient?.home_address || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="Complete home address"
                  />
                </div>

                {/* Home Number */}
                <div>
                  <label htmlFor="home_no" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Number
                  </label>
                  <input
                    type="tel"
                    id="home_no"
                    name="home_no"
                    maxLength={20}
                    defaultValue={patient?.home_no || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile_no"
                    name="mobile_no"
                    required
                    maxLength={20}
                    defaultValue={patient?.mobile_no || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Office Number */}
                <div>
                  <label htmlFor="office_no" className="block text-sm font-medium text-gray-700 mb-2">
                    Office Number
                  </label>
                  <input
                    type="tel"
                    id="office_no"
                    name="office_no"
                    maxLength={20}
                    defaultValue={patient?.office_no || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Fax Number */}
                <div>
                  <label htmlFor="fax_no" className="block text-sm font-medium text-gray-700 mb-2">
                    Fax Number
                  </label>
                  <input
                    type="tel"
                    id="fax_no"
                    name="fax_no"
                    maxLength={20}
                    defaultValue={patient?.fax_no || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email_address"
                    name="email_address"
                    required
                    maxLength={100}
                    defaultValue={patient?.email_address || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="patient@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Dental Insurance */}
                <div>
                  <label htmlFor="dental_insurance" className="block text-sm font-medium text-gray-700 mb-2">
                    Dental Insurance
                  </label>
                  <input
                    type="text"
                    id="dental_insurance"
                    name="dental_insurance"
                    maxLength={100}
                    defaultValue={patient?.dental_insurance || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="Insurance provider"
                  />
                </div>

                {/* Effective Date */}
                <div>
                  <label htmlFor="effective_date" className="block text-sm font-medium text-gray-700 mb-2">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    id="effective_date"
                    name="effective_date"
                    defaultValue={patient?.effective_date || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-white px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#D4AF37] text-white font-medium rounded-lg hover:bg-[#C4A030] transition-all shadow-sm hover:shadow-md"
            >
              {isEdit ? 'Save Changes' : 'Add Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
