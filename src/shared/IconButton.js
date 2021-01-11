import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function IconButton({ name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign color="#788eec" size="25" name={name} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
