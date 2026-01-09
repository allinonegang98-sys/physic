/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // <--- This is the standard setting for v3
    autoprefixer: {},
  },
};

export default config;