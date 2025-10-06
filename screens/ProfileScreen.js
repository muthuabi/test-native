// screens/ProfileScreen.js
// Shows student's full information. Simple, read-only.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useApp } from '../context/AppContext';

export default function ProfileScreen() {
  const { user } = useApp();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Profile</Title>
          <Paragraph>Name: {user.name}</Paragraph>
          <Paragraph>Email: {user.email}</Paragraph>
          <Paragraph>Phone: {user.phone}</Paragraph>
          <Paragraph>DOB: {user.dob}</Paragraph>
          <Paragraph>10th: {user.tenth_mark}</Paragraph>
          <Paragraph>12th: {user.twelfth_mark}</Paragraph>
          <Paragraph>UG CGPA: {user.ug_cgpa}</Paragraph>
          <Paragraph>Application No: {user.application_no}</Paragraph>
          <Paragraph>Status: {user.status}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'flex-start', backgroundColor: '#fff' },
});
