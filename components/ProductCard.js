import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const ProductCard = ({ product, onFeedbackPress, feedback }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.image} 
            resizeMode="contain"
          />
          <View style={styles.details}>
            <Title style={styles.title}>{product.title}</Title>
            <Paragraph style={styles.price}>${product.price}</Paragraph>
            <Paragraph style={styles.category}>{product.category}</Paragraph>
          </View>
        </View>
        
        {feedback && (
          <View style={styles.feedbackContainer}>
            <View style={styles.ratingContainer}>
              <MaterialIcons 
                name="star" 
                size={20} 
                color={feedback.rating >= 1 ? '#FFD700' : '#ccc'} 
              />
              <MaterialIcons 
                name="star" 
                size={20} 
                color={feedback.rating >= 2 ? '#FFD700' : '#ccc'} 
              />
              <MaterialIcons 
                name="star" 
                size={20} 
                color={feedback.rating >= 3 ? '#FFD700' : '#ccc'} 
              />
              <MaterialIcons 
                name="star" 
                size={20} 
                color={feedback.rating >= 4 ? '#FFD700' : '#ccc'} 
              />
              <MaterialIcons 
                name="star" 
                size={20} 
                color={feedback.rating >= 5 ? '#FFD700' : '#ccc'} 
              />
            </View>
            {feedback.comments && (
              <Paragraph style={styles.comment}>"{feedback.comments}"</Paragraph>
            )}
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={onFeedbackPress}
          style={styles.button}
        >
          {feedback ? 'Update Feedback' : 'Give Feedback'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  category: {
    fontStyle: 'italic',
    color: '#666',
  },
  button: {
    marginLeft: 'auto',
  },
  feedbackContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  comment: {
    fontStyle: 'italic',
    color: '#555',
  },
});

export default ProductCard;