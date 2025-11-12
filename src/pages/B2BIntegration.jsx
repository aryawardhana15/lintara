import { useMemo, useState } from 'react'
import { Download, FileSpreadsheet, Shield } from 'lucide-react'
import { subsidiaries } from '../data/mockSubsidiaries'
import { subsidiaryRevenue } from '../data/mockStats'
import { ChartWidget } from '../components/common/ChartWidget'
import { StatusBadge } from '../components/common/StatusBadge'
import { formatCurrency, formatNumber } from '../utils/helpers'

const bigNumbers = [
  {
    label: 'Total Group Revenue (Real-time)',
    value: 125_400_000_000_000,
    highlight: 'vs 3 Minggu sebelumnya',
  },
  {
    label: 'Total Profit',
    value: 18_700_000_000_000,
    highlight: 'Margin 14.8%',
  },
  {
    label: 'Total Assets',
    value: 450_200_000_000_000,
    highlight: 'Growth 9.2%',
  },
  {
    label: 'Consolidation Time',
    value: '1 Day',
    highlight: 'Sebelumnya 3 Weeks',
  },
]

const mdmCategories = {
  employees: {
    label: 'Employees',
    stats: [
      { label: 'Total Employees', value: formatNumber(45320) },
      { label: 'Duplicate Records', value: '0', badge: 'Cleaned' },
      { label: 'Data Quality Score', value: '98%' },
    ],
  },
  customers: {
    label: 'Customers',
    stats: [
      { label: 'Active Customers', value: formatNumber(126_450) },
      { label: 'Segmentation Coverage', value: '96%' },
      { label: 'Data Quality Score', value: '97%' },
    ],
  },
  vendors: {
    label: 'Vendors',
    stats: [
      { label: 'Verified Vendors', value: formatNumber(8_320) },
      { label: 'Duplicate Records', value: '3', badge: 'Review' },
      { label: 'Spend Coverage', value: '88%' },
    ],
  },
  products: {
    label: 'Products',
    stats: [
      { label: 'Active SKUs', value: formatNumber(32_540) },
      { label: 'Duplicate Records', value: '21', badge: 'In Progress' },
      { label: 'Data Quality Score', value: '95%' },
    ],
  },
}

const procurementTrend = [
  { name: 'Jan', volume: 42, price: 86 },
  { name: 'Feb', volume: 48, price: 82 },
  { name: 'Mar', volume: 51, price: 79 },
  { name: 'Apr', volume: 55, price: 75 },
  { name: 'Mei', volume: 63, price: 70 },
  { name: 'Jun', volume: 65, price: 68 },
]

const workflowSteps = [
  { label: 'PT A Request', status: 'Completed' },
  { label: 'PT B Review', status: 'Completed' },
  { label: 'Holding Approval', status: 'In Progress' },
  { label: 'Completed', status: 'Pending' },
]

