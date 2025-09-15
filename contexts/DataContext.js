import { useContext, createContext, useState, useEffect, use } from 'react';
import { Alert, View, ActivityIndicator, StyleSheet } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { Button } from 'react-native-paper';
const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [tracks, setTracks] = useState({});
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(false);
  const getMediaAccess = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status != 'granted') {
      Alert.alert("Music Player Permission", "Audio Access Not Granted");
      setPermission(false);
      return false;
    }
    setPermission(true);
    return true;
  }
  const loadMedia = async () => { 
    await getMediaAccess();
    if(!permission)
        return;
    setLoading(true);
    const { assets } = await MediaLibrary.getAssetsAsync(
      {
        mediaType: MediaLibrary.MediaType.Audio,
        first: 50,
        sortBy: [MediaLibrary.SortBy.CreationTime],
      }
    );
    setTracks(assets);
    setLoading(false);
  }
  useEffect(async()=>{
    await loadMedia();
  },[]);
  useEffect(async()=>{
    await loadMedia();
  },[permission]);

  if(!permission)
  {
    return(
      <View style={styles.cover}>
          <Text>Application needs Media Access Permission to Proceed</Text>
          <Button mode='contained'>Grant Access</Button>
      </View>
    );
  }
  if (loading)
    return (
      <View style={styles.cover}>
        <ActivityIndicator size="large" />
      </View>);

  return (
    <DataContext.Provider value={{ tracks, setTracks, permission }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
export const useData = () => useContext(DataContext);
const styles = StyleSheet.create({
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  }
})