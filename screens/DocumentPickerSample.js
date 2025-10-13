import React, { useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button, Card } from 'react-native-paper';

export default function DocumentPickerScreen() {
  const [files, setFiles] = useState([]);

  const pickDocuments = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', '*/*'], // allow both images and docs
      multiple: true,
      copyToCacheDirectory:false
    });

    if (result.canceled) return;

    setFiles(result.assets); // add selected files
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={pickDocuments}>
        Pick Files / Images
      </Button>

        <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        <Card style={styles.card}>
            {item.mimeType?.startsWith('image/') && item.uri ? (
            <Image source={{ uri: item.uri }} style={styles.image} />
            ) : null}
            <Text>Name: {item.name}</Text>
            <Text>Type: {item.mimeType}</Text>
            <Text>Size: {item.size} bytes</Text>
            <Text>URI: {item.uri}</Text>
            {item.width && <Text>Width: {item.width}</Text>}
            {item.height && <Text>Height: {item.height}</Text>}
        </Card>
        )}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  card: {
    padding: 10,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
