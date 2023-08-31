import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{jis,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      gray: {
        '01': '#3E3E3E',
        '02': '#7B7B7B',
        '03': '#D2D2D2',
      },
      black: '#000000',
      white: '#FFFFFF',
    },
    extend: {
      colors: {
        primary: {
          main: '#F15642',
          dark: '#ED3847',
        },
        background: {
          white: '#F4F6F5',
        },
      },
    },
    boxShadow: {
      't-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
      't-md':
        '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      't-lg':
        '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      't-xl':
        '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      't-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
      't-3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
