import { useMemo, useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

const suggestionList = [
  'Dashboard Overview',
  'G2G Integration',
  'G2B Integration',
  'B2B Integration',
  'API Marketplace',
  'Audit Log',
  'Connect New Agency',
  'Generate Report',
]

export const SearchBar = ({ placeholder = 'Quick search...', onSearch }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const filteredSuggestions = useMemo(() => {
    if (!query) return []
    return suggestionList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!query) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSearch?.(query)
    }, 800)
  }

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="group flex w-full items-center gap-2 rounded-xl border border-transparent bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur transition hover:shadow-md dark:bg-neutral-900/70 dark:hover:border-primary/40 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-2"
      >
        <Search className="h-4 w-4 shrink-0 text-primary/70 sm:h-5 sm:w-5" strokeWidth={2} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-xs font-medium text-neutral-700 outline-none placeholder:text-neutral-400 dark:text-neutral-100 sm:text-sm"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/20 sm:rounded-xl sm:px-3 sm:text-xs"
        >
          Go
        </button>
        {loading && <Loader2 className="h-3 w-3 animate-spin text-primary sm:h-4 sm:w-4" />}
      </form>

      {filteredSuggestions.length > 0 && (
        <div className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-neutral-200/70 bg-white shadow-lg dark:border-neutral-700/60 dark:bg-neutral-900">
          <ul className="divide-y divide-neutral-100 text-sm dark:divide-neutral-800">
            {filteredSuggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion)
                  onSearch?.(suggestion)
                }}
                className="cursor-pointer px-4 py-2.5 text-neutral-600 transition hover:bg-primary/10 hover:text-primary dark:text-neutral-300 dark:hover:bg-primary/20"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


