/**
 * MiniDeutsch Story Interface
 * This interface defines the structure that every story module must implement
 */

export class StoryInterface {
  constructor() {
    if (this.constructor === StoryInterface) {
      throw new Error("StoryInterface is an abstract class and cannot be instantiated directly");
    }
  }

  /**
   * Story metadata - must be implemented by each story
   * @returns {Object} Story metadata
   */
  getMetadata() {
    throw new Error("getMetadata() must be implemented by story module");
  }

  /**
   * Get all lessons in this story
   * @returns {Array} Array of lesson objects
   */
  getLessons() {
    throw new Error("getLessons() must be implemented by story module");
  }

  /**
   * Get lesson by ID
   * @param {number} lessonId - The lesson ID
   * @returns {Object|null} Lesson object or null if not found
   */
  getLesson(lessonId) {
    throw new Error("getLesson() must be implemented by story module");
  }

  /**
   * Get story characters
   * @returns {Array} Array of character objects
   */
  getCharacters() {
    throw new Error("getCharacters() must be implemented by story module");
  }

  /**
   * Check if story is unlocked for user
   * @param {Object} userProgress - User's progress data
   * @returns {boolean} True if story is unlocked
   */
  isUnlocked(userProgress = {}) {
    throw new Error("isUnlocked() must be implemented by story module");
  }

  /**
   * Get unlock requirements for this story
   * @returns {Object} Unlock requirements
   */
  getUnlockRequirements() {
    throw new Error("getUnlockRequirements() must be implemented by story module");
  }

  /**
   * Calculate progress for this story
   * @param {Object} userProgress - User's progress data
   * @returns {Object} Progress statistics
   */
  calculateProgress(userProgress = {}) {
    throw new Error("calculateProgress() must be implemented by story module");
  }

  /**
   * Get story theme configuration (colors, images, sounds)
   * @returns {Object} Theme configuration
   */
  getTheme() {
    throw new Error("getTheme() must be implemented by story module");
  }

  /**
   * Initialize story (load resources, etc.)
   * @returns {Promise<void>}
   */
  async initialize() {
    throw new Error("initialize() must be implemented by story module");
  }

  /**
   * Cleanup story resources
   * @returns {Promise<void>}
   */
  async cleanup() {
    throw new Error("cleanup() must be implemented by story module");
  }

  /**
   * Get story completion rewards
   * @returns {Object} Rewards configuration
   */
  getRewards() {
    throw new Error("getRewards() must be implemented by story module");
  }

  /**
   * Validate story data structure
   * @returns {Object} Validation result
   */
  validate() {
    try {
      const metadata = this.getMetadata();
      const lessons = this.getLessons();
      const characters = this.getCharacters();
      const theme = this.getTheme();

      const errors = [];

      // Validate metadata
      if (!metadata.id || !metadata.name || !metadata.title) {
        errors.push("Story metadata must include id, name, and title");
      }

      // Validate lessons
      if (!Array.isArray(lessons) || lessons.length === 0) {
        errors.push("Story must have at least one lesson");
      }

      // Validate characters
      if (!Array.isArray(characters) || characters.length === 0) {
        errors.push("Story must have at least one character");
      }

      // Validate theme
      if (!theme.color) {
        errors.push("Story theme must include color");
      }

      return {
        isValid: errors.length === 0,
        errors
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [`Validation failed: ${error.message}`]
      };
    }
  }
}

/**
 * Story metadata structure definition
 */
export const STORY_METADATA_SCHEMA = {
  id: "string", // Unique story identifier
  name: "string", // Story name
  title: "string", // Display title
  subtitle: "string", // Display subtitle
  description: "string", // Story description
  version: "string", // Story version
  author: "string", // Story author
  totalLessons: "number", // Total number of lessons
  difficulty: "string", // beginner, intermediate, advanced
  tags: "array", // Story tags
  dependencies: "array", // Required previous stories
  estimatedDuration: "number", // Estimated completion time in minutes
  language: "string", // Primary language
  targetAge: "object" // {min: number, max: number}
};

/**
 * Lesson structure definition
 */
export const LESSON_SCHEMA = {
  id: "number", // Unique lesson ID
  title: "string", // Lesson title
  subtitle: "string", // Lesson subtitle
  duration: "number", // Duration in minutes
  story: "object", // Story content with scenes
  vocabulary: "array", // Vocabulary words
  games: "array", // Associated games
  unlock_requirements: "object", // Requirements to unlock
  audio_files: "object", // Audio file mappings
  rewards: "object" // Lesson rewards
};

/**
 * Character structure definition
 */
export const CHARACTER_SCHEMA = {
  id: "string", // Unique character ID
  name: "string", // Character name
  emoji: "string", // Character emoji
  role: "string", // Character role (narrator, teacher, etc.)
  description: "string", // Character description
  voice_profile: "string", // Voice profile for TTS
  personality: "object" // Character personality traits
};

export default StoryInterface;