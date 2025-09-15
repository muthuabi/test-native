import { useContext, createContext, useState, useEffect } from 'react';
import { Alert, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Button } from 'react-native-paper';

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(false);

  const getMediaAccess = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    const granted = status === 'granted';
    setPermission(granted);
    if (!granted) {
      Alert.alert("Music Player Permission", "Audio Access Not Granted");
    }
    return granted;
  };

  const loadMedia = async () => {
    const ok = await getMediaAccess();
    if (!ok) return;

    setLoading(true);
    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
      first: 50,
      sortBy: [MediaLibrary.SortBy.creationTime],
    });
    setTracks(assets);
    setLoading(false);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  if (!permission) {
    return (
      <View style={styles.cover}>
        <Text>Application needs Media Access Permission to Proceed</Text>
        <Button mode='contained' onPress={getMediaAccess}>Grant Access</Button>
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
    <DataContext.Provider value={{ tracks, setTracks }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

const styles = StyleSheet.create({
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
