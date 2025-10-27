import { useState } from 'react'
import { Search, Plus, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { StaffCard } from '../components/staff-card'
import StaffModal from '../components/modals/staff-modal'
import StaffViewModal from '../components/modals/staff-view-modal'
import { showSuccessAlert, showDeleteConfirmation, showDeletedAlert } from '../lib/sweetalert'

// Mock data for staff
const staffData = [
  {
    id: 1,
    name: 'Jennifer Martinez',
    role: 'Receptionist',
    status: 'Active',
    phone: '+1 (555) 111-2222',
    email: 'jennifer.m@mcdcn3.com'
  },
  {
    id: 2,
    name: 'David Thompson',
    role: 'Dental Hygienist',
    status: 'Active',
    phone: '+1 (555) 222-3333',
    email: 'david.t@mcdcn3.com'
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'Dental Assistant',
    status: 'Active',
    phone: '+1 (555) 333-4444',
    email: 'maria.g@mcdcn3.com'
  },
  {
    id: 4,
    name: 'Kevin Brown',
    role: 'Office Manager',
    status: 'Active',
    phone: '+1 (555) 444-5555',
    email: 'kevin.b@mcdcn3.com'
  },
  {
    id: 5,
    name: 'Amanda Wilson',
    role: 'Dental Hygienist',
    status: 'On Leave',
    phone: '+1 (555) 555-6666',
    email: 'amanda.w@mcdcn3.com'
  },
  {
    id: 6,
    name: 'Christopher Lee',
    role: 'Dental Assistant',
    status: 'Active',
    phone: '+1 (555) 666-7777',
    email: 'christopher.l@mcdcn3.com'
  },
  {
    id: 7,
    name: 'Sarah Anderson',
    role: 'Billing Specialist',
    status: 'Active',
    phone: '+1 (555) 777-8888',
    email: 'sarah.a@mcdcn3.com'
  },
  {
    id: 8,
    name: 'Michael Johnson',
    role: 'Dental Hygienist',
    status: 'Active',
    phone: '+1 (555) 888-9999',
    email: 'michael.j@mcdcn3.com'
  },
  {
    id: 9,
    name: 'Emily Davis',
    role: 'Receptionist',
    status: 'Active',
    phone: '+1 (555) 999-0000',
    email: 'emily.d@mcdcn3.com'
  },
  {
    id: 10,
    name: 'Robert Miller',
    role: 'IT Support',
    status: 'Active',
    phone: '+1 (555) 000-1111',
    email: 'robert.m@mcdcn3.com'
  },
  {
    id: 11,
    name: 'Lisa Taylor',
    role: 'Dental Assistant',
    status: 'Inactive',
    phone: '+1 (555) 111-2223',
    email: 'lisa.t@mcdcn3.com'
  },
  {
    id: 12,
    name: 'James Wilson',
    role: 'Lab Technician',
    status: 'Active',
    phone: '+1 (555) 222-3334',
    email: 'james.w@mcdcn3.com'
  }
]

export function Staff() {
  const [staff, setStaff] = useState(staffData)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name') // 'name', 'role', 'status'
  const [pageSize, setPageSize] = useState(6)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedStaff(null)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedStaff(null)
  }

  const handleAddStaff = () => {
    setSelectedStaff(null)
    setIsModalOpen(true)
  }

  const handleEditStaff = (member) => {
    setSelectedStaff(member)
    setIsModalOpen(true)
  }

  const handleViewStaff = (member) => {
    setSelectedStaff(member)
    setIsViewModalOpen(true)
  }

  const handleDeleteStaff = async (member) => {
    const confirmed = await showDeleteConfirmation('Staff', member.name)
    if (confirmed) {
      setStaff(staff.filter(s => s.id !== member.id))
      showDeletedAlert('Staff', member.name)
      console.log('Deleted staff:', member)
    }
  }

  const handleSubmitStaff = (formData) => {
    console.log('Staff form data:', formData)
    
    if (selectedStaff) {
      // Edit existing staff
      setStaff(staff.map(s => 
        s.id === selectedStaff.id 
          ? { ...s, ...formData, role: formData.position }
          : s
      ))
      handleCloseModal()
      showSuccessAlert('updated', 'Staff', formData.name || selectedStaff.name)
    } else {
      // Add new staff
      const newStaff = {
        id: Math.max(...staff.map(s => s.id)) + 1,
        ...formData,
        role: formData.position
      }
      setStaff([...staff, newStaff])
      handleCloseModal()
      showSuccessAlert('added', 'Staff', formData.name)
    }
  }

  // Filter staff based on search
  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort staff
  const sortedStaff = [...filteredStaff].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'role') {
      return a.role.localeCompare(b.role)
    } else if (sortBy === 'status') {
      // Active first, then On Leave, then Inactive
      const statusOrder = { 'Active': 1, 'On Leave': 2, 'Inactive': 3 }
      return statusOrder[a.status] - statusOrder[b.status]
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedStaff.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentStaff = sortedStaff.slice(startIndex, endIndex)

  return (
    <>
    <div id="staff-content" className="space-y-4 animate-fade-in w-full">
      {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Staff</h1>
        <p className="text-gray-600 mt-1 text-sm">Manage staff members and their information</p>
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
              placeholder="Search staff members..."
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
              <option value="role">Sort by Role</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
        
        <Button size="default" onClick={handleAddStaff}>
          <Plus className="h-4 w-4" />
          <span>Add Staff Member</span>
        </Button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
        {currentStaff.map((member, index) => (
          <div 
            key={member.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${300 + (index * 50)}ms` }}
          >
            <StaffCard 
              staff={member} 
              onView={handleViewStaff}
              onEdit={handleEditStaff}
              onDelete={handleDeleteStaff}
            />
          </div>
        ))}

        {/* Empty State */}
        {currentStaff.length === 0 && (
          <div className="col-span-full bg-white rounded-xl shadow-lg border-2 border-gray-100 p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900">No staff members found</p>
            <p className="text-sm text-gray-600 mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedStaff.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 px-4 py-3 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            {/* Results Info */}
            <div className="text-xs text-gray-700 text-center sm:text-left">
              Showing{' '}
              <span className="font-semibold">{startIndex + 1}</span>
              {' - '}
              <span className="font-semibold">
                {Math.min(endIndex, sortedStaff.length)}
              </span>
              {' of '}
              <span className="font-semibold">{sortedStaff.length}</span>
              {' staff members'}
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

    {/* Staff Modal */}
    <StaffModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmitStaff}
      staff={selectedStaff}
    />

    {/* Staff View Modal */}
    <StaffViewModal
      isOpen={isViewModalOpen}
      onClose={handleCloseViewModal}
      staff={selectedStaff}
    />
    </>
  )
}
