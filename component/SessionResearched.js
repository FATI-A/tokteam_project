import * as React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getToken } from "../helpers";
import { parseISO, format } from "date-fns";
import ProfilSessionLooked from "./ProfilSessionLooked";

const SessionResearched = () => {
  const route = useRoute();
  const { sessionId } = route.params;
  const [sessionList, setSessionList] = React.useState(null);

  React.useEffect(() => {
    handleShow();
  }, []);
  const handleShow = async () => {
    try {
      const jwt = await getToken();
      const response = await fetch(
        `http://192.168.1.168:1337/api/sessions-lists/${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = await response.json();
      setSessionList(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const changeFormatDate = (value) => {
    try {
      if (!value || typeof value !== "string") {
        throw new Error("La valeur de la date n'est pas valide");
      }

      const dateObj = parseISO(value);
      return format(dateObj, "yyyy/MM/dd HH:mm:ss");
    } catch (error) {
      console.error("Erreur lors du formatage de la date :", error);
    }
  };
  const onComponentLoad = () => {
    const date = sessionList?.attributes?.createdAt;
    // console.log("data",date);
    return <ProfilSessionLooked sessionDate={date} />;
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.View}>
          <View style={styles.textPosition}>
            <Text style={styles.NameText}> Date : </Text>
            <Text style={styles.NameText}>
              {changeFormatDate(sessionList?.attributes.createdAt)}
            </Text>
          </View>
          {onComponentLoad()}
        </View>
      </ScrollView>
    </>
  );
};
export default SessionResearched;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  View: {
    marginBottom: 20,
  },
  NameText: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontStyle: "italic",
    color: "white",
    marginLeft: 5,
  },
  textPosition: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#2667FF",
    height: 50,
    alignItems: "center",
  },
});
