import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      navigation.replace("TabScreen", { screen: "Home" });
    }
  }, []);

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      try {
        auth
          .signInWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            navigation.replace("TabScreen", { screen: "Home" });
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Fill the form");
    }
  };

  const goToRegister = () => {
    navigation.replace("StackScreen", { screen: "Signup" });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
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
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
  },
});
