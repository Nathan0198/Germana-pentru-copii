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
import { LevelButton, ProgressCard } from '../components';
import { GERMAN_ZONES } from '../data/AppData';

const { width } = Dimensions.get('window');

// Function to calculate progress percentage
const calculateProgress = (completed, total) => {
  return total > 0 ? (completed / total) * 100 : 0;
};

export default function GermanMapScreen({ navigation }) {
  const handleZonePress = (zone) => {
    // Castle Family is always unlocked - first zone
    if (zone.id === 'castle') {
      navigation.navigate('ZoneLessons', { zoneId: zone.id });
      return;
    }
    
    // Check if zone is unlocked for other zones
    if (!zone.isUnlocked && !zone.unlocked) {
      alert('Această zonă este încă blocată! Completează zona anterioară pentru a o debloca.');
      return;
    }
    
    navigation.navigate('ZoneLessons', { zoneId: zone.id });
  };

  const handleLessonPress = (lessonId) => {
    navigation.navigate('DetailedLesson', { lessonId });
  };

  const renderZoneCard = (zone) => {
    const completedLessons = zone.lessons.filter(lesson => lesson.isCompleted).length;
    const progress = zone.lessons.length > 0 ? (completedLessons / zone.lessons.length) * 100 : 0;

    return (
      <TouchableOpacity
        key={zone.id}
        style={[styles.zoneCard, !zone.isUnlocked && styles.lockedZone]}
        onPress={() => handleZonePress(zone)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={zone.isUnlocked ? [zone.color, zone.color + '80'] : ['#CCCCCC', '#999999']}
          style={styles.zoneGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.zoneContent}>
            <Text style={styles.zoneEmoji}>{zone.title.charAt(0)}</Text>
            <Text style={styles.zoneTitle}>{zone.name}</Text>
            <Text style={styles.zoneSubtitle}>{zone.subtitle}</Text>
            <Text style={styles.zoneDescription}>{zone.description}</Text>
            
            {zone.isUnlocked && (
              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${progress}%` }]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {completedLessons}/{zone.lessons.length} lecții
                </Text>
              </View>
            )}
            
            {!zone.isUnlocked && (
              <View style={styles.lockSection}>
                <Text style={styles.lockIcon}>🔒</Text>
                <Text style={styles.lockText}>Zonă blocată</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderCastleLessons = () => {
    const castleZone = GERMAN_ZONES[0]; // Prima zonă - Castelul Familiei
    
    return (
      <View style={styles.lessonsSection}>
        <Text style={styles.lessonsSectionTitle}>
          🏰 Lecțiile din Castelul Familiei
        </Text>
        <Text style={styles.lessonsSectionSubtitle}>
          Apasă pe o lecție pentru a începe aventura!
        </Text>
        
        <View style={styles.lessonsGrid}>
          {castleZone.lessons.slice(0, 12).map((lesson) => ( // Afișează primele 12 lecții
            <LevelButton
              key={lesson.id}
              level={lesson.id}
              isUnlocked={lesson.unlock_requirements === null || true} // Prima lecție e deblocată
              isCompleted={lesson.isCompleted || false}
              progress={lesson.progress || 0}
              onPress={() => handleLessonPress(lesson.id)}
              style={styles.lessonButton}
            />
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('ZoneLessons', { zoneId: 1 })}
        >
          <Text style={styles.viewAllText}>
            Vezi toate cele 25 de lecții →
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🗺️ Harta Aventurilor</Text>
          <Text style={styles.headerSubtitle}>
            Alege o zonă pentru a începe aventura!
          </Text>
        </View>

        {/* Björn Guide */}
        <View style={styles.guideContainer}>
          <Text style={styles.guideEmoji}>🐻</Text>
          <View style={styles.guideBubble}>
            <Text style={styles.guideText}>
              Haide să explorăm împreună! Începe cu Castelul Familiei.
            </Text>
          </View>
        </View>

        {/* Zones Grid */}
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          bounces={true}
        >
          <View style={styles.zonesContainer}>
            {GERMAN_ZONES.map((zone, index) => (
              <TouchableOpacity
                key={zone.id}
                style={[
                  styles.zoneCard,
                  !zone.unlocked && styles.lockedZone,
                  index % 2 === 0 ? styles.leftZone : styles.rightZone
                ]}
                onPress={() => handleZonePress(zone)}
                activeOpacity={(zone.unlocked || zone.isUnlocked || zone.id === 'castle') ? 0.8 : 1}
              >
                <LinearGradient
                  colors={(zone.unlocked || zone.isUnlocked || zone.id === 'castle') ? 
                    [zone.color, zone.color + '80'] : 
                    ['#BDC3C7', '#95A5A6']
                  }
                  style={styles.zoneGradient}
                >
                  {/* Zone Emoji */}
                  <Text style={[
                    styles.zoneEmoji,
                    !zone.unlocked && styles.lockedEmoji
                  ]}>
                    {(zone.unlocked || zone.isUnlocked || zone.id === 'castle') ? zone.emoji : '🔒'}
                  </Text>

                  {/* Zone Info */}
                  <View style={styles.zoneInfo}>
                    <Text style={[
                      styles.zoneTitle,
                      !zone.unlocked && styles.lockedText
                    ]}>
                      {zone.title}
                    </Text>
                    <Text style={[
                      styles.zoneSubtitle,
                      !zone.unlocked && styles.lockedText
                    ]}>
                      {zone.subtitle}
                    </Text>
                    <Text style={[
                      styles.zoneDescription,
                      !zone.unlocked && styles.lockedDescription
                    ]}>
                      {(zone.unlocked || zone.isUnlocked || zone.id === 'castle') ? zone.description : 'Zonă blocată'}
                    </Text>
                  </View>

                  {/* Progress Bar */}
                  {(zone.unlocked || zone.isUnlocked || zone.id === 'castle') && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill,
                            { width: `${calculateProgress(zone.completed, zone.total)}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {zone.completed}/{zone.total}
                      </Text>
                    </View>
                  )}

                  {/* Stars indicator for completed zones */}
                  {(zone.unlocked || zone.isUnlocked || zone.id === 'castle') && zone.completed > 0 && (
                    <View style={styles.starsContainer}>
                      <Text style={styles.starsText}>⭐⭐⭐</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Lecții Complete</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Stele Câștigate</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1/8</Text>
            <Text style={styles.statLabel}>Zone Deblocate</Text>
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
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
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
    color: '#E8EAF6',
    textAlign: 'center',
  },
  guideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  guideEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  guideBubble: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 15,
  },
  guideText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  zonesContainer: {
    paddingBottom: 100, // More space at bottom for scrolling
    minHeight: 800, // Ensure minimum height for scrolling
  },
  zoneCard: {
    marginVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    minHeight: 160, // Ensure consistent card height
  },
  leftZone: {
    marginRight: width * 0.25,
  },
  rightZone: {
    marginLeft: width * 0.25,
  },
  lockedZone: {
    opacity: 0.7,
  },
  zoneGradient: {
    padding: 20,
    minHeight: 140,
  },
  zoneEmoji: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 10,
  },
  lockedEmoji: {
    opacity: 0.6,
  },
  zoneInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  zoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  zoneSubtitle: {
    fontSize: 12,
    color: '#F8F9FA',
    textAlign: 'center',
    marginBottom: 5,
  },
  zoneDescription: {
    fontSize: 11,
    color: '#E9ECEF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  lockedText: {
    color: '#95A5A6',
  },
  lockedDescription: {
    color: '#7F8C8D',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  starsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  starsText: {
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    paddingVertical: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 2,
  },
});
