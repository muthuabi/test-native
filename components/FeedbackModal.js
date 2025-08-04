import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const FeedbackModal = ({username,visible, onDismiss, onSubmit, product, initialData }) => {
  const [email, setEmail] = useState(username || '');
  const [rating, setRating] = useState(initialData?.rating || 3);
  const [feedbackType, setFeedbackType] = useState(initialData?.feedbackType || 'general');
  const [comments, setComments] = useState(initialData?.comments || '');

  const handleSubmit = () => {
    onSubmit({
      email,
      rating,
      feedbackType,
      comments,
    });
  };

  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text style={styles.modalTitle}>Feedback for {product?.title}</Text>
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled={Boolean(username)}
        />
        
        <Text style={styles.label}>Rating: {rating}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={rating}
          onValueChange={setRating}
          maximumTrackTintColor="#ccc"
        />
        
        <Text style={styles.label}>Feedback Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={feedbackType}
            onValueChange={setFeedbackType}
            style={styles.picker}
          >
            <Picker.Item label="General" value="general" />
            <Picker.Item label="Quality" value="quality" />
            <Picker.Item label="Price" value="price" />
            <Picker.Item label="Shipping" value="shipping" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        
        <TextInput
          label="Comments"
          value={comments}
          onChangeText={setComments}
          style={[styles.input, styles.commentsInput]}
          multiline
          numberOfLines={4}
        />
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="outlined" 
            onPress={onDismiss}
            style={styles.button}
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSubmit}
            style={styles.button}
          >
            Submit
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  commentsInput: {
    height: 100,
  },
  label: {
    marginBottom: 5,
    color: '#666',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default FeedbackModal;