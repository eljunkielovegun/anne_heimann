/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
      extend: {
        fontFamily: {
          heading: ['var(--font-heading)', 'sans-serif'],
          body: ['var(--font-body)', 'sans-serif'],
          mono: ['var(--font-mono)', 'monospace'],
          sans: ['var(--font-sans)', 'sans-serif'],
        },
        boxShadow: {
          sm: 'var(--shadow-sm)',
          DEFAULT: 'var(--shadow)',
          md: 'var(--shadow-md)',
          lg: 'var(--shadow-lg)',
          xl: 'var(--shadow-xl)',
          '2xl': 'var(--shadow-2xl)',
          inner: 'var(--shadow-inner)',
          none: 'none',
          'card': '0 8px 20px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03)',
          'card-hover': '0 15px 30px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.05)',
        },
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          primary: {
            DEFAULT: 'var(--primary)',
            foreground: 'var(--background)',
          },
          secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--background)',
          },
          accent: {
            DEFAULT: 'var(--accent)',
            foreground: 'var(--background)',
          },
          surface: {
            DEFAULT: 'var(--surface)',
            foreground: 'var(--foreground)',
          },
          border: 'var(--border)',
          input: 'var(--input)',
          muted: {
            DEFAULT: 'var(--muted)',
            foreground: 'var(--muted-foreground)',
          },
          popover: {
            DEFAULT: 'var(--popover)',
            foreground: 'var(--popover-foreground)',
          },
          card: {
            DEFAULT: 'var(--card)',
            foreground: 'var(--card-foreground)',
          },
          destructive: {
            DEFAULT: 'var(--destructive, #ff0000)',
            foreground: 'var(--destructive-foreground, #ffffff)',
          }
        },
        borderRadius: {
          lg  : 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
      },
  },
  plugins: [],            
};
