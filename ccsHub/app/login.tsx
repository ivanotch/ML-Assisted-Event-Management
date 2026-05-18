import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useLogin } from "../src/hooks/useAuth";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { login, loading, error } = useLogin();

    const handleLogin = async () => {
        if (!email || !password) return;

        if (!email.includes("@")) {
            alert("Enter a valid email");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        const success = await login(email, password);

        if (success) {
            router.replace("/(tabs)/home");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.contentContainer}>
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Ionicons name="terminal" size={56} color="#2563EB" style={styles.logoIcon} />
                    <Text style={styles.collegeText}>College of Computing Studies</Text>
                    <Text style={styles.systemText}>Event Management</Text>
                    <Text style={styles.subtitle}>Welcome back! Please sign in to continue.</Text>
                </View>

                {/* Input Section */}
                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} color="#6B7280" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color="#6B7280" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Error Message */}
                    {error && (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle" size={16} color="#EF4444" />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    {/* Optional Forgot Password Link */}
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.loginButtonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoIcon: {
        marginBottom: 16,
    },
    collegeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4B5563',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    systemText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginTop: 4,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        marginTop: 12,
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        height: 56,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        height: '100%',
    },
    eyeIcon: {
        padding: 4,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        color: '#EF4444',
        marginLeft: 8,
        fontSize: 14,
        flexShrink: 1,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#2563EB',
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: '#2563EB', // Tech-oriented primary blue
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonDisabled: {
        backgroundColor: '#93C5FD',
        shadowOpacity: 0,
        elevation: 0,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    }
});