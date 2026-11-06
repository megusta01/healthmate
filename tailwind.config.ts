import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // paleta original do HealthMate
        brand: {
          50: '#ecfdf6',
          100: '#d1fae9',
          200: '#a7f3d6',
          500: '#00A878',
          600: '#008c64',
          700: '#065F46',
          800: '#095947',
          900: '#073d31',
        },
      },
    },
  },
  plugins: [],
}
export default config
