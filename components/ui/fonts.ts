import { Open_Sans, Noto_Serif } from "next/font/google";

export const sans = Open_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const serif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});
