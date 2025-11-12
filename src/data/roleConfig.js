import {
  apiUsageByType,
  integrationDistribution,
  subsidiaryRevenue,
} from './mockStats'

const interAgencyExchange = [
  { day: 'Sen', value: 1420 },
  { day: 'Sel', value: 1580 },
  { day: 'Rab', value: 1625 },
  { day: 'Kam', value: 1705 },
  { day: 'Jum', value: 1810 },
  { day: 'Sab', value: 1540 },
  { day: 'Min', value: 1485 },
]

export const roleLabelMap = {
  government_admin: 'Government Admin',
  corporate_cio: 'Corporate CIO',
  group_cfo: 'Group CFO',
}

export const roleConfigs = {
  government_admin: {
    label: roleLabelMap.government_admin,
    tone: 'primary',
    themeClass: 'from-primary/10 via-neutral-50 to-neutral-50',
    stats: [
      {
        id: 'connected-agencies',
        label: 'Connected Agencies',
        value: 15,
        trend: 6,
        trendLabel: 'vs bulan lalu',
        icon: 'Network',
      },
      {
        id: 'api-calls',
        label: 'API Calls Today',
        value: 8432,
        trend: 12,
        trendLabel: 'vs rata-rata',
        icon: 'Server',
      },
      {
        id: 'spbe',
        label: 'SPBE Compliance',
        value: '85%',
        trend: 5,
        trendLabel: 'vs target',
        icon: 'ShieldCheck',
      },
      {
        id: 'approvals',
        label: 'Pending Approvals',
        value: 3,
        trend: -2,
        trendLabel: 'Sejak kemarin',
        icon: 'ClipboardCheck',
      },
    ],
    chart: {
      type: 'line',
      title: 'Inter-Agency Data Exchange (7 days)',
      description: 'Volume pertukaran data antar instansi dalam sepekan terakhir.',
      data: interAgencyExchange,
      dataKey: 'value',
      color: '#0066CC',
      gradientId: 'interAgencyGradient',
    },
    quickActions: [
      { id: 'connect-agency', title: 'Connect New Agency', description: 'Tambah instansi baru.' },
      { id: 'view-spbe', title: 'View SPBE Report', description: 'Lihat laporan kepatuhan.' },
      { id: 'test-integration', title: 'Test Integration', description: 'Uji koneksi API.' },
    ],
    sidebar: [
      { name: 'Dashboard Overview', to: '/dashboard', icon: 'LayoutDashboard' },
      {
        name: 'G2G Integration',
        to: '/dashboard/g2g',
        icon: 'Landmark',
        featured: true,
        children: [
          'Connected Agencies',
          'Integration Requests',
          'SPBE Compliance',
        ],
      },
      { name: 'API Marketplace', to: '/dashboard/api-marketplace', icon: 'Store' },
      { name: 'Audit & Log', to: '/dashboard/audit', icon: 'ListChecks' },
      { name: 'Settings', to: '/dashboard/settings', icon: 'Settings' },
    ],
  },
  corporate_cio: {
    label: roleLabelMap.corporate_cio,
    tone: 'secondary',
    themeClass: 'from-secondary/10 via-neutral-50 to-neutral-50',
    stats: [
      {
        id: 'gov-apis',
        label: 'Gov APIs Active',
        value: 12,
        trend: 4,
        trendLabel: 'Activated this month',
        icon: 'Puzzle',
      },
      {
        id: 'kyc-calls',
        label: 'KYC Calls Today',
        value: 3521,
        trend: 9,
        trendLabel: 'vs rata-rata',
        icon: 'Fingerprint',
      },
      {
        id: 'response-time',
        label: 'Response Time',
        value: '<150ms',
        trendLabel: 'P95 latency',
        icon: 'Timer',
      },
      {
        id: 'success-rate',
        label: 'Success Rate',
        value: '99.8%',
        trend: 2,
        trendLabel: 'vs minggu lalu',
        icon: 'ShieldCheck',
      },
    ],
    chart: {
      type: 'bar',
      title: 'API Usage by Type',
      description: 'Distribusi penggunaan API pemerintah berdasarkan kategori layanan.',
      data: apiUsageByType,
      dataKey: 'value',
      color: '#00A86B',
    },
    quickActions: [
      { id: 'test-kyc', title: 'Test KYC API', description: 'Simulasikan verifikasi identitas.' },
      {
        id: 'view-compliance',
        title: 'View Compliance Status',
        description: 'Pantau status regulasi terbaru.',
      },
      {
        id: 'request-api',
        title: 'Request New API',
        description: 'Ajukan akses API pemerintah tambahan.',
      },
    ],
    sidebar: [
      { name: 'Dashboard Overview', to: '/dashboard', icon: 'LayoutDashboard' },
      {
        name: 'G2B Integration',
        to: '/dashboard/g2b',
        icon: 'Building2',
        featured: true,
        children: ['Available APIs', 'Live KYC Demo', 'API Usage Stats', 'Compliance Dashboard'],
      },
      { name: 'API Marketplace', to: '/dashboard/api-marketplace', icon: 'Store' },
      { name: 'Audit & Log', to: '/dashboard/audit', icon: 'ListChecks' },
      { name: 'Settings', to: '/dashboard/settings', icon: 'Settings' },
    ],
  },
  group_cfo: {
    label: roleLabelMap.group_cfo,
    tone: 'accent',
    themeClass: 'from-neutral-900 via-neutral-950 to-neutral-900',
    bigNumbers: [
      {
        id: 'total-revenue',
        label: 'Total Revenue',
        value: 'Rp 125.4 T',
        trend: '+12%',
        description: 'Year to date',
      },
      {
        id: 'total-profit',
        label: 'Total Profit',
        value: 'Rp 18.7 T',
        trend: '+8%',
        description: 'Net profit margin 14.8%',
      },
      {
        id: 'total-assets',
        label: 'Total Assets',
        value: 'Rp 450.2 T',
        trend: '+5%',
        description: 'Asset growth YoY',
      },
      {
        id: 'consolidation-time',
        label: 'Consolidation Time',
        value: '1 Day',
        badge: 'vs 3 Weeks',
        description: 'Automated consolidation pipeline',
      },
    ],
    chart: {
      type: 'stacked-bar',
      title: 'Revenue by Subsidiary',
      description: 'Kontribusi pendapatan per entitas berdasarkan sumber utama.',
      data: subsidiaryRevenue,
      keys: ['core', 'support', 'innovation'],
      colors: ['#0066CC', '#00A86B', '#FF6B35'],
    },
    insights: [
      {
        id: 'insight-1',
        title: 'AI Alert: Procurement savings opportunity',
        detail: 'Negosiasikan ulang kontrak cloud region APAC untuk potensi penghematan 12%.',
      },
      {
        id: 'insight-2',
        title: 'Recommendation: Automate tax reconciliation',
        detail: 'Integrasikan modul pajak untuk menurunkan siklus rekonsiliasi 40%.',
      },
      {
        id: 'insight-3',
        title: 'Risk Watch: Subsidiary logistics margin',
        detail: 'Margin logistik turun 3% minggu ini, cek supply chain biaya bahan baku.',
      },
    ],
    quickActions: [
      {
        id: 'generate-report',
        title: 'Generate Consolidated Report',
        description: 'Unduh laporan multi-entitas terbaru.',
        primary: true,
      },
      {
        id: 'view-procurement',
        title: 'View Procurement Dashboard',
        description: 'Monitoring penghematan lintas PT.',
      },
      {
        id: 'check-compliance',
        title: 'Check Compliance Status',
        description: 'Audit kepatuhan grup terkini.',
      },
      {
        id: 'approve-workflow',
        title: 'Approve Cross-PT Workflow',
        description: 'Validasi proses lintas entitas.',
      },
    ],
    sidebar: [
      { name: 'Dashboard Overview', to: '/dashboard', icon: 'LayoutDashboard' },
      {
        name: 'B2B Integration',
        to: '/dashboard/b2b',
        icon: 'Layers',
        featured: true,
        children: [
          'Subsidiary Overview',
          'Financial Consolidation',
          'Master Data Management',
          'Unified Procurement',
          'Cross-PT Workflow',
          'Group Compliance',
        ],
      },
      { name: 'G2B Integration', to: '/dashboard/g2b', icon: 'Building2' },
      { name: 'API Marketplace', to: '/dashboard/api-marketplace', icon: 'Store' },
      { name: 'Audit & Log', to: '/dashboard/audit', icon: 'ListChecks' },
      { name: 'Settings', to: '/dashboard/settings', icon: 'Settings' },
    ],
  },
}

