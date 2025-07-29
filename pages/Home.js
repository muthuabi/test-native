import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

export default function Home({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [alertShown, setAlertShown] = useState(false);
  const mapViewRef = useRef(null);

  // Configure notification behavior (taken from first code)
  const configureNotifications = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  };

  // Send push notification (from first code)
  const sendNotification = async (message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "GeoLocation",
        body: message,
      },
      trigger: null,
    });
  };

  const initializeLocation = async () => {
    const { status: locStatus } =
      await Location.requestForegroundPermissionsAsync();
    const { status: notifStatus } =
      await Notifications.requestPermissionsAsync();

    if (locStatus !== "granted" || notifStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location & Notification permissions are required!"
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setCurrentRegion(initialRegion);

    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(initialRegion, 1000);
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 3000,
        distanceInterval: 5,
      },
      (loc) => {
        const { latitude, longitude } = loc.coords;

        setCurrentRegion((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        if (mapViewRef.current) {
          mapViewRef.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            1000
          );
        }

        if (selectedMarker && !alertShown) {
          const distance = getDistance(
            latitude,
            longitude,
            selectedMarker.latitude,
            selectedMarker.longitude
          );

          if (distance < 100) {
            Alert.alert("You're near the selected location!");
            sendNotification("You're near the selected location.");
            setAlertShown(true);
          }
        }
      }
    );

    return subscription;
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (val) => (val * Math.PI) / 180;
    const R = 6371000;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedMarker({ latitude, longitude });
    setAlertShown(false);
  };

  const toggleMarker = () => {
    if (selectedMarker) {
      setSelectedMarker(null);
      setAlertShown(false);
    } else {
      Alert.alert("No marker selected!");
    }
  };

  useEffect(() => {
    let subscription;

    const startTracking = async () => {
      configureNotifications();
      subscription = await initializeLocation();
    };

    startTracking();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [selectedMarker]);

  if (!currentRegion) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        region={currentRegion}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
          title="You"
          pinColor="red"
        />
        <Circle
          center={{ latitude: currentRegion.latitude, longitude: currentRegion.longitude }}
          radius={100} 
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />

        {selectedMarker && (
          <Marker
            coordinate={selectedMarker}
            title="Target"
            pinColor="blue"
            onPress={toggleMarker}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
