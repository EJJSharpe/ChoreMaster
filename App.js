import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from './src/screens/styles'

import { AddPointsScreen, LoginScreen, CreateJoinScreen, RegistrationScreen, CreateGroupScreen, JoinGroupScreen, AddTasksScreen, HomeScreen, GameScreen, LobbyScreen, UserWildcards } from './src/screens/'

import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'
import * as API from './src/firebase/firebaseAPI'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  const LogoTitle = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Image
          style={{ height: 55, width: 100, alignSelf: 'center', resizeMode: 'contain' }}
          source={require('./src/images/ChoreMasterLogo.png')}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
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
  );
}