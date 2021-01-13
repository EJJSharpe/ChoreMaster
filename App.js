import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import { decode, encode } from "base-64";
import { firebase } from "./src/firebase/config";
import { AuthStackNavigator } from "./src/navigators/AuthStackNavigator";
import { MainStackNavigator } from "./src/navigators/MainStackNavigator";
import { LogBox } from 'react-native';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const RootStack = createStackNavigator();

export default function App({ navigation }) {
  LogBox.ignoreLogs(['Setting a timer'])

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(null);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user === null ? (
          <RootStack.Screen
            name={"AuthStack"}
            component={AuthStackNavigator}
            screenOptions={{}}
          />
        ) : (
            <RootStack.Screen
              name={"MainStack"}
              component={MainStackNavigator}
              initialParams={{ setUser, user }}
            />
          )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
