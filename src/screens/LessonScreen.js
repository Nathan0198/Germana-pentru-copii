import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AudioService from '../services/AudioService';

export default function LessonScreen({ route, navigation }) {
  const { zoneId, zoneName } = route.params;
  const [currentStep, setCurrentStep] = useState('story'); // story, game1, game2, game3, completion
  const [audioService] = useState(new AudioService());
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const initAudio = async () => {
      try {
        await audioService.initialize();
        console.log('🎵 Audio service initialized for lesson');
      } catch (error) {
        console.error('Failed to initialize audio service:', error);
      }
    };

    initAudio();

    return () => {
      audioService.cleanup();
    };
  }, []);

  const playAudio = async (audioFunction, description) => {
    if (isPlayingAudio) {
      Alert.alert('Audio în redare', 'Așteaptă să se termine audio-ul curent');
      return;
    }

    try {
      setIsPlayingAudio(true);
      console.log(`🔊 Playing: ${description}`);
      await audioFunction();
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Eroare audio', `Nu am putut reda: ${description}`);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  // Placeholder data - va fi înlocuit cu date reale
  const lessonData = {
    id: 1,
    title: 'Salutul lui Björn',
    zone: zoneName,
    story: {
      duration: '3-4 min',
      characters: ['björn', 'emma'],
      newWords: ['hallo', 'ich bin', 'mein name ist'],
      germanText: 'Hallo! Ich bin Björn der Bär.',
      romanianText: 'Salut! Sunt Björn ursul.',
    },
    games: [
      { type: 'drag_drop', title: 'Conectează saluturile' },
      { type: 'speaking_challenge', title: 'Repetă după Emma' },
      { type: 'quick_choice', title: 'Quiz final' }
    ]
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case 'story':
        setCurrentStep('game1');
        break;
      case 'game1':
        setCurrentStep('game2');
        break;
      case 'game2':
        setCurrentStep('game3');
        break;
      case 'game3':
        setCurrentStep('completion');
        break;
      case 'completion':
        navigation.goBack();
        break;
    }
  };

  const renderStoryStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>📖 Povestea lui Björn</Text>
      
      <View style={styles.charactersRow}>
        <View style={styles.character}>
          <Text style={styles.characterEmoji}>🐻</Text>
          <Text style={styles.characterName}>Björn</Text>
        </View>
        <View style={styles.character}>
          <Text style={styles.characterEmoji}>🦆</Text>
          <Text style={styles.characterName}>Emma</Text>
        </View>
      </View>

      <View style={styles.storyContainer}>
        <Text style={styles.storyTitle}>Cuvintele noi de astăzi:</Text>
        <View style={styles.newWords}>
          {lessonData.story.newWords.map((word, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.wordChip}
              onPress={() => playAudio(
                () => audioService.playLesson1VocabularyBilingual(word.replace(' ', '_')), 
                `Vocabular: ${word}`
              )}
            >
              <Text style={styles.wordText}>{word}</Text>
              <Text style={styles.playIcon}>🔊</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textLabel}>🇩🇪 Germană:</Text>
          <TouchableOpacity 
            style={styles.textButton}
            onPress={() => playAudio(
              () => audioService.playCompleteLesson1Story('de'), 
              'Poveste completă în germană'
            )}
          >
            <Text style={styles.textContent}>{lessonData.story.germanText}</Text>
            <Text style={styles.playIcon}>🔊</Text>
          </TouchableOpacity>

          <Text style={styles.textLabel}>🇷🇴 Română:</Text>
          <TouchableOpacity 
            style={styles.textButton}
            onPress={() => playAudio(
              () => audioService.playCompleteLesson1Story('ro'), 
              'Poveste completă în română'
            )}
          >
            <Text style={styles.textContent}>{lessonData.story.romanianText}</Text>
            <Text style={styles.playIcon}>🔊</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.textButton, styles.bilingualButton]}
            onPress={() => playAudio(
              () => audioService.playCompleteLesson1StoryBilingual(), 
              'Poveste completă bilingv'
            )}
          >
            <Text style={styles.textContent}>🌍 Ascultă în ambele limbi</Text>
            <Text style={styles.playIcon}>🔊</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderGameStep = (gameIndex) => {
    const game = lessonData.games[gameIndex];
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>🎮 {game.title}</Text>
        
        <View style={styles.gameContainer}>
          <Text style={styles.gameType}>Tip: {game.type}</Text>
          <View style={styles.gamePlaceholder}>
            <Text style={styles.placeholderEmoji}>🎯</Text>
            <Text style={styles.placeholderText}>
              Aici va fi implementat jocul de tip "{game.type}"
            </Text>
            <Text style={styles.placeholderSubtext}>
              Framework-ul pentru jocuri este pregătit!
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCompletionStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🌟 Felicitări!</Text>
      
      <View style={styles.completionContainer}>
        <Text style={styles.completionEmoji}>🏆</Text>
        <Text style={styles.completionText}>
          Ai terminat cu succes lecția "{lessonData.title}"!
        </Text>
        
        <View style={styles.rewardsContainer}>
          <View style={styles.reward}>
            <Text style={styles.rewardIcon}>⭐</Text>
            <Text style={styles.rewardText}>+3 Stele</Text>
          </View>
          <View style={styles.reward}>
            <Text style={styles.rewardIcon}>🎯</Text>
            <Text style={styles.rewardText}>+30 Puncte</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'story':
        return renderStoryStep();
      case 'game1':
        return renderGameStep(0);
      case 'game2':
        return renderGameStep(1);
      case 'game3':
        return renderGameStep(2);
      case 'completion':
        return renderCompletionStep();
      default:
        return renderStoryStep();
    }
  };

  const getStepProgress = () => {
    const steps = ['story', 'game1', 'game2', 'game3', 'completion'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 'story':
        return 'Începe Jocurile 🎮';
      case 'game1':
      case 'game2':
        return 'Următorul Joc ➡️';
      case 'game3':
        return 'Finalizează Lecția 🏁';
      case 'completion':
        return 'Înapoi la Hartă 🗺️';
      default:
        return 'Continuă';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Înapoi</Text>
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{lessonData.title}</Text>
            <Text style={styles.headerSubtitle}>{lessonData.zone}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${getStepProgress()}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(getStepProgress())}% complet
          </Text>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content} 
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          bounces={true}
        >
          {renderCurrentStep()}
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNextStep}
          >
            <Text style={styles.nextButtonText}>{getButtonText()}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFE4E6',
    marginTop: 2,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  charactersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  character: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  characterEmoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  characterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  storyContainer: {
    marginTop: 10,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  newWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  wordChip: {
    backgroundColor: '#3498DB',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 5,
  },
  textContainer: {
    marginTop: 10,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 15,
    marginBottom: 8,
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  textContent: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  playIcon: {
    fontSize: 20,
  },
  bilingualButton: {
    backgroundColor: '#9B59B6',
    marginTop: 10,
  },
  gameContainer: {
    alignItems: 'center',
  },
  gameType: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  gamePlaceholder: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3498DB',
    borderStyle: 'dashed',
  },
  placeholderEmoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  placeholderText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  completionContainer: {
    alignItems: 'center',
  },
  completionEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  completionText: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  reward: {
    alignItems: 'center',
    backgroundColor: '#F39C12',
    borderRadius: 15,
    padding: 20,
    flex: 0.4,
  },
  rewardIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  nextButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
