"use client";

import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Para que los íconos se muestren bien en React + Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Mapa = ({ origen, destino }) => {
  // Las coordenadas que recibes tienen lat y lon en string, conviértelos a números y en formato [lat, lon]
  const positionOrigen = [parseFloat(origen.lat), parseFloat(origen.lon)];
  const positionDestino = [parseFloat(destino.lat), parseFloat(destino.lon)];

  // Centro del mapa entre ambos puntos (simple promedio)
  const center = [
    (positionOrigen[0] + positionDestino[0]) / 2,
    (positionOrigen[1] + positionDestino[1]) / 2,
  ];

  // Línea que conecta los dos puntos
  const polylinePositions = [positionOrigen, positionDestino];

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='© OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={positionOrigen} />
      <Marker position={positionDestino} />
      <Polyline positions={polylinePositions} color="blue" />
    </MapContainer>
  );
};

export default Mapa;
