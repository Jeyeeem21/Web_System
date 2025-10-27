import { useState } from 'react'
import { Search, Plus, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { DoctorCard } from '../components/doctor-card'
import DoctorModal from '../components/modals/doctor-modal'
import DoctorViewModal from '../components/modals/doctor-view-modal'
import { showSuccessAlert, showDeleteConfirmation, showDeletedAlert } from '../lib/sweetalert'

// Mock data for staff (assistants)
const staffData = [
  { id: 1, name: 'Jennifer Martinez', role: 'Receptionist' },
  { id: 2, name: 'David Thompson', role: 'Dental Hygienist' },
  { id: 3, name: 'Maria Garcia', role: 'Dental Assistant' },
  { id: 4, name: 'Kevin Brown', role: 'Office Manager' },
  { id: 5, name: 'Amanda Wilson', role: 'Dental Hygienist' },
  { id: 6, name: 'Christopher Lee', role: 'Lab Technician' }
]

// Mock data for specializations
const specializationsData = [
  { id: 1, name: 'General Dentistry' },
  { id: 2, name: 'Orthodontics' },
  { id: 3, name: 'Periodontics' },
  { id: 4, name: 'Endodontics' },
  { id: 5, name: 'Prosthodontics' },
  { id: 6, name: 'Oral Surgery' },
  { id: 7, name: 'Pediatric Dentistry' },
  { id: 8, name: 'Cosmetic Dentistry' },
  { id: 9, name: 'Oral Pathology' }
]

// Mock data for doctors
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'General Dentistry',
    assistant: 'Maria Garcia',
    status: 'Available',
    email: 'sarah.johnson@mcdcn3.com',
    phone: '+1 (555) 123-4567',
    experience: '12 years experience',
    activePatients: 142
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Orthodontics',
    assistant: 'David Thompson',
    status: 'Busy',
    email: 'michael.chen@mcdcn3.com',
    phone: '+1 (555) 234-5678',
    experience: '8 years experience',
    activePatients: 98
  },
  {
    id: 3,
    name: 'Dr. James Lee',
    specialization: 'Oral Surgery',
    assistant: 'Jennifer Martinez',
    status: 'Available',
    email: 'james.lee@mcdcn3.com',
    phone: '+1 (555) 345-6789',
    experience: '15 years experience',
    activePatients: 76
  },
  {
    id: 4,
    name: 'Dr. Emily Wilson',
    specialization: 'Pediatric Dentistry',
    assistant: 'Maria Garcia',
    status: 'Available',
    email: 'emily.wilson@mcdcn3.com',
    phone: '+1 (555) 456-7890',
    experience: '10 years experience',
    activePatients: 134
  },
  {
    id: 5,
    name: 'Dr. Robert Martinez',
    specialization: 'Endodontics',
    assistant: 'David Thompson',
    status: 'Busy',
    email: 'robert.martinez@mcdcn3.com',
    phone: '+1 (555) 567-8901',
    experience: '14 years experience',
    activePatients: 89
  },
  {
    id: 6,
    name: 'Dr. Lisa Anderson',
    specialization: 'Periodontics',
    assistant: 'Jennifer Martinez',
    status: 'Available',
    email: 'lisa.anderson@mcdcn3.com',
    phone: '+1 (555) 678-9012',
    experience: '11 years experience',
    activePatients: 103
  },
  {
    id: 7,
    name: 'Dr. David Brown',
    specialization: 'Prosthodontics',
    assistant: null,
    status: 'On Leave',
    email: 'david.brown@mcdcn3.com',
    phone: '+1 (555) 789-0123',
    experience: '16 years experience',
    activePatients: 67
  },
  {
    id: 8,
    name: 'Dr. Jennifer Taylor',
    specialization: 'Cosmetic Dentistry',
    assistant: 'Maria Garcia',
    status: 'Available',
    email: 'jennifer.taylor@mcdcn3.com',
    phone: '+1 (555) 890-1234',
    experience: '9 years experience',
    activePatients: 156
  },
  {
    id: 9,
    name: 'Dr. Christopher White',
    specialization: 'Oral Pathology',
    assistant: 'David Thompson',
    status: 'Available',
    email: 'christopher.white@mcdcn3.com',
    phone: '+1 (555) 901-2345',
    experience: '13 years experience',
    activePatients: 78
  }
]

