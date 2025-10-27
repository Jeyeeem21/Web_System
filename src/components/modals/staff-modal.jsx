import { X, Upload, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function StaffModal({ isOpen, onClose, onSubmit, staff = null }) {
  const isEdit = !!staff
  const [photoPreview, setPhotoPreview] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Set initial photo preview if editing
      if (staff?.profile_image) {
        setPhotoPreview(staff.profile_image)
      } else {
        setPhotoPreview(null)
      }
      
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
  }, [isOpen, staff])

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
            {isEdit ? 'Edit Staff Member' : 'Add New Staff Member'}
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
                      alt="Staff preview" 
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
                    defaultValue={staff?.name || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="John Doe"
                  />
                </div>

                {/* Position */}
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    defaultValue={staff?.position || 'Assistant'}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 bg-white"
                  >
                    <option value="Assistant">Assistant</option>
                  </select>
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
                    defaultValue={staff?.email || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="staff@email.com"
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
                    defaultValue={staff?.phone || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  maxLength={255}
                  defaultValue={staff?.address || ''}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                  placeholder="123 Main Street, City, State"
                />
              </div>
            </div>

            {/* EMPLOYMENT INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Employment Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hire Date */}
                <div>
                  <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700 mb-2">
                    Hire Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="hire_date"
                    name="hire_date"
                    required
                    defaultValue={staff?.hire_date || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                  />
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    defaultValue={staff?.status || 'Active'}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
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
              {isEdit ? 'Save Changes' : 'Add Staff Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
