/**
 * MiniDeutsch Modular App Data
 * New data structure that works with the modular story system
 * This replaces the old AppData.js for story-related functionality
 */

import StoryManager from '../services/story/StoryManager';
import { registerAllStories } from '../stories';

// Math levels remain the same as they're not part of the story system
export const MATH_LEVELS = [
  {
    id: 'basic',
    name: 'Numere și Operații de Bază',
    title: '🔢 Numere de Bază',
    subtitle: 'Nivel 1 - 50 exerciții',
    description: 'Învață numerele și operațiile simple!',
    color: '#FF4500',
    totalExercises: 50,
    isUnlocked: true,
    exercises: [], // Va fi adăugat când implementăm matematica
    characters: [
      { id: 'björn', name: 'Björn der Bär', emoji: '🐻', role: 'teacher' },
      { id: 'max', name: 'Max der Hase', emoji: '🐰', role: 'helper' }
    ]
  },
  {
    id: 'intermediate',
    name: 'Geometrie și Măsurări',
    title: '📐 Forme și Măsuri',
    subtitle: 'Nivel 2 - 50 exerciții',
    description: 'Explorează formele și măsurătorile!',
    color: '#32CD32',
    totalExercises: 50,
    isUnlocked: false,
    exercises: [],
    characters: [],
    comingSoon: true
  },
  {
    id: 'advanced',
    name: 'Probleme și Logică',
    title: '🧠 Probleme Logice',
    subtitle: 'Nivel 3 - 50 exerciții',
    description: 'Rezolvă probleme complexe!',
    color: '#9932CC',
    totalExercises: 50,
    isUnlocked: false,
    exercises: [],
    characters: [],
    comingSoon: true
  }
];

// Badge system - updated to work with modular stories
export const BADGE_SYSTEM = {
  german_badges: [
    // Castle story badges
    {
      id: 'friends_castle',
      name: 'Prietenii Castelului',
      description: 'Completează primele 10 lecții din Castelul Familiei',
      icon: '👫',
      requirements: { lessons_completed: 10, story: 'castle' },
      points: 100
    },
    {
      id: 'castle_explorer',
      name: 'Exploratorul Castelului',
      description: 'Completează lecțiile 11-20 din Castelul Familiei',
      icon: '🗝️',
      requirements: { lessons_completed: 20, story: 'castle' },
      points: 150
    },
    {
      id: 'castle_master',
      name: 'Maestrul Castelului',
      description: 'Completează toate cele 25 de lecții din Castelul Familiei',
      icon: '👑',
      requirements: { lessons_completed: 25, story: 'castle', minimum_score: 80 },
      points: 250
    },
    // General badges
    {
      id: 'pronunciation_expert',
      name: 'Expert în Pronunție',
      description: 'Obține scor perfect la 10 challenge-uri de pronunție',
      icon: '🎤',
      requirements: { perfect_pronunciation: 10 },
      points: 200
    },
    {
      id: 'vocabulary_champion',
      name: 'Campion la Vocabular',
      description: 'Învață 100 de cuvinte noi',
      icon: '📚',
      requirements: { vocabulary_learned: 100 },
      points: 300
    },
    {
      id: 'story_explorer',
      name: 'Exploratorul de Povești',
      description: 'Completează prima poveste',
      icon: '🗺️',
      requirements: { stories_completed: 1 },
      points: 400
    },
    {
      id: 'story_master',
      name: 'Maestrul Poveștilor',
      description: 'Completează 3 povești',
      icon: '📖',
      requirements: { stories_completed: 3 },
      points: 800
    }
  ],
  math_badges: [
    {
      id: 'number_ninja',
      name: 'Ninja al Numerelor',
      description: 'Completează primul nivel de matematică',
      icon: '🥷',
      requirements: { exercises_completed: 50, level: 'basic' },
      points: 200
    },
    {
      id: 'geometry_genius',
      name: 'Geniul Geometriei',
      description: 'Stăpânește formele și măsurătorile',
      icon: '📐',
      requirements: { exercises_completed: 50, level: 'intermediate' },
      points: 250
    },
    {
      id: 'logic_master',
      name: 'Maestrul Logicii',
      description: 'Rezolvă toate problemele logice',
      icon: '🧠',
      requirements: { exercises_completed: 50, level: 'advanced' },
      points: 300
    }
  ]
};

// Progress settings remain the same
export const PROGRESS_SETTINGS = {
  stars_per_lesson: 3,
  points_per_star: 10,
  bonus_points: {
    perfect_score: 20,
    first_try: 10,
    speed_bonus: 5,
    no_hints: 15
  },
  unlock_requirements: {
    story_completion_percentage: 80,
    minimum_lesson_score: 70,
    badge_requirements: true
  }
};

// Audio config remains the same
export const AUDIO_CONFIG = {
  characters: {
    björn: {
      voice_profile: 'warm_paternal',
      speed: 'normal',
      pitch: 'low'
    },
    emma: {
      voice_profile: 'melodic_friendly',
      speed: 'slightly_slow',
      pitch: 'medium'
    },
    max: {
      voice_profile: 'energetic_playful',
      speed: 'fast',
      pitch: 'high'
    }
  },
  languages: {
    german: {
      voice: 'german_native',
      clarity: 'high'
    },
    romanian: {
      voice: 'romanian_native',
      clarity: 'high'
    }
  }
};

// Supabase config remains the same
export const SUPABASE_CONFIG = {
  tables: {
    user_progress: 'user_progress',
    lesson_completions: 'lesson_completions',
    badge_achievements: 'badge_achievements',
    statistics: 'user_statistics',
    story_progress: 'story_progress' // New table for story-specific progress
  },
  sync_settings: {
    auto_sync: true,
    sync_interval: 300000,
    offline_mode: true
  }
};

/**
 * Initialize the modular app data system
 * This replaces the old static data loading
 */
export async function initializeModularAppData() {
  try {
    console.log('🚀 Initializing modular app data...');
    
    // Initialize story manager
    await StoryManager.initialize();
    
    // Register all stories
    await registerAllStories();
    
    console.log('✅ Modular app data initialized successfully');
    
  } catch (error) {
    console.error('❌ Error initializing modular app data:', error);
    throw error;
  }
}

/**
 * Get all German zones/stories dynamically from StoryManager
 * This replaces the old GERMAN_ZONES constant
 */
export async function getGermanZones() {
  try {
    await StoryManager.initialize();
    const stories = await StoryManager.getAllStories(false);
    
    return stories.map(story => ({
      id: story.id,
      name: story.name,
      title: story.title,
      subtitle: story.subtitle,
      description: story.description,
      color: story.theme.color,
      totalLessons: story.totalLessons,
      isUnlocked: story.isUnlocked,
      lessons: [], // Lessons are loaded on-demand from the story
      progress: story.progress,
      characters: [], // Characters are loaded from the story
      comingSoon: !story.isLoaded && !story.isUnlocked
    }));
    
  } catch (error) {
    console.error('❌ Error getting German zones:', error);
    return [];
  }
}

/**
 * Get a specific story/zone by ID
 * @param {string} storyId - Story identifier
 * @returns {Promise<Object|null>} Story data or null
 */
export async function getStoryById(storyId) {
  try {
    const story = await StoryManager.getStory(storyId);
    if (!story) return null;
    
    const metadata = story.getMetadata();
    const lessons = story.getLessons();
    const characters = story.getCharacters();
    const theme = story.getTheme();
    
    return {
      id: metadata.id,
      name: metadata.name,
      title: metadata.title,
      subtitle: metadata.subtitle,
      description: metadata.description,
      color: theme.color,
      totalLessons: metadata.totalLessons,
      isUnlocked: true, // If we can load it, it's unlocked
      lessons,
      characters,
      theme
    };
    
  } catch (error) {
    console.error(`❌ Error getting story ${storyId}:`, error);
    return null;
  }
}

/**
 * Get lesson by ID from any story
 * @param {number} lessonId - Lesson ID
 * @returns {Promise<Object|null>} Lesson data or null
 */
export async function getLessonById(lessonId) {
  try {
    const stories = await StoryManager.getAllStories(true); // Only loaded stories
    
    for (const storyMeta of stories) {
      const story = await StoryManager.getStory(storyMeta.id);
      if (story) {
        const lesson = story.getLesson(lessonId);
        if (lesson) {
          return lesson;
        }
      }
    }
    
    return null;
    
  } catch (error) {
    console.error(`❌ Error getting lesson ${lessonId}:`, error);
    return null;
  }
}

/**
 * Get character by ID from any story
 * @param {string} characterId - Character ID
 * @returns {Promise<Object|null>} Character data or null
 */
export async function getCharacterById(characterId) {
  try {
    const stories = await StoryManager.getAllStories(true);
    
    for (const storyMeta of stories) {
      const story = await StoryManager.getStory(storyMeta.id);
      if (story) {
        const characters = story.getCharacters();
        const character = characters.find(c => c.id === characterId);
        if (character) {
          return character;
        }
      }
    }
    
    return null;
    
  } catch (error) {
    console.error(`❌ Error getting character ${characterId}:`, error);
    return null;
  }
}

/**
 * Get lessons for a specific zone/story
 * @param {string} storyId - Story identifier
 * @returns {Promise<Array>} Array of lessons
 */
export async function getLessonsByZone(storyId) {
  try {
    const story = await StoryManager.getStory(storyId);
    return story ? story.getLessons() : [];
    
  } catch (error) {
    console.error(`❌ Error getting lessons for story ${storyId}:`, error);
    return [];
  }
}

/**
 * Check if a lesson is unlocked
 * @param {number} lessonId - Lesson ID
 * @param {Object} userProgress - User progress data
 * @returns {Promise<boolean>} True if lesson is unlocked
 */
export async function isLessonUnlocked(lessonId, userProgress = {}) {
  try {
    const lesson = await getLessonById(lessonId);
    if (!lesson) return false;
    
    // First lesson is always unlocked
    if (lessonId === 1) return true;
    
    // Check if previous lesson is completed
    if (lesson.unlock_requirements?.lesson_completed) {
      const requiredLessonId = lesson.unlock_requirements.lesson_completed;
      return userProgress.completedLessons?.includes(requiredLessonId) || false;
    }
    
    return true;
    
  } catch (error) {
    console.error(`❌ Error checking if lesson ${lessonId} is unlocked:`, error);
    return false;
  }
}

/**
 * Calculate progress for a zone/story
 * @param {string} storyId - Story identifier
 * @param {Object} userProgress - User progress data
 * @returns {Promise<Object>} Progress statistics
 */
export async function calculateZoneProgress(storyId, userProgress = {}) {
  try {
    const story = await StoryManager.getStory(storyId);
    if (!story) return { completed: 0, total: 0, percentage: 0 };
    
    return story.calculateProgress(userProgress);
    
  } catch (error) {
    console.error(`❌ Error calculating progress for story ${storyId}:`, error);
    return { completed: 0, total: 0, percentage: 0 };
  }
}

/**
 * Get current/next story for user
 * @returns {Promise<Object|null>} Current story or null
 */
export async function getCurrentStory() {
  try {
    return await StoryManager.getNextStory();
  } catch (error) {
    console.error('❌ Error getting current story:', error);
    return null;
  }
}

/**
 * Get all characters from the first story (for HomeScreen compatibility)
 * @returns {Promise<Array>} Array of characters
 */
export async function getCharacters() {
  try {
    const castleStory = await StoryManager.getStory('castle');
    return castleStory ? castleStory.getCharacters() : [];
  } catch (error) {
    console.error('❌ Error getting characters:', error);
    return [];
  }
}

// Backward compatibility exports
export { MATH_LEVELS as MATH_LEVELS };
export { BADGE_SYSTEM };
export { PROGRESS_SETTINGS };
export { AUDIO_CONFIG };
export { SUPABASE_CONFIG };

// New modular exports
export {
  initializeModularAppData,
  getGermanZones,
  getStoryById,
  getLessonById,
  getCharacterById,
  getLessonsByZone,
  isLessonUnlocked,
  calculateZoneProgress,
  getCurrentStory,
  getCharacters
};