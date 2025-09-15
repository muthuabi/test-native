import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
  card: {
    width: '100%',
    marginBottom: 30,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#6200ee',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    backgroundColor: '#6200ee',
  },
});

export default Home;