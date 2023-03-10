/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#c9aa46",

          "secondary": "#aefcb0",

          "accent": "#aa360f",

          "neutral": "#1c1917",

          "base-100": "#433D43",

          "info": "#71ADDA",

          "success": "#4d7c0f",

          "warning": "#fde047",

          "error": "#991b1b",
        },
      },
    ],
  },
  plugins: [
    require("daisyui")
  ],
}