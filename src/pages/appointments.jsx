import { useState, useMemo, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import { 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Clock,
  Calendar,
  X
} from 'lucide-react'
import moment from 'moment'
import { Button } from '../components/ui/button'
import AppointmentModal from '../components/modals/appointment-modal'
import PaymentModal from '../components/modals/payment-modal'
import AppointmentsCalendar from '../components/appointments-calendar'
import '../components/appointments-calendar.css'
import { showSuccessAlert, showDeleteConfirmation, showDeletedAlert } from '../lib/sweetalert'

// Mock data for appointments
const appointmentsData = [
  {
    id: 1,
    patient_id: 1,
    patientName: 'John Smith',
    doctor_id: 1,
    doctor: 'Dr. Sarah Johnson',
    service_id: 1,
    service: 'Dental Cleaning',
    date_of_schedule: '2025-01-15 10:00:00',
    date: '2025-01-15',
    time: '10:00 AM',
    status: 'Confirmed'
  },
  {
    id: 2,
    patient_id: 2,
    patientName: 'Emma Wilson',
    doctor_id: 2,
    doctor: 'Dr. Michael Chen',
    service_id: 2,
    service: 'Root Canal',
    date_of_schedule: '2025-01-15 11:30:00',
    date: '2025-01-15',
    time: '11:30 AM',
    status: 'Pending'
  },
  {
    id: 3,
    patient_id: 3,
    patientName: 'Robert Brown',
    doctor_id: 1,
    doctor: 'Dr. Sarah Johnson',
    service_id: 3,
    service: 'Teeth Whitening',
    date_of_schedule: '2025-01-16 14:00:00',
    date: '2025-01-16',
    time: '2:00 PM',
    status: 'Confirmed'
  },
  {
    id: 4,
    patient_id: 4,
    patientName: 'Maria Garcia',
    doctor_id: 3,
    doctor: 'Dr. Emily Rodriguez',
    service_id: 4,
    service: 'Dental Checkup',
    date_of_schedule: '2025-01-16 09:00:00',
    date: '2025-01-16',
    time: '9:00 AM',
    status: 'Confirmed'
  },
  {
    id: 5,
    patient_id: 5,
    patientName: 'James Miller',
    doctor_id: 2,
    doctor: 'Dr. Michael Chen',
    service_id: 5,
    service: 'Cavity Filling',
    date_of_schedule: '2025-01-17 15:30:00',
    date: '2025-01-17',
    time: '3:30 PM',
    status: 'Pending'
  },
  {
    id: 6,
    patient_id: 6,
    patientName: 'Lisa Anderson',
    doctor_id: 1,
    doctor: 'Dr. Sarah Johnson',
    service_id: 6,
    service: 'Teeth Extraction',
    date_of_schedule: '2025-01-18 11:00:00',
    date: '2025-01-18',
    time: '11:00 AM',
    status: 'Confirmed'
  },
  {
    id: 7,
    patient_id: 7,
    patientName: 'David Thompson',
    doctor_id: 3,
    doctor: 'Dr. Emily Rodriguez',
    service_id: 1,
    service: 'Dental Cleaning',
    date_of_schedule: '2025-01-19 13:00:00',
    date: '2025-01-19',
    time: '1:00 PM',
    status: 'Cancelled'
  },
  {
    id: 8,
    patient_id: 8,
    patientName: 'Sarah Martinez',
    doctor_id: 2,
    doctor: 'Dr. Michael Chen',
    service_id: 7,
    service: 'Orthodontics',
    date_of_schedule: '2025-01-20 10:30:00',
    date: '2025-01-20',
    time: '10:30 AM',
    status: 'Pending'
  },
  {
    id: 9,
    patient_id: 9,
    patientName: 'Michael Davis',
    doctor_id: 1,
    doctor: 'Dr. Sarah Johnson',
    service_id: 2,
    service: 'Root Canal',
    date_of_schedule: '2025-01-22 14:30:00',
    date: '2025-01-22',
    time: '2:30 PM',
    status: 'Confirmed'
  },
  {
    id: 10,
    patient_id: 10,
    patientName: 'Jennifer Lee',
    doctor_id: 3,
    doctor: 'Dr. Emily Rodriguez',
    service_id: 4,
    service: 'Dental Checkup',
    date_of_schedule: '2025-01-23 09:30:00',
    date: '2025-01-23',
    time: '9:30 AM',
    status: 'Confirmed'
  }
]

// Mock data for dropdowns
const patientsData = [
  { patient_id: 1, name: 'John Smith' },
  { patient_id: 2, name: 'Emma Wilson' },
  { patient_id: 3, name: 'Robert Brown' },
  { patient_id: 4, name: 'Maria Garcia' },
  { patient_id: 5, name: 'James Miller' },
  { patient_id: 6, name: 'Lisa Anderson' },
  { patient_id: 7, name: 'David Thompson' },
  { patient_id: 8, name: 'Sarah Martinez' },
  { patient_id: 9, name: 'Michael Davis' },
  { patient_id: 10, name: 'Jennifer Lee' }
]

const doctorsData = [
  { doctor_id: 1, name: 'Dr. Sarah Johnson' },
  { doctor_id: 2, name: 'Dr. Michael Chen' },
  { doctor_id: 3, name: 'Dr. Emily Rodriguez' }
]

const servicesData = [
  { service_id: 1, serviceName: 'Dental Cleaning' },
  { service_id: 2, serviceName: 'Root Canal' },
  { service_id: 3, serviceName: 'Teeth Whitening' },
  { service_id: 4, serviceName: 'Dental Checkup' },
  { service_id: 5, serviceName: 'Cavity Filling' },
  { service_id: 6, serviceName: 'Teeth Extraction' },
  { service_id: 7, serviceName: 'Orthodontics' }
]

export function Appointments() {
  const [data, setData] = useState(appointmentsData)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  
  // Modal states
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handlers
  const handleAddAppointment = () => {
    setSelectedAppointment(null)
    setIsAppointmentModalOpen(true)
  }

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment)
    setIsAppointmentModalOpen(true)
  }

  const handleApprove = (appointment) => {
    setSelectedAppointment(appointment)
    setIsPaymentModalOpen(true)
  }

  const handleCancel = async (appointment) => {
    const confirmed = await showDeleteConfirmation(
      'Appointment',
      `${appointment.patientName}'s appointment on ${appointment.date}`
    )

    if (confirmed) {
      // Update appointment status to Cancelled
      setData(prevData =>
        prevData.map(item =>
          item.id === appointment.id
            ? { ...item, status: 'Cancelled' }
            : item
        )
      )
      await showDeletedAlert('Appointment', `${appointment.patientName}'s appointment`)
    }
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  const handleClearFilter = () => {
    setSelectedDate(null)
  }

  // Filter data based on selected date
  const filteredData = useMemo(() => {
    if (!selectedDate) return data
    return data.filter(apt => apt.date === selectedDate)
  }, [data, selectedDate])

  const handleAppointmentSubmit = (formData) => {
    if (selectedAppointment) {
      // Update existing appointment
      setData(prevData =>
        prevData.map(item =>
          item.id === selectedAppointment.id
            ? {
                ...item,
                ...formData,
                patientName: patientsData.find(p => p.patient_id === parseInt(formData.patient_id))?.name || item.patientName,
                doctor: doctorsData.find(d => d.doctor_id === parseInt(formData.doctor_id))?.name || item.doctor,
                service: servicesData.find(s => s.service_id === parseInt(formData.service_id))?.serviceName || item.service
              }
            : item
        )
      )
      setIsAppointmentModalOpen(false)
      showSuccessAlert(
        'updated',
        'Appointment',
        `${patientsData.find(p => p.patient_id === parseInt(formData.patient_id))?.name}'s appointment`
      )
    } else {
      // Add new appointment
      const newAppointment = {
        id: data.length + 1,
        ...formData,
        patientName: patientsData.find(p => p.patient_id === parseInt(formData.patient_id))?.name || 'Unknown',
        doctor: doctorsData.find(d => d.doctor_id === parseInt(formData.doctor_id))?.name || 'Unknown',
        service: servicesData.find(s => s.service_id === parseInt(formData.service_id))?.serviceName || 'Unknown',
        date: formData.date_of_schedule.split(' ')[0],
        time: formData.date_of_schedule.split(' ')[1],
        status: 'Pending'
      }
      setData(prevData => [...prevData, newAppointment])
      setIsAppointmentModalOpen(false)
      showSuccessAlert('added', 'Appointment', newAppointment.patientName)
    }
  }

  const handlePaymentSubmit = (paymentData) => {
    // Update appointment status to Approved
    setData(prevData =>
      prevData.map(item =>
        item.id === selectedAppointment.id
          ? { ...item, status: 'Approved' }
          : item
      )
    )
    setIsPaymentModalOpen(false)
    showSuccessAlert(
      'updated',
      'Appointment',
      `${selectedAppointment.patientName}'s appointment has been approved`
    )
  }

  const handleCloseAppointmentModal = () => {
    setIsAppointmentModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false)
    setSelectedAppointment(null)
  }

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'patientName',
        header: 'Patient Name',
        cell: (info) => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      },
      {
        accessorKey: 'doctor',
        header: 'Doctor',
        cell: (info) => (
          <div className="text-gray-700">{info.getValue()}</div>
        ),
      },
      {
        accessorKey: 'service',
        header: 'Service',
        cell: (info) => (
          <div className="text-blue-600 font-medium">{info.getValue()}</div>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => (
          <div className="text-gray-700">{info.getValue()}</div>
        ),
      },
      {
        accessorKey: 'time',
        header: 'Time',
        cell: (info) => (
          <div className="text-gray-700">{info.getValue()}</div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue()
          return (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                status === 'Confirmed'
                  ? 'bg-green-100 text-green-700'
                  : status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {status === 'Confirmed' && <CheckCircle className="h-3 w-3" />}
              {status === 'Pending' && <Clock className="h-3 w-3" />}
              {status === 'Cancelled' && <X className="h-3 w-3" />}
              {status}
            </span>
          )
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const appointment = row.original
          return (
            <div className="flex items-center gap-0.5">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleApprove(appointment)}
                disabled={appointment.status === 'Approved' || appointment.status === 'Cancelled'}
                className="text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-1.5 min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Approve"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span className="hidden xl:inline ml-1">Approve</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleReschedule(appointment)}
                disabled={appointment.status === 'Cancelled'}
                className="px-1.5 min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Reschedule"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span className="hidden xl:inline ml-1">Reschedule</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCancel(appointment)}
                disabled={appointment.status === 'Cancelled'}
                className="text-red-600 border-red-300 hover:bg-red-50 px-1.5 min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Cancel"
              >
                <X className="h-3.5 w-3.5" />
                <span className="hidden xl:inline ml-1">Cancel</span>
              </Button>
            </div>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <>
      <div id="appointments-content" className="space-y-4 animate-fade-in w-full">
        {/* Header - Title Only */}
        <div className="animate-slide-down">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1 text-sm">Manage all clinic appointments</p>
        </div>

        {/* Calendar - Full Width */}
        <div className="rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-6 animate-slide-up overflow-hidden" style={{ animationDelay: '50ms' }}>
          <AppointmentsCalendar 
            appointments={data}
            onSelectDate={handleDateSelect}
            selectedDate={selectedDate}
          />
        </div>

        {/* Date Filter Info and Clear Button */}
        {selectedDate && (
          <div className="flex items-center justify-between bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black px-4 py-2 rounded-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                Showing appointments for {moment(selectedDate).format('MMMM DD, YYYY')}
              </span>
            </div>
            <button
              onClick={handleClearFilter}
              className="flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <X className="h-4 w-4" />
              Show All
            </button>
          </div>
        )}

        {/* Search and Add Button - Below Title */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search appointments..."
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-white shadow-sm"
            />
          </div>
          <Button size="default" onClick={handleAddAppointment}>
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </Button>
        </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-3 text-left text-xs font-semibold whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-2 ${
                            header.column.getCanSort() ? 'cursor-pointer select-none hover:text-[#D4AF37] transition-colors' : ''
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="text-gray-400">
                              {header.column.getIsSorted() === 'asc' ? (
                                <ArrowUp className="h-4 w-4 text-[#D4AF37]" />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <ArrowDown className="h-4 w-4 text-[#D4AF37]" />
                              ) : (
                                <ArrowUpDown className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-3 text-xs whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No appointments found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Tablet Card View */}
        <div className="hidden md:block lg:hidden space-y-4 p-4">
          {table.getRowModel().rows.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No appointments found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          ) : (
            table.getRowModel().rows.map((row, index) => {
              const rowData = row.original
              return (
                <div 
                  key={row.id}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 animate-fade-in"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  {/* Header with Patient & Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">{rowData.patientName}</h3>
                      <p className="text-sm text-gray-600">{rowData.doctor}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        rowData.status === 'Confirmed' || rowData.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : rowData.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : rowData.status === 'Completed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {rowData.status === 'Confirmed' && <CheckCircle className="h-3 w-3" />}
                      {rowData.status === 'Pending' && <Clock className="h-3 w-3" />}
                      {rowData.status === 'Cancelled' && <X className="h-3 w-3" />}
                      {rowData.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Service:</span>{' '}
                      <span className="text-blue-600 font-medium">{rowData.service}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date & Time:</span>{' '}
                      <span className="text-gray-900 font-medium">{rowData.date} at {rowData.time}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleApprove(rowData)}
                      disabled={rowData.status === 'Approved' || rowData.status === 'Cancelled'}
                      className="flex-1 text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs h-9 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReschedule(rowData)}
                      disabled={rowData.status === 'Cancelled'}
                      className="flex-1 text-xs h-9 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Reschedule
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancel(rowData)}
                      disabled={rowData.status === 'Cancelled'}
                      className="flex-1 text-red-600 border-red-300 hover:bg-red-50 text-xs h-9 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {table.getRowModel().rows.map((row, index) => {
            const rowData = row.original
            return (
              <div 
                key={row.id} 
                className="p-4 hover:bg-gray-50 transition-colors animate-fade-in"
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                {/* Patient & Status */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{rowData.patientName}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">{rowData.doctor}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      rowData.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : rowData.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {rowData.status === 'Confirmed' && <CheckCircle className="h-3 w-3" />}
                    {rowData.status === 'Pending' && <Clock className="h-3 w-3" />}
                    {rowData.status === 'Cancelled' && <X className="h-3 w-3" />}
                    {rowData.status}
                  </span>
                </div>

                {/* Service & Date/Time */}
                <div className="space-y-1.5 mb-3">
                  <p className="text-xs">
                    <span className="text-gray-500">Service:</span>{' '}
                    <span className="text-blue-600 font-medium">{rowData.service}</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="text-gray-500">Date & Time:</span>{' '}
                    {rowData.date} at {rowData.time}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleApprove(rowData)}
                    disabled={rowData.status === 'Approved' || rowData.status === 'Cancelled'}
                    className="flex-1 text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs h-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleReschedule(rowData)}
                    disabled={rowData.status === 'Cancelled'}
                    className="flex-1 text-xs h-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calendar className="h-3 w-3" />
                    Reschedule
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCancel(rowData)}
                    disabled={rowData.status === 'Cancelled'}
                    className="flex-1 text-red-600 border-red-300 hover:bg-red-50 text-xs h-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="h-3 w-3" />
                    Cancel
                  </Button>
                </div>
              </div>
            )
          })}

          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-base font-medium">No appointments found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-3 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-2">
            {/* Results Info */}
            <div className="text-xs text-gray-700 text-center sm:text-left">
              <span className="inline-block">
                Showing{' '}
                <span className="font-semibold">
                  {table.getFilteredRowModel().rows.length === 0 
                    ? 0 
                    : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                </span>
                {' - '}
                <span className="font-semibold">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>
                {' of '}
                <span className="font-semibold">
                  {table.getFilteredRowModel().rows.length}
                </span>
              </span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                title="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => table.setPageIndex(page - 1)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      table.getState().pagination.pageIndex + 1 === page
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#D4AF37]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
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
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-xs bg-white hover:border-[#D4AF37] transition-all"
              >
                {[5, 10, 20, 30, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Modals */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={handleCloseAppointmentModal}
        onSubmit={handleAppointmentSubmit}
        appointment={selectedAppointment}
        patientList={patientsData}
        doctorList={doctorsData}
        serviceList={servicesData}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        onSubmit={handlePaymentSubmit}
        appointment={selectedAppointment}
      />
    </>
  )
}
