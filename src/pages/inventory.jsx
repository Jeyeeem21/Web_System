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
  Edit,
  Trash2,
  Package
} from 'lucide-react'
import { Button } from '../components/ui/button'
import InventoryModal from '../components/modals/inventory-modal'
import { showSuccessAlert, showDeleteConfirmation, showDeletedAlert } from '../lib/sweetalert'

// Mock data for inventory
const inventoryData = [
  {
    id: 1,
    itemName: 'Dental Gloves (Latex)',
    category: 'PPE',
    sku: 'GLV-LAT-001',
    quantity: 500,
    unit: 'boxes',
    minStock: 50,
    price: 15.99,
    supplier: 'MedSupply Co.',
    lastRestocked: '2025-01-10'
  },
  {
    id: 2,
    itemName: 'Surgical Masks',
    category: 'PPE',
    sku: 'MSK-SUR-002',
    quantity: 300,
    unit: 'boxes',
    minStock: 100,
    price: 12.50,
    supplier: 'Healthcare Plus',
    lastRestocked: '2025-01-08'
  },
  {
    id: 3,
    itemName: 'Dental Anesthetic (Lidocaine)',
    category: 'Medication',
    sku: 'MED-LID-003',
    quantity: 25,
    unit: 'vials',
    minStock: 10,
    price: 45.00,
    supplier: 'PharmaDent',
    lastRestocked: '2025-01-12'
  },
  {
    id: 4,
    itemName: 'Composite Resin',
    category: 'Materials',
    sku: 'MAT-RES-004',
    quantity: 15,
    unit: 'syringes',
    minStock: 5,
    price: 89.99,
    supplier: 'DentalPro Materials',
    lastRestocked: '2025-01-05'
  },
  {
    id: 5,
    itemName: 'Dental Burs (Assorted)',
    category: 'Instruments',
    sku: 'INS-BUR-005',
    quantity: 200,
    unit: 'pieces',
    minStock: 50,
    price: 2.50,
    supplier: 'DentalTools Ltd',
    lastRestocked: '2025-01-14'
  },
  {
    id: 6,
    itemName: 'X-Ray Films',
    category: 'Imaging',
    sku: 'IMG-XRY-006',
    quantity: 80,
    unit: 'packs',
    minStock: 20,
    price: 35.00,
    supplier: 'RadiDent Supply',
    lastRestocked: '2025-01-09'
  },
  {
    id: 7,
    itemName: 'Cotton Rolls',
    category: 'Consumables',
    sku: 'CON-COT-007',
    quantity: 150,
    unit: 'bags',
    minStock: 30,
    price: 8.99,
    supplier: 'MedSupply Co.',
    lastRestocked: '2025-01-11'
  },
  {
    id: 8,
    itemName: 'Dental Cement',
    category: 'Materials',
    sku: 'MAT-CEM-008',
    quantity: 12,
    unit: 'tubes',
    minStock: 5,
    price: 28.50,
    supplier: 'DentalPro Materials',
    lastRestocked: '2025-01-13'
  },
  {
    id: 9,
    itemName: 'Sterilization Pouches',
    category: 'Infection Control',
    sku: 'INF-STE-009',
    quantity: 400,
    unit: 'boxes',
    minStock: 100,
    price: 18.75,
    supplier: 'Healthcare Plus',
    lastRestocked: '2025-01-07'
  },
  {
    id: 10,
    itemName: 'Suction Tips',
    category: 'Instruments',
    sku: 'INS-SUC-010',
    quantity: 350,
    unit: 'pieces',
    minStock: 100,
    price: 1.25,
    supplier: 'DentalTools Ltd',
    lastRestocked: '2025-01-15'
  }
]

