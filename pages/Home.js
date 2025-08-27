import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Book Store</Text>
            <Text style={styles.subtitle}>Find your next favorite read</Text>

            <Button 
                mode="contained" 
                style={styles.button}
                labelStyle={{ fontSize: 16 }}
                onPress={() => navigation.navigate("Books")} // assuming Books screen
            >
                Explore Books
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#f8f9fa"
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#2c3e50",
        textAlign: "center"
    },
    subtitle: {
        fontSize: 16,
        fontStyle: "italic",
        color: "#7f8c8d",
        marginBottom: 30,
        textAlign: "center"
    },
    button: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: "#3498db"
    }
});
