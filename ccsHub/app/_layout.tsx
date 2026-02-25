// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
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
            }}/>

            <Stack.Screen name='search' options={{
                headerTitleAlign: "center",
            }}/>

            <Stack.Screen name='leaderboard' options={{
                headerTitleAlign: "center",
            }}/>
        </Stack>
    );
}
