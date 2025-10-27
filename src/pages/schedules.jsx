import { useState } from 'react'
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, ArrowUpDown, Eye } from 'lucide-react'
import { Button } from '../components/ui/button'
import ScheduleModal from '../components/modals/schedule-modal'
import ScheduleViewModal from '../components/modals/schedule-view-modal'
import { showSuccessAlert, showDeleteConfirmation, showDeletedAlert } from '../lib/sweetalert'

// Mock data for doctors
const doctorsData = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'General Dentistry' },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Orthodontics' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Periodontics' },
  { id: 4, name: 'Dr. James Wilson', specialization: 'Endodontics' },
  { id: 5, name: 'Dr. Lisa Anderson', specialization: 'Prosthodontics' }
]

// Mock data for doctor schedules
const schedulesData = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Johnson',
    color: '#3B82F6',
    schedules: [
      { day: 'Monday', timeRange: '9:00 AM - 5:00 PM', status: 'Available' },
      { day: 'Tuesday', timeRange: '9:00 AM - 5:00 PM', status: 'Available' },
      { day: 'Wednesday', timeRange: '9:00 AM - 1:00 PM', status: 'Available' },
      { day: 'Thursday', timeRange: '9:00 AM - 5:00 PM', status: 'Available' },
      { day: 'Friday', timeRange: '9:00 AM - 3:00 PM', status: 'Available' }
    ]
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Chen',
    color: '#10B981',
    schedules: [
      { day: 'Monday', timeRange: '10:00 AM - 6:00 PM', status: 'Available' },
      { day: 'Tuesday', timeRange: '10:00 AM - 6:00 PM', status: 'Available' },
      { day: 'Wednesday', timeRange: '10:00 AM - 2:00 PM', status: 'Available' },
      { day: 'Thursday', timeRange: '10:00 AM - 6:00 PM', status: 'Available' },
      { day: 'Friday', timeRange: '10:00 AM - 4:00 PM', status: 'Available' }
    ]
  },
  {
    id: 3,
    doctorName: 'Dr. Emily Rodriguez',
    color: '#F59E0B',
    schedules: [
      { day: 'Monday', timeRange: '8:00 AM - 4:00 PM', status: 'Available' },
      { day: 'Tuesday', timeRange: '8:00 AM - 4:00 PM', status: 'Available' },
      { day: 'Wednesday', timeRange: '8:00 AM - 12:00 PM', status: 'Available' },
      { day: 'Thursday', timeRange: '8:00 AM - 4:00 PM', status: 'Available' },
      { day: 'Friday', timeRange: '8:00 AM - 2:00 PM', status: 'Available' }
    ]
  },
  {
    id: 4,
    doctorName: 'Dr. James Wilson',
    color: '#8B5CF6',
    schedules: [
      { day: 'Monday', timeRange: '9:00 AM - 5:00 PM', status: 'Available' },
      { day: 'Tuesday', timeRange: '9:00 AM - 5:00 PM', status: 'Available' },
      { day: 'Wednesday', timeRange: '9:00 AM - 1:00 PM', status: 'Available' },
      { day: 'Thursday', timeRange: '9:00 AM - 5:00 PM', status: 'Available' },
      { day: 'Friday', timeRange: '9:00 AM - 3:00 PM', status: 'Available' }
    ]
  },
  {
    id: 5,
    doctorName: 'Dr. Lisa Anderson',
    color: '#EC4899',
    schedules: [
      { day: 'Monday', timeRange: '11:00 AM - 7:00 PM', status: 'Available' },
      { day: 'Tuesday', timeRange: '11:00 AM - 7:00 PM', status: 'Available' },
      { day: 'Wednesday', timeRange: '11:00 AM - 3:00 PM', status: 'Available' },
      { day: 'Thursday', timeRange: '11:00 AM - 7:00 PM', status: 'Available' },
      { day: 'Friday', timeRange: '11:00 AM - 5:00 PM', status: 'Available' }
    ]
  }
]

