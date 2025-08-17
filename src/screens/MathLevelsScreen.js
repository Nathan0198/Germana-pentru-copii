import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const MATH_LEVELS = [
  {
    id: 1,
    title: '🌱 NIVEL 1',
    subtitle: '4-6 ani',
    description: 'Număratul 1-20',
    emoji: '🌱',
    color: '#2ECC71',
    exercises: 50,
    completed: 0,
    unlocked: true,
    themes: [
      'Björn numără fructele (1-10)',
      'Emma caută numerele (11-20)', 
      'Max compară cantitățile (21-30)',
      'Aventura cu 1-10 (31-40)',
      'Maestrul numerelor (41-50)'
    ]
  },
  {
    id: 2,
    title: '🌿 NIVEL 2',
    subtitle: '6-8 ani',
    description: 'Adunări simple',
    emoji: '🌿',
    color: '#3498DB',
    exercises: 50,
    completed: 0,
    unlocked: false,
    unlockCondition: 'Completează Nivelul 1',
    themes: [
      'Adunări cu Björn (1-20)',
      'Emma și fructele (21-30)',
      'Max și jucăriile (31-40)',
      'Probleme simple (41-50)'
    ]
  },
  {
    id: 3,
    title: '🌳 NIVEL 3',
    subtitle: '8+ ani',
    description: 'Scăderi și probleme',
    emoji: '🌳',
    color: '#9B59B6',
    exercises: 50,
    completed: 0,
    unlocked: false,
    unlockCondition: 'Completează Nivelul 2',
    themes: [
      'Scăderi cu Björn (1-30)',
      'Emma rezolvă probleme (31-40)',
      'Max și ceasul (41-50)'
    ]
  }
];

