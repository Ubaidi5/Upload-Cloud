import "./globals.css";
import "./bootstrap.css";
import "./modal.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { Signika_Negative } from "next/font/google";
import AppHeader from "@/components/AppHeader";

const Signika = Signika_Negative({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--signika-negative",
  fallback: ["sans-serif"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Photo Comet",
  description: "Upload Image & Customize Order with Comet Base",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={Signika.className}>
        <StyledComponentsRegistry>
          <AppHeader />
          <main id="app-root">{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
