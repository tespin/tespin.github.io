/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      xs: '320px',
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        downTop: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0%)' },
        },
        topDown: {
          from: { transform: 'translateY(0%)' },
          to: { transform: 'translateY(100%)' },
        },
      },
      animation: {
        listShow: 'downTop 0.18s ease-out, fadeIn 0.15s linear',
        listHide: 'topDown 0.15s ease-out, fadeOut 0.12s linear',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
