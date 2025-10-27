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
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash2,
  FileText,
  Phone,
  Mail,
  Calendar
} from 'lucide-react'
import { Button } from '../components/ui/button'
import PatientModal from '../components/modals/patient-modal.jsx'
import PatientViewModal from '../components/modals/patient-view-modal.jsx'
import MinorModal from '../components/modals/minor-modal.jsx'
import DentalHistoryModal from '../components/modals/dental-history-modal.jsx'
import MedicalHistoryModal from '../components/modals/medical-history-modal.jsx'
import DiseasesModal from '../components/modals/diseases-modal.jsx'
import FemaleModal from '../components/modals/female-modal.jsx'
import { showSuccessAlert, showDeleteConfirmation, showDeletedAlert } from '../lib/sweetalert'

// Mock data for patients
const patientsData = [
  {
    id: 1,
    name: 'John Smith',
    contact: '+1 (555) 123-4567',
    email: 'john.smith@email.com',
    lastVisit: '2025-01-10',
    appointments: 12,
    notes: 'Regular checkups, no allergies'
  },
  {
    id: 2,
    name: 'Emma Wilson',
    contact: '+1 (555) 234-5678',
    email: 'emma.wilson@email.com',
    lastVisit: '2025-01-08',
    appointments: 8,
    notes: 'Orthodontic treatment in progress'
  },
  {
    id: 3,
    name: 'Robert Brown',
    contact: '+1 (555) 345-6789',
    email: 'robert.brown@email.com',
    lastVisit: '2025-01-12',
    appointments: 15,
    notes: 'Sensitive teeth, prefers gentle cleaning'
  },
  {
    id: 4,
    name: 'Sarah Davis',
    contact: '+1 (555) 456-7890',
    email: 'sarah.davis@email.com',
    lastVisit: '2025-01-05',
    appointments: 6,
    notes: 'Dental implant follow-up required'
  },
  {
    id: 5,
    name: 'Michael Johnson',
    contact: '+1 (555) 567-8901',
    email: 'michael.johnson@email.com',
    lastVisit: '2025-01-15',
    appointments: 20,
    notes: 'Long-term patient, monthly cleanings'
  },
  {
    id: 6,
    name: 'Jennifer Lee',
    contact: '+1 (555) 678-9012',
    email: 'jennifer.lee@email.com',
    lastVisit: '2025-01-03',
    appointments: 4,
    notes: 'New patient, initial consultation completed'
  },
  {
    id: 7,
    name: 'David Martinez',
    contact: '+1 (555) 789-0123',
    email: 'david.martinez@email.com',
    lastVisit: '2025-01-14',
    appointments: 18,
    notes: 'Crown replacement scheduled'
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    contact: '+1 (555) 890-1234',
    email: 'lisa.anderson@email.com',
    lastVisit: '2025-01-11',
    appointments: 10,
    notes: 'Allergic to latex, use alternatives'
  },
  {
    id: 9,
    name: 'Christopher Taylor',
    contact: '+1 (555) 901-2345',
    email: 'christopher.taylor@email.com',
    lastVisit: '2025-01-09',
    appointments: 7,
    notes: 'Root canal treatment completed'
  },
  {
    id: 10,
    name: 'Amanda White',
    contact: '+1 (555) 012-3456',
    email: 'amanda.white@email.com',
    lastVisit: '2025-01-13',
    appointments: 14,
    notes: 'Periodontal maintenance patient'
  }
]

