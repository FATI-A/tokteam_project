import * as React from 'react';
import { Button } from 'react-native-paper';
import {StyleSheet } from 'react-native';

const ButtonManager = (props) => (
    <>
  <Button icon="home" mode="contained" onPress={() => console.log('Pressed')}  style={styles.button}>
  {props.text}
  </Button>
  </>
);

export default ButtonManager;
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