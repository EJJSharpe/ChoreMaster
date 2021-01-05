import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen(props) {
  console.log(props.extraData);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
