/**
 * Modular Game Engine for MiniDeutsch
 * Handles all game types with support for the new modular story system
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Image,
  Animated
} from 'react-native';
import AudioService from '../services/AudioService';
import { markGameCompleted } from '../data/ModularAppData';

const { width, height } = Dimensions.get('window');

/**
 * Main Game Engine Component
 * Routes to appropriate game type based on game configuration
 */
export const ModularGameEngine = ({ 
  gameConfig, 
  storyId, 
  lessonId, 
  onComplete, 
  onBack 
}) => {
  const [gameState, setGameState] = useState({
    score: 0,
    attempts: 0,
    completed: false,
    startTime: Date.now()
  });

  // Route to appropriate game component
  const renderGame = () => {
    switch (gameConfig.type) {
      case 'drag_drop':
        return (
          <DragDropGameModular
            gameConfig={gameConfig}
            storyId={storyId}
            lessonId={lessonId}
            gameState={gameState}
            onStateChange={setGameState}
            onComplete={handleGameComplete}
          />
        );
      case 'memory':
        return (
          <MemoryGameModular
            gameConfig={gameConfig}
            storyId={storyId}
            lessonId={lessonId}
            gameState={gameState}
            onStateChange={setGameState}
            onComplete={handleGameComplete}
          />
        );
      case 'quick_choice':
        return (
          <QuickChoiceGameModular
            gameConfig={gameConfig}
            storyId={storyId}
            lessonId={lessonId}
            gameState={gameState}
            onStateChange={setGameState}
            onComplete={handleGameComplete}
          />
        );
      case 'speaking_challenge':
        return (
          <SpeakingChallengeModular
            gameConfig={gameConfig}
            storyId={storyId}
            lessonId={lessonId}
            gameState={gameState}
            onStateChange={setGameState}
            onComplete={handleGameComplete}
          />
        );
      case 'story_sequence':
        return (
          <StorySequenceModular
            gameConfig={gameConfig}
            storyId={storyId}
            lessonId={lessonId}
            gameState={gameState}
            onStateChange={setGameState}
            onComplete={handleGameComplete}
          />
        );
      default:
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Tip de joc necunoscut: {gameConfig.type}
            </Text>
          </View>
        );
    }
  };

  const handleGameComplete = async (finalScore) => {
    const endTime = Date.now();
    const duration = endTime - gameState.startTime;

    try {
      // Mark game as completed in user progress
      await markGameCompleted(storyId, lessonId, gameConfig.id, finalScore);
      
      // Call parent completion handler
      if (onComplete) {
        onComplete({
          gameId: gameConfig.id,
          score: finalScore,
          attempts: gameState.attempts,
          duration,
          completed: true
        });
      }
    } catch (error) {
      console.error('Error marking game as completed:', error);
    }
  };

  return (
    <View style={styles.gameContainer}>
      {/* Game Header */}
      <View style={styles.gameHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>← Înapoi</Text>
        </TouchableOpacity>
        
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>{gameConfig.title}</Text>
          {gameConfig.instructions && (
            <Text style={styles.gameInstructions}>
              {gameConfig.instructions}
            </Text>
          )}
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Punctaj: {gameState.score}
          </Text>
          {gameState.attempts > 0 && (
            <Text style={styles.attemptsText}>
              Încercări: {gameState.attempts}
            </Text>
          )}
        </View>
      </View>

      {/* Game Content */}
      <View style={styles.gameContent}>
        {renderGame()}
      </View>
    </View>
  );
};

/**
 * Drag & Drop Game Component (Modular)
 */
