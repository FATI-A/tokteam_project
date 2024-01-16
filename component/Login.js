import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../helpers";

export default function Login() {
  const { setUser } = useAuthContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError,setPasswordError]=React.useState(false);
  const handlePress = async () => {
    navigation.navigate("Register");
  };
  const handlePressLogin = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      try {
        const values = {
          identifier: email,
          password: password,
        };

        const response = await fetch(
          "http://192.168.1.168:1337/api/auth/local",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          // If response status is not ok, handle the error
          if (response.status === 400) {
            // Assuming 400 status code for validation errors
            const errorData = await response.json();
            if (errorData.message && errorData.message[0].messages) {
              errorData.message[0].messages.forEach((error) => {
                if (error.id === "Auth.form.error.email.provide") {
                  setEmailError(true);
                }
                if (error.id === "Auth.form.error.password.provide") {
                  setPasswordError(true);
                }
              });
            }
          }
          throw new Error("password or email is incorrect");
        }
  
        const data = await response.json();
        setToken(data.jwt);
        setUser(data.user);
        navigation.navigate("Tabs");
      } catch (error) {
        console.error(error);
       
      }
    }
  };
  const handlePressPassword = async () => {
    navigation.navigate("PasswordForgotten");
  };


  return (
    <>
      <ScrollView style={styles.contenair}>
        <View style={styles.position}>
          <Image source={require("../assets/log6.png")} style={styles.image} />
          <View style={styles.loginBox}>
            <View style={styles.email}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={(text)=>setEmail(text)}
                mode="flat"
                theme={{ roundness: 20 }}
                underlineColor="#2667FF"
                activeUnderlineColor="#2667FF"
                style={styles.input2}
              />
              <View>
                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  secureTextEntry
                  right={<TextInput.Icon icon="eye" />}
                  activeUnderlineColor="#2667FF"
                  underlineColor="#2667FF"
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
            </View>
            <View style={styles.bottonView}>
              <Button
                mode="contained"
                onPress={handlePressLogin}
                style={styles.button}
              >
                log in
              </Button>
              <Button
                mode="contained"
                onPress={handlePressPassword}
                style={styles.buttonForget}
              >
                <Text style={styles.textPass}>password forgotten ? </Text>
              </Button>
            </View>
          </View>
          <View style={styles.register}>
            <View style={styles.positionregister}>
              <Text style={styles.textregister}>Do you want to register ?</Text>
              <Button
                mode="contained"
                onPress={handlePress}
                style={styles.buttonRegister}
              >
                <Text style={styles.textPass}>Register</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  contenair:{
    backgroundColor: "#3F8EFC",
  },
  position: {
    alignItems: "center",
    height: "100%",
  },
  image: {
    marginRight: 40,
  },
  loginBox: {
    height: 300,
    backgroundColor: "rgb(244, 244, 244)",
    width: "80%",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "rgba(158, 156, 156, 0.6)",
    borderWidth: 1,
    justifyContent: "center",
  },
  input2: {
    backgroundColor: "transparent",
  },
  email: {
    width: "90%",
    marginTop: 20,
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
    marginTop: 10,
    backgroundColor: "transparent",
    width: "70%",
  },
  buttonRegister: {
    marginTop: 20,
    backgroundColor: "transparent",
    width: "40%",
  },
  bottonView: {
    alignItems: "center",
  },
  register: {
    height: 80,
    backgroundColor: "rgb(244, 244, 244)",
    width: "80%",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "rgba(158, 156, 156, 0.6)",
    borderWidth: 1,
    marginTop: 30,
  },
  positionregister: {
    flex: 1,
    flexDirection: "row",
    justifyContent:"space-between"
  },
  textregister: {
    textAlign: "left",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "grey",
    marginTop: 30,
    marginLeft: 20,
  },
  // error: {
  //   textAlign: "left",
  //   fontSize: 14,
  //   fontStyle: "italic",
  //   fontWeight: "bold",
  //   color: "red",
  //   marginTop: 30,
  //   marginLeft: 20,
  // },
});
