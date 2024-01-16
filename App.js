import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import TabBar from "./layouts/TabBar";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./auth/AuthProvider";

export default function App() {

  return (
    <>
      <View style={styles.container}>
        {/* <AuthContext.Provider value={authContext}> */}
        <AuthProvider>
          <NavigationContainer>
            {/* <TabBar state={state} /> */}
            <TabBar />
          </NavigationContainer>
        </AuthProvider>
        {/* </AuthContext.Provider> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
