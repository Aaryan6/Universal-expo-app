import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const data = {
            email: userCredentials.user.email,
            name: userCredentials.user.displayName,
          };
          const storeData = async () => {
            try {
              await AsyncStorage.setItem("@storage_Key", JSON.stringify(data));
            } catch (error) {
              console.log(error);
            }
          };
          storeData();
          navigation.navigate("Home");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const goToRegister = () => {
    navigation.navigate("Signup");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in {name ? "Welcome " + name : ""}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <TextInput
          style={styles.inputField}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          onSubmitEditing={handleLogin}
        />
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={handleLogin}>
          <Text style={styles.submit}>Submit</Text>
        </Pressable>
        <Pressable onPress={goToRegister}>
          <Text style={styles.linkText}>
            Don't have any account? Create account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputField: {
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderColor: "#eee",
    borderWidth: 2,
  },
  inputContainer: {
    width: "80%",
  },
  buttons: {
    width: "50%",
  },
  submit: {
    backgroundColor: "#f4098a",
    borderRadius: 5,
    padding: 12,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
  },
  linkText: {
    color: "#fc7ad5",
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
  },
});
