import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { Switch } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Theme() {
  const [isSwitchOnL, setIsSwitchOnL] = React.useState(false);
  const [isSwitchOnD, setIsSwitchOnD] = React.useState(true);
  const onToggleSwitch = () => {
    if (!isSwitchOnL) {
      setIsSwitchOnL(!isSwitchOnL);
      setIsSwitchOnD(!isSwitchOnD);
    } else {
      setIsSwitchOnL(!isSwitchOnL);
      setIsSwitchOnD(!isSwitchOnD);
    }
  };
  return (
    <> 
    <View style={styles.container}>
      <View style={styles.theme}>
        <Ionicons name="sunny" size={26} color="black" />
        <Text style={styles.textTheme}> light theme </Text>
        <Switch
          value={isSwitchOnL}
          onValueChange={onToggleSwitch}
          color="#2667FF"
        />
      </View>
      <View style={styles.theme}>
        <Ionicons name="moon" size={22} color="black" />
        <Text style={styles.textTheme2}>dark theme </Text>
        <Switch
          value={isSwitchOnD}
          onValueChange={onToggleSwitch}
          color="#2667FF"
        />
      </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
    container:{
     height:"100%",
     backgroundColor:'white'
    },
  iconPosition: {
    marginTop: 60,
    flexDirection: "row",
    marginLeft: 20,
  },

  textTheme: {
    textAlign: "flex-start",
    fontSize: 22,
    fontWeight: "400",
    color: "black",
    marginLeft: 5,
    marginRight: 20,
  },
  textTheme2: {
    textAlign: "flex-start",
    fontSize: 22,
    fontWeight: "400",
    color: "black",
    marginLeft: 10,
    marginRight: 20,
  },
  theme: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 20,
  },
});
