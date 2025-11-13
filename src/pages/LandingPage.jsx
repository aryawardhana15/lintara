import { ArrowRight, Building, Landmark, Network, Timer, Zap, Globe, Lock, TrendingUp, CheckCircle2, Play, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { heroStats } from '../data/mockStats'

const pillars = [
  {
    title: 'Government to Government',
    acronym: 'G2G',
    description: 'Integrasi antar instansi dengan kepatuhan SPBE penuh',
    icon: Landmark,
    color: 'primary',
  },
  {
    title: 'Government to Business',
    acronym: 'G2B',
    description: 'Akses data pemerintah bagi BUMN & korporat dalam satu portal',
    icon: Building,
    color: 'secondary',
  },
  {
    title: 'Business to Business',
    acronym: 'B2B',
    description: 'Konsolidasi grup & orkestrasi data master lintas PT',
    icon: Network,
    color: 'accent',
  },
]

const features = [
  {
    title: 'G2G Integration',
    description: 'SPBE compliance dengan orkestrasi API inter-kementerian & lembaga.',
    icon: Landmark,
    color: 'text-primary',
  },
  {
    title: 'G2B Integration',
    description: 'Portal terpadu untuk akses data pemerintah secara real-time bagi BUMN & enterprise.',
    icon: Building,
    color: 'text-secondary',
  },
  {
    title: 'B2B Integration',
    description: 'Konsolidasi data grup, master data management, & workflow lintas anak perusahaan.',
    icon: Network,
    color: 'text-accent',
  },
]

const benefits = [
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Latency kurang dari 1 detik untuk semua operasi data',
  },
  {
    icon: Lock,
    title: 'Zero Trust Security',
    description: 'Enkripsi end-to-end dengan audit trail lengkap',
  },
  {
    icon: Globe,
    title: 'SPBE Compliant',
    description: 'Memenuhi standar Sistem Pemerintahan Berbasis Elektronik',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Architecture',
    description: 'Mendukung pertumbuhan dari ratusan hingga jutaan transaksi',
  },
]

const stats = [
  { value: '99.9%', label: 'Uptime', icon: CheckCircle2 },
  { value: '<1s', label: 'Latency', icon: Timer },
  { value: '500+', label: 'APIs', icon: Network },
  { value: '50+', label: 'Instansi', icon: Building },
]

const certifications = [
  'SPBE Level 3 Certified',
  'ISO 27001 Compliant',
  'SOC 2 Type II',
  'GDPR Ready'
]

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Simplified and Professional */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white pt-20 pb-16 lg:pt-32 lg:pb-24">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-6">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Platform Integrasi Data Nasional
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl mb-6">
                Orkestrasi Data untuk{' '}
                <span className="text-primary">Pemerintah</span> dan{' '}
                <span className="text-secondary">Korporasi</span>
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-2xl">
                Sync.LN menghubungkan ekosistem data nasional melalui integrasi G2G, G2B, dan B2B 
                dengan keamanan tingkat enterprise dan kepatuhan SPBE penuh.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
                >
                  Request Demo
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-300 bg-white px-8 py-4 text-base font-semibold text-neutral-900 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                >
                  <Play size={20} />
                  Lihat Demo
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-neutral-200">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm text-neutral-600">
                    <Check size={16} className="text-success" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {heroStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                    <div className="relative">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                        {stat.label}
                      </p>
                      <h3 className="text-3xl font-bold text-neutral-900 mb-1">
                        {stat.value}{stat.suffix}
                      </h3>
                      <p className="text-sm text-neutral-600">{stat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-neutral-900">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-neutral-600">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-4">
              Triple Integration
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl mb-4">
              Tiga Pilar Integrasi Data
            </h2>
            <p className="text-lg text-neutral-600">
              Solusi komprehensif untuk kebutuhan integrasi data di berbagai sektor
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary mb-4">
                      {pillar.acronym}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    {pillar.description}
                  </p>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
                  >
                    Pelajari lebih lanjut
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary mb-4">
              Fitur Unggulan
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl mb-4">
              Platform Terintegrasi untuk Orkestrasi Data Nasional
            </h2>
            <p className="text-lg text-neutral-600">
              Teknologi terdepan untuk kolaborasi data yang aman, cepat, dan terpercaya
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 ${feature.color} mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-4">
              Keunggulan Kompetitif
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl mb-4">
              Mengapa Memilih Sync.LN?
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="text-center rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/90 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),_transparent_70%)]" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl mb-6">
            Siap Memulai Integrasi Data Anda?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan puluhan instansi dan perusahaan yang telah mempercayai Sync.LN 
            untuk orkestrasi data mereka.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary shadow-lg transition-all hover:shadow-xl"
            >
              Request Demo Gratis
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Lihat Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}