import { X, Upload, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DoctorModal({ isOpen, onClose, onSubmit, doctor = null, staffList = [], specializationList = [] }) {
  const isEdit = !!doctor
  const [photoPreview, setPhotoPreview] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Set initial photo preview if editing
      if (doctor?.profile_image) {
        setPhotoPreview(doctor.profile_image)
      } else {
        setPhotoPreview(null)
      }
      
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
  }, [isOpen, doctor])

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
    const photoFile = formData.get('profile_photo')
    if (photoFile && photoFile.size > 0) {
      // Keep the file in formData for backend upload
      formData.set('profile_photo', photoFile)
    } else {
      formData.delete('profile_photo')
    }
    
    const data = Object.fromEntries(formData)
    
    // Convert is_active checkbox to boolean
    data.is_active = formData.get('is_active') === 'on'
    
    // If there's a photo preview but no new file, keep existing URL
    if (photoPreview && !photoFile) {
      data.profile_image = photoPreview
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isEdit ? 'Edit Doctor' : 'Add New Doctor'}
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
          <div className="px-8 py-6 space-y-6">
            
            {/* PROFILE PHOTO */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Profile Photo</h3>
              
              <div className="flex flex-col items-center gap-4">
                {/* Photo Preview */}
                <div className="relative">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Doctor preview" 
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
                    htmlFor="profile_photo" 
                    className="px-4 py-2 bg-[#D4AF37] text-white text-sm font-medium rounded-lg hover:bg-[#C4A030] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    id="profile_photo"
                    name="profile_photo"
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

            {/* BASIC INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    defaultValue={doctor?.name || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="Dr. John Doe"
                  />
                </div>

                {/* License Number */}
                <div>
                  <label htmlFor="license_number" className="block text-sm font-medium text-gray-700 mb-2">
                    License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="license_number"
                    name="license_number"
                    required
                    maxLength={50}
                    defaultValue={doctor?.license_number || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="LIC-123456"
                  />
                </div>
              </div>
            </div>

            {/* CONTACT INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={120}
                    defaultValue={doctor?.email || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="doctor@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={20}
                    defaultValue={doctor?.phone || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* PROFESSIONAL INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Professional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Specialization */}
                <div>
                  <label htmlFor="specialization_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <select
                    id="specialization_id"
                    name="specialization_id"
                    defaultValue={doctor?.specialization_id || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 bg-white"
                  >
                    <option value="">Select Specialization</option>
                    {specializationList.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assistant (Staff) */}
                <div>
                  <label htmlFor="staff_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Assistant
                  </label>
                  <select
                    id="staff_id"
                    name="staff_id"
                    defaultValue={doctor?.staff_id || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 bg-white"
                  >
                    <option value="">No Assistant</option>
                    {staffList.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name} - {staff.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  defaultValue={doctor?.bio || ''}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 resize-none"
                  placeholder="Brief biography and qualifications..."
                />
              </div>
            </div>

            {/* STATUS */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
              
              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  defaultChecked={doctor?.is_active ?? true}
                  className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37] focus:ring-2"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Doctor is Active
                </label>
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
              {isEdit ? 'Save Changes' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
