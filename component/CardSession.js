import * as React from "react";
import { Avatar, Card, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";

const CardSessions = () => {
  const [data] = React.useState([
    {
      title: "Session 1",
      date: "Date : 13/12/2023",
    },
    {
      title: "Session 2",
      date: "Date : 12/12/2023",
    },
    {
      title: "Session 3",
      date: "Date : 11/12/2023",
    },
    {
      title: "Session 4",
      date: "Date : 10/12/2023",
    },
    {
      title: "Session 5",
      date: "Date : 09/12/2023",
    },

    {
        title: "Session 6",
        date: "Date : 08/12/2023",
      },
      {
        title: "Session 7",
        date: "Date : 07/12/2023",
      },
      {
        title: "Session 8",
        date: "Date : 06/12/2023",
      },
      {
        title: "Session 9",
        date: "Date : 05/12/2023",
      },
      {
        title: "Session 10",
        date: "Date : 04/12/2023",
      },
  ]);
  const navigation = useNavigation();
  const handlePress = React.useCallback(async () => {
    navigation.navigate("Looked Session");
  });
  return data.map((res) => {
    return (
      <>
        <Card.Title
          title={res.title}
          subtitle={res.date}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="folder"
              color="white"
              backgroundColor="#2667FF"
            />
          )}
          right={(props) => (
            <Button
              {...props}
              style={styles.button}
              textColor="white"
              onPress={handlePress}
            >
              Show
            </Button>
          )}
        />
      </>
    );
  });
};

export default CardSessions;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2667FF",
    marginRight: 20,
  },
});
