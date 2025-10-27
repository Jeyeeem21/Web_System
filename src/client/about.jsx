import { Heart, Target, Users, Award, Shield, Sparkles, TrendingUp, Clock } from 'lucide-react'
import ClientNavbar from '../components/client/navbar.jsx'
import ClientFooter from '../components/client/footer.jsx'

export default function ClientAbout() {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We prioritize your comfort and well-being in every treatment decision.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Integrity & Trust',
      description: 'Honest recommendations and transparent treatment plans you can rely on.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Excellence',
      description: 'Committed to the highest standards of dental care and service.',
      color: 'from-[#D4AF37] to-[#C4A030]'
    },
    {
      icon: Users,
      title: 'Teamwork',
      description: 'Collaborative approach ensuring comprehensive care for every patient.',
      color: 'from-purple-500 to-indigo-500'
    }
  ]

  const timeline = [
    { year: '2010', title: 'Clinic Founded', description: 'Started with a vision to provide exceptional dental care' },
    { year: '2015', title: 'Expansion', description: 'Opened second location and added specialized services' },
    { year: '2020', title: 'Technology Upgrade', description: 'Integrated state-of-the-art digital dentistry equipment' },
    { year: '2025', title: 'Award Recognition', description: 'Recognized as top dental clinic in the region' }
  ]

  const achievements = [
    { icon: Award, label: 'Best Dental Clinic Award', value: '2024' },
    { icon: Users, label: 'Patients Served', value: '10,000+' },
    { icon: TrendingUp, label: 'Success Rate', value: '99%' },
    { icon: Clock, label: 'Years of Experience', value: '15+' }
  ]

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            About{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
              Our Clinic
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Dedicated to transforming smiles and improving lives through exceptional dental care since 2010
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide comprehensive, patient-centered dental care using the latest technology and techniques. 
                We strive to create a comfortable environment where every patient feels valued, respected, and 
                confident in their treatment decisions. Our commitment is to deliver exceptional results that 
                enhance both oral health and overall quality of life.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the leading dental care provider recognized for innovation, excellence, and compassionate 
                service. We envision a future where everyone has access to world-class dental care that not only 
                treats but prevents dental issues. Through continuous learning and advancement, we aim to set new 
                standards in dental healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A timeline of growth, innovation, and commitment to excellence
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#D4AF37] via-[#C4A030] to-[#D4AF37]"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex flex-col lg:flex-row gap-8 items-center animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:order-2'}`}>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-lg z-10">
                      {item.year}
                    </div>
                  </div>

                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:order-2' : ''}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Recognition and milestones that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.label}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#D4AF37]/30 hover:bg-white/10 transition-all duration-300 hover:scale-105 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <achievement.icon className="w-12 h-12 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">{achievement.value}</div>
                <div className="text-gray-300 text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Our experienced team of dental professionals is dedicated to your care
            </p>
            <a
              href="/doctors-client"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black font-semibold rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105"
            >
              View All Doctors
              <Target className="w-5 h-5" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C4A030] flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Expert Dentist</h3>
                <p className="text-gray-600 text-center text-sm">Specialized in comprehensive dental care</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClientFooter />
    </div>
  )
}
