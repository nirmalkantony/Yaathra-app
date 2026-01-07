import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask your guide..."
        value={text}
        onChangeText={setText}
      />
      <Button
        title={loading ? "..." : "Send"}
        onPress={() => {
          if (text.trim()) {
            onSend(text);
            setText("");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    padding: 8
  }
});
