import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'react-native';
import { useMemo } from 'react';
import {auth} from "../../src/lib/firebaseConfig";
import { router } from 'expo-router';
import {useConversations} from '../../src/hooks/messagesHook';

type TabType = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

type MessageType = 'message' | 'group' | 'invitation';

type ChatItem = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  type: MessageType;
};

export default function Message() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Messages');
    const currentUser = auth.currentUser;
    const uid = currentUser?.uid;


    const { conversations, loading } = useConversations(uid);

  // const tabs: TabType[] = [
  //   { label: 'Messages', icon: 'message-text-outline' },
  //   { label: 'Groups', icon: 'account-group-outline' },
  //   { label: 'Invitations', icon: 'email-outline' },
  // ];

    const filteredConversations = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return conversations.filter(
            (conversation) =>
                conversation.otherUserName
                    .toLowerCase()
                    .includes(searchText) ||
                conversation.lastMessage?.text
                    ?.toLowerCase()
                    .includes(searchText)
        );
    }, [search, conversations]);

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
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#ffffff' }}>

      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 18, fontWeight: '600' }}>
        Messages
      </Text>

      {/* search box */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search names or groups..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View>
        <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>
          Recent Chat
        </Text>
      </View>

      <FlatList
        data={filteredConversations}
        ListEmptyComponent={
            <View style={{ paddingTop: 50, alignItems: "center" }}>
                <Text>No conversations yet.</Text>
            </View>
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => router.push({
              pathname: '/chat/[id]',
              params: {
                  id: item.conversationId,
                  name: item.otherUserName,
                  avatarUrl:  encodeURIComponent(item.otherAvatarUrl),
                  otherUserId: item.otherUserId
              },
            })}
          >
            <View style={{ position: 'relative' }}>
              <Image source={{ uri: item.otherAvatarUrl }} style={styles.avatar} />
            </View>

            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.otherUserName}</Text>
                <Text style={styles.chatTime}>{item.lastMessage?.created_at?.toDate?.().toLocaleTimeString()}</Text>
              </View>

              <View style={styles.messageRow}>
                <Text
                  style={[
                    styles.lastMessage,
                    item.unreadCount > 0 && { fontWeight: '500', color: '#000' },
                  ]}
                  numberOfLines={1}
                >
                  {item.lastMessage?.text}
                </Text>

                {item.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )
        }
      />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    position: 'relative',
  },

  headerText: {
    fontSize: 25,
    fontWeight: '600',
  },

  tabContainer: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#444',  // thin gray border
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 10
  },

  tabItem: {
    flex: 1,                     // evenly spaced
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTab: {
    borderRadius: 12,
    backgroundColor: '#2563eb',  // blue when selected
  },

  tabText: {
    color: '#010101',
    fontWeight: '500',
  },

  activeText: {
    color: 'white',
    fontWeight: '600',
  },

  iconContainer: {
    position: 'absolute',
    right: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 1, // if not supported, use marginLeft on second icon
  },

  icon: {
    padding: 5,               // space inside border
    borderColor: '#c3d1d7',   // border color
    borderWidth: 2,           // border thickness
    borderRadius: 10,         // round shape (50 for circle)
    overflow: 'hidden',       // ensures rounded corners work
  },

  container: { flex: 1, backgroundColor: '#F5FCFF', paddingHorizontal: 16, paddingBottom: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 12,
    paddingHorizontal: 2,
    height: 40,
    marginBottom: 16,
      marginTop: 16,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    width: '50%',
  },
  picker: { height: 50, width: '100%' },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3, // shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: 'gray' },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'white',
  },

  chatContent: {
    flex: 1,
    marginLeft: 12,
  },

  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },

  chatName: {
    fontSize: 16,
    fontWeight: '600',
  },

  chatTime: {
    fontSize: 12,
    color: 'gray',
  },

  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lastMessage: {
    flex: 1,
    color: 'gray',
    marginRight: 8,
  },

  unreadBadge: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },

  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
