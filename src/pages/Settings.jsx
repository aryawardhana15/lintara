import { useState } from 'react'
import { Bell, ShieldCheck, User } from 'lucide-react'
import toast from 'react-hot-toast'

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    alerts: true,
    audit: true,
    weekly: false,
  })

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs sm:tracking-[0.4em]">
          Settings
        </p>
        <h2 className="mt-1.5 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:mt-2 sm:text-2xl lg:text-3xl">
          Personalisasi notifikasi dan keamanan akun Anda.
        </h2>
      </div>

      <div className="space-y-4 rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-6 sm:rounded-3xl sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <User className="h-8 w-8 shrink-0 text-primary sm:h-10 sm:w-10" />
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
              Profil Akun
            </h3>
            <p className="text-xs text-neutral-500 sm:text-sm">
              Update informasi profil dan preferensi komunikasi.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
              Nama Lengkap
            </label>
            <input
              defaultValue="Lintara Admin"
              className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
              Email
            </label>
            <input
              defaultValue="admin@gov.id"
              className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 sm:mt-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={() => toast.success('Perubahan profil tersimpan')}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-glow-primary sm:w-auto sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.4em]"
        >
          Simpan Perubahan
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-4 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Bell className="h-8 w-8 shrink-0 text-accent sm:h-10 sm:w-10" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
                Notifikasi
              </h3>
              <p className="text-xs text-neutral-500 sm:text-sm">
                Atur notifikasi yang ingin Anda terima.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-neutral-500 sm:space-y-3 sm:text-sm">
            {Object.entries(notifications).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2.5 dark:bg-neutral-900/60 sm:rounded-2xl sm:px-4 sm:py-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:text-xs sm:tracking-[0.3em]">
                  {key === 'alerts'
                    ? 'Critical Alerts'
                    : key === 'audit'
                      ? 'Audit Digest'
                      : 'Weekly Summary'}
                </span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleNotification(key)}
                  className="h-3.5 w-3.5 rounded border-neutral-300 text-primary focus:ring-primary/30 sm:h-4 sm:w-4"
                />
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-4 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <ShieldCheck className="h-8 w-8 shrink-0 text-secondary sm:h-10 sm:w-10" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
                Keamanan
              </h3>
              <p className="text-xs text-neutral-500 sm:text-sm">
                Kuatkan keamanan dengan MFA dan pengaturan sesi.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-neutral-500 sm:space-y-3 sm:text-sm">
            <button className="w-full rounded-xl border border-primary px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white sm:rounded-2xl sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.3em]">
              Aktifkan Multi-Factor Authentication
            </button>
            <button className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 transition hover:border-primary hover:text-primary sm:rounded-2xl sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.3em]">
              Kelola Sesi Aktif
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


