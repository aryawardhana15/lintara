import { useState } from 'react'
import { BadgeCheck, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { APITestPanel } from '../components/common/APITestPanel'
import { ChartWidget } from '../components/common/ChartWidget'
import { governmentAPIs } from '../data/mockAPIs'
import { apiUsageByType, responseTimeTrend } from '../data/mockStats'
import { simulateAsync } from '../utils/helpers'

const complianceCards = [
  {
    id: 'ojk',
    title: 'OJK Reporting',
    status: 'Up to date',
    description: 'Pelaporan reguler ke OJK terotomasi setiap hari kerja.',
  },
  {
    id: 'bi',
    title: 'BI Integration',
    status: 'Active',
    description: 'Integrasi pembayaran real-time ke Bank Indonesia.',
  },
  {
    id: 'bpom',
    title: 'BPOM Sync',
    status: 'Daily',
    description: 'Sinkronisasi data registrasi produk & perizinan harian.',
  },
]

export const G2BIntegration = () => {
  const [activeApi, setActiveApi] = useState(governmentAPIs[0].id)
  const [activating, setActivating] = useState(false)

  const handleActivate = async (apiId) => {
    setActivating(true)
    toast.loading('Mengaktifkan akses API...')
    const result = await simulateAsync({ status: 'success', apiId }, 1200)
    setActiveApi(result.apiId)
    toast.success('API berhasil diaktifkan!')
    setActivating(false)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-1.5 sm:space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs sm:tracking-[0.4em]">
          Government-to-Business Integration
        </p>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl lg:text-3xl">
          Real-time Access to Government Data APIs
        </h2>
        <p className="text-xs text-neutral-500 sm:text-sm">
          Portal terpadu bagi BUMN & korporat untuk mengakses data pemerintah secara terstandarisasi,
          aman, dan scalable.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {governmentAPIs.map((api) => (
          <div
            key={api.id}
            className={`rounded-2xl border p-4 shadow-lg transition hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-6 ${
              activeApi === api.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-neutral-100 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold sm:text-base lg:text-lg">{api.name}</h3>
              <BadgeCheck size={16} className={`shrink-0 sm:w-5 sm:h-5 ${activeApi === api.id ? 'text-primary' : 'text-neutral-300'}`} />
            </div>
            <p className="mt-1.5 text-xs sm:mt-2 sm:text-sm">{api.description}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em] sm:mt-4 sm:text-xs sm:tracking-[0.3em]">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary sm:px-3 sm:py-1">
                {api.status}
              </span>
              <span className="text-neutral-400">Latency {api.responseTime}</span>
            </div>
            <button
              onClick={() => handleActivate(api.id)}
              disabled={activating}
              className={`mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition sm:mt-6 sm:w-auto sm:gap-2 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em] ${
                activeApi === api.id
                  ? 'bg-white text-primary shadow-glow-primary'
                  : 'border border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              <Zap size={14} className="sm:w-4 sm:h-4" />
              <span className="truncate">{activating ? 'Processing...' : api.status === 'Active' ? 'Test API' : 'Activate'}</span>
            </button>
          </div>
        ))}
      </div>

      <APITestPanel />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {complianceCards.map((card) => (
          <div
            key={card.id}
            className="space-y-2 rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg shadow-primary/5 dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-3 sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base lg:text-lg">
                {card.title}
              </h3>
              <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-success sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.3em]">
                {card.status}
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <ChartWidget
          type="bar"
          title="API Calls by Type"
          description="Distribusi penggunaan API pemerintah berdasarkan jenis layanan."
          data={apiUsageByType}
          dataKey="value"
          color="#0066CC"
        />
        <ChartWidget
          type="line"
          title="Response Time Trend"
          description="Tren waktu respon API selama 12 bulan terakhir."
          data={responseTimeTrend}
          dataKey="value"
          color="#00A86B"
          gradientId="responseGradient"
        />
      </div>
    </div>
  )
}


