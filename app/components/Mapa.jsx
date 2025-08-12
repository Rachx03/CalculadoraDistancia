"use client";

import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Componente para ajustar la vista al cambiar bounds
const AjustarVistaMapa = ({ bounds }) => {
  const map = useMap();

  if (bounds) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  return null;
};

// Configurar íconos de Leaflet para que se vean bien en React
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
  const positionOrigen = [parseFloat(origen.lat), parseFloat(origen.lon)];
  const positionDestino = [parseFloat(destino.lat), parseFloat(destino.lon)];

  const center = [
    (positionOrigen[0] + positionDestino[0]) / 2,
    (positionOrigen[1] + positionDestino[1]) / 2,
  ];

  const polylinePositions = [positionOrigen, positionDestino];

  // Bounds que abarcan ambos puntos
  const bounds = [positionOrigen, positionDestino];

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
      <AjustarVistaMapa bounds={bounds} />
    </MapContainer>
  );
};

export default Mapa;

