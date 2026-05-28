import { router, useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet, ActivityIndicator, Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {registerForEvent} from "../../../src/services/events";
import {useState} from "react";
import {useEvent} from "../../../src/hooks/useEvents";
import {auth} from "../../../src/lib/firebaseConfig";
import {Ionicons} from "@expo/vector-icons";


export default function PaymentPage() {
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

    const handlePaymentSuccess = async () => {
        if (isRegistering) return;
        try {
            setIsRegistering(true);
            setError(null);

            const registrationId = await registerForEvent(
                id,
                uid,
                event.price,
            );

            router.replace({
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
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    if (router.canGoBack()) {
                        router.back();
                    } else {
                        router.replace("/event/[id]/eventDetails");
                    }
                }}
            >
                <Ionicons name="arrow-back" size={22} color="white" />
            </TouchableOpacity>
            <View style={styles.card}>
                <Text style={styles.heading}>
                    Payment Required
                </Text>

                <Text style={styles.amount}>
                    ₱{event.price}
                </Text>

                <Text style={styles.description}>
                    Mock payment screen.
                </Text>

                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePaymentSuccess}
                >
                    <Text style={styles.buttonText}>
                        Complete Payment
                    </Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: "#020617",
        justifyContent: "center",
    },
    card: {
        margin: 24,
        padding: 24,
        borderRadius: 24,
        backgroundColor: "#111827",
    },
    heading: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "700",
    },
    amount: {
        color: "#22C55E",
        fontSize: 42,
        fontWeight: "800",
        marginVertical: 20,
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
    description: {
        color: "#94A3B8",
    },
    button: {
        marginTop: 24,
        backgroundColor: "#22C55E",
        padding: 18,
        borderRadius: 18,
        alignItems: "center",
    },
    buttonText: {
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