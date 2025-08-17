import { StoryInterface } from './StoryInterface.js';

/**
 * BaseStory - Base implementation providing common functionality for all stories
 * Extends StoryInterface with default implementations and shared logic
 */
export class BaseStory extends StoryInterface {
  constructor(storyId) {
    super(storyId);
    this.metadata = null;
    this.lessons = [];
    this.characters = {};
    this.games = [];
    this.audioConfig = {};
    this.unlockRequirements = {};
    this.initialized = false;
  }

  /**
   * Initialize story with data - to be called by child classes
   */
  async initializeWithData(storyData) {
    this.metadata = storyData.metadata;
    this.lessons = storyData.lessons || [];
    this.characters = storyData.characters || {};
    this.games = storyData.games || [];
    this.audioConfig = storyData.audioConfig || {};
    this.unlockRequirements = storyData.unlockRequirements || {};
    
    // Validate story data
    const validation = this.validate();
    if (!validation.isValid) {
      throw new Error(`Story validation failed: ${validation.errors.join(', ')}`);
    }
    
    this.initialized = true;
  }

  /**
   * Custom initialization method - to be overridden by child classes
   */
  async customInitialize() {
    // Override in child classes
  }

  /**
   * Initialize story
   */
  async initialize() {
    if (this.initialized) return;
    await this.customInitialize();
  }

  /**
   * Get story metadata
   */
  getMetadata() {
    this.ensureInitialized();
    return this.metadata;
  }

  /**
   * Get all lessons in this story
   */
  getLessons() {
    this.ensureInitialized();
    return this.lessons;
  }

  /**
   * Get specific lesson by ID
   */
  getLesson(lessonId) {
    this.ensureInitialized();
    return this.lessons.find(lesson => lesson.id === lessonId);
  }

  /**
   * Get all characters in this story
   */
  getCharacters() {
    this.ensureInitialized();
    return this.characters;
  }

  /**
   * Get all games for this story
   */
  getGames() {
    this.ensureInitialized();
    return this.games;
  }

  /**
   * Get audio configuration for this story
   */
  getAudioConfig() {
    this.ensureInitialized();
    return this.audioConfig;
  }

  /**
   * Get vocabulary from all lessons in this story
   */
  getVocabulary() {
    this.ensureInitialized();
    const vocabulary = [];
    this.lessons.forEach(lesson => {
      if (lesson.vocabulary) {
        vocabulary.push(...lesson.vocabulary);
      }
    });
    return vocabulary;
  }

  /**
   * Calculate story progress for a user
   */
  getProgress(userProgress = {}) {
    this.ensureInitialized();
    
    const storyProgress = userProgress[this.storyId] || {};
    const completedLessons = Object.keys(storyProgress.lessons || {}).filter(
      lessonId => storyProgress.lessons[lessonId].completed
    ).length;
    
    const completedGames = Object.keys(storyProgress.games || {}).filter(
      gameId => storyProgress.games[gameId].completed
    ).length;
    
    const totalGames = this.lessons.reduce((total, lesson) => {
      return total + (lesson.games ? lesson.games.length : 0);
    }, 0);
    
    // Weighted progress: 60% lessons, 40% games
    const lessonProgress = this.lessons.length > 0 ? (completedLessons / this.lessons.length) * 60 : 0;
    const gameProgress = totalGames > 0 ? (completedGames / totalGames) * 40 : 0;
    
    return {
      totalProgress: Math.round(lessonProgress + gameProgress),
      lessonsCompleted: completedLessons,
      totalLessons: this.lessons.length,
      gamesCompleted: completedGames,
      totalGames: totalGames,
      lessonProgress: Math.round((completedLessons / this.lessons.length) * 100),
      gameProgress: totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0
    };
  }

