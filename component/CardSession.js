import * as React from "react";
import { Avatar, Card, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getToken } from "../helpers";
import { parseISO, format } from 'date-fns';

const CardSessions = () => {


  const [sessionList, setSessionList] = React.useState(null);

  React.useEffect(() => {
    handlePress();
  }, []);
  const navigation = useNavigation();
  const handlePress = async () => {
    try {
      const jwt = await getToken();
      const response = await fetch(
        "http://192.168.1.168:1337/api/sessions-lists",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data, "data");
      setSessionList(data.data);
    } catch (error) {
      console.error(error);

    }
  };

  const changeFormatDate = (value) => {
    try {
      const dateObj = parseISO(value);
      return format(dateObj, "yyyy/MM/dd HH:mm:ss");
    } catch (error) {
      console.error("Erreur lors du formatage de la date :", error);
      return "Erreur de formatage de la date";
    }
  };

const  handleShow = async(id)=>{
  navigation.navigate('Looked Session', { sessionId: id });
  }
  const handleDelete=async(id)=>{
    const jwt = await getToken();
    fetch(`http://192.168.1.168:1337/api/sessions-lists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(() => {
      handlePress();
    });


  }

  return sessionList?.map((res, index) => (
    <View key={index}>
      <Card.Title
        title={`session : ${+index + 1}`}
        subtitle={changeFormatDate(res.attributes.createdAt)}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="folder"
            color="white"
            backgroundColor="#2667FF"
          />
        )}
        right={(props) => (
          <>
          <View style={styles.alignButton}>
          <Button
            {...props}
            style={styles.button}
            textColor="white"
            onPress={()=>handleShow(res.id)}
          >
            Show
          </Button>
           <Button
           {...props}
           style={styles.button2}
           textColor="red"
           onPress={()=>handleDelete(res.id)}
         >
          Delete
         </Button>
         </View>
         </>
        )}
      />
    </View>
  ));
};

export default CardSessions;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2667FF",
    marginRight: 5,
  }, alignButton:{
   display:"flex",
   flexDirection:"row"
  },
  button2: {
    backgroundColor: "white",
    marginLeft:5,
  },

});
