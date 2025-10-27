import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './appointments-calendar.css'

const localizer = momentLocalizer(moment)

export default function AppointmentsCalendar({ appointments, onSelectDate, selectedDate }) {
  // Transform appointments data for calendar
  const events = appointments.map(appointment => {
    const startDate = new Date(appointment.date_of_schedule)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour duration
    
    return {
      id: appointment.id,
      title: `${appointment.patientName} - ${appointment.service}`,
      start: startDate,
      end: endDate,
      resource: appointment,
      status: appointment.status
    }
  })

  // Custom event style getter
  const eventStyleGetter = (event) => {
    let backgroundColor = '#D4AF37' // Gold default
    
    switch (event.status) {
      case 'Confirmed':
      case 'Approved':
        backgroundColor = '#10b981' // Green
        break
      case 'Pending':
        backgroundColor = '#f59e0b' // Orange
        break
      case 'Cancelled':
        backgroundColor = '#ef4444' // Red
        break
      case 'Completed':
        backgroundColor = '#3b82f6' // Blue
        break
      default:
        backgroundColor = '#D4AF37' // Gold
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        fontSize: '12px',
        fontWeight: '600',
        padding: '2px 5px'
      }
    }
  }

  // Handle date selection
  const handleSelectSlot = ({ start }) => {
    const formattedDate = moment(start).format('YYYY-MM-DD')
    onSelectDate(formattedDate)
  }

  // Handle event click
  const handleSelectEvent = (event) => {
    const formattedDate = moment(event.start).format('YYYY-MM-DD')
    onSelectDate(formattedDate)
  }

  // Custom day prop getter to highlight selected date
  const dayPropGetter = (date) => {
    const isToday = moment(date).isSame(moment(), 'day')
    const isSelected = selectedDate && moment(date).format('YYYY-MM-DD') === selectedDate
    
    if (isSelected && !isToday) {
      // Selected date that is not today - show with gold border and light background
      return {
        className: 'rbc-selected-date',
        style: {
          backgroundColor: '#FEF3C7',
          border: '2px solid #D4AF37'
        }
      }
    }
    
    return {}
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 overflow-hidden">
      <div className="p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          popup
          showMultiDayTimes
          step={30}
          timeslots={2}
          tooltipAccessor={(event) => `${event.title} - ${event.status}`}
        />
      </div>
      
      {/* Legend */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="font-semibold text-gray-700">Status:</span>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-green-500"></div>
            <span className="text-gray-600">Confirmed/Approved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
            <span className="text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-500"></div>
            <span className="text-gray-600">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  )
}
