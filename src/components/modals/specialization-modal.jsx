import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function SpecializationModal({ isOpen, onClose, onSubmit, specialization = null }) {
  const isEdit = !!specialization

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Add blur to sidebar, footer, and settings content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const settingsContent = document.getElementById('settings-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (settingsContent) settingsContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      // Remove blur from sidebar, footer, and settings content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const settingsContent = document.getElementById('settings-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (settingsContent) settingsContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      // Cleanup: Remove blur
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const settingsContent = document.getElementById('settings-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (settingsContent) settingsContent.style.filter = 'none'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isEdit ? 'Edit Specialization' : 'Add New Specialization'}
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
            {/* Specialization Name */}
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                Specialization Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                required
                maxLength={100}
                defaultValue={specialization?.name || ''}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900"
                placeholder="e.g., Orthodontics, Periodontics, etc."
              />
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
                defaultValue={specialization?.description || ''}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 resize-none"
                placeholder="Describe this medical specialization..."
              />
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
              {isEdit ? 'Save Changes' : 'Add Specialization'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
