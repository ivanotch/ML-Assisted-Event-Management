// app/_layout.tsx
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
    const user = {
        name: "John Doe",
        profilePic: "https://i.pravatar.cc/150?img=3",
    };
    return (
        <Stack
            screenOptions={{
            }}
        >
            <Stack.Screen name="(tabs)" options={{
                headerShown: false
            }}></Stack.Screen>

            <Stack.Screen name='notifications' options={{
                headerTitleAlign: 'center'
            }} />

            <Stack.Screen name='search' options={{
                headerTitleAlign: "center",
            }} />

            <Stack.Screen name='leaderboard' options={{
                headerShown: false
            }} />

            <Stack.Screen name="event" options={{ headerShown: false }} />
            <Stack.Screen name="chat" options={{ headerShown: false }} />


        </Stack>
    );
}