export const B2BIntegration = () => {
  const [selectedCategory, setSelectedCategory] = useState('employees')

  const mdm = useMemo(() => mdmCategories[selectedCategory], [selectedCategory])

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-1.5 sm:space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs sm:tracking-[0.4em]">
          Business-to-Business Integration
        </p>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl lg:text-3xl">
          Group Consolidation & Master Data Management
        </h2>
        <p className="text-xs text-neutral-500 sm:text-sm">
          Integrasi lintas anak perusahaan untuk memastikan data konsolidasi keuangan, operasional,
          dan procurement berjalan mulus dalam satu platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {bigNumbers.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg shadow-primary/5 transition hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
              {item.label}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100 sm:mt-3 sm:text-xl lg:text-2xl">
              {typeof item.value === 'number' ? formatCurrency(item.value) : item.value}
            </h3>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-success sm:mt-2 sm:text-xs sm:tracking-[0.3em]">
              {item.highlight}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartWidget
            type="stacked-bar"
            title="Revenue per Subsidiary"
            description="Distribusi revenue per anak perusahaan berdasarkan sumber utama."
            data={subsidiaryRevenue}
            keys={['core', 'support', 'innovation']}
            colors={['#0066CC', '#00A86B', '#FF6B35']}
          />
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Shield className="h-8 w-8 shrink-0 text-secondary sm:h-10 sm:w-10" />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base lg:text-lg">
                Consolidated Report Generator
              </h3>
              <p className="text-xs text-neutral-500 sm:text-sm">Unduh laporan keuangan terintegrasi.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                Date Range
              </label>
              <input
                type="text"
                defaultValue="Q1 2024"
                className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                Report Type
              </label>
              <select className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                <option>Financial</option>
                <option>Operational</option>
                <option>Tax</option>
              </select>
            </div>
            <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-glow-primary sm:w-auto sm:gap-2 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.4em]">
              <Download size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Generate Consolidated Report</span>
              <span className="sm:hidden">Generate</span>
            </button>
            <p className="text-[10px] text-neutral-400 sm:text-xs">File akan tersedia dalam format PDF & XLSX.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-4 sm:rounded-3xl sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
                Subsidiary Companies
              </h3>
              <p className="text-xs text-neutral-500 sm:text-sm">
                Monitoring status integrasi dan sinkronisasi teranyar.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.3em]">
              Real-time
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {subsidiaries.map((company) => (
              <div
                key={company.id}
                className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-3 dark:border-neutral-800 dark:bg-neutral-900/60 sm:rounded-2xl sm:p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-neutral-800 dark:text-neutral-100 sm:text-sm">
                      {company.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                      {company.industry}
                    </p>
                  </div>
                  <StatusBadge status={company.status} />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 sm:mt-4 sm:text-xs">
                  <span>Last sync</span>
                  <span className="truncate pl-2">{new Date(company.lastSync).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="mt-2 rounded-xl bg-white/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary shadow-inner dark:bg-neutral-900/80 sm:mt-3 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.3em]">
                  Revenue {formatCurrency(company.revenue)}
                </div>
                <button className="mt-2 w-full rounded-lg border border-primary px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white sm:mt-3 sm:rounded-xl sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em]">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-4 sm:rounded-3xl sm:p-6">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
            Master Data Management
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {Object.entries(mdmCategories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em] ${
                  selectedCategory === key
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-primary/10 hover:text-primary dark:bg-neutral-800 dark:text-neutral-300'
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
          <div className="space-y-2 rounded-xl bg-neutral-50/80 p-3 dark:bg-neutral-900/60 sm:space-y-3 sm:rounded-2xl sm:p-4">
            {mdm.stats.map((stat) => (
              <div key={stat.label} className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">{stat.label}</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                  {stat.value}
                  {stat.badge && (
                    <span className="ml-2 rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-success sm:ml-3 sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.3em]">
                      {stat.badge}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-primary px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white sm:w-auto sm:gap-2 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em]">
            <FileSpreadsheet size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View MDM Dashboard</span>
            <span className="sm:hidden">MDM</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <ChartWidget
          type="line"
          title="Group Procurement Volume vs Average Price"
          description="Efisiensi procurement terukur melalui volume agregat dan penurunan harga rata-rata."
          data={procurementTrend}
          dataKey="price"
          color="#FF6B35"
          gradientId="procurementGradient"
        />
        <div className="space-y-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-4 sm:rounded-3xl sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
              Unified Procurement Dashboard
            </h3>
            <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-success sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.3em]">
              Potential Savings 18%
            </span>
          </div>
          <div className="rounded-xl bg-neutral-50/80 p-3 text-xs text-neutral-500 dark:bg-neutral-900/60 dark:text-neutral-400 sm:rounded-2xl sm:p-4 sm:text-sm">
            <p>Top 3 Items High Savings:</p>
            <ul className="mt-1.5 space-y-0.5 text-[10px] sm:mt-2 sm:space-y-1 sm:text-xs">
              <li>• Cloud Compute Credits - 22% reduction</li>
              <li>• Packaging Materials - 18% reduction</li>
              <li>• Shared Logistics - 15% reduction</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-sm sm:tracking-[0.3em]">
              Cross-PT Workflow
            </h4>
            <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
              {workflowSteps.map((step, index) => (
                <div key={step.label} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900/60 sm:h-10 sm:w-10 sm:text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 sm:text-sm">
                      {step.label}
                    </p>
                    <StatusBadge status={step.status} className="mt-1.5 sm:mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-neutral-200 p-3 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400 sm:rounded-2xl sm:p-4 sm:text-sm">
            3 workflows pending approval hari ini.
          </div>
        </div>
      </div>
    </div>
  )
}


