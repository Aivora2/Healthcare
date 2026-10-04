/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        caresetu: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb', // Primary brand blue
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
          },
          teal: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14bba6', // Brand teal
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          },
          navy: {
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          },
          mint: '#10b981',
          coral: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.08), 0 1px 2px 0 rgba(255, 255, 255, 0.8) inset',
        'glass-hover': '0 16px 40px 0 rgba(31, 38, 135, 0.12), 0 1px 2px 0 rgba(255, 255, 255, 0.9) inset',
        'glass-card': '0 20px 40px -15px rgba(37, 99, 235, 0.07), 0 0 1px 1px rgba(255, 255, 255, 0.7) inset',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.35)',
        'glow-teal': '0 0 25px -5px rgba(20, 187, 166, 0.35)',
        'glow-coral': '0 0 25px -5px rgba(239, 68, 68, 0.4)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      }
    },
  },
  plugins: [],
}
