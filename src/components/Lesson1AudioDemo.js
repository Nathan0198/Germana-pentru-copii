import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AudioService from '../services/AudioService';

export default function Lesson1AudioDemo() {
  const [audioService] = useState(new AudioService());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState('');

  useEffect(() => {
    const initAudio = async () => {
      try {
        await audioService.initialize();
        console.log('🎵 Audio service initialized for Lesson 1 demo');
      } catch (error) {
        console.error('Failed to initialize audio service:', error);
        Alert.alert('Eroare audio', 'Nu am putut inițializa serviciul audio');
      }
    };

    initAudio();

    return () => {
      audioService.cleanup();
    };
  }, []);

  const playAudio = async (audioFunction, description) => {
    if (isPlaying) {
      Alert.alert('Audio în redare', 'Așteaptă să se termine audio-ul curent');
      return;
    }

    try {
      setIsPlaying(true);
      setCurrentAudio(description);
      await audioFunction();
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Eroare audio', `Nu am putut reda: ${description}`);
    } finally {
      setIsPlaying(false);
      setCurrentAudio('');
    }
  };

  const AudioButton = ({ title, onPress, color = '#4CAF50' }) => (
    <TouchableOpacity
      style={[styles.audioButton, { backgroundColor: color }]}
      onPress={onPress}
      disabled={isPlaying}
    >
      <Text style={styles.audioButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#E3F2FD', '#BBDEFB']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>🎵 Lesson 1 Audio Demo</Text>
        
        {isPlaying && (
          <View style={styles.playingIndicator}>
            <Text style={styles.playingText}>🔊 Redă: {currentAudio}</Text>
          </View>
        )}

        {/* Björn's Story */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🐻 Björn - Povestea</Text>
          
          <AudioButton
            title="Poveste partea 1 (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Story(1, 'de'), 'Poveste partea 1 (DE)')}
            color="#8D6E63"
          />
          
          <AudioButton
            title="Poveste partea 1 (RO)"
            onPress={() => playAudio(() => audioService.playLesson1Story(1, 'ro'), 'Poveste partea 1 (RO)')}
            color="#A1887F"
          />
          
          <AudioButton
            title="Poveste partea 1 (Bilingv)"
            onPress={() => playAudio(() => audioService.playLesson1StoryBilingual(1), 'Poveste partea 1 (Bilingv)')}
            color="#6D4C41"
          />

          <AudioButton
            title="Poveste completă (DE)"
            onPress={() => playAudio(() => audioService.playCompleteLesson1Story('de'), 'Poveste completă (DE)')}
            color="#5D4037"
          />

          <AudioButton
            title="Poveste completă (Bilingv)"
            onPress={() => playAudio(() => audioService.playCompleteLesson1StoryBilingual(), 'Poveste completă (Bilingv)')}
            color="#4E342E"
          />
        </View>

        {/* Emma's Vocabulary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🦆 Emma - Vocabular</Text>
          
          <AudioButton
            title="'Hallo' (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Vocabulary('hallo', 'de'), 'Hallo (DE)')}
            color="#FF7043"
          />
          
          <AudioButton
            title="'Hallo' (RO)"
            onPress={() => playAudio(() => audioService.playLesson1Vocabulary('hallo', 'ro'), 'Hallo (RO)')}
            color="#FF8A65"
          />
          
          <AudioButton
            title="'Hallo' (Bilingv)"
            onPress={() => playAudio(() => audioService.playLesson1VocabularyBilingual('hallo'), 'Hallo (Bilingv)')}
            color="#FF5722"
          />

          <AudioButton
            title="'Ich bin' (Bilingv)"
            onPress={() => playAudio(() => audioService.playLesson1VocabularyBilingual('ich_bin'), 'Ich bin (Bilingv)')}
            color="#F4511E"
          />

          <AudioButton
            title="'Danke' (Bilingv)"
            onPress={() => playAudio(() => audioService.playLesson1VocabularyBilingual('danke'), 'Danke (Bilingv)')}
            color="#E65100"
          />

          <AudioButton
            title="Tot vocabularul (DE)"
            onPress={() => playAudio(() => audioService.playAllLesson1Vocabulary('de'), 'Tot vocabularul (DE)')}
            color="#BF360C"
          />
        </View>

        {/* Emma's Speaking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🦆 Emma - Exerciții vorbire</Text>
          
          <AudioButton
            title="Instrucțiuni vorbire (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Speaking('instruction', 'de'), 'Instrucțiuni vorbire (DE)')}
            color="#7B1FA2"
          />
          
          <AudioButton
            title="Pronunție 'Hallo' (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Speaking('hallo', 'de'), 'Pronunție Hallo (DE)')}
            color="#8E24AA"
          />
          
          <AudioButton
            title="Feedback vorbire (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Speaking('feedback', 'de'), 'Feedback vorbire (DE)')}
            color="#9C27B0"
          />
        </View>

        {/* Emma's Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🦆 Emma - Feedback</Text>
          
          <AudioButton
            title="Excelent! (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Feedback('excellent', 'de'), 'Excelent! (DE)')}
            color="#388E3C"
          />
          
          <AudioButton
            title="Foarte bine! (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Feedback('well_done', 'de'), 'Foarte bine! (DE)')}
            color="#43A047"
          />
          
          <AudioButton
            title="Încearcă din nou (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Feedback('try_again', 'de'), 'Încearcă din nou (DE)')}
            color="#66BB6A"
          />
        </View>

        {/* Max's Games */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🐰 Max - Jocuri</Text>
          
          <AudioButton
            title="Instrucțiuni Joc 1 (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Game(1, 'instruction', 'de'), 'Instrucțiuni Joc 1 (DE)')}
            color="#1976D2"
          />
          
          <AudioButton
            title="Întrebarea 1 Joc 3 (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Game(3, 'question_1', 'de'), 'Întrebarea 1 Joc 3 (DE)')}
            color="#1E88E5"
          />
          
          <AudioButton
            title="Întrebarea 2 Joc 3 (DE)"
            onPress={() => playAudio(() => audioService.playLesson1Game(3, 'question_2', 'de'), 'Întrebarea 2 Joc 3 (DE)')}
            color="#42A5F5"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1565C0',
  },
  playingIndicator: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  playingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  audioButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  audioButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
