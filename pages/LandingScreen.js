import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const LandingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/300' }} 
        style={styles.image} 
      />
      <Text style={styles.title}>Product Feedback App</Text>
      <Text style={styles.subtitle}>Share your experience with our products</Text>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Get Started
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 8,
    backgroundColor: '#6200ee',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LandingScreen;