const DragDropGameModular = ({ 
  gameConfig, 
  storyId, 
  lessonId, 
  gameState, 
  onStateChange, 
  onComplete 
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [draggedItems, setDraggedItems] = useState([]);

  const items = gameConfig.items || [];

  const handleItemSelect = (item, index) => {
    if (matches.includes(index)) return; // Already matched

    // Play audio for the item
    if (item.audio) {
      AudioService.playAudio(item.audio);
    }

    if (selectedItem && selectedItem.index !== index) {
      // Try to match with previously selected item
      checkMatch(selectedItem, { ...item, index });
    } else {
      setSelectedItem({ ...item, index });
    }
  };

  const checkMatch = (item1, item2) => {
    const attempts = gameState.attempts + 1;
    let score = gameState.score;
    let newMatches = [...matches];

    // Check if items match (based on your matching logic)
    const isMatch = item1.german === item2.german || 
                   item1.target === item2.target ||
                   (item1.image && item2.image && item1.image === item2.image);

    if (isMatch) {
      score += 10;
      newMatches.push(item1.index, item2.index);
      setMatches(newMatches);
      
      // Play success sound
      AudioService.playSuccess();
    } else {
      // Play error sound
      AudioService.playError();
    }

    setSelectedItem(null);
    onStateChange({
      ...gameState,
      score,
      attempts,
      completed: newMatches.length === items.length
    });

    // Check if game is complete
    if (newMatches.length === items.length) {
      setTimeout(() => {
        onComplete(score);
      }, 1000);
    }
  };

  return (
    <ScrollView style={styles.dragDropContainer}>
      <View style={styles.itemsGrid}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dragDropItem,
              selectedItem?.index === index && styles.selectedItem,
              matches.includes(index) && styles.matchedItem
            ]}
            onPress={() => handleItemSelect(item, index)}
            disabled={matches.includes(index)}
          >
            {item.image && (
              <Image 
                source={{ uri: item.image }} 
                style={styles.itemImage}
                resizeMode="contain"
              />
            )}
            <Text style={styles.itemText}>{item.german}</Text>
            <Text style={styles.itemTranslation}>{item.romanian}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

/**
 * Memory Game Component (Modular)
 */
const MemoryGameModular = ({ 
  gameConfig, 
  storyId, 
  lessonId, 
  gameState, 
  onStateChange, 
  onComplete 
}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    // Initialize cards from pairs
    const pairs = gameConfig.pairs || [];
    const initialCards = [];
    
    pairs.forEach((pair, pairIndex) => {
      // Add German card
      initialCards.push({
        id: `${pairIndex}_german`,
        text: pair.german,
        type: 'german',
        pairIndex,
        audio: pair.audio
      });
      
      // Add Romanian card
      initialCards.push({
        id: `${pairIndex}_romanian`,
        text: pair.romanian,
        type: 'romanian',
        pairIndex,
        audio: pair.audio
      });
    });

    // Shuffle cards
    const shuffledCards = shuffleArray(initialCards);
    setCards(shuffledCards);
  }, [gameConfig.pairs]);

  const handleCardFlip = (cardIndex) => {
    if (flippedCards.length === 2) return; // Already have 2 flipped
    if (flippedCards.includes(cardIndex)) return; // Already flipped
    if (matchedPairs.some(pair => pair.includes(cardIndex))) return; // Already matched

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    // Play card audio
    const card = cards[cardIndex];
    if (card.audio) {
      AudioService.playAudio(card.audio);
    }

    // Check for match if 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setTimeout(() => {
        checkMemoryMatch(newFlippedCards);
      }, 1000);
    }
  };

  const checkMemoryMatch = (flippedIndices) => {
    const [index1, index2] = flippedIndices;
    const card1 = cards[index1];
    const card2 = cards[index2];

    const attempts = gameState.attempts + 1;
    let score = gameState.score;
    let newMatchedPairs = [...matchedPairs];

    if (card1.pairIndex === card2.pairIndex && card1.type !== card2.type) {
      // Match found
      score += 15;
      newMatchedPairs.push([index1, index2]);
      setMatchedPairs(newMatchedPairs);
      
      AudioService.playSuccess();
    } else {
      AudioService.playError();
    }

    setFlippedCards([]);
    onStateChange({
      ...gameState,
      score,
      attempts,
      completed: newMatchedPairs.length === (gameConfig.pairs?.length || 0)
    });

    // Check if game is complete
    if (newMatchedPairs.length === (gameConfig.pairs?.length || 0)) {
      setTimeout(() => {
        onComplete(score);
      }, 1000);
    }
  };

  return (
    <View style={styles.memoryContainer}>
      <View style={styles.cardsGrid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.memoryCard,
              flippedCards.includes(index) && styles.flippedCard,
              matchedPairs.some(pair => pair.includes(index)) && styles.matchedCard
            ]}
            onPress={() => handleCardFlip(index)}
          >
            <Text style={styles.cardText}>
              {flippedCards.includes(index) || 
               matchedPairs.some(pair => pair.includes(index)) 
                ? card.text 
                : '?'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

/**
 * Quick Choice Game Component (Modular)
 */
const QuickChoiceGameModular = ({ 
  gameConfig, 
  storyId, 
  lessonId, 
  gameState, 
  onStateChange, 
  onComplete 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questions = gameConfig.questions || [];
  const question = questions[currentQuestion];

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    setShowResult(true);

    const attempts = gameState.attempts + 1;
    let score = gameState.score;

    if (optionIndex === question.correct) {
      score += 20;
      AudioService.playSuccess();
    } else {
      AudioService.playError();
    }

    onStateChange({
      ...gameState,
      score,
      attempts
    });

    // Move to next question or complete game
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        onStateChange({
          ...gameState,
          score,
          attempts,
          completed: true
        });
        onComplete(score);
      }
    }, 2000);
  };

  if (!question) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Nu există întrebări disponibile</Text>
      </View>
    );
  }

  return (
    <View style={styles.quickChoiceContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        {question.audio && (
          <TouchableOpacity 
            style={styles.audioButton}
            onPress={() => AudioService.playAudio(question.audio)}
          >
            <Text style={styles.audioButtonText}>🔊 Ascultă</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption,
              showResult && index === question.correct && styles.correctOption,
              showResult && selectedAnswer === index && index !== question.correct && styles.incorrectOption
            ]}
            onPress={() => !showResult && handleAnswerSelect(index)}
            disabled={showResult}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Întrebarea {currentQuestion + 1} din {questions.length}
        </Text>
      </View>
    </View>
  );
};

