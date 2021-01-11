import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegistrationScreen } from "../screens/";
import { Image, Text, View } from "react-native";

const AuthStack = createStackNavigator();

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

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      headerShown={false}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name={"Login"} component={LoginScreen} />
      <AuthStack.Screen name={"Registration"} component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
}
