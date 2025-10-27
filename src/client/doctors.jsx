import { useState } from 'react'
import { Search, Filter, Award, Calendar } from 'lucide-react'
import ClientNavbar from '../components/client/navbar.jsx'
import ClientFooter from '../components/client/footer.jsx'
import { DoctorCard } from '../components/doctor-card.jsx'

export default function ClientDoctors() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All')

  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'General Dentistry',
      email: 'sarah.johnson@clinic.com',
      phone: '+1 (555) 101-2001',
      status: 'Available',
      experience: '12 years',
      activePatients: 245
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Orthodontics',
      email: 'michael.chen@clinic.com',
      phone: '+1 (555) 101-2002',
      status: 'Available',
      experience: '10 years',
      activePatients: 189
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Cosmetic Dentistry',
      email: 'emily.rodriguez@clinic.com',
      phone: '+1 (555) 101-2003',
      status: 'Busy',
      experience: '8 years',
      activePatients: 198
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialization: 'Oral Surgery',
      email: 'james.wilson@clinic.com',
      phone: '+1 (555) 101-2004',
      status: 'Available',
      experience: '15 years',
      activePatients: 167
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialization: 'Pediatric Dentistry',
      email: 'lisa.anderson@clinic.com',
      phone: '+1 (555) 101-2005',
      status: 'Available',
      experience: '9 years',
      activePatients: 312
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialization: 'Periodontics',
      email: 'robert.taylor@clinic.com',
      phone: '+1 (555) 101-2006',
      status: 'On Leave',
      experience: '14 years',
      activePatients: 156
    },
    {
      id: 7,
      name: 'Dr. Amanda White',
      specialization: 'Endodontics',
      email: 'amanda.white@clinic.com',
      phone: '+1 (555) 101-2007',
      status: 'Available',
      experience: '11 years',
      activePatients: 178
    },
    {
      id: 8,
      name: 'Dr. David Martinez',
      specialization: 'Prosthodontics',
      email: 'david.martinez@clinic.com',
      phone: '+1 (555) 101-2008',
      status: 'Busy',
      experience: '13 years',
      activePatients: 203
    },
    {
      id: 9,
      name: 'Dr. Jennifer Lee',
      specialization: 'General Dentistry',
      email: 'jennifer.lee@clinic.com',
      phone: '+1 (555) 101-2009',
      status: 'Available',
      experience: '7 years',
      activePatients: 221
    }
  ]

  const specializations = [
    'All',
    'General Dentistry',
    'Orthodontics',
    'Cosmetic Dentistry',
    'Oral Surgery',
    'Pediatric Dentistry',
    'Periodontics',
    'Endodontics',
    'Prosthodontics'
  ]

  // Filter doctors
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization = selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization
    return matchesSearch && matchesSpecialization
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ClientNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium mb-6 animate-fade-in">
            <Award className="w-4 h-4" />
            <span>Expert Dental Professionals</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Meet Our{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
              Doctors
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Our team of highly qualified and experienced dental professionals is dedicated to providing you with exceptional care
          </p>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all text-gray-900"
              />
            </div>

            {/* Specialization Filter */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-400" />
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSpecialization === spec
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black shadow-lg'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[#D4AF37]">{filteredDoctors.length}</span> doctor{filteredDoctors.length !== 1 ? 's' : ''}
              {selectedSpecialization !== 'All' && ` specializing in ${selectedSpecialization}`}
            </p>
          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 lg:p-12 text-center">
            <Calendar className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Schedule Your Appointment?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our doctors are ready to provide you with the best dental care. Book your consultation today and take the first step towards a healthier smile.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      <ClientFooter />
    </div>
  )
}
