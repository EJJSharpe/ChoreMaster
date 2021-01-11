import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function IconButton({ name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
