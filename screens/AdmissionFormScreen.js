// screens/AdmissionFormScreen.js
// Admission form with Personal Details + Education (10th,12th) + UG details.
// Uses Formik + Yup for validation. On submit, calls context.registerStudent.
// After successful registration we show a modal with email/password/application no.

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Paragraph, Card, Portal, Modal, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useApp } from '../context/AppContext';

// Validation schema
const AdmissionSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too short').required('Required'),
  phone: Yup.string().nullable(),
  dob: Yup.string().nullable(),
  tenth: Yup.string().nullable(),
  twelfth: Yup.string().nullable(),
  ug: Yup.string().nullable(),
});

export default function AdmissionFormScreen({ navigation }) {
  const { registerStudent } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Content>
          <Title style={{ marginBottom: 8 }}>TCE Admission — Simple Form</Title>
          <Paragraph>Fill your details to create an account & submit application.</Paragraph>
        </Card.Content>

        <Card.Content>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              phone: '',
              dob: '',
              tenth: '',
              twelfth: '',
              ug: '',
            }}
            validationSchema={AdmissionSchema}
            onSubmit={async (values, { resetForm }) => {
              setLoading(true);
              try {
                const created = await registerStudent(values);
                setCreatedUser(created);
                setModalVisible(true);
                resetForm();
              } catch (err) {
                console.error(err);
                alert('Error creating account. Maybe email already exists.');
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  label="Full Name"
                  mode="outlined"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.input}
                />
                {errors.name && touched.name && <Text style={styles.err}>{errors.name}</Text>}

                <TextInput
                  label="Email (will be username)"
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                />
                {errors.email && touched.email && <Text style={styles.err}>{errors.email}</Text>}

                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.input}
                />
                {errors.password && touched.password && <Text style={styles.err}>{errors.password}</Text>}

                <Title style={{ marginTop: 12, fontSize: 16 }}>Education</Title>

                <TextInput
                  label="10th Marks / %"
                  mode="outlined"
                  onChangeText={handleChange('tenth')}
                  onBlur={handleBlur('tenth')}
                  value={values.tenth}
                  style={styles.input}
                />

                <TextInput
                  label="12th Marks / %"
                  mode="outlined"
                  onChangeText={handleChange('twelfth')}
                  onBlur={handleBlur('twelfth')}
                  value={values.twelfth}
                  style={styles.input}
                />

                <TextInput
                  label="UG CGPA (if any)"
                  mode="outlined"
                  onChangeText={handleChange('ug')}
                  onBlur={handleBlur('ug')}
                  value={values.ug}
                  style={styles.input}
                />

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  style={{ marginTop: 12 }}
                >
                  Submit & Create Account
                </Button>

                <Button
                  mode="text"
                  onPress={() => navigation.navigate('Login')}
                  style={{ marginTop: 8 }}
                >
                  Already registered? Login
                </Button>
              </View>
            )}
          </Formik>
        </Card.Content>
      </Card>

      {/* Modal to show created account info */}
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
          <Title>Account Created</Title>
          {createdUser ? (
            <View>
              <Paragraph>Application No: {createdUser.application_no}</Paragraph>
              <Paragraph>Email: {createdUser.email}</Paragraph>
              <Paragraph>Password: {createdUser.password}</Paragraph>

              <Button
                mode="contained"
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{ marginTop: 12 }}
              >
                OK
              </Button>
            </View>
          ) : (
            <Paragraph>Loading...</Paragraph>
          )}
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 8,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  err: {
    color: '#b00020',
    marginBottom: 6,
    marginTop: 4,
  },
});
