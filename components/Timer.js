import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import InputSpinner from 'react-native-input-spinner';
import { useTheme } from '../contexts/ThemeContext'; // your theme context

export default function Timer() {
  const { theme,toggleTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const intervalRef = useRef(null);

  const startTimer = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds <= 0) {
      Alert.alert("Please set a valid time");
      return;
    }
    setRemainingTime(totalSeconds);
    setModalVisible(false);
  };

  useEffect(() => {
    if (remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            Alert.alert(
              "Timer Finished",
              "Do you want to snooze?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Snooze 1 min", onPress: () => setRemainingTime(60) }
              ]
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [remainingTime]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
    },
    addButton: {
      backgroundColor: theme === 'dark' ? '#2196F3' : '#1a73e8',
      width: 70,
      height: 70,
      bottom: 10,
      position: 'absolute',
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: theme === 'dark' ? '#000' : '#000',
      shadowOpacity: 0.3,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 2 },
    },
    addButtonText: {
      color: '#fff',
      fontSize: 40,
    },
    timerText: {
      fontSize: 50,
      marginTop: 30,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#eee' : '#000',
    },
    modalBox: {
      backgroundColor: theme === 'dark' ? '#222' : 'white',
      padding: 20,
      borderRadius: 15,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    numericRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    colon: {
      fontSize: 30,
      marginHorizontal: 10,
      color: theme === 'dark' ? '#eee' : '#000',
    },
    startButton: {
      backgroundColor: theme === 'dark' ? '#2196F3' : '#1a73e8',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    startButtonText: {
      color: '#fff',
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {remainingTime !== null && (
        <Text style={styles.timerText}>
          {formatTime(remainingTime)}
        </Text>
      )}

      {/* Popup Modal */}
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Set Timer</Text>
          <View style={styles.numericRow}>
            <InputSpinner
              max={59}
              min={0}
              step={1}
              value={minutes}
              onChange={setMinutes}
              skin="round"
              height={50}
              width={100}
              color={theme === 'dark' ? '#2196F3' : '#1a73e8'}
              inputStyle={{ color: theme === 'dark' ? '#eee' : '#000' }}
            />
            <Text style={styles.colon}>:</Text>
            <InputSpinner
              max={59}
              min={0}
              step={1}
              value={seconds}
              onChange={setSeconds}
              skin="round"
              height={50}
              width={100}
              color={theme === 'dark' ? '#2196F3' : '#1a73e8'}
              inputStyle={{ color: theme === 'dark' ? '#eee' : '#000' }}
            />
          </View>

          <TouchableOpacity style={styles.startButton} onPress={startTimer}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
