import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        green: '#00b073',
        black: '#000000',
        'dark-grey': '#0d0d0d',
        'mid-grey': '#161616',
        blue: '#005ea6',
        yellow: '#eac924',
        'light-grey': '#d3d3d3',
        red: '#c63649',
      },
    },
  },
  plugins: [],
};
export default config;
