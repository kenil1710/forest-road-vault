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
        cream: {
          DEFAULT: '#F5F1EA',
          dark: '#EDE8DF',
        },
        navy: {
          DEFAULT: '#1B2A4A',
          deep: '#0F1A2E',
          light: '#243656',
        },
        forest: {
          DEFAULT: '#1E3D2F',
          light: '#2D6A4F',
          pale: '#B7E4C7',
        },
        gold: {
          DEFAULT: '#C4A44E',
          light: '#D4B96A',
          muted: '#B8972F',
        },
        ink: '#1B2A4A',
        muted: '#5A6A80',
        warmline: '#D6D0C4',
      },
      fontFamily: {
        // Heavy geometric sans for the biggest headlines, as the brand's
        // posts set them; Playfair stays for sub-headings.
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '2px',
        btn: '4px',
        input: '4px',
      },
      maxWidth: {
        content: '1100px',
      },
      letterSpacing: {
        tagline: '0.2em',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up 0.6s ease-out both' },
    },
  },
  plugins: [],
}

export default config
