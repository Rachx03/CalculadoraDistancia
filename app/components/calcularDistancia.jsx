"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

// Importa el componente Mapa solo en cliente, sin SSR
const Mapa = dynamic(() => import("./Mapa"), { ssr: false });

const CalcularDistanciaConGeocoding = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [distancia, setDistancia] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cordenadasorigen, setcordenadasOrigen] = useState(null);
  const [cordenadasdestino, setcordenadasDestino] = useState(null);

  const obtenerCoordenadas = async (direccion) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      direccion
    )}&format=json&limit=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.length === 0)
      throw new Error(`No se encontraron coordenadas para "${direccion}"`);
    console.log(data[0].lat);
    console.log(data[0].lon);
    return { lat: data[0].lat, lon: data[0].lon };
  };

  const calcularDistancia = async () => {
    setError(null);
    setDistancia(null);
    setCargando(true);

    try {
      // 1. Obtener coordenadas de origen y destino
      const coordsOrigen = await obtenerCoordenadas(origen);
      setcordenadasOrigen(coordsOrigen);
      const coordsDestino = await obtenerCoordenadas(destino);
      setcordenadasDestino(coordsDestino);

      // 2. Hacer consulta a OSRM con esas coordenadas
      const urlOsrm = `https://router.project-osrm.org/route/v1/driving/${coordsOrigen.lon},${coordsOrigen.lat};${coordsDestino.lon},${coordsDestino.lat}?overview=false`;
      const resOsrm = await fetch(urlOsrm);
      const dataOsrm = await resOsrm.json();

      if (
        dataOsrm.code !== "Ok" ||
        !dataOsrm.routes ||
        dataOsrm.routes.length === 0
      ) {
        setError("No se pudo calcular la ruta");
      } else {
        const distanciaKm = (dataOsrm.routes[0].distance / 1000).toFixed(2);
        setDistancia(distanciaKm);
      }
    } catch (e) {
      setError(e.message || "Error desconocido");
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origen.trim() || !destino.trim()) {
      setError("Por favor ingresa ambas direcciones");
      return;
    }
    calcularDistancia();
  };

  const limpiarFormulario = () => {
    setOrigen("");
    setDestino("");
    setDistancia(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* MAPA DE FONDO */}
     {cordenadasorigen && cordenadasdestino && (
  <div className="absolute inset-0 -z-10">
    <Mapa origen={cordenadasorigen} destino={cordenadasdestino} />
  </div>
)}

      {/* FORMULARIO */}
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full p-6 bg-white bg-opacity-90 rounded-lg shadow-md font-sans text-gray-800 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Calculadora de Distancia con Geocoding
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Dirección origen"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Dirección destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={cargando}
                className={`flex-1 p-3 rounded-md text-white font-semibold transition-colors
                  ${
                    cargando
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {cargando ? "Calculando..." : "Calcular distancia"}
              </button>
              <button
                type="button"
                onClick={limpiarFormulario}
                className="flex-1 p-3 rounded-md bg-gray-400 text-white font-semibold hover:bg-gray-500 transition-colors"
              >
                Limpiar
              </button>
            </div>
          </form>

          {distancia && (
            <p className="mt-8 text-center text-green-700 font-medium text-lg">
              Distancia: {distancia} km
            </p>
          )}

          {error && (
            <p className="mt-6 text-center text-red-600 font-medium">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalcularDistanciaConGeocoding;
