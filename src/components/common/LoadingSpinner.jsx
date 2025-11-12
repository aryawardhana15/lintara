import { Loader2 } from 'lucide-react'

export const LoadingSpinner = ({ label = 'Memuat data...' }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-neutral-200 px-6 py-14 text-center dark:border-neutral-700">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="text-sm font-medium text-neutral-500">{label}</p>
  </div>
)


