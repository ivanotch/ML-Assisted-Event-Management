import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";

export default function TicketPage() {
    const { id, registrationId } = useLocalSearchParams<{ id: string, registrationId: string }>();

    const event = {
        id,
        title: "Tech Innovation Summit",
        date: "June 12, 2026",
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={["#111827", "#0F172A"]}
                style={styles.content}
            >
                <Ionicons
                    name="checkmark-circle"
                    size={80}
                    color="#22C55E"
                />

                <Text style={styles.title}>
                    Registration Successful
                </Text>

                <Text style={styles.subtitle}>
                    Present this QR code at the entrance.
                </Text>

                <View style={styles.qrWrapper}>
                    <QRCode
                        value={`EVENT:${registrationId}`}
                        size={220}
                    />
                </View>

                <Text style={styles.eventName}>
                    {event.title}
                </Text>

                <Text style={styles.info}>
                    Ticket ID: {registrationId}
                </Text>

                <Text style={styles.info}>
                    {event.date}
                </Text>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020617",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        color: "#FFF",
        fontSize: 26,
        fontWeight: "700",
        marginTop: 16,
    },
    subtitle: {
        color: "#94A3B8",
        marginTop: 8,
        marginBottom: 24,
    },
    qrWrapper: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 20,
    },
    eventName: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
        marginTop: 24,
    },
    info: {
        color: "#94A3B8",
        marginTop: 8,
    },
});