import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MenuProfil from "./Menu";
import { useAuthContext } from "../context/AuthContext";
export default function Profil() {
  const { user} = useAuthContext();
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.background}>
          <MenuProfil />
        </View>
        { user.gender === "female" ?(
          <View style={styles.Image}>
          <Avatar.Image size={150} source={require("../assets/avatarF.jpg")} />
        </View>
        ):(
          <View style={styles.Image}>
          <Avatar.Image size={150} source={require("../assets/avatarh.jpg")} />
        </View>
        )}
        <View style={styles.position}>
          <View style={styles.icon}>
            <Ionicons name="person-circle-outline" size={20} color="grey" />
            <Text style={styles.NameText}>First Name : </Text>
          </View>
          <Text style={styles.NameText2}>{user.firstName}</Text>
        </View>
        <View style={styles.div}>
          <Divider style={styles.Divider} />
        </View>
        <View style={styles.position}>
          <View style={styles.icon}>
            <Ionicons name="person-outline" size={20} color="grey" />
            <Text style={styles.NameText}> Last Name : </Text>
          </View>
          <Text style={styles.NameText2}>{user.lastName}</Text>
        </View>
        <View style={styles.div}>
          <Divider style={styles.Divider} />
        </View>
        <View style={styles.position}>
          <View style={styles.icon}>
            <Ionicons name="person" size={20} color="grey" />
            <Text style={styles.NameText}> pseudoName : </Text>
          </View>
          <Text style={styles.NameText2}> {user.username}</Text>
        </View>
        <View style={styles.div}>
          <Divider style={styles.Divider} />
        </View>
        <View style={styles.position}>
          <View style={styles.icon}>
            <Ionicons name="male-female-outline" size={20} color="grey" />
            <Text style={styles.NameText}> Gender : </Text>
          </View>
          <Text style={styles.NameText2}>{user.gender}</Text>
        </View>
        <View style={styles.div}>
          <Divider style={styles.Divider} />
        </View>
        <View style={styles.position}>
          <View style={styles.icon}>
            <Ionicons name="mail-outline" size={20} color="grey" />
            <Text style={styles.NameText}> Email : </Text>
          </View>
          <Text style={styles.NameText2}>{user.email}</Text>
        </View>
        <View style={styles.div}>
          <Divider style={styles.Divider} />
        </View>
        <View style={styles.position}>
          <View style={styles.icon}>
            <Ionicons name="location-outline" size={20} color="grey" />
            <Text style={styles.NameText}> address : </Text>
          </View>
          <Text style={styles.NameText2}>{user.address}</Text>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    position: "relative",
  },
  Image: {
    flex: 1,
    alignItems: "center",
    marginBottom: 10,
    zIndex: 1,
    marginTop: -10,
  },
  NameText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "italic",
    color: "grey",
    marginLeft: 5,
  },
  background: {
    zIndex: 2,
    marginTop: -10,
  },

  NameText2: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "italic",
    color: "black",
  },
  position: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  Divider: {
    width: "100%",
    height: 2,
  },

  div: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    flex: 1,
    flexDirection: "row",
  },
});
