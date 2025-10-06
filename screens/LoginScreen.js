// screens/LoginScreen.js
// Simple email + password login. Uses AppContext.login().

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useApp } from '../context/AppContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function LoginScreen({ navigation }) {
  const { login } = useApp();
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title style={{ marginBottom: 6 }}>Login</Title>
          <Paragraph>Use the email/password shown after registration</Paragraph>
        </Card.Content>

        <Card.Content>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                const user = await login(values.email, values.password);
                if (!user) {
                  alert('Invalid credentials');
                }
                // On success, AppContext sets user and navigation will switch automatically
              } catch (err) {
                console.error(err);
                alert('Login failed');
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  label="Email"
                  mode="outlined"
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

                <Button mode="contained" onPress={handleSubmit} loading={loading} style={{ marginTop: 12 }}>
                  Login
                </Button>

                <Button mode="text" onPress={() => navigation.navigate('AdmissionForm')} style={{ marginTop: 8 }}>
                  Back to Admission Form
                </Button>
              </View>
            )}
          </Formik>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  input: { marginTop: 8 },
  err: { color: '#b00020', marginTop: 4 },
});
