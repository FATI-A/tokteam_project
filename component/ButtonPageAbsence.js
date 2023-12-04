import * as React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
export default function ButtonPageAbsence(props) {
  const selectDoc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
      });
      console.log(result, "result");
      const asset = result.assets[0];
       const name = asset.name
       props.setFileName(name);
      if (asset && asset.uri) {
        const content = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        props.setFileContent(content);
      } else {
        console.log("L'URI du document est null ou undefined.");
      }
    } catch (err) {
      console.log(err);
    }
  };
 

  return (
    <>
      <Button
        icon="cloud-upload"
        mode="contained"
        onPress={selectDoc}
        style={styles.button2}
      >upload a document
      </Button>
      <Button
        icon="send"
        mode="contained"
        onPress={props.handleSend}
        style={styles.button}
      >
        send the document
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2667FF",
    width: "70%",
    marginTop: 20,
  },
  button2: {
    backgroundColor: "#3B28CC",
    width: "70%",
    marginTop: 20,
  },
});
