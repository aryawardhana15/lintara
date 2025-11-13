import { useMemo, useState } from 'react'
import { Calendar, Download } from 'lucide-react'
import { DataTable } from '../components/common/DataTable'
import { auditLogs } from '../data/mockAuditLogs'
import { generateActivityHeatmap } from '../utils/helpers'
import { StatusBadge } from '../components/common/StatusBadge'

const users = ['All', ...new Set(auditLogs.map((log) => log.actor))]
const actions = ['All', ...new Set(auditLogs.map((log) => log.action))]

export const AuditLog = () => {
  const [userFilter, setUserFilter] = useState('All')
  const [actionFilter, setActionFilter] = useState('All')
  const [dateRange, setDateRange] = useState('2024-11-01 — 2024-11-12')

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const userMatch = userFilter === 'All' || log.actor === userFilter
      const actionMatch = actionFilter === 'All' || log.action === actionFilter
      return userMatch && actionMatch
    })
  }, [userFilter, actionFilter])

  const heatmap = useMemo(() => generateActivityHeatmap(30), [])

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-1.5 sm:space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs sm:tracking-[0.4em]">
          Audit & Log
        </p>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-2xl lg:text-3xl">
          Transparansi penuh dengan audit trail dan observasi aktivitas.
        </h2>
        <p className="text-xs text-neutral-500 sm:text-sm">
          Lacak setiap akses, sinkronisasi, dan perubahan data di seluruh ekosistem Sync.LN.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-500 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
              <Calendar size={14} className="shrink-0 sm:w-4 sm:h-4" />
              <input
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[10px] outline-none sm:text-xs"
              />
            </div>
            <select
              value={userFilter}
              onChange={(event) => setUserFilter(event.target.value)}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em]"
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <select
              value={actionFilter}
              onChange={(event) => setActionFilter(event.target.value)}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em]"
            >
              {actions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
          <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-primary px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white sm:w-auto sm:gap-2 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em]">
            <Download size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'timestamp', header: 'Timestamp', sortable: true },
          { key: 'actor', header: 'User/System', sortable: true },
          { key: 'action', header: 'Action / Activity', sortable: true },
          { key: 'resource', header: 'Resource Accessed', sortable: true },
          { key: 'ip', header: 'IP Address', sortable: true },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
        ]}
        data={filteredLogs}
        emptyMessage="Log akan tampil setelah aktivitas terjadi."
      />

      <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">
              Activity Heatmap
            </h3>
            <p className="text-xs text-neutral-500 sm:text-sm">
              Intensitas aktivitas per hari selama 30 hari terakhir.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 text-[10px] text-neutral-400 sm:gap-2 sm:text-xs">
            <span>Low</span>
            <div className="flex gap-0.5 sm:gap-1">
              <span className="h-2 w-2 rounded bg-primary/10 sm:h-3 sm:w-3" />
              <span className="h-2 w-2 rounded bg-primary/40 sm:h-3 sm:w-3" />
              <span className="h-2 w-2 rounded bg-primary/70 sm:h-3 sm:w-3" />
              <span className="h-2 w-2 rounded bg-primary sm:h-3 sm:w-3" />
            </div>
            <span>High</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-10 gap-1 text-[9px] text-neutral-400 sm:mt-6 sm:gap-2 sm:text-xs">
          {heatmap.map((day) => (
            <div key={day.date} className="flex flex-col items-center gap-1 sm:gap-2">
              <div
                className="h-6 w-full rounded-md sm:h-8 sm:rounded-lg"
                style={{ backgroundColor: `rgba(0, 102, 204, ${day.value / 16})` }}
              />
              <span className="text-[8px] sm:text-xs">{new Date(day.date).getDate()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


