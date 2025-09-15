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
  description: "Calcula la distancia en línea recta entre dos direcciones usando geocoding y muestra la conexión directa en un mapa interactivo con OpenStreetMap.",
  keywords: "calculadora de distancias, mapa interactivo, geolocalización, OpenStreetMap, rutas, OSRM, geocoding, planificación de viajes",
  author: "Rachel García Betancourt",
  viewport: "width=device-width, initial-scale=1",
    openGraph: {
    title: "Calculadora de Distancias ",
    description:
      "Calcula la distancia en línea recta entre dos direcciones usando geocoding y muestra la conexión directa en un mapa interactivo con OpenStreetMap.",
    url: "https://calculador-de-distancia-1a4e2.firebaseapp.com/",
    siteName: "Calculadora de Distancias",
    images: [
      {
        url: "https://i.ibb.co/fYj3RdWQ/image.png",
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
    site: "@RachelGB030522",
    creator: "@RachelGB030522",
    title: "Calculadora de Distancias - Visualiza rutas en mapa interactivo",
    description:
      "Calcula la distancia en línea recta entre dos direcciones usando geocoding y muestra la conexión directa en un mapa interactivo con OpenStreetMap.",
    images: ["https://i.ibb.co/fYj3RdWQ/image.png"],
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
