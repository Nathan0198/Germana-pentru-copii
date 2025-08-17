import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StoryManager } from '../services/story/StoryManager';

export default function StoryModulesScreen({ navigation }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [globalStats, setGlobalStats] = useState(null);

  const loadStories = async () => {
    try {
      setLoading(true);
      
      // Ensure StoryManager is initialized
      if (!StoryManager.initialized) {
        await StoryManager.initialize();
      }
      
      // Get all story metadata
      const storyMetadata = StoryManager.getAllStoryMetadata();
      setStories(storyMetadata);
      
      // Get global statistics
      const stats = StoryManager.getGlobalStatistics();
      setGlobalStats(stats);
      
      console.log('Loaded stories:', storyMetadata.length);
      console.log('Global stats:', stats);
      
    } catch (error) {
      console.error('Error loading stories:', error);
      Alert.alert('Error', 'Failed to load story modules: ' + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadStories();
  };

  const showStoryDetails = (story) => {
    try {
      const storyInstance = StoryManager.getStory(story.id);
      const lessons = storyInstance.getLessons();
      const characters = storyInstance.getCharacters();
      const statistics = storyInstance.getStatistics();
      
      const details = `
📚 Story: ${story.name}
🎯 Difficulty: ${story.difficulty}
📖 Lessons: ${lessons.length} (${story.lessonsRange})
⏱️ Duration: ${story.estimatedDuration} min per lesson
👥 Characters: ${Object.keys(characters).length}
📝 Vocabulary: ${statistics.totalVocabulary} words
🎮 Games: ${statistics.totalGames}
🎬 Scenes: ${statistics.totalScenes}

📋 Lessons:
${lessons.map(lesson => `• L${lesson.id}: ${lesson.title}`).join('\n')}

👤 Characters:
${Object.entries(characters).map(([id, char]) => `• ${char.name} (${char.type})`).join('\n')}
      `;
      
      Alert.alert(story.name, details, [{ text: 'OK' }]);
    } catch (error) {
      Alert.alert('Error', 'Could not load story details: ' + error.message);
    }
  };

  const testAudioMapping = (story) => {
    try {
      const storyInstance = StoryManager.getStory(story.id);
      const audioConfig = storyInstance.getAudioConfig();
      const fileCount = Object.keys(audioConfig.files).length;
      
      Alert.alert(
        'Audio Configuration',
        `📁 Base Path: ${audioConfig.basePath}\n📄 Audio Files: ${fileCount}\n\n🎵 Sample Files:\n${Object.entries(audioConfig.files).slice(0, 5).map(([key, file]) => `• ${key}: ${file}`).join('\n')}${fileCount > 5 ? '\n...and more' : ''}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Could not load audio configuration: ' + error.message);
    }
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🔄 Loading Story Modules...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        bounces={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 MiniDeutsch Story Modules</Text>
          <Text style={styles.headerSubtitle}>Complete Modular Learning System</Text>
        </View>

        {/* Global Statistics */}
        {globalStats && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>📊 Global Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{globalStats.totalStories}</Text>
                <Text style={styles.statLabel}>Stories</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{globalStats.totalLessons}</Text>
                <Text style={styles.statLabel}>Lessons</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{globalStats.totalVocabulary}</Text>
                <Text style={styles.statLabel}>Words</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{globalStats.totalGames}</Text>
                <Text style={styles.statLabel}>Games</Text>
              </View>
            </View>
            <Text style={styles.statsSubtext}>
              📅 Total Duration: {globalStats.totalDuration} minutes
            </Text>
          </View>
        )}

        {/* Story Modules */}
        <View style={styles.storiesContainer}>
          <Text style={styles.sectionTitle}>📖 Story Modules</Text>
          {stories.map((story) => (
            <View key={story.id} style={styles.storyCard}>
              <View style={styles.storyHeader}>
                <Text style={styles.storyIcon}>{story.icon}</Text>
                <View style={styles.storyInfo}>
                  <Text style={styles.storyTitle}>{story.name}</Text>
                  <Text style={styles.storySubtitle}>Lessons {story.lessonsRange}</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: story.color }]}>
                  <Text style={styles.difficultyText}>{story.difficulty}</Text>
                </View>
              </View>
              
              <Text style={styles.storyDescription}>{story.description}</Text>
              
              <View style={styles.storyStats}>
                <Text style={styles.statText}>📚 {story.totalLessons} lessons</Text>
                <Text style={styles.statText}>⏱️ {story.estimatedDuration} min/lesson</Text>
              </View>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => showStoryDetails(story)}
                >
                  <Text style={styles.buttonText}>📋 Details</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.audioButton}
                  onPress={() => testAudioMapping(story)}
                >
                  <Text style={styles.buttonText}>🎵 Audio</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Development Info */}
        <View style={styles.devInfo}>
          <Text style={styles.devTitle}>🛠️ Development Status</Text>
          <Text style={styles.devText}>✅ Modular Architecture Complete</Text>
          <Text style={styles.devText}>✅ All 25 Lessons Implemented</Text>
          <Text style={styles.devText}>✅ Audio Mapping Service Ready</Text>
          <Text style={styles.devText}>✅ Character Images Generated</Text>
          <Text style={styles.devText}>📝 Ready for Integration Testing</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statsSubtext: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  storiesContainer: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  storyCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  storyIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  storyInfo: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  storySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  storyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  storyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statText: {
    fontSize: 12,
    color: '#888',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 0.45,
  },
  audioButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 0.45,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  devInfo: {
    backgroundColor: '#e8f5e8',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  devTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  devText: {
    fontSize: 14,
    color: '#388E3C',
    marginBottom: 5,
  },
});