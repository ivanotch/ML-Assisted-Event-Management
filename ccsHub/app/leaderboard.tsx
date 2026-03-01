import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';

type tabType = {
    label: string;
}

const tabs: tabType[] = [
    { label: 'All Time Ranking' },
    { label: 'List Ranking' }
]

const ranking = [
    {
        name: "Anna",
        place: "2nd",
        height: 120,
        color: "#C0C0C0",
        image: "https://i.pravatar.cc/150?img=5",
    },
    {
        name: "John",
        place: "1st",
        height: 180,
        color: "#FFD700",
        image: "https://i.pravatar.cc/150?img=3",
    },
    {
        name: "Mike",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "james",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "kite",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "maine",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "johnny",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "kate",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "ivan",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "kael",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "israel",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "gab",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "adrian",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        name: "hael",
        place: "3rd",
        height: 100,
        color: "#CD7F32",
        image: "https://i.pravatar.cc/150?img=8",
    },
]

export default function Leaderboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("All Time Ranking")
    const progress = 0.7; // 70% progress (0 to 1)

    const topThree = ranking.slice(0, 3);
    const others = ranking.slice(3);
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', gap: 20, paddingHorizontal: 20, paddingVertical: 25, borderWidth: 2, borderRadius: 15, marginTop: 15 }}>
                        <View style={{ flex: 1, gap: 5 }}>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <MaterialCommunityIcons name="progress-star-four-points" size={20} color="#FF9800" />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>10</Text>
                                    <Text>/</Text>
                                    <Text>10</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, gap: 5 }}>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFillGame, { width: `${progress * 100}%` }]} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <SimpleLineIcons name="game-controller" size={20} color="#6a5acd" />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>10</Text>
                                    <Text>/</Text>
                                    <Text>10</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, gap: 5 }}>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFillTrophy, { width: `${progress * 100}%` }]} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <EvilIcons name="trophy" size={20} color="#32cd32" />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>10</Text>
                                    <Text>/</Text>
                                    <Text>10</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ranking */}
                <View style={styles.rankingContainer}>
                    <View style={styles.rankingRow}>
                        {
                            topThree.map((item, index) => (
                                <View key={index} style={styles.rankingItem}>
                                    <Image source={{ uri: item.image }} style={styles.avatar} />

                                    <Text style={styles.name}>{item.name}</Text>

                                    <View
                                        style={[styles.bar, { height: item.height, backgroundColor: item.color }]}
                                    >
                                        <Text style={styles.place}>{item.place}</Text>
                                    </View>


                                </View>
                            ))
                        }
                    </View>
                </View>

                <FlatList 
                    data={others}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                    renderItem={({item, index}) => (
                        <View>
                            <Text>
                                {index + 4}
                            </Text>
                            <Image 
                                source={{uri: item.image}}
                            />
                            <Text>{item.name}</Text>
                        </View>
                    )}


                />

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
    rankingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 30,
        paddingTop: 20,
        paddingBottom: 5
    },
    rankingRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 20
    },
    rankingItem: {
        alignItems: 'center'
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 6,
        borderWidth: 3,
        borderColor: 'white'
    },
    name: {
        fontWeight: "600",
        marginBottom: 8,
    },
    bar: {
        width: 80,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    place: {
        marginTop: 8,
        fontSize: 30,
        fontWeight: 'bold'
    }
});
