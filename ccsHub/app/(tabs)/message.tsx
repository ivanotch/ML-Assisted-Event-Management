import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type TabType = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};


function message() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Messages');

  const tabs: TabType[] = [
    { label: 'Messages', icon: 'message-text-outline' },
    { label: 'Groups', icon: 'account-group-outline' },
    { label: 'Invitations', icon: 'email-outline' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#ffffff' }}>

      <Text style={{textAlign: 'center', marginVertical: 10, fontSize: 18, fontWeight: '600'}}>
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
          placeholder="Search events..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View>
        <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>
          Recent Chat
        </Text>
      </View>

      <Text>
        Sample
      </Text>
    </SafeAreaView>
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
});
