import { X, Calendar, Clock, User, FileText } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ScheduleModal({ isOpen, onClose, onSubmit, schedule, doctorList }) {
  const [formData, setFormData] = useState({
    doctor_id: '',
    day_of_week: '',
    start_time: '',
    end_time: '',
    is_available: true,
    remarks: ''
  })

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    if (schedule) {
      // Edit mode: populate form with schedule data
      setFormData({
        doctor_id: schedule.doctor_id || '',
        day_of_week: schedule.day_of_week || '',
        start_time: schedule.start_time || '',
        end_time: schedule.end_time || '',
        is_available: schedule.is_available !== undefined ? schedule.is_available : true,
        remarks: schedule.remarks || ''
      })
    } else {
      // Add mode: reset form
      setFormData({
        doctor_id: '',
        day_of_week: '',
        start_time: '',
        end_time: '',
        is_available: true,
        remarks: ''
      })
    }
  }, [schedule, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Add blur to sidebar, footer, and schedules content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const schedulesContent = document.getElementById('schedules-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (schedulesContent) schedulesContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      // Remove blur from sidebar, footer, and schedules content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const schedulesContent = document.getElementById('schedules-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (schedulesContent) schedulesContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      // Cleanup: Remove blur
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const schedulesContent = document.getElementById('schedules-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (schedulesContent) schedulesContent.style.filter = 'none'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate time range
    if (formData.start_time && formData.end_time) {
      if (formData.start_time >= formData.end_time) {
        alert('End time must be after start time')
        return
      }
    }
    
    onSubmit(formData)
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
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 ">
          <h2 className="text-xl font-semibold text-gray-900">
            {schedule ? 'Edit Schedule' : 'Add New Schedule'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
            title="Close"
          >
            <X className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-6 py-4 space-y-4">
            
            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <User className="inline w-4 h-4 mr-1" />
                Doctor <span className="text-red-500">*</span>
              </label>
              <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
              >
                <option value="">Select Doctor</option>
                {doctorList?.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Day of Week and Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Day of Week */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Day of Week <span className="text-red-500">*</span>
                </label>
                <select
                  name="day_of_week"
                  value={formData.day_of_week}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                >
                  <option value="">Select Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Toggle */}
              <div className="flex items-end">
                <label className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors w-full">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-0 transition-all"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Available for Appointments
                  </span>
                </label>
              </div>
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Clock className="inline w-4 h-4 mr-1" />
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <FileText className="inline w-4 h-4 mr-1" />
                Remarks
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows={3}
                maxLength={255}
                placeholder="Add any notes or special instructions..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.remarks.length}/255 characters
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#D4AF37] text-black font-medium rounded-lg hover:bg-[#C4A030] transition-all shadow-md hover:shadow-lg"
            >
              {schedule ? 'Update Schedule' : 'Add Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
