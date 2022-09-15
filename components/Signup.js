import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

const Signup = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      navigation.replace("TabScreen", { screen: "Home" });
    }
  }, []);

  const handleSignup = async () => {
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          userCredentials.user.updateProfile({
            displayName: username,
          });
          navigation.replace("TabScreen", { screen: "Home" });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const goToRegister = () => {
    navigation.replace("StackScreen", { screen: "Login" });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={username}
          onChangeText={setUserName}
          placeholder="Your Name"
        />
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
          onSubmitEditing={handleSignup}
        />
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={handleSignup}>
          <Text style={styles.submit}>Submit</Text>
        </Pressable>
        <Pressable onPress={goToRegister}>
          <Text style={styles.linkText}>Already have a account? Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

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
