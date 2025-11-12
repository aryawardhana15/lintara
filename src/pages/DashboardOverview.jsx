import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Download,
  FileText,
  Fingerprint,
  PlayCircle,
  Share2,
  ShieldCheck,
  SquarePlus,
  Workflow,
} from 'lucide-react'
import { StatCard } from '../components/common/StatCard'
import { ChartWidget } from '../components/common/ChartWidget'
import { DataTable } from '../components/common/DataTable'
import { StatusBadge } from '../components/common/StatusBadge'
import { useAuth } from '../context/AuthContext'
import {
  apiUsageByType,
  integrationDistribution,
  interAgencyExchange,
  responseTimeTrend,
  subsidiaryRevenue,
} from '../data/mockStats'
import { simulateAsync } from '../utils/helpers'

const activityColumns = [
  { key: 'timestamp', header: 'Timestamp', type: 'relative-time', sortable: true },
  { key: 'actor', header: 'User/System', sortable: true },
  { key: 'action', header: 'Action', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  { key: 'channel', header: 'Channel', sortable: true },
]

const recentActivityMock = [
  {
    id: '1',
    timestamp: '2025-11-12T07:32:15Z',
    actor: 'Admin A',
    action: 'Approved integration request',
    status: 'Success',
    channel: 'G2G',
  },
  {
    id: '2',
    timestamp: '2025-11-12T07:10:02Z',
    actor: 'System Bot',
    action: 'Auto-synced financial data',
    status: 'Success',
    channel: 'B2B',
  },
  {
    id: '3',
    timestamp: '2025-11-12T06:50:48Z',
    actor: 'User C',
    action: 'Performed API KYC test',
    status: 'Success',
    channel: 'G2B',
  },
  {
    id: '4',
    timestamp: '2025-11-12T06:20:21Z',
    actor: 'Security Monitor',
    action: 'Latency spike resolved',
    status: 'Resolved',
    channel: 'Platform',
  },
]

const governmentStats = [
  {
    id: 'connected-agencies',
    label: 'Connected Agencies',
    value: 15,
    trend: 6,
    trendLabel: 'vs bulan lalu',
    icon: 'Network',
    tone: 'primary',
  },
  {
    id: 'g2g-api-calls',
    label: 'API Calls Today',
    value: 8432,
    trend: 4,
    trendLabel: '24 jam terakhir',
    icon: 'Server',
    tone: 'primary',
  },
  {
    id: 'spbe-compliance',
    label: 'SPBE Compliance',
    value: '85%',
    trendLabel: 'Target Level 3 tercapai',
    icon: 'ShieldCheck',
    tone: 'primary',
  },
  {
    id: 'pending-approvals',
    label: 'Pending Approvals',
    value: 3,
    trend: -2,
    trendLabel: 'Sejak kemarin',
    icon: 'ClipboardCheck',
    tone: 'primary',
  },
]

const governmentActions = [
  {
    id: 'connect-agency',
    title: 'Connect New Agency',
    description: 'Tambah instansi baru dalam gateway G2G.',
    icon: Share2,
  },
  {
    id: 'spbe-report',
    title: 'View SPBE Report',
    description: 'Lihat kesiapan & maturitas SPBE terkini.',
    icon: FileText,
  },
  {
    id: 'test-integration',
    title: 'Test Integration',
    description: 'Jalankan uji coba API antar instansi.',
    icon: PlayCircle,
  },
]

const corporateStats = [
  {
    id: 'gov-apis-active',
    label: 'Gov APIs Active',
    value: 12,
    trend: 3,
    trendLabel: 'Aktif minggu ini',
    icon: 'Puzzle',
    tone: 'secondary',
  },
  {
    id: 'kyc-calls',
    label: 'KYC Calls Today',
    value: 3521,
    trend: 7,
    trendLabel: 'Volume KYC 24 jam',
    icon: 'Fingerprint',
    tone: 'secondary',
  },
  {
    id: 'response-time',
    label: 'Response Time',
    value: '<150ms',
    trendLabel: 'Latency rata-rata',
    icon: 'Timer',
    tone: 'secondary',
  },
  {
    id: 'success-rate',
    label: 'Success Rate',
    value: '99.8%',
    trendLabel: 'Stabil 7 hari',
    icon: 'ShieldCheck',
    tone: 'secondary',
  },
]

const corporateActions = [
  {
    id: 'test-kyc',
    title: 'Test KYC API',
    description: 'Simulasikan verifikasi identitas real-time.',
    icon: Fingerprint,
  },
  {
    id: 'compliance',
    title: 'View Compliance Status',
    description: 'Pantau SLA & audit kepatuhan terkini.',
    icon: ShieldCheck,
  },
  {
    id: 'request-api',
    title: 'Request New API',
    description: 'Ajukan akses data pemerintah tambahan.',
    icon: SquarePlus,
  },
]

const cfoBigNumbers = [
  {
    id: 'total-revenue',
    label: 'Total Revenue',
    value: 'Rp 125.4 T',
    trend: '+12%',
    tone: 'accent',
  },
  {
    id: 'total-profit',
    label: 'Total Profit',
    value: 'Rp 18.7 T',
    trend: '+8%',
    tone: 'accent',
  },
  {
    id: 'total-assets',
    label: 'Total Assets',
    value: 'Rp 450.2 T',
    trend: '+5%',
    tone: 'accent',
  },
  {
    id: 'consolidation-time',
    label: 'Consolidation Time',
    value: '1 Day',
    badge: 'vs 3 weeks',
    trend: 'Accelerated',
    tone: 'accent',
  },
]

const cfoQuickActions = [
  {
    id: 'generate-report',
    title: 'Generate Consolidated Report',
    icon: Download,
    variant: 'primary',
  },
  {
    id: 'procurement-dashboard',
    title: 'View Procurement Dashboard',
    icon: BarChart3,
    variant: 'outline',
  },
  {
    id: 'group-compliance',
    title: 'Check Compliance Status',
    icon: ShieldCheck,
    variant: 'outline',
  },
  {
    id: 'workflow-approval',
    title: 'Approve Cross-PT Workflow',
    icon: Workflow,
    variant: 'outline',
  },
]

const cfoInsights = [
  {
    id: 'insight-1',
    title: 'AI Alert • Margin Opportunity',
    description:
      'Subsidiary Logistik dapat menghemat 6% biaya distribusi dengan konsolidasi vendor Q4.',
    tag: 'High Impact',
  },
  {
    id: 'insight-2',
    title: 'Recommendation • Working Capital',
    description:
      'Optimalkan cash pooling antar PT, proyeksi peningkatan arus kas Rp1.2 T dalam 45 hari.',
    tag: 'Priority',
  },
  {
    id: 'insight-3',
    title: 'Alert • Compliance Checkpoint',
    description:
      'Audit pajak PT Energi membutuhkan dokumen pelengkap sebelum 20 Nov 2025.',
    tag: 'Action Required',
  },
]

const QuickActionPanel = ({ title, subtitle, actions, accent = 'primary' }) => {
  const palette = {
    primary: {
      border: 'border-primary/20',
      hover: 'hover:border-primary/60 hover:bg-primary/5',
      icon: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white',
      arrow: 'group-hover:text-primary',
    },
    secondary: {
      border: 'border-secondary/20',
      hover: 'hover:border-secondary/60 hover:bg-secondary/5',
      icon: 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white',
      arrow: 'group-hover:text-secondary',
    },
  }[accent]

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">{title}</h3>
      <p className="text-xs text-neutral-500 sm:text-sm">{subtitle}</p>
      <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              className={`group flex w-full items-center gap-2 rounded-xl border px-3 py-3 text-left transition hover:-translate-y-0.5 sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-4 ${palette.border} ${palette.hover}`}
            >
              <span className={`rounded-xl p-2 transition sm:rounded-2xl sm:p-3 ${palette.icon}`}>
                <Icon size={16} className="sm:w-5 sm:h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 sm:text-sm">
                  {action.title}
                </p>
                <p className="text-[10px] text-neutral-500 sm:text-xs">{action.description}</p>
              </div>
              <ArrowRight className={`ml-auto shrink-0 text-neutral-300 transition sm:w-4 sm:h-4 ${palette.arrow}`} size={14} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export const DashboardOverview = () => {
  const { role } = useAuth()
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const data = await simulateAsync(recentActivityMock, 1000)
      setActivities(data)
    }
    loadData()
  }, [])

  const heading = useMemo(() => {
    switch (role) {
      case 'corporate_cio':
        return {
          label: 'G2B Command Center',
          title: 'Kelola akses API pemerintah dengan visibilitas real-time.',
          subtitle:
            'Pantau performa KYC, compliance, dan ketersediaan layanan untuk seluruh bisnis Anda.',
        }
      case 'group_cfo':
        return {
          label: 'Group CFO Control Hub',
          title: 'Orkestrasi konsolidasi finansial dan master data lintas perusahaan.',
          subtitle:
            'Dapatkan wawasan AI untuk keputusan strategis dan percepat siklus closing secara signifikan.',
        }
      default:
        return {
          label: 'G2G Monitoring Center',
          title: 'Kawal integrasi antar instansi dengan kepatuhan SPBE real-time.',
          subtitle:
            'Perkuat layanan publik melalui pertukaran data yang aman, cepat, dan terstandarisasi.',
        }
    }
  }, [role])

  if (role === 'group_cfo') {
    return (
      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        <section className="overflow-hidden rounded-2xl border border-neutral-800 bg-cfo-gradient px-4 py-6 text-neutral-100 shadow-[0_35px_80px_-45px_rgba(0,0,0,0.8)] sm:rounded-3xl sm:px-6 sm:py-8 lg:rounded-[40px] lg:px-8 lg:py-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/80 sm:text-xs sm:tracking-[0.4em]">
            {heading.label}
          </span>
          <div className="mt-3 flex flex-col gap-4 sm:mt-4 sm:gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="max-w-2xl space-y-2 sm:space-y-3 lg:space-y-4">
              <h2 className="text-xl font-semibold leading-tight sm:text-2xl lg:text-3xl">{heading.title}</h2>
              <p className="text-xs text-neutral-300 sm:text-sm">{heading.subtitle}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cfoBigNumbers.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur sm:rounded-3xl sm:p-6"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-300 sm:text-xs sm:tracking-[0.3em]">
                  {card.label}
                </p>
                <div className="mt-2 flex items-end justify-between sm:mt-3">
                  <h3 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">{card.value}</h3>
                  {card.trend && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs sm:tracking-[0.3em]">
                      {card.trend}
                    </span>
                  )}
                </div>
                {card.badge && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:mt-3 sm:gap-2 sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-[0.3em]">
                    {card.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            {cfoQuickActions.map((action) => {
              const Icon = action.icon
              if (action.variant === 'primary') {
                return (
                  <button
                    key={action.id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_25px_55px_-30px_rgba(255,107,53,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-28px_rgba(255,107,53,0.95)] sm:gap-2 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.35em]"
                  >
                    <Icon size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{action.title}</span>
                    <span className="sm:hidden">Report</span>
                  </button>
                )
              }
              return (
                <button
                  key={action.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/60 hover:text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.3em]"
                >
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{action.title}</span>
                  <span className="sm:hidden">{action.title.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </section>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ChartWidget
              type="stacked-bar"
              title="Revenue by Subsidiary"
              description="Kontribusi pendapatan berdasarkan lini bisnis utama tiap entitas."
              data={subsidiaryRevenue}
              keys={['core', 'support', 'innovation']}
              colors={['#0066CC', '#00A86B', '#FF6B35']}
              variant="dark"
              axisColor="#E5E7EB"
              gridColor="#4B5563"
            />
          </div>
          <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4 text-neutral-100 sm:space-y-4 sm:rounded-3xl sm:p-6">
            <h3 className="text-base font-semibold sm:text-lg">AI Insights & Alerts</h3>
            <p className="text-xs text-neutral-400 sm:text-sm">
              Rekomendasi otomatis untuk percepatan keputusan strategis grup.
            </p>
            <div className="space-y-2 sm:space-y-3">
              {cfoInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="space-y-1.5 rounded-xl border border-neutral-800/60 bg-neutral-900/70 p-3 sm:space-y-2 sm:rounded-2xl sm:p-4"
                >
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent/80 sm:text-[11px] sm:tracking-[0.3em]">
                    {insight.tag}
                  </span>
                  <p className="text-xs font-semibold text-neutral-100 sm:text-sm">{insight.title}</p>
                  <p className="text-[10px] text-neutral-400 sm:text-xs">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DataTable
              columns={activityColumns}
              data={activities}
              emptyMessage="Aktivitas lintas PT akan tampil di sini."
            />
          </div>
          <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4 text-neutral-100 sm:space-y-4 sm:rounded-3xl sm:p-6">
            <h3 className="text-base font-semibold text-white sm:text-lg">Group Operations Pulse</h3>
            <div className="rounded-xl bg-success/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-success sm:rounded-2xl sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.3em]">
              Potential Savings: 18%
            </div>
            <div className="space-y-2 text-xs text-neutral-400 sm:space-y-3 sm:text-sm">
              <p>• Procurement vol. meningkat 12% dengan harga rata-rata turun 8%.</p>
              <p>• Zero duplicate pada master data karyawan & pelanggan.</p>
              <p>• 3 workflow cross-PT menunggu persetujuan holding.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (role === 'corporate_cio') {
    return (
      <div className="space-y-6 sm:space-y-8">
        <header>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-secondary sm:text-xs sm:tracking-[0.4em]">
            {heading.label}
          </p>
          <h2 className="mt-1.5 text-xl font-semibold text-neutral-900 sm:mt-2 sm:text-2xl lg:text-3xl">{heading.title}</h2>
          <p className="mt-1.5 text-xs text-neutral-500 sm:mt-2 sm:text-sm">{heading.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {corporateStats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendLabel={stat.trendLabel}
              icon={stat.icon}
              tone={stat.tone}
            />
          ))}
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <ChartWidget
            type="bar"
            title="API Usage by Type"
            description="Volume panggilan API pemerintah berdasarkan kategori layanan."
            data={apiUsageByType}
            dataKey="value"
            color="#00A86B"
            variant="default"
            xKey="name"
          />
          <ChartWidget
            type="line"
            title="Response Time Trend"
            description="Latency rata-rata API selama 12 bulan terakhir."
            data={responseTimeTrend}
            dataKey="value"
            color="#00A86B"
            gradientId="g2bLatency"
            variant="default"
            xKey="name"
          />
          <div className="lg:col-span-2 xl:col-span-1">
            <QuickActionPanel
              title="Quick Actions"
              subtitle="Kelola integrasi G2B secara proaktif."
              actions={corporateActions}
              accent="secondary"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DataTable
              columns={activityColumns}
              data={activities}
              emptyMessage="Belum ada aktivitas terbaru pada integrasi G2B."
            />
          </div>
          <div className="space-y-3 rounded-2xl border border-secondary/20 bg-white p-4 shadow-lg sm:space-y-4 sm:rounded-3xl sm:p-6">
            <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">Compliance Snapshot</h3>
            <div className="rounded-xl bg-secondary/10 p-3 text-xs text-secondary sm:rounded-2xl sm:p-4 sm:text-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">Realtime</p>
              <p className="mt-1.5 font-semibold sm:mt-2">SLA terpenuhi</p>
              <p className="text-[10px] text-secondary/80 sm:text-xs">99.8% keberhasilan KYC hari ini</p>
            </div>
            <div className="space-y-2 text-xs text-neutral-500 sm:space-y-3 sm:text-sm">
              <p>• OSS & BPOM sinkron sesuai jadwal.</p>
              <p>• Audit trail tersimpan untuk 186 transaksi terakhir.</p>
              <p>• Tidak ada pelanggaran rate-limit 48 jam terakhir.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs sm:tracking-[0.4em]">
          {heading.label}
        </p>
        <h2 className="mt-1.5 text-xl font-semibold text-neutral-900 sm:mt-2 sm:text-2xl lg:text-3xl">{heading.title}</h2>
        <p className="mt-1.5 text-xs text-neutral-500 sm:mt-2 sm:text-sm">{heading.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {governmentStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.label}
            value={stat.value}
            trend={stat.trend}
            trendLabel={stat.trendLabel}
            icon={stat.icon}
            tone={stat.tone}
            status={stat.status}
          />
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <ChartWidget
          type="line"
          title="Inter-Agency Data Exchange (7 hari)"
          description="Tren permintaan dan respon antar instansi pemerintah dalam sepekan."
          data={interAgencyExchange}
          dataKey="value"
          color="#0066CC"
          gradientId="g2gExchange"
          variant="default"
          xKey="day"
        />
        <ChartWidget
          type="donut"
          title="Integration by Type"
          description="Distribusi integrasi aktif: G2G, G2B, dan B2B."
          data={integrationDistribution}
          variant="default"
        />
        <div className="lg:col-span-2 xl:col-span-1">
          <QuickActionPanel
            title="Quick Actions"
            subtitle="Lakukan tindakan cepat untuk menjaga layanan publik."
            actions={governmentActions}
            accent="primary"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DataTable
            columns={activityColumns}
            data={activities}
            emptyMessage="Aktivitas integrasi antar instansi akan tampil di sini."
          />
        </div>
        <div className="space-y-3 rounded-2xl border border-primary/20 bg-white p-4 shadow-lg sm:space-y-4 sm:rounded-3xl sm:p-6">
          <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">SPBE Performance</h3>
          <div className="rounded-xl bg-primary/10 p-3 text-xs text-primary sm:rounded-2xl sm:p-4 sm:text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">Realtime</p>
            <p className="mt-1.5 font-semibold sm:mt-2">Semua layanan aktif</p>
            <p className="text-[10px] text-primary/80 sm:text-xs">Latency rata-rata &lt; 1s</p>
          </div>
          <div className="space-y-2 text-xs text-neutral-500 sm:space-y-3 sm:text-sm">
            <p>• Auto-scaling aktif menghadapi lonjakan 28% API call.</p>
            <p>• Audit trail terenkripsi di pusat data pemerintah.</p>
            <p>• SPBE Level 3: 85% indikator utama terpenuhi.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

