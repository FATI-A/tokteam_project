import React from "react";
import {
  ScrollView,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import CardHome from "./Card";
import { useNavigation } from "@react-navigation/core";


export default function HomeManager() {
  const navigation = useNavigation();
  const handlePress = React.useCallback(async () => {
    navigation.navigate("Sessions");
  });
  const handlePressUser = React.useCallback(async () => {
    navigation.navigate("Users");
  });
  const handlePressAbsence = React.useCallback(async () => {
    navigation.navigate("Absence List");
  });

  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerPosition}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Session is started</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
        </View>
        <View style={styles.Card}>
          <CardHome
            title={"Users list "}
            src={require("../assets/users3.jpg")}
            handlePress={handlePressUser}
          />
        </View>
        <View style={styles.Card}>
          <CardHome
            title={"Session list "}
            src={require("../assets/list3.jpg")}
            handlePress={handlePress}
          />
        </View>
        <View style={styles.Card2}>
          <CardHome
            title={"Absence list "}
            src={require("../assets/list2.jpg")}
            handlePress={handlePressAbsence}
          />
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
    marginTop: 10,
  },
  Card: {
    width: "90%",
    marginTop: 20,
  },
  Card2: {
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#2667FF",
    width: 350,
    height: 50,
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: "#2667FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
