import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {subscribeToAnnouncements} from "../src/services/notification";

type AnnouncementType = "System" | "General";

interface Announcement {
    id: string;
    title: string;
    type: AnnouncementType;
    for: string;
    description: string;
    date: string;
}
const notificationColors = {
    System: "#FF9800",
    General: "#9C27B0",
};

const notificationIcons = {
    System: <MaterialCommunityIcons name="bell-alert" size={22} color="white" />,
    General: <MaterialIcons name="announcement" size={22} color="white" />,
};

export default function Notifications() {

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const unsubscribe = subscribeToAnnouncements(
            (announcements) => {
                setAnnouncements(announcements);
                setLoading(false);
            },
            () => {
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator
                    size="large"
                    color="#2563eb"
                />
                <Text style={styles.loadingText}>
                    Loading announcements...
                </Text>
            </SafeAreaView>
        );
    }

    if (announcements.length === 0) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <MaterialIcons
                    name="notifications-none"
                    size={70}
                    color="#BDBDBD"
                />

                <Text style={styles.emptyTitle}>
                    No Announcements
                </Text>

                <Text style={styles.emptySubtitle}>
                    New announcements will appear here.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={announcements}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.notificationCard,
                        ]}
                    >
                        {/* Icon */}
                        <View
                            style={[
                                styles.iconContainer,
                                { backgroundColor: notificationColors[item.type] },
                            ]}
                        >
                            {notificationIcons[item.type]}
                        </View>

                        {/* Content */}
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.message}>{item.description}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    loadingText: {
        marginTop: 12,
        color: "#666",
        fontSize: 14,
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 16,
        marginBottom: 8,
    },

    emptySubtitle: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    notificationCard: {
        flexDirection: "row",
        padding: 14,
        borderRadius: 14,
        backgroundColor: "white",
        marginBottom: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    unreadCard: {
        backgroundColor: "#EEF4FF",
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 2,
    },
    message: {
        fontSize: 13,
        color: "#555",
        marginBottom: 4,
    },
    date: {
        fontSize: 11,
        color: "#888",
    },
});
