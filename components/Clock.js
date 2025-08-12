import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "react-native-paper";
const createStyles = (theme) =>
  StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: "center",
      gap: 50,
      padding: 10,
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
    },
    mainCard: {
      width: "100%",
      backgroundColor: theme === "dark" ? "#1e1e1e" : "white",
      alignItems: "center",
      paddingHorizontal: 5,
      paddingVertical: 25,
      borderRadius: 10,
      elevation: 6,
      shadowColor: theme === "dark" ? "#000" : "#aaa",
    },
    mainTime: {
      fontWeight: "bold",
      fontSize: 40,
      color: theme === "dark" ? "#fff" : "#000",
    },
    subCardText: {
      fontSize: 15,
      color: theme === "dark" ? "#bbb" : "#333",
    },
    calendar: {
      borderRadius: 10,
      backgroundColor: theme === "dark" ? "#121212" : "#fff",
      // react-native-calendars doesn't have full dark mode, but you can adjust theme prop accordingly
    },
  });

export default function Clock() {
  const [selectedDate, setSelectedDate] = useState("");
  const { theme,toggleTheme } = useTheme();
  const [today, setToday] = useState(new Date());
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const styles = createStyles(theme);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      // Animate fade
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      setToday(new Date());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  const format = (n) => n.toString().padStart(2, "0");
  return (
    <View style={styles.container}>
        <Button style={styles.modeBtn} onPress={toggleTheme}>Mode</Button>
      <View style={styles.mainCard}>
        <Text style={styles.mainTime}>
          {format(today.getHours())} : {format(today.getMinutes())} : 
          {format(today.getSeconds())} : {today.getHours() >= 12 ? "PM" : "AM"}
        </Text>
        <View style={styles.subCard}>
          <Text style={styles.subCardText}>{today.toDateString()}</Text>
        </View>
      </View>

      <Calendar
        renderHeader={(date) => {
          const header = date.toString("MMMM yyyy");
          return (
            <View
              style={{
                maxWidth: "100%",
                minWidth: "80%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{header}</Text>
            </View>
          );
        }}
        theme={{
          backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
          calendarBackground: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
          textSectionTitleColor: theme === "dark" ? "#aaa" : "#333",
          monthTextColor: theme === "dark" ? "#90caf9" : "#1a73e8",
          todayTextColor: theme === "dark" ? "#f44336" : "#d32f2f",
          dayTextColor: theme === "dark" ? "#eee" : "#000",
          textDisabledColor: theme === "dark" ? "#555" : "#ccc",
          selectedDayBackgroundColor: theme === "dark" ? "#90caf9" : "#1a73e8",
          selectedDayTextColor: theme === "dark" ? "#121212" : "#fff",
        }}
        style={styles.calendar}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
            selectedColor: "lightblue",
          },
        }}
      />
    </View>
  );
}
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         gap: 50,
//         padding: 10,
//         alignItems: 'center'
//     },
//     mainCard: {
//         width: '100%',
//         backgroundColor: 'white',
//         alignItems: 'center',
//         paddingHorizontal: 5,
//         paddingVertical: 25,
//         borderRadius: 10,
//         elevation: 6,
//     },
//     mainTime: {
//         fontWeight: "bold",
//         fontSize: 40
//     },
//     subCard: {
//     },
//     subCardText: {
//         fontSize: 15
//     }
//     ,
//     calendar: {
//         borderRadius: 10,
//     }
// })
