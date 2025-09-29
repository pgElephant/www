/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sleek cool theme colors
        cool: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Light accent colors
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        // Modern, clean sans-serif fonts
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        
        // Premium heading fonts - great for titles and headers
        heading: ['Poppins', 'Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        
        // Professional body text
        body: ['Inter', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        
        // Display fonts for hero sections and large text
        display: ['Space Grotesk', 'Poppins', 'Inter', 'system-ui', 'sans-serif'],
        
        // Monospace for code and terminal
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
        
        // Modern geometric fonts
        geometric: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        
        // Tech/cyberpunk style fonts
        tech: ['Orbitron', 'Exo 2', 'Inter', 'system-ui', 'sans-serif'],
        
        // Elegant serif for special sections
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        '7xl': '1280px',
        '8xl': '1400px',
        '9xl': '1600px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
} 