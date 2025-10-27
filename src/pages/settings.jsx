import { useState, useMemo } from 'react'
import { 
  Clock, 
  Settings, 
  Users, 
  Save, 
  Upload, 
  X, 
  Plus, 
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '../components/ui/button'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import SpecializationModal from '../components/modals/specialization-modal.jsx'

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('clinic') // 'clinic', 'specialization', 'admins'
  const [logoPreview, setLogoPreview] = useState(null)

  // Clinic Information State
  const [clinicInfo, setClinicInfo] = useState({
    name: 'MCDCN3 Dental Clinic',
    email: 'info@mcdcn3.com',
    phone: '+1 (555) 000-0000',
    openingTime: '09:00',
    closingTime: '17:00'
  })

  // Doctor Specializations State
  const [specializations, setSpecializations] = useState([
    { id: 1, name: 'General Dentistry', description: 'Comprehensive oral health care', doctors: 5 },
    { id: 2, name: 'Orthodontics', description: 'Teeth alignment and braces', doctors: 3 },
    { id: 3, name: 'Periodontics', description: 'Gum disease treatment', doctors: 2 },
    { id: 4, name: 'Endodontics', description: 'Root canal therapy', doctors: 2 },
    { id: 5, name: 'Prosthodontics', description: 'Dental prosthetics and implants', doctors: 2 },
    { id: 6, name: 'Oral Surgery', description: 'Surgical dental procedures', doctors: 3 },
    { id: 7, name: 'Pediatric Dentistry', description: 'Children\'s dental care', doctors: 4 },
    { id: 8, name: 'Cosmetic Dentistry', description: 'Aesthetic dental treatments', doctors: 3 }
  ])
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSpecialization, setSelectedSpecialization] = useState(null)

  // Admins State
  const [admins, setAdmins] = useState([
    { id: 1, name: 'John Admin', email: 'john@mcdcn3.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@mcdcn3.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Mike Support', email: 'mike@mcdcn3.com', role: 'Support', status: 'Inactive' }
  ])

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoPreview(null)
  }

  // Modal handlers for specializations
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSpecialization(null)
  }

  const handleAddSpecialization = () => {
    setSelectedSpecialization(null)
    setIsModalOpen(true)
  }

  const handleEditSpecialization = (spec) => {
    setSelectedSpecialization(spec)
    setIsModalOpen(true)
  }

  const handleDeleteSpecialization = (id) => {
    if (confirm('Are you sure you want to delete this specialization?')) {
      setSpecializations(specializations.filter(spec => spec.id !== id))
    }
  }

  const handleSubmitSpecialization = (formData) => {
    if (selectedSpecialization) {
      // Edit existing specialization
      setSpecializations(specializations.map(spec => 
        spec.id === selectedSpecialization.id 
          ? { ...spec, name: formData.specialization, description: formData.description }
          : spec
      ))
      console.log('Editing specialization:', formData)
    } else {
      // Add new specialization
      const newSpec = {
        id: Math.max(...specializations.map(s => s.id)) + 1,
        name: formData.specialization,
        description: formData.description,
        doctors: 0
      }
      setSpecializations([...specializations, newSpec])
      console.log('Adding new specialization:', formData)
    }
    handleCloseModal()
  }

  // Table columns for specializations
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
              Specialization Name
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
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <div className="text-gray-700">{row.getValue('description')}</div>,
      },
      {
        accessorKey: 'doctors',
        header: 'Number of Doctors',
        cell: ({ row }) => (
          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4AF37] text-black">
              {row.getValue('doctors')} Doctors
            </span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button 
              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors group" 
              title="Edit"
              onClick={() => handleEditSpecialization(row.original)}
            >
              <Edit className="h-3.5 w-3.5 text-blue-600 group-hover:text-blue-700" />
            </button>
            <button 
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group" 
              title="Delete"
              onClick={() => handleDeleteSpecialization(row.original.id)}
            >
              <Trash2 className="h-3.5 w-3.5 text-red-600 group-hover:text-red-700" />
            </button>
          </div>
        ),
      },
    ],
    [specializations]
  )

  const table = useReactTable({
    data: specializations,
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

  const tabs = [
    { id: 'clinic', name: 'Clinic Schedule', icon: Clock },
    { id: 'specialization', name: 'Doctor Specialization', icon: Settings },
    { id: 'admins', name: 'Admin Accounts', icon: Users }
  ]

  return (
    <>
    <div id="settings-content" className="space-y-4 animate-fade-in w-full">
      {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1 text-sm">Manage your clinic settings and configuration</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 animate-slide-up" style={{ animationDelay: '100ms' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm rounded-lg sm:rounded-none sm:rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-black text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-b-2 border-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        {/* Clinic Schedule Tab */}
        {activeTab === 'clinic' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Clinic Information</h2>
              <p className="text-sm text-gray-600">Manage your clinic's basic information and operating hours</p>
            </div>

            {/* Logo Upload Section */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">Clinic Logo</label>
              <div className="flex items-start gap-4">
                {/* Logo Preview */}
                <div className="relative">
                  {logoPreview ? (
                    <div className="relative w-32 h-32 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
                      <img 
                        src={logoPreview} 
                        alt="Clinic Logo" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={removeLogo}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex-1">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg cursor-pointer transition-colors text-sm font-medium"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Logo</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended size: 200x200px. Max file size: 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Clinic Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Clinic Name</label>
              <input
                type="text"
                value={clinicInfo.name}
                onChange={(e) => setClinicInfo({ ...clinicInfo, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={clinicInfo.email}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <input
                  type="tel"
                  value={clinicInfo.phone}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
              </div>
            </div>

            {/* Opening and Closing Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Opening Time</label>
                <input
                  type="time"
                  value={clinicInfo.openingTime}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, openingTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Closing Time</label>
                <input
                  type="time"
                  value={clinicInfo.closingTime}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, closingTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-start pt-4">
              <Button size="default">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        )}

        {/* Doctor Specialization Tab */}
        {activeTab === 'specialization' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Doctor Specializations</h2>
              <p className="text-sm text-gray-600">Manage medical specializations offered at your clinic</p>
            </div>

            {/* Search Bar and Add Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search specializations..."
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-white shadow-sm"
                />
              </div>
              <Button size="default" onClick={handleAddSpecialization}>
                <Plus className="h-4 w-4" />
                <span>Add Specialization</span>
              </Button>
            </div>

            {/* Table */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black">
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {table.getRowModel().rows.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                          No specializations found
                        </td>
                      </tr>
                    ) : (
                      table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-4 py-3 text-sm">
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
                  <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8 text-center text-gray-500">
                    No specializations found
                  </div>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <div key={row.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 relative group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-black border-4 border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                          <Settings className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-base mb-1">{row.original.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{row.original.description}</p>
                          <span className="inline-flex items-center px-3 py-1 bg-[#D4AF37] text-black text-xs font-semibold rounded-full">
                            {row.original.doctorsCount} Doctors
                          </span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleEditSpecialization(row.original)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSpecialization(row.original)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {table.getRowModel().rows.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8 text-center text-gray-500">
                    No specializations found
                  </div>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <div key={row.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 relative group">
                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={() => handleEditSpecialization(row.original)}
                          className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-500 text-yellow-600 hover:text-white transition-all"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSpecialization(row.original.id)}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition-all"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-lg font-bold border-4 border-[#D4AF37]">
                            <Settings className="h-6 w-6" />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 mb-1">
                            {row.original.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {row.original.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#D4AF37] text-black">
                              {row.original.doctors} Doctors
                            </span>
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
        )}

        {/* Admin Accounts Tab */}
        {activeTab === 'admins' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Accounts</h2>
                <p className="text-sm text-gray-600">Manage administrator users and their permissions</p>
              </div>
              <Button size="default">
                <Users className="h-4 w-4" />
                <span>Add Admin</span>
              </Button>
            </div>

            {/* Admins Table */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{admin.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{admin.email}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4AF37] text-black">
                            {admin.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            admin.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {admin.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                              Remove
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tablet Card View */}
              <div className="hidden md:block lg:hidden space-y-4 p-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 relative group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-black border-4 border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#D4AF37] font-bold text-sm">
                          {admin.name?.split(' ').map(n => n?.[0] || '').join('') || ''}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-base mb-1">{admin.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{admin.email}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-semibold rounded-full">
                            {admin.role}
                          </span>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            admin.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {admin.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4 p-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 relative group">
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white transition-all"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition-all"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-lg font-bold border-4 border-[#D4AF37]">
                          {admin.name?.split(' ').map(n => n?.[0] || '').join('').toUpperCase() || ''}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-1">
                          {admin.name}
                        </h3>
                        
                        {/* Email */}
                        <p className="text-sm text-gray-600 mb-2 truncate">
                          {admin.email}
                        </p>

                        {/* Badges */}
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#D4AF37] text-black">
                            {admin.role}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            admin.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {admin.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Specialization Modal */}
    <SpecializationModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmitSpecialization}
      specialization={selectedSpecialization}
    />
    </>
  )
}
