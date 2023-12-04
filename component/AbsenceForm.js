import * as React from "react";
import { TextInput, TextInputMask, HelperText } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import InputDate from "./InputDate";
import { useAuthContext } from "../context/AuthContext";

const Absence = (props) => {
  const { user } = useAuthContext();
  return (
    <>
       <TextInput
        label="Pseudo"
        value={user.username}
        editable={false}
        mode="outlined"
        theme={{ roundness: 10 }}
        selectionColor="#2667FF"
        activeOutlineColor="#2667FF"
        style={styles.phone}
      />
      <TextInput
        label="First Name"
        value={user.firstName}
        editable={false}
        mode="outlined"
        theme={{ roundness: 10 }}
        selectionColor="#2667FF"
        activeOutlineColor="#2667FF"
        style={styles.input}
      />
      <TextInput
        label="last Name"
        value={user.lastName}
        mode="outlined"
        editable={false}
        theme={{ roundness: 10 }}
        selectionColor="#2667FF"
        activeOutlineColor="#2667FF"
        style={styles.input}
      />
      <View style={styles.email}>
        <TextInput
          label="Email"
          value={user.email}
          editable={false}
          mode="outlined"
          theme={{ roundness: 10 }}
          selectionColor="#2667FF"
          activeOutlineColor="#2667FF"
          style={styles.input2}
        />
      </View>
      <TextInput
        label="Raison for absence"
        value={props.Raison}
        onChangeText={(text) => props.setRaison(text)}
        mode="outlined"
        theme={{ roundness: 10 }}
        selectionColor="#2667FF"
        activeOutlineColor="#2667FF"
        style={styles.input}
      />
      <InputDate
        setInputDate={props.setInputDate}
        inputDate={props.inputDate}
      />
      <TextInput
        label="upload a file"
        value={props.fileName}
        editable={false}
        mode="outlined"
        theme={{ roundness: 10 }}
        selectionColor="#2667FF"
        activeOutlineColor="#2667FF"
        style={styles.input}
      />
    </>
  );
};

export default Absence;
const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    width: "90%",
    marginTop: 20,
    // marginLeft: 20,
  },
  container: {
    width: "100%",
  },
  input2: {
    backgroundColor: "transparent",
  },
  email: {
    width: "90%",
    marginTop: 20,
  },
  phone: {
    width: "90%",
    backgroundColor: "transparent",
    marginTop: 20,
  },
});
