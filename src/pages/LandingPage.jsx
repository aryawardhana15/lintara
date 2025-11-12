import { ArrowRight, Building, Landmark, Network, ShieldCheck, Timer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { heroStats } from '../data/mockStats'

const pillars = [
  {
    title: 'Government to Government',
    acronym: 'G2G',
    description: 'Integrasi antar instansi dengan kepatuhan SPBE penuh',
    icon: Landmark,
    gradient: 'from-primary to-secondary',
  },
  {
    title: 'Government to Business',
    acronym: 'G2B',
    description: 'Akses data pemerintah bagi BUMN & korporat dalam satu portal',
    icon: Building,
    gradient: 'from-secondary to-accent',
  },
  {
    title: 'Business to Business',
    acronym: 'B2B',
    description: 'Konsolidasi grup & orkestrasi data master lintas PT',
    icon: Network,
    gradient: 'from-primary to-accent',
  },
]

const features = [
  {
    title: 'G2G Integration',
    description: 'SPBE compliance dengan orkestrasi API inter-kementerian & lembaga.',
  },
  {
    title: 'G2B Integration',
    description:
      'Portal terpadu untuk akses data pemerintah secara real-time bagi BUMN & enterprise.',
  },
  {
    title: 'B2B Integration',
    description:
      'Konsolidasi data grup, master data management, & workflow lintas anak perusahaan.',
  },
]

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:py-24">
          <div className="space-y-6 sm:space-y-8 lg:w-1/2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.5em]">
              Terhubung • Aman • Berkelanjutan
            </span>
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl xl:text-5xl">
              Lintara: Platform Integrasi Data Nasional
            </h1>
            <p className="text-sm text-white/80 sm:text-base lg:text-lg">
              Enabling seamless, secure, real-time data exchange antara Pemerintah, BUMN, dan
              Korporasi. Lintara menghadirkan triple integration untuk ekosistem digital Indonesia.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl sm:gap-3 sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.4em]"
              >
                Request Demo
                <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.4em]"
              >
                Explore Features
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-xs backdrop-blur sm:rounded-3xl sm:p-5 sm:text-sm"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-xs sm:tracking-[0.4em]">
                    {stat.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                    {stat.value}
                    {stat.suffix}
                  </h3>
                  <p className="mt-1 text-[10px] text-white/70 sm:text-xs">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur sm:rounded-[40px] sm:p-6 lg:p-8">
              <div className="absolute -left-6 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full bg-white/10 blur-2xl lg:block" />
              <div className="absolute -right-10 -top-10 hidden h-32 w-32 rounded-full bg-white/10 blur-3xl lg:block" />
              <div className="grid gap-4 sm:gap-6">
                <div className="rounded-2xl bg-white/10 p-4 text-xs text-white/80 sm:rounded-3xl sm:p-6 sm:text-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs sm:tracking-[0.4em]">Triple Integration</p>
                  <p className="mt-2 text-xs sm:text-sm">
                    Visualisasi hubungan G2G, G2B, dan B2B dengan arus data real-time dan enkripsi
                    berlapis.
                  </p>
                  <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
                    {pillars.map((pillar) => (
                      <div
                        key={pillar.title}
                        className="rounded-xl bg-white/5 p-3 text-white/90 sm:rounded-2xl sm:p-4"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-xs sm:tracking-[0.4em]">
                          {pillar.acronym}
                        </span>
                        <div className="mt-2 flex items-center gap-2 sm:mt-3 sm:gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.gradient} text-white shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl`}
                          >
                            <pillar.icon size={20} className="sm:w-6 sm:h-6" />
                          </div>
                          <p className="text-xs font-semibold sm:text-sm">{pillar.title}</p>
                        </div>
                        <p className="mt-1.5 text-[10px] text-white/70 sm:mt-2 sm:text-xs">{pillar.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 text-xs text-white/90 sm:rounded-3xl sm:p-6 sm:text-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-xs sm:tracking-[0.4em]">
                    Real-time Data Flow
                  </p>
                  <div className="mt-3 flex flex-col gap-3 text-xs sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <ShieldCheck className="h-8 w-8 shrink-0 text-secondary sm:h-10 sm:w-10" />
                      <div>
                        <p className="text-xs font-semibold sm:text-sm">Zero Trust Security</p>
                        <span className="text-[10px] text-white/70 sm:text-xs">
                          Enkripsi end-to-end & compliance SPBE
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Timer className="h-8 w-8 shrink-0 text-accent sm:h-10 sm:w-10" />
                      <div>
                        <p className="text-xs font-semibold sm:text-sm">Latency &lt;1s</p>
                        <span className="text-[10px] text-white/70 sm:text-xs">
                          Monitoring & observability real-time
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-3 sm:space-y-4">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.4em]">
              Keunggulan lintara
            </span>
            <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl lg:text-3xl">
              Platform terintegrasi untuk orkestrasi data nasional dan enterprise.
            </h2>
            <p className="text-xs text-neutral-500 sm:text-sm">
              Lintara memudahkan kolaborasi data antar lembaga dengan keamanan tingkat nasional,
              monitoring real-time, dan orkestrasi workflow lintas entitas.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-white sm:gap-3 sm:px-6 sm:py-3 sm:tracking-[0.3em]"
          >
            Request Demo Cepat
            <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-lg shadow-primary/10 transition hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 sm:rounded-3xl sm:p-6"
            >
              <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">{feature.title}</h3>
              <p className="mt-2 text-xs text-neutral-500 sm:mt-3 sm:text-sm">{feature.description}</p>
              <Link
                to="/dashboard"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary sm:mt-6 sm:gap-2 sm:text-sm"
              >
                Pelajari lebih
                <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}


