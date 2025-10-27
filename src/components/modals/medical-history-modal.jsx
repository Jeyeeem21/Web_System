import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function MedicalHistoryModal({ isOpen, onClose, onSubmit, patientId }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'blur(4px)'
      if (footer) footer.style.filter = 'blur(4px)'
      if (patientsContent) patientsContent.style.filter = 'blur(4px)'
    } else {
      document.body.style.overflow = 'unset'
      
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (patientsContent) patientsContent.style.filter = 'none'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      
      const sidebar = document.querySelector('aside')
      const footer = document.querySelector('footer')
      const patientsContent = document.getElementById('patients-content')
      
      if (sidebar) sidebar.style.filter = 'none'
      if (footer) footer.style.filter = 'none'
      if (patientsContent) patientsContent.style.filter = 'none'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    data.patient_id = patientId
    
    // Convert checkboxes to Yes/No
    data.good_health = data.good_health === 'on' ? 'Yes' : 'No'
    data.under_medical_treatment = data.under_medical_treatment === 'on' ? 'Yes' : 'No'
    data.hospitalized = data.hospitalized === 'on' ? 'Yes' : 'No'
    data.taking_medication = data.taking_medication === 'on' ? 'Yes' : 'No'
    data.tobacco_use = data.tobacco_use === 'on' ? 'Yes' : 'No'
    data.alcohol_or_drug_use = data.alcohol_or_drug_use === 'on' ? 'Yes' : 'No'
    data.allergic_local_anesthetic = data.allergic_local_anesthetic === 'on' ? 'Yes' : 'No'
    data.allergic_sulfa_drugs = data.allergic_sulfa_drugs === 'on' ? 'Yes' : 'No'
    data.allergic_aspirin = data.allergic_aspirin === 'on' ? 'Yes' : 'No'
    data.allergic_penicillin = data.allergic_penicillin === 'on' ? 'Yes' : 'No'
    data.allergic_latex = data.allergic_latex === 'on' ? 'Yes' : 'No'
    
    onSubmit(data)
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-slide-down">
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">Medical History</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Close">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-8 py-6 space-y-8">
            {/* Physician Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Physician Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Physician Name</label>
                  <input type="text" name="physician_name" maxLength={100} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900" placeholder="Dr. Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <input type="text" name="specialty" maxLength={100} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900" placeholder="Specialty" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
                  <input type="text" name="office_address" maxLength={255} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900" placeholder="Address" />
                </div>
              </div>
            </div>

            {/* General Health */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">General Health</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                  <input type="checkbox" name="good_health" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                  <span className="text-gray-700">Are you in good health?</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                      <input type="checkbox" name="under_medical_treatment" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                      <span className="text-gray-700">Under medical treatment?</span>
                    </label>
                    <textarea name="condition_being_treated" rows={2} className="mt-2 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 resize-none" placeholder="If yes, describe condition"></textarea>
                  </div>
                  <div>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                      <input type="checkbox" name="hospitalized" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                      <span className="text-gray-700">Been hospitalized?</span>
                    </label>
                    <textarea name="hospitalization_details" rows={2} className="mt-2 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 resize-none" placeholder="If yes, describe details"></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Medications & Habits */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Medications & Habits</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                    <input type="checkbox" name="taking_medication" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                    <span className="text-gray-700">Currently taking medication?</span>
                  </label>
                  <textarea name="medication_details" rows={2} className="mt-2 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 resize-none" placeholder="If yes, list medications"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                    <input type="checkbox" name="tobacco_use" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                    <span className="text-gray-700">Use tobacco?</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                    <input type="checkbox" name="alcohol_or_drug_use" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                    <span className="text-gray-700">Use alcohol or drugs?</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Allergies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                  <input type="checkbox" name="allergic_local_anesthetic" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                  <span className="text-gray-700">Local Anesthetic</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                  <input type="checkbox" name="allergic_sulfa_drugs" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                  <span className="text-gray-700">Sulfa Drugs</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                  <input type="checkbox" name="allergic_aspirin" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                  <span className="text-gray-700">Aspirin</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                  <input type="checkbox" name="allergic_penicillin" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                  <span className="text-gray-700">Penicillin</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                  <input type="checkbox" name="allergic_latex" className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
                  <span className="text-gray-700">Latex</span>
                </label>
                <div className="md:col-span-2 lg:col-span-1">
                  <input type="text" name="allergic_others" maxLength={255} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900" placeholder="Other allergies" />
                </div>
              </div>
            </div>

            {/* Vital Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Vital Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bleeding Time</label>
                  <input type="text" name="bleeding_time" maxLength={50} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900" placeholder="e.g., 2-5 minutes" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                  <input type="text" name="blood_type" maxLength={10} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900" placeholder="e.g., O+" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                  <input type="text" name="blood_pressure" maxLength={20} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900" placeholder="e.g., 120/80" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-all">Skip</button>
            <button type="submit" className="px-6 py-2.5 bg-[#D4AF37] text-white font-medium rounded-lg hover:bg-[#C4A030] transition-all shadow-sm hover:shadow-md">Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}
