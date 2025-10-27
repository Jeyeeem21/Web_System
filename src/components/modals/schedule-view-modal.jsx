import { X, Calendar, Clock, User, FileText, CheckCircle, XCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function ScheduleViewModal({ isOpen, onClose, schedule }) {
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

  if (!isOpen || !schedule) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Format time to 12-hour format
  const formatTime = (time) => {
    if (!time) return 'N/A'
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Get day color
  const getDayColor = (day) => {
    const colors = {
      'Monday': 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
      'Tuesday': 'from-green-50 to-green-100 border-green-200 text-green-700',
      'Wednesday': 'from-purple-50 to-purple-100 border-purple-200 text-purple-700',
      'Thursday': 'from-orange-50 to-orange-100 border-orange-200 text-orange-700',
      'Friday': 'from-pink-50 to-pink-100 border-pink-200 text-pink-700',
      'Saturday': 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700',
      'Sunday': 'from-red-50 to-red-100 border-red-200 text-red-700'
    }
    return colors[day] || 'from-gray-50 to-gray-100 border-gray-200 text-gray-700'
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
            Schedule Details
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
            
            {/* Doctor Name */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {schedule.doctor_name || 'Doctor Name'}
              </h3>
              {schedule.specialization && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  <User className="w-4 h-4" />
                  {schedule.specialization}
                </span>
              )}
            </div>

            {/* Day and Availability */}
            <div className="grid grid-cols-2 gap-4">
              {/* Day of Week */}
              <div className={`bg-gradient-to-br rounded-lg p-4 border ${getDayColor(schedule.day_of_week)}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Day</span>
                </div>
                <p className="text-2xl font-bold">{schedule.day_of_week}</p>
              </div>

              {/* Availability Status */}
              <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                {schedule.is_available ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <span className="text-lg font-semibold text-green-700">Available</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-red-600" />
                    <span className="text-lg font-semibold text-red-700">Unavailable</span>
                  </>
                )}
              </div>
            </div>

            {/* Time Range */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Schedule Time</h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Start Time */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200">
                  <div className="flex items-center gap-2 text-teal-700 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium">Start Time</span>
                  </div>
                  <p className="text-2xl font-bold text-teal-900">{formatTime(schedule.start_time)}</p>
                </div>

                {/* End Time */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-700 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium">End Time</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-900">{formatTime(schedule.end_time)}</p>
                </div>
              </div>
            </div>

            {/* Duration */}
            {schedule.start_time && schedule.end_time && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 mb-1">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Total Duration</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">
                  {(() => {
                    const [startHours, startMinutes] = schedule.start_time.split(':').map(Number)
                    const [endHours, endMinutes] = schedule.end_time.split(':').map(Number)
                    const startTotalMinutes = startHours * 60 + startMinutes
                    const endTotalMinutes = endHours * 60 + endMinutes
                    const durationMinutes = endTotalMinutes - startTotalMinutes
                    const hours = Math.floor(durationMinutes / 60)
                    const minutes = durationMinutes % 60
                    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
                  })()}
                </p>
              </div>
            )}

            {/* Remarks */}
            {schedule.remarks && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Remarks
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{schedule.remarks}</p>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Created:</span>
                  <p className="font-medium text-gray-900">
                    {schedule.created_at || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Last Updated:</span>
                  <p className="font-medium text-gray-900">
                    {schedule.updated_at || 'N/A'}
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
