/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#00A86B',
        accent: '#FF6B35',
        'neutral-50': '#F9FAFB',
        'neutral-100': '#F3F4F6',
        'neutral-200': '#E5E7EB',
        'neutral-300': '#D1D5DB',
        'neutral-400': '#9CA3AF',
        'neutral-500': '#6B7280',
        'neutral-600': '#4B5563',
        'neutral-700': '#374151',
        'neutral-800': '#1F2937',
        'neutral-900': '#111827',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 20px 45px -20px rgba(0, 102, 204, 0.65)',
        'glow-secondary': '0 20px 45px -20px rgba(0, 168, 107, 0.6)',
        'glow-accent': '0 20px 45px -20px rgba(255, 107, 53, 0.55)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgba(0,102,204,0.95), rgba(0,168,107,0.85))',
        'cfo-gradient':
          'linear-gradient(160deg, rgba(17,24,39,1), rgba(17,24,39,0.85) 40%, rgba(255,107,53,0.12))',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

