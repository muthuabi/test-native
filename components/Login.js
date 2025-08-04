import React,{useState,useEffect} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,TouchableOpacity, TextInput,Image, Alert } from "react-native";
import geoLogo from "../assets/icons/geo-earth.png";
import { useAppContext } from '../contexts/AppContext';
export default function Login({navigation}) {
  const {setUsername}=useAppContext();
  const [formData,setFormData]=useState({username:"",password:""});
  const [errorText,setErrorText]=useState({username:"",password:""});
  const [submitDisabled,setSubmitDisabled]=useState(true);
  const allowedUsers=[
    {username:"krish@gmail.com",password:"Krish123"},
    {username:"muthuabi@gmail.com",password:"Muthu123"}
  ];

  const handleChangeText=(field,value)=>{
    setFormData((prev)=>({...prev,[field]:value}));
    setErrorText((prev)=>({...prev,[field]:""})); // Clear error while typing
  }

  const handleBlur = (field) => {
    if (!formData[field]?.trim()) {
      setErrorText((prev) => ({
        ...prev,
        [field]: `${field[0].toUpperCase() + field.slice(1)} is required`,
      }));
    } else if (field === "username" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field])) {
      setErrorText((prev) => ({
        ...prev,
        [field]: "Invalid email format",
      }));
    }
  };

  const handleSubmit=(e)=>{
    const user=allowedUsers.find((value)=>value.username==formData.username);
    if(!user) {
      Alert.alert("GeoLogin","User Not Found");
      return;
    }
    if(user.password!==formData.password) {
      Alert.alert("GeoLogin","Invalid Password");
      return;
    }
    Alert.alert("GeoLogin","Credentials Validated");
    setUsername(user.username);
    navigation.navigate("Home");
  };

   useEffect(() => {
    const hasErrors = Boolean(errorText.username || errorText.password);
    const isIncomplete = Boolean(!formData.username.trim() || !formData.password.trim());
    setSubmitDisabled(hasErrors || isIncomplete);
  }, [formData, errorText]);

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image source={geoLogo} style={styles.imgLogo} />
        <Text style={styles.formHeader}>Login</Text>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Username</Text>
          <TextInput
            value={formData.username}
            placeholder="Username"
            onChangeText={(value)=>handleChangeText("username",value)}
            onBlur={()=>handleBlur("username")}
            style={styles.formControl}
          />
          {errorText.username ? <Text style={styles.errorText}>{errorText.username}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Password</Text>
          <TextInput
            value={formData.password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(value)=>handleChangeText("password",value)}
            onBlur={()=>handleBlur("password")}
            style={styles.formControl}
          />
          {errorText.password ? <Text style={styles.errorText}>{errorText.password}</Text> : null}
        </View>

        <TouchableOpacity style={[styles.button,{opacity:submitDisabled && 0.5}]} disabled={submitDisabled} onPress={handleSubmit}>
          <Text>Login</Text>
        </TouchableOpacity>

        <Text>Don't have an Account? Contact Admin</Text>
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
    gap: 15,
  },
  formHeader: {
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
    fontWeight: "bold",
  },
  formControl: {
    width: "100%", 
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#106eA0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  imgLogo: {
    width: 120,
    height: 120,
  }
});
