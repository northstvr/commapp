import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Input, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";
import { LogBox } from 'react-native';

//ignores timer long period of time bug
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "black"},
  headerTitleStyle: { color: "white" },
  headerTitleColor: "white",
  headerTitleAlign: "center",
};

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator
      // initialRouteName="Home" 
      screenOptions={globalScreenOptions}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddChat" component={AddChatScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
