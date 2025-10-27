import { X, Package, Clock, DollarSign, Tag, CheckCircle, XCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function ServiceViewModal({ isOpen, onClose, service }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
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
  }, [isOpen])

  if (!isOpen || !service) return null

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
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-[#D4AF37] to-[#C4A030]">
          <h2 className="text-2xl font-semibold text-white">
            Service Details
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
            
            {/* Service Image */}
            {service.service_image && (
              <div className="flex justify-center">
                <img 
                  src={service.service_image} 
                  alt={service.name}
                  className="w-48 h-48 rounded-xl object-cover border-4 border-[#D4AF37] shadow-lg"
                />
              </div>
            )}

            {/* Service Name */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
              {service.specialization && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  <Tag className="w-4 h-4" />
                  {service.specialization}
                </span>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 text-green-700 mb-1">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Price</span>
                </div>
                <p className="text-2xl font-bold text-green-900">₱{parseFloat(service.price).toFixed(2)}</p>
              </div>

              {/* Duration */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 mb-1">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">{service.duration} min</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
              {service.is_active ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-700">Active Service</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600" />
                  <span className="text-lg font-semibold text-red-700">Inactive Service</span>
                </>
              )}
            </div>

            {/* Description */}
            {service.description && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Description</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Created:</span>
                  <p className="font-medium text-gray-900">
                    {service.created_at || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Last Updated:</span>
                  <p className="font-medium text-gray-900">
                    {service.updated_at || 'N/A'}
                  </p>
                </div>
              </div>
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
