import { Mail, MapPin, Phone } from 'lucide-react'

export const Footer = () => (
  <footer className="bg-neutral-900 text-neutral-200">
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 lg:grid-cols-3 lg:px-8">
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base font-semibold text-white sm:text-lg">Lintara</h3>
        <p className="text-xs text-neutral-400 sm:text-sm">
          Platform integrasi data nasional yang menghubungkan Pemerintah, BUMN, dan Grup Perusahaan
          melalui triple integration yang aman dan real-time.
        </p>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white sm:text-sm">Hubungi</h4>
        <div className="mt-3 space-y-2 text-xs text-neutral-400 sm:mt-4 sm:space-y-3 sm:text-sm">
          <p className="flex items-center gap-2 sm:gap-3">
            <Mail size={14} className="shrink-0 sm:w-4 sm:h-4" />
            <a href="mailto:hello@lintara.id" className="break-all hover:text-white">hello@lintara.id</a>
          </p>
          <p className="flex items-center gap-2 sm:gap-3">
            <Phone size={14} className="shrink-0 sm:w-4 sm:h-4" />
            <a href="tel:+622155551234" className="hover:text-white">+62 21 5555 1234</a>
          </p>
          <p className="flex items-start gap-2 sm:gap-3">
            <MapPin size={14} className="mt-0.5 shrink-0 sm:mt-0 sm:w-4 sm:h-4" />
            <span>Jl. Medan Merdeka Barat No. 12, Jakarta</span>
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white sm:text-sm">Integrasi</h4>
        <ul className="mt-3 space-y-1.5 text-xs text-neutral-400 sm:mt-4 sm:space-y-2 sm:text-sm">
          <li>Government to Government (G2G)</li>
          <li>Government to Business (G2B)</li>
          <li>Business to Business (B2B)</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-neutral-800 py-4 text-center text-[10px] text-neutral-600 sm:py-6 sm:text-xs">
      © {new Date().getFullYear()} Lintara. All rights reserved.
    </div>
  </footer>
)


