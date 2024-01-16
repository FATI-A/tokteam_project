import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";
import { getToken } from "../helpers";
import { parseISO, format } from "date-fns";

export default function ProfilSessionLooked(props) {
  //   const { session } = useAuthContext();
  const [sessionList, setSessionList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [myArray, setMyArray] = React.useState([]);
  React.useEffect(() => {
    handleShow();
    if (!loading) {
      const arr = sessionList.filter(
        (list) =>
          changeFormatDate(props.sessionDate) ===
          changeFormatDate(list?.attributes?.createdAt)
      );
      console.log("arrayray", arr);
      setMyArray(arr);
    }
  }, [props, loading]);
  const isClocked = (action) => {
    if (action === "arrived") {
      return (
        <View style={styles.SituationDiv}>
          <Text style={styles.situationText}>arrived</Text>
        </View>
      );
    } else if (action === "not clocked") {
      return (
        <View style={styles.SituationDivWarning}>
          <Text style={styles.situationText}>not clocked</Text>
        </View>
      );
    } else if (action === "coming") {
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

  const handleShow = async () => {
    try {
      const jwt = await getToken();
      const response = await fetch(
        `http://192.168.1.168:1337/api/all-sessions`,
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
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const changeFormatDate = (value) => {
    try {
      if (!value || typeof value !== "string") {
        throw new Error("La valeur de la date n'est pas valide");
      }

      const dateObj = parseISO(value);
      return format(dateObj, "yyyy/MM/dd HH:mm");
    } catch (error) {
      //   console.error("Erreur lors du formatage de la date :", error);
      return "Erreur de formatage de la date";
    }
  };
  if (myArray.length > 0) {
    // console.log("SessionList :", sessionList[0].attributes.sessions);
    // console.log("myarray", myArray[0]?.attributes?.sessions);
    return (
      <>
        <View style={styles.container}>
          {myArray[0]?.attributes?.sessions.map((item, index) => (
            <>
              {changeFormatDate(props.sessionDate) ===
              changeFormatDate(myArray[0]?.attributes?.createdAt) ? (
                <View style={styles.flex} key={index}>
                  <View style={styles.position}>
                    {item.attributes.gender === "female" ? (
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
                        {item.attributes.firstName}
                        {item.attributes.lastName}
                      </Text>
                      <Text style={styles.idText}>{item.attributes.email}</Text>
                    </View>
                  </View>
                  {isClocked(item.attributes.action)}
                </View>
              ) : null}
            </>
          ))}
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.contain}>
        <Text>loading...</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  contain: {
    height: "100%",
    display: "flex",
    marginTop: "50%",
    alignItems: "center",
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
