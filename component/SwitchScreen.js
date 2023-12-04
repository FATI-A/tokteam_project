import React from "react";
import Profily from "./Profil.js";
import Theme from "./Theme.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const OnSwitch = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Profily">
      <Stack.Screen name="Profily" component={Profily} />
      <Stack.Screen name="Theme" component={Theme} />
    </Stack.Navigator>
  );
};
export default OnSwitch;
