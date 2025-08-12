import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
title: "Calculadora de Distancias en Mapa",
  description: "Calcula distancias entre direcciones fácilmente y visualízalas en un mapa interactivo. Usa geocoding con OpenStreetMap y rutas optimizadas con OSRM. Ideal para planificar viajes y ubicaciones.",
  keywords: "calculadora de distancias, mapa interactivo, geolocalización, OpenStreetMap, rutas, OSRM, geocoding, planificación de viajes",
  author: "Rachel García Betancourt",
  viewport: "width=device-width, initial-scale=1",
    openGraph: {
    title: "Calculadora de Distancias ",
    description:
      "Calcula distancias entre direcciones con geocoding y muestra rutas en un mapa con OpenStreetMap y OSRM. Ideal para planificar viajes y ubicaciones.",
    url: "https://calculador-de-distancia-1a4e2.firebaseapp.com/",
    siteName: "Calculadora de Distancias",
    images: [
      {
        url: "https://calculador-de-distancia-1a4e2.firebaseapp.com/",
        width: 1200,
        height: 630,
        alt: "Calculadora de Distancias Logo",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TuTwitter",
    creator: "@TuTwitter",
    title: "Calculadora de Distancias - Visualiza rutas en mapa interactivo",
    description:
      "Calcula distancias entre direcciones con geocoding y muestra rutas en un mapa con OpenStreetMap y OSRM. Ideal para planificar viajes y ubicaciones.",
    images: ["https://calculador-de-distancia-1a4e2.firebaseapp.com/"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
