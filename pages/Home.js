import { WebView } from "react-native-webview";

export default function Home() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Map</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <style>
          #map { height: 100vh; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          // Initialize map
          var map = L.map('map').setView([9.8785336, 78.0765925], 16);

          // Tile Layer (OpenStreetMap)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Red Marker with popup
          var redMarker = L.marker([9.8785336, 78.0765925], { 
            icon: L.icon({
              iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
            })
          }).addTo(map).bindPopup("Thiagarajar College of Engineering");

          // Blue Marker nearby (example)
          var blueMarker = L.marker([9.879, 78.077], { 
            icon: L.icon({
              iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
            })
          }).addTo(map).bindPopup("Nearby Location");

          // Circle around red marker
          L.circle([9.8785336, 78.0765925], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: 200 // radius in meters
          }).addTo(map);
        </script>
      </body>
    </html>
  `;

  return <WebView originWhitelist={["*"]} source={{ html }} style={{ flex: 1 }} />;
}
