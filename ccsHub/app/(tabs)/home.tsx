import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEvents } from '../../src/hooks/useEvents';
import { Event } from '../../src/types/event';

const tabs = ["All", "Ongoing", "Upcoming", "Ended", "Cancelled"];


export default function Home() {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const { events } = useEvents();

    // Filter events based on dropdown
    const filteredEvents = events.filter(event => {
        if (activeTab.toLowerCase() === 'all') return true;
        return event.status === activeTab.toLowerCase();
    }).filter(event => event.title.toLowerCase().includes(search.toLowerCase()));

    const renderEvent = ({ item }: { item: Event }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push({
            pathname: '/event/[id]/eventDetails',
            params: {id: item.id}
        })}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.date} | {item.start_time} - {item.end_time}</Text>
                <Text style={styles.cardSubtitle}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    Events
                </Text>

                <View style={styles.iconContainer}>

                    <TouchableOpacity onPress={() => {
                        router.push('/search')
                    }} style={[{ marginLeft: 8 }, styles.icon]}>
                        <Ionicons name="search-outline" size={26} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        router.push('/notifications')
                    }} style={[{ marginLeft: 8 }, styles.icon]}>
                        <Ionicons name="notifications-outline" size={26} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            {/* <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="gray" style={{ marginLeft: 8 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search events..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View> */}


            <View
                style={styles.mainContent}
            >
                {/* Dropdown Filter */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,}}>
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={activeTab}
                            onValueChange={(itemValue) => setActiveTab(itemValue)}
                            style={styles.picker}
                        >
                            {tabs.map((tab) => (
                                <Picker.Item key={tab} label={tab} value={tab} />
                            ))}
                        </Picker>
                    </View>

                    <TouchableOpacity onPress={() => {
                        router.push('/leaderboard')
                    }} style={[{ marginLeft: 8 }, styles.icon]}>
                        <MaterialCommunityIcons name="trophy-award" size={26} color="#b8860b" />
                    </TouchableOpacity>
                    
                </View>

                {/* Event List */}
                <FlatList
                    data={filteredEvents}
                    keyExtractor={(item) => item.id}
                    renderItem={renderEvent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        justifyContent: 'center',
        position: 'relative',
        paddingHorizontal: 16,
        marginTop: 10,
        marginBottom: 30
    },

    headerText: {
        fontSize: 25,
        fontWeight: '600',
    },

    iconContainer: {
        position: 'absolute',
        right: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 1, // if not supported, use marginLeft on second icon
    },

    icon: {
        padding: 5,               // space inside border
        borderColor: '#5e5e5e',   // border color
        borderWidth: 2,           // border thickness
        borderRadius: 10,         // round shape (50 for circle)
        overflow: 'hidden',       // ensures rounded corners work
    },

    container: { flex: 1, backgroundColor: '#e6e6fa' },
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
    mainContent: {
        flex: 1,
        backgroundColor: '#ffffff',   // <-- make main content white
        paddingTop: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 16,
        overflow: 'hidden',           // important for rounded corners
    },
    dropdownContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
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
    cardImage: { width: '100%', height: 130 },
    cardContent: { padding: 12 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    cardSubtitle: { fontSize: 14, color: 'gray' },
});
