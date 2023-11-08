"use client";
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useWindowDimensions } from "@/hooks/useWindowsDementions";

function ChangeView({ center, zoom }: { center: LatLngTuple; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const zoom = 11;
const MyMap = (props: { position: LatLngTuple }) => {
  const { position } = props;
  const { width } = useWindowDimensions();
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={false}
      style={{
        minHeight: "366px",
        width: `${Math.min(width - 16, 600)}px`,
      }}
    >
      <ChangeView center={position} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
export default MyMap;
