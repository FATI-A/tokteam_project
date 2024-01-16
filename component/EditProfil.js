import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TextInput, Button, RadioButton, HelperText } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/core";
import { getToken } from "../helpers";
export default function EditProfil() {
  const { user, setUser } = useAuthContext();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pseudoName, setPseudoName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  // const [password, setPassword] = React.useState("");
  // const [confirmedPassword, setConfirmedPassword] = React.useState("");

  const [value, setValue] = React.useState("male");

  const handleEmailChange = (text) => {
    // Vérifier si l'email contient "@tokteam.com"
    const isValidEmail = text.toLowerCase().includes("@tokteam.com");
    setEmailError(!isValidEmail);
    setEmail(text); // Mettre à jour l'état global si nécessaire
  };

  React.useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.email);
    setAddress(user?.address);
    setPseudoName(user?.username);
    setValue(user?.gender);
  }, []);

  const navigation = useNavigation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      firstName: firstName,
      lastName: lastName,
      username: pseudoName,
      address: address,
      gender: value,
      email: email,
    };

    try {
      const jwt = await getToken();
      const response = await fetch(
        `http://192.168.1.168:1337/api/users/${user.id}`,
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

      if (response.ok) {
        setUser(data);
        setError("");
        navigation.navigate("Profil");
      } else {
        throw new Error(data?.error || "Probleme !");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Probleme !");
    }
  };
  return (
    <View style={styles.contenair}>
      <View>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View style={styles.RadioButton}>
            <View>
              <Text>Male</Text>
              <RadioButton value="male" uncheckedColor="grey" color="#2667FF" />
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
            mode="outlined"
            theme={{ roundness: 10 }}
            selectionColor="#2667FF"
            activeOutlineColor="#2667FF"
            style={styles.input}
          />
          <TextInput
            label="last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            mode="outlined"
            theme={{ roundness: 10 }}
            selectionColor="#2667FF"
            activeOutlineColor="#2667FF"
            style={styles.input}
          />
          <TextInput
            label="pseudo Name"
            value={pseudoName}
            onChangeText={(text) => setPseudoName(text)}
            mode="outlined"
            theme={{ roundness: 10 }}
            selectionColor="#2667FF"
            activeOutlineColor="#2667FF"
            style={styles.input}
          />
          <View style={styles.email}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              mode="outlined"
              theme={{ roundness: 10 }}
              selectionColor="#2667FF"
              activeOutlineColor="#2667FF"
              style={styles.input2}
            />
            <HelperText type="error" visible={emailError}>
              L'email doit contenir "@tokteam.com"
            </HelperText>
          </View>
          <TextInput
            label="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            mode="outlined"
            theme={{ roundness: 10 }}
            selectionColor="#2667FF"
            activeOutlineColor="#2667FF"
            style={styles.address}
          />
          {/* <TextInput
          label="Password"
          value={password}
          mode="outlined"
          onChangeText={(text) => setPassword(text)}
          theme={{ roundness: 10 }}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          selectionColor="#2667FF"
          activeOutlineColor="#2667FF"
          style={styles.password}
        /> */}
          {/* <TextInput
          label="Password confirmed"
          value={confirmedPassword}
          mode="outlined"
          onChangeText={(text) => setConfirmedPassword(text)}
          theme={{ roundness: 10 }}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          selectionColor="#2667FF"
          activeOutlineColor="#2667FF"
          style={styles.password}
        /> */}
        </View>
        <View style={styles.bottonView}>
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Update
          </Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contenair: {
    height: "100%",
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "transparent",
    width: "90%",
    marginTop: 20,
  },
  input2: {
    backgroundColor: "transparent",
  },
  email: {
    width: "90%",
    marginTop: 20,
  },
  address: {
    backgroundColor: "transparent",
    width: "90%",
    marginTop: -5,
  },
  // phone: {
  //   backgroundColor: "transparent",
  //   marginTop: 10,
  //   width: "90%",
  // },
  button: {
    marginTop: 20,
    backgroundColor: "#2667FF",
    width: "70%",
  },
  bottonView: {
    alignItems: "center",
  },
  RadioButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  password: {
    backgroundColor: "transparent",
    marginTop: 10,
    width: "90%",
  },
});
