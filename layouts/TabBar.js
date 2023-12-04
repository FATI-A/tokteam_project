import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../component/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Session from "../component/Session";
import Absence from "../component/Absence";
import Profil from "../component/Profil";
import Theme from "../component/Theme";
import EditProfil from "../component/EditProfil";
import Login from "../component/Login";
import Register from "../component/Register";
import PasswordForgotten from "../component/PasswordForgotten";
import NewPassword from "../component/NewPassword";
import HomeManager from "../component/HomeManager";
import SessionResearched from "../component/SessionResearched";
import SessionManager from "../component/SessionsManager";
import Users from "../component/UsersList";
import AbsenceList from "../component/AbsenceList";
import { useAuthContext } from "../context/AuthContext";

function HomeScreen() {
  return (
    <View>
      <HomeManager />
    </View>
  );
}
function HomeEmployee() {
  return (
    <View>
      <Home />
    </View>
  );
}

function ProfilScreen() {
  return (
    <View>
      <Profil />
    </View>
  );
}

function SessionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Session />
    </View>
  );
}
function AddAbsencecreen() {
  return (
    <View>
      <Absence />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabBar() {
  const { user } = useAuthContext();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Session") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Add Absence") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2667FF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={user.userRole === "admin" ? HomeScreen : HomeEmployee}
      />
      {user.userRole === "admin" ? (
        <Tab.Screen name="Session" component={SessionScreen} />
      ) : (
        <Tab.Screen name="Add Absence" component={AddAbsencecreen} />
      )}

      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user} = useAuthContext();
  return (
    <Stack.Navigator>
      {
      // props.state.userToken == null ||
      // props.state.userToken === undefined ||
      // props.state.isSignout 
      user === null ||user === undefined ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordForgotten"
            component={PasswordForgotten}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Tabs"
            children={() => <TabBar  />}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Theme" component={Theme} />
          <Stack.Screen name="EditProfil" component={EditProfil} />
          <Stack.Screen name="Sessions" component={SessionManager} />
          <Stack.Screen name="Looked Session" component={SessionResearched} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="Absence List" component={AbsenceList} />
        </>
      )}
      {/* front test */}
    </Stack.Navigator>
  );
}

export default AppNavigator;
