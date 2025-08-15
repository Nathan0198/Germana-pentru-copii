import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getLessonsByZone, getZoneById, isLessonUnlocked } from '../data/AppData';

const { width } = Dimensions.get('window');

export default function ZoneLessonsScreen({ route, navigation }) {
  const { zoneId } = route.params;
  const [zone, setZone] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState({
    completedLessons: [], // In aplicația reală, aceste date vin din AsyncStorage/Supabase
    userLevel: 1,
    totalStars: 0,
    totalPoints: 0
  });

  useEffect(() => {
    const zoneData = getZoneById(zoneId);
    const zoneLessons = getLessonsByZone(zoneId);
    
    setZone(zoneData);
    setLessons(zoneLessons);
    
    // Actualizăm titlul navigatorului
    navigation.setOptions({
      title: zoneData?.name || 'Lecții'
    });
  }, [zoneId, navigation]);

  const handleLessonPress = (lesson) => {
    const isUnlocked = isLessonUnlocked(lesson.id, userProgress);
    
    if (!isUnlocked) {
      Alert.alert(
        'Lecție blocată',
        'Completează lecția anterioară pentru a debloca aceasta.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    navigation.navigate('DetailedLesson', { 
      lessonId: lesson.id,
      zoneId: zoneId 
    });
  };

  const getLessonStatus = (lesson) => {
    const isCompleted = userProgress.completedLessons.includes(lesson.id);
    const isUnlocked = isLessonUnlocked(lesson.id, userProgress);
    
    if (isCompleted) return 'completed';
    if (isUnlocked) return 'available';
    return 'locked';
  };

  const getLessonStatusEmoji = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'available': return '🎯';
      case 'locked': return '🔒';
      default: return '❓';
    }
  };

  const renderLessonCard = (lesson, index) => {
    const status = getLessonStatus(lesson);
    const isCompleted = status === 'completed';
    const isAvailable = status === 'available';
    const isLocked = status === 'locked';

    return (
      <TouchableOpacity
        key={lesson.id}
        style={[
          styles.lessonCard,
          isCompleted && styles.completedCard,
          isLocked && styles.lockedCard
        ]}
        onPress={() => handleLessonPress(lesson)}
        activeOpacity={isLocked ? 0.5 : 0.8}
      >
        <LinearGradient
          colors={
            isCompleted 
              ? ['#4CAF50', '#45a049'] 
              : isAvailable 
                ? [zone?.color || '#8B4513', (zone?.color || '#8B4513') + '80']
                : ['#CCCCCC', '#999999']
          }
          style={styles.lessonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.lessonHeader}>
            <View style={styles.lessonNumber}>
              <Text style={styles.lessonNumberText}>{lesson.id}</Text>
            </View>
            <Text style={styles.lessonStatus}>
              {getLessonStatusEmoji(status)}
            </Text>
          </View>
          
          <View style={styles.lessonContent}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
            
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonDuration}>⏱️ {lesson.duration} min</Text>
              {lesson.vocabulary && (
                <Text style={styles.lessonVocab}>
                  📚 {lesson.vocabulary.length} cuvinte
                </Text>
              )}
            </View>
            
            {isCompleted && (
              <View style={styles.completionInfo}>
                <Text style={styles.completionText}>
                  ⭐ {lesson.rewards?.stars || 0} stele
                </Text>
                <Text style={styles.completionText}>
                  🏆 {lesson.rewards?.points || 0} puncte
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  if (!zone) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Se încarcă zona...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header zona */}
        <View style={styles.zoneHeader}>
          <LinearGradient
            colors={[zone.color, zone.color + '80']}
            style={styles.zoneHeaderGradient}
          >
            <Text style={styles.zoneTitle}>{zone.title}</Text>
            <Text style={styles.zoneSubtitle}>{zone.subtitle}</Text>
            <Text style={styles.zoneDescription}>{zone.description}</Text>
            
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                Progres: {userProgress.completedLessons.length}/{lessons.length} lecții
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${lessons.length > 0 ? (userProgress.completedLessons.length / lessons.length) * 100 : 0}%` 
                    }
                  ]} 
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Lista lecțiilor */}
        <View style={styles.lessonsContainer}>
          <Text style={styles.sectionTitle}>Lecțiile din această zonă:</Text>
          {lessons.map((lesson, index) => renderLessonCard(lesson, index))}
        </View>

        {/* Informații despre zona următoare */}
        {userProgress.completedLessons.length === lessons.length && (
          <View style={styles.nextZoneInfo}>
            <Text style={styles.congratsTitle}>🎉 Felicitări!</Text>
            <Text style={styles.congratsText}>
              Ai completat zona "{zone.name}"! 
            </Text>
            <TouchableOpacity 
              style={styles.nextZoneButton}
              onPress={() => navigation.navigate('German')}
            >
              <Text style={styles.nextZoneButtonText}>
                Vezi zona următoare 🚀
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  zoneHeader: {
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  zoneHeaderGradient: {
    padding: 20,
  },
  zoneTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  zoneSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  zoneDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    opacity: 0.9,
  },
  progressInfo: {
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  lessonsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  lessonCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  completedCard: {
    opacity: 0.9,
  },
  lockedCard: {
    opacity: 0.6,
  },
  lessonGradient: {
    padding: 15,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  lessonStatus: {
    fontSize: 20,
  },
  lessonContent: {
    alignItems: 'flex-start',
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  lessonSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 10,
  },
  lessonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  lessonVocab: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  completionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  completionText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  nextZoneInfo: {
    margin: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  congratsText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  nextZoneButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  nextZoneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
