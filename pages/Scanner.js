import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Linking, SafeAreaView } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Button, Text, Card, ActivityIndicator } from 'react-native-paper';
// Scanner Component
const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [dataType, setDataType] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is needed to scan QR codes',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    
    // Determine data type
    if (/^\d+$/.test(data)) {
      setDataType('Number');
    } else if (data.startsWith('http://') || data.startsWith('https://')) {
      setDataType('Link');
    } else {
      setDataType('Text');
    }
  };

  const handleRetake = () => {
    setScanned(false);
    setScannedData('');
    setDataType('');
  };

  const handleOpenLink = () => {
    if (dataType === 'Link') {
      Linking.openURL(scannedData);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Camera permission is required to use the scanner</Text>
        <Button mode="contained" onPress={requestCameraPermission} style={styles.button}>
          Grant Permission
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <Camera
          style={styles.camera}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.scanFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
          <Text style={styles.scanText}>Align QR code within the frame</Text>
        </Camera>
      ) : (
        <View style={styles.resultContainer}>
          <Card style={styles.resultCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.resultTitle}>
                Scan Result
              </Text>
              <Text variant="bodyMedium" style={styles.dataType}>
                Type: {dataType}
              </Text>
              <Text variant="bodySmall" style={styles.scannedData} numberOfLines={3}>
                {scannedData}
              </Text>
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            {dataType === 'Link' && (
              <Button
                mode="contained"
                icon="link"
                onPress={handleOpenLink}
                style={[styles.button, styles.linkButton]}
              >
                Open Link
              </Button>
            )}
            <Button
              mode="outlined"
              icon="camera-retake"
              onPress={handleRetake}
              style={styles.button}
            >
              Scan Again
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default Scanner;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#6200ee',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 30,
  },
  scanButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    backgroundColor: '#6200ee',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: '#6200ee',
  },
  cornerTopRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: '#6200ee',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#6200ee',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#6200ee',
  },
  scanText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultCard: {
    width: '100%',
    marginBottom: 20,
    elevation: 4,
  },
  resultTitle: {
    color: '#6200ee',
    marginBottom: 10,
  },
  dataType: {
    color: 'green',
    marginBottom: 10,
  },
  scannedData: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    marginVertical: 5,
  },
  linkButton: {
    backgroundColor: '#6200ee',
  },
  permissionText: {
    marginBottom: 20,
    textAlign: 'center',
  },
});