import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function MathExerciseScreen({ route, navigation }) {
  const { levelId, levelName } = route.params;
  const [currentExercise, setCurrentExercise] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Placeholder data - va fi înlocuit cu date reale
  const exerciseData = {
    id: 1,
    level: levelId,
    theme: 'Björn numără fructele',
    question: {
      german: 'Wie viele Äpfel siehst du?',
      romanian: 'Câte mere vezi?',
    },
    visual: '🍎🍎🍎🍎🍎🍎🍎',
    options: [5, 6, 7, 8],
    correctAnswer: 7,
    celebration: {
      character: 'max',
      message: {
        german: 'Sieben! Sehr gut!',
        romanian: 'Șapte! Foarte bine!'
      }
    }
  };

  const characters = {
    björn: { emoji: '🐻', name: 'Björn' },
    emma: { emoji: '🦆', name: 'Emma' },
    max: { emoji: '🐰', name: 'Max' }
  };

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === exerciseData.correctAnswer;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleNextExercise = () => {
    if (currentExercise >= 50) {
      // Nivel complet
      navigation.goBack();
    } else {
      setCurrentExercise(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      // Aici va fi logica pentru încărcarea următorului exercițiu
    }
  };

  const getAnswerStyle = (option) => {
    if (!showResult) {
      return selectedAnswer === option ? styles.selectedOption : styles.option;
    }
    
    if (option === exerciseData.correctAnswer) {
      return styles.correctOption;
    } else if (option === selectedAnswer && option !== exerciseData.correctAnswer) {
      return styles.wrongOption;
    }
    
    return styles.option;
  };

  const character = characters[exerciseData.celebration.character];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
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
            <Text style={styles.headerTitle}>{levelName}</Text>
            <Text style={styles.headerSubtitle}>{exerciseData.theme}</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Exercițiul {currentExercise}/50
            </Text>
            <Text style={styles.scoreText}>
              Scor: {score.correct}/{score.total}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(currentExercise / 50) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Character Guide */}
        <View style={styles.characterContainer}>
          <Text style={styles.characterEmoji}>{character.emoji}</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {showResult ? 
                (selectedAnswer === exerciseData.correctAnswer ? 
                  exerciseData.celebration.message.romanian : 
                  'Încearcă din nou! Nu te descuraja!'
                ) :
                'Numără cu atenție și alege răspunsul corect!'
              }
            </Text>
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <View style={styles.questionCard}>
            <Text style={styles.questionTitle}>Întrebarea:</Text>
            
            <TouchableOpacity style={styles.audioButton}>
              <Text style={styles.questionText}>
                🇩🇪 {exerciseData.question.german}
              </Text>
              <Text style={styles.playIcon}>🔊</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.audioButton}>
              <Text style={styles.questionText}>
                🇷🇴 {exerciseData.question.romanian}
              </Text>
              <Text style={styles.playIcon}>🔊</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Visual */}
        <View style={styles.visualContainer}>
          <Text style={styles.visualContent}>{exerciseData.visual}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Alege răspunsul:</Text>
          <View style={styles.optionsGrid}>
            {exerciseData.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getAnswerStyle(option)}
                onPress={() => handleAnswerSelect(option)}
                disabled={showResult}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Result & Next Button */}
        {showResult && (
          <View style={styles.resultContainer}>
            <View style={[
              styles.resultCard,
              selectedAnswer === exerciseData.correctAnswer ? 
                styles.correctResult : 
                styles.wrongResult
            ]}>
              <Text style={styles.resultEmoji}>
                {selectedAnswer === exerciseData.correctAnswer ? '🎉' : '💪'}
              </Text>
              <Text style={styles.resultText}>
                {selectedAnswer === exerciseData.correctAnswer ? 
                  'Bravo! Răspuns corect!' : 
                  `Răspunsul corect era ${exerciseData.correctAnswer}. Continuă să exersezi!`
                }
              </Text>
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={handleNextExercise}
              >
                <Text style={styles.nextButtonText}>
                  {currentExercise >= 50 ? 
                    'Finalizează Nivelul 🏁' : 
                    'Următorul Exercițiu ➡️'
                  }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Bottom Stats */}
        <View style={styles.bottomStats}>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statText}>
              {score.correct * 10} puncte
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={styles.statText}>
              {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}% acuratețe
            </Text>
          </View>
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
    color: '#E8F8F5',
    marginTop: 2,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 14,
    color: '#E8F8F5',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  characterEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 15,
  },
  speechText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  questionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
  },
  playIcon: {
    fontSize: 20,
  },
  visualContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  visualContent: {
    fontSize: 40,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    lineHeight: 50,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    width: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    paddingVertical: 20,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedOption: {
    width: '45%',
    backgroundColor: '#3498DB',
    borderRadius: 15,
    paddingVertical: 20,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  correctOption: {
    width: '45%',
    backgroundColor: '#2ECC71',
    borderRadius: 15,
    paddingVertical: 20,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  wrongOption: {
    width: '45%',
    backgroundColor: '#E74C3C',
    borderRadius: 15,
    paddingVertical: 20,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  resultCard: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  correctResult: {
    backgroundColor: '#2ECC71',
  },
  wrongResult: {
    backgroundColor: '#E74C3C',
  },
  resultEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    paddingVertical: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  statText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
});
