import * as React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import ButtonAbsente from "./ButtonPageAbsence";
import AbsenceForm from "./AbsenceForm";
import ButtonPageAbsence from "./ButtonPageAbsence";
import { getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";
const Absence = () => {
  const { user, session } = useAuthContext();
  const [inputDate, setInputDate] = React.useState(new Date());
  const [Raison, setRaison] = React.useState("");
  const [fileContent, setFileContent] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);

  const handlePressAbsent = async () => {
    const jwt = await getToken();
    const filter = session.filter((item) => user.id === item.attributes.userId);
    try {
      const values = {
        data: {
          action:"absent",
        },
      };

      const response = await fetch(
        `http://192.168.1.168:1337/api/sessions/${filter[0].id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data= await response.json();
      console.log("data", data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSend = async (e) => {
    e.preventDefault();
    const jwt = await getToken();
    try {
      const values = {
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          pseudo: user.username,
          raison: Raison,
          date: inputDate,
          file: fileContent,
        },
      };

      const response = await fetch(
        "http://192.168.1.168:1337/api/absence-lists",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        }
      );
      handlePressAbsent();
      const data = await response.json();
      console.log("data", data);
      setFileContent("");
      setRaison("");
      setFileName("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.position}>
          <AbsenceForm
            setRaison={setRaison}
            setInputDate={setInputDate}
            Raison={Raison}
            inputDate={inputDate}
            fileName={fileName}
          />
          <ButtonPageAbsence
            fileContent={fileContent}
            setFileContent={setFileContent}
            fileName={fileName}
            setFileName={setFileName}
            handleSend={handleSend}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Absence;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  position_text: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 26,
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 10,
  },
  position: {
    flex: 1,
    alignItems: "center",
  },
});
