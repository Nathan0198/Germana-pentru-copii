import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AudioService from '../services/AudioService';

/**
 * Componenta simplă pentru testarea audio TTS
 */
export default function AudioTestScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const testTTS = async (text, language, character) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      switch (character) {
        case 'björn':
          await AudioService.playBjornVoice(text, language);
          break;
        case 'emma':
          await AudioService.playEmmaVoice(text, language);
          break;
        case 'max':
          await AudioService.playMaxVoice(text, language);
          break;
      }
    } catch (error) {
      console.error('Error playing TTS:', error);
    } finally {
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Test Audio TTS</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🐻 Björn (Germană)</Text>
        <TouchableOpacity
          style={[styles.button, styles.bjornButton]}
          onPress={() => testTTS('Hallo, ich bin Björn der Bär!', 'de', 'björn')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Test Björn DE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.bjornButton]}
          onPress={() => testTTS('Salut, sunt Björn Ursul!', 'ro', 'björn')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Test Björn RO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🦆 Emma (Germană)</Text>
        <TouchableOpacity
          style={[styles.button, styles.emmaButton]}
          onPress={() => testTTS('Hi, ich bin Emma die Ente!', 'de', 'emma')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Test Emma DE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.emmaButton]}
          onPress={() => testTTS('Bună, sunt Emma Rața!', 'ro', 'emma')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Test Emma RO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🐰 Max (Germană)</Text>
        <TouchableOpacity
          style={[styles.button, styles.maxButton]}
          onPress={() => testTTS('Hey, ich bin Max der Hase!', 'de', 'max')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Test Max DE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.maxButton]}
          onPress={() => testTTS('Hei, sunt Max Iepurașul!', 'ro', 'max')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Test Max RO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Vocabular Familie</Text>
        <TouchableOpacity
          style={[styles.button, styles.vocabButton]}
          onPress={() => testTTS('Familie', 'de', 'emma')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Familie (DE)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.vocabButton]}
          onPress={() => testTTS('Mutter', 'de', 'emma')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Mutter (DE)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.vocabButton]}
          onPress={() => testTTS('Vater', 'de', 'emma')}
          disabled={isPlaying}
        >
          <Text style={styles.buttonText}>Vater (DE)</Text>
        </TouchableOpacity>
      </View>

      {isPlaying && (
        <View style={styles.playingIndicator}>
          <Text style={styles.playingText}>🔊 Se redă audio...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  bjornButton: {
    backgroundColor: '#8B4513',
  },
  emmaButton: {
    backgroundColor: '#4CAF50',
  },
  maxButton: {
    backgroundColor: '#FF9800',
  },
  vocabButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playingIndicator: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  playingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
