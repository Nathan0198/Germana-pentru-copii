/**
 * Story Interface - Abstract base class defining the contract for all story modules
 * All story classes must extend this interface and implement required methods
 */
export class StoryInterface {
  constructor(storyId) {
    if (this.constructor === StoryInterface) {
      throw new Error("StoryInterface is abstract and cannot be instantiated directly");
    }
    this.storyId = storyId;
  }

  /**
   * Get story metadata (title, description, difficulty, etc.)
   * @returns {Object} Story metadata
   */
  getMetadata() {
    throw new Error("getMetadata() must be implemented by story classes");
  }

  /**
   * Get all lessons in this story
   * @returns {Array} Array of lesson objects
   */
  getLessons() {
    throw new Error("getLessons() must be implemented by story classes");
  }

  /**
   * Get all characters in this story
   * @returns {Object} Characters object with character data
   */
  getCharacters() {
    throw new Error("getCharacters() must be implemented by story classes");
  }

  /**
   * Get all games for this story
   * @returns {Array} Array of game configurations
   */
  getGames() {
    throw new Error("getGames() must be implemented by story classes");
  }

  /**
   * Get audio configuration for this story
   * @returns {Object} Audio configuration object
   */
  getAudioConfig() {
    throw new Error("getAudioConfig() must be implemented by story classes");
  }

  /**
   * Get story progress for a user
   * @param {Object} userProgress - User's progress data
   * @returns {Object} Progress information
   */
  getProgress(userProgress = {}) {
    throw new Error("getProgress() must be implemented by story classes");
  }

  /**
   * Get vocabulary from all lessons in this story
   * @returns {Array} Combined vocabulary array
   */
  getVocabulary() {
    throw new Error("getVocabulary() must be implemented by story classes");
  }

  /**
   * Check if story is unlocked for user
   * @param {Object} userProgress - User's progress data
   * @returns {boolean} True if unlocked
   */
  isUnlocked(userProgress = {}) {
    throw new Error("isUnlocked() must be implemented by story classes");
  }

  /**
   * Initialize story (async setup if needed)
   * @returns {Promise} Initialization promise
   */
  async initialize() {
    throw new Error("initialize() must be implemented by story classes");
  }

  /**
   * Validate story data integrity
   * @returns {Object} Validation result
   */
  validate() {
    throw new Error("validate() must be implemented by story classes");
  }
}