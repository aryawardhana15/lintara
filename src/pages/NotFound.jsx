import { Link } from 'react-router-dom'

export const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">404</p>
    <h1 className="mt-4 text-4xl font-semibold text-neutral-900">Halaman tidak ditemukan</h1>
    <p className="mt-2 max-w-md text-sm text-neutral-500">
      Maaf, halaman yang Anda cari tidak tersedia. Silakan kembali ke beranda atau buka dashboard.
    </p>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Link
        to="/"
        className="rounded-full border border-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-white"
      >
        Kembali ke Landing
      </Link>
      <Link
        to="/dashboard"
        className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-glow-primary transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        Buka Dashboard
      </Link>
    </div>
  </div>
)


