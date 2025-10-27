import { X, User, Calendar, Clock, Briefcase, FileText } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AppointmentModal({ isOpen, onClose, onSubmit, appointment, patientList, doctorList, serviceList }) {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    service_id: '',
    date_of_schedule: '',
    time: '',
    status: 'Pending'
  })

  useEffect(() => {
    if (appointment) {
      // Edit mode: populate form with appointment data
      // Split datetime into date and time
      const datetime = appointment.date_of_schedule || ''
      const [date, time] = datetime.includes('T') 
        ? datetime.split('T') 
        : datetime.includes(' ')
        ? datetime.split(' ')
        : ['', '']
      
      setFormData({
        patient_id: appointment.patient_id || '',
        doctor_id: appointment.doctor_id || '',
        service_id: appointment.service_id || '',
        date_of_schedule: date || '',
        time: time ? time.substring(0, 5) : '', // Extract HH:MM
        status: appointment.status || 'Pending'
      })
    } else {
      // Add mode: reset form
      setFormData({
        patient_id: '',
        doctor_id: '',
        service_id: '',
        date_of_schedule: '',
        time: '',
        status: 'Pending'
      })
    }
  }, [appointment, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Add blur to sidebar, footer, and appointments content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const appointmentsContent = document.getElementById('appointments-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (appointmentsContent) appointmentsContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      // Remove blur from sidebar, footer, and appointments content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const appointmentsContent = document.getElementById('appointments-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (appointmentsContent) appointmentsContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      // Cleanup: Remove blur
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const appointmentsContent = document.getElementById('appointments-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (appointmentsContent) appointmentsContent.style.filter = 'none'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Combine date and time
    const datetime = `${formData.date_of_schedule} ${formData.time}:00`
    
    const submitData = {
      ...formData,
      date_of_schedule: datetime
    }
    
    onSubmit(submitData)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 ">
          <h2 className="text-xl font-semibold text-gray-900">
            {appointment ? 'Reschedule Appointment' : 'New Appointment'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
            title="Close"
          >
            <X className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-6 py-4 space-y-4">
            
            {/* Patient Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <User className="inline w-4 h-4 mr-1" />
                Patient <span className="text-red-500">*</span>
              </label>
              <select
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
              >
                <option value="">Select Patient</option>
                {patientList?.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

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

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <Briefcase className="inline w-4 h-4 mr-1" />
                Service <span className="text-red-500">*</span>
              </label>
              <select
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
              >
                <option value="">Select Service</option>
                {serviceList?.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date_of_schedule"
                  value={formData.date_of_schedule}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Status (only show in edit mode) */}
            {appointment && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            )}

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
              {appointment ? 'Update Appointment' : 'Create Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
