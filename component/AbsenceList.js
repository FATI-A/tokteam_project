import * as React from "react";
import { Button, DataTable } from "react-native-paper";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { getToken } from "../helpers";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
export const dataTableTitleStyle = {
  color: "white",
};

const AbsenceList = () => {
  const [absences, setAbsences] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jwt = await getToken();
      const response = await fetch("http://192.168.1.168:1337/api/absence-lists", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      const dataJson = await response.json();
      // console.log("data",dataJson.data)
      setAbsences(dataJson.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur API :", error);
      setLoading(false);
    }
  };

  const downloadFile = async (fileContent, firstName, lastName) => {
      if (fileContent) {
        // Créer un chemin d'accès pour le fichier temporaire
        const filePath = `${FileSystem.cacheDirectory}absenceJustification-${firstName}-${lastName}.pdf`;
        try {
          // Écrire le contenu binaire dans un fichier temporaire
          await FileSystem.writeAsStringAsync(filePath, fileContent, {
            encoding: FileSystem.EncodingType.Base64,
          });
          // Ouvrir le dialogue de partage pour que l'utilisateur puisse télécharger le fichier
          await Sharing.shareAsync(filePath, {
            mimeType: 'application/pdf',
            dialogTitle: 'Télécharger le document',
            UTI: 'com.adobe.pdf',
          });
        } catch (error) {
          console.error("Erreur lors de l'écriture du fichier:", error);
        }
      } else {
        console.log("Aucun fichier sélectionné.");
      }
    };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerPosition}>
        <DataTable>
          <DataTable.Header style={styles.background}>
            <DataTable.Title style={styles.titleFirst}>
              <Text style={dataTableTitleStyle}>pseudo Name</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titleRaison}>
              <Text style={dataTableTitleStyle}>Raison</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titleDate}>
              <Text style={dataTableTitleStyle}>Date</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titleAct}>
              <Text style={dataTableTitleStyle}>justification</Text>
            </DataTable.Title>
          </DataTable.Header>
          {loading ? (
            <Text>Loading ...</Text>
          ) : (
            <>
          {absences?.map((res) => {
            return (
              <DataTable.Row key={res.id}>
                <DataTable.Cell style={styles.titleFirst}>
                  {res.attributes.pseudo}
                </DataTable.Cell>
                <DataTable.Cell style={styles.titleRaison}>
                  {res.attributes.raison}
                </DataTable.Cell>
                <DataTable.Cell style={styles.titleDate}>
                  {res.attributes.date}
                </DataTable.Cell>
                <DataTable.Cell style={styles.titleAct}>
                  <Button
                    textColor="#2667FF"
                    icon="download"
                    mode="text"
                    onPress={() => downloadFile(res.attributes.file,res.attributes.firstName, res.attributes.lastName)}
                    style={styles.button}
                  ></Button>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
            </>
          )}
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default AbsenceList;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  titleFirst: {
    flex: 1.5,
  },
  titleRaison: {
    flex: 1.5,
  },
  titleAct: {
    flex: 1,
  },
  centerPosition: {
    alignItems: "center",
  },
  background: {
    backgroundColor: "#2667FF",
    height: 60,
    alignItems: "center",
  },
  button: {
    color: "red",
    height: 25,
  },
  titleDate: {
    flex: 1,
  },
});
