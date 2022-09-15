import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

const Edit = ({ navigation }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const updateData = async () => {
    const docRef = doc(db, "users", auth.currentUser?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      try {
        await updateDoc(doc(db, "users", auth.currentUser?.uid), {
          fname: fname,
          lname: lname,
          age: age,
          bio: bio,
        });
        navigation.replace("TabScreen", { screen: "Profile" });
      } catch (error) {
        console.log("update data : " + error);
      }
    } else {
      try {
        await setDoc(doc(db, "users", auth.currentUser?.uid), {
          fname: fname,
          lname: lname,
          age: age,
          bio: bio,
        });
        navigation.replace("TabScreen", { screen: "Profile" });
      } catch (error) {
        console.log("add data : " + error);
      }
    }
  };

  const getData = async () => {
    const docRef = doc(db, "users", auth.currentUser?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFName(docSnap.data().fname);
      setLName(docSnap.data().lname);
      setAge(docSnap.data().age);
      setBio(docSnap.data().bio);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <View>
      <Text style={{ padding: 10, margin: 5 }}>Edit Profile</Text>
      <TextInput
        placeholder="First Name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          backgroundColor: "#ffffff",
          padding: 10,
          margin: 5,
        }}
        value={fname}
        onChangeText={setFName}
      />
      <TextInput
        placeholder="Last Name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          backgroundColor: "#ffffff",
          padding: 10,
          margin: 5,
        }}
        value={lname}
        onChangeText={setLName}
      />
      <TextInput
        placeholder="Age"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          backgroundColor: "#ffffff",
          padding: 10,
          margin: 5,
        }}
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        placeholder="Bio"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          backgroundColor: "#ffffff",
          padding: 10,
          margin: 5,
        }}
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Update Profile" onPress={updateData} />
      <Button title="Get Data" onPress={getData} />
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({});
