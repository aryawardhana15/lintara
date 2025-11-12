import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Activity,
  BellRing,
  ClipboardCheck,
  Fingerprint,
  Network,
  Puzzle,
  Server,
  ShieldCheck,
  Timer,
} from 'lucide-react'
import clsx from 'classnames'
import { formatNumber, formatShortNumber } from '../../utils/helpers'

const iconComponents = {
  Activity,
  BellRing,
  Network,
  Server,
  ShieldCheck,
  ClipboardCheck,
  Puzzle,
  Fingerprint,
  Timer,
}

const toneStyles = {
  primary: {
    accentText: 'text-primary',
    halo: 'bg-primary/10 group-hover:bg-primary/20',
    icon: 'bg-primary/10 text-primary',
    shadow: 'hover:shadow-glow-primary',
  },
  secondary: {
    accentText: 'text-secondary',
    halo: 'bg-secondary/10 group-hover:bg-secondary/20',
    icon: 'bg-secondary/10 text-secondary',
    shadow: 'hover:shadow-glow-secondary',
  },
  accent: {
    accentText: 'text-accent',
    halo: 'bg-accent/10 group-hover:bg-accent/20',
    icon: 'bg-accent/10 text-accent',
    shadow: 'hover:shadow-glow-accent',
  },
}

export const StatCard = ({
  title,
  value,
  trend,
  trendLabel,
  icon = 'Activity',
  format = 'number',
  status,
  tone = 'primary',
}) => {
  const palette = toneStyles[tone] ?? toneStyles.primary
  const IconComponent = iconComponents[icon] ?? Activity
  const formattedValue =
    format === 'currency'
      ? `Rp ${formatShortNumber(value)}`
      : typeof value === 'number'
        ? formatNumber(value)
        : value

  const TrendIcon =
    typeof trend === 'number'
      ? trend >= 0
        ? ArrowUpRight
        : ArrowDownRight
      : Minus

  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur transition hover:-translate-y-1 dark:border-neutral-800/70 dark:bg-neutral-900/60',
        palette.shadow
      )}
    >
      <div
        className={clsx(
          'absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl transition',
          palette.halo
        )}
      />
      <div className="flex items-center justify-between">
        <div>
          <p
            className={clsx(
              'text-sm font-semibold uppercase tracking-[0.3em]',
              palette.accentText
            )}
          >
            {title}
          </p>
          <div className="mt-3 flex items-end gap-3">
            <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              {formattedValue}
            </h3>
            {status && (
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-success">
                {status}
              </span>
            )}
          </div>
        </div>
        <span
          className={clsx(
            'flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner',
            palette.icon
          )}
        >
          <IconComponent size={28} strokeWidth={1.6} />
        </span>
      </div>
      {trendLabel && (
        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <span
            className={clsx(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide',
              typeof trend === 'number'
                ? trend >= 0
                  ? 'bg-success/10 text-success'
                  : 'bg-danger/10 text-danger'
                : 'bg-neutral-100 text-neutral-500'
            )}
          >
            <TrendIcon size={14} />
            {typeof trend === 'number' && <span>{Math.abs(trend)}%</span>}
          </span>
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  )
}

