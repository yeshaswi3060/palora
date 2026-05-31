import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/common/SmoothScroller";
import Navbar from "@/components/common/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata = {
  title: "JUUN.J | PERSONA",
  description: "Fall/Winter 2024 - A deeper look inside the campaign",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <SmoothScroller>
          <Navbar />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
