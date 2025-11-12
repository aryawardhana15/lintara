import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'classnames'
import { Logo } from '../common/Logo'

const navLinks = [
  { label: 'Solusi', href: '#solutions' },
  { label: 'Integrasi', href: '#integrations' },
  { label: 'Keunggulan', href: '#features' },
  { label: 'Contact', href: '#contact' },
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-hero-gradient/60 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-4 sm:py-4 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-widest text-white/80 lg:flex lg:gap-10 lg:text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:gap-4 lg:flex">
          <Link
            to="/login"
            className="rounded-full border border-white/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:-translate-y-0.5 hover:bg-white/10 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.3em]"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary shadow-glow-secondary transition hover:-translate-y-0.5 hover:shadow-lg sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.4em]"
          >
            Request Demo
          </Link>
        </div>

        <button
          onClick={() => setOpen((state) => !state)}
          className="rounded-full border border-white/20 p-1.5 text-white transition lg:hidden sm:p-2"
        >
          {open ? <X size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Menu size={16} className="sm:w-[18px] sm:h-[18px]" />}
        </button>
      </div>

      <div
        className={clsx(
          'lg:hidden transition-all duration-300',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <div className="space-y-3 border-t border-white/10 bg-white/10 px-4 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 sm:space-y-4 sm:px-6 sm:py-6 sm:text-sm sm:tracking-[0.35em]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-full px-3 py-2.5 transition hover:bg-white/10 hover:text-white sm:px-4 sm:py-3"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-white px-3 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-primary shadow-lg sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.4em]"
          >
            Request Demo
          </Link>
        </div>
      </div>
    </header>
  )
}


