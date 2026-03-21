import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EQUORA — Accesorios Equinos de Lujo",
  description:
    "Accesorios ecuestres de lujo moderno. Diseñados para rendimiento, elegancia y estilo. Distinción. Carácter. Nobleza.",
  keywords: "accesorios equinos, caballos, lujo, equitación, Colombia, pesebrera, riendas",
  openGraph: {
    title: "EQUORA — Lujo que no necesita explicación.",
    description: "Accesorios ecuestres de lujo moderno para quienes montan con criterio.",
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
