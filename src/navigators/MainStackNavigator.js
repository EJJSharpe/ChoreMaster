import React, { useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { signOutUser } from "../firebase/API/auth_methods";
import {
  CreateJoinScreen,
  UserWildcards,
  HomeScreen,
  CreateGroupScreen,
  JoinGroupScreen,
  AddTasksScreen,
  AddPointsScreen,
  GameScreen,
  LobbyScreen,
  LoadingScreen
} from "../screens";
import { IconButton } from "../shared/IconButton";


const LogoTitle = () => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Image
        style={{
          height: 55,
          width: 100,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../images/ChoreMasterLogo.png")}
      />
    </View>
  );
};

const MainStack = createStackNavigator();

export function MainStackNavigator({ route }) {
  const { user, setUser } = route.params;
  const onLoginOut = () => {
    signOutUser();
    setUser(null)
  };




  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff841f",
          elevation: 0,
          shadowColor: "transparent",
        },

        headerTitle: (props) => <LogoTitle {...props} />,
        headerRight: () => (
          <View style={{ marginRight: 10, padding: 5 }}>
            <IconButton name="logout" onPress={() => onLoginOut()} />
          </View>
        ),
      }}
    >
      <MainStack.Screen name="Loading" component={LoadingScreen} initialParams={{ user }} />
      <MainStack.Screen
        name="CreateJoin"
        component={CreateJoinScreen}
      />
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="UserWildcards" component={UserWildcards} />
      <MainStack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <MainStack.Screen name="JoinGroup" component={JoinGroupScreen} />
      <MainStack.Screen name="AddTasks" component={AddTasksScreen} />
      <MainStack.Screen name="AddPoints" component={AddPointsScreen} />
      <MainStack.Screen name="Game" component={GameScreen} />
      <MainStack.Screen name="Lobby" component={LobbyScreen} />
    </MainStack.Navigator>
  );
}
