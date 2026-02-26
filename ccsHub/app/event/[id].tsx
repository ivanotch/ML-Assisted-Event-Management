import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { mockEvents } from '../../data/messages'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import Fontisto from '@expo/vector-icons/Fontisto';
import { ScrollView, Image, Animated } from "react-native";


export default function EventDetails() {

    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: "#1d1d1d" }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }} // space for fixed button
                keyboardShouldPersistTaps="handled"
            >

                <ImageBackground
                    source={require("../../assets/images/upcoming-placeholder.jpg")}
                    style={styles.image}
                >
                    {/* Back Button */}
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

                    {/* Heart Button */}
                    <TouchableOpacity
                        style={styles.heartButton}
                        onPress={() => setLiked(!liked)}
                    >
                        <Ionicons
                            name={liked ? "heart" : "heart-outline"}
                            size={22}
                            color={liked ? "red" : "white"}
                        />
                    </TouchableOpacity>

                    <LinearGradient
                        colors={["transparent", "#1d1d1d"]}
                        style={styles.fade}
                    />
                </ImageBackground>


                <View style={styles.contentContainer}>
                    {/* tag */}
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Departmental</Text>
                    </View>

                    <Text style={{ fontSize: 23, fontWeight: '600', color: '#ffff', marginBottom: 8 }}>COMSA Anniversary</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                        <Feather name="map-pin" size={22} color="white" />
                        <Text style={{ color: '#808080' }}>EARIST, MIS Building 2nd flr</Text>
                    </View>

                    <View>
                        <View>
                            <Text
                                numberOfLines={expanded ? undefined : 5}
                                style={styles.description}
                            >
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Ex sapien vitae pellentesque sem placerat in id.
                                Pretium tellus duis convallis tempus leo eu aenean. Urna tempor pulvinar vivamus fringilla lacus nec metus.
                                Iaculis massa nisl malesuada lacinia integer nunc posuere. Semper vel class aptent taciti sociosqu ad litora.
                                Conubia nostra inceptos himenaeos orci varius natoque penatibus. Dis parturient montes nascetur ridiculus mus donec rhoncus.
                                Nulla molestie mattis scelerisque maximus eget fermentum odio. Purus est efficitur laoreet mauris pharetra vestibulum fusce.
                            </Text>

                            {expanded ? <Text style={{ color: '#4da6ff', marginVertical: 8 }}>#Comsa #Anniversary #JoinUs</Text> : null}

                            {!expanded && (
                                <LinearGradient
                                    colors={["transparent", "#1d1d1d"]}
                                    style={styles.textFade}
                                    pointerEvents="none"
                                />
                            )}
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }} onPress={() => setExpanded(!expanded)}>
                            {expanded ? <Feather name="chevrons-up" size={20} color="#cff883" /> : <Feather name="chevrons-down" size={20} color="#cff883" />}
                            <Text style={styles.readMore}>
                                {expanded ? "Read Less" : "Read More"}
                            </Text>
                            {expanded ? <Feather name="chevrons-up" size={20} color="#cff883" /> : <Feather name="chevrons-down" size={20} color="#cff883" />}
                        </TouchableOpacity>


                    </View>

                    <View style={styles.row}>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Fontisto name="date" size={24} color="#808080" />
                            <Text style={{ color: '#808080' }}>Event Date</Text>
                        </View>
                        <Text style={{ color: 'white' }}>Jan 10, 2026</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Ionicons name="time-outline" size={24} color="#808080" />
                            <Text style={{ color: '#808080' }}>Time</Text>
                        </View>
                        <Text style={{ color: 'white' }}>10:00AM</Text>
                    </View>


                    {/* Promotional Image */}
                    <Image
                        source={require("../../assets/images/upcoming-placeholder.jpg")}
                        style={styles.promoImage}
                        resizeMode="cover"
                    />
                </View >
            </ScrollView>

            {/* bottom tab must be fixed at the bottom */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={{ color: "white" }}>Price</Text>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>₱10,000</Text>
                </View>

                <TouchableOpacity style={styles.proceedButton}>
                    <Text style={{ color: "#000", fontWeight: "600" }}>
                        Proceed
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 250,
        justifyContent: "flex-start",
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
    heartButton: {
        position: "absolute",
        top: 60,
        right: 15,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 8,
        borderRadius: 20,
        zIndex: 1
    },

    contentContainer: {
        marginTop: 0, // 👈 pulls it upward over the image
        backgroundColor: "#1d1d1d",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 2,
    },

    fade: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
    },

    tag: {
        alignSelf: "flex-start", // 👈 IMPORTANT
        backgroundColor: "#cff883",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: -70,
        marginBottom: 20
    },

    tagText: {
        color: "#000000",
        fontSize: 12,
        fontWeight: '600'
    },

    description: {
        color: "#808080",
        lineHeight: 22,
    },

    textFade: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },

    readMore: {
        color: "#cff883",
        marginTop: -5,
        fontSize: 12,
        fontWeight: "600",
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14
    },
    promoImage: {
        width: "100%",
        height: 180,
        borderRadius: 15,
        marginTop: 20,
    },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#121212",
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#2a2a2a",
    },

    proceedButton: {
        backgroundColor: "#cff883",
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
});