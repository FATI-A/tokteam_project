import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

export default function PasswordForgotten() {
  const [email, setEmail] = React.useState("");
  const onChangeText = (text) => setEmail(text);

  const hasErrors = () => {
    return !email.includes("@tikteam.com");
  };
  const navigation = useNavigation();
  const handlePress = React.useCallback(async () => {
    navigation.navigate('NewPassword');
  });
  const handlePressLogin = React.useCallback(async () => {
    navigation.navigate('Login');
  });

  return (
    <>
      <View>
        <View style={styles.position}>
            <View style={styles.register}>
            <Text style={styles.Text}>
              will we send an activation code to your email, please enter your
              email
            </Text>
            </View>
          <View style={styles.loginBox}>
            <View style={styles.email}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                mode="flat"
                theme={{ roundness: 20 }}
                underlineColor="#2667FF"
                activeUnderlineColor="#2667FF"
                style={styles.input2}
              />
            </View>
            <View style={styles.bottonView}>
              <Button mode="contained" style={styles.button}
                 onPress={handlePress}
              >
                Send
              </Button>
              <Button
                mode="contained"
                onPress={handlePressLogin}
                style={styles.buttonForget}
              >
                <Text style={styles.textPass}> return to the login page  </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  position: {
    alignItems: "center",
    backgroundColor: "#3F8EFC",
    height: "100%",
    justifyContent: "center",
  },
  loginBox: {
    height: "40%",
    backgroundColor: "rgb(244, 244, 244)",
    width: "80%",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "rgba(158, 156, 156, 0.6)",
    borderWidth: 1,
    justifyContent: "center",
    marginTop:20
  },
  input2: {
    backgroundColor: "transparent",
  },
  email: {
    width: "90%",
    marginTop: 30,
    marginLeft: 15,
  },
  textPass: {
    textAlign: "right",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#2667FF",
  },
  button: {
    marginTop: 35,
    backgroundColor: "#2667FF",
    width: "70%",
  },
  buttonForget: {
    marginTop: 20,
    backgroundColor: "transparent",
    width: "70%",
  },
  bottonView: {
    alignItems: "center",
  },
  Text: {
    textAlign:"center",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "grey"
},
register: {
    height: "10%",
    backgroundColor: "rgb(244, 244, 244)",
    width: "80%",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "rgba(158, 156, 156, 0.6)",
    borderWidth: 1,
    marginTop: 15,
    justifyContent:"center"
  },
});
