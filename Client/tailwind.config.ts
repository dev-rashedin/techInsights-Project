import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      raleway: "'Raleway', sans-serif",
      wendy: "'Wendy One', sans-serif",
      sevillana: "'Sevillana', cursive",
    },
    extend: {
      colors: {
        'faded-pearl': '#E6DFAF',
        'midnight-gray': '#3B3B3B',
        'deep-ocean': '#004080',
        'green-lantern': '#046645',
        'pure-white': '#FFFFFF',
        'charcoal-gray': '#000000',
      },
    },
  },
  plugins: [daisyui],
};

export default config;
