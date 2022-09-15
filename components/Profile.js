import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
// import { useNavigation } from "@react-navigation/native";

const Profile = ({ navigation }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  // const navigation = useNavigation();

  useEffect(() => {
    // check user logged in
    if (!auth.currentUser) {
      navigation.replace("StackScreen");
    }
    getData();
  }, []);

  const getData = async () => {
    try {
      const docRef = await doc(db, "users", auth.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFName(docSnap.data().fname);
        setLName(docSnap.data().lname);
        setAge(docSnap.data().age);
        setBio(docSnap.data().bio);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("get data : " + error);
    }
  };

  const Editnav = () => {
    navigation.navigate("StackScreen", { screen: "Edit" });
  };
  const Logout = () => {
    auth.signOut().then(() => console.log("User has logged out"));
    navigation.replace("StackScreen", { screen: "Login" });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.searchenginejournal.com/wp-content/uploads/2022/04/reverse-image-search-627b7e49986b0-sej-760x400.png",
        }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 80,
          alignSelf: "center",
          marginVertical: 10,
        }}
      />
      <Text style={{ alignSelf: "center", marginBottom: 10, fontSize: 18 }}>
        {fname} {lname}
      </Text>
      <Text style={{ alignSelf: "center", marginBottom: 10, fontSize: 16 }}>
        {bio && bio}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button title="Edit Profile" onPress={Editnav} />
        <Button title="Logout" onPress={Logout} />
      </View>
      <ScrollView>
        <Post
          name={fname}
          img="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80"
          profileImg="https://cdn.searchenginejournal.com/wp-content/uploads/2022/04/reverse-image-search-627b7e49986b0-sej-760x400.png"
        />
        <Post
          name={fname}
          img="https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000"
          profileImg="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
        />
      </ScrollView>
    </View>
  );
};

const Post = ({ name, img, profileImg }) => {
  return (
    <View style={{ margin: 10, backgroundColor: "#ffffff", padding: 5 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5,
        }}
      >
        <Image
          source={{ uri: profileImg }}
          style={{
            width: 35,
            height: 35,
            borderRadius: 50,
          }}
        />
        <Text style={{ fontWeight: "500", fontSize: 15, padding: 5 }}>
          {name}
        </Text>
      </View>
      <Image
        source={{
          uri: img,
        }}
        style={{ width: "100%", height: 250 }}
      />
      <View
        style={{
          padding: 5,
        }}
      >
        <Pressable style={{ backgroundColor: "#c0ccff", marginBottom: 5 }}>
          <Text style={{ textAlign: "center", padding: 8 }}>Like</Text>
        </Pressable>
        <Pressable style={{ backgroundColor: "#c0ccff" }}>
          <Text style={{ textAlign: "center", padding: 8 }}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
