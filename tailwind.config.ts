import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2744',
          deep: '#0f1a2e',
          light: '#243656',
        },
        forest: {
          DEFAULT: '#2d6a4f',
          light: '#40916c',
          pale: '#b7e4c7',
        },
        gold: '#d4a843',
        cream: '#f5f3ee',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        input: '8px',
        badge: '6px',
      },
      maxWidth: {
        content: '1100px',
      },
      spacing: {
        section: '96px',
        'section-sm': '64px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
