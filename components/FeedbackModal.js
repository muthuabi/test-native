
// components/FeedbackModal.js
import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, Text, Button, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  stars: Yup.number().min(1).max(5).required('Rating is required'),
  comments: Yup.string().required('Comments required'),
});

export default function FeedbackModal({ visible, onClose, product }) {
  const [starCount, setStarCount] = useState(0);

  const handleSubmit = (values, { resetForm }) => {
    console.log('Feedback for:', product.title, { ...values, stars: starCount });
    resetForm();
    setStarCount(0);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <IconButton icon="close" size={24} onPress={onClose} style={styles.closeIcon} />
        <Text variant="titleLarge" style={styles.header}>Feedback for: {product?.title}</Text>
        <Formik
          initialValues={{ email: '', comments: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                label="Email"
                mode="outlined"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <Text style={styles.label}>Rating:</Text>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity key={star} onPress={() => setStarCount(star)}>
                    <MaterialIcons
                      name={star <= starCount ? 'star' : 'star-border'}
                      size={32}
                      color="#FFD700"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {!starCount && <Text style={styles.error}>Rating is required</Text>}

              <TextInput
                label="Comments"
                mode="outlined"
                multiline
                numberOfLines={4}
                onChangeText={handleChange('comments')}
                onBlur={handleBlur('comments')}
                value={values.comments}
                style={styles.input}
              />
              {touched.comments && errors.comments && <Text style={styles.error}>{errors.comments}</Text>}

              <Button mode="contained" onPress={handleSubmit} style={styles.button}>Submit</Button>
              <Button onPress={onClose} textColor="red">Cancel</Button>
            </>
          )}
        </Formik>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, padding: 20, justifyContent: 'center' },
  closeIcon: { position: 'absolute', top: 20, right: 10 },
  header: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginVertical: 10 },
  starRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  label: { fontWeight: 'bold', marginTop: 10 },
});
