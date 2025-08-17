import { StoryInterface } from './StoryInterface.js';

/**
 * Base implementation for all story modules
 * Provides common functionality and utilities for story management
 */
export class BaseStory extends StoryInterface {
  constructor(storyId) {
    super(storyId);
    this.metadata = null;
    this.lessons = [];
    this.characters = {};
    this.themes = {};
    this.games = [];
    this.audioConfig = {};
    this.unlockRequirements = {};
  }

  /**
   * Initialize story with data
   * @param {Object} storyData Complete story configuration
   */
  async initializeWithData(storyData) {
    this.metadata = storyData.metadata;
    this.lessons = storyData.lessons || [];
    this.characters = storyData.characters || {};
    this.themes = storyData.themes || {};
    this.games = storyData.games || [];
    this.audioConfig = storyData.audioConfig || {};
    this.unlockRequirements = storyData.unlockRequirements || {};
    
    await this.initialize();
  }

  getMetadata() {
    return this.metadata;
  }

  getLessons() {
    return this.lessons;
  }

  getCharacters() {
    return this.characters;
  }

  getThemes() {
    return this.themes;
  }

  getGames() {
    return this.games;
  }

  getAudioConfig() {
    return this.audioConfig;
  }

  getUnlockRequirements() {
    return this.unlockRequirements;
  }

  /**
   * Calculate story completion percentage based on user progress
   * @param {Object} userProgress User progress data from AsyncStorage
   * @returns {number} Completion percentage (0-100)
   */
  calculateProgress(userProgress = {}) {
    const storyProgress = userProgress[this.storyId] || {};
    const lessons = this.getLessons();
    
    if (!lessons || lessons.length === 0) {
      return 0;
    }

    let completedLessons = 0;
    let totalGames = 0;
    let completedGames = 0;

    lessons.forEach(lesson => {
      const lessonProgress = storyProgress[`lesson_${lesson.id}`] || {};
      
      // Check if lesson story is completed
      if (lessonProgress.storyCompleted) {
        completedLessons++;
      }

      // Count games
      const lessonGames = lesson.games || [];
      totalGames += lessonGames.length;
      
      lessonGames.forEach(game => {
        if (lessonProgress.games && lessonProgress.games[game.type]) {
          completedGames++;
        }
      });
    });

    // Calculate weighted progress: 60% lessons, 40% games
    const lessonProgress = lessons.length > 0 ? (completedLessons / lessons.length) * 60 : 0;
    const gameProgress = totalGames > 0 ? (completedGames / totalGames) * 40 : 0;
    
    return Math.round(lessonProgress + gameProgress);
  }

  /**
   * Check if story should be unlocked based on requirements
   * @param {Object} userProgress User progress data
   * @returns {boolean} True if story should be unlocked
   */
  isUnlocked(userProgress = {}) {
    const requirements = this.getUnlockRequirements();
    
    // No requirements means always unlocked
    if (!requirements || Object.keys(requirements).length === 0) {
      return true;
    }

    // Check prerequisite stories
    if (requirements.prerequisiteStories) {
      for (const prereqStoryId of requirements.prerequisiteStories) {
        const prereqProgress = userProgress[prereqStoryId];
        if (!prereqProgress || !prereqProgress.completed) {
          return false;
        }
      }
    }

    // Check minimum completion percentage for prerequisite stories
    if (requirements.minimumProgress) {
      for (const [storyId, minPercentage] of Object.entries(requirements.minimumProgress)) {
        const storyProgress = userProgress[storyId];
        if (!storyProgress || (storyProgress.completionPercentage || 0) < minPercentage) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Get lesson by ID
   * @param {number} lessonId Lesson ID to find
   * @returns {Object|null} Lesson object or null if not found
   */
  getLessonById(lessonId) {
    return this.lessons.find(lesson => lesson.id === lessonId) || null;
  }

  /**
   * Get next lesson after given lesson ID
   * @param {number} currentLessonId Current lesson ID
   * @returns {Object|null} Next lesson or null if at end
   */
  getNextLesson(currentLessonId) {
    const currentIndex = this.lessons.findIndex(lesson => lesson.id === currentLessonId);
    if (currentIndex >= 0 && currentIndex < this.lessons.length - 1) {
      return this.lessons[currentIndex + 1];
    }
    return null;
  }

  /**
   * Get previous lesson before given lesson ID
   * @param {number} currentLessonId Current lesson ID
   * @returns {Object|null} Previous lesson or null if at beginning
   */
  getPreviousLesson(currentLessonId) {
    const currentIndex = this.lessons.findIndex(lesson => lesson.id === currentLessonId);
    if (currentIndex > 0) {
      return this.lessons[currentIndex - 1];
    }
    return null;
  }

  /**
   * Generate vocabulary list for all lessons in story
   * @returns {Array} Array of vocabulary objects
   */
  getAllVocabulary() {
    const vocabulary = [];
    const seen = new Set();

    this.lessons.forEach(lesson => {
      if (lesson.vocabulary) {
        lesson.vocabulary.forEach(word => {
          const key = `${word.german}-${word.romanian}`;
          if (!seen.has(key)) {
            seen.add(key);
            vocabulary.push({
              ...word,
              lessonId: lesson.id,
              storyId: this.storyId
            });
          }
        });
      }
    });

    return vocabulary;
  }

  /**
   * Get audio file path for given audio key
   * @param {string} audioKey Audio file key
   * @returns {string} Full path to audio file
   */
  getAudioPath(audioKey) {
    const audioConfig = this.getAudioConfig();
    const basePath = audioConfig.basePath || `/assets/audio/lessons/${this.storyId}`;
    
    if (audioConfig.files && audioConfig.files[audioKey]) {
      return `${basePath}/${audioConfig.files[audioKey]}`;
    }
    
    // Fallback to standard naming convention
    return `${basePath}/${audioKey}.mp3`;
  }

  /**
   * Validate story configuration
   * @returns {Object} Validation result
   */
  validate() {
    const baseValidation = super.validate();
    const errors = [...baseValidation.errors];

    // Additional validation for BaseStory
    this.lessons.forEach((lesson, index) => {
      if (!lesson.id || !lesson.title) {
        errors.push(`Lesson ${index}: missing id or title`);
      }
      
      if (!lesson.story || !lesson.story.scenes || lesson.story.scenes.length === 0) {
        errors.push(`Lesson ${index}: missing story scenes`);
      }
      
      if (!lesson.vocabulary || lesson.vocabulary.length === 0) {
        errors.push(`Lesson ${index}: missing vocabulary`);
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }
}