/**
 * Speaking Challenge Component (Modular)
 */
const SpeakingChallengeModular = ({ 
  gameConfig, 
  storyId, 
  lessonId, 
  gameState, 
  onStateChange, 
  onComplete 
}) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const challenges = gameConfig.challenges || [];
  const challenge = challenges[currentChallenge];

  const handlePlayExample = () => {
    if (challenge.audio) {
      AudioService.playAudio(challenge.audio);
    }
  };

  const handleRecord = () => {
    // Placeholder for recording functionality
    setIsRecording(!isRecording);
    
    // Simulate recording and scoring
    setTimeout(() => {
      setIsRecording(false);
      const score = gameState.score + 25; // Award points for attempt
      
      onStateChange({
        ...gameState,
        score,
        attempts: gameState.attempts + 1
      });

      // Move to next challenge or complete
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(currentChallenge + 1);
      } else {
        onStateChange({
          ...gameState,
          score,
          attempts: gameState.attempts + 1,
          completed: true
        });
        onComplete(score);
      }
    }, 2000);
  };

  if (!challenge) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Nu există provocări disponibile</Text>
      </View>
    );
  }

  return (
    <View style={styles.speakingContainer}>
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeTitle}>Repetă după mine:</Text>
        <Text style={styles.challengePhrase}>{challenge.phrase}</Text>
        <Text style={styles.challengeTranslation}>{challenge.romanian}</Text>
      </View>

      <View style={styles.speakingControls}>
        <TouchableOpacity 
          style={styles.playButton}
          onPress={handlePlayExample}
        >
          <Text style={styles.playButtonText}>🔊 Ascultă exemplul</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.recordButton,
            isRecording && styles.recordingButton
          ]}
          onPress={handleRecord}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '🎤 Înregistrând...' : '🎤 Înregistrează'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Provocarea {currentChallenge + 1} din {challenges.length}
        </Text>
      </View>
    </View>
  );
};

/**
 * Story Sequence Game Component (Modular)
 */
