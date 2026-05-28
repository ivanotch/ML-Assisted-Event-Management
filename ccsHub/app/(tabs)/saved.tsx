import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchRegistrations, fetchAllEvents } from "../../src/services/events";
import { auth } from "../../src/lib/firebaseConfig";
import {Event} from '../../src/types/event'

const screenWidth = Dimensions.get('window').width;


interface Registration {
    id: string;
    checked_in: boolean;
    checked_out: boolean;
    event_id: string;
    payment_amount: number;
    payment_status: string;
    qr_value: string;
    registration_status: string;
    student_id: string;
    ticket_id: string;
    registered_at: any;
}

interface RegisteredEvent extends Event {
    registrationId?: string;
}
export default function Saved() {

    const [activeTab, setActiveTab] = useState<'registered' | 'upcoming'>('registered');
    const [allEvents, setAllEvents] = useState<Event[]>([]);

    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedEvent, setSelectedEvent] =
        useState<RegisteredEvent | null>(null);
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

    const currentUser = auth.currentUser;

    const uid = currentUser?.uid;

    useEffect(() => {
        const loadRegistrations = async () => {
            if (!uid) {
                return;
            }
            try {
                setLoading(true);

                const eventData = await fetchAllEvents();
                const data = await fetchRegistrations(uid);

                setRegistrations(data || []);
                setAllEvents(eventData)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadRegistrations();
    }, []);

    const registeredEvents = allEvents
        .filter((event) =>
            registrations.some(
                (registration) => registration.event_id === event.id
            )
        )
        .map((event) => {
            const registration = registrations.find(
                (r) => r.event_id === event.id
            );

            return {
                ...event,
                registrationId: registration?.id,
            };
        });

    // Saved Upcoming Events
    const upcomingEvents = allEvents.filter(
        (e) => e.status === 'upcoming'
    );

    if (!currentUser) {
        console.log("No logged in user");
        return null;
    }

    const eventsToShow =
        activeTab === 'registered'
            ? registeredEvents
            : upcomingEvents;

    const openTicketModal = (item: any) => {

        if (activeTab !== 'registered') return;

        const registration = registrations.find(
            (r) => r.id === item.registrationId
        );

        setSelectedRegistration(registration || null);
        setSelectedEvent(item);
    };

    const renderEvent = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => openTicketModal(item)}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.cardImage}
            />

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                    {item.title}
                </Text>

                <Text style={styles.cardSubtitle}>
                    {item.date} | {item.start_time} - {item.end_time}
                </Text>

                <Text style={styles.cardSubtitle}>
                    {item.location}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.header}>
                Saved Events
            </Text>

            {/* Tabs */}
            <View style={styles.tabContainer}>

                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'registered' && styles.activeTab
                    ]}
                    onPress={() => setActiveTab('registered')}
                >
                    <Text
                        style={
                            activeTab === 'registered'
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        Event Registered
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'upcoming' && styles.activeTab
                    ]}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text
                        style={
                            activeTab === 'upcoming'
                                ? styles.activeTabText
                                : styles.tabText
                        }
                    >
                        Saved Upcoming
                    </Text>
                </TouchableOpacity>

            </View>

            {/* Loading */}
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#2563eb" />
                </View>
            ) : eventsToShow.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        No events
                    </Text>

                    <Text style={styles.emptySubtitle}>
                        Nothing to show here
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={eventsToShow}
                    keyExtractor={(item: any) => item.id}
                    renderItem={renderEvent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            {/* Ticket Modal */}
            <Modal
                visible={!!selectedEvent}
                transparent
                animationType="slide"
                onRequestClose={() => setSelectedEvent(null)}
            >
                <View style={styles.modalOverlay}>

                    <View style={styles.modalContent}>

                        <Text style={styles.modalTitle}>
                            Event Ticket
                        </Text>

                        {selectedEvent && (
                            <>
                                <Text style={styles.ticketEvent}>
                                    {selectedEvent.title}
                                </Text>

                                <Text style={styles.ticketText}>
                                    {selectedEvent.date}
                                </Text>

                                <Text style={styles.ticketText}>
                                    {selectedEvent.location}
                                </Text>

                                <View style={styles.qrContainer}>
                                    <QRCode
                                        value={JSON.stringify({
                                            registrationId:
                                            selectedRegistration?.id,
                                            eventId: selectedEvent.id,
                                            userId: uid,
                                        })}
                                        size={220}
                                    />
                                </View>
                            </>
                        )}

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                setSelectedEvent(null);
                                setSelectedRegistration(null);
                            }}
                        >
                            <Text style={styles.closeButtonText}>
                                Close
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingHorizontal: 16,
    },

    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },

    tabButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#eee',
        alignItems: 'center',
    },

    activeTab: {
        backgroundColor: '#2563eb',
    },

    tabText: {
        color: 'gray',
        fontWeight: '600',
    },

    activeTabText: {
        color: 'white',
        fontWeight: '600',
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
    },

    cardImage: {
        width: '100%',
        height: 110,
    },

    cardContent: {
        padding: 12,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    cardSubtitle: {
        fontSize: 14,
        color: 'gray',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },

    emptySubtitle: {
        fontSize: 14,
        color: 'gray',
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
    },

    ticketEvent: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
    },

    ticketText: {
        color: 'gray',
        marginBottom: 4,
    },

    qrContainer: {
        marginVertical: 24,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
    },

    closeButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '100%',
    },

    closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    },
});
