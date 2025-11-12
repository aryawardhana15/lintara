import { useMemo, useState } from 'react'
import { Filter, Search } from 'lucide-react'
import { marketplaceConnectors } from '../data/mockAPIs'
import { StatusBadge } from '../components/common/StatusBadge'

const categories = [
  'All',
  'Government APIs',
  'ERP Connectors',
  'Industry Modules',
  'Custom Integrations',
]

export const APIMarketplace = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return marketplaceConnectors.filter((connector) => {
      const matchesCategory = category === 'All' || connector.category === category
      const matchesSearch = connector.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-1.5 sm:space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs sm:tracking-[0.4em]">
          API Marketplace
        </p>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl lg:text-3xl">
          Orkestrasi konektor pemerintah, ERP, dan modul industri.
        </h2>
        <p className="text-xs text-neutral-500 sm:text-sm">
          Pilih konektor yang dibutuhkan untuk perluasan integrasi data secara cepat dan aman.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Filter size={16} className="shrink-0 text-primary sm:w-[18px] sm:h-[18px]" />
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em] ${
                category === item
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'bg-neutral-100 text-neutral-500 hover:bg-primary/10 hover:text-primary dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex w-full items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-500 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 sm:max-w-sm sm:gap-3 sm:px-4 sm:py-2 sm:text-sm">
          <Search size={16} className="shrink-0 sm:w-[18px] sm:h-[18px]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari konektor..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((connector) => (
          <div
            key={connector.id}
            className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg shadow-primary/5 transition hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                  {connector.category}
                </p>
                <h3 className="mt-1.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:mt-2 sm:text-base lg:text-lg">
                  {connector.name}
                </h3>
              </div>
              <StatusBadge status={connector.status} />
            </div>
            <p className="mt-2 text-xs text-neutral-500 sm:mt-3 sm:text-sm">{connector.description}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-neutral-400 sm:mt-4 sm:text-xs">
              <span>Rating: {connector.rating.toFixed(1)}★</span>
              <button className="rounded-full border border-primary px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em]">
                {connector.status === 'Active' ? 'Open' : 'Install'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


