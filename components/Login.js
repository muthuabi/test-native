import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from "react-native";

export default function Login() {

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
      <Text style={styles.formHeader}>Login</Text>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Username</Text>
          <TextInput placeholder="Username" style={styles.formControl} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Password</Text>
          <TextInput placeholder="Password" secureTextEntry={true} style={styles.formControl} />
        </View>
        <TouchableOpacity style={styles.button}>
            <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    gap:15
  },
  formHeader:{
    fontWeight: "bold",
    fontSize: 30,
  },
  formGroup: {
    marginBottom: 15,
    width: "80%", 
  },
  formLabel: {
    fontSize: 16,
    color: "#333",
  },
  formControl: {
    width: "100%", 
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    
  },
  button:{
    backgroundColor: "#FF9D95",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  }
});