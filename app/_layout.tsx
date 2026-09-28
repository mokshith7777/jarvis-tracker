import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TrackerProvider } from '../store/TrackerContext';

export default function RootLayout() {
  return (
    <TrackerProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#050807' } }} />
    </TrackerProvider>
  );
}
