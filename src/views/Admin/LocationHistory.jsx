import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { getLocationById } from "../../api/location";

const LocationHistory = () => {
  // Fetch location data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["location"],
    queryFn: () => getLocationById({ userId: 51 }),
  });

  if (isLoading) return <p>Loading map...</p>;
  if (isError || !data?.location?.length) return <p>Error loading map data.</p>;

  // Extract path coordinates for Polyline
  const pathCoordinates = data.location.map((loc) => [
    loc.location.coordinates[1], // Latitude
    loc.location.coordinates[0], // Longitude
  ]);

  // Center the map on the first coordinate
  const center = pathCoordinates.length > 0 ? pathCoordinates[0] : [31.5, 74.3];

  return (
    <MapContainer center={center} zoom={18} style={{ height: "500px", width: "100%" }}>
      {/* OpenStreetMap Tile Layer (Free) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      /> 

      {/* Draw Polyline for the Path */}
      <Polyline positions={pathCoordinates} color="red" />
    </MapContainer>
  );
};

export default LocationHistory;
