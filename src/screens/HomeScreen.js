import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AUDIO_CONFIG, characters } from '../data/AppData';
import { RewardDisplay, CharacterCard, ProgressCard } from '../components';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  // Mock data pentru progres - în realitate ar veni din ProgressService
  const mockProgress = {
    germanProgress: 15,
    germanTotal: 200,
    mathProgress: 8,
    mathTotal: 150,
    stars: 147,
    coins: 89,
    streak: 5,
    badges: [
      { icon: '🏆', name: 'Primul pas' },
      { icon: '🎯', name: 'Perfecționist' },
      { icon: '⚡', name: 'Rapid' }
    ]
  };

  const handleGermanPress = () => {
    // Navigate directly to the German Map to start the journey
    navigation.navigate('GermanMap');
  };

  const handleMathPress = () => {
    navigation.navigate('Math');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleStoryModulesPress = () => {
    navigation.navigate('StoryModules');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#87CEEB', '#4A90E2']}
        style={styles.background}
      >
        <ScrollView 
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          bounces={true}
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header cu titlul principal */}
          <View style={styles.header}>
            <Text style={styles.title}>🌟 LUMEA LUI BJÖRN 🌟</Text>
            <Text style={styles.subtitle}>Învață și Joacă-te cu Björn și Prietenii</Text>
          </View>

          {/* Recompense */}
          <RewardDisplay 
            stars={mockProgress.stars}
            coins={mockProgress.coins}
            streak={mockProgress.streak}
            badges={mockProgress.badges}
          />

          {/* Personaje */}
          <View style={styles.charactersSection}>
            <Text style={styles.sectionTitle}>Ghizii tăi:</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              bounces={true}
              style={styles.charactersScroll}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {characters.map((character, index) => (
                <CharacterCard 
                  key={character.id || index}
                  character={character}
                  onPress={() => {
                    console.log(`Tapped on ${character.name}`);
                    // Navighează la zona corespunzătoare personajului
                    if (character.role === 'narrator' || character.role === 'pronunciation' || character.role === 'games') {
                      handleGermanPress();
                    }
                  }}
                  style={styles.characterCard}
                />
              ))}
            </ScrollView>
          </View>

          {/* Progress Cards */}
          <View style={styles.progressSection}>
            <ProgressCard
              title="📚 Lecții de Germană"
              progress={mockProgress.germanProgress}
              total={mockProgress.germanTotal}
              colors={['#FF6B6B', '#FFE66D']}
              onPress={handleGermanPress}
            />
            
            {/* Quick Continue Button for Current Lesson */}
            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={() => navigation.navigate('ZoneLessons', { zoneId: 'castle' })}
              activeOpacity={0.8}
            >
              <Text style={styles.continueIcon}>🏰</Text>
              <View style={styles.continueTextContainer}>
                <Text style={styles.continueTitle}>Castelul Familiei</Text>
                <Text style={styles.continueSubtitle}>Continuă aventura cu Björn</Text>
              </View>
              <Text style={styles.continueArrow}>→</Text>
            </TouchableOpacity>
            
            <ProgressCard
              title="🔢 Exerciții de Matematică"
              progress={mockProgress.mathProgress}
              total={mockProgress.mathTotal}
              colors={['#4ECDC4', '#44A08D']}
              onPress={handleMathPress}
            />
          </View>

          {/* Bottom buttons */}
          <View style={styles.bottomRow}>
            <TouchableOpacity 
              style={[styles.smallButton, styles.profileButton]} 
              onPress={handleProfilePress}
              activeOpacity={0.8}
            >
              <Text style={styles.smallMenuIcon}>👤</Text>
              <Text style={styles.smallMenuTitle}>PROFILUL MEU</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.smallButton, styles.settingsButton]} 
              onPress={handleSettingsPress}
              activeOpacity={0.8}
            >
              <Text style={styles.smallMenuIcon}>⚙️</Text>
              <Text style={styles.smallMenuTitle}>SETĂRI</Text>
            </TouchableOpacity>
          </View>

          {/* Story Modules Button - NEW FEATURE */}
          <TouchableOpacity 
            style={styles.storyModulesButton} 
            onPress={handleStoryModulesPress}
            activeOpacity={0.8}
          >
            <Text style={styles.storyModulesIcon}>📚</Text>
            <Text style={styles.storyModulesTitle}>STORY MODULES (NEW)</Text>
            <Text style={styles.storyModulesSubtitle}>View all 25 lessons in modular format</Text>
          </TouchableOpacity>

          {/* Audio Test Button */}
          <TouchableOpacity 
            style={styles.audioTestButton} 
            onPress={() => navigation.navigate('Lesson1AudioDemo')}
            activeOpacity={0.8}
          >
            <Text style={styles.audioTestIcon}>🎵</Text>
            <Text style={styles.audioTestTitle}>TEST AUDIO LECȚIA 1</Text>
          </TouchableOpacity>
          
          <View style={styles.spacer} />
        </ScrollView>
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
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E6F3FF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  charactersSection: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
    marginBottom: 10,
  },
  charactersScroll: {
    paddingLeft: 10,
  },
  characterCard: {
    width: 160,
  },
  progressSection: {
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  smallButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flex: 0.48,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileButton: {
    borderTopWidth: 4,
    borderTopColor: '#9B59B6',
  },
  settingsButton: {
    borderTopWidth: 4,
    borderTopColor: '#F39C12',
  },
  smallMenuIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  smallMenuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  storyModulesButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.95)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderTopWidth: 4,
    borderTopColor: '#3498DB',
  },
  storyModulesIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  storyModulesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  storyModulesSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  audioTestButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderTopWidth: 4,
    borderTopColor: '#388E3C',
  },
  audioTestIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  audioTestTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  spacer: {
    height: 30,
  },
  continueButton: {
    backgroundColor: 'rgba(139, 69, 19, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginTop: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderTopWidth: 4,
    borderTopColor: '#8B4513',
  },
  continueIcon: {
    fontSize: 35,
    marginRight: 15,
  },
  continueTextContainer: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 3,
  },
  continueSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  continueArrow: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
