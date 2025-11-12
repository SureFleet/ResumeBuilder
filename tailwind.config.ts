import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        accent: '#F5A623',
      },
    },
  },
  plugins: [],
} satisfies Config
