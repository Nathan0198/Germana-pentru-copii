import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import AudioService from './src/services/AudioService';
import ModularAudioService from './src/services/ModularAudioService';
import ProgressService from './src/services/ProgressService';
import LanguageService from './src/services/LanguageService';
import { initializeModularAppData } from './src/data/ModularAppData';

export default function App() {
  useEffect(() => {
    // Initialize services when app starts
    const initializeApp = async () => {
      try {
        console.log('Initializing MiniDeutsch app...');
        
        // Initialize core services
        await LanguageService.initialize();
        await AudioService.initialize();
        await ModularAudioService.initialize();
        
        // Initialize the new modular story system
        await initializeModularAppData();
        
        // Update streak on app start
        await ProgressService.updateStreak();
        
        console.log('MiniDeutsch app with modular story system initialized successfully!');
      } catch (error) {
        console.error('Error initializing app:', error);
        // Fallback to basic initialization if modular system fails
        console.log('Falling back to basic app functionality...');
      }
    };

    initializeApp();

    // Cleanup when app unmounts
    return () => {
      AudioService.cleanup();
      ModularAudioService.cleanup();
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