export function Patients() {
  const [data] = useState(patientsData)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isMinorModalOpen, setIsMinorModalOpen] = useState(false)
  const [isDentalHistoryModalOpen, setIsDentalHistoryModalOpen] = useState(false)
  const [isMedicalHistoryModalOpen, setIsMedicalHistoryModalOpen] = useState(false)
  const [isDiseasesModalOpen, setIsDiseasesModalOpen] = useState(false)
  const [isFemaleModalOpen, setIsFemaleModalOpen] = useState(false)
  const [currentPatientData, setCurrentPatientData] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              Name
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="h-3.5 w-3.5" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpDown className="h-3.5 w-3.5" />
              )}
            </button>
          )
        },
        cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue('name')}</div>,
      },
      {
        accessorKey: 'contact',
        header: 'Contact',
        cell: ({ row }) => <div className="text-gray-700">{row.getValue('contact')}</div>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="text-gray-700">{row.getValue('email')}</div>,
      },
      {
        accessorKey: 'lastVisit',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              Last Visit
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="h-3.5 w-3.5" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpDown className="h-3.5 w-3.5" />
              )}
            </button>
          )
        },
        cell: ({ row }) => <div className="text-gray-700">{row.getValue('lastVisit')}</div>,
      },
      {
        accessorKey: 'appointments',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              Appointments
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="h-3.5 w-3.5" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpDown className="h-3.5 w-3.5" />
              )}
            </button>
          )
        },
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold bg-[#D4AF37] text-black min-w-[2rem]">
              {row.getValue('appointments')}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        cell: ({ row }) => (
          <div className="text-gray-700 max-w-[200px] truncate">
            {row.getValue('notes')}
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-0.5">
            <button
              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors group"
              title="View"
              onClick={() => handleViewPatient(row.original)}
            >
              <Eye className="h-3.5 w-3.5 text-blue-600 group-hover:text-blue-700" />
            </button>
            <button
              className="p-1.5 hover:bg-yellow-50 rounded-lg transition-colors group"
              title="Edit"
              onClick={() => handleEditPatient(row.original)}
            >
              <Edit className="h-3.5 w-3.5 text-yellow-600 group-hover:text-yellow-700" />
            </button>
            <button
              className="p-1.5 hover:bg-green-50 rounded-lg transition-colors group"
              title="Record"
            >
              <FileText className="h-3.5 w-3.5 text-green-600 group-hover:text-green-700" />
            </button>
            <button
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
              title="Delete"
              onClick={() => handleDeletePatient(row.original)}
            >
              <Trash2 className="h-3.5 w-3.5 text-red-600 group-hover:text-red-700" />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
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

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPatient(null)
    setCurrentPatientData(null)
  }

  const handleCloseMinorModal = () => {
    setIsMinorModalOpen(false)
    setCurrentPatientData(null)
  }

  const handleCloseDentalHistoryModal = () => {
    setIsDentalHistoryModalOpen(false)
    setCurrentPatientData(null)
  }

  const handleCloseMedicalHistoryModal = () => {
    setIsMedicalHistoryModalOpen(false)
    setCurrentPatientData(null)
  }

  const handleCloseDiseasesModal = () => {
    setIsDiseasesModalOpen(false)
    setCurrentPatientData(null)
  }

  const handleCloseFemaleModal = () => {
    setIsFemaleModalOpen(false)
    setCurrentPatientData(null)
  }

  const handleSubmit = (formData) => {
    if (selectedPatient) {
      // Edit existing patient
      console.log('Editing patient:', formData)
      // TODO: Update patient in data array and backend API
      handleCloseModal()
    } else {
      // Add new patient
      console.log('Adding new patient:', formData)
      
      // Store patient data temporarily
      setCurrentPatientData(formData)
      
      // Check if patient is a minor (age < 18)
      const age = parseInt(formData.age)
      
      if (age < 18) {
        // Patient is a minor, show minor modal
        setIsModalOpen(false)
        setIsMinorModalOpen(true)
      } else {
        // Patient is not a minor, go directly to dental history
        setIsModalOpen(false)
        setIsDentalHistoryModalOpen(true)
      }
    }
  }

  const handleMinorSubmit = (minorData) => {
    console.log('Minor data:', minorData)
    
    // Store minor data with patient data
    setCurrentPatientData(prev => ({ ...prev, minorData }))
    
    // Close minor modal and open dental history modal
    setIsMinorModalOpen(false)
    setIsDentalHistoryModalOpen(true)
  }

  const handleDentalHistorySubmit = (dentalHistoryData) => {
    console.log('Dental history data:', dentalHistoryData)
    
    // Store dental history data
    setCurrentPatientData(prev => ({ ...prev, dentalHistoryData }))
    
    // Close dental history modal and open medical history modal
    setIsDentalHistoryModalOpen(false)
    setIsMedicalHistoryModalOpen(true)
  }

  const handleMedicalHistorySubmit = (medicalHistoryData) => {
    console.log('Medical history data:', medicalHistoryData)
    
    // Store medical history data
    setCurrentPatientData(prev => ({ ...prev, medicalHistoryData }))
    
    // Close medical history modal and open diseases modal
    setIsMedicalHistoryModalOpen(false)
    setIsDiseasesModalOpen(true)
  }

  const handleDiseasesSubmit = (diseasesData) => {
    console.log('Diseases data:', diseasesData)
    
    // Store diseases data
    setCurrentPatientData(prev => ({ ...prev, diseasesData }))
    
    // Check if patient is female
    if (currentPatientData.sex === 'Female') {
      // Show female modal
      setIsDiseasesModalOpen(false)
      setIsFemaleModalOpen(true)
    } else {
      // Complete the process
      completePatientRegistration({ ...currentPatientData, diseasesData })
    }
  }

  const handleFemaleSubmit = (femaleData) => {
    console.log('Female data:', femaleData)
    
    // Complete the process with female data
    completePatientRegistration({ ...currentPatientData, femaleData })
  }

  const completePatientRegistration = (allData) => {
    console.log('Complete patient registration data:', allData)
    
    // TODO: Save all data to backend API
    // TODO: Add complete patient to data array
    
    // Close all modals and reset
    setIsFemaleModalOpen(false)
    setIsDiseasesModalOpen(false)
    setCurrentPatientData(null)
    setSelectedPatient(null)
    
    // Show success alert
    showSuccessAlert('added', 'Patient', allData.name || 'New Patient')
  }

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient)
    setIsModalOpen(true)
  }

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient)
    setIsViewModalOpen(true)
  }

  const handleDeletePatient = async (patient) => {
    const confirmed = await showDeleteConfirmation('Patient', patient.name)
    if (confirmed) {
      setPatients(patients.filter(p => p.id !== patient.id))
      showDeletedAlert('Patient', patient.name)
      console.log('Deleted patient:', patient)
    }
  }

  return (
    <>
      <div id="patients-content" className="space-y-4 animate-fade-in w-full">
        {/* Header */}
        <div className="animate-slide-down">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-1 text-sm">Manage patient records and information</p>
        </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search patients..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-white shadow-sm"
          />
        </div>
        <Button 
          size="default"
          onClick={() => {
            setSelectedPatient(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className="h-4 w-4" />
          <span>Add Patient</span>
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
                      className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-3 py-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Search className="h-12 w-12 mb-2 text-gray-300" />
                      <p className="text-base font-medium">No patients found</p>
                      <p className="text-sm">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr 
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-3 text-xs">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Tablet Card View */}
        <div className="hidden md:block lg:hidden space-y-4 p-4">
          {table.getRowModel().rows.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8 text-center">
              <Search className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-base font-medium text-gray-900">No patients found</p>
              <p className="text-sm text-gray-600">Try adjusting your search</p>
            </div>
          ) : (
            table.getRowModel().rows.map((row) => (
              <div 
                key={row.id}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 relative group"
              >
                {/* Header with Avatar and Actions */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-black border-4 border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#D4AF37] font-bold text-sm">
                        {row.getValue('name')?.split(' ').map(n => n?.[0] || '').join('').toUpperCase() || ''}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {row.getValue('name')}
                      </h3>
                      <p className="text-sm text-gray-600">Patient ID: #{row.original.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleViewPatient(row.original)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditPatient(row.original)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePatient(row.original)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{row.getValue('contact')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{row.getValue('email')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Last Visit: </span>
                    <span className="text-gray-900">{row.getValue('lastVisit')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{row.getValue('notes')}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-gray-500">Appointments:</span>
                    <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-semibold rounded-full">
                      {row.getValue('appointments')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {table.getRowModel().rows.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8 text-center">
              <Search className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-base font-medium text-gray-900">No patients found</p>
              <p className="text-sm text-gray-600">Try adjusting your search</p>
            </div>
          ) : (
            table.getRowModel().rows.map((row) => (
              <div key={row.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 relative group">
                {/* Action Buttons - Mobile Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={() => handleViewPatient(row.original)}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white transition-all"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEditPatient(row.original)}
                    className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-500 text-yellow-600 hover:text-white transition-all"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePatient(row.original)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition-all"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-start gap-4">
                  {/* Avatar with Initials */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-lg font-bold border-4 border-[#D4AF37]">
                      {row.getValue('name')?.split(' ').map(n => n?.[0] || '').join('').toUpperCase() || ''}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {row.getValue('name')}
                    </h3>

                    {/* Visits Badge */}
                    <div className="mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#D4AF37] text-black">
                        {row.getValue('appointments')} Visits
                      </span>
                    </div>

                    {/* Info */}
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-gray-700">{row.getValue('contact')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-gray-700 truncate">{row.getValue('email')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-gray-700">Last visit: {row.getValue('lastVisit')}</span>
                      </div>
                      {row.getValue('notes') && (
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-xs">{row.getValue('notes')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
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

      {/* Patient Modal */}
      <PatientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        patient={selectedPatient}
      />

      {/* Minor Modal */}
      <MinorModal
        isOpen={isMinorModalOpen}
        onClose={handleCloseMinorModal}
        onSubmit={handleMinorSubmit}
        patientId={currentPatientData?.patient_id}
      />

      {/* Dental History Modal */}
      <DentalHistoryModal
        isOpen={isDentalHistoryModalOpen}
        onClose={handleCloseDentalHistoryModal}
        onSubmit={handleDentalHistorySubmit}
        patientId={currentPatientData?.patient_id}
      />

      {/* Medical History Modal */}
      <MedicalHistoryModal
        isOpen={isMedicalHistoryModalOpen}
        onClose={handleCloseMedicalHistoryModal}
        onSubmit={handleMedicalHistorySubmit}
        patientId={currentPatientData?.patient_id}
      />

      {/* Diseases Modal */}
      <DiseasesModal
        isOpen={isDiseasesModalOpen}
        onClose={handleCloseDiseasesModal}
        onSubmit={handleDiseasesSubmit}
        patientId={currentPatientData?.patient_id}
      />

      {/* Female Modal */}
      <FemaleModal
        isOpen={isFemaleModalOpen}
        onClose={handleCloseFemaleModal}
        onSubmit={handleFemaleSubmit}
        patientId={currentPatientData?.patient_id}
      />

      {/* Patient View Modal */}
      <PatientViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedPatient(null)
        }}
        patient={selectedPatient}
      />
    </>
  )
}
