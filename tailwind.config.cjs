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
        base: '0px 15px 20px rgba(127, 127, 127, 0.4)',
        top: '0px -44px 15px #F0DBA8',
      },
      colors: {
        base: {
          DEFAULT: '#F0DBA8',
        },
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
        smUp: {
          from: { transform: 'translateY(0px)' },
          to: { transform: 'translateY(-2px)' },
        },
        smDown: {
          from: { transform: 'translateY(-2px)' },
          to: { transform: 'translateY(0px)' },
        },
        shadowIn: {
          from: { boxShadow: 'none' },
          to: { boxShadow: '0px 5px 15px rgba(127, 127, 127, 0.4)' },
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
        listShow: 'downTop 0.25s ease-out, fadeIn 0.22s linear',
        listHide: 'topDown 0.18s ease-out, fadeOut 0.15s linear',
        indexOnHover: 'shadowIn 0.1s ease-in, borderOut 0.1s ease-in',
        chevronUp: 'smUp 0.15s ease-in',
        chevronDown: 'smDown 0.15s ease-in',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
