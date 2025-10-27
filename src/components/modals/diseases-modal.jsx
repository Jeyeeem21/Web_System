import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function DiseasesModal({ isOpen, onClose, onSubmit, patientId }) {
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
    const data = {
      patient_id: patientId,
      high_blood_pressure: formData.get('high_blood_pressure') === 'on',
      low_blood_pressure: formData.get('low_blood_pressure') === 'on',
      epilepsy: formData.get('epilepsy') === 'on',
      aids_hiv: formData.get('aids_hiv') === 'on',
      std: formData.get('std') === 'on',
      stomach_ulcers: formData.get('stomach_ulcers') === 'on',
      fainting: formData.get('fainting') === 'on',
      rapid_weight_loss: formData.get('rapid_weight_loss') === 'on',
      radiation_therapy: formData.get('radiation_therapy') === 'on',
      joint_replacement: formData.get('joint_replacement') === 'on',
      heart_surgery: formData.get('heart_surgery') === 'on',
      heart_attack: formData.get('heart_attack') === 'on',
      thyroid_problem: formData.get('thyroid_problem') === 'on',
      heart_disease: formData.get('heart_disease') === 'on',
      heart_murmur: formData.get('heart_murmur') === 'on',
      hepatitis_liver: formData.get('hepatitis_liver') === 'on',
      rheumatic_fever: formData.get('rheumatic_fever') === 'on',
      hay_fever: formData.get('hay_fever') === 'on',
      respiratory_problem: formData.get('respiratory_problem') === 'on',
      hepatitis_jaundice: formData.get('hepatitis_jaundice') === 'on',
      tuberculosis: formData.get('tuberculosis') === 'on',
      swollen_ankles: formData.get('swollen_ankles') === 'on',
      kidney_disease: formData.get('kidney_disease') === 'on',
      diabetes: formData.get('diabetes') === 'on',
      chest_pain: formData.get('chest_pain') === 'on',
      stroke: formData.get('stroke') === 'on',
      cancer_tumors: formData.get('cancer_tumors') === 'on',
      anemia: formData.get('anemia') === 'on',
      angina: formData.get('angina') === 'on',
      asthma: formData.get('asthma') === 'on',
      emphysema: formData.get('emphysema') === 'on',
      bleeding_problems: formData.get('bleeding_problems') === 'on',
      blood_disease: formData.get('blood_disease') === 'on',
      head_injuries: formData.get('head_injuries') === 'on',
      arthritis: formData.get('arthritis') === 'on',
      other_conditions: formData.get('other_conditions') || null
    }
    
    onSubmit(data)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const diseases = [
    { name: 'high_blood_pressure', label: 'High Blood Pressure' },
    { name: 'low_blood_pressure', label: 'Low Blood Pressure' },
    { name: 'epilepsy', label: 'Epilepsy / Seizures' },
    { name: 'aids_hiv', label: 'AIDS / HIV' },
    { name: 'std', label: 'Sexually Transmitted Disease' },
    { name: 'stomach_ulcers', label: 'Stomach Troubles / Ulcers' },
    { name: 'fainting', label: 'Fainting Seizure' },
    { name: 'rapid_weight_loss', label: 'Rapid Weight Loss' },
    { name: 'radiation_therapy', label: 'Radiation Therapy' },
    { name: 'joint_replacement', label: 'Joint Replacement / Implant' },
    { name: 'heart_surgery', label: 'Heart Surgery' },
    { name: 'heart_attack', label: 'Heart Attack' },
    { name: 'thyroid_problem', label: 'Thyroid Problem' },
    { name: 'heart_disease', label: 'Heart Disease' },
    { name: 'heart_murmur', label: 'Heart Murmur' },
    { name: 'hepatitis_liver', label: 'Hepatitis / Liver Disease' },
    { name: 'rheumatic_fever', label: 'Rheumatic Fever' },
    { name: 'hay_fever', label: 'Hay Fever / Allergies' },
    { name: 'respiratory_problem', label: 'Respiratory Problems' },
    { name: 'hepatitis_jaundice', label: 'Hepatitis / Jaundice' },
    { name: 'tuberculosis', label: 'Tuberculosis' },
    { name: 'swollen_ankles', label: 'Swollen Ankles' },
    { name: 'kidney_disease', label: 'Kidney Disease' },
    { name: 'diabetes', label: 'Diabetes' },
    { name: 'chest_pain', label: 'Chest Pain' },
    { name: 'stroke', label: 'Stroke' },
    { name: 'cancer_tumors', label: 'Cancer / Tumors' },
    { name: 'anemia', label: 'Anemia' },
    { name: 'angina', label: 'Angina' },
    { name: 'asthma', label: 'Asthma' },
    { name: 'emphysema', label: 'Emphysema' },
    { name: 'bleeding_problems', label: 'Bleeding Problems' },
    { name: 'blood_disease', label: 'Blood Diseases' },
    { name: 'head_injuries', label: 'Head Injuries' },
    { name: 'arthritis', label: 'Arthritis / Rheumatism' }
  ]

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-slide-down">
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Medical Conditions</h2>
            <p className="text-sm text-gray-600 mt-1">Check all conditions that apply</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="Close">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-8 py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {diseases.map((disease) => (
                <label 
                  key={disease.name}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <input 
                    type="checkbox" 
                    name={disease.name} 
                    className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" 
                  />
                  <span className="text-sm text-gray-700">{disease.label}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Conditions</label>
              <textarea 
                name="other_conditions" 
                rows={3} 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-gray-900 resize-none" 
                placeholder="Please list any other medical conditions not mentioned above"
              />
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
