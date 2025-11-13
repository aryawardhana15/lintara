import { Bell, ChevronsDown, Moon, SunMedium } from 'lucide-react'
import { useMemo, useState } from 'react'
import clsx from 'classnames'
import { SearchBar } from '../common/SearchBar'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useAuth } from '../../context/AuthContext'

export const Topbar = () => {
  const [isDark, setIsDark] = useDarkMode()
  const [notifications] = useState(6)
  const { user, role } = useAuth()

  const roleLabel = useMemo(
    () =>
      ({
        government_admin: 'Government Admin',
        corporate_cio: 'Corporate CIO',
        group_cfo: 'Group CFO',
      })[role] ?? 'Sync.LN Admin',
    [role]
  )

  const wrapperClass =
    role === 'group_cfo'
      ? 'border-neutral-800 bg-neutral-900/80 text-neutral-100'
      : role === 'corporate_cio'
        ? 'border-secondary/30 bg-white/80 text-neutral-900'
        : 'border-neutral-100 bg-white/70 text-neutral-900'

  const profileClass =
    role === 'group_cfo'
      ? 'border-neutral-800 bg-neutral-900/70 text-neutral-200'
      : 'border-neutral-200 bg-white text-neutral-600'

  return (
    <div
      className={clsx(
        'sticky top-0 z-20 border-b px-3 py-3 backdrop-blur sm:px-6 sm:py-4',
        wrapperClass
      )}
    >
      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar onSearch={(value) => console.log('search', value)} />

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsDark((value) => !value)}
            className="rounded-full border border-neutral-200 p-2 text-neutral-500 transition hover:border-primary/40 hover:text-primary dark:border-neutral-700 dark:text-neutral-300"
            title="Toggle theme"
          >
            {isDark ? <SunMedium size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
          </button>
          <button className="relative rounded-xl border border-neutral-200 bg-white p-2 text-neutral-500 transition hover:border-primary/40 hover:text-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 sm:rounded-2xl sm:p-3">
            <Bell size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white shadow-lg sm:-right-1 sm:-top-1 sm:h-5 sm:w-5 sm:text-[10px]">
              {notifications}
            </span>
          </button>
          <div
            className={clsx(
              'flex items-center gap-2 rounded-xl border px-2 py-1.5 text-xs shadow-sm sm:gap-3 sm:rounded-2xl sm:px-3 sm:py-2 sm:text-sm',
              profileClass,
              role === 'group_cfo'
                ? 'shadow-[0_14px_35px_-20px_rgba(255,107,53,0.45)]'
                : ''
            )}
          >
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=60"
              alt="User avatar"
              className="h-8 w-8 rounded-xl object-cover sm:h-10 sm:w-10 sm:rounded-2xl"
            />
            <div className="hidden leading-tight sm:block">
              <p className="font-semibold text-neutral-800 dark:text-neutral-100">
                {user?.name ?? 'Sync.LN Admin'}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{roleLabel}</p>
            </div>
            <ChevronsDown size={14} className="hidden text-neutral-400 sm:block sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}


