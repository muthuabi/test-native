import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import { CameraView, useCameraPermissions,CameraType } from 'expo-camera';
import { Button, Text, Card, ActivityIndicator } from 'react-native-paper';

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [dataType, setDataType] = useState('');
  // const [face,setFace]=useState<CameraType>('back');
  const [face,setFace]=useState("back");

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);
  const toggleFace = () => {
    setFace((prevFace) => (prevFace === 'back' ? 'front' : 'back'));
  }
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData(data);

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
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          Camera permission is required to use the scanner
        </Text>
        <Button
          mode="contained"
          onPress={requestPermission}
          style={styles.button}
        >
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
          facing={face}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.scanFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
          <Text style={styles.scanText}>Align QR code within the frame</Text>
          <Button
            icon="camera"
            mode="contained"
            onPress={toggleFace}
            style={[styles.button, {backgroundColor:"transparent", position: 'absolute', bottom: 20 }]}
            />
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
              <Text
                variant="bodySmall"
                style={styles.scannedData}
                numberOfLines={3}
              >
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
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  camera: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  resultCard: { width: '100%', marginBottom: 20, elevation: 4 },
  resultTitle: { color: '#6200ee', marginBottom: 10 },
  dataType: { color: 'green', marginBottom: 10 },
  scannedData: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: { width: '100%', gap: 10 },
  button: { marginVertical: 5 },
  linkButton: { backgroundColor: '#6200ee' },
  permissionText: { marginBottom: 20, textAlign: 'center' },
});
