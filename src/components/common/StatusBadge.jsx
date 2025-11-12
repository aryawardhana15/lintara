import clsx from 'classnames'

const statusClasses = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  info: 'bg-primary/10 text-primary border-primary/20',
  default: 'bg-neutral-100 text-neutral-600 border-neutral-200',
}

export const StatusBadge = ({ status, className }) => {
  const key = status?.toLowerCase()
  const styles = statusClasses[key] ?? statusClasses.default
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider',
        styles,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}


