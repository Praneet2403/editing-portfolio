import type { Metadata, Viewport } from "next";
import { Archivo, Caveat, Inter } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.roles[0]} Portfolio`,
  description: site.tagline,
};

export const viewport: Viewport = {
  themeColor: "#ebeae5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${caveat.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
