// Timer.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { FAB, Portal, Modal, Button, Dialog, Paragraph } from 'react-native-paper';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

export default function TimerScreen() {
  // dial values
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // modal + dialog
  const [modalVisible, setModalVisible] = useState(false);
  const [finishedDialogVisible, setFinishedDialogVisible] = useState(false);

  // timer state
  const [remaining, setRemaining] = useState(null); // seconds
  const [total, setTotal] = useState(null); // seconds
  const intervalRef = useRef(null);

  // animated progress smoothing
  const progressAnim = useRef(new Animated.Value(0)).current;

  // wheel data
  const hoursData = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutesData = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // start timer from dial values
  const startTimer = () => {
    const secs = hours * 3600 + minutes * 60;
    if (secs <= 0) {
      return; // ignore zero
    }
    setTotal(secs);
    setRemaining(secs);
    setModalVisible(false);

    // reset progress animation
    progressAnim.setValue(1);
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: secs * 1000,
      useNativeDriver: false,
    }).start();
  };

  // cancel timer
  const cancelTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRemaining(null);
    setTotal(null);
    progressAnim.setValue(0);
  };

  // snooze (adds 1 minute)
  const snoozeOneMinute = () => {
    const newRemaining = 60;
    setTotal(newRemaining);
    setRemaining(newRemaining);
    // restart animation
    progressAnim.setValue(1);
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: newRemaining * 1000,
      useNativeDriver: false,
    }).start();
    setFinishedDialogVisible(false);
  };

  // timer tick effect
  useEffect(() => {
    if (remaining == null) {
      // ensure interval cleared
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    // clear existing interval
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev == null) return null;
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRemaining(0);
          // show finished dialog
          setFinishedDialogVisible(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [remaining]);

  // formatted display
  const format = sec => {
    if (sec == null) return '--:--:--';
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // progress value for progress bar (0..1)
  const progressValue = total && remaining != null ? remaining / total : 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Timer</Text>

        {/* Show running timer */}
        <View style={styles.timerBox}>
          <Text style={styles.timeText}>{format(remaining)}</Text>

          {total && (
            <View style={{ width: '90%', marginTop: 12 }}>
              {/* Animated progress bar driven by progressAnim for smooth continuous progress */}
              <Animated.View style={{ width: '100%' }}>
                <Progress.Bar
                  progress={progressValue}
                  width={null}
                  height={8}
                  borderRadius={6}
                  color="#1a73e8"
                  unfilledColor="#e6f0ff"
                  borderWidth={0}
                />
              </Animated.View>
            </View>
          )}

          {/* Cancel while running */}
          {remaining != null && (
            <View style={{ marginTop: 16 }}>
              <Button mode="contained" onPress={cancelTimer} compact>
                Cancel
              </Button>
            </View>
          )}
        </View>
      </View>

      {/* Floating FAB bottom-right */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="#fff"
        onPress={() => setModalVisible(true)}
      />

      {/* Large modal for dialer */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Set Timer</Text>

          <View style={styles.wheelRow}>
            <View style={styles.wheelCol}>
              <Text style={styles.wheelLabel}>Hours</Text>
              <WheelPickerExpo
                width={120}
                height={220}
                fontSize={24}
                initialSelectedIndex={hours}
                data={hoursData}
                onItemSelected={index => setHours(Number(hoursData[index]))}
                selectedIndicatorWidth={120}
              />
            </View>

            <View style={styles.wheelCol}>
              <Text style={styles.wheelLabel}>Minutes</Text>
              <WheelPickerExpo
                width={120}
                height={220}
                fontSize={24}
                initialSelectedIndex={minutes}
                data={minutesData}
                onItemSelected={index => setMinutes(Number(minutesData[index]))}
                selectedIndicatorWidth={120}
              />
            </View>
          </View>

          <View style={styles.modalButtons}>
            <Button mode="text" onPress={() => setModalVisible(false)}>
              Close
            </Button>
            <Button mode="contained" onPress={startTimer}>
              Start
            </Button>
          </View>
        </Modal>

        {/* Finished dialog (Snooze / Cancel) */}
        <Dialog visible={finishedDialogVisible} onDismiss={() => setFinishedDialogVisible(false)}>
          <Dialog.Title>Timer Finished</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Do you want to snooze for 1 minute?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { setFinishedDialogVisible(false); cancelTimer(); }}>Cancel</Button>
            <Button onPress={snoozeOneMinute}>Snooze</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc' },
  content: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  timerBox: {
    width: '92%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 6,
  },
  timeText: { fontSize: 36, fontWeight: '700' },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    backgroundColor: '#1a73e8',
  },

  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 12,
    borderRadius: 14,
    padding: 18,
    // make modal large
    width: width - 24,
    height: Math.min(520, height * 0.78),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  modalTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 8 },

  wheelRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 6 },
  wheelCol: { alignItems: 'center' },
  wheelLabel: { fontSize: 13, color: '#666', marginBottom: 6 },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
});
