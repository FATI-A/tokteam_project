import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" color='white' backgroundColor="#2667FF" />

const CardHome = (props) => (
  <Card  theme={{ roundness: 10 }} style={styles.Card}>
    <Card.Title title={props.title} left={LeftContent}   titleStyle={{ fontSize: 18, color:"black", fontWeight:"bold"  }} />
    <Card.Content>
    </Card.Content>
    <Card.Cover source={props.src} style={styles.Image}/>
    <Card.Actions>
      <Button style={styles.button} textColor='white' onPress={props.handlePress}>Show</Button>
    </Card.Actions>
  </Card>
);

export default CardHome;
const styles = StyleSheet.create({
Card:{
   backgroundColor: "white",
   borderRadius:25,
   borderStyle:"solid",
   borderColor:"rgba(158, 156, 156, 0.6)",
   borderWidth: 1,
},
button:{
    backgroundColor:"#2667FF",
},
Image:{
    width:"95%",
    marginRight:10,
    marginLeft:10
}
})