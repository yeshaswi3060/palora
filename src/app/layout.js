import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/common/SmoothScroller";
import Navbar from "@/components/common/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata = {
  title: "PALORA",
  description: "Proffectional Indo Western Wear Brand 2026 ",
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
