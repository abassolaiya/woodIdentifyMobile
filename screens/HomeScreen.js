import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wood Identifier</Text>
      <Button
        title="Take Photo"
        onPress={() => navigation.navigate("Camera")}
        style={styles.button}
      />
      <Button
        title="Upload Photo"
        onPress={() => navigation.navigate("Upload")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
});
