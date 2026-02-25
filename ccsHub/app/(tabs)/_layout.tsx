import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function _Layout() {
    const activeColor = "#2563eb"; // blue theme
    const inactiveColor = "gray";
    const router = useRouter()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    left: 16,
                    right: 16,
                    height: 72,
                    elevation: 0,
                    backgroundColor: 'white',
                    borderRadius: 16,
                    paddingTop: 8
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),

                    headerRight: () => {
                        

                        return (
                            <TouchableOpacity
                                onPress={() => router.push('/notifications')}
                                style={{ marginRight: 15 }}
                            >
                                <Ionicons name="notifications-outline" size={26} />
                            </TouchableOpacity>
                        )
                    },

                    // headerLeft: () => (
                    //     <TouchableOpacity onPress={() => router.back()}>
                    //         <Ionicons name="arrow-back" size={24} />
                    //     </TouchableOpacity>
                    // )
                }}
            />

            <Tabs.Screen
                name="message"
                options={{
                    tabBarLabel: 'Message',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="message" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="saved"
                options={{
                    tabBarLabel: 'Saved',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmark-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
