import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@storage_Key");
        const json_value = JSON.parse(value);
        if (value !== null) {
          setName(json_value.name);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const gotoProfile = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <Text>Hello {name ? name : ""}</Text>
      <Button title="Go to Profile" onPress={gotoProfile} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
