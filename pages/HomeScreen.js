// pages/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import FeedbackModal from '../components/FeedbackModal';

const dummyCourses = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Course Subject ${i + 1}`,
  image: 'https://cdn.pixabay.com/photo/2015/12/08/00/32/classroom-1081712_1280.jpg',
}));

export default function HomeScreen() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setCourses(dummyCourses);
  }, []);

  const handleFeedbackPress = (course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
              <Text variant="titleMedium">{item.title}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleFeedbackPress(item)}>Feedback</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FeedbackModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedCourse}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  grid: { paddingBottom: 20 },
  card: { flex: 1, margin: 8 },
});
