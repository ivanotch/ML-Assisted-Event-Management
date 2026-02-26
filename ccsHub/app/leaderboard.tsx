import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';

interface Notification {
    id: string;
    type: "reminder" | "registration" | "booth" | "announcement";
    title: string;
    message: string;
    date: string;
    read: boolean;
}

type tabType = {
    label: string;
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

const tabs: tabType[] = [
    { label: 'All Time Ranking' },
    { label: 'List Ranking' }
]

export default function Leaderboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("All Time Ranking")
    const progress = 0.7; // 70% progress (0 to 1)
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    if (router.canGoBack()) {
                        router.back();
                    } else {
                        router.replace("/home");
                    }
                }}
            >
                <Ionicons name="arrow-back" size={22} color="white" />
            </TouchableOpacity>

            <View style={{ marginTop: 90, paddingHorizontal: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '800' }}>Leaderboards</Text>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'white' }}>

                <View style={styles.tabContainer}>
                    {tabs.map((item) => {
                        const active = activeTab === item.label;
                        return (
                            <TouchableOpacity
                                key={item.label}
                                style={[styles.tabItem, active && styles.activeTab]}
                                onPress={() => {
                                    setActiveTab(item.label)
                                }}
                            >
                                <Text style={[styles.tabText, active && styles.activeText]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <View>
                    <Text style={{ fontWeight: '600', fontSize: 15, color: '#808080' }}>
                        MY PROGRESS
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', gap: 20, paddingHorizontal: 20, paddingVertical: 25, borderWidth: 2, borderRadius: 15, marginTop: 15}}>
                        <View style={{flex: 1, gap: 5}}>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <MaterialCommunityIcons name="progress-star-four-points" size={20} color="#FF9800" />
                                <View style={{flexDirection: 'row'}}>
                                    <Text>10</Text>
                                    <Text>/</Text>
                                    <Text>10</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 1, gap: 5}}>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFillGame, { width: `${progress * 100}%` }]} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <SimpleLineIcons name="game-controller" size={20} color="#6a5acd" />
                                <View style={{flexDirection: 'row'}}>
                                    <Text>10</Text>
                                    <Text>/</Text>
                                    <Text>10</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 1, gap: 5}}>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFillTrophy, { width: `${progress * 100}%` }]} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <EvilIcons name="trophy" size={20} color="#32cd32" />
                                <View style={{flexDirection: 'row'}}>
                                    <Text>10</Text>
                                    <Text>/</Text>
                                    <Text>10</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f0ec",
    },
    tabContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#efecec',
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 20
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
        backgroundColor: '#1d1d1d',  // blue when selected
    },
    tabText: {
        color: '#010101',
        fontWeight: '500',
    },

    activeText: {
        color: 'white',
        fontWeight: '600',
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 15,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 8,
        borderRadius: 20,
        zIndex: 1
    },

    // progress
    progressBarContainer: {
        height: 10,
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#FF9800",
        borderRadius: 5,
    },
    progressBarFillGame: {
        height: "100%",
        backgroundColor: "#6a5acd",
        borderRadius: 5,
    },
    progressBarFillTrophy: {
        height: "100%",
        backgroundColor: "#32cd32",
        borderRadius: 5,
    },
});
