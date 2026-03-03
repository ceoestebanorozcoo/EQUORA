import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Equora — Artesanía Ecuestre de Distinción",
  description:
    "Equora es una marca premium de productos equinos. Diseñamos cada pieza con la pasión por el caballo y el respeto por la tradición artesanal. Descubre nuestra colección de percheros, soportes, riendas y accesorios.",
  keywords: [
    "equora",
    "productos equinos",
    "artesanía ecuestre",
    "percheros",
    "soportes",
    "riendas",
    "accesorios ecuestres",
    "marca premium ecuestre",
  ],
  openGraph: {
    title: "Equora — Artesanía Ecuestre de Distinción",
    description:
      "Cada pieza Equora nace de la pasión por el caballo y el respeto por la artesanía.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
