import { X, DollarSign, CreditCard, Smartphone, Hash } from 'lucide-react'
import { useState, useEffect } from 'react'
import { showSuccessAlert, showValidationError } from '../../lib/sweetalert'

export default function PaymentModal({ isOpen, onClose, onSubmit, appointment }) {
  const [step, setStep] = useState(1) // 1: Payment Method, 2: Payment Details
  const [paymentData, setPaymentData] = useState({
    payment_method: '',
    reference_number: '',
    amount: ''
  })

  useEffect(() => {
    if (isOpen) {
      // Reset to step 1 when modal opens
      setStep(1)
      setPaymentData({
        payment_method: '',
        reference_number: '',
        amount: ''
      })

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

  if (!isOpen || !appointment) return null

  const handlePaymentMethodSelect = (method) => {
    setPaymentData(prev => ({
      ...prev,
      payment_method: method
    }))
    setStep(2)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate amount
    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      showValidationError('Please enter a valid payment amount')
      return
    }

    // Validate reference number for GCash
    if (paymentData.payment_method === 'GCash' && !paymentData.reference_number) {
      showValidationError('Reference number is required for GCash payments')
      return
    }

    onSubmit({
      appointment_id: appointment.id,
      ...paymentData
    })
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
      setPaymentData(prev => ({
        ...prev,
        payment_method: '',
        reference_number: '',
        amount: ''
      }))
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-[#D4AF37] to-[#C4A030]">
          <h2 className="text-xl font-semibold text-white">
            {step === 1 ? 'Select Payment Method' : 'Payment Details'}
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
        <div className="p-6">
          {/* Step 1: Payment Method Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Please select your preferred payment method for this appointment.
              </p>

              {/* Appointment Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Appointment Details</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Patient:</span> {appointment.patientName}</p>
                  <p><span className="font-medium">Doctor:</span> {appointment.doctor}</p>
                  <p><span className="font-medium">Service:</span> {appointment.service}</p>
                  <p><span className="font-medium">Date:</span> {appointment.date} at {appointment.time}</p>
                </div>
              </div>

              {/* Payment Method Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {/* Cash */}
                <button
                  onClick={() => handlePaymentMethodSelect('Cash')}
                  className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-[#D4AF37] transition-all p-6 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-green-100 group-hover:bg-green-500 transition-all flex items-center justify-center">
                      <DollarSign className="w-8 h-8 text-green-600 group-hover:text-white transition-all" />
                    </div>
                    <span className="font-semibold text-gray-900">Cash</span>
                    <span className="text-xs text-gray-500 text-center">Pay with cash at the clinic</span>
                  </div>
                </button>

                {/* GCash */}
                <button
                  onClick={() => handlePaymentMethodSelect('GCash')}
                  className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-[#D4AF37] transition-all p-6 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-500 transition-all flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-blue-600 group-hover:text-white transition-all" />
                    </div>
                    <span className="font-semibold text-gray-900">GCash</span>
                    <span className="text-xs text-gray-500 text-center">Pay with GCash mobile wallet</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Details Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Payment Method */}
              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#C4A030]/10 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  {paymentData.payment_method === 'Cash' ? (
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-900">{paymentData.payment_method}</p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₱</span>
                  <input
                    type="number"
                    name="amount"
                    value={paymentData.amount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    required
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Reference Number (GCash only) */}
              {paymentData.payment_method === 'GCash' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Hash className="inline w-4 h-4 mr-1" />
                    Reference Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="reference_number"
                    value={paymentData.reference_number}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="Enter GCash reference number"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the 13-digit reference number from your GCash transaction
                  </p>
                </div>
              )}

              {/* Cash Payment Note */}
              {paymentData.payment_method === 'Cash' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Cash Payment</p>
                      <p>Please prepare the exact amount and pay at the clinic reception on the day of your appointment.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-5 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-5 py-2.5 bg-[#D4AF37] text-black font-medium rounded-lg hover:bg-[#C4A030] transition-all shadow-md hover:shadow-lg"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
