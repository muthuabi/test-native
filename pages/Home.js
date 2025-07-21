import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import * as Notifications from 'expo-notifications';

export default function Home({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null); // User's current map region
    const [selectedMarker, setSelectedMarker] = useState(null); // User-selected blue marker
    const [alertShown, setAlertShown] = useState(false); // Prevents repeated alerts

    //Set up push notification permissions (but not called yet)
    //   const setupNotifications = async () => {
    //     const { status } = await Notifications.getPermissionsAsync();
    //     if (status !== 'granted') {
    //       await Notifications.requestPermissionsAsync();
    //     }
    //   };

    // Send notification (not called yet)
    //   const triggerNotification = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //       content: {
    //         title: "You’re near the marker!",
    //         body: "You're within 100 meters of the selected location.",
    //       },
    //       trigger: null, // Send immediately
    //     });
    //   };

    // Initialize location tracking
    const initializeLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setCurrentRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

        // Capture the subscription
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

                if (selectedMarker && !alertShown) {
                    const distance = getDistance(
                        latitude,
                        longitude,
                        selectedMarker.latitude,
                        selectedMarker.longitude
                    );

                    if (distance < 100) {
                        Alert.alert("You're near the selected location!");
                        setAlertShown(true);
                    }
                }
            }
        );

        return subscription; // Return the subscription
    };


    // Haversine Formula — Calculates distance (in meters) between two geo-points
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (val) => (val * Math.PI) / 180;
        const R = 6371000; // Earth radius in meters

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    // User taps on map to place a blue marker
    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedMarker({ latitude, longitude });
        setAlertShown(false); // reset alert trigger for new marker
    };


    // Run once on component mount
    useEffect(() => {
        let subscription;

        const startTracking = async () => {
            subscription = await initializeLocation();
        };

        startTracking();

        return () => {
            if (subscription) {
                subscription.remove(); // Stop watching location
            }
        };
    }, [selectedMarker]);


    if (!currentRegion) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={currentRegion}
                onPress={handleMapPress}
            >
                {/* Current User Location */}
                <Marker
                    coordinate={{
                        latitude: currentRegion.latitude,
                        longitude: currentRegion.longitude,
                    }}
                    title="You"
                    pinColor="red"
                />

                {/* User-selected Marker */}
                {selectedMarker && (
                    <Marker
                        coordinate={selectedMarker}
                        title="Target"
                        pinColor="blue"
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
