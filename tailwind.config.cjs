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
      boxShadow: {
        base: '0px 0px 10px #000',
      },
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
        shadowIn: {
          from: { boxShadow: 'none' },
          to: { boxShadow: '0px 0px 10px #000' },
        },
        shadowOut: {
          from: { boxShadow: '0px 0px 10px #000' },
          to: { boxShadow: 'none' },
        },
        borderIn: {
          from: { border: '1px solid transparent' },
          to: { border: '1px solid black' },
        },
        borderOut: {
          from: { border: '1px solid black' },
          to: { border: '1px solid transparent' },
        },
      },
      animation: {
        listShow: 'downTop 0.18s ease-out, fadeIn 0.15s linear',
        listHide: 'topDown 0.15s ease-out, fadeOut 0.12s linear',
        indexOnHover: 'shadowIn 0.1s ease-in, borderOut 0.1s ease-in',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
