import { useState } from 'react'
import { Search, Filter, Sparkles } from 'lucide-react'
import ClientNavbar from '../components/client/navbar.jsx'
import ClientFooter from '../components/client/footer.jsx'
import { ServiceCard } from '../components/service-card.jsx'

export default function ClientServices() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Mock services data
  const services = [
    {
      id: 1,
      name: 'Dental Cleaning',
      description: 'Professional teeth cleaning and polishing to remove plaque, tartar, and stains. Helps prevent cavities and gum disease.',
      price: '80',
      duration: '45 min',
      category: 'Preventive'
    },
    {
      id: 2,
      name: 'Teeth Whitening',
      description: 'Advanced whitening treatment for a brighter smile. Safe and effective procedure with lasting results.',
      price: '350',
      duration: '60 min',
      category: 'Cosmetic'
    },
    {
      id: 3,
      name: 'Dental Implants',
      description: 'Permanent tooth replacement solution that looks and functions like natural teeth. Durable and long-lasting.',
      price: '2500',
      duration: '90 min',
      category: 'Restorative'
    },
    {
      id: 4,
      name: 'Root Canal',
      description: 'Treatment to save infected or damaged teeth. Modern techniques ensure a comfortable experience.',
      price: '800',
      duration: '90 min',
      category: 'Restorative'
    },
    {
      id: 5,
      name: 'Orthodontics',
      description: 'Braces and aligners to straighten teeth and improve your smile. Customized treatment plans available.',
      price: '3500',
      duration: '30 min',
      category: 'Orthodontics'
    },
    {
      id: 6,
      name: 'Tooth Extraction',
      description: 'Safe and painless tooth removal when necessary. Includes aftercare instructions and support.',
      price: '150',
      duration: '30 min',
      category: 'Surgical'
    },
    {
      id: 7,
      name: 'Periodontal',
      description: 'Treatment for gum disease and periodontal issues. Comprehensive care to restore gum health.',
      price: '600',
      duration: '60 min',
      category: 'Preventive'
    },
    {
      id: 8,
      name: 'Cosmetic',
      description: 'Veneers, bonding, and other cosmetic procedures to enhance your smile aesthetics.',
      price: '1200',
      duration: '75 min',
      category: 'Cosmetic'
    },
    {
      id: 9,
      name: 'Emergency Care',
      description: 'Immediate dental care for urgent situations. Available for dental emergencies and severe pain.',
      price: '200',
      duration: '45 min',
      category: 'Emergency'
    }
  ]

  const categories = ['All', 'Preventive', 'Cosmetic', 'Restorative', 'Orthodontics', 'Surgical', 'Emergency']

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory
    return matchesSearch && matchesCategory
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
            <Sparkles className="w-4 h-4" />
            <span>Comprehensive Dental Solutions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Our{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            From preventive care to advanced cosmetic procedures, we offer a complete range of dental services to meet all your oral health needs
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all text-gray-900"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-400" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black shadow-lg'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[#D4AF37]">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 lg:p-12 text-center">
            <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our experienced team can help you determine the best treatment plan for your needs. Schedule a consultation today.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </section>

      <ClientFooter />
    </div>
  )
}
