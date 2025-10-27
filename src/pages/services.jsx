import { useState, useEffect } from 'react'
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { ServiceCard } from '../components/service-card'
import ServiceModal from '../components/modals/service-modal'
import ServiceViewModal from '../components/modals/service-view-modal'
import { showSuccessAlert, showDeleteConfirmation, showDeletedAlert } from '../lib/sweetalert'

// Mock data for specializations
const specializationsData = [
  { id: 1, name: 'General Dentistry' },
  { id: 2, name: 'Orthodontics' },
  { id: 3, name: 'Periodontics' },
  { id: 4, name: 'Endodontics' },
  { id: 5, name: 'Prosthodontics' },
  { id: 6, name: 'Oral Surgery' },
  { id: 7, name: 'Pediatric Dentistry' },
  { id: 8, name: 'Cosmetic Dentistry' }
]

// Mock data for services
const servicesData = [
  {
    id: 1,
    name: 'Dental Cleaning',
    description: 'Professional teeth cleaning and polishing to maintain optimal oral health and prevent cavities.',
    price: 120,
    duration: '45 min',
    duration_minutes: 45,
    specialization: 'General Dentistry',
    is_active: true
  },
  {
    id: 2,
    name: 'Tooth Extraction',
    description: 'Safe and painless tooth removal procedures performed by experienced oral surgeons.',
    price: 250,
    duration: '60 min',
    duration_minutes: 60,
    specialization: 'Oral Surgery',
    is_active: true
  },
  {
    id: 3,
    name: 'Teeth Whitening',
    description: 'Advanced whitening treatments to brighten your smile and boost your confidence.',
    price: 350,
    duration: '90 min',
    duration_minutes: 90,
    specialization: 'Cosmetic Dentistry',
    is_active: true
  },
  {
    id: 4,
    name: 'Root Canal',
    description: 'Expert root canal treatment to save infected teeth and eliminate pain effectively.',
    price: 800,
    duration: '120 min',
    duration_minutes: 120,
    specialization: 'Endodontics',
    is_active: true
  },
  {
    id: 5,
    name: 'Dental Implants',
    description: 'Permanent tooth replacement solution with natural-looking and durable dental implants.',
    price: 2500,
    duration: '180 min',
    duration_minutes: 180,
    specialization: 'Prosthodontics',
    is_active: true
  },
  {
    id: 6,
    name: 'Orthodontics',
    description: 'Comprehensive orthodontic services including braces and aligners for perfect teeth alignment.',
    price: 3500,
    duration: '60 min',
    duration_minutes: 60,
    specialization: 'Orthodontics',
    is_active: true
  },
  {
    id: 7,
    name: 'Periodontal Treatment',
    description: 'Specialized gum disease treatment and maintenance for healthy gums and teeth.',
    price: 450,
    duration: '75 min',
    duration_minutes: 75,
    specialization: 'Periodontics',
    is_active: true
  },
  {
    id: 8,
    name: 'Cosmetic Dentistry',
    description: 'Aesthetic dental procedures to enhance your smile including veneers and bonding.',
    price: 1200,
    duration: '90 min',
    duration_minutes: 90,
    specialization: 'Cosmetic Dentistry',
    is_active: true
  },
  {
    id: 9,
    name: 'Dental Crowns',
    description: 'Custom-made crowns to restore damaged teeth and improve functionality and appearance.',
    price: 900,
    duration: '90 min',
    duration_minutes: 90,
    specialization: 'Prosthodontics',
    is_active: true
  }
]

export function Services() {
  const [services, setServices] = useState(servicesData)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedService(null)
  }

  const handleAddService = () => {
    setSelectedService(null)
    setIsModalOpen(true)
  }

  const handleViewService = (service) => {
    setSelectedService(service)
    setIsViewModalOpen(true)
  }

  const handleEditService = (service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleDeleteService = async (service) => {
    const confirmed = await showDeleteConfirmation('Service', service.name)
    if (confirmed) {
      setServices(services.filter(s => s.id !== service.id))
      showDeletedAlert('Service', service.name)
      console.log('Deleted service:', service)
    }
  }

  const handleSubmitService = (formData) => {
    console.log('Service form data:', formData)
    
    if (selectedService) {
      // Edit existing service
      setServices(services.map(s => 
        s.id === selectedService.id 
          ? { 
              ...s, 
              ...formData, 
              duration: `${formData.duration_minutes} min`,
              price: parseFloat(formData.price)
            }
          : s
      ))
      handleCloseModal()
      showSuccessAlert('updated', 'Service', formData.name || selectedService.name)
    } else {
      // Add new service
      const newService = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...formData,
        duration: `${formData.duration_minutes} min`,
        price: parseFloat(formData.price)
      }
      setServices([...services, newService])
      handleCloseModal()
      showSuccessAlert('added', 'Service', formData.name)
    }
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filter services based on search
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentServices = filteredServices.slice(startIndex, endIndex)

  return (
    <>
      <div id="services-content" className="space-y-4 animate-fade-in w-full">
        {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600 mt-1 text-sm">Browse and manage dental services offered</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
            placeholder="Search services..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-white shadow-sm"
          />
        </div>
        <Button size="default" onClick={handleAddService}>
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </Button>
      </div>

      {/* Services Grid */}
      <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        {/* Desktop/Tablet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServices.map((service, index) => (
            <div 
              key={service.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${300 + (index * 50)}ms` }}
            >
              <ServiceCard 
                service={service}
                onView={handleViewService}
                onEdit={handleEditService}
                onDelete={handleDeleteService}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentServices.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900">No services found</p>
            <p className="text-sm text-gray-600 mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredServices.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 px-4 py-3 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            {/* Results Info */}
            <div className="text-xs text-gray-700 text-center sm:text-left">
              Showing{' '}
              <span className="font-semibold">{startIndex + 1}</span>
              {' - '}
              <span className="font-semibold">
                {Math.min(endIndex, filteredServices.length)}
              </span>
              {' of '}
              <span className="font-semibold">{filteredServices.length}</span>
              {' services'}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                title="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage === page
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#D4AF37]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                title="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-600 hidden sm:inline">Show:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-xs bg-white hover:border-[#D4AF37] transition-all"
              >
                {[6, 9, 12, 18].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Modals */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitService}
        service={selectedService}
        specializationList={specializationsData}
      />

      <ServiceViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        service={selectedService}
      />
    </>
  )
}
