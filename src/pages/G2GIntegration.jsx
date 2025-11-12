import { useMemo, useState } from 'react'
import { Building, Plus, RefreshCcw, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { agencies } from '../data/mockAgencies'
import { StatusBadge } from '../components/common/StatusBadge'
import { Modal } from '../components/common/Modal'
import { simulateAsync } from '../utils/helpers'

const dataTypes = [
  { value: 'nik', label: 'NIK Verification' },
  { value: 'bpjs', label: 'BPJS Membership' },
  { value: 'business-license', label: 'Business License Validation' },
]

export const G2GIntegration = () => {
  const [sourceAgency, setSourceAgency] = useState(agencies[0].id)
  const [destinationAgency, setDestinationAgency] = useState(agencies[1].id)
  const [selectedDataType, setSelectedDataType] = useState(dataTypes[0].value)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const sourceOptions = useMemo(
    () => agencies.filter((agency) => agency.id !== destinationAgency),
    [destinationAgency]
  )

  const destinationOptions = useMemo(
    () => agencies.filter((agency) => agency.id !== sourceAgency),
    [sourceAgency]
  )

  const handleSimulate = async () => {
    setLoading(true)
    setResponse(null)
    const toastId = toast.loading('Mengirim request simulasi...')
    try {
      const simulated = await simulateAsync(
        {
          status: 'success',
          latency: 840,
          payload: {
            type: selectedDataType,
            source: sourceAgency,
            destination: destinationAgency,
            data: {
              nik: '3210123456789012',
              name: 'Siti Rahmawati',
              status: 'Valid',
              lastUpdated: '2025-11-12T07:32:15Z',
            },
          },
        },
        1400
      )
      setResponse(simulated)
      toast.success('Simulasi berhasil!', { id: toastId })
    } catch (error) {
      toast.error('Terjadi kesalahan saat simulasi.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const handleNewIntegration = (event) => {
    event.preventDefault()
    toast.success('Permintaan integrasi baru dikirim ke tim compliance.')
    setModalOpen(false)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs sm:tracking-[0.4em]">
            Government-to-Government Integration
          </p>
          <h2 className="mt-1.5 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:mt-2 sm:text-2xl lg:text-3xl">
            SPBE Compliance & Inter-Agency Data Exchange
          </h2>
          <p className="mt-1.5 max-w-2xl text-xs text-neutral-500 sm:mt-2 sm:text-sm">
            Kelola koneksi antar instansi pemerintah dengan orkestrasi API terstandarisasi, audit
            trail lengkap, dan monitoring real-time.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-glow-primary transition hover:-translate-y-0.5 hover:shadow-xl sm:gap-2 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.4em]"
        >
          <Plus size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Connect New Agency</span>
          <span className="sm:hidden">Connect</span>
        </button>
      </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {agencies.map((agency) => (
          <div
            key={agency.id}
            className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg shadow-primary/10 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                  {agency.acronym}
                </p>
                <h3 className="mt-1.5 truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:mt-2 sm:text-base lg:text-lg">
                  {agency.name}
                </h3>
              </div>
              <span className="ml-2 shrink-0 rounded-xl bg-primary/10 p-2 text-primary sm:rounded-2xl sm:p-3">
                <Building size={16} className="sm:w-5 sm:h-5" />
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-500 sm:mt-4 sm:text-xs">
              <span>Last sync</span>
              <span className="truncate pl-2">{new Date(agency.lastSync).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">
              <StatusBadge status={agency.status} />
              <div className="rounded-full bg-secondary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-secondary sm:px-3 sm:py-1 sm:text-xs">
                SDI {agency.compliance}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <ShieldCheck className="h-8 w-8 shrink-0 text-secondary sm:h-10 sm:w-10" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
                SPBE Compliance
              </h3>
              <p className="text-xs text-neutral-500 sm:text-sm">Pemenuhan standar Sistem Pemerintahan Berbasis Elektronik.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 dark:text-neutral-300 sm:text-sm">
                <span>SDI Compliance</span>
                <span>85%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 sm:mt-2 sm:h-3">
                <div className="h-full rounded-full bg-secondary" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="rounded-xl bg-success/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-success sm:rounded-2xl sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.3em]">
              Data Readiness: Good
            </div>
            <div className="rounded-xl bg-primary/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:rounded-2xl sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.3em]">
              SPBE Level 3
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
            Live Data Exchange Demo
          </h3>
          <p className="mt-1 text-xs text-neutral-500 sm:mt-2 sm:text-sm">
            Simulasikan permintaan data antar instansi untuk melihat respon waktu nyata.
          </p>
          <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                Source Agency
              </label>
              <select
                value={sourceAgency}
                onChange={(event) => setSourceAgency(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              >
                {sourceOptions.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                Destination Agency
              </label>
              <select
                value={destinationAgency}
                onChange={(event) => setDestinationAgency(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
              >
                {destinationOptions.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 sm:mt-4">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
              Data Type
            </label>
            <select
              value={selectedDataType}
              onChange={(event) => setSelectedDataType(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            >
              {dataTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSimulate}
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-glow-primary transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:w-auto sm:gap-2 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.4em]"
          >
            <RefreshCcw size={14} className={loading ? 'animate-spin sm:w-4 sm:h-4' : 'sm:w-4 sm:h-4'} />
            {loading ? 'Simulating...' : 'Simulate Request'}
          </button>

          <div className="mt-4 rounded-xl border border-dashed border-neutral-200 bg-neutral-50/60 p-4 text-xs dark:border-neutral-700 dark:bg-neutral-900/40 sm:mt-6 sm:rounded-2xl sm:p-6 sm:text-sm">
            {!response && (
              <p className="text-xs text-neutral-500 sm:text-sm">
                Hasil respon akan tampil di sini. Waktu respon rata-rata &lt;1s.
              </p>
            )}
            {response && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <StatusBadge status="Success" />
                  <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-secondary sm:px-3 sm:py-1 sm:text-xs">
                    {response.latency} ms
                  </span>
                </div>
                <pre className="overflow-x-auto rounded-xl bg-neutral-900 p-3 text-[9px] text-neutral-100 sm:rounded-2xl sm:p-4 sm:text-xs">
                  {JSON.stringify(response.payload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Connect New Agency"
        actions={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="rounded-full border border-neutral-200 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500"
            >
              Cancel
            </button>
            <button
              form="new-integration"
              type="submit"
              className="rounded-full bg-primary px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-glow-primary"
            >
              Submit Request
            </button>
          </>
        }
      >
        <form id="new-integration" onSubmit={handleNewIntegration} className="space-y-4 text-sm">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Agency Name
            </label>
            <input
              required
              type="text"
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Integration Scope
            </label>
            <textarea
              required
              rows={3}
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Data Category
              </label>
              <select className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200">
                <option>Identitas Kependudukan</option>
                <option>Jaminan Sosial</option>
                <option>Perizinan</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Urgency
              </label>
              <select className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200">
                <option>Normal</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}


