import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
          card: '#16213a',
        },
        gold: {
          DEFAULT: '#c9a24b',
          light: '#e2c778',
          dark: '#9c7a2f',
        },
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'sans-serif'],
        logo: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