export default function MathLevelsScreen({ navigation }) {
  const handleLevelPress = (level) => {
    if (level.unlocked) {
      navigation.navigate('MathExercise', { 
        levelId: level.id, 
        levelName: level.title 
      });
    } else {
      alert(`Pentru a debloca acest nivel, trebuie să: ${level.unlockCondition}`);
    }
  };

  const calculateProgress = (completed, total) => {
    return (completed / total) * 100;
  };

  const getTotalCompleted = () => {
    return MATH_LEVELS.reduce((sum, level) => sum + level.completed, 0);
  };

  const getTotalExercises = () => {
    return MATH_LEVELS.reduce((sum, level) => sum + level.exercises, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF9A56', '#FF6B95']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🔢 Matematica cu Björn</Text>
          <Text style={styles.headerSubtitle}>
            Alege nivelul potrivit pentru vârsta ta!
          </Text>
        </View>

        {/* Character Guide */}
        <View style={styles.charactersContainer}>
          <View style={styles.characterItem}>
            <Text style={styles.characterEmoji}>🐻</Text>
            <Text style={styles.characterName}>Björn</Text>
          </View>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              Haide să învățăm matematica împreună! Începe cu Nivelul 1.
            </Text>
          </View>
          <View style={styles.characterItem}>
            <Text style={styles.characterEmoji}>🦆</Text>
            <Text style={styles.characterName}>Emma</Text>
          </View>
        </View>

        {/* Levels List */}
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          bounces={true}
        >
          <View style={styles.levelsContainer}>
            {MATH_LEVELS.map((level, index) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.levelCard,
                  !level.unlocked && styles.lockedLevel
                ]}
                onPress={() => handleLevelPress(level)}
                activeOpacity={level.unlocked ? 0.8 : 1}
              >
                <LinearGradient
                  colors={level.unlocked ? 
                    [level.color, level.color + '80'] : 
                    ['#BDC3C7', '#95A5A6']
                  }
                  style={styles.levelGradient}
                >
                  {/* Level Header */}
                  <View style={styles.levelHeader}>
                    <View style={styles.levelTitleContainer}>
                      <Text style={[
                        styles.levelEmoji,
                        !level.unlocked && styles.lockedEmoji
                      ]}>
                        {level.unlocked ? level.emoji : '🔒'}
                      </Text>
                      <View style={styles.levelTitles}>
                        <Text style={[
                          styles.levelTitle,
                          !level.unlocked && styles.lockedText
                        ]}>
                          {level.title}
                        </Text>
                        <Text style={[
                          styles.levelSubtitle,
                          !level.unlocked && styles.lockedText
                        ]}>
                          {level.subtitle}
                        </Text>
                      </View>
                    </View>
                    
                    {/* Stars for completed levels */}
                    {level.unlocked && level.completed > 0 && (
                      <View style={styles.starsContainer}>
                        <Text style={styles.starsText}>⭐⭐⭐</Text>
                      </View>
                    )}
                  </View>

                  {/* Level Description */}
                  <Text style={[
                    styles.levelDescription,
                    !level.unlocked && styles.lockedDescription
                  ]}>
                    {level.unlocked ? level.description : level.unlockCondition}
                  </Text>

                  {/* Exercise Count */}
                  <Text style={[
                    styles.exerciseCount,
                    !level.unlocked && styles.lockedText
                  ]}>
                    {level.exercises} exerciții
                  </Text>

                  {/* Progress Bar */}
                  {level.unlocked && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill,
                            { width: `${calculateProgress(level.completed, level.exercises)}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {level.completed}/{level.exercises}
                      </Text>
                    </View>
                  )}

                  {/* Themes Preview */}
                  {level.unlocked && (
                    <View style={styles.themesContainer}>
                      <Text style={styles.themesTitle}>Teme:</Text>
                      {level.themes.slice(0, 2).map((theme, i) => (
                        <Text key={i} style={styles.themeItem}>
                          • {theme}
                        </Text>
                      ))}
                      {level.themes.length > 2 && (
                        <Text style={styles.moreThemes}>
                          ... și încă {level.themes.length - 2} teme
                        </Text>
                      )}
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Characters Row */}
        <View style={styles.bottomCharacters}>
          <View style={styles.bottomCharacter}>
            <Text style={styles.bottomCharacterEmoji}>🐰</Text>
            <Text style={styles.bottomCharacterName}>Max</Text>
            <Text style={styles.bottomCharacterRole}>Maestrul Jocurilor</Text>
          </View>
          <View style={styles.bottomCharacter}>
            <Text style={styles.bottomCharacterEmoji}>🦆</Text>
            <Text style={styles.bottomCharacterName}>Emma</Text>
            <Text style={styles.bottomCharacterRole}>Pronunția</Text>
          </View>
          <View style={styles.bottomCharacter}>
            <Text style={styles.bottomCharacterEmoji}>🐻</Text>
            <Text style={styles.bottomCharacterName}>Björn</Text>
            <Text style={styles.bottomCharacterRole}>Naratorul</Text>
          </View>
        </View>

        {/* Overall Progress */}
        <View style={styles.overallProgress}>
          <Text style={styles.overallTitle}>Progresul General</Text>
          <Text style={styles.overallStats}>
            {getTotalCompleted()}/{getTotalExercises()} exerciții complete
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
  background: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFE4E6',
    textAlign: 'center',
  },
  charactersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  characterItem: {
    alignItems: 'center',
  },
  characterEmoji: {
    fontSize: 30,
  },
  characterName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 2,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 15,
  },
  speechText: {
    fontSize: 14,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  levelsContainer: {
    paddingBottom: 20,
  },
  levelCard: {
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  lockedLevel: {
    opacity: 0.7,
  },
  levelGradient: {
    padding: 20,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  levelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  lockedEmoji: {
    opacity: 0.6,
  },
  levelTitles: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  levelSubtitle: {
    fontSize: 14,
    color: '#F8F9FA',
  },
  levelDescription: {
    fontSize: 16,
    color: '#E9ECEF',
    marginBottom: 8,
    fontWeight: '600',
  },
  exerciseCount: {
    fontSize: 14,
    color: '#DEE2E6',
    marginBottom: 15,
  },
  lockedText: {
    color: '#95A5A6',
  },
  lockedDescription: {
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginRight: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  starsContainer: {
    alignItems: 'center',
  },
  starsText: {
    fontSize: 14,
  },
  themesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
  },
  themesTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  themeItem: {
    fontSize: 12,
    color: '#F8F9FA',
    marginBottom: 2,
  },
  moreThemes: {
    fontSize: 12,
    color: '#DEE2E6',
    fontStyle: 'italic',
    marginTop: 3,
  },
  bottomCharacters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 10,
  },
  bottomCharacter: {
    alignItems: 'center',
    flex: 1,
  },
  bottomCharacterEmoji: {
    fontSize: 25,
    marginBottom: 5,
  },
  bottomCharacterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  bottomCharacterRole: {
    fontSize: 11,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  overallProgress: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },
  overallTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  overallStats: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
});
