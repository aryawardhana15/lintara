import { Menu, X } from 'lucide-react'
import { useState } from 'react'

// Mock Logo component
const Logo = () => (
  <div className="text-lg font-bold text-white tracking-wide">CodeLab</div>
)

const navLinks = [
  { label: 'Solusi', href: '#solutions' },
  { label: 'Integrasi', href: '#integrations' },
  { label: 'Keunggulan', href: '#features' },
  { label: 'Kontak', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium uppercase tracking-wider text-gray-300 lg:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-all hover:text-white hover:scale-105"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/login"
            className="rounded-full border border-gray-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gray-200 transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:border-gray-400"
          >
            Login
          </a>
          <a
            href="/demo"
            className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:scale-105"
          >
            Request Demo
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-gray-600 p-2 text-gray-200 transition-all hover:bg-gray-800 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-700 bg-gray-900/90 backdrop-blur-lg">
          <nav className="flex flex-col space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-300 transition-all hover:bg-gray-800 hover:text-white active:bg-gray-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2 border-t border-gray-700 px-4 py-4">
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-gray-600 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-gray-200 transition-all hover:bg-gray-800 active:bg-gray-700"
            >
              Login
            </a>
            <a
              href="/demo"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
            >
              Request Demo
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
