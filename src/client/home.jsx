import { Link } from 'react-router-dom'
import { Calendar, Shield, Users, Award, Sparkles, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import ClientNavbar from '../components/client/navbar.jsx'
import ClientFooter from '../components/client/footer.jsx'

export default function ClientHome() {
  const features = [
    {
      icon: Shield,
      title: 'Expert Care',
      description: 'Board-certified dentists with years of experience',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Sparkles,
      title: 'Modern Technology',
      description: 'State-of-the-art equipment for precise treatments',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Comprehensive care for patients of all ages',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in dental care',
      color: 'from-[#D4AF37] to-[#C4A030]'
    }
  ]

  const stats = [
    { label: 'Happy Patients', value: '10,000+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Expert Doctors', value: '25+' },
    { label: 'Success Rate', value: '99%' }
  ]

  const benefits = [
    'Flexible appointment scheduling',
    'Emergency dental services',
    'Insurance accepted',
    'Payment plans available',
    'Comfortable environment',
    'Advanced pain management'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ClientNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium">
                  Welcome to Excellence in Dental Care
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Smile Deserves the{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                  Best Care
                </span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience world-class dental care with our team of expert dentists. We combine cutting-edge technology with compassionate care to give you the smile you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services-client"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Right Content - Image Placeholder */}
            <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-[#D4AF37]/30">
                  <div className="aspect-square bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-xl flex items-center justify-center">
                    <Sparkles className="w-32 h-32 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#C4A030] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional dental care that exceeds your expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image Placeholder */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 border border-[#D4AF37]/30">
                <div className="aspect-square bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-xl flex items-center justify-center">
                  <Shield className="w-32 h-32 text-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* Right - Benefits List */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What Makes Us Different
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We go above and beyond to ensure your dental experience is comfortable, convenient, and exceeds expectations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and take the first step towards a healthier, more confident smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+15551234567"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 inline-flex items-center justify-center gap-2"
            >
              <Clock className="w-5 h-5" />
              Call Now: (555) 123-4567
            </a>
          </div>
        </div>
      </section>

      <ClientFooter />
    </div>
  )
}
