import { Text, View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Notification {
    id: string;
    type: "reminder" | "registration" | "booth" | "announcement";
    title: string;
    message: string;
    date: string;
    read: boolean;
}

const notificationColors = {
    reminder: "#FF9800",
    registration: "#4CAF50",
    booth: "#2196F3",
    announcement: "#9C27B0",
};

const notificationIcons = {
    reminder: <MaterialCommunityIcons name="bell-alert" size={22} color="white" />,
    registration: <MaterialIcons name="app-registration" size={22} color="white" />,
    booth: <FontAwesome5 name="store" size={18} color="white" />,
    announcement: <MaterialIcons name="announcement" size={22} color="white" />,
};

export const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "reminder",
        title: "Event Reminder",
        message: "Annual Tech Symposium 2024 starts in 2 days! Don't forget to register.",
        date: "2 hours ago",
        read: false,
    },
    {
        id: "2",
        type: "registration",
        title: "Registration Confirmed",
        message: "Your registration for Career Fair 2024 has been confirmed.",
        date: "1 day ago",
        read: false,
    },
    {
        id: "3",
        type: "booth",
        title: "Booth Application Update",
        message: "Your booth application for Tech Symposium has been approved.",
        date: "2 days ago",
        read: true,
    },
    {
        id: "4",
        type: "announcement",
        title: "University Announcement",
        message: "New event guidelines have been published.",
        date: "3 days ago",
        read: true,
    },
];

export default function Notifications() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Notifications</Text>

            <FlatList
                data={mockNotifications}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.notificationCard,
                            !item.read && styles.unreadCard,
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
                            <Text style={styles.message}>{item.message}</Text>
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
