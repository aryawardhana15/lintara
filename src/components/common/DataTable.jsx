import { useMemo, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import clsx from 'classnames'
import { StatusBadge } from './StatusBadge'
import { timeSince } from '../../utils/helpers'

export const DataTable = ({ columns, data, emptyMessage = 'Tidak ada data.' }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }
      return sortConfig.direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  }, [data, sortConfig])

  const handleSort = (key, sortable) => {
    if (!sortable) return
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        }
      }
      return { key, direction: 'asc' }
    })
  }

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-200 px-4 py-10 text-center dark:border-neutral-700 sm:rounded-2xl sm:px-6 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 sm:text-sm">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg shadow-primary/5 dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl">
      <table className="min-w-full divide-y divide-neutral-100 text-xs dark:divide-neutral-800 sm:text-sm">
        <thead className="bg-neutral-50/80 backdrop-blur dark:bg-neutral-900/60">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key, column.sortable)}
                className={clsx(
                  'px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 sm:px-6 sm:py-4 sm:text-xs',
                  column.sortable && 'cursor-pointer select-none'
                )}
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="truncate">{column.header}</span>
                  {column.sortable && (
                    <ArrowUpDown className="h-3 w-3 shrink-0 text-neutral-400 sm:h-3.5 sm:w-3.5" strokeWidth={1.8} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {sortedData.map((row) => (
            <tr key={row.id} className="transition hover:bg-primary/5 dark:hover:bg-primary/10">
              {columns.map((column) => {
                const value = row[column.key]
                if (column.render) {
                  return (
                    <td
                      key={`${row.id}-${column.key}`}
                      className="px-3 py-2.5 text-neutral-700 dark:text-neutral-200 sm:px-6 sm:py-4"
                    >
                      {column.render(row)}
                    </td>
                  )
                }
                if (column.type === 'status') {
                  return (
                    <td key={`${row.id}-${column.key}`} className="px-3 py-2.5 sm:px-6 sm:py-4">
                      <StatusBadge status={value} />
                    </td>
                  )
                }
                if (column.type === 'relative-time') {
                  return (
                    <td
                      key={`${row.id}-${column.key}`}
                      className="px-3 py-2.5 text-[10px] text-neutral-500 dark:text-neutral-400 sm:px-6 sm:py-4 sm:text-xs"
                    >
                      {timeSince(value)}
                    </td>
                  )
                }
                return (
                  <td
                    key={`${row.id}-${column.key}`}
                    className="px-3 py-2.5 text-[10px] text-neutral-600 dark:text-neutral-300 sm:px-6 sm:py-4 sm:text-xs"
                  >
                    <span className="truncate block">{value}</span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


