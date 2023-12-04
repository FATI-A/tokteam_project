import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput, HelperText, Button,RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

export default function NewPassword() {
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmedPassword, setConfirmedPassword] = React.useState("");

  const navigation = useNavigation();
  const handlePress = React.useCallback(async () => {
    navigation.navigate('Login');
  });
  const handlePressPassword = React.useCallback(async () => {
    navigation.navigate('PasswordForgotten');
  });
  return (
    <View style={styles.position}>
      <View style={styles.RegisterBox}>
        <View style={styles.bottonView}>
        <TextInput
          label=" activation code"
          value={code}
          onChangeText={(text) => setCode(text)}
          mode="flat"
          theme={{ roundness: 10 }}
          underlineColor="#2667FF"
          activeUnderlineColor="#2667FF"
          style={styles.input}
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
          style={styles.password}/>
      
          <Button
            mode="contained"
            onPress={handlePress}
            style={styles.button}
          >
            Send
          </Button>
          <Button
                mode="contained"
                onPress={handlePressPassword}
                style={styles.buttonEmail}
              >
                <Text style={styles.textPass}> I did not receive the code </Text>
              </Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  position: {
    alignItems: "center",
    backgroundColor: "#3F8EFC",
    height: "100%",
    justifyContent:"center"
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
    height: "50%",
    backgroundColor: "rgb(244, 244, 244)",
    width: "80%",
    borderRadius: 25,
    borderStyle: "solid",
    borderColor: "rgba(158, 156, 156, 0.6)",
    borderWidth: 1,
    justifyContent:"center"
  },
  input: {
    backgroundColor: "transparent",
    width: "90%",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2667FF",
    width: "70%",
  },
  bottonView: {
    alignItems: "center",
  },  textPass: {
    textAlign: "right",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#2667FF",
  },
  buttonEmail: {
    marginTop: 20,
    backgroundColor: "transparent",
    width: "70%",
  },
  password:{
    backgroundColor: "transparent",
    marginTop:10 , 
    width: "90%",
  }

});
