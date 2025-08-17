import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LevelButton, RewardDisplay } from '../components';
import { getLessonById, getCharacterById } from '../data/AppData';
import ImageService from '../services/ImageService';
import { 
  DragDropGame, 
  MemoryGame, 
  SpeakingChallenge, 
  QuickChoice, 
  WordBuilder, 
  StorySequence,
  TouchAndListenGame,
  DragMatchVoicesGame,
  SimonSaysGame,
  FamilyTreeBuilderGame,
  VoiceMatchingPairsGame,
  CharacterEmotionReaderGame,
  HouseTourAdventureGame,
  RoomSoundMatchGame,
  DragObjectsHomeGame
} from '../games/GameTypes';
import AudioService from '../services/AudioService';

export default function DetailedLessonScreen({ route, navigation }) {
  const { lessonId } = route.params;
  const [lesson, setLesson] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isPlayingStory, setIsPlayingStory] = useState(true);
  const [gameResults, setGameResults] = useState({});
  const [currentGameScore, setCurrentGameScore] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0); // Trigger for UI updates
  const [currentGameCompleted, setCurrentGameCompleted] = useState(false); // Direct game completion state
  // AudioService este deja o instanță singleton, nu trebuie recreat

  useEffect(() => {
    const lessonData = getLessonById(lessonId);
    setLesson(lessonData);
    
    // Initialize audio service
    AudioService.initialize();
  }, [lessonId]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Se încarcă lecția...</Text>
      </SafeAreaView>
    );
  }

  const handleStartLesson = () => {
    setIsPlayingStory(true);
    setCurrentStoryIndex(0);
  };

  const handleStoryNext = () => {
    if (currentStoryIndex < lesson.story.scenes.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // Povestea s-a terminat, trecem la jocuri
      setIsPlayingStory(false);
      setCurrentGameIndex(0);
    }
  };

  const playSceneAudio = async (scene) => {
    try {
      const character = getCharacterById(scene.character);
      
      console.log(`🎬 Playing scene audio for character: ${character.id}`);
      console.log(`German: "${scene.german}"`);
      console.log(`Romanian: "${scene.romanian}"`);
      
      // Ensure no overlapping audio by stopping any current playback
      await AudioService.stopAllSounds();
      
      // Special handling for Lesson 1 with numbered story files
      if (lessonId === 1) {
        // Find which scene this is in the story array
        const sceneIndex = lesson.story.scenes.findIndex(s => 
          s.character === scene.character && 
          s.german === scene.german && 
          s.romanian === scene.romanian
        );
        const storyPartNumber = sceneIndex + 1;
        
        console.log(`🎬 Found scene at index ${sceneIndex}, playing story part ${storyPartNumber}`);
        
        // Play German story part first (with correct character and audio file)
        console.log(`🇩🇪 Playing German story part ${storyPartNumber}...`);
        await AudioService.playLesson1Story(storyPartNumber, 'de');
        
        // Ensure German audio finished before starting Romanian
        console.log(`⏳ German finished, waiting before Romanian...`);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Then play Romanian story part (with correct character and audio file)
        console.log(`🇷🇴 Playing Romanian story part ${storyPartNumber}...`);
        await AudioService.playLesson1Story(storyPartNumber, 'ro');
        
        console.log(`✅ Completed bilingual scene playback`);
        return;
      }
      
      // Original logic for other lessons - ensuring sequential playback
      console.log(`🇩🇪 Playing German text by ${character.id}: "${scene.german}"`);
      switch (character.id) {
        case 'bjorn':
          await AudioService.playBjornVoice(scene.german, 'de');
          break;
        case 'emma':
          await AudioService.playEmmaVoice(scene.german, 'de');
          break;
        case 'max':
          await AudioService.playMaxVoice(scene.german, 'de');
          break;
        default:
          console.log('Unknown character:', character.id);
          // Fallback cu Emma dacă personajul nu e recunoscut
          await AudioService.playEmmaVoice(scene.german, 'de');
      }
      
      // Ensure German finished before starting Romanian
      console.log(`⏳ German finished, waiting before Romanian...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Then play Romanian translation
      console.log(`🇷🇴 Playing Romanian text by ${character.id}: "${scene.romanian}"`);
      switch (character.id) {
        case 'bjorn':
          await AudioService.playBjornVoice(scene.romanian, 'ro');
          break;
        case 'emma':
          await AudioService.playEmmaVoice(scene.romanian, 'ro');
          break;
        case 'max':
          await AudioService.playMaxVoice(scene.romanian, 'ro');
          break;
        default:
          // Fallback cu Emma dacă personajul nu e recunoscut
          await AudioService.playEmmaVoice(scene.romanian, 'ro');
      }
      
      console.log(`✅ Completed bilingual scene playback for ${character.id}`);
      
    } catch (error) {
      console.error('Error playing scene audio:', error);
    }
  };

  const handleGameComplete = (score = 0) => {
    // Salvăm rezultatul jocului
    const gameKey = `game_${currentGameIndex}`;
    const newGameResult = {
      score: score,
      completed: true,
      timestamp: new Date().getTime()
    };
    
    // Update game results immediately with callback to ensure state is set
    setGameResults(prev => {
      const updated = {
        ...prev,
        [gameKey]: newGameResult
      };
      console.log(`🎮 Game ${currentGameIndex + 1} completed with score: ${score}`);
      console.log(`📊 Updated gameResults:`, updated);
      console.log(`📊 Games completed: ${Object.keys(updated).length}/${lesson.games.length}`);
      return updated;
    });
    
    setCurrentGameScore(score);
    setCurrentGameCompleted(true); // Mark current game as completed
    
    // Enhanced completion message with score feedback
    let scoreMessage = '';
    let scoreEmoji = '';
    if (score >= 90) {
      scoreMessage = 'Performanță excepțională!';
      scoreEmoji = '🌟';
    } else if (score >= 75) {
      scoreMessage = 'Foarte bine lucrat!';
      scoreEmoji = '🎉';
    } else if (score >= 60) {
      scoreMessage = 'Bună treabă!';
      scoreEmoji = '👏';
    } else {
      scoreMessage = 'Continuă să exersezi!';
      scoreEmoji = '💪';
    }

    const currentGameName = lesson.games[currentGameIndex]?.name || `Jocul ${currentGameIndex + 1}`;
    const completedGames = Object.keys(gameResults).length + 1; // Include current game
    const totalGames = lesson.games.length;
    
    // Show completion message briefly, then automatically show next game button
    console.log(`✅ ${scoreEmoji} Joc Completat! ${scoreMessage}`);
    console.log(`🎮 ${currentGameName} - Scor: ${score}/100 puncte`);
    console.log(`📈 Progres: ${completedGames}/${totalGames} jocuri completate`);
    
    // Force UI update to show next game button immediately
    setForceUpdate(prev => prev + 1);
    console.log('✅ Game marked as completed, next game button should now be visible');
    console.log(`📊 Current game results state:`, gameResults);
  };

  const renderStoryScene = () => {
    const scene = lesson.story.scenes[currentStoryIndex];

    return (
      <View style={styles.storyContainer}>
        {/* Story Image - Mărită pentru mai mult impact vizual */}
        {scene.image && ImageService.hasImage(scene.image) && (
          <View style={styles.storyImageContainer}>
            <Image 
              source={ImageService.getStoryImage(lessonId, scene.image)}
              style={styles.storyImageLarge}
              resizeMode="contain"
            />
          </View>
        )}
        
        <View style={styles.dialogueContainer}>
          <View style={styles.germanBox}>
            <Text style={styles.germanText}>{scene.german}</Text>
            <TouchableOpacity 
              style={styles.audioButton}
              onPress={() => playSceneAudio(scene)}
            >
              <Text style={styles.audioButtonText}>🔊 Ascultă</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.romanianBox}>
            <Text style={styles.romanianText}>{scene.romanian}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.nextButton, currentStoryIndex >= lesson.story.scenes.length - 1 && styles.gameStartButton]}
          onPress={handleStoryNext}
        >
          <Text style={[styles.nextButtonText, currentStoryIndex >= lesson.story.scenes.length - 1 && styles.gameStartText]}>
            {currentStoryIndex < lesson.story.scenes.length - 1 ? 'Următorul →' : 'Hai să ne jucăm! 🎮'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.progressText}>
          {currentStoryIndex + 1} / {lesson.story.scenes.length}
        </Text>
      </View>
    );
  };

  const renderGame = () => {
    const game = lesson.games[currentGameIndex];
    const instructor = getCharacterById(game.instructor);

    const renderGameComponent = () => {
      console.log(`🎮 Rendering game component for game type: ${game.type}`, game);
      
      const gameProps = {
        gameData: game,
        onComplete: handleGameComplete,
        style: styles.gameComponent
      };

      switch (game.type) {
        case 'drag_drop':
          return <DragDropGame {...gameProps} />;
        case 'memory_game':
          return <MemoryGame {...gameProps} />;
        case 'speaking_challenge':
          return <SpeakingChallenge {...gameProps} />;
        case 'quick_choice':
          return <QuickChoice {...gameProps} />;
        case 'word_builder':
          return <WordBuilder {...gameProps} />;
        case 'story_sequence':
          return <StorySequence {...gameProps} />;
        case 'touch_and_listen':
          return <TouchAndListenGame {...gameProps} />;
        case 'drag_match_voices':
          return <DragMatchVoicesGame {...gameProps} />;
        case 'simon_says':
          return <SimonSaysGame {...gameProps} />;
        case 'family_tree_builder':
          return <FamilyTreeBuilderGame {...gameProps} />;
        case 'voice_matching_pairs':
          return <VoiceMatchingPairsGame {...gameProps} />;
        case 'character_emotion_reader':
          return <CharacterEmotionReaderGame {...gameProps} />;
        case 'house_tour_adventure':
          return <HouseTourAdventureGame {...gameProps} />;
        case 'room_sound_match':
          return <RoomSoundMatchGame {...gameProps} />;
        case 'drag_objects_home':
          return <DragObjectsHomeGame {...gameProps} />;
        default:
          return (
            <View style={styles.gamePlaceholder}>
              <Text style={styles.placeholderText}>
                ⚠️ Tip de joc necunoscut: {game.type}
              </Text>
            </View>
          );
      }
    };

    return (
      <View style={styles.gameContainer}>
        <View style={styles.gameContent}>
          {renderGameComponent()}
        </View>

        <Text style={styles.progressText}>
          Jocul {currentGameIndex + 1} / {lesson.games.length}
        </Text>
        
        {/* Game Completion Summary - visible after game completion */}
        {currentGameCompleted && (
          <View style={styles.gameCompletionContainer}>
            <View style={styles.scoreDisplay}>
              <Text style={styles.scoreDisplayTitle}>Joc Completat!</Text>
              <Text style={styles.scoreDisplayScore}>{currentGameScore}/100</Text>
              <Text style={styles.scoreDisplaySubtext}>
                {currentGameScore >= 90 ? 'Excelent! 🌟' : 
                 currentGameScore >= 75 ? 'Foarte bine! 🎉' : 
                 currentGameScore >= 60 ? 'Bună treabă! 👏' : 'Mai exersează! 💪'}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.nextGameButton}
              onPress={() => {
                if (currentGameIndex < lesson.games.length - 1) {
                  setCurrentGameIndex(currentGameIndex + 1);
                  setCurrentGameCompleted(false); // Reset for next game
                } else {
                  // All games completed - show final completion
                  const allResults = {...gameResults, [`game_${currentGameIndex}`]: {score: currentGameScore, completed: true}};
                  const totalScore = Object.values(allResults).reduce((sum, result) => sum + result.score, 0);
                  const averageScore = totalScore / lesson.games.length;
                  
                  let message = 'Ai completat lecția cu succes!';
                  let emoji = '🎉';
                  if (averageScore >= 80) {
                    message = 'Excelent! Ai obținut un scor fantastic!';
                    emoji = '🌟';
                  } else if (averageScore >= 60) {
                    message = 'Foarte bine! Continuă tot așa!';
                    emoji = '👏';
                  } else {
                    message = 'Bun început! Poți să mai exersezi!';
                    emoji = '💪';
                  }
                  
                  // Log completion and automatically navigate to next lesson
                  console.log(`🎉 Felicitări! ${emoji} - ${message}`);
                  console.log(`📊 Scor total: ${Math.round(totalScore)}/100`);
                  console.log(`📈 Scor mediu: ${Math.round(averageScore)}/100`);
                  console.log(`🎮 Jocuri completate: ${lesson.games.length}/${lesson.games.length}`);
                  
                  // Automatically navigate to next lesson after a short delay
                  setTimeout(() => {
                    const nextLessonId = lessonId + 1;
                    if (nextLessonId <= 25) {
                      console.log(`🚀 Auto-navigating to Lesson ${nextLessonId}`);
                      navigation.replace('DetailedLesson', { 
                        lessonId: nextLessonId,
                        zoneId: route.params.zoneId 
                      });
                    } else {
                      console.log('🏆 All lessons completed! Returning to main screen.');
                      navigation.goBack();
                    }
                  }, 2000);
                }
              }}
            >
              <Text style={styles.nextGameButtonText}>
                {currentGameIndex < lesson.games.length - 1 ? 'Următorul Joc 🎮' : 'Finalizează Lecția 🎉'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const playVocabularyAudio = async (word) => {
    try {
      console.log(`📚 Playing vocabulary word: ${word.german} / ${word.romanian}`);
      
      // Ensure no overlapping audio by stopping any current playback
      await AudioService.stopAllSounds();
      
      // Special handling for Lesson 1 vocabulary
      if (lessonId === 1) {
        // Convert German word to filename format (replace spaces with underscores)
        const wordKey = word.german.toLowerCase().replace(/\s+/g, '_');
        
        console.log(`🇩🇪 Playing German first: ${wordKey}`);
        await AudioService.playLesson1Vocabulary(wordKey, 'de');
        
        // Ensure first audio finished before starting Romanian
        console.log(`⏳ Waiting before Romanian...`);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log(`🇷🇴 Playing Romanian second: ${wordKey}`);
        await AudioService.playLesson1Vocabulary(wordKey, 'ro');
        
        console.log(`✅ Completed bilingual playback for: ${wordKey}`);
        return;
      }
      
      // Original logic for other lessons with better sequencing
      console.log(`🇩🇪 Playing German first: ${word.german}`);
      await AudioService.playEmmaVoice(word.german, 'de');
      
      // Ensure first audio finished before starting Romanian
      console.log(`⏳ Waiting before Romanian...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`🇷🇴 Playing Romanian second: ${word.romanian}`);
      await AudioService.playEmmaVoice(word.romanian, 'ro');
      
      console.log(`✅ Completed bilingual playback for: ${word.german} / ${word.romanian}`);
      
    } catch (error) {
      console.error('Error playing vocabulary audio:', error);
    }
  };

  const renderVocabulary = () => {
    return (
      <View style={styles.vocabularyContainer}>
        <Text style={styles.vocabularyTitle}>📚 Cuvinte noi ({lesson.vocabulary.length})</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          bounces={true}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          {lesson.vocabulary.map((word, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.wordCard}
              onPress={() => playVocabularyAudio(word)}
            >
              <Text style={styles.germanWord}>{word.german}</Text>
              <Text style={styles.romanianWord}>{word.romanian}</Text>
              <Text style={styles.wordCategory}>{word.category}</Text>
              <View style={styles.wordAudioHint}>
                <Text style={styles.audioHintText}>🔊 Apasă pentru a asculta</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#FFE66D']}
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
          
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
            <Text style={styles.lessonDuration}>⏱️ {lesson.duration} minute</Text>
          </View>
        </View>

        {/* Vocabulary Preview */}
        {renderVocabulary()}

        {/* Main Content */}
        <ScrollView 
          style={styles.content} 
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          bounces={true}
          keyboardShouldPersistTaps="handled"
        >
          {isPlayingStory ? renderStoryScene() : renderGame()}
        </ScrollView>

        {/* Rewards Preview */}
        <View style={styles.rewardsPreview}>
          <Text style={styles.rewardsText}>
            🎯 Recompense: {lesson.rewards.stars} stele • {lesson.rewards.points} puncte
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  lessonSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 3,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#95A5A6',
  },
  vocabularyContainer: {
    padding: 15,
  },
  vocabularyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  wordCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  germanWord: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 3,
  },
  romanianWord: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 3,
  },
  wordCategory: {
    fontSize: 10,
    color: '#95A5A6',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  storyContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dialogueContainer: {
    width: '100%',
    marginTop: 10,
  },
  germanBox: {
    backgroundColor: 'rgba(232, 245, 232, 0.9)',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  germanText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 22,
  },
  audioButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'center',
  },
  audioButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  romanianBox: {
    backgroundColor: 'rgba(240, 248, 255, 0.9)',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  romanianText: {
    fontSize: 15,
    color: '#34495E',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gameStartButton: {
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#FFE66D',
  },
  gameStartText: {
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  nextGameButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#FFE66D',
  },
  nextGameButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  gameContent: {
    marginBottom: 20,
  },
  gameComponent: {
    minHeight: 300,
  },
  gamePlaceholder: {
    backgroundColor: '#F8F9FA',
    padding: 40,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '600',
    marginBottom: 5,
  },
  placeholderSubtext: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  gameCompleteButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  gameCompleteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressText: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'center',
  },
  rewardsPreview: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rewardsText: {
    fontSize: 14,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // ================================
  // IMAGE STYLES
  // ================================
  storyImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  storyImage: {
    width: 200,
    height: 150,
    borderRadius: 15,
  },
  storyImageLarge: {
    width: 300,
    height: 220,
    borderRadius: 20,
  },
  
  // ================================
  // GAME COMPLETION STYLES
  // ================================
  gameCompletionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  scoreDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreDisplayTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  scoreDisplayScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 5,
  },
  scoreDisplaySubtext: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
  },
});
