import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { fetchEmployeeData } from "../services/api";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapPage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Hardcoded city coordinates (since API gives only city names)
  const cityCoordinates = {
    Edinburgh: [55.9533, -3.1883],
    Tokyo: [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    London: [51.5072, -0.1276],
    "New York": [40.7128, -74.006],
    Singapore: [1.3521, 103.8198],
    Sidney: [-33.8688, 151.2093],
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchEmployeeData();
        setEmployees(data.TABLE_DATA.data);
      } catch (error) {
        console.error("Map data error:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee City Map</h2>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {employees.map((emp, index) => {
          const city = emp[2]; // City at index 2
          const coords = cityCoordinates[city];

          if (!coords) return null;

          return (
            <Marker key={index} position={coords}>
              <Popup>
                <strong>{emp[0]}</strong> <br />
                {emp[1]} <br />
                {city}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <button
        style={{
          marginTop: "20px",
          padding: "8px 12px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/list")}
      >
        Back to List
      </button>
    </div>
  );
};

export default MapPage;