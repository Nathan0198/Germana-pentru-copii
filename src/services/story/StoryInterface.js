/**
 * Abstract base class that defines the interface all story modules must implement
 * This ensures consistency across all stories and provides a contract for the StoryManager
 */
export class StoryInterface {
  constructor(storyId) {
    if (this.constructor === StoryInterface) {
      throw new Error("StoryInterface cannot be instantiated directly");
    }
    this.storyId = storyId;
    this.initialized = false;
  }

  /**
   * Returns story metadata (id, name, description, etc.)
   * @returns {Object} Story metadata
   */
  getMetadata() {
    throw new Error("getMetadata() must be implemented by story classes");
  }

  /**
   * Returns all lessons for this story
   * @returns {Array} Array of lesson objects
   */
  getLessons() {
    throw new Error("getLessons() must be implemented by story classes");
  }

  /**
   * Returns all characters in this story
   * @returns {Object} Characters configuration
   */
  getCharacters() {
    throw new Error("getCharacters() must be implemented by story classes");
  }

  /**
   * Returns story themes and visual settings
   * @returns {Object} Theme configuration
   */
  getThemes() {
    throw new Error("getThemes() must be implemented by story classes");
  }

  /**
   * Returns available games for this story
   * @returns {Array} Array of game configurations
   */
  getGames() {
    throw new Error("getGames() must be implemented by story classes");
  }

  /**
   * Returns audio files configuration for this story
   * @returns {Object} Audio configuration
   */
  getAudioConfig() {
    throw new Error("getAudioConfig() must be implemented by story classes");
  }

  /**
   * Returns requirements to unlock this story
   * @returns {Object} Unlock requirements
   */
  getUnlockRequirements() {
    throw new Error("getUnlockRequirements() must be implemented by story classes");
  }

  /**
   * Calculates completion percentage for this story
   * @param {Object} progress User progress data
   * @returns {number} Completion percentage (0-100)
   */
  calculateProgress(progress) {
    throw new Error("calculateProgress() must be implemented by story classes");
  }

  /**
   * Validates if story is properly configured
   * @returns {Object} Validation result {valid: boolean, errors: string[]}
   */
  validate() {
    const errors = [];
    
    try {
      const metadata = this.getMetadata();
      if (!metadata || !metadata.id || !metadata.name) {
        errors.push("Invalid metadata: missing id or name");
      }
      
      const lessons = this.getLessons();
      if (!Array.isArray(lessons) || lessons.length === 0) {
        errors.push("No lessons defined");
      }

      const characters = this.getCharacters();
      if (!characters || typeof characters !== 'object') {
        errors.push("Invalid characters configuration");
      }

    } catch (error) {
      errors.push(`Validation error: ${error.message}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Initialize the story with any required setup
   * @returns {Promise} Initialization promise
   */
  async initialize() {
    if (this.initialized) {
      return;
    }
    
    await this.customInitialize();
    this.initialized = true;
  }

  /**
   * Custom initialization logic for each story
   * Override this method in story implementations
   */
  async customInitialize() {
    // Override in subclasses if needed
  }
}