import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput, HelperText, Button, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../helpers";

export default function Register() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pseudoName, setPseudoName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmedPassword, setConfirmedPassword] = React.useState("");
  const [value, setValue] = React.useState("male");
  const [sessions, setSessions] = React.useState("");
  const { setUser } = useAuthContext();
  const navigation = useNavigation();
  const [emailError, setEmailError] = React.useState(false);

  const handleEmailChange = (text) => {
    // Vérifier si l'email contient "@tokteam.com"
    const isValidEmail = text.toLowerCase().includes("@tokteam.com");
    setEmailError(!isValidEmail);
    setEmail(text); // Mettre à jour l'état global si nécessaire
  };
  const addSession = async (user) => {
    try {
      const values = {
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userId: user.id,
          gender: user.gender,
          action: "not clocked",
        },
      };

      const response = await fetch("http://192.168.1.168:1337/api/sessions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setSessions(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePress = async (e) => {
    e.preventDefault();
    if (password && confirmedPassword && password === confirmedPassword) {
      try {
        const values = {
          firstName: firstName,
          lastName: lastName,
          username: pseudoName,
          address: address,
          userRole: "user",
          gender: value,
          email: email,
          password: password,
        };

        const response = await fetch(
          "http://192.168.1.168:1337/api/auth/local/register",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error Data:", errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.jwt && data.user) {
          setToken(data.jwt);
          setUser(data.user);
          addSession(data.user);
          navigation.navigate("Tabs");
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      alert("Passwords do not match");
    }
  };
  const handlePressLogin = async () => {
    navigation.navigate("Login");
  };
  return (
    <ScrollView style={styles.contenair}>
      <View style={styles.position}>
        <Text style={styles.text}> register</Text>
        <View style={styles.RegisterBox}>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={styles.RadioButton}>
              <View>
                <Text>Male</Text>
                <RadioButton
                  value="male"
                  uncheckedColor="grey"
                  color="#2667FF"
                />
              </View>
              <View>
                <Text>Female</Text>
                <RadioButton
                  value="female"
                  uncheckedColor="grey"
                  color="#2667FF"
                />
              </View>
            </View>
          </RadioButton.Group>
          <View style={styles.bottonView}>
            <TextInput
              label="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              mode="flat"
              theme={{ roundness: 10 }}
              underlineColor="#2667FF"
              activeUnderlineColor="#2667FF"
              style={styles.input}
            />
            <TextInput
              label="last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              mode="flat"
              theme={{ roundness: 10 }}
              underlineColor="#2667FF"
              activeUnderlineColor="#2667FF"
              style={styles.input}
            />
            <TextInput
              label="pseudo Name"
              value={pseudoName}
              onChangeText={(text) => setPseudoName(text)}
              mode="flat"
              theme={{ roundness: 10 }}
              underlineColor="#2667FF"
              activeUnderlineColor="#2667FF"
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              mode="flat"
              theme={{ roundness: 10 }}
              underlineColor="#2667FF"
              activeUnderlineColor="#2667FF"
              style={styles.input}
            />
            <HelperText type="error" visible={emailError}>
              L'email doit contenir "@tokteam.com"
            </HelperText>

            <TextInput
              label="Address"
              value={address}
              onChangeText={(text) => setAddress(text)}
              mode="flat"
              theme={{ roundness: 10 }}
              underlineColor="#2667FF"
              activeUnderlineColor="#2667FF"
              style={styles.address}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              activeUnderlineColor="#2667FF"
              underlineColor="#2667FF"
              style={styles.password}
            />
            <TextInput
              label="Password confirmed"
              value={confirmedPassword}
              onChangeText={(text) => setConfirmedPassword(text)}
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              activeUnderlineColor="#2667FF"
              underlineColor="#2667FF"
              style={styles.password}
            />
            <Button
              mode="contained"
              onPress={handlePress}
              style={styles.button}
            >
              Register
            </Button>
          </View>
        </View>
        <View style={styles.register}>
          <View style={styles.positionregister}>
            <Text style={styles.textregister}> Do you have a compte ? </Text>
            <Button
              mode="contained"
              onPress={handlePressLogin}
              style={styles.buttonRegister}
            >
              <Text style={styles.textPass}>Log in</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contenair: {
    backgroundColor: "#3F8EFC",
  },
  position: {
    alignItems: "center",
     height:"100%"
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
  },
  RegisterBox: {
    height: 610,
    backgroundColor: "rgb(244, 244, 244)",
    width: "80%",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "rgba(158, 156, 156, 0.6)",
    borderWidth: 1,
    justifyContent: "center",
   marginTop:20,
  },
  input: {
    backgroundColor: "transparent",
    width: "90%",
    marginTop: 5,
  },
  address: {
    backgroundColor: "transparent",
    width: "90%",
    marginTop: -20,
  },
  phone: {
    backgroundColor: "transparent",
    marginTop: 5,
    width: "90%",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2667FF",
    width: "70%",
  },
  bottonView: {
    alignItems: "center",
  },
  register: {
    height: 65,
    backgroundColor: "rgb(244, 244, 244)",
    width: "80%",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "rgba(158, 156, 156, 0.6)",
    borderWidth: 1,
    marginTop: 15,
  },
  positionregister: {
    flex: 1,
    flexDirection: "row",
  },
  textregister: {
    textAlign: "left",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "grey",
    marginTop: 20,
    marginLeft: 20,
  },
  buttonRegister: {
    marginTop: 10,
    backgroundColor: "transparent",
    width: "40%",
  },
  textPass: {
    textAlign: "right",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#2667FF",
  },
  RadioButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  password: {
    backgroundColor: "transparent",
    marginTop: 5,
    width: "90%",
  },
});
