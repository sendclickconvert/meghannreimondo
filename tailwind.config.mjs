/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ---- Civic brand tokens (single source: site.ts brand.navy / brand.red) ----
        // Direct hex tokens — Tailwind generates opacity variants (e.g. bg-navy/10) automatically.
        navy: '#012566',
        red: '#D60F29',

        // ---- Semantic theme tokens (CSS vars in global.css; used by .btn-* component classes) ----
        // Vars are RGB channel triplets so Tailwind opacity modifiers work.
        primary: 'rgb(var(--color-primary) / <alpha-value>)',     // navy
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)', // red
        accent: 'rgb(var(--color-accent) / <alpha-value>)',       // red
        ink: 'rgb(var(--color-ink) / <alpha-value>)',             // dark slate text
        cream: 'rgb(var(--color-cream) / <alpha-value>)',         // near-white page bg
      },
      fontFamily: {
        // Clean civic sans — Inter throughout, system-ui fallbacks (never serif).
        display: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        '7xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(1, 37, 102, 0.18)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
