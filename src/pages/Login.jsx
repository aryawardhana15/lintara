import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Landmark, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const userTypes = [
  {
    id: 'government',
    label: 'Government Admin',
    description: 'Akses penuh ke integrasi antar instansi & compliance dashboard.',
    icon: Landmark,
  },
  {
    id: 'corporate',
    label: 'Corporate CIO',
    description: 'Kelola akses data pemerintah, audit, dan API marketplace.',
    icon: Building2,
  },
  {
    id: 'group',
    label: 'Group CFO',
    description: 'Monitoring finansial, master data, dan konsolidasi real-time.',
    icon: Users,
  },
]

const demoAccounts = [
  { role: 'Government', email: 'admin@gov.id', password: 'demo123' },
  { role: 'Corporate', email: 'cio@bumn.co.id', password: 'demo123' },
  { role: 'Group CFO', email: 'cfo@group.co.id', password: 'demo123' },
]

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [selectedUserType, setSelectedUserType] = useState(userTypes[0].id)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const selectedDemoAccount = useMemo(
    () =>
      demoAccounts.find((account) =>
        account.role.toLowerCase().includes(selectedUserType === 'group' ? 'group' : selectedUserType)
      ),
    [selectedUserType]
  )

  useEffect(() => {
    if (!selectedDemoAccount) return
    setFormData((prev) => ({
      ...prev,
      email: selectedDemoAccount.email,
      password: selectedDemoAccount.password,
    }))
  }, [selectedDemoAccount])

  const handleSubmit = (event) => {
    event.preventDefault()
    const roleMap = {
      government: 'government_admin',
      corporate: 'corporate_cio',
      group: 'group_cfo',
    }
    const role = roleMap[selectedUserType] ?? 'government_admin'
    login({
      role,
      name:
        role === 'government_admin'
          ? 'Government Admin'
          : role === 'corporate_cio'
            ? 'Corporate CIO'
            : 'Group CFO',
      email: formData.email,
    })
    toast.success('Login sukses! Mengarahkan ke dashboard...')
    setTimeout(() => navigate('/dashboard'), 800)
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 lg:flex-row">
      <div className="relative hidden flex-1 flex-col justify-between bg-hero-gradient px-6 py-8 text-white lg:flex lg:px-10 lg:py-12">
        <div className="space-y-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm sm:tracking-[0.4em]"
          >
            ← Back to Landing
          </Link>
          <div>
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
              Akses Triple Integration dalam satu portal terpusat
            </h1>
            <p className="mt-3 max-w-md text-xs text-white/80 sm:text-sm">
              Kelola konektivitas data nasional dengan keamanan tingkat tinggi, monitoring real-time,
              dan orkestrasi workflow lintas entitas.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur sm:rounded-3xl sm:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm sm:tracking-[0.4em]">
              Demo Accounts
            </h2>
            <ul className="mt-3 space-y-2 text-xs text-white/90 sm:mt-4 sm:space-y-3 sm:text-sm">
              {demoAccounts.map((account) => (
                <li key={account.email} className="rounded-xl bg-white/10 px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
                  <span className="font-semibold">{account.role}</span>
                  <p className="text-[10px] text-white/80 sm:text-xs">
                    {account.email} / <span className="font-mono">{account.password}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur sm:rounded-3xl sm:p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm sm:tracking-[0.3em]">
            Triple Integration Visualization
          </h3>
          <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
            {userTypes.map((type) => {
              const Icon = type.icon
              return (
                <div key={type.id} className="rounded-xl bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="rounded-xl bg-white/20 p-2 sm:rounded-2xl sm:p-3">
                      <Icon size={16} className="sm:w-5 sm:h-5" />
                    </span>
                    <p className="text-xs font-semibold sm:text-sm">{type.label}</p>
                  </div>
                  <p className="mt-1.5 text-[10px] text-white/70 sm:mt-2 sm:text-xs">{type.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="w-full max-w-md">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
              Login ke Sync.LN Platform
            </h2>
            <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
              Gunakan kredensial demo untuk mengeksplorasi dashboard.
            </p>
          </div>

          <div className="mt-6 space-y-4 sm:mt-8">
            <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
              {userTypes.map((type) => {
                const Icon = type.icon
                const active = selectedUserType === type.id
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedUserType(type.id)}
                    className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 text-center transition sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-left ${
                      active
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-neutral-200 text-neutral-500 hover:border-primary/30 hover:text-primary'
                    }`}
                    >
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">
                      {type.label.split(' ')[0]}
                    </span>
                  </button>
                )
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="text-xs font-semibold text-neutral-600 sm:text-sm">Email / Username</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contoh: admin@gov.id"
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-600 sm:text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="rounded border-neutral-300 text-primary focus:ring-primary/30"
                  />
                  Remember me
                </label>
                <button type="button" className="font-semibold text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-glow-primary transition hover:-translate-y-0.5 hover:shadow-xl sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.4em]"
              >
                Login
              </button>
            </form>

            <div className="rounded-xl border border-dashed border-neutral-200 p-3 text-[10px] text-neutral-500 sm:rounded-2xl sm:p-4 sm:text-xs">
              Tips: Gunakan kredensial demo di panel kiri untuk melihat berbagai perspektif pengguna.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


