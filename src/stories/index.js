/**
 * Central registration hub for all story modules
 * This file imports and registers all available stories with the StoryManager
 */

import { StoryManager } from '../services/story/StoryManager.js';
import { CastleStory } from './castle/CastleStory.js';
import { FamilieStory } from './familie/FamilieStory.js'; 
import { HausStory } from './haus/HausStory.js';
import { MorgenStory } from './morgen/MorgenStory.js';

/**
 * Register all available story modules
 * This function should be called during app initialization
 */
export async function registerAllStories() {
  console.log('Registering all story modules...');

  try {
    // Register Castle Story (Lesson 1) - Always unlocked
    await StoryManager.registerStory('castle', CastleStory, {
      dependencies: [],
      autoLoad: true,
      metadata: {
        id: 'castle',
        name: 'Castelul Familiei',
        description: 'Întâlnire cu Björn ursulețul și Emma rățușca',
        order: 1,
        color: '#6B46C1',
        icon: '🏰'
      }
    });

    // Register Familie Story (Lesson 2) - Requires Castle completion
    await StoryManager.registerStory('familie', FamilieStory, {
      dependencies: ['castle'],
      autoLoad: false,
      metadata: {
        id: 'familie', 
        name: 'Familia lui Björn',
        description: 'Învață despre membrii familiei',
        order: 2,
        color: '#10B981',
        icon: '👨‍👩‍👧‍👦'
      }
    });

    // Register Haus Story (Lesson 3) - Requires Familie completion
    await StoryManager.registerStory('haus', HausStory, {
      dependencies: ['castle', 'familie'],
      autoLoad: false,
      metadata: {
        id: 'haus',
        name: 'Casa Noastră', 
        description: 'Explorează camerele casei',
        order: 3,
        color: '#F59E0B',
        icon: '🏠'
      }
    });

    // Register Morgen Story (Lesson 4) - Requires Haus completion  
    await StoryManager.registerStory('morgen', MorgenStory, {
      dependencies: ['castle', 'familie', 'haus'],
      autoLoad: false,
      metadata: {
        id: 'morgen',
        name: 'Dimineața în Familie',
        description: 'Învață despre rutina de dimineață', 
        order: 4,
        color: '#EF4444',
        icon: '🌅'
      }
    });

    console.log('All story modules registered successfully!');
    console.log('Registered stories:', StoryManager.getRegisteredStoryIds());

  } catch (error) {
    console.error('Error registering story modules:', error);
    throw error;
  }
}

/**
 * Load a specific story by ID
 * @param {string} storyId Story identifier
 * @returns {Promise<Object>} Story instance
 */
export async function loadStory(storyId) {
  try {
    return await StoryManager.loadStory(storyId);
  } catch (error) {
    console.error(`Error loading story ${storyId}:`, error);
    throw error;
  }
}

/**
 * Get story metadata without loading full story
 * @param {string} storyId Story identifier
 * @returns {Object|null} Story metadata
 */
export function getStoryMetadata(storyId) {
  return StoryManager.getStoryMetadata(storyId);
}

/**
 * Get all available stories metadata
 * @returns {Array} Array of story metadata objects
 */
export function getAllStoriesMetadata() {
  const storyIds = StoryManager.getRegisteredStoryIds();
  return storyIds.map(id => getStoryMetadata(id)).filter(Boolean);
}

/**
 * Get stories unlocked for current user
 * @param {Object} userProgress User progress data
 * @returns {Promise<Array>} Array of unlocked story metadata
 */
export async function getUnlockedStories(userProgress = {}) {
  const unlockedIds = StoryManager.getUnlockedStories(userProgress);
  const metadata = [];
  
  for (const storyId of unlockedIds) {
    const meta = getStoryMetadata(storyId);
    if (meta) {
      metadata.push({
        ...meta,
        unlocked: true,
        progress: await calculateStoryProgress(storyId, userProgress)
      });
    }
  }
  
  return metadata.sort((a, b) => a.order - b.order);
}

/**
 * Get next recommended story for user
 * @param {Object} userProgress User progress data  
 * @returns {Promise<Object|null>} Next story metadata or null
 */
export async function getNextRecommendedStory(userProgress = {}) {
  const nextStoryId = StoryManager.getNextRecommendedStory(userProgress);
  if (!nextStoryId) {
    return null;
  }
  
  const metadata = getStoryMetadata(nextStoryId);
  if (metadata) {
    return {
      ...metadata,
      progress: await calculateStoryProgress(nextStoryId, userProgress)
    };
  }
  
  return null;
}

/**
 * Calculate progress for a specific story
 * @param {string} storyId Story identifier
 * @param {Object} userProgress User progress data
 * @returns {Promise<number>} Progress percentage (0-100)
 */
export async function calculateStoryProgress(storyId, userProgress = {}) {
  try {
    // Try to get loaded story first
    let story = StoryManager.getStory(storyId);
    
    // If not loaded, load it temporarily
    if (!story) {
      story = await StoryManager.loadStory(storyId);
    }
    
    return story.calculateProgress(userProgress);
  } catch (error) {
    console.error(`Error calculating progress for story ${storyId}:`, error);
    return 0;
  }
}

/**
 * Get overall progress across all stories
 * @param {Object} userProgress User progress data
 * @returns {Promise<Object>} Overall progress statistics
 */
export async function getOverallProgress(userProgress = {}) {
  return StoryManager.calculateOverallProgress(userProgress);
}

/**
 * Initialize the complete story system
 * This should be called once during app startup
 */
export async function initializeStorySystem() {
  try {
    console.log('Initializing story system...');
    
    // Initialize the StoryManager
    await StoryManager.initialize();
    
    // Register all stories  
    await registerAllStories();
    
    console.log('Story system initialized successfully!');
    return true;
    
  } catch (error) {
    console.error('Failed to initialize story system:', error);
    throw error;
  }
}

/**
 * Get system status for debugging
 * @returns {Object} Current system status
 */
export function getSystemStatus() {
  return {
    storyManager: StoryManager.getStatus(),
    availableStories: getAllStoriesMetadata()
  };
}

// Export StoryManager for direct access if needed
export { StoryManager } from '../services/story/StoryManager.js';