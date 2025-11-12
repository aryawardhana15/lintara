import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Landmark,
  Layers,
  Store,
  Settings,
  ListChecks,
  Menu,
  X,
  Star,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import clsx from 'classnames'
import { Logo } from '../common/Logo'
import { useAuth } from '../../context/AuthContext'

const navigationConfig = {
  government_admin: [
    { name: 'Dashboard Overview', to: '/dashboard', icon: LayoutDashboard },
    {
      name: 'G2G Integration',
      to: '/dashboard/g2g',
      icon: Landmark,
      highlight: true,
      children: [
        { label: 'Connected Agencies' },
        { label: 'Integration Requests' },
        { label: 'SPBE Compliance' },
      ],
    },
    { name: 'API Marketplace', to: '/dashboard/api-marketplace', icon: Store },
    { name: 'Audit & Log', to: '/dashboard/audit', icon: ListChecks },
    { name: 'Settings', to: '/dashboard/settings', icon: Settings },
  ],
  corporate_cio: [
    { name: 'Dashboard Overview', to: '/dashboard', icon: LayoutDashboard },
    {
      name: 'G2B Integration',
      to: '/dashboard/g2b',
      icon: Building2,
      highlight: true,
      children: [
        { label: 'Available APIs' },
        { label: 'Live KYC Demo' },
        { label: 'API Usage Stats' },
        { label: 'Compliance Dashboard' },
      ],
    },
    { name: 'API Marketplace', to: '/dashboard/api-marketplace', icon: Store },
    { name: 'Audit & Log', to: '/dashboard/audit', icon: ListChecks },
    { name: 'Settings', to: '/dashboard/settings', icon: Settings },
  ],
  group_cfo: [
    { name: 'Dashboard Overview', to: '/dashboard', icon: LayoutDashboard },
    {
      name: 'B2B Integration',
      to: '/dashboard/b2b',
      icon: Layers,
      highlight: true,
      children: [
        { label: 'Subsidiary Overview' },
        { label: 'Financial Consolidation' },
        { label: 'Master Data Management' },
        { label: 'Unified Procurement' },
        { label: 'Cross-PT Workflow' },
        { label: 'Group Compliance' },
      ],
    },
    {
      name: 'G2B Integration',
      to: '/dashboard/g2b',
      icon: Building2,
      optional: true,
    },
    { name: 'API Marketplace', to: '/dashboard/api-marketplace', icon: Store },
    { name: 'Audit & Log', to: '/dashboard/audit', icon: ListChecks },
    { name: 'Settings', to: '/dashboard/settings', icon: Settings },
  ],
}

export const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const { role } = useAuth()

  const navigationItems = useMemo(
    () => navigationConfig[role] ?? navigationConfig.government_admin,
    [role]
  )

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-neutral-200 bg-white/95 px-4 py-6 backdrop-blur transition-transform duration-300 dark:border-neutral-800 dark:bg-neutral-950/95 lg:translate-x-0 sm:px-6 sm:py-8',
          open ? 'translate-x-0' : '-translate-x-full lg:-translate-x-0'
        )}
      >
        <div className="flex items-center justify-between">
          <Logo compact />
          <button
            className="rounded-full border border-neutral-200 p-2 text-neutral-500 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={16} />
          </button>
        </div>
        <nav className="mt-6 space-y-3 lg:mt-10 lg:space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.name} className="space-y-2">
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      'group flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm',
                      isActive
                        ? 'bg-primary text-white shadow-glow-primary'
                        : 'text-neutral-500 hover:bg-primary/10 hover:text-primary'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={clsx(
                          'inline-flex h-8 w-8 items-center justify-center rounded-lg border transition sm:h-9 sm:w-9 sm:rounded-xl',
                          isActive
                            ? 'border-white/20 bg-white/10 text-white'
                            : 'border-neutral-200 bg-white text-neutral-400 group-hover:border-primary/30 group-hover:text-primary'
                        )}
                      >
                        <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </span>
                      <span className="flex flex-1 items-center gap-1.5 sm:gap-2">
                        <span className="truncate">{item.name}</span>
                        {item.highlight && (
                          <span className="hidden shrink-0 items-center gap-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] sm:inline-flex sm:px-2 sm:text-[10px]">
                            <Star size={10} className="sm:w-3 sm:h-3" />
                            <span className="hidden sm:inline">Focus</span>
                          </span>
                        )}
                        {item.optional && (
                          <span className="hidden shrink-0 rounded-full border border-white/30 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-white/70 sm:inline-block sm:px-2 sm:text-[10px]">
                            Optional
                          </span>
                        )}
                      </span>
                    </>
                  )}
                </NavLink>
                {item.children && (
                  <div className="space-y-1 pl-2 sm:pl-4">
                    {item.children.map((child) => (
                      <div
                        key={child.label}
                        className="flex items-center gap-1.5 rounded-xl border border-dashed border-neutral-200 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:border-neutral-800 sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-2 sm:text-xs sm:tracking-[0.3em]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-primary/60 sm:h-1.5 sm:w-1.5" />
                        <span className="truncate">{child.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-primary/10 p-3 text-[10px] font-semibold uppercase tracking-wide text-primary sm:rounded-3xl sm:p-4 sm:text-xs">
          Versi Preview • Data tersinkronisasi real-time
        </div>
      </aside>
      <button
        className="fixed left-3 top-4 z-20 rounded-full border border-neutral-200 bg-white p-2.5 text-neutral-500 shadow-lg transition hover:text-primary lg:hidden sm:left-4 sm:top-6 sm:p-2"
        onClick={() => setOpen(true)}
      >
        <Menu size={18} />
      </button>
    </>
  )
}


