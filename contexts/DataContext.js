import { useContext, createContext, useState, useEffect } from "react";
import { Alert, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Button } from "react-native-paper";
import { mapTrack } from "../utils/trackMapper";

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(false);
  const [sourceType, setSourceType] = useState("media"); //"media" | "api" | "json"

  const loadLocalMedia = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    const granted = status === "granted";
    setPermission(granted);
    if (!granted) {
      Alert.alert("Music Player Permission", "Audio Access Not Granted");
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
    setLoading(false);
  };

  const loadFromAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://my-json-server.typicode.com/yourusername/demo-api/tracks"
      );
      const data = await res.json();
      const normalizedTracks = (data.tracks || []).map((t) => mapTrack(t, "api"));
      setTracks(normalizedTracks);
    } catch {
      setTracks([]);
    }
    setLoading(false);
  };

  const loadFromJSON = async () => {
    setLoading(true);
    try {
      const data = require("../assets/tracks.json");
      const normalizedTracks = (data.tracks || []).map((t) => mapTrack(t, "json"));
      setTracks(normalizedTracks);
    } catch {
      setTracks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sourceType === "media") loadLocalMedia();
    else if (sourceType === "api") loadFromAPI();
    else if (sourceType === "json") loadFromJSON();
  }, [sourceType]);

  if (!permission && sourceType === "media") {
    return (
      <View style={styles.cover}>
        <Text>Application needs Media Access Permission to Proceed</Text>
        <Button mode="contained" onPress={loadLocalMedia}>
          Grant Access
        </Button>
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
    zIndex: 1,
  },
});