const StorySequenceModular = ({ 
  gameConfig, 
  storyId, 
  lessonId, 
  gameState, 
  onStateChange, 
  onComplete 
}) => {
  const [userSequence, setUserSequence] = useState([]);
  const [availableSteps, setAvailableSteps] = useState([]);

  const correctSequence = gameConfig.sequence || [];

  useEffect(() => {
    // Shuffle the steps for user to arrange
    const shuffled = shuffleArray([...correctSequence]);
    setAvailableSteps(shuffled);
  }, [correctSequence]);

  const handleStepSelect = (step) => {
    const newSequence = [...userSequence, step];
    setUserSequence(newSequence);
    
    const newAvailable = availableSteps.filter(s => s.step !== step.step);
    setAvailableSteps(newAvailable);

    // Play step audio
    if (step.audio) {
      AudioService.playAudio(step.audio);
    }

    // Check if sequence is complete
    if (newSequence.length === correctSequence.length) {
      checkSequence(newSequence);
    }
  };

  const checkSequence = (sequence) => {
    const attempts = gameState.attempts + 1;
    let score = gameState.score;

    // Check if sequence is correct
    const isCorrect = sequence.every((step, index) => 
      step.step === correctSequence[index].step
    );

    if (isCorrect) {
      score += 30;
      AudioService.playSuccess();
      
      onStateChange({
        ...gameState,
        score,
        attempts,
        completed: true
      });
      
      setTimeout(() => {
        onComplete(score);
      }, 1000);
    } else {
      AudioService.playError();
      
      // Reset for retry
      setTimeout(() => {
        setUserSequence([]);
        setAvailableSteps(shuffleArray([...correctSequence]));
        
        onStateChange({
          ...gameState,
          attempts
        });
      }, 2000);
    }
  };

  return (
    <ScrollView style={styles.sequenceContainer}>
      <View style={styles.sequenceArea}>
        <Text style={styles.sequenceTitle}>Aranjează în ordine:</Text>
        
        {/* User's sequence */}
        <View style={styles.userSequence}>
          {userSequence.map((step, index) => (
            <View key={step.step} style={styles.sequenceStep}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepText}>{step.german}</Text>
            </View>
          ))}
        </View>

        {/* Available steps */}
        <View style={styles.availableSteps}>
          {availableSteps.map((step) => (
            <TouchableOpacity
              key={step.step}
              style={styles.availableStep}
              onPress={() => handleStepSelect(step)}
            >
              {step.image && (
                <Image 
                  source={{ uri: step.image }} 
                  style={styles.stepImage}
                />
              )}
              <Text style={styles.stepText}>{step.german}</Text>
              <Text style={styles.stepTranslation}>{step.romanian}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Utility Functions
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Styles
const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#6B7280',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  gameInfo: {
    flex: 1,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  gameInstructions: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  attemptsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  gameContent: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  
  // Drag & Drop Styles
  dragDropContainer: {
    flex: 1,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dragDropItem: {
    width: width * 0.4,
    margin: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectedItem: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF4FF',
  },
  matchedItem: {
    borderColor: '#10B981',
    backgroundColor: '#D1FAE5',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  itemTranslation: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  
  // Memory Game Styles
  memoryContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memoryCard: {
    width: width * 0.2,
    height: width * 0.2,
    margin: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flippedCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  matchedCard: {
    backgroundColor: '#10B981',
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  
  // Quick Choice Styles
  quickChoiceContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  audioButton: {
    padding: 12,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  audioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionButton: {
    padding: 16,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF4FF',
  },
  correctOption: {
    borderColor: '#10B981',
    backgroundColor: '#D1FAE5',
  },
  incorrectOption: {
    borderColor: '#EF4444',
    backgroundColor: '#FEE2E2',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // Speaking Challenge Styles
  speakingContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  challengeContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  challengePhrase: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    textAlign: 'center',
    marginBottom: 8,
  },
  challengeTranslation: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  speakingControls: {
    alignItems: 'center',
    marginBottom: 32,
  },
  playButton: {
    padding: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    marginBottom: 16,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recordButton: {
    padding: 16,
    backgroundColor: '#EF4444',
    borderRadius: 12,
  },
  recordingButton: {
    backgroundColor: '#DC2626',
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Story Sequence Styles
  sequenceContainer: {
    flex: 1,
  },
  sequenceArea: {
    padding: 16,
  },
  sequenceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  userSequence: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    minHeight: 100,
  },
  sequenceStep: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginRight: 12,
    width: 24,
  },
  availableSteps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  availableStep: {
    width: width * 0.4,
    margin: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  stepImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  stepTranslation: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default ModularGameEngine;