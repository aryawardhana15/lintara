import { Compass } from 'lucide-react'

export const EmptyState = ({
  icon: Icon = Compass,
  title = 'Belum ada data',
  subtitle = 'Data akan tampil setelah integrasi berjalan.',
  action,
}) => (
  <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-neutral-200 px-8 py-16 text-center dark:border-neutral-700">
    <span className="rounded-full bg-primary/10 p-4 text-primary">
      <Icon size={32} strokeWidth={1.6} />
    </span>
    <div className="space-y-1">
      <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</h4>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>
    </div>
    {action}
  </div>
)


