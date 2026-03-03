import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'react-native';
import { useMemo } from 'react';
import { router } from 'expo-router';


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

const MESSAGES: ChatItem[] = [
  // 🔵 DIRECT MESSAGES
  {
    id: '1',
    name: 'John Cruz',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Hey bro, are you coming later?',
    time: '2:45 PM',
    unreadCount: 2,
    isOnline: true,
    type: 'message',
  },
  {
    id: '2',
    name: 'Anna Reyes',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'The event starts at 6PM.',
    time: '1:10 PM',
    unreadCount: 0,
    isOnline: false,
    type: 'message',
  },

  // 🟢 GROUPS
  {
    id: '3',
    name: 'Event Committee',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Meeting moved to Friday.',
    time: 'Mon',
    unreadCount: 4,
    isOnline: false,
    type: 'group',
  },
  {
    id: '4',
    name: 'Capstone Team',
    avatar: 'https://i.pravatar.cc/150?img=18',
    lastMessage: 'Deadline is next week!',
    time: 'Yesterday',
    unreadCount: 1,
    isOnline: false,
    type: 'group',
  },

  // 🟡 INVITATIONS
  {
    id: '5',
    name: 'Hackathon 2026',
    avatar: 'https://i.pravatar.cc/150?img=20',
    lastMessage: 'You are invited to join this event.',
    time: 'Sun',
    unreadCount: 0,
    isOnline: false,
    type: 'invitation',
  },
  {
    id: '6',
    name: 'Rescue Link Volunteers',
    avatar: 'https://i.pravatar.cc/150?img=22',
    lastMessage: 'Invitation pending approval.',
    time: 'Sat',
    unreadCount: 0,
    isOnline: false,
    type: 'invitation',
  },
];


function message() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Messages');

  const tabs: TabType[] = [
    { label: 'Messages', icon: 'message-text-outline' },
    { label: 'Groups', icon: 'account-group-outline' },
    { label: 'Invitations', icon: 'email-outline' },
  ];

  const filteredMessages = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return MESSAGES.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchText) || item.lastMessage.toLowerCase().includes(searchText);

      const matchesTab =
        (activeTab === 'Messages' && item.type === 'message') ||
        (activeTab === 'Groups' && item.type === 'group') ||
        (activeTab === 'Invitations' && item.type === 'invitation');

      return matchesTab && matchesSearch;
    });
  }, [search, activeTab]);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#ffffff' }}>

      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 18, fontWeight: '600' }}>
        Messages
      </Text>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <TouchableOpacity
              key={tab.label}
              style={[styles.tabItem, isActive && styles.activeTab]}
              onPress={() => setActiveTab(tab.label)}
            >
              {isActive && (
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={16}
                  color="white"
                  style={{ marginRight: 6 }}
                />
              )}
              <Text style={[styles.tabText, isActive && styles.activeText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => router.push({
              pathname: '/chat/[id]',
              params: { id: item.id },
            })}
          >
            <View style={{ position: 'relative' }}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              {item.isOnline && <View style={styles.onlineIndicator} />}
            </View>

            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>

              <View style={styles.messageRow}>
                <Text
                  style={[
                    styles.lastMessage,
                    item.unreadCount > 0 && { fontWeight: '600', color: '#000' },
                  ]}
                  numberOfLines={1}
                >
                  {item.lastMessage}
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

export default message

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
    marginBottom: 4,
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
