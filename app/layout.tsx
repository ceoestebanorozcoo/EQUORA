import type { Metadata } from "next";

import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
