/**
 * Central service for managing all story modules
 * Handles registration, loading, dependency management, and story access
 */
class StoryManagerClass {
  constructor() {
    this.stories = new Map();
    this.registeredStories = new Map();
    this.dependencies = new Map();
    this.initialized = false;
  }

  /**
   * Register a story class for dynamic loading
   * @param {string} storyId Unique story identifier
   * @param {Class} StoryClass Story class that extends BaseStory
   * @param {Object} options Registration options
   */
  async registerStory(storyId, StoryClass, options = {}) {
    if (this.registeredStories.has(storyId)) {
      console.warn(`Story ${storyId} is already registered`);
      return;
    }

    const registration = {
      StoryClass,
      options,
      loaded: false,
      instance: null
    };

    this.registeredStories.set(storyId, registration);
    
    // Store dependencies
    if (options.dependencies && options.dependencies.length > 0) {
      this.dependencies.set(storyId, options.dependencies);
    }

    // Auto-load if specified
    if (options.autoLoad) {
      await this.loadStory(storyId);
    }

    console.log(`Story ${storyId} registered successfully`);
  }

  /**
   * Load a story instance
   * @param {string} storyId Story to load
   * @returns {Promise<Object>} Story instance
   */
  async loadStory(storyId) {
    // Return existing instance if already loaded
    if (this.stories.has(storyId)) {
      return this.stories.get(storyId);
    }

    const registration = this.registeredStories.get(storyId);
    if (!registration) {
      throw new Error(`Story ${storyId} is not registered`);
    }

    // Load dependencies first
    await this.loadDependencies(storyId);

    // Create and initialize story instance
    const storyInstance = new registration.StoryClass(storyId);
    await storyInstance.initialize();

    // Validate story
    const validation = storyInstance.validate();
    if (!validation.valid) {
      console.error(`Story ${storyId} validation failed:`, validation.errors);
      throw new Error(`Story ${storyId} is not properly configured`);
    }

    // Store loaded instance
    this.stories.set(storyId, storyInstance);
    registration.loaded = true;
    registration.instance = storyInstance;

    console.log(`Story ${storyId} loaded successfully`);
    return storyInstance;
  }

  /**
   * Load story dependencies
   * @param {string} storyId Story whose dependencies to load
   */
  async loadDependencies(storyId) {
    const dependencies = this.dependencies.get(storyId);
    if (!dependencies || dependencies.length === 0) {
      return;
    }

    const loadPromises = dependencies.map(depId => {
      if (!this.stories.has(depId)) {
        return this.loadStory(depId);
      }
      return Promise.resolve(this.stories.get(depId));
    });

    await Promise.all(loadPromises);
    console.log(`Dependencies for ${storyId} loaded:`, dependencies);
  }

  /**
   * Get a loaded story instance
   * @param {string} storyId Story ID
   * @returns {Object|null} Story instance or null if not loaded
   */
  getStory(storyId) {
    return this.stories.get(storyId) || null;
  }

  /**
   * Get all registered story IDs
   * @returns {Array<string>} Array of story IDs
   */
  getRegisteredStoryIds() {
    return Array.from(this.registeredStories.keys());
  }

  /**
   * Get all loaded story instances
   * @returns {Map} Map of loaded stories
   */
  getLoadedStories() {
    return new Map(this.stories);
  }

  /**
   * Check if story is registered
   * @param {string} storyId Story ID to check
   * @returns {boolean} True if registered
   */
  isRegistered(storyId) {
    return this.registeredStories.has(storyId);
  }

  /**
   * Check if story is loaded
   * @param {string} storyId Story ID to check
   * @returns {boolean} True if loaded
   */
  isLoaded(storyId) {
    return this.stories.has(storyId);
  }

  /**
   * Get story metadata without loading full story
   * @param {string} storyId Story ID
   * @returns {Object|null} Basic story metadata
   */
  getStoryMetadata(storyId) {
    const story = this.getStory(storyId);
    if (story) {
      return story.getMetadata();
    }
    
    // If not loaded, return basic info from registration
    const registration = this.registeredStories.get(storyId);
    if (registration && registration.options.metadata) {
      return registration.options.metadata;
    }
    
    return null;
  }

  /**
   * Calculate progress across all stories
   * @param {Object} userProgress User progress data
   * @returns {Object} Overall progress statistics
   */
  calculateOverallProgress(userProgress = {}) {
    const loadedStories = Array.from(this.stories.values());
    let totalProgress = 0;
    let completedStories = 0;
    const storyProgress = {};

    loadedStories.forEach(story => {
      const progress = story.calculateProgress(userProgress);
      storyProgress[story.storyId] = progress;
      totalProgress += progress;
      
      if (progress >= 100) {
        completedStories++;
      }
    });

    const averageProgress = loadedStories.length > 0 
      ? Math.round(totalProgress / loadedStories.length) 
      : 0;

    return {
      averageProgress,
      completedStories,
      totalStories: loadedStories.length,
      storyProgress
    };
  }

  /**
   * Get unlocked stories based on user progress
   * @param {Object} userProgress User progress data
   * @returns {Array<string>} Array of unlocked story IDs
   */
  getUnlockedStories(userProgress = {}) {
    const unlocked = [];
    
    this.stories.forEach((story, storyId) => {
      if (story.isUnlocked(userProgress)) {
        unlocked.push(storyId);
      }
    });

    return unlocked;
  }

  /**
   * Get next recommended story for user
   * @param {Object} userProgress User progress data
   * @returns {string|null} Story ID of next recommended story
   */
  getNextRecommendedStory(userProgress = {}) {
    const unlocked = this.getUnlockedStories(userProgress);
    
    // Find story with lowest completion percentage among unlocked
    let nextStory = null;
    let lowestProgress = 100;

    unlocked.forEach(storyId => {
      const story = this.getStory(storyId);
      if (story) {
        const progress = story.calculateProgress(userProgress);
        if (progress < lowestProgress) {
          lowestProgress = progress;
          nextStory = storyId;
        }
      }
    });

    // If all unlocked stories are complete, recommend first locked story
    if (nextStory === null || lowestProgress >= 100) {
      for (const [storyId, story] of this.stories) {
        if (!story.isUnlocked(userProgress)) {
          return storyId;
        }
      }
    }

    return nextStory;
  }

  /**
   * Initialize the story management system
   */
  async initialize() {
    if (this.initialized) {
      return;
    }

    console.log('Initializing StoryManager...');
    this.initialized = true;
    console.log('StoryManager initialized successfully');
  }

  /**
   * Reset story manager (useful for testing)
   */
  reset() {
    this.stories.clear();
    this.registeredStories.clear();
    this.dependencies.clear();
    this.initialized = false;
    console.log('StoryManager reset');
  }

  /**
   * Get system status for debugging
   * @returns {Object} Current system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      registeredStories: this.getRegisteredStoryIds(),
      loadedStories: Array.from(this.stories.keys()),
      dependencies: Object.fromEntries(this.dependencies)
    };
  }
}

// Export singleton instance
export const StoryManager = new StoryManagerClass();
export default StoryManager;