export function Schedules() {
  const [schedules, setSchedules] = useState(schedulesData)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name') // 'name' or 'schedules'
  const [pageSize, setPageSize] = useState(3)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSchedule(null)
    setSelectedDoctor(null)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedSchedule(null)
  }

  const handleAddSchedule = (doctorId) => {
    setSelectedDoctor(doctorId)
    setSelectedSchedule(null)
    setIsModalOpen(true)
  }

  const handleViewSchedule = (doctor, scheduleDay) => {
    const doctor_info = doctorsData.find(d => d.name === doctor.doctorName)
    const schedule_info = doctor.schedules.find(s => s.day === scheduleDay.day)
    
    // Create a combined schedule object for viewing
    const fullSchedule = {
      doctor_id: doctor.id,
      doctor_name: doctor.doctorName,
      specialization: doctor_info?.specialization,
      day_of_week: scheduleDay.day,
      start_time: scheduleDay.timeRange.split(' - ')[0],
      end_time: scheduleDay.timeRange.split(' - ')[1],
      is_available: scheduleDay.status === 'Available',
      remarks: scheduleDay.remarks || ''
    }
    
    setSelectedSchedule(fullSchedule)
    setIsViewModalOpen(true)
  }

  const handleEditSchedule = (doctor, scheduleDay) => {
    // Convert display format to form format
    const timeRange = scheduleDay.timeRange.split(' - ')
    const startTime = convertTo24Hour(timeRange[0])
    const endTime = convertTo24Hour(timeRange[1])
    
    const scheduleToEdit = {
      doctor_id: doctor.id,
      day_of_week: scheduleDay.day,
      start_time: startTime,
      end_time: endTime,
      is_available: scheduleDay.status === 'Available',
      remarks: scheduleDay.remarks || ''
    }
    
    setSelectedDoctor(doctor.id)
    setSelectedSchedule(scheduleToEdit)
    setIsModalOpen(true)
  }

  const handleDeleteSchedule = async (doctor, scheduleDay) => {
    const confirmed = await showDeleteConfirmation('Schedule', `${doctor.doctorName}'s ${scheduleDay.day} schedule`)
    if (confirmed) {
      setSchedules(schedules.map(s => {
        if (s.id === doctor.id) {
          return {
            ...s,
            schedules: s.schedules.filter(d => d.day !== scheduleDay.day)
          }
        }
        return s
      }))
      showDeletedAlert('Schedule', `${doctor.doctorName}'s ${scheduleDay.day}`)
      console.log('Deleted schedule:', doctor.doctorName, scheduleDay.day)
    }
  }

  const handleSubmitSchedule = (formData) => {
    console.log('Schedule form data:', formData)
    
    const doctorName = doctorsData.find(d => d.id == formData.doctor_id)?.name
    const startTime12 = convertTo12Hour(formData.start_time)
    const endTime12 = convertTo12Hour(formData.end_time)
    
    const newScheduleEntry = {
      day: formData.day_of_week,
      timeRange: `${startTime12} - ${endTime12}`,
      status: formData.is_available ? 'Available' : 'Unavailable',
      remarks: formData.remarks
    }
    
    if (selectedSchedule) {
      // Edit existing schedule
      setSchedules(schedules.map(s => {
        if (s.id == formData.doctor_id) {
          return {
            ...s,
            schedules: s.schedules.map(d => 
              d.day === selectedSchedule.day_of_week 
                ? newScheduleEntry
                : d
            )
          }
        }
        return s
      }))
      handleCloseModal()
      showSuccessAlert('updated', 'Schedule', `${doctorName}'s ${formData.day_of_week}`)
    } else {
      // Add new schedule
      const doctorExists = schedules.find(s => s.id == formData.doctor_id)
      
      if (doctorExists) {
        // Add to existing doctor
        setSchedules(schedules.map(s => {
          if (s.id == formData.doctor_id) {
            return {
              ...s,
              schedules: [...s.schedules, newScheduleEntry]
            }
          }
          return s
        }))
      } else {
        // Create new doctor entry
        const newDoctorSchedule = {
          id: formData.doctor_id,
          doctorName: doctorName,
          color: getRandomColor(),
          schedules: [newScheduleEntry]
        }
        setSchedules([...schedules, newDoctorSchedule])
      }
      handleCloseModal()
      showSuccessAlert('added', 'Schedule', `${doctorName}'s ${formData.day_of_week}`)
    }
  }

  // Helper functions
  const convertTo24Hour = (time12) => {
    const [time, period] = time12.split(' ')
    let [hours, minutes] = time.split(':')
    hours = parseInt(hours)
    
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`
  }

  const convertTo12Hour = (time24) => {
    let [hours, minutes] = time24.split(':')
    hours = parseInt(hours)
    const period = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    return `${hours}:${minutes} ${period}`
  }

  const getRandomColor = () => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Filter schedules based on search
  const filteredSchedules = schedules.filter(schedule =>
    schedule.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort schedules
  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    if (sortBy === 'name') {
      return a.doctorName.localeCompare(b.doctorName)
    } else {
      // Sort by number of available schedules
      return b.schedules.length - a.schedules.length
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedSchedules.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentSchedules = sortedSchedules.slice(startIndex, endIndex)

  return (
    <>
      <div id="schedules-content" className="space-y-4 animate-fade-in w-full">
        {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctor Schedules</h1>
        <p className="text-gray-600 mt-1 text-sm">Manage doctor availability and schedules</p>
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
              placeholder="Search doctor..."
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
              <option value="schedules">Sort by Schedules</option>
            </select>
          </div>
        </div>
        
        <Button size="default" onClick={() => handleAddSchedule(null)}>
          <Plus className="h-4 w-4" />
          <span>Add Schedule</span>
        </Button>
      </div>

      {/* Schedules List */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
        {currentSchedules.map((schedule, index) => (
          <div
            key={schedule.id}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 overflow-hidden animate-fade-in"
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            {/* Doctor Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: schedule.color }}
                />
                <h3 className="text-base md:text-lg font-bold text-gray-900">{schedule.doctorName}</h3>
              </div>
              {/* <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Remove</span>
                </Button>
              </div> */}
            </div>

            {/* Schedule Days */}
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {schedule.schedules.map((daySchedule, idx) => (
                  <div
                    key={idx}
                    className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#D4AF37] hover:shadow-md transition-all duration-200 relative"
                  >
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => handleViewSchedule(schedule, daySchedule)}
                        className="p-1 bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white rounded transition-all"
                        title="View Details"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleEditSchedule(schedule, daySchedule)}
                        className="p-1 bg-gray-100 hover:bg-[#D4AF37] text-gray-600 hover:text-white rounded transition-all"
                        title="Edit Schedule"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(schedule, daySchedule)}
                        className="p-1 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded transition-all"
                        title="Delete Schedule"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 text-sm mb-2 text-center">
                      {daySchedule.day}
                    </h4>
                    <p className="text-xs text-gray-600 text-center mb-2">
                      {daySchedule.timeRange}
                    </p>
                    <span className="inline-flex items-center justify-center w-full px-2 py-1 rounded-full text-xs font-semibold bg-[#D4AF37] text-black">
                      {daySchedule.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {currentSchedules.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900">No schedules found</p>
            <p className="text-sm text-gray-600 mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedSchedules.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 px-4 py-3 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            {/* Results Info */}
            <div className="text-xs text-gray-700 text-center sm:text-left">
              Showing{' '}
              <span className="font-semibold">{startIndex + 1}</span>
              {' - '}
              <span className="font-semibold">
                {Math.min(endIndex, sortedSchedules.length)}
              </span>
              {' of '}
              <span className="font-semibold">{sortedSchedules.length}</span>
              {' schedules'}
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
                  setCurrentPage(1) // Reset to first page when changing page size
                }}
                className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-xs bg-white hover:border-[#D4AF37] transition-all"
              >
                {[3, 5, 10, 20].map((size) => (
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

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitSchedule}
        schedule={selectedSchedule}
        doctorList={doctorsData}
      />

      {/* Schedule View Modal */}
      <ScheduleViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        schedule={selectedSchedule}
      />
    </>
  )
}
