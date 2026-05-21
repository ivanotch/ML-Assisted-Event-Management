import { AntDesign } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../../src/lib/firebaseConfig";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {getLoggedUser} from '../../src/services/loginUser'

// interface Student {
//     fullName: string;
//     studentNumber: string;
//     section: string;
//     department: string;
//     program: string;
//     photo: string;
// }

// export const mockStudent: Student = {
//     fullName: "Sarah Johnson",
//     studentNumber: "2021-00123",
//     section: "CS-4A",
//     department: "Computer Science",
//     program: "Bachelor of Science in Computer Science",
//     photo:
//         "https://images.unsplash.com/photo-1659080907111-7c726e435a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
// };

export default function Profile() {
    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getLoggedUser();

                setStudent(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace("/login"); // redirect to login
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Profile</Text>

             {/*Profile Card*/}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ position: 'relative' }}>
                    <Image
                        source={{
                            uri: student?.user?.avatarUrl
                        }}
                        style={styles.avatar}
                    />
                    <AntDesign style={{ position: 'absolute', bottom: 10, right: 8, backgroundColor: '#ffff', padding: 3, borderRadius: 10 }} name="edit" size={24} color="black" />
                </View>
            </View>

            <View style={styles.card}>
                {/* Avatar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignContent: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Personal Info</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* personal info card */}
                <View style={{ display: 'flex', gap: 9, paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', gap: 10 }}>
                        <Octicons name="person" size={24} color="black" />
                        <View>
                            <Text style={{ color: '#a9a9a9', fontWeight: '700' }}>
                                Name
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {student?.user?.name}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', gap: 10 }}>
                        <AntDesign name="idcard" size={24} color="black" />
                        <View>
                            <Text style={{ color: '#a9a9a9', fontWeight: '700' }}>
                                Student Number
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {student?.student?.student_number}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', gap: 10 }}>
                        <Ionicons name="school-outline" size={24} color="black" />
                        <View>
                            <Text style={{ color: '#a9a9a9', fontWeight: '700' }}>
                                program
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {student?.section?.course_name}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', gap: 10 }}>
                        <FontAwesome6 name="school-flag" size={24} color="black" />
                        <View>
                            <Text style={{ color: '#a9a9a9', fontWeight: '700' }}>
                                Department
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {student?.section?.program_name}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', gap: 10 }}>
                        <MaterialCommunityIcons name="google-classroom" size={24} color="black" />
                        <View>
                            <Text style={{ color: '#a9a9a9', fontWeight: '700' }}>
                                Section
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {student?.section?.name}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

/* Reusable row component */
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: "500",
        marginVertical: 20,
        textAlign: 'center'
    },
    card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
        logoutButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EF4444',
            padding: 14,
            borderRadius: 12,
            marginTop: 30,
            gap: 8,
        },
        logoutText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
        },
    avatar: {
        borderWidth: 5,
        borderColor: '#ffff',
        width: 130,
        height: 130,
        borderRadius: 100,
        marginBottom: 30,
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
    },
    studentNumber: {
        fontSize: 14,
        color: "gray",
        marginBottom: 16,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 16,
    },
    infoRow: {
        width: "100%",
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 2,
        textTransform: "uppercase",
    },
    value: {
        fontSize: 15,
        fontWeight: "500",
    },
});