export function Inventory() {
  const [data, setData] = useState(inventoryData)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const handleAddItem = () => {
    setSelectedItem(null)
    setIsModalOpen(true)
  }

  const handleEditItem = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleDeleteItem = async (item) => {
    const confirmed = await showDeleteConfirmation('Inventory Item', item.itemName)
    if (confirmed) {
      setData(data.filter(i => i.id !== item.id))
      showDeletedAlert('Inventory Item', item.itemName)
    }
  }

  const handleSubmitItem = (formData) => {
    if (selectedItem) {
      // Edit existing item
      setData(data.map(i => 
        i.id === selectedItem.id 
          ? { ...i, ...formData }
          : i
      ))
      handleCloseModal()
      showSuccessAlert('updated', 'Inventory Item', formData.itemName)
    } else {
      // Add new item
      const newItem = {
        id: Math.max(...data.map(i => i.id)) + 1,
        ...formData
      }
      setData([...data, newItem])
      handleCloseModal()
      showSuccessAlert('added', 'Inventory Item', formData.itemName)
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'itemName',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              Item Name
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
        cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue('itemName')}</div>,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            {row.getValue('category')}
          </span>
        ),
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        cell: ({ row }) => <div className="text-gray-700 font-mono text-xs">{row.getValue('sku')}</div>,
      },
      {
        accessorKey: 'quantity',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              Quantity
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
        cell: ({ row }) => {
          const quantity = row.getValue('quantity')
          const minStock = row.original.minStock
          const isLowStock = quantity <= minStock
          return (
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                {quantity}
              </span>
              <span className="text-xs text-gray-500">{row.original.unit}</span>
              {isLowStock && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                  Low
                </span>
              )}
            </div>
          )
        },
      },
      {
        accessorKey: 'price',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              Price
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
          <div className="text-gray-900 font-medium">
            ${row.getValue('price').toFixed(2)}
          </div>
        ),
      },
      {
        accessorKey: 'supplier',
        header: 'Supplier',
        cell: ({ row }) => <div className="text-gray-700 text-xs">{row.getValue('supplier')}</div>,
      },
      {
        accessorKey: 'lastRestocked',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              Last Restocked
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
        cell: ({ row }) => <div className="text-gray-700 text-xs">{row.getValue('lastRestocked')}</div>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => handleEditItem(item)}
                className="p-1.5 hover:bg-yellow-50 rounded-lg transition-colors group"
                title="Edit"
              >
                <Edit className="h-3.5 w-3.5 text-yellow-600 group-hover:text-yellow-700" />
              </button>
              <button
                onClick={() => handleDeleteItem(item)}
                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5 text-red-600 group-hover:text-red-700" />
              </button>
            </div>
          )
        },
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

  return (
    <>
    <div id="inventory-content" className="space-y-4 animate-fade-in w-full">
      {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="text-gray-600 mt-1 text-sm">Manage clinic supplies and equipment inventory</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search inventory..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-white shadow-sm"
          />
        </div>
        <Button size="default" onClick={handleAddItem}>
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
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
                      <Package className="h-12 w-12 mb-2 text-gray-300" />
                      <p className="text-base font-medium">No items found</p>
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
              <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-base font-medium text-gray-900">No items found</p>
              <p className="text-sm text-gray-600">Try adjusting your search</p>
            </div>
          ) : (
            table.getRowModel().rows.map((row) => {
              const isLowStock = row.original.quantity <= row.original.minStock
              return (
                <div 
                  key={row.id}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 relative group"
                >
                  {/* Header with Item Name and Actions */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-black border-4 border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base">{row.original.itemName}</h3>
                        <p className="text-sm text-gray-600">{row.original.category}</p>
                        <p className="text-xs text-gray-500 mt-1">SKU: {row.original.sku}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEditItem(row.original)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(row.original)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Quantity:</span>
                      <p className={`font-medium ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {row.original.quantity} {row.original.unit}
                        {isLowStock && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Low Stock</span>}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Min Stock:</span>
                      <p className="font-medium text-gray-900">{row.original.minStock} {row.original.unit}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <p className="font-medium text-gray-900">₱{parseFloat(row.original.price).toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Supplier:</span>
                      <p className="font-medium text-gray-900">{row.original.supplier}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Last Restocked:</span>
                      <p className="font-medium text-gray-900">{row.original.lastRestocked}</p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {table.getRowModel().rows.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8 text-center">
              <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-base font-medium text-gray-900">No items found</p>
              <p className="text-sm text-gray-600">Try adjusting your search</p>
            </div>
          ) : (
            table.getRowModel().rows.map((row) => {
              const isLowStock = row.original.quantity <= row.original.minStock
              return (
                <div key={row.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 p-4 relative group">
                  {/* Action Buttons - Mobile Overlay */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => handleEditItem(row.original)}
                      className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-500 text-yellow-600 hover:text-white transition-all"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(row.original)}
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
                        <Package className="h-6 w-6" />
                      </div>
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {row.getValue('itemName')}
                      </h3>
                      
                      {/* Category & Low Stock Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {row.getValue('category')}
                        </span>
                        {isLowStock && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Low Stock
                          </span>
                        )}
                      </div>

                      {/* Info Grid */}
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-medium min-w-[70px]">SKU:</span>
                          <span className="text-gray-700 font-mono text-xs">{row.getValue('sku')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-medium min-w-[70px]">Quantity:</span>
                          <span className={`font-semibold ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                            {row.getValue('quantity')} {row.original.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-medium min-w-[70px]">Price:</span>
                          <span className="text-gray-900 font-medium">₱{row.getValue('price').toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-medium min-w-[70px]">Supplier:</span>
                          <span className="text-gray-700 text-xs">{row.getValue('supplier')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-medium min-w-[70px]">Restocked:</span>
                          <span className="text-gray-700 text-xs">{row.getValue('lastRestocked')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
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

    {/* Inventory Modal */}
    <InventoryModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmitItem}
      item={selectedItem}
    />
    </>
  )
}
