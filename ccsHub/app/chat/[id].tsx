import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
};

const SAMPLE_CONVERSATIONS: Record<string, Message[]> = {
  '1': [
    { id: '1', text: 'Hey bro!', sender: 'other' },
    { id: '2', text: 'Are you coming later?', sender: 'other' },
    { id: '3', text: 'Yes, I’ll be there at 6.', sender: 'me' },
  ],
  '2': [
    { id: '1', text: 'The event starts at 6PM.', sender: 'other' },
    { id: '2', text: 'Thanks for the reminder!', sender: 'me' },
  ],
  '3': [
    { id: '1', text: 'Deadline is next week!', sender: 'other' },
  ],
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>(
    SAMPLE_CONVERSATIONS[id as string] || []
  );

  const [input, setInput] = useState('');

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'me',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'me'
                ? styles.myMessage
                : styles.otherMessage,
            ]}
          >
            <Text
              style={{
                color: item.sender === 'me' ? 'white' : 'black',
              }}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
  },

  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563eb',
  },

  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },

  sendButton: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 20,
  },
});