export function Doctors() {
  const [doctors, setDoctors] = useState(doctorsData)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name') // 'name', 'patients', 'experience'
  const [pageSize, setPageSize] = useState(6)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDoctor(null)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedDoctor(null)
  }

  const handleAddDoctor = () => {
    setSelectedDoctor(null)
    setIsModalOpen(true)
  }

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor)
    setIsViewModalOpen(true)
  }

  const handleDeleteDoctor = async (doctor) => {
    const confirmed = await showDeleteConfirmation('Doctor', doctor.name)
    if (confirmed) {
      setDoctors(doctors.filter(d => d.id !== doctor.id))
      showDeletedAlert('Doctor', doctor.name)
      console.log('Deleted doctor:', doctor)
    }
  }

  const handleSubmitDoctor = (formData) => {
    console.log('Doctor form data:', formData)
    
    if (selectedDoctor) {
      // Edit existing doctor
      setDoctors(doctors.map(d => 
        d.id === selectedDoctor.id 
          ? { ...d, ...formData }
          : d
      ))
      handleCloseModal()
      showSuccessAlert('updated', 'Doctor', formData.name || selectedDoctor.name)
    } else {
      // Add new doctor
      const newDoctor = {
        id: Math.max(...doctors.map(d => d.id)) + 1,
        ...formData,
        activePatients: 0,
        experience: '0 years experience',
        status: formData.is_active ? 'Available' : 'On Leave'
      }
      setDoctors([...doctors, newDoctor])
      handleCloseModal()
      showSuccessAlert('added', 'Doctor', formData.name)
    }
  }

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'patients') {
      return b.activePatients - a.activePatients
    } else if (sortBy === 'experience') {
      const getYears = (exp) => parseInt(exp.match(/\d+/)[0])
      return getYears(b.experience) - getYears(a.experience)
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedDoctors.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentDoctors = sortedDoctors.slice(startIndex, endIndex)

  return (
    <>
    <div id="doctors-content" className="space-y-4 animate-fade-in w-full">
      {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctors</h1>
        <p className="text-gray-600 mt-1 text-sm">Manage doctors and their profiles</p>
      </div>

      {/* Search, Sort, and Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctors..."
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-white shadow-sm"
            />
          </div>
          
          <div className="relative w-full sm:w-auto">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-white shadow-sm appearance-none cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="patients">Sort by Patients</option>
              <option value="experience">Sort by Experience</option>
            </select>
          </div>
        </div>
        
        <Button size="default" onClick={handleAddDoctor}>
          <Plus className="h-4 w-4" />
          <span>Add Doctor</span>
        </Button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        {currentDoctors.map((doctor, index) => (
          <div 
            key={doctor.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${300 + (index * 50)}ms` }}
          >
            <DoctorCard 
              doctor={doctor} 
              onView={handleViewDoctor}
              onEdit={handleEditDoctor}
              onDelete={handleDeleteDoctor}
            />
          </div>
        ))}

        {/* Empty State */}
        {currentDoctors.length === 0 && (
          <div className="col-span-full bg-white rounded-xl shadow-lg border-2 border-gray-100 p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900">No doctors found</p>
            <p className="text-sm text-gray-600 mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedDoctors.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 px-4 py-3 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            {/* Results Info */}
            <div className="text-xs text-gray-700 text-center sm:text-left">
              Showing{' '}
              <span className="font-semibold">{startIndex + 1}</span>
              {' - '}
              <span className="font-semibold">
                {Math.min(endIndex, sortedDoctors.length)}
              </span>
              {' of '}
              <span className="font-semibold">{sortedDoctors.length}</span>
              {' doctors'}
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

    {/* Doctor Modal */}
    <DoctorModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmitDoctor}
      doctor={selectedDoctor}
      staffList={staffData}
      specializationList={specializationsData}
    />

    {/* Doctor View Modal */}
    <DoctorViewModal
      isOpen={isViewModalOpen}
      onClose={handleCloseViewModal}
      doctor={selectedDoctor}
    />
    </>
  )
}
