import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {useState} from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useEvent} from "../../../src/hooks/useEvents";
import {registerForEvent} from "../../../src/services/events";
import {auth} from "../../../src/lib/firebaseConfig";


export default function RegisterPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const { event } = useEvent(id as string);

    const currentUser = auth.currentUser;

    if (!currentUser) {
        console.log("No logged in user");
        return null;
    }

    const uid = currentUser.uid;

    if (!event) {
        return (
            <SafeAreaView>
                <Text>Event not found!</Text>
            </SafeAreaView>
        )
    }

    const handleRegister = async () => {
        if (isRegistering) return;

        if (event.price > 0) {
            router.push({
                pathname: "/event/[id]/payment",
                params: {
                    id
                },
            });
        } else {
            try {
                setIsRegistering(true);
                setError(null);

                const registrationId = await registerForEvent(
                    event.id,
                    uid,
                    event.price,
                );

                router.push({
                    pathname: "/event/[id]/ticket",
                    params: {
                        id,
                        registrationId,
                    },
                });
            } catch (err: any) {
                console.error(err);
                setError(err.message ?? "Unable to register");
            } finally {
                setIsRegistering(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20, justifyContent: 'center' }}>
                <LinearGradient
                    colors={["#1E293B", "#111827"]}
                    style={styles.card}
                >
                    <Text style={styles.eventTitle}>{event.title}</Text>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="calendar-outline"
                            size={18}
                            color="#94A3B8"
                        />
                        <Text style={styles.infoText}>{event.date}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="location-outline"
                            size={18}
                            color="#94A3B8"
                        />
                        <Text style={styles.infoText}>{event.location}</Text>
                    </View>

                    <View style={styles.priceBadge}>
                        <Text style={styles.priceText}>
                            {event.price > 0
                                ? `₱${event.price}`
                                : "FREE"}
                        </Text>
                    </View>
                </LinearGradient>


                {event.price > 0 ? (
                    <TouchableOpacity
                        onPress={handleRegister}
                        style={styles.registerButton}
                    >
                            <Text style={styles.registerText}>
                                Confirm Payment
                            </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[
                            styles.registerButton,
                            isRegistering && styles.disabledButton,
                        ]}
                        disabled={isRegistering}
                        onPress={handleRegister}
                    >
                        <Text style={styles.registerText}>
                            Register Now
                        </Text>
                    </TouchableOpacity>
                )}
                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}
            </ScrollView>
            <Modal
                visible={isRegistering}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator
                            size="large"
                            color="#3B82F6"
                        />

                        <Text style={styles.modalTitle}>
                            Registering...
                        </Text>

                        <Text style={styles.modalText}>
                            Please wait while we reserve your slot.
                        </Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#020617",
        alignItems: 'center'
    },
    card: {
        borderRadius: 24,
        padding: 24,
        marginTop: 20,
    },
    eventTitle: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    infoText: {
        color: "#CBD5E1",
        marginLeft: 10,
    },
    priceBadge: {
        marginTop: 20,
        alignSelf: "flex-start",
        backgroundColor: "#2563EB",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
    },
    priceText: {
        color: "#FFF",
        fontWeight: "700",
    },
    registerButton: {
        backgroundColor: "#3B82F6",
        marginTop: 30,
        borderRadius: 18,
        paddingVertical: 18,
        alignItems: "center",
    },
    registerText: {
        color: "#FFF",
        fontWeight: "700",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContent: {
        width: "80%",
        backgroundColor: "#111827",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
    },

    modalTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
        marginTop: 16,
    },

    modalText: {
        color: "#94A3B8",
        textAlign: "center",
        marginTop: 8,
    },

    disabledButton: {
        opacity: 0.6,
    },

    errorText: {
        color: "#EF4444",
        textAlign: "center",
        marginTop: 12,
    },
});