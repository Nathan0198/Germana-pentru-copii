import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import AudioService from './src/services/AudioService';
import ProgressService from './src/services/ProgressService';
import LanguageService from './src/services/LanguageService';

export default function App() {
  useEffect(() => {
    // Initialize services when app starts
    const initializeApp = async () => {
      try {
        await LanguageService.initialize();
        await AudioService.initialize();
        
        // Update streak on app start
        await ProgressService.updateStreak();
        
        console.log('MiniDeutsch app initialized successfully');
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();

    // Cleanup when app unmounts
    return () => {
      AudioService.cleanup();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Status bar background view for Android edge-to-edge */}
        {Platform.OS === 'android' && (
          <View style={styles.statusBarBackground} />
        )}
        <StatusBar style="light" />
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  statusBarBackground: {
    height: Platform.OS === 'android' ? 24 : 0, // Standard Android status bar height
    backgroundColor: '#4A90E2',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
