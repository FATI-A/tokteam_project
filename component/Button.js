import * as React from 'react';
import { Button } from 'react-native-paper';
import {StyleSheet } from 'react-native';

const ButtonStart = (props) => (
    <>
  <Button icon={props.icon1} mode="contained" onPress={props.handlePressHere}  style={styles.button}>
  {props.text}
  </Button>
   <Button icon={props.icon2} mode="contained" onPress={props.handlePressComing}  style={styles.button2}>
  {props.text2}
  </Button>
  </>
);

export default ButtonStart;
const styles = StyleSheet.create({
 button:{
      backgroundColor:"#2667FF",
      width:"90%",
      marginTop: 20,
      marginBottom: 20
  }
  , button2:{
    backgroundColor:"#3B28CC",
    width:"90%",
}
  });