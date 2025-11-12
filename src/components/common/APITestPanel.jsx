import { useState } from 'react'
import { Loader2, ShieldCheck, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import { simulateAsync } from '../../utils/helpers'

const initialState = {
  name: '',
  nik: '',
  birthDate: '',
}

export const APITestPanel = () => {
  const [formData, setFormData] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formData.name || !formData.nik || !formData.birthDate) {
      toast.error('Lengkapi seluruh form sebelum verifikasi.')
      return
    }

    setLoading(true)
    setResult(null)
    const toastId = toast.loading('Mengirim permintaan ke Dukcapil...')

    try {
      const response = await simulateAsync(
        {
          status: 'success',
          data: {
            name: formData.name,
            nik: formData.nik,
            birthDate: formData.birthDate,
            address: 'Jl. Merdeka No. 123, Jakarta Pusat',
            responseTime: '<200ms',
            photo:
              'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=80',
          },
        },
        1200
      )
      setResult(response)
      toast.success('Verifikasi berhasil!', { id: toastId })
    } catch (error) {
      toast.error('Verifikasi gagal, silakan coba lagi.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <ShieldCheck className="h-8 w-8 shrink-0 text-primary sm:h-10 sm:w-10" />
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
              Try Live KYC Verification
            </h3>
            <p className="text-xs text-neutral-500 sm:text-sm">
              Simulasi API Dukcapil untuk validasi identitas secara real-time.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
          <div>
            <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 sm:text-sm">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Siti Rahmawati"
              className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 sm:text-sm">
              NIK (16 digit)
            </label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              placeholder="3210123456789012"
              maxLength={16}
              className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 sm:text-sm">
              Tanggal Lahir
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-glow-primary transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-sm sm:tracking-widest"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" />
              Verifying...
            </>
          ) : (
            'Verify Real-time'
          )}
        </button>

        <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-wide text-neutral-400 sm:mt-3 sm:text-xs">
          Rata-rata respon &lt;200ms
        </p>
      </form>

      <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 shadow-inner dark:border-primary/50 dark:bg-primary/10 sm:rounded-3xl sm:p-6">
        {!result && !loading && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 text-center sm:min-h-[300px] sm:gap-3">
            <ShieldCheck className="h-10 w-10 text-primary sm:h-12 sm:w-12" />
            <p className="text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
              Masukkan identitas untuk melihat hasil verifikasi di sini
            </p>
          </div>
        )}

        {loading && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 text-center sm:min-h-[300px] sm:gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary sm:h-12 sm:w-12" />
            <p className="text-xs font-semibold text-primary sm:text-sm">
              Menghubungkan ke gateway Dukcapil...
            </p>
          </div>
        )}

        {result && result.status === 'success' && (
          <div className="flex min-h-[200px] flex-col gap-3 sm:min-h-[300px] sm:gap-4">
            <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-lg dark:bg-neutral-950/80 sm:gap-3 sm:rounded-2xl sm:p-4">
              <img
                src={result.data.photo}
                alt="Profile"
                className="h-12 w-12 rounded-xl object-cover shadow-md sm:h-16 sm:w-16 sm:rounded-2xl"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base lg:text-lg">
                  {result.data.name}
                </h4>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-success sm:text-xs">
                  Verified Resident
                </p>
              </div>
            </div>

            <div className="space-y-2 rounded-xl bg-white/80 p-3 text-xs shadow-inner dark:bg-neutral-950/50 sm:space-y-3 sm:rounded-2xl sm:p-4 sm:text-sm">
              <div className="flex flex-wrap justify-between gap-1 font-medium text-neutral-600 dark:text-neutral-300 sm:gap-2">
                <span>NIK</span>
                <span className="break-all font-mono">{result.data.nik}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-1 font-medium text-neutral-600 dark:text-neutral-300 sm:gap-2">
                <span>Tanggal Lahir</span>
                <span>{result.data.birthDate}</span>
              </div>
              <div className="flex flex-col gap-1 font-medium text-neutral-600 dark:text-neutral-300 sm:flex-row sm:justify-between sm:gap-2">
                <span>Alamat</span>
                <span className="break-words text-right text-[10px] sm:text-xs">{result.data.address}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1 rounded-lg bg-success/10 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-success sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs">
                <span>Status</span>
                <span>Data match • {result.data.responseTime}</span>
              </div>
            </div>
          </div>
        )}

        {result && result.status === 'error' && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 text-center sm:min-h-[300px] sm:gap-3">
            <AlertTriangle className="h-10 w-10 text-danger sm:h-12 sm:w-12" />
            <p className="text-xs font-semibold text-danger sm:text-sm">
              Data tidak ditemukan. Pastikan identitas sudah benar.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


