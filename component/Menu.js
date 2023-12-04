import * as React from "react";
import { View, StyleSheet, Linking } from "react-native";
import Theme from "./Theme.js";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import {  removeToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";

const MenuProfil = () => {
  
  const { setUser } = useAuthContext();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const navigation = useNavigation();
  const handlePress = async () => {
    navigation.navigate("Theme");
  };

  const handlePressEdit = async () => {
    navigation.navigate("EditProfil");
  };
  const handlePressLogout = async () => {
    removeToken();
		setUser();
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              icon="menu"
              labelStyle={{ fontSize: 32, color: "grey" }}
              onPress={openMenu}
              style={styles.button}
            ></Button>
          }
          style={styles.position}
        >
          <Menu.Item
            onPress={handlePress}
            title="Change theme"
            style={styles.menu}
          />
          <Menu.Item
            onPress={handlePressEdit}
            title="Edit profil"
            style={styles.menu}
          />
          <Divider />
          <Menu.Item
            onPress={handlePressLogout}
            title="Log out"
            style={styles.menu}
          />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default MenuProfil;
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  button: {
    zIndex: 2,
  },
  menu: {
    backgroundColor: "#f1f1f1",
    alignItems: "center",
  },
  position: {
    marginTop: -50,
  },
});
