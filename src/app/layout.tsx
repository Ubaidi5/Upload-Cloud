import "./globals.css";
import "./bootstrap.css";
import "./modal.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { Signika_Negative } from "next/font/google";
import AppHeader from "@/components/AppHeader";
import AppProvider from "@/context/store";

const Signika = Signika_Negative({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--signika-negative",
  fallback: ["sans-serif"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Upload Cloud",
  description: "Upload Image & Customize Order with Comet Base",
  icons: {
    href: "/images/fav-icon.svg",
    icon: "ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  var Tawk_LoadStart = new Date();
  return (
    <html lang="en">
      {/* <script
        src="https://embed.tawk.to/657c174707843602b802495d/1hhmblsbp"
        async
        crossOrigin="anonymous"
      ></script> */}
      <body className={Signika.className}>
        <AppProvider>
          <StyledComponentsRegistry>
            <AppHeader />
            <main id="app-root">{children}</main>
          </StyledComponentsRegistry>
        </AppProvider>
      </body>
    </html>
  );
}
