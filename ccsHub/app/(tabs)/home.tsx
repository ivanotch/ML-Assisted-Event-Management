import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = ["All", "Ongoing", "Upcoming", "Ended", "Cancelled"];

// Mock Events
export const mockEvents = [
    {
        id: '1',
        title: 'Annual Tech Symposium 2024',
        date: 'December 20, 2024',
        time: '9:00 AM - 5:00 PM',
        venue: 'Main Auditorium',
        organizer: 'Computer Science Department',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?w=400',
    },
    {
        id: '2',
        title: 'Career Fair 2024',
        date: 'December 18, 2024',
        time: '10:00 AM - 4:00 PM',
        venue: 'University Convention Center',
        organizer: 'Career Services Office',
        status: 'ongoing',
        image: 'https://images.unsplash.com/photo-1761195689615-9469b65dac01?w=400',
    },
    {
        id: '3',
        title: 'Research Conference 2024',
        date: 'December 15, 2024',
        time: '8:00 AM - 6:00 PM',
        venue: 'Science Building Hall',
        organizer: 'Research & Development Office',
        status: 'ended',
        image: 'https://images.unsplash.com/photo-1747674148491-51f8a5c723db?w=400',
    },
    {
        id: '4',
        title: 'Music Festival Unplugged',
        date: 'January 5, 2025',
        time: '5:00 PM - 10:00 PM',
        venue: 'Outdoor Amphitheater',
        organizer: 'Student Council',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1724390265310-a4814e561d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZmVzdGl2YWwlMjBjb25jZXJ0fGVufDF8fHx8MTc2NTk1MjcxMHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'A celebration of music and talent! Enjoy performances from student bands, solo artists, and special guest performers.',
        whatToExpect: [
            'Live band performances',
            'Student talent showcase',
            'Food trucks and vendors',
            'Photo booth',
            'Raffle prizes'
        ],
        schedule: [
            { time: '5:00 PM', activity: 'Doors Open - Food & Vendors' },
            { time: '6:00 PM', activity: 'Opening Act' },
            { time: '7:00 PM', activity: 'Student Band Performances' },
            { time: '8:30 PM', activity: 'Special Guest Performance' },
            { time: '9:30 PM', activity: 'Finale & Raffle Draw' }
        ],
        photos: []
    },
    {
        id: '5',
        title: 'Leadership Summit',
        date: 'November 30, 2024',
        time: '1:00 PM - 5:00 PM',
        venue: 'Executive Training Room',
        organizer: 'Leadership Development Center',
        status: 'ended',
        image: 'https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwd29ya3Nob3AlMjBhY3Rpdml0eXxlbnwxfHx8fDE3NjU5NTI3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Develop your leadership skills and learn from successful leaders in various fields.',
        whatToExpect: [
            'Leadership workshops',
            'Team building activities',
            'Case study discussions',
            'Mentorship sessions',
            'Leadership toolkit'
        ],
        schedule: [
            { time: '1:00 PM', activity: 'Welcome & Ice Breakers' },
            { time: '2:00 PM', activity: 'Leadership Workshop' },
            { time: '3:30 PM', activity: 'Team Building Activities' },
            { time: '4:30 PM', activity: 'Q&A and Networking' }
        ],
        photos: []
    },
    {
        id: '6',
        title: 'Startup Pitch Competition',
        date: 'December 10, 2024',
        time: '2:00 PM - 6:00 PM',
        venue: 'Innovation Hub',
        organizer: 'Entrepreneurship Center',
        status: 'cancelled',
        image: 'https://images.unsplash.com/photo-1761195689615-9469b65dac01?w=1080',
        description: 'Watch student entrepreneurs pitch their innovative startup ideas to a panel of investors and industry experts.',
        whatToExpect: [
            'Student startup presentations',
            'Live Q&A with judges',
            'Networking with investors',
            'Cash prizes for winners',
            'Mentorship opportunities'
        ],
        schedule: [
            { time: '2:00 PM', activity: 'Registration & Setup' },
            { time: '2:30 PM', activity: 'Round 1: Preliminary Pitches' },
            { time: '4:00 PM', activity: 'Round 2: Final Pitches' },
            { time: '5:30 PM', activity: 'Judges Deliberation' },
            { time: '5:45 PM', activity: 'Awards Ceremony' }
        ],
        photos: []
    }
];

export default function Home() {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    // Filter events based on dropdown
    const filteredEvents = mockEvents.filter(event => {
        if (activeTab.toLowerCase() === 'all') return true;
        return event.status === activeTab.toLowerCase();
    }).filter(event => event.title.toLowerCase().includes(search.toLowerCase()));

    const renderEvent = ({ item }: { item: typeof mockEvents[0] }) => (
        <TouchableOpacity style={styles.card} onPress={() => alert(`Clicked: ${item.title}`)}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.date} | {item.time}</Text>
                <Text style={styles.cardSubtitle}>{item.venue}</Text>
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
