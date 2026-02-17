/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          deep: '#0f172a',
          main: '#0ea5e9',
          bright: '#38bdf8',
          neon: '#06b6d4',
          accent: '#3b82f6',
          glow: '#60a5fa',
          electric: '#0891b2',
        },
      },
      fontFamily: {
        mono: ['"Space Mono"', '"Courier New"', 'monospace'],
        cyber: ['"Orbitron"', '"Space Mono"', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 3s infinite alternate',
        'glitch': 'glitch-anim 3s infinite linear alternate-reverse',
        'scan': 'scan 3s infinite',
        'border-pulse': 'border-pulse 2s infinite alternate',
        'cyber-spin': 'cyber-spin 1s linear infinite',
        'hologram': 'hologram 5s ease infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            textShadow: '0 0 10px rgba(56, 189, 248, 0.5), 0 0 20px rgba(56, 189, 248, 0.5), 0 0 30px rgba(6, 182, 212, 1), 0 0 40px rgba(6, 182, 212, 1)',
          },
          '20%, 24%, 55%': {
            textShadow: 'none',
          },
        },
        'glitch-anim': {
          '0%': { clip: 'rect(61px, 9999px, 71px, 0)' },
          '20%': { clip: 'rect(84px, 9999px, 28px, 0)' },
          '40%': { clip: 'rect(47px, 9999px, 94px, 0)' },
          '60%': { clip: 'rect(10px, 9999px, 67px, 0)' },
          '80%': { clip: 'rect(55px, 9999px, 49px, 0)' },
          '100%': { clip: 'rect(90px, 9999px, 20px, 0)' },
        },
        scan: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        'border-pulse': {
          '0%': {
            borderColor: 'rgba(6, 182, 212, 0.3)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.3), inset 0 0 10px rgba(6, 182, 212, 0.1)',
          },
          '100%': {
            borderColor: 'rgba(56, 189, 248, 0.8)',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.6), inset 0 0 20px rgba(56, 189, 248, 0.3)',
          },
        },
        'cyber-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        hologram: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scanline: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        },
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.2)',
        'cyber-lg': '0 0 30px rgba(56, 189, 248, 0.8), 0 0 60px rgba(56, 189, 248, 0.4)',
        'neon': '0 0 10px rgba(6, 182, 212, 0.8)',
        'neon-lg': '0 0 20px rgba(56, 189, 248, 0.8), 0 0 40px rgba(56, 189, 248, 0.4)',
      },
    },
  },
  plugins: [],
};
