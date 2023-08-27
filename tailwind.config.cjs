/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: "class",
	theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
		extend: {
      colors: {
        neutral: {
          "50": "#fafafa",
          "100": "#f5f5f5",
          "200": "#e5e5e5",
          "300": "#d4d4d4",
          "400": "#a3a3a3",
          "500": "#737373",
          "600": "#525252",
          "700": "#404040",
          "800": "#262626",
          "900": "#171717",
          "950": "#0a0a0a",
          DEFAULT: "#262626",
        },
        "theme": "#006cff",
        "apple-podcasts": "#bd3de2",
        "spotify": "#1dd65f",
        "footer": "#ececec",
        "dark-footer": "#434343",
      },
      spacing: {
        "xs": "2rem",
        "sm": "4rem",
        "md": "8rem",
        "lg": "15rem",
        "navbar": "6rem",
        "small-navbar": "5rem",
        "tall": "24rem",
        "short": "20rem",
      },
      fontFamily: {
        sans: ["Jost", ...defaultTheme.fontFamily.sans],
        fancy: ["ZhanKu", "cursive"],
        typical: [...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "waves": "url(/footer/waves.svg)",
        "dark-waves": "url(/footer/dark-waves.svg)"
      }
    },
	},
	plugins: [],
}
