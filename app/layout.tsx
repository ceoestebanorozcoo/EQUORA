import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, DM_Sans } from "next/font/google";

import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EQUORA | Productos Equinos",
  description:
    "Productos equinos y ecuestres. Diseñados para rendimiento, durabilidad y estetica. Distinción. Carácter. Nobleza.",
  keywords: "productos y accesorios equinos, ecuestres, equitación, Colombia, pesebrera, riendas",
  icons: {
    icon: "/logo.2.svg",
  },
  openGraph: {
    title: "EQUORA | Productos Equinos",
    description: "Productos equinos y ecuestres",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${bebasNeue.variable} ${cormorantGaramond.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
