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
    navigation.navigate('German');
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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#87CEEB', '#E0F6FF', '#87CEEB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header with rewards */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              Bună ziua! 👋
            </Text>
            <RewardDisplay 
              stars={mockProgress.stars} 
              coins={mockProgress.coins} 
              streak={mockProgress.streak} 
            />
          </View>

          {/* Character cards */}
          <View style={styles.charactersRow}>
            <CharacterCard character={characters.bjorn} size="small" />
            <CharacterCard character={characters.emma} size="small" />
            <CharacterCard character={characters.max} size="small" />
          </View>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            <Text style={styles.badgesTitle}>🏆 Insigne câștigate</Text>
            <View style={styles.badgesList}>
              {mockProgress.badges.map((badge, index) => (
                <View key={index} style={styles.badge}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Main learning cards */}
          <View style={styles.mainContent}>
            <ProgressCard
              title="🇩🇪 Lecții de Germană"
              progress={mockProgress.germanProgress}
              total={mockProgress.germanTotal}
              colors={['#FF6B6B', '#FFE66D']}
              onPress={handleGermanPress}
            />
            
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
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  charactersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  badgesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  badgesList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  badge: {
    alignItems: 'center',
    margin: 5,
  },
  badgeIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#34495E',
    textAlign: 'center',
  },
  mainContent: {
    marginBottom: 20,
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
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
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
    height: 20,
  },
});
