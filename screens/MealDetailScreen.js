import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const MealDetailsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The MealDetails Screen!</Text>
      <Button
        title="Go Back To Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
