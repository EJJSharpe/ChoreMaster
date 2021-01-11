import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import { decode, encode } from "base-64";
import { firebase } from "./src/firebase/config";
import { AuthStackNavigator } from "./src/navigators/AuthStackNavigator";
import { MainStackNavigator } from "./src/navigators/MainStackNavigator";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const RootStack = createStackNavigator();

export default function App({ navigation }) {
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
    return <></>;
  }

  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ff841f',
            elevation: 0,
            shadowColor: 'transparent'
          },
          headerTitle: props => <LogoTitle {...props} />
        }}
      >
        <Stack.Screen name="CreateJoin" >
          {props => <CreateJoinScreen {...props} extraData={user} />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserWildcards" component={UserWildcards} />
        <Stack.Screen name="Login" options={{ headerTitle: '' }} component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
        <Stack.Screen name="JoinGroup" component={JoinGroupScreen} />
        <Stack.Screen name="AddTasks" component={AddTasksScreen} />
        <Stack.Screen name="AddPoints" component={AddPointsScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen}></Stack.Screen>
        <Stack.Screen name='Game' component={GameScreen} />
        <Stack.Screen name="Lobby" component={LobbyScreen} />
      </Stack.Navigator>
    </NavigationContainer >
=======
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
            initialParams={{ setUser: setUser, user: user }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
>>>>>>> a4170c3e7d42b5bbbd542a75ba38d72a7a1fc014
  );
}
