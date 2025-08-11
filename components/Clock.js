import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing,Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
export default function Clock() {
    const [selectedDate, setSelectedDate] = useState('');
    const [today, setToday] = useState(new Date());
    const fadeAnim = useRef(new Animated.Value(1)).current;
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

        return (() => {
            clearInterval(timeInterval);
        })
    }, []);
    const format = (n) => n.toString().padStart(2, '0');
    return (
        <View style={styles.container}>
            <View style={styles.mainCard}>
                <Text style={styles.mainTime}>
                    {format(today.getHours())} : {format(today.getMinutes())} : {format(today.getSeconds())} : {today.getHours() >= 12 ? "PM" : "AM"}
                </Text>
                <View style={styles.subCard}>
                    <Text style={styles.subCardText}>{today.toDateString()}</Text>
                </View>
            </View>


            <Calendar
                renderHeader={(date) => {
                    const header = date.toString('MMMM yyyy');
                    return (
                        <View style={{ maxWidth:"100%",minWidth:"80%", alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{header}</Text>
                        </View>
                    );
                }}


                theme={{
                    backgroundColor: '#f5f5f5', // Whole calendar bg
                    calendarBackground: '#f5f5f5', // Inside calendar bg
                    textSectionTitleColor: '#333', // Weekday labels color
                    monthTextColor: '#1a73e8', // Month text color
                    todayTextColor: '#d32f2f', // Today's date color
                    dayTextColor: '#000', // Normal date text
                    textDisabledColor: '#ccc', // Disabled date
                    selectedDayBackgroundColor: '#1a73e8', // Selected date bg
                    selectedDayTextColor: '#fff', // Selected date text
                }}
                style={styles.calendar}
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                }}
                markedDates={{
                    [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange', selectedColor: 'lightblue' }
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        gap: 50,
        padding: 10,
        alignItems: 'center'
    },
    mainCard: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 25,
        borderRadius: 10,
        elevation: 6,
    },
    mainTime: {
        fontWeight: "bold",
        fontSize: 40
    },
    subCard: {
    },
    subCardText: {
        fontSize: 15
    }
    ,
    calendar: {
        borderRadius: 10,
    }
})