  /**
   * Check if story is unlocked for user
   */
  isUnlocked(userProgress = {}) {
    this.ensureInitialized();
    
    // No requirements means always unlocked
    if (!this.unlockRequirements || Object.keys(this.unlockRequirements).length === 0) {
      return true;
    }
    
    // Check prerequisite stories
    if (this.unlockRequirements.prerequisiteStories) {
      for (const prerequisiteStoryId of this.unlockRequirements.prerequisiteStories) {
        const prerequisiteProgress = userProgress[prerequisiteStoryId];
        if (!prerequisiteProgress) return false;
        
        // Check minimum progress requirement
        const minimumProgress = this.unlockRequirements.minimumProgress?.[prerequisiteStoryId] || 0;
        const storyProgress = this.calculateStoryProgress(prerequisiteProgress);
        
        if (storyProgress < minimumProgress) return false;
      }
    }
    
    return true;
  }

  /**
   * Helper method to calculate progress from story progress data
   */
  calculateStoryProgress(storyProgressData) {
    if (!storyProgressData || !storyProgressData.lessons) return 0;
    
    const completedLessons = Object.keys(storyProgressData.lessons).filter(
      lessonId => storyProgressData.lessons[lessonId].completed
    ).length;
    
    const totalLessons = this.metadata.totalLessons || this.lessons.length;
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  }

  /**
   * Validate story data integrity
   */
  validate() {
    const errors = [];
    
    // Check metadata
    if (!this.metadata) {
      errors.push("Story metadata is missing");
    } else {
      if (!this.metadata.id) errors.push("Story ID is missing");
      if (!this.metadata.name) errors.push("Story name is missing");
      if (!this.metadata.description) errors.push("Story description is missing");
    }
    
    // Check lessons
    if (!Array.isArray(this.lessons) || this.lessons.length === 0) {
      errors.push("Story must have at least one lesson");
    } else {
      this.lessons.forEach((lesson, index) => {
        if (!lesson.id) errors.push(`Lesson ${index + 1} is missing ID`);
        if (!lesson.title) errors.push(`Lesson ${lesson.id || index + 1} is missing title`);
        if (!lesson.story) errors.push(`Lesson ${lesson.id || index + 1} is missing story content`);
        if (!lesson.vocabulary || !Array.isArray(lesson.vocabulary)) {
          errors.push(`Lesson ${lesson.id || index + 1} is missing vocabulary`);
        }
      });
    }
    
    // Check characters
    if (!this.characters || Object.keys(this.characters).length === 0) {
      errors.push("Story must have at least one character");
    }
    
    // Check audio config
    if (!this.audioConfig || !this.audioConfig.basePath) {
      errors.push("Audio configuration is missing or incomplete");
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Ensure story is initialized before accessing data
   */
  ensureInitialized() {
    if (!this.initialized) {
      throw new Error(`Story ${this.storyId} is not initialized. Call initialize() first.`);
    }
  }

  /**
   * Get lesson by ID with error checking
   */
  getLessonSafe(lessonId) {
    const lesson = this.getLesson(lessonId);
    if (!lesson) {
      throw new Error(`Lesson ${lessonId} not found in story ${this.storyId}`);
    }
    return lesson;
  }

  /**
   * Get character by ID with error checking
   */
  getCharacter(characterId) {
    this.ensureInitialized();
    const character = this.characters[characterId];
    if (!character) {
      throw new Error(`Character ${characterId} not found in story ${this.storyId}`);
    }
    return character;
  }

  /**
   * Get audio file path for a given audio key
   */
  getAudioPath(audioKey) {
    this.ensureInitialized();
    const audioFile = this.audioConfig.files?.[audioKey];
    if (!audioFile) {
      console.warn(`Audio file not found for key: ${audioKey}`);
      return null;
    }
    return `${this.audioConfig.basePath}/${audioFile}`;
  }

  /**
   * Get story statistics
   */
  getStatistics() {
    this.ensureInitialized();
    
    const totalVocabulary = this.getVocabulary().length;
    const totalScenes = this.lessons.reduce((total, lesson) => {
      return total + (lesson.story?.scenes?.length || 0);
    }, 0);
    
    const totalGames = this.lessons.reduce((total, lesson) => {
      return total + (lesson.games?.length || 0);
    }, 0);
    
    return {
      totalLessons: this.lessons.length,
      totalVocabulary,
      totalScenes,
      totalGames,
      totalCharacters: Object.keys(this.characters).length,
      estimatedDuration: this.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0),
      difficulty: this.metadata.difficulty || 'beginner'
    };
  }
}