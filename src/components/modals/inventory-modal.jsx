import { X, Package, Tag, Hash, DollarSign, TrendingUp, Building2, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function InventoryModal({ isOpen, onClose, onSubmit, item = null }) {
  const isEdit = !!item
  
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    sku: '',
    quantity: '',
    unit: 'pieces',
    minStock: '',
    price: '',
    supplier: '',
    lastRestocked: ''
  })

  useEffect(() => {
    if (item) {
      // Edit mode: populate form with item data
      setFormData({
        itemName: item.itemName || '',
        category: item.category || '',
        sku: item.sku || '',
        quantity: item.quantity || '',
        unit: item.unit || 'pieces',
        minStock: item.minStock || '',
        price: item.price || '',
        supplier: item.supplier || '',
        lastRestocked: item.lastRestocked || ''
      })
    } else {
      // Add mode: reset form
      setFormData({
        itemName: '',
        category: '',
        sku: '',
        quantity: '',
        unit: 'pieces',
        minStock: '',
        price: '',
        supplier: '',
        lastRestocked: ''
      })
    }
  }, [item, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Add blur to sidebar, footer, and inventory content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const inventoryContent = document.getElementById('inventory-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (inventoryContent) inventoryContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      // Remove blur from sidebar, footer, and inventory content
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const inventoryContent = document.getElementById('inventory-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (inventoryContent) inventoryContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      // Cleanup: Remove blur
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const inventoryContent = document.getElementById('inventory-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (inventoryContent) inventoryContent.style.filter = 'none'
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
    onSubmit(formData)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Categories for dropdown
  const categories = [
    'PPE',
    'Medication',
    'Materials',
    'Instruments',
    'Imaging',
    'Disposables',
    'Equipment',
    'Other'
  ]

  // Units for dropdown
  const units = [
    'pieces',
    'boxes',
    'vials',
    'syringes',
    'packs',
    'bottles',
    'units',
    'kg',
    'liters'
  ]

  // Get today's date for max attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-[#D4AF37] to-[#C4A030]">
          <h2 className="text-2xl font-semibold text-white">
            {isEdit ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
            title="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-8 py-6 space-y-6">
            
            {/* BASIC INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Item Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Package className="inline w-4 h-4 mr-1" />
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="Enter item name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Tag className="inline w-4 h-4 mr-1" />
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Hash className="inline w-4 h-4 mr-1" />
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g., GLV-LAT-001"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* STOCK INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                {/* Min Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Min Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* PRICING & SUPPLIER */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pricing & Supplier</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₱</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      required
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Supplier */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Building2 className="inline w-4 h-4 mr-1" />
                    Supplier <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    placeholder="Enter supplier name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  />
                </div>

                {/* Last Restocked */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Last Restocked <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="lastRestocked"
                    value={formData.lastRestocked}
                    onChange={handleChange}
                    max={today}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Footer / Action Buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#C4A030] transition-all shadow-md hover:shadow-lg"
            >
              {isEdit ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
