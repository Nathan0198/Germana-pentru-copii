/**
 * Integration layer between the new modular story system and existing app structure
 * Provides backward compatibility while enabling new modular features
 */

import { initializeStorySystem, getAllStoriesMetadata, getUnlockedStories, loadStory } from '../stories/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Initialize the modular app data system
 * This replaces the old static data approach with dynamic story loading
 */
export async function initializeModularAppData() {
  try {
    console.log('Initializing modular app data system...');
    
    // Initialize the story system
    await initializeStorySystem();
    
    // Load user progress
    const userProgress = await loadUserProgress();
    
    // Create backward-compatible app data structure
    const appData = await createCompatibleAppData(userProgress);
    
    console.log('Modular app data system initialized successfully!');
    return appData;
    
  } catch (error) {
    console.error('Failed to initialize modular app data:', error);
    throw error;
  }
}

/**
 * Create backward-compatible app data structure
 * Transforms modular stories into the format expected by existing components
 */
async function createCompatibleAppData(userProgress = {}) {
  const storiesMetadata = getAllStoriesMetadata();
  const unlockedStories = await getUnlockedStories(userProgress);
  
  // Transform stories into old format for compatibility
  const zones = [];
  const allLessons = [];
  
  for (const storyMeta of storiesMetadata) {
    try {
      // Load the story to get full data
      const story = await loadStory(storyMeta.id);
      const lessons = story.getLessons();
      const characters = story.getCharacters();
      const themes = story.getThemes();
      
      // Create zone data structure
      const zone = {
        id: storyMeta.id,
        name: storyMeta.name,
        description: storyMeta.description,
        color: storyMeta.color,
        icon: storyMeta.icon,
        order: storyMeta.order,
        unlocked: unlockedStories.some(s => s.id === storyMeta.id),
        progress: story.calculateProgress(userProgress),
        lessons: lessons.map(lesson => ({
          ...lesson,
          storyId: storyMeta.id,
          unlocked: true // For now, unlock all lessons within unlocked stories
        })),
        characters,
        themes
      };
      
      zones.push(zone);
      
      // Add lessons to global lessons array with story context
      lessons.forEach(lesson => {
        allLessons.push({
          ...lesson,
          storyId: storyMeta.id,
          zoneName: storyMeta.name,
          zoneColor: storyMeta.color
        });
      });
      
    } catch (error) {
      console.error(`Error loading story ${storyMeta.id}:`, error);
    }
  }
  
  // Sort by order
  zones.sort((a, b) => a.order - b.order);
  allLessons.sort((a, b) => {
    if (a.storyId !== b.storyId) {
      const storyA = zones.find(z => z.id === a.storyId);
      const storyB = zones.find(z => z.id === b.storyId);
      return (storyA?.order || 0) - (storyB?.order || 0);
    }
    return a.id - b.id;
  });
  
  return {
    zones,
    lessons: allLessons,
    characters: extractAllCharacters(zones),
    userProgress,
    metadata: {
      version: '2.0.0',
      lastUpdate: new Date().toISOString(),
      totalStories: zones.length,
      totalLessons: allLessons.length,
      modularSystem: true
    }
  };
}

/**
 * Extract all characters from all zones
 */
function extractAllCharacters(zones) {
  const allCharacters = {};
  
  zones.forEach(zone => {
    if (zone.characters) {
      Object.entries(zone.characters).forEach(([key, character]) => {
        // Add story context to character
        allCharacters[`${zone.id}_${key}`] = {
          ...character,
          storyId: zone.id,
          originalKey: key
        };
        
        // Also add without prefix for backward compatibility
        if (!allCharacters[key]) {
          allCharacters[key] = {
            ...character,
            storyId: zone.id,
            originalKey: key
          };
        }
      });
    }
  });
  
  return allCharacters;
}

/**
 * Load user progress from AsyncStorage
 */
async function loadUserProgress() {
  try {
    const progressData = await AsyncStorage.getItem('user_progress');
    return progressData ? JSON.parse(progressData) : {};
  } catch (error) {
    console.error('Error loading user progress:', error);
    return {};
  }
}

/**
 * Save user progress to AsyncStorage
 */
export async function saveUserProgress(progress) {
  try {
    await AsyncStorage.setItem('user_progress', JSON.stringify(progress));
    console.log('User progress saved successfully');
  } catch (error) {
    console.error('Error saving user progress:', error);
    throw error;
  }
}

/**
 * Update progress for a specific lesson
 */
