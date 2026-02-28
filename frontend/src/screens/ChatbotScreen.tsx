import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

/* ================= TYPES ================= */

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

/* ================= CONFIG ================= */

const BACKEND_URL = 'http://192.168.86.36:5000/chatbot';
const TAB_BAR_HEIGHT = 72;

/* ================= COMPONENT ================= */

export default function ChatbotScreen() {
  const navigation = useNavigation<any>();
  const listRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "👋 Hi! I'm your AI Travel Guide.\nAsk me anything!",
      sender: 'bot',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  /* AUTO SCROLL */
  useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);

  /* SEND MESSAGE */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setLoading(true);

    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: userText, sender: 'user' },
    ]);

    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText }),
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-bot',
          text: data.answer || '🤖 No response',
          sender: 'bot',
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-err',
          text: '⚠️ Backend not reachable',
          sender: 'bot',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* RENDER MESSAGE */
  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.right : styles.left,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={TAB_BAR_HEIGHT}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>AI Travel Guide</Text>
        </View>

        {/* CHAT LIST */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: TAB_BAR_HEIGHT + 120,
          }}
        />

        {/* TYPING */}
        {loading && (
          <View style={styles.typing}>
            <ActivityIndicator color="#C8F000" />
            <Text style={styles.typingText}>AI typing…</Text>
          </View>
        )}

        {/* ✅ CHAT INPUT (VISIBLE ABOVE TAB BAR) */}
        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type your message…"
            placeholderTextColor="#777"
            style={styles.input}
            multiline
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F1C2E',
  },
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  back: {
    color: '#FFF',
    fontSize: 26,
    marginRight: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  messageRow: {
    marginBottom: 14,
    flexDirection: 'row',
  },
  left: { justifyContent: 'flex-start' },
  right: { justifyContent: 'flex-end' },

  bubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#1B9CFC',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderBottomLeftRadius: 4,
  },
  text: {
    color: '#FFF',
    fontSize: 15,
    lineHeight: 22,
  },

  typing: {
    position: 'absolute',
    bottom: TAB_BAR_HEIGHT + 80,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    color: '#C8F000',
    marginLeft: 8,
    fontSize: 12,
  },

  /* 🔥 FIXED INPUT */
  inputBar: {
    position: 'absolute',
    bottom: TAB_BAR_HEIGHT, // 🔥 THIS IS THE KEY
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#142437',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFF',
    maxHeight: 120,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#C8F000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  sendText: {
    fontWeight: '700',
    color: '#0F1C2E',
  },
});
