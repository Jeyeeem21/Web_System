import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'
import ClientNavbar from '../components/client/navbar.jsx'
import ClientFooter from '../components/client/footer.jsx'
import { Button } from '../components/ui/button'

export default function ClientContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your form submission logic here
    alert('Thank you for your message! We will contact you soon.')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const services = [
    'General Consultation',
    'Dental Cleaning',
    'Teeth Whitening',
    'Dental Implants',
    'Root Canal',
    'Orthodontics',
    'Emergency Care',
    'Other'
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium mb-6 animate-fade-in">
            <MessageSquare className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Get In{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Have questions or ready to schedule an appointment? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  Reach out to us through any of these channels. Our friendly staff is ready to assist you.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Address */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C4A030] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-gray-600 text-sm">
                        123 Dental Street<br />
                        Medical District<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600 text-sm">
                        Main: +1 (555) 123-4567<br />
                        Emergency: +1 (555) 123-4568
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600 text-sm">
                        info@dentalclinic.com<br />
                        appointments@dentalclinic.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl h-64 flex items-center justify-center border-2 border-gray-300">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-[#D4AF37]" />
                  <p className="font-medium">Map Integration</p>
                  <p className="text-sm">Google Maps would go here</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book An Appointment</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all"
                  >
                    <option value="">Choose a service...</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all resize-none"
                    placeholder="Any specific concerns or questions..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C4A030] hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-[1.02] h-12 text-base font-semibold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ClientFooter />
    </div>
  )
}
