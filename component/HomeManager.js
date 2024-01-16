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
  LogBox,
} from "react-native";
import CardHome from "./Card";
import { useNavigation } from "@react-navigation/core";
import { getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";

export default function HomeManager() {
  const { session, user } = useAuthContext();
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

  const handleChangeAction = async () => {
    session.map((session) => actionChange(session.id));
  };

  const actionChange = async (id) => {
    const jwt = await getToken();
    try {
      const values = {
        data: {
          action: "not clocked",
        },
      };
      await fetch(`http://192.168.1.168:1337/api/sessions/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addSessions = async () => {
    try {
      const jwt = await getToken();
      const values = {
        data: {
          title: "session",
        },
      };
      const response = await fetch(
        "http://192.168.1.168:1337/api/sessions-lists",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      // console.log("data all", data);
      addSessionAll(data.data?.id);
    } catch (error) {
      console.error(error);
    }
  };

  const addSessionAll = async (id) => {
    try {
      const jwt = await getToken();
      // console.log("id", id);
      const values = {
        data: {
          sessions: session,
          sessions_list: {
            id: id,
          },
        },
      };

      const response = await fetch(
        "http://192.168.1.168:1337/api/all-sessions",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        }
      );
      const dataAll = await response.json();
      // console.log("data", dataAll);
    } catch (error) {
      console.error(error);
    }
  };

  const addSessionList = async () => {
    try {
      await addSessions();
      handleChangeAction();
    } catch (error) {
      console.error(error);
    }
  };

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
                <Text style={styles.modalText}>
                  Do you want to start a new session ?{" "}
                </Text>
                <View style={styles.alignbutton}>
                  <Pressable
                    style={[styles.button2, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      addSessionList();
                    }}
                  >
                    <Text style={styles.textStyle}>YES</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button2, styles.buttonClose2]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>NO</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>add new session</Text>
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
  alignbutton: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    width: 80,
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
  buttonClose2: {
    backgroundColor: "red",
    marginLeft: 10,
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
