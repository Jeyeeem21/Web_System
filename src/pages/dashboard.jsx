import { Calendar, Users, UserCheck, Clock, TrendingUp, Activity, DollarSign } from 'lucide-react'
import { StatCard } from '../components/stat-card'
import { BarChart } from '../components/ui/bar-chart'
import { DoughnutChart } from '../components/ui/doughnut-chart'
import { LineChart } from '../components/ui/line-chart'

// Mock data for dashboard
const statsData = [
  {
    title: "Total Appointments",
    value: "248",
    change: "+12% from last month",
    icon: Calendar,
    gradient: "from-[#D4AF37] to-[#C4A030]"
  },
  {
    title: "Active Patients",
    value: "1,429",
    change: "+8% from last month",
    icon: Users,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Available Doctors",
    value: "12",
    change: "3 on duty now",
    icon: UserCheck,
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "Monthly Revenue",
    value: "$62k",
    change: "+15% from last month",
    icon: DollarSign,
    gradient: "from-purple-500 to-purple-600"
  }
]

const recentAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    doctor: "Dr. Sarah Johnson",
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: 2,
    patientName: "Emma Wilson",
    doctor: "Dr. Michael Chen",
    time: "11:30 AM",
    status: "Pending"
  },
  {
    id: 3,
    patientName: "Michael Brown",
    doctor: "Dr. Sarah Johnson",
    time: "02:00 PM",
    status: "Confirmed"
  },
  {
    id: 4,
    patientName: "Sarah Davis",
    doctor: "Dr. James Lee",
    time: "03:30 PM",
    status: "Cancelled"
  }
]

const performanceData = [
  { label: "Patient Satisfaction", value: 96, color: "bg-[#D4AF37]" },
  { label: "Appointment Completion", value: 89, color: "bg-green-500" },
  { label: "Staff Availability", value: 92, color: "bg-blue-500" },
  { label: "Revenue Target", value: 78, color: "bg-purple-500" }
]

const monthlyData = [
  { month: 'Jan', appointments: 180, revenue: 45000 },
  { month: 'Feb', appointments: 195, revenue: 48000 },
  { month: 'Mar', appointments: 210, revenue: 52000 },
  { month: 'Apr', appointments: 198, revenue: 49500 },
  { month: 'May', appointments: 225, revenue: 56000 },
  { month: 'Jun', appointments: 248, revenue: 62000 }
]

// Service distribution data for doughnut chart
const serviceDistribution = [
  { label: 'Teeth Cleaning', value: 485, color: '#D4AF37 #C4A030' },
  { label: 'Dental Filling', value: 342, color: '#3b82f6 #2563eb' },
  { label: 'Root Canal', value: 198, color: '#10b981 #059669' },
  { label: 'Orthodontics', value: 256, color: '#8b5cf6 #7c3aed' },
  { label: 'Extractions', value: 148, color: '#ec4899 #db2777' }
]

// Sales trend data for line chart
const salesTrend = [
  { label: 'Week 1', sales: 12500, expenses: 8200 },
  { label: 'Week 2', sales: 15800, expenses: 9100 },
  { label: 'Week 3', sales: 13200, expenses: 8800 },
  { label: 'Week 4', sales: 18500, expenses: 10200 }
]

// Patient demographics for another doughnut
const patientDemographics = [
  { label: 'Adults (25-50)', value: 645, color: '#D4AF37 #C4A030' },
  { label: 'Seniors (50+)', value: 428, color: '#3b82f6 #2563eb' },
  { label: 'Young Adults (18-25)', value: 256, color: '#10b981 #059669' },
  { label: 'Children (0-18)', value: 100, color: '#f59e0b #d97706' }
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-8 animate-slide-down">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
          Welcome to <span className="text-[#D4AF37]">Dashboard</span>
        </h1>
        <p className="text-gray-600">Here's what's happening with your clinic today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          </div>
        ))}
      </div>

      {/* Charts Row 1: Monthly Statistics */}
      <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
        <BarChart
          data={monthlyData}
          title="Monthly Appointments & Revenue"
          legend={[
            { label: 'Appointments', color: 'bg-[#D4AF37]' },
            { label: 'Revenue (x100)', color: 'bg-green-500' }
          ]}
        />
      </div>

      {/* Charts Row 2: Sales Trend and Service Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
        <LineChart
          data={salesTrend}
          title="Weekly Sales & Expenses"
          dataKey1="sales"
          dataKey2="expenses"
          label1="Sales"
          label2="Expenses"
        />
        <DoughnutChart
          data={serviceDistribution}
          title="Service Distribution"
        />
      </div>

      {/* Charts Row 3: Performance and Patient Demographics */}
      {/* Charts Row 3: Performance and Patient Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
        {/* Performance Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
            <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
          </div>
          <div className="space-y-6">
            {performanceData.map((item, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${700 + index * 100}ms` }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Demographics Doughnut */}
        <DoughnutChart
          data={patientDemographics}
          title="Patient Demographics"
        />
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '700ms' }}>
        <div className="flex items-center gap-2 mb-6">
          <Activity className="h-5 w-5 text-[#D4AF37]" />
          <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{appointment.patientName}</h4>
                <p className="text-sm text-gray-600">{appointment.doctor}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">{appointment.time}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    appointment.status === 'Confirmed'
                      ? 'bg-[#D4AF37] text-black'
                      : appointment.status === 'Pending'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '800ms' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="group relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Appointment
            </span>
          </button>
          <button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              Add New Patient
            </span>
          </button>
          <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Activity className="h-5 w-5" />
              View All Reports
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
