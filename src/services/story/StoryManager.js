/**
 * MiniDeutsch Story Manager
 * Manages loading, registration, and access to story modules
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressService from '../ProgressService';
import { StoryInterface } from './StoryInterface';

class StoryManager {
  constructor() {
    this.stories = new Map(); // Map of story id -> story instance
    this.registeredStories = new Map(); // Map of story id -> story class
    this.loadedStories = new Set(); // Set of loaded story IDs
    this.storyOrder = []; // Order in which stories should be played
    this.initialized = false;
  }

  /**
   * Initialize the Story Manager
   */
  async initialize() {
    if (this.initialized) return;

    try {
      console.log('🎭 Initializing Story Manager...');
      
      // Load story registry from storage
      await this.loadStoryRegistry();
      
      // Load story order from storage
      await this.loadStoryOrder();
      
      // Auto-discover and register stories
      await this.discoverStories();
      
      this.initialized = true;
      console.log('✅ Story Manager initialized successfully');
      
    } catch (error) {
      console.error('❌ Error initializing Story Manager:', error);
      throw error;
    }
  }

  /**
   * Register a story module
   * @param {string} storyId - Story identifier
   * @param {Class} StoryClass - Story class that extends StoryInterface
   * @param {Object} options - Registration options
   */
  registerStory(storyId, StoryClass, options = {}) {
    try {
      // Validate that the class extends StoryInterface
      if (!(StoryClass.prototype instanceof StoryInterface)) {
        throw new Error(`Story ${storyId} must extend StoryInterface`);
      }

      console.log(`📚 Registering story: ${storyId}`);
      
      this.registeredStories.set(storyId, {
        StoryClass,
        options: {
          autoLoad: options.autoLoad || false,
          priority: options.priority || 0,
          dependencies: options.dependencies || [],
          ...options
        }
      });

      // Add to story order if not already present
      if (!this.storyOrder.includes(storyId)) {
        this.storyOrder.push(storyId);
      }

      // Save updated registry
      this.saveStoryRegistry();
      
      console.log(`✅ Story ${storyId} registered successfully`);
      
    } catch (error) {
      console.error(`❌ Error registering story ${storyId}:`, error);
      throw error;
    }
  }

  /**
   * Load a story module
   * @param {string} storyId - Story identifier
   * @returns {Promise<Object>} Story instance
   */
  async loadStory(storyId) {
    try {
      // Return if already loaded
      if (this.stories.has(storyId)) {
        return this.stories.get(storyId);
      }

      // Check if story is registered
      if (!this.registeredStories.has(storyId)) {
        throw new Error(`Story ${storyId} is not registered`);
      }

      console.log(`🔄 Loading story: ${storyId}`);
      
      const { StoryClass, options } = this.registeredStories.get(storyId);
      
      // Check dependencies
      for (const dependency of options.dependencies) {
        if (!this.stories.has(dependency)) {
          console.log(`📦 Loading dependency: ${dependency}`);
          await this.loadStory(dependency);
        }
      }

      // Create story instance
      const storyInstance = new StoryClass();
      
      // Validate story
      const validation = storyInstance.validate();
      if (!validation.isValid) {
        throw new Error(`Story ${storyId} validation failed: ${validation.errors.join(', ')}`);
      }

      // Initialize story
      await storyInstance.initialize();
      
      // Store story instance
      this.stories.set(storyId, storyInstance);
      this.loadedStories.add(storyId);
      
      console.log(`✅ Story ${storyId} loaded successfully`);
      return storyInstance;
      
    } catch (error) {
      console.error(`❌ Error loading story ${storyId}:`, error);
      throw error;
    }
  }

  /**
   * Unload a story module
   * @param {string} storyId - Story identifier
   */
  async unloadStory(storyId) {
    try {
      if (!this.stories.has(storyId)) {
        return;
      }

      console.log(`🔄 Unloading story: ${storyId}`);
      
      const story = this.stories.get(storyId);
      await story.cleanup();
      
      this.stories.delete(storyId);
      this.loadedStories.delete(storyId);
      
      console.log(`✅ Story ${storyId} unloaded successfully`);
      
    } catch (error) {
      console.error(`❌ Error unloading story ${storyId}:`, error);
    }
  }

  /**
   * Get a story instance
   * @param {string} storyId - Story identifier
   * @param {boolean} autoLoad - Whether to auto-load if not loaded
   * @returns {Promise<Object|null>} Story instance or null
   */
  async getStory(storyId, autoLoad = true) {
    if (this.stories.has(storyId)) {
      return this.stories.get(storyId);
    }

    if (autoLoad && this.registeredStories.has(storyId)) {
      return await this.loadStory(storyId);
    }

    return null;
  }

  /**
   * Get all available stories
   * @param {boolean} loadedOnly - Whether to return only loaded stories
   * @returns {Array} Array of story objects
   */
  async getAllStories(loadedOnly = false) {
    const stories = [];
    
    for (const storyId of this.storyOrder) {
      try {
        let story;
        
        if (loadedOnly && !this.loadedStories.has(storyId)) {
          continue;
        }
        
        story = await this.getStory(storyId);
        
        if (story) {
          const metadata = story.getMetadata();
          const userProgress = await ProgressService.getUserProgress();
          
          stories.push({
            ...metadata,
            isLoaded: this.loadedStories.has(storyId),
            isUnlocked: story.isUnlocked(userProgress),
            progress: story.calculateProgress(userProgress),
            theme: story.getTheme()
          });
        }
      } catch (error) {
        console.warn(`⚠️ Error getting story ${storyId}:`, error);
      }
    }
    
    return stories;
  }

  /**
   * Get the next available story for the user
   * @returns {Promise<Object|null>} Next story or null
   */
  async getNextStory() {
    const userProgress = await ProgressService.getUserProgress();
    
    for (const storyId of this.storyOrder) {
      try {
        const story = await this.getStory(storyId);
        
        if (story && story.isUnlocked(userProgress)) {
          const progress = story.calculateProgress(userProgress);
          
          // Return if story is not completed
          if (progress.percentage < 100) {
            return {
              ...story.getMetadata(),
              progress,
              theme: story.getTheme()
            };
          }
        }
      } catch (error) {
        console.warn(`⚠️ Error checking next story ${storyId}:`, error);
      }
    }
    
    return null;
  }

  /**
   * Set the order of stories
   * @param {Array} order - Array of story IDs in order
   */
  setStoryOrder(order) {
    this.storyOrder = [...order];
    this.saveStoryOrder();
  }

  /**
   * Get story order
   * @returns {Array} Array of story IDs in order
   */
  getStoryOrder() {
    return [...this.storyOrder];
  }

  /**
   * Auto-discover stories in the stories directory
   */
  async discoverStories() {
    try {
      // This would scan the stories directory for story modules
      // For now, we'll register the existing castle story
      console.log('🔍 Discovering stories...');
      
      // Import and register discovered stories
      // This is where you would dynamically import story modules
      
    } catch (error) {
      console.warn('⚠️ Error discovering stories:', error);
    }
  }

  /**
   * Load story registry from storage
   */
  async loadStoryRegistry() {
    try {
      const registry = await AsyncStorage.getItem('story_registry');
      if (registry) {
        const parsedRegistry = JSON.parse(registry);
        // Note: We can't store class constructors in AsyncStorage
        // This would store metadata about registered stories
        console.log('📖 Loaded story registry from storage');
      }
    } catch (error) {
      console.warn('⚠️ Error loading story registry:', error);
    }
  }

  /**
   * Save story registry to storage
   */
  async saveStoryRegistry() {
    try {
      const registryData = {};
      
      for (const [storyId, data] of this.registeredStories.entries()) {
        registryData[storyId] = {
          options: data.options,
          // Note: Can't serialize the class constructor
        };
      }
      
      await AsyncStorage.setItem('story_registry', JSON.stringify(registryData));
      console.log('💾 Saved story registry to storage');
      
    } catch (error) {
      console.warn('⚠️ Error saving story registry:', error);
    }
  }

  /**
   * Load story order from storage
   */
  async loadStoryOrder() {
    try {
      const order = await AsyncStorage.getItem('story_order');
      if (order) {
        this.storyOrder = JSON.parse(order);
        console.log('📖 Loaded story order from storage:', this.storyOrder);
      }
    } catch (error) {
      console.warn('⚠️ Error loading story order:', error);
    }
  }

  /**
   * Save story order to storage
   */
  async saveStoryOrder() {
    try {
      await AsyncStorage.setItem('story_order', JSON.stringify(this.storyOrder));
      console.log('💾 Saved story order to storage');
    } catch (error) {
      console.warn('⚠️ Error saving story order:', error);
    }
  }

  /**
   * Get statistics about loaded stories
   * @returns {Object} Statistics
   */
  getStatistics() {
    return {
      registeredStories: this.registeredStories.size,
      loadedStories: this.loadedStories.size,
      storyOrder: this.storyOrder.length,
      initialized: this.initialized
    };
  }

  /**
   * Cleanup all stories and reset manager
   */
  async cleanup() {
    console.log('🧹 Cleaning up Story Manager...');
    
    // Cleanup all loaded stories
    for (const [storyId, story] of this.stories.entries()) {
      try {
        await story.cleanup();
      } catch (error) {
        console.warn(`⚠️ Error cleaning up story ${storyId}:`, error);
      }
    }
    
    // Clear all data
    this.stories.clear();
    this.registeredStories.clear();
    this.loadedStories.clear();
    this.storyOrder = [];
    this.initialized = false;
    
    console.log('✅ Story Manager cleaned up');
  }
}

// Create singleton instance
const storyManager = new StoryManager();

export default storyManager;