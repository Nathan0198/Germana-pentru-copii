/**
 * MiniDeutsch Stories Registry
 * Central registration point for all story modules
 */

import StoryManager from '../services/story/StoryManager';

// Import story modules
import CastleStory from './castle/CastleStory';
import ForestStory from './forest/ForestStory';

/**
 * Register all story modules with the StoryManager
 * This function should be called during app initialization
 */
export async function registerAllStories() {
  console.log('📚 Registering all story modules...');

  try {
    // Register Castle Story (first story, no dependencies)
    StoryManager.registerStory('castle', CastleStory, {
      dependencies: [],
      autoLoad: true, // Load immediately since it's the first story
      priority: 1
    });

    // Register Forest Story (second story, depends on castle)
    StoryManager.registerStory('forest', ForestStory, {
      dependencies: ['castle'],
      autoLoad: false,
      priority: 2
    });

    // TODO: Register additional stories as they are created

    // Set the story order (order in which stories should be played)
    StoryManager.setStoryOrder([
      'castle',
      'forest',
      'village', 
      'city',
      'ocean',
      'mountains',
      'space',
      'magic'
    ]);

    console.log('✅ All story modules registered successfully');
    
    // Optionally load the first story immediately
    await StoryManager.loadStory('castle');
    
  } catch (error) {
    console.error('❌ Error registering story modules:', error);
    throw error;
  }
}

/**
 * Create a new story using the template generator
 * This is a helper function for developers to quickly scaffold new stories
 * 
 * @param {Object} config - Story configuration
 * @returns {Object} Template files content
 */
export function createNewStory(config) {
  const { generateStoryTemplate } = require('../services/story/StoryTemplate');
  return generateStoryTemplate(config);
}

/**
 * Get available story templates for different types of stories
 * @returns {Array} Array of story template configurations
 */
export function getStoryTemplates() {
  return [
    {
      id: 'forest',
      name: 'Pădurea Cuvintelor',
      title: '🌲 Pădurea Cuvintelor',
      description: 'Continuă în pădurea magică cu noi prieteni!',
      difficulty: 'beginner',
      color: '#228B22',
      dependencies: ['castle'],
      totalLessons: 25
    },
    {
      id: 'village',
      name: 'Satul Prietenilor',
      title: '🏘️ Satul Prietenilor',
      description: 'Explorează satul și întâlnește noi prieteni!',
      difficulty: 'intermediate',
      color: '#FF6347',
      dependencies: ['forest'],
      totalLessons: 25
    },
    {
      id: 'city',
      name: 'Orașul Mare',
      title: '🏙️ Orașul Mare',
      description: 'Aventuri urbane și conversații complexe!',
      difficulty: 'intermediate',
      color: '#4682B4',
      dependencies: ['village'],
      totalLessons: 25
    },
    {
      id: 'ocean',
      name: 'Oceanul Cunoașterii',
      title: '🌊 Oceanul Cunoașterii',
      description: 'Înot în oceanul vast al cunoașterii!',
      difficulty: 'advanced',
      color: '#1E90FF',
      dependencies: ['city'],
      totalLessons: 25
    },
    {
      id: 'mountains',
      name: 'Munții Înțelepciunii',
      title: '⛰️ Munții Înțelepciunii',
      description: 'Urcă pe vârfurile cunoașterii!',
      difficulty: 'advanced',
      color: '#696969',
      dependencies: ['ocean'],
      totalLessons: 25
    },
    {
      id: 'space',
      name: 'Spațiul Cosmic',
      title: '🚀 Spațiul Cosmic',
      description: 'Explorează universul cuvintelor!',
      difficulty: 'expert',
      color: '#4B0082',
      dependencies: ['mountains'],
      totalLessons: 25
    },
    {
      id: 'magic',
      name: 'Tărâmul Magic',
      title: '✨ Tărâmul Magic',
      description: 'Magia finală a stăpânirii germanei!',
      difficulty: 'expert',
      color: '#800080',
      dependencies: ['space'],
      totalLessons: 25
    }
  ];
}

/**
 * Development helper: Generate all story templates
 * This function can be used during development to generate all story scaffolding
 */
export function generateAllStoryTemplates() {
  const templates = getStoryTemplates();
  const generatedStories = [];
  
  for (const template of templates) {
    const storyTemplate = createNewStory(template);
    generatedStories.push({
      ...template,
      files: storyTemplate
    });
  }
  
  return generatedStories;
}

/**
 * Get story metadata for UI components
 * @returns {Array} Array of story metadata objects
 */
export async function getStoriesMetadata() {
  await StoryManager.initialize();
  return await StoryManager.getAllStories(false);
}

/**
 * Get current story for user
 * @returns {Promise<Object|null>} Current story or null
 */
export async function getCurrentStory() {
  await StoryManager.initialize();
  return await StoryManager.getNextStory();
}

/**
 * Load specific story
 * @param {string} storyId - Story identifier
 * @returns {Promise<Object|null>} Story instance or null
 */
export async function loadStory(storyId) {
  await StoryManager.initialize();
  return await StoryManager.getStory(storyId);
}

export default {
  registerAllStories,
  createNewStory,
  getStoryTemplates,
  generateAllStoryTemplates,
  getStoriesMetadata,
  getCurrentStory,
  loadStory
};