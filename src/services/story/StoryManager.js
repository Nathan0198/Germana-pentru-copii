/**
 * StoryManager - Central service for managing story registration, loading, and access
 * Handles dynamic story loading, dependency management, and story orchestration
 */
class StoryManagerClass {
  constructor() {
    this.registeredStories = new Map();
    this.loadedStories = new Map();
    this.storyOrder = [];
    this.initialized = false;
  }

  /**
   * Initialize the StoryManager and load all stories
   */
  async initialize() {
    if (this.initialized) return;
    
    try {
      // Register all story modules
      await this.registerAllStories();
      
      // Load all stories in correct order
      await this.loadAllStories();
      
      this.initialized = true;
      console.log('StoryManager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize StoryManager:', error);
      throw error;
    }
  }

  /**
   * Register all available story modules
   */
  async registerAllStories() {
    // Import all story classes
    const { JocuriActivitatiStory } = await import('../../stories/jocuri_activitati/JocuriActivitatiStory.js');
    const { FamiliaExtinsaStory } = await import('../../stories/familia_extinsa/FamiliaExtinsaStory.js');
    const { ViataZilnicaStory } = await import('../../stories/viata_zilnica/ViataZilnicaStory.js');
    const { IesiriActivitatiStory } = await import('../../stories/iesiri_activitati/IesiriActivitatiStory.js');
    const { ComunicareCalatoriiStory } = await import('../../stories/comunicare_calatorii/ComunicareCalatoriiStory.js');

    // Register stories in order
    await this.registerStory('jocuri_activitati', JocuriActivitatiStory, { order: 2 });
    await this.registerStory('familia_extinsa', FamiliaExtinsaStory, { order: 3 });
    await this.registerStory('viata_zilnica', ViataZilnicaStory, { order: 4 });
    await this.registerStory('iesiri_activitati', IesiriActivitatiStory, { order: 5 });
    await this.registerStory('comunicare_calatorii', ComunicareCalatoriiStory, { order: 6 });
  }

  /**
   * Register a story class
   */
  async registerStory(storyId, StoryClass, options = {}) {
    if (this.registeredStories.has(storyId)) {
      console.warn(`Story "${storyId}" is already registered. Skipping.`);
      return;
    }

    this.registeredStories.set(storyId, {
      StoryClass,
      options,
      loaded: false
    });

    // Update story order
    if (options.order) {
      this.storyOrder[options.order - 1] = storyId;
    }

    console.log(`Registered story: ${storyId}`);
  }

  /**
   * Load all registered stories
   */
  async loadAllStories() {
    // Sort stories by order
    const orderedStories = this.storyOrder.filter(id => id && this.registeredStories.has(id));
    
    for (const storyId of orderedStories) {
      try {
        await this.loadStory(storyId);
      } catch (error) {
        console.error(`Failed to load story "${storyId}":`, error);
        throw error;
      }
    }
  }

  /**
   * Load a specific story
   */
  async loadStory(storyId) {
    const registration = this.registeredStories.get(storyId);
    if (!registration) {
      throw new Error(`Story "${storyId}" is not registered`);
    }

    if (registration.loaded) {
      return this.loadedStories.get(storyId);
    }

    try {
      // Load dependencies first
      await this.loadDependencies(storyId);

      // Create and initialize story instance
      const storyInstance = new registration.StoryClass(storyId);
      await storyInstance.initialize();

      // Cache loaded story
      this.loadedStories.set(storyId, storyInstance);
      registration.loaded = true;

      console.log(`Loaded story: ${storyId}`);
      return storyInstance;
    } catch (error) {
      console.error(`Error loading story "${storyId}":`, error);
      throw error;
    }
  }

  /**
   * Load story dependencies
   */
  async loadDependencies(storyId) {
    const registration = this.registeredStories.get(storyId);
    if (!registration) return;

    // For now, dependencies are implicitly managed by the order
    // Future enhancement: explicit dependency declarations
    return Promise.resolve();
  }

  /**
   * Get a loaded story instance
   */
  getStory(storyId) {
    this.ensureInitialized();
    
    const story = this.loadedStories.get(storyId);
    if (!story) {
      throw new Error(`Story "${storyId}" is not loaded. Call loadStory() first.`);
    }
    return story;
  }

  /**
   * Get all loaded stories
   */
  getAllStories() {
    this.ensureInitialized();
    return Array.from(this.loadedStories.values());
  }

  /**
   * Get stories by order
   */
  getStoriesInOrder() {
    this.ensureInitialized();
    return this.storyOrder
      .filter(id => id && this.loadedStories.has(id))
      .map(id => this.loadedStories.get(id));
  }

  /**
   * Get story metadata for all stories
   */
  getAllStoryMetadata() {
    this.ensureInitialized();
    return this.getAllStories().map(story => story.getMetadata());
  }

  /**
   * Get unlocked stories for a user
   */
  getUnlockedStories(userProgress = {}) {
    this.ensureInitialized();
    return this.getAllStories().filter(story => story.isUnlocked(userProgress));
  }

  /**
   * Get story progress for all stories
   */
  getAllProgress(userProgress = {}) {
    this.ensureInitialized();
    const progressData = {};
    
    this.getAllStories().forEach(story => {
      const storyId = story.getMetadata().id;
      progressData[storyId] = story.getProgress(userProgress);
    });
    
    return progressData;
  }

  /**
   * Get lesson by story and lesson ID
   */
  getLesson(storyId, lessonId) {
    const story = this.getStory(storyId);
    return story.getLessonSafe(lessonId);
  }

  /**
   * Get character from any story
   */
  getCharacter(characterId, preferredStoryId = null) {
    this.ensureInitialized();
    
    // Try preferred story first
    if (preferredStoryId && this.loadedStories.has(preferredStoryId)) {
      try {
        return this.loadedStories.get(preferredStoryId).getCharacter(characterId);
      } catch (error) {
        // Character not found in preferred story, continue searching
      }
    }
    
    // Search in all stories
    for (const story of this.getAllStories()) {
      try {
        return story.getCharacter(characterId);
      } catch (error) {
        // Character not found in this story, continue
      }
    }
    
    throw new Error(`Character "${characterId}" not found in any loaded story`);
  }

  /**
   * Get all vocabulary from all stories
   */
  getAllVocabulary() {
    this.ensureInitialized();
    const vocabulary = [];
    
    this.getAllStories().forEach(story => {
      vocabulary.push(...story.getVocabulary());
    });
    
    return vocabulary;
  }

  /**
   * Get vocabulary by category
   */
  getVocabularyByCategory() {
    const vocabulary = this.getAllVocabulary();
    const categorized = {};
    
    vocabulary.forEach(word => {
      const category = word.category || 'uncategorized';
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(word);
    });
    
    return categorized;
  }

  /**
   * Search lessons by criteria
   */
  searchLessons(criteria = {}) {
    this.ensureInitialized();
    let lessons = [];
    
    // Collect all lessons from all stories
    this.getAllStories().forEach(story => {
      const storyLessons = story.getLessons().map(lesson => ({
        ...lesson,
        storyId: story.getMetadata().id,
        storyName: story.getMetadata().name
      }));
      lessons.push(...storyLessons);
    });
    
    // Apply filters
    if (criteria.title) {
      const searchTerm = criteria.title.toLowerCase();
      lessons = lessons.filter(lesson => 
        lesson.title.toLowerCase().includes(searchTerm) ||
        lesson.subtitle?.toLowerCase().includes(searchTerm)
      );
    }
    
    if (criteria.difficulty) {
      lessons = lessons.filter(lesson => lesson.difficulty === criteria.difficulty);
    }
    
    if (criteria.maxDuration) {
      lessons = lessons.filter(lesson => lesson.duration <= criteria.maxDuration);
    }
    
    return lessons;
  }

  /**
   * Get global statistics
   */
  getGlobalStatistics() {
    this.ensureInitialized();
    const stories = this.getAllStories();
    
    const stats = {
      totalStories: stories.length,
      totalLessons: 0,
      totalVocabulary: 0,
      totalCharacters: 0,
      totalGames: 0,
      totalDuration: 0,
      difficulties: {}
    };
    
    stories.forEach(story => {
      const storyStats = story.getStatistics();
      stats.totalLessons += storyStats.totalLessons;
      stats.totalVocabulary += storyStats.totalVocabulary;
      stats.totalCharacters += storyStats.totalCharacters;
      stats.totalGames += storyStats.totalGames;
      stats.totalDuration += storyStats.estimatedDuration;
      
      const difficulty = storyStats.difficulty;
      stats.difficulties[difficulty] = (stats.difficulties[difficulty] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Validate all stories
   */
  validateAllStories() {
    this.ensureInitialized();
    const results = {};
    
    this.getAllStories().forEach(story => {
      const storyId = story.getMetadata().id;
      results[storyId] = story.validate();
    });
    
    return results;
  }

  /**
   * Ensure StoryManager is initialized
   */
  ensureInitialized() {
    if (!this.initialized) {
      throw new Error('StoryManager is not initialized. Call initialize() first.');
    }
  }

  /**
   * Check if story exists
   */
  hasStory(storyId) {
    return this.loadedStories.has(storyId);
  }

  /**
   * Get story count
   */
  getStoryCount() {
    return this.loadedStories.size;
  }

  /**
   * Reload a specific story
   */
  async reloadStory(storyId) {
    const registration = this.registeredStories.get(storyId);
    if (!registration) {
      throw new Error(`Story "${storyId}" is not registered`);
    }

    // Remove from loaded stories
    this.loadedStories.delete(storyId);
    registration.loaded = false;

    // Reload
    return await this.loadStory(storyId);
  }

  /**
   * Clear all loaded stories (useful for testing/development)
   */
  clear() {
    this.loadedStories.clear();
    this.registeredStories.clear();
    this.storyOrder = [];
    this.initialized = false;
  }
}

// Export singleton instance
export const StoryManager = new StoryManagerClass();