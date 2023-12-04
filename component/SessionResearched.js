import * as React from "react";
import { View, StyleSheet, Text,ScrollView } from "react-native";
import Barsearch from "./Barsearch";
import ProfilSession from "./ProfilSession";

const SessionResearched = () => (
  <>
    <ScrollView style={styles.container}>
    <View  style={styles.View}>
      <View style={styles.textPosition}>
        <Text style={styles.NameText}> Date : </Text>
        <Text style={styles.NameText} > 13/12/2023 </Text>
      </View>
      <ProfilSession/>
    </View>
    </ScrollView>
  </>
);
export default SessionResearched ;
const styles = StyleSheet.create({
    container: {
      backgroundColor:"white",
     
    },
  View:{
    marginBottom:20,
  },
  NameText: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontStyle: "italic",
    color: "white",
    marginLeft: 5,
  },
  textPosition:{
    flexDirection:"row",
    justifyContent:"center",
    backgroundColor:"#2667FF",
    height :50,
    alignItems:"center"
  }
});