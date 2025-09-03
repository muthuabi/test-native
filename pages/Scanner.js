import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, Text, Card, ActivityIndicator } from 'react-native-paper';

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [dataType, setDataType] = useState('');

  useEffect(() => {
    if (!permission?.granted) {
      requestCameraPermission();
    }
  }, [permission]);

  const requestCameraPermission = async () => {
    const { status } = await requestPermission();
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

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission is required to use the scanner</Text>
        <Button mode="contained" onPress={requestPermission} style={styles.button}>
          Grant Permission
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <CameraView
          style={styles.camera}
          facing={CameraType.back}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417', 'ean13', 'ean8', 'upc_a', 'upc_e'],
          }}
        >
          <View style={styles.scanFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
          <Text style={styles.scanText}>Align QR code within the frame</Text>
        </CameraView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#f5f5f5',
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
});

export default Scanner;