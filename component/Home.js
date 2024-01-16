import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { Text } from "react-native";
import ButtonStart from "./Button";
import { Avatar } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";
import { getToken } from "../helpers";
import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
export default function Home() {
  const { session, user } = useAuthContext();
  console.log(session, "session");
  // const [PushToken,setPushToken]=React.useState("");
  // console.log(PushToken,"push token");

  // useEffect(() => {
  //   const fetchExpoPushToken = async () => {
  //     try {
  //       // Ask for notification permissions
  //       const { status } = await Notifications.requestPermissionsAsync();

  //       if (status !== 'granted') {
  //         console.error('Notification permissions not granted!');
  //         return;
  //       }

  //       // Get Expo Push Token
  //       const expoPushToken =(await Notifications.getExpoPushTokenAsync({projectId:"2c37f94e-d728-49f1-8c43-6f9528e531d3"})).data;
  //       console.log('Expo Push Token:', expoPushToken);
  //       setPushToken(expoPushToken);
  //     } catch (error) {
  //       console.error('Failed to get push token for push notification!', error);
  //     }
  //   };

  //   fetchExpoPushToken();
  // }, []);

  const handlePressHere = async () => {
    const jwt = await getToken();
    const filter = session.filter((item) => user.id === item.attributes.userId);
    try {
      const values = {
        data: {
          action: "arrived",
        },
      };

      await fetch(`http://192.168.1.168:1337/api/sessions/${filter[0].id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(values),
      });
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
          action: "coming",
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
      const data = await response.json();
      console.log("data", data);

      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        console.error("Notification permissions not granted!");
        return;
      }
      // Obtenez le token Expo Push de l'utilisateur
      const adminExpoPushToken =
        "ee79AsW9SSaKv4hSXSq5pH:APA91bGVPZQyTI9CQn8bW5mX2c5knCWRpen_SqTB_5r2Lw56xN06HMj-2UGrOIf11jkuOLIrcn3ExU4tK0JFy4P2UETTQA2h5uSsMzsOIMdHowtajnirZCb1FXyvBJP4KVtjpJHM5lNg";
      await sendNotificationToAdmin(user, adminExpoPushToken);
    } catch (error) {
      console.error(error);
    }
  };

  const sendNotificationToAdmin = async (userName, adminExpoPushToken) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "employee is coming  !",
          body: `${userName.firstName} ${userName.lastName} is on the way.`,
        },
        trigger: null, // Pour une notification immédiate
        to: adminExpoPushToken,
      });

      console.log("Notification envoyée avec succès!");
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
