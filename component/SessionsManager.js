import React from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { Avatar, Button } from "react-native-paper";
import CardHome from "./Card";
import { useNavigation } from "@react-navigation/core";
import CardSessions from "./CardSession";
export default function SessionManager() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerPosition}>
        <View style={styles.Card}>
          <CardSessions />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  centerPosition: {
    alignItems: "center",
  },

  Card: {
    width: "90%",
    marginTop: 20,
  },
});
