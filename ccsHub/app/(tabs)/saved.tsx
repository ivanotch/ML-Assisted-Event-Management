import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    venue: string;
    organizer: string;
    status: 'ongoing' | 'upcoming' | 'ended' | 'cancelled';
    image: string;
    description: string;
    whatToExpect: string[];
    schedule: Array<{
        time: string;
        activity: string;
    }>;
    photos?: string[];
}

export const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Annual Tech Symposium 2024',
        date: 'December 20, 2024',
        time: '9:00 AM - 5:00 PM',
        venue: 'Main Auditorium',
        organizer: 'Computer Science Department',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZXZlbnR8ZW58MXx8fHwxNzY1OTIwOTU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Join us for the biggest technology event of the year! The Annual Tech Symposium brings together students, faculty, and industry leaders to discuss the latest trends in technology and innovation.',
        whatToExpect: [
            'Keynote speeches from industry leaders',
            'Interactive workshop sessions',
            'Networking opportunities with tech professionals',
            'Student project exhibitions',
            'Certificate of participation'
        ],
        schedule: [
            { time: '9:00 AM', activity: 'Registration & Welcome Coffee' },
            { time: '10:00 AM', activity: 'Opening Ceremony & Keynote Speech' },
            { time: '12:00 PM', activity: 'Lunch Break' },
            { time: '1:00 PM', activity: 'Workshop Sessions (Track A & B)' },
            { time: '3:30 PM', activity: 'Panel Discussion' },
            { time: '4:30 PM', activity: 'Closing Remarks & Certificates' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1747674148491-51f8a5c723db?w=400',
            'https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?w=400',
            'https://images.unsplash.com/photo-1761195689615-9469b65dac01?w=400'
        ]
    },
    {
        id: '2',
        title: 'Career Fair 2024',
        date: 'December 18, 2024',
        time: '10:00 AM - 4:00 PM',
        venue: 'University Convention Center',
        organizer: 'Career Services Office',
        status: 'ongoing',
        image: 'https://images.unsplash.com/photo-1761195689615-9469b65dac01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXhwbyUyMGJvb3RofGVufDF8fHx8MTc2NTg3NTA2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Connect with top employers and explore exciting career opportunities! Meet recruiters from leading companies across various industries.',
        whatToExpect: [
            'Over 50 companies participating',
            'On-the-spot interviews',
            'Resume review sessions',
            'Career counseling',
            'Free professional headshots'
        ],
        schedule: [
            { time: '10:00 AM', activity: 'Fair Opens - Company Booths' },
            { time: '11:00 AM', activity: 'Resume Clinic Sessions' },
            { time: '1:00 PM', activity: 'Lunch & Networking' },
            { time: '2:00 PM', activity: 'Interview Sessions Begin' },
            { time: '3:30 PM', activity: 'Final Networking Session' }
        ],
        photos: []
    },
    {
        id: '3',
        title: 'Research Conference 2024',
        date: 'December 15, 2024',
        time: '8:00 AM - 6:00 PM',
        venue: 'Science Building Hall',
        organizer: 'Research & Development Office',
        status: 'ended',
        image: 'https://images.unsplash.com/photo-1747674148491-51f8a5c723db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc2VtaW5hciUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzY1OTUyNzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'An academic conference showcasing cutting-edge research from students and faculty across all departments.',
        whatToExpect: [
            'Research paper presentations',
            'Poster sessions',
            'Best paper awards',
            'Collaboration opportunities',
            'Publication opportunities'
        ],
        schedule: [
            { time: '8:00 AM', activity: 'Registration' },
            { time: '9:00 AM', activity: 'Opening & Plenary Session' },
            { time: '11:00 AM', activity: 'Parallel Paper Sessions' },
            { time: '1:00 PM', activity: 'Poster Session & Lunch' },
            { time: '3:00 PM', activity: 'Panel Discussion' },
            { time: '5:00 PM', activity: 'Awards Ceremony' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1613687969216-40c7b718c025?w=400',
            'https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?w=400'
        ]
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

export default function Saved() {
    const [activeTab, setActiveTab] = useState<'attended' | 'upcoming'>('attended');

    const attendedEvents = mockEvents.filter(e => e.status === 'ended');
    const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming');

    const renderEvent = ({ item }: { item: Event }) => (
        <TouchableOpacity style={styles.card} onPress={() => alert(`Clicked: ${item.title}`)}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.date} | {item.time}</Text>
                <Text style={styles.cardSubtitle}>{item.venue}</Text>
            </View>
        </TouchableOpacity>
    );

    const eventsToShow = activeTab === 'attended' ? attendedEvents : upcomingEvents;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Saved Events</Text>

            {/* Custom Tab Buttons */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'attended' && styles.activeTab]}
                    onPress={() => setActiveTab('attended')}
                >
                    <Text style={activeTab === 'attended' ? styles.activeTabText : styles.tabText}>Previously Attended</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'upcoming' && styles.activeTab]}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text style={activeTab === 'upcoming' ? styles.activeTabText : styles.tabText}>Saved Upcoming</Text>
                </TouchableOpacity>
            </View>

            {/* Event List */}
            {eventsToShow.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>No events</Text>
                    <Text style={styles.emptySubtitle}>Nothing to show here</Text>
                </View>
            ) : (
                <FlatList
                    data={eventsToShow}
                    keyExtractor={item => item.id}
                    renderItem={renderEvent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5FCFF' },
    header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, paddingHorizontal: 16 },
    tabContainer: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 16, borderRadius: 8, overflow: 'hidden' },
    tabButton: { flex: 1, padding: 12, backgroundColor: '#eee', alignItems: 'center' },
    activeTab: { backgroundColor: '#2563eb' },
    tabText: { color: 'gray', fontWeight: '600' },
    activeTabText: { color: 'white', fontWeight: '600' },
    card: { backgroundColor: 'white', borderRadius: 16, marginHorizontal: 16, marginBottom: 16, overflow: 'hidden', elevation: 3 },
    cardImage: { width: '100%', height: 110 },
    cardContent: { padding: 12 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    cardSubtitle: { fontSize: 14, color: 'gray' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 },
    emptyTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
    emptySubtitle: { fontSize: 14, color: 'gray' },
});
