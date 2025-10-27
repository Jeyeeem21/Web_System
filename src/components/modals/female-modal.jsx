import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function FemaleModal({ isOpen, onClose, onSubmit, patientId }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (patientsContent) patientsContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (patientsContent) patientsContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (patientsContent) patientsContent.style.filter = 'none'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      patient_id: patientId,
      pregnant: formData.get('pregnant') === 'on' ? 'Yes' : 'No',
      nursing: formData.get('nursing') === 'on' ? 'Yes' : 'No',
      taking_birth_control: formData.get('taking_birth_control') === 'on' ? 'Yes' : 'No'
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-slide-down">
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Female Patient Information</h2>
            <p className="text-sm text-gray-600 mt-1">Additional health information</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Close">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-8 py-6 space-y-4">
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
              <input 
                type="checkbox" 
                name="pregnant" 
                className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" 
              />
              <span className="text-gray-700 font-medium">Are you pregnant?</span>
            </label>

            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
              <input 
                type="checkbox" 
                name="nursing" 
                className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" 
              />
              <span className="text-gray-700 font-medium">Are you nursing?</span>
            </label>

            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
              <input 
                type="checkbox" 
                name="taking_birth_control" 
                className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" 
              />
              <span className="text-gray-700 font-medium">Are you taking birth control pills?</span>
            </label>
          </div>

          <div className="bg-white px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-all">Skip</button>
            <button type="submit" className="px-6 py-2.5 bg-[#D4AF37] text-white font-medium rounded-lg hover:bg-[#C4A030] transition-all shadow-sm hover:shadow-md">Save & Complete</button>
          </div>
        </form>
      </div>
    </div>
  )
}
