import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [change, setChange] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@storage_Key");
        const json_value = JSON.parse(value);
        if (value !== null) {
          setName(json_value.name);
          setEmail(json_value.email);
          setBio(json_value.bio);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  // storage
  const storeData = async () => {
    const data = {
      name: name,
      email: email,
      bio: bio,
    };
    try {
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(data));
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      const json_value = JSON.parse(value);
      if (value !== null) {
        setName(json_value.name);
        setEmail(json_value.email);
        setBio(json_value.bio);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = async () => {
    const data = {
      name: "",
      email: "",
      bio: "",
    };
    try {
      const value = await AsyncStorage.setItem(
        "@storage_Key",
        JSON.stringify(data)
      );
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{name && name}</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Your Name"
          onChangeText={setName}
          style={styles.input}
          value={name}
        />
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          style={styles.input}
          value={email}
        />
        <TextInput
          placeholder="Bio"
          onChangeText={setBio}
          style={styles.input}
          value={bio}
        />
        <TouchableOpacity style={styles.button} onPress={storeData}>
          <Text style={styles.btext}>Store data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getData}>
          <Text style={styles.btext}>Get data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteData}>
          <Text style={styles.btext}>Delete Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
  },
  input: {
    backgroundColor: "#fff",
    color: "#333",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderColor: "#ccc",
    borderWidth: 2,
  },
  button: {
    backgroundColor: "#4db0ea",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 5,
  },
  btext: {
    color: "#fff",
    textAlign: "center",
  },
});
