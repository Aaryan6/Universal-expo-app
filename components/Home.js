import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Post
          name="john"
          img="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80"
          profileImg="https://cdn.searchenginejournal.com/wp-content/uploads/2022/04/reverse-image-search-627b7e49986b0-sej-760x400.png"
          navigation={navigation}
        />
        <Post
          name="anna"
          img="https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000"
          profileImg="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
        />
      </ScrollView>
    </View>
  );
};

const Post = ({ name, img, profileImg, navigation }) => {
  const gotoProfile = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={{ margin: 10, backgroundColor: "#ffffff", padding: 5 }}>
      <Pressable onPress={gotoProfile}>
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
      </Pressable>
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});
