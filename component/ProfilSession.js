import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";

export default function ProfilSession() {
  const { session} = useAuthContext();
  const isClocked = (action) => {
    if (action ==="arrived") {
      return (
        <View style={styles.SituationDiv}>
          <Text style={styles.situationText}>arrived</Text>
        </View>
      );
    } else if (action ==="not clocked") {
      return (
        <View style={styles.SituationDivWarning}>
          <Text style={styles.situationText}>not clocked</Text>
        </View>
      );
    } else if (action ==="coming") {
      return (
        <View style={styles.SituationDivComing}>
          <Text style={styles.situationText}>Coming</Text>
        </View>
      );
    } else if (action === "absent") {
      return (
        <View style={styles.SituationDivAbsent}>
          <Text style={styles.situationText}>absent</Text>
        </View>
      );
    }
  };
  return (
    <>
      <View style={styles.container}>
              {session?.map((session) => {
                return (
                  <View style={styles.flex}  key={session.id}>
                    <View style={styles.position}>
                      {session.attributes.gender === "female" ? (
                        <Avatar.Image
                          size={58}
                          source={require("../assets/avatarF.jpg")}
                        />
                      ) : (
                        <Avatar.Image
                          size={58}
                          source={require("../assets/avatarh.jpg")}
                        />
                      )}
                      <View>
                        <Text style={styles.NameText}>
                          {session.attributes.firstName}
                          {session.attributes.lastName}
                        </Text>
                        <Text style={styles.idText}>
                          {session.attributes.email}
                        </Text>
                      </View>
                    </View>
                    {isClocked(session.attributes.action)}
                    </View>
                );
              })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  flex: {
    marginLeft: 20,
    width: 450,
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  position: {
    display: "flex",
    flexDirection: "row",
  },
  idText: {
    fontFamily: "Roboto",
    fontStyle: "italic",
    marginLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: "grey",
  },
  NameText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
  },
  SituationDiv: {
    backgroundColor: "#2667FF",
    borderRadius: 50,
    width: 100,
    height: 40,
    marginRight: 100,
  },
  situationText: {
    textAlign: "center",
    color: "white",
    marginTop: 8,
  },

  SituationDivAbsent: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 100,
    height: 40,
    marginRight: 100,
  },

  SituationDivWarning: {
    backgroundColor: "#E9D502",
    borderRadius: 50,
    width: 100,
    height: 40,
    marginRight: 100,
  },

  SituationDivComing: {
    backgroundColor: "#87BFFF",
    borderRadius: 50,
    width: 100,
    height: 40,
    marginRight: 100,
  },
});
