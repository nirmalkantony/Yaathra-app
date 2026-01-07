import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChatBubble({ text, sender }) {
  return (
    <View style={[
      styles.bubble,
      sender === "user" ? styles.user : styles.bot
    ]}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    margin: 8,
    padding: 12,
    borderRadius: 10,
    maxWidth: "80%"
  },
  user: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end"
  },
  bot: {
    backgroundColor: "#fff",
    alignSelf: "flex-start"
  }
});
