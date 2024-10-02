const { fontFamily } = require("tailwindcss/defaultTheme");
import { generateClampSize } from './utils/generate-clamp-size';

const bodyLineHeight = 27 / 19; // 1.4210526316

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/index.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "var(--space-inset)",
      screens: {
        xl: "1216px", // 1400? 1504
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans], // 400 > 800
        serif: ["var(--font-serif)", ...fontFamily.serif], // 400, 600, 700
      },
      colors: {
        // black: "rgb(21 21 21 / <alpha-value>)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        theme: {
          grey: "#383838",
          blue: "#4B7CC6",
          // deepblue: "#345586", // primary
          citron: "#E0F61D",
          canvas: "#EFEFEF",
          turquoise: "#33E6CB",
          sunset: '#FD5A47',
        },
      },
      fontSize: {
        fine: [generateClampSize(500, 1200, 10, 12), { lineHeight: "1.25" }],
        meta: [generateClampSize(500, 1200, 11.5, 14), { lineHeight: "1.25" }],
        small: [generateClampSize(500, 1200, 14, 16), { lineHeight: "1.5" }],
        base: [
          generateClampSize(500, 1200, 15, 18),
          { lineHeight: `${bodyLineHeight}` },
        ],
        large: [
          generateClampSize(500, 1200, 16, 20),
          { lineHeight: `${bodyLineHeight}` },
        ],
        lead: [generateClampSize(500, 1200, 19, 24), { lineHeight: "1.333" }],
        subheading: [
          generateClampSize(500, 1200, 22, 30),
          { lineHeight: "1.333" },
        ],
        heading: [generateClampSize(500, 1200, 27, 40), { lineHeight: "1.15" }],
        subtitle: [
          generateClampSize(500, 1200, 36, 64),
          { lineHeight: "1.333" },
        ],
        title: [generateClampSize(500, 1200, 64, 100), { lineHeight: "1.333" }],
      },
      maxWidth: {
        inner: "900px",
      },
      spacing: {
        navH: "var(--height-nav)",
        tabH: "var(--height-tab)",
        inset: "var(--space-inset)",
        em: "1em",
        test: '123px',

        // lower value is 2/3 of upper value
        w4: generateClampSize(500, 1200, 10.5, 16),
        w6: generateClampSize(500, 1200, 16, 24),
        w8: generateClampSize(500, 1200, 21, 32),
        w12: generateClampSize(500, 1200, 32, 48),
        w16: generateClampSize(500, 1200, 43, 64),
        w20: generateClampSize(500, 1200, 54, 80),
        w24: generateClampSize(500, 1200, 64, 96),
        w28: generateClampSize(500, 1200, 75, 112),
        w32: generateClampSize(500, 1200, 85, 128),
        w36: generateClampSize(500, 1200, 96, 144),
        w42: generateClampSize(500, 1200, 112, 168),
        w48: generateClampSize(500, 1200, 128, 192),
        w64: generateClampSize(500, 1200, 171, 256),
        w72: generateClampSize(500, 1200, 192, 288),
        w96: generateClampSize(500, 1200, 256, 384),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      }, 
      flexBasis: {
        "1/2-gap-4": "calc(50% - (1/2 * 1rem))",
        "1/2-gap-6": "calc(50% - (1/2 * 1.5rem))",
        "1/3-gap-4": "calc(33.3% - (2/3 * 1rem))",
        "1/3-gap-6": "calc(33.3% - (2/3 * 1.5rem))"
      }
    },
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
