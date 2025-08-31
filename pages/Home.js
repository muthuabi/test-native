import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function Home() {
  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
              </head>
              <body style="margin:0; padding:0;">
                <div id="map" style="width:100%; height:100vh;"></div>
                <script>
                  var map = L.map('map').setView([9.8785336, 78.0765925], 16);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                  }).addTo(map);

                  // Add marker
                  L.marker([9.8785336, 78.0765925]).addTo(map)
                    .bindPopup('My Location')
                    .openPopup();
                </script>
              </body>
            </html>
          `,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
