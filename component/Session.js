import * as React from "react";
import { View, StyleSheet, Text,ScrollView } from "react-native";
import Barsearch from "./Barsearch";
import ProfilSession from "./ProfilSession";

const Session = () => (
  <>
    <ScrollView style={styles.container}>
    <View  style={styles.View}>
      <Barsearch />
      <ProfilSession/>
    </View>
    </ScrollView>
  </>
);
export default Session;
const styles = StyleSheet.create({
    container: {
      backgroundColor:"white"
    },
  View:{
    marginBottom:20
  }});