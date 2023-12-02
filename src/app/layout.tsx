import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { Signika_Negative } from "next/font/google";

const Signika = Signika_Negative({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--signika-negative",
  fallback: ["sans-serif"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Photo Upload",
  description: "Photo Upload by File Upload",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={Signika.className}>
        <StyledComponentsRegistry>
          <main id="app-root">{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
