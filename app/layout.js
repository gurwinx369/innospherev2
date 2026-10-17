import { Courier_Prime, DM_Mono, Poppins } from "next/font/google";
import "./globals.css";
import SplashCursorWrapper from "@/components/ui/SplashCursorWrapper";

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Innosphere — Digital Product Company",
  description: "We make digital experiences. AI, full-stack engineering, mobile apps, and marketing — built with precision.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${courier.variable} ${mono.variable} ${poppins.variable}`}>
      <body>
        <SplashCursorWrapper />
        {children}
      </body>
    </html>
  );
}