export async function updateLessonProgress(storyId, lessonId, progressData) {
  try {
    const currentProgress = await loadUserProgress();
    
    if (!currentProgress[storyId]) {
      currentProgress[storyId] = {};
    }
    
    if (!currentProgress[storyId][`lesson_${lessonId}`]) {
      currentProgress[storyId][`lesson_${lessonId}`] = {};
    }
    
    // Merge new progress data
    currentProgress[storyId][`lesson_${lessonId}`] = {
      ...currentProgress[storyId][`lesson_${lessonId}`],
      ...progressData,
      lastUpdate: new Date().toISOString()
    };
    
    // Calculate story completion
    const story = await loadStory(storyId);
    const storyProgress = story.calculateProgress(currentProgress);
    currentProgress[storyId].completionPercentage = storyProgress;
    currentProgress[storyId].completed = storyProgress >= 100;
    
    await saveUserProgress(currentProgress);
    
    console.log(`Progress updated for ${storyId} lesson ${lessonId}`);
    return currentProgress;
    
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    throw error;
  }
}

/**
 * Mark a game as completed
 */
export async function markGameCompleted(storyId, lessonId, gameId, score = 100) {
  try {
    const currentProgress = await loadUserProgress();
    
    if (!currentProgress[storyId]) {
      currentProgress[storyId] = {};
    }
    
    if (!currentProgress[storyId][`lesson_${lessonId}`]) {
      currentProgress[storyId][`lesson_${lessonId}`] = {};
    }
    
    if (!currentProgress[storyId][`lesson_${lessonId}`].games) {
      currentProgress[storyId][`lesson_${lessonId}`].games = {};
    }
    
    currentProgress[storyId][`lesson_${lessonId}`].games[gameId] = {
      completed: true,
      score,
      completedAt: new Date().toISOString()
    };
    
    await saveUserProgress(currentProgress);
    
    console.log(`Game ${gameId} marked as completed for ${storyId} lesson ${lessonId}`);
    return currentProgress;
    
  } catch (error) {
    console.error('Error marking game as completed:', error);
    throw error;
  }
}

/**
 * Get story by ID (backward compatibility)
 */
export async function getStoryById(storyId) {
  try {
    return await loadStory(storyId);
  } catch (error) {
    console.error(`Error getting story ${storyId}:`, error);
    return null;
  }
}

/**
 * Get lesson by story ID and lesson ID (backward compatibility)
 */
export async function getLessonById(storyId, lessonId) {
  try {
    const story = await loadStory(storyId);
    return story.getLessonById(lessonId);
  } catch (error) {
    console.error(`Error getting lesson ${lessonId} from story ${storyId}:`, error);
    return null;
  }
}

/**
 * Get all vocabulary across all stories
 */
export async function getAllVocabulary() {
  try {
    const storiesMetadata = getAllStoriesMetadata();
    const vocabulary = [];
    
    for (const storyMeta of storiesMetadata) {
      const story = await loadStory(storyMeta.id);
      const storyVocab = story.getAllVocabulary();
      vocabulary.push(...storyVocab);
    }
    
    return vocabulary;
  } catch (error) {
    console.error('Error getting all vocabulary:', error);
    return [];
  }
}

/**
 * Check if user can access a specific story
 */
export async function canAccessStory(storyId, userProgress = null) {
  try {
    if (!userProgress) {
      userProgress = await loadUserProgress();
    }
    
    const story = await loadStory(storyId);
    return story.isUnlocked(userProgress);
  } catch (error) {
    console.error(`Error checking access for story ${storyId}:`, error);
    return false;
  }
}

/**
 * Reset all progress (for testing/debugging)
 */
export async function resetAllProgress() {
  try {
    await AsyncStorage.removeItem('user_progress');
    console.log('All progress reset successfully');
  } catch (error) {
    console.error('Error resetting progress:', error);
    throw error;
  }
}

/**
 * Export system status for debugging
 */
export async function getSystemStatus() {
  try {
    const { getSystemStatus } = await import('../stories/index.js');
    const userProgress = await loadUserProgress();
    const appData = await createCompatibleAppData(userProgress);
    
    return {
      system: getSystemStatus(),
      userProgress,
      appData: {
        totalZones: appData.zones.length,
        totalLessons: appData.lessons.length,
        totalCharacters: Object.keys(appData.characters).length,
        metadata: appData.metadata
      }
    };
  } catch (error) {
    console.error('Error getting system status:', error);
    return { error: error.message };
  }
}