import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import { askChatbot } from "../services/chatbotService";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    setMessages(prev => [...prev, { text, sender: "user" }]);
    setLoading(true);

    const reply = await askChatbot(text);

    setMessages(prev => [...prev, { text: reply, sender: "bot" }]);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble text={item.text} sender={item.sender} />
        )}
        keyExtractor={(_, i) => i.toString()}
      />
      <ChatInput onSend={sendMessage} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" }
});
