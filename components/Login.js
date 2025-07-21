import React,{useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,TouchableOpacity, TextInput,Image } from "react-native";
// import { TextInput } from 'react-native-paper';
import geoLogo from "../assets/icons/geo-earth.png";
export default function Login() {
  const [formData,setFormData]=useState({username:"",password:""});
  const handleChangeText=(field,value)=>{
    setFormData((prev)=>({...prev,[field]:value}));
  }
  const handleSubmit=(e)=>{
    console.log(formData);
  }
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image source={geoLogo} style={styles.imgLogo} />
      <Text style={styles.formHeader}>Login</Text>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Username</Text>
          <TextInput label="Username" value={formData.username} placeholder="Username" onChangeText={(value)=>handleChangeText("username",value)} style={styles.formControl} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Password</Text>
          <TextInput label="Password" value={formData.password} placeholder="Password" onChangeText={(value)=>handleChangeText("password",value)}  secureTextEntry={true} style={styles.formControl} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Login</Text>
        </TouchableOpacity>
        <Text>Don't have an Account?</Text>
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
    fontWeight:"bold"
  },
  formControl: {
    width: "100%", 
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    
  },
  button:{
    backgroundColor: "#106eA0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  imgLogo:{
      width:120,
      height:120
  }
});