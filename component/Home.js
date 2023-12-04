import React from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { Text } from "react-native";
import ButtonStart from "./Button";
import { Avatar } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";
import { getToken } from "../helpers";
export default function Home() {
  const { session, user } = useAuthContext();
  const handlePressHere = async () => {
    const jwt = await getToken();
    const filter = session.filter((item) => user.id === item.attributes.userId);
    try {
      const values = {
        data: {
          action: "arrived",
        },
      };

       await fetch(
        `http://192.168.1.168:1337/api/sessions/${filter[0].id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handlePressComing = async () => {
    const jwt = await getToken();
    const filter = session.filter((item) => user.id === item.attributes.userId);
    try {
      const values = {
        data: {
          action:"coming",
        },
      };

      const response = await fetch(
        `http://192.168.1.168:1337/api/sessions/${filter[0].id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data= await response.json();
      console.log("data", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.position}>
        <Text style={styles.position_text}>It's time to work </Text>
        <Image source={require("../assets/home6.jpg")} style={styles.image} />
        <ButtonStart
          text={"I'm here"}
          icon1={"home"}
          text2={"I'm coming"}
          icon2={"walk"}
          handlePressHere={handlePressHere}
           handlePressComing={handlePressComing}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    width: 350,
    height: 250,
  },
  position: {
    alignItems: "center",
  },
  position_text: {
    textAlign: "center",
    fontSize: 28,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#2667FF",
    marginTop: -50,
  },
});
