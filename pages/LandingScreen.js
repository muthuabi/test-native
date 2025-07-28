
// pages/LandingScreen.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function LandingScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/31/21/23/online-2025934_960_720.png' }} style={styles.image} />
          <Text variant="headlineLarge" style={styles.title}>Welcome to Course Explorer</Text>
          <Button mode="contained" onPress={handleStart} style={styles.button}>See Courses</Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  image: { width: 300, height: 200, resizeMode: 'contain', marginBottom: 20 },
  title: { textAlign: 'center', marginBottom: 20 },
  button: { marginTop: 10 },
});

