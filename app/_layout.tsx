import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ErrorBoundaryProps } from 'expo-router';
import { TrackerProvider } from '../store/TrackerContext';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={styles.errorScreen}>
      <StatusBar style="light" />
      <Text style={styles.errorTitle}>JARVIS TRACKER</Text>
      <Text style={styles.errorSubtitle}>Startup error</Text>
      <Text style={styles.errorMessage}>{error.message}</Text>
      <Pressable onPress={retry} style={styles.retry}>
        <Text style={styles.retryText}>RETRY</Text>
      </Pressable>
    </View>
  );
}

export default function RootLayout() {
  return (
    <TrackerProvider>
      <StatusBar style="light" />
      <Stack initialRouteName="dashboard" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#050807' } }} />
    </TrackerProvider>
  );
}

const styles = StyleSheet.create({
  errorScreen: { flex: 1, backgroundColor: '#050807', padding: 24, justifyContent: 'center' },
  errorTitle: { color: '#00E5A0', fontSize: 24, fontWeight: '900', letterSpacing: 2 },
  errorSubtitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: 8 },
  errorMessage: { color: '#A9B5B0', marginTop: 16, lineHeight: 21 },
  retry: { marginTop: 22, backgroundColor: '#00E5A0', borderRadius: 14, padding: 16, alignItems: 'center' },
  retryText: { color: '#00150d', fontWeight: '900' },
});
