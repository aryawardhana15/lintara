import { Link } from 'react-router-dom'
import { Landmark } from 'lucide-react'
import clsx from 'classnames'

export const Logo = ({ compact = false, to = '/' }) => {
  return (
    <Link
      to={to}
      className={clsx(
        'flex items-center gap-3 font-heading tracking-wide transition-all duration-300',
        compact ? 'text-lg' : 'text-2xl'
      )}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow-primary">
        <Landmark size={compact ? 18 : 22} strokeWidth={1.6} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-semibold uppercase tracking-[0.3em] text-primary">
          Sync.LN
        </span>
        {!compact && (
          <span className="text-xs font-medium text-neutral-500">
            Triple Integration Platform
          </span>
        )}
      </span>
    </Link>
  )
}


