import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {Stack} from 'expo-router';
import {
    Image,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useUserConversations} from "../../src/hooks/messagesHook";
import {auth} from "../../src/lib/firebaseConfig";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ChatScreen() {
    const {
        id,
        name,
        otherUserId,
        avatarUrl: encodedAvatarUrl,
    } = useLocalSearchParams();
    const avatarUrl =
        typeof encodedAvatarUrl === "string"
            ? encodedAvatarUrl.trim()
            : "";
    const params = useLocalSearchParams();

    console.log("ALL PARAMS:", JSON.stringify(params, null, 2));
  const flatListRef = useRef<FlatList>(null);
  const currentUid = auth.currentUser?.uid;

  const { messages, loading } = useUserConversations(
      String(id)
  );

  const [input, setInput] = useState('');

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // await sendMessageToFirestore(
        //     String(id),
        //     input,
        //     auth.currentUser!.uid
        // );

        setInput("");
    };

    if (loading) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: "#1d1d1d",
                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#3B82F6"
                />
                <Text style={{ color: "white" }}>
                    Loading...
                </Text>
            </SafeAreaView>
        );
    }

  return (
    <>
      <Stack.Screen options={{
        headerTitle: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                  source={{ uri: avatarUrl }}
                  style={{
                      width: 35,
                      height: 35,
                      borderRadius: 50,
                      marginRight: 10,
                  }}
                  onLoad={() => console.log("loaded")}
                  onError={(e) => console.log("image error", e.nativeEvent)}
              />
              <Text style={{fontSize: 18, fontWeight: '600'}}>
                {name}
              </Text>
          </View>
        )
      }} />

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
          renderItem={({ item }) => {
              const isMine = item.senderId === auth.currentUser?.uid;

              return (
                  <View

                  >
                      <View
                          style={[
                              styles.messageContainer,
                              isMine
                                  ? styles.myMessage
                                  : styles.otherMessage,
                          ]}
                      >
                          <Text
                              style={{
                                  color: isMine
                                      ? "white"
                                      : "black",
                              }}
                          >
                              {item.text}
                          </Text>

                      </View>
                      <Text style={[{fontSize: 10, color: 'grey'},
                              {
                                  alignSelf: isMine ? "flex-end" : "flex-start",
                              },
                      ]}>
                          {item.created_at?.toDate()?.toLocaleTimeString()}
                      </Text>
                  </View>
              );
          }}
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
    </>
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