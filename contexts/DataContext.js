//contexts/DataContext.js
import { useContext, createContext, useState, useEffect } from "react";
import { Alert, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Button, Surface, Title, Paragraph } from "react-native-paper";
import { mapTrack } from "../utils/trackMapper";

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(false);
  const [sourceType, setSourceType] = useState("json"); // 'media' | 'api' | 'json'
  const [error, setError] = useState(null);
  const switchOptions = ["media", "api", "json"].filter((t) => t !== sourceType);

  // Action to load local media
  const loadLocalMedia = async () => {
    try {
      setError(null);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      const granted = status === "granted";
      setPermission(granted);
      if (!granted) {
        setError("Media access permission denied.");
        return;
      }
      setLoading(true);
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
        first: 50,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });
      const normalizedTracks = assets.map((t) => mapTrack(t, "media"));
      setTracks(normalizedTracks);
    } catch (e) {
      setError("Error loading local media.");
    } finally {
      setLoading(false);
    }
  };

  // Load tracks from API
  const loadFromAPI = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        "https://my-json-server.typicode.com/yourusername/demo-api/tracks"
      );
      if (!res.ok) throw new Error("API response not OK");
      const data = await res.json();
      const normalizedTracks = (data.tracks || []).map((t) => mapTrack(t, "api"));
      setTracks(normalizedTracks);
    } catch (e) {
      setError("Error loading tracks from API.");
    } finally {
      setLoading(false);
    }
  };

  // Load tracks from JSON file
  const loadFromJSON = async () => {
    try {
      setError(null);
      setLoading(true);
      const tracks = require("../assets/tracks.json");
      const data = { tracks };
      const normalizedTracks = (data.tracks || []).map((t) => mapTrack(t, "json"));
      // console.log("Loaded tracks from JSON:", normalizedTracks);
      setTracks(normalizedTracks);
    } catch (e) {
      setError("Error loading tracks from JSON.");
    } finally {
      setLoading(false);
    }
  };

  // Handles loading depending on sourceType
  useEffect(() => {
    if (sourceType === "media") loadLocalMedia();
    else if (sourceType === "api") loadFromAPI();
    else if (sourceType === "json") loadFromJSON();
  }, [sourceType]);

  // Retry function for current source
  const retryLoading = () => {
    setError(null);
    if (sourceType === "media") loadLocalMedia();
    else if (sourceType === "api") loadFromAPI();
    else if (sourceType === "json") loadFromJSON();
  };

  if ((error || (!permission && sourceType === "media")) && !loading) {
    return (
      <View style={styles.cover}>
        <Surface style={styles.errorSurface}>
          <Title style={{ marginBottom: 10, textAlign: "center" }}>
            {error || "Media access permission not granted."}
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 20 }}>
            You can retry or switch to another source.
          </Paragraph>
          <Button
            mode="contained"
            icon="reload"
            onPress={retryLoading}
            style={{ marginBottom: 20 }}
          >
            Retry {sourceType.toUpperCase()}
          </Button>
          <Text style={{ textAlign: "center", marginBottom: 10 }}>Switch Source:</Text>
          {switchOptions.map((option) => (
            <Button
              key={option}
              mode="outlined"
              onPress={() => {
                setError(null);
                setPermission(option === "media" ? false : true);
                setSourceType(option);
              }}
              style={{ marginBottom: 10 }}
            >
              {option.toUpperCase()}
            </Button>
          ))}
        </Surface>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.cover}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <DataContext.Provider value={{ tracks, setTracks, sourceType, setSourceType }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

const styles = StyleSheet.create({
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorSurface: {
    padding: 20,
    width: "90%",
    maxWidth: 400,
    elevation: 4,
  },
});
