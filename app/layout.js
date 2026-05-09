import { Courier_Prime, DM_Mono, Poppins } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "innosphere",
  description: "Premium agency landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${courier.variable} ${mono.variable} ${poppins.variable}`}>
      <body>
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#0184fa"
        />
        {children}
      </body>
    </html>
  );
}
