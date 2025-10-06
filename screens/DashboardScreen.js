// screens/DashboardScreen.js
// Shows a card summarizing the student's application: application no, status.
// Buttons to view profile and logout.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useApp } from '../context/AppContext';

export default function DashboardScreen({ navigation }) {
  const { user, logout } = useApp();

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>{user ? user.name : 'Student'}</Title>
          <Paragraph>Application No: {user ? user.application_no : '-'}</Paragraph>
          <Paragraph>Status: {user ? user.status : '-'}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('Profile')}>View Profile</Button>
          <Button onPress={() => logout()}>Logout</Button>
        </Card.Actions>
      </Card>

      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={() => alert('This is a demo app — no admin approval flow implemented.')}
      >
        Check Admission Updates
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
});
