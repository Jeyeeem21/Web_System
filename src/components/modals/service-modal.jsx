import { X, Upload, Package } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ServiceModal({ isOpen, onClose, onSubmit, service = null, specializationList = [] }) {
  const isEdit = !!service
  const [photoPreview, setPhotoPreview] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Set initial photo preview if editing
      if (service?.service_image) {
        setPhotoPreview(service.service_image)
      } else {
        setPhotoPreview(null)
      }
      
      // Add blur to sidebar, footer, and services content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const servicesContent = document.getElementById('services-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (servicesContent) servicesContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      // Remove blur from sidebar, footer, and services content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const servicesContent = document.getElementById('services-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (servicesContent) servicesContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      // Cleanup: Remove blur
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const servicesContent = document.getElementById('services-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (servicesContent) servicesContent.style.filter = 'none'
    }
  }, [isOpen, service])

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
    const photoFile = formData.get('service_photo')
    if (photoFile && photoFile.size > 0) {
      formData.set('service_photo', photoFile)
    } else {
      formData.delete('service_photo')
    }
    
    const data = Object.fromEntries(formData)
    
    // Convert is_active checkbox to boolean
    data.is_active = formData.get('is_active') === 'on'
    
    // If there's a photo preview but no new file, keep existing URL
    if (photoPreview && !photoFile) {
      data.service_image = photoPreview
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
            {isEdit ? 'Edit Service' : 'Add New Service'}
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
            
            {/* SERVICE IMAGE */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Image</h3>
              
              <div className="flex flex-col items-center gap-4">
                {/* Photo Preview */}
                <div className="relative">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Service preview" 
                      className="w-32 h-32 rounded-lg object-cover border-4 border-[#D4AF37]"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex items-center gap-3">
                  <label 
                    htmlFor="service_photo" 
                    className="px-4 py-2 bg-[#D4AF37] text-white text-sm font-medium rounded-lg hover:bg-[#C4A030] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="service_photo"
                    name="service_photo"
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
                <p className="text-xs text-gray-500">Recommended: 400x400px image</p>
              </div>
            </div>

            {/* BASIC INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Service Name */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    defaultValue={service?.name || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="e.g., Teeth Cleaning, Root Canal, etc."
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label htmlFor="specialization_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <select
                    id="specialization_id"
                    name="specialization_id"
                    defaultValue={service?.specialization_id || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 bg-white"
                  >
                    <option value="">General Service</option>
                    {specializationList.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="duration_minutes" className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="duration_minutes"
                    name="duration_minutes"
                    required
                    min="5"
                    step="5"
                    defaultValue={service?.duration_minutes || 30}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                    placeholder="30"
                  />
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      defaultValue={service?.price || ''}
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center pt-8">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    defaultChecked={service?.is_active ?? true}
                    className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37] focus:ring-2"
                  />
                  <label htmlFor="is_active" className="ml-3 text-sm font-medium text-gray-700">
                    Service is Active
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={service?.description || ''}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 resize-none"
                  placeholder="Describe this service..."
                />
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
              {isEdit ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
