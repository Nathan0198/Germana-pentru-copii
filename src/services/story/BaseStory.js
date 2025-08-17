/**
 * MiniDeutsch Base Story Class
 * Provides common functionality for all story modules
 */

import { StoryInterface } from './StoryInterface';
import ProgressService from '../ProgressService';

export class BaseStory extends StoryInterface {
  constructor() {
    super();
    this.metadata = null;
    this.lessons = [];
    this.characters = [];
    this.theme = {};
    this.unlockRequirements = {};
    this.rewards = {};
    this.resources = new Map(); // For caching audio, images, etc.
    this.isInitialized = false;
  }

  /**
   * Initialize the story with data
   * @param {Object} storyData - Story configuration data
   */
  async initializeWithData(storyData) {
    try {
      this.metadata = storyData.metadata || {};
      this.lessons = storyData.lessons || [];
      this.characters = storyData.characters || [];
      this.theme = storyData.theme || {};
      this.unlockRequirements = storyData.unlockRequirements || {};
      this.rewards = storyData.rewards || {};

      // Validate required data
      this.validateStoryData();

      // Pre-process lessons
      this.preprocessLessons();

      // Cache resources if needed
      await this.cacheResources();

      this.isInitialized = true;
      console.log(`✅ Story "${this.metadata.name}" initialized`);

    } catch (error) {
      console.error(`❌ Error initializing story:`, error);
      throw error;
    }
  }

  /**
   * Get story metadata
   * @returns {Object} Story metadata
   */
  getMetadata() {
    return {
      id: this.metadata.id,
      name: this.metadata.name,
      title: this.metadata.title,
      subtitle: this.metadata.subtitle,
      description: this.metadata.description,
      version: this.metadata.version || '1.0.0',
      author: this.metadata.author || 'MiniDeutsch Team',
      totalLessons: this.lessons.length,
      difficulty: this.metadata.difficulty || 'beginner',
      tags: this.metadata.tags || [],
      dependencies: this.metadata.dependencies || [],
      estimatedDuration: this.calculateEstimatedDuration(),
      language: this.metadata.language || 'german',
      targetAge: this.metadata.targetAge || { min: 4, max: 10 }
    };
  }

  /**
   * Get all lessons in this story
   * @returns {Array} Array of lesson objects
   */
  getLessons() {
    return [...this.lessons];
  }

  /**
   * Get lesson by ID
   * @param {number} lessonId - The lesson ID
   * @returns {Object|null} Lesson object or null if not found
   */
  getLesson(lessonId) {
    return this.lessons.find(lesson => lesson.id === lessonId) || null;
  }

  /**
   * Get story characters
   * @returns {Array} Array of character objects
   */
  getCharacters() {
    return [...this.characters];
  }

  /**
   * Check if story is unlocked for user
   * @param {Object} userProgress - User's progress data
   * @returns {boolean} True if story is unlocked
   */
  isUnlocked(userProgress = {}) {
    // First story is always unlocked
    if (this.metadata.id === 'castle' || this.unlockRequirements.alwaysUnlocked) {
      return true;
    }

    // Check lesson completion requirements
    if (this.unlockRequirements.requiredLessons) {
      const completedLessons = userProgress.completedLessons || [];
      const requiredLessons = this.unlockRequirements.requiredLessons;
      
      const completed = requiredLessons.every(lessonId => 
        completedLessons.includes(lessonId)
      );
      
      if (!completed) return false;
    }

    // Check story completion requirements
    if (this.unlockRequirements.requiredStories) {
      const completedStories = userProgress.completedStories || [];
      const requiredStories = this.unlockRequirements.requiredStories;
      
      const completed = requiredStories.every(storyId => 
        completedStories.includes(storyId)
      );
      
      if (!completed) return false;
    }

    // Check minimum score requirements
    if (this.unlockRequirements.minimumScore) {
      const userStats = userProgress.statistics || {};
      const averageScore = userStats.averageScore || 0;
      
      if (averageScore < this.unlockRequirements.minimumScore) {
        return false;
      }
    }

    // Check badge requirements
    if (this.unlockRequirements.requiredBadges) {
      const userBadges = userProgress.badges || [];
      const requiredBadges = this.unlockRequirements.requiredBadges;
      
      const hasBadges = requiredBadges.every(badgeId => 
        userBadges.some(badge => badge.id === badgeId)
      );
      
      if (!hasBadges) return false;
    }

    return true;
  }

  /**
   * Get unlock requirements for this story
   * @returns {Object} Unlock requirements
   */
  getUnlockRequirements() {
    return { ...this.unlockRequirements };
  }

  /**
   * Calculate progress for this story
   * @param {Object} userProgress - User's progress data
   * @returns {Object} Progress statistics
   */
  calculateProgress(userProgress = {}) {
    const completedLessons = userProgress.completedLessons || [];
    const lessonScores = userProgress.lessonScores || {};
    
    const storyLessons = this.lessons.map(lesson => lesson.id);
    const completedInStory = storyLessons.filter(lessonId => 
      completedLessons.includes(lessonId)
    );
    
    const totalScore = storyLessons.reduce((sum, lessonId) => {
      return sum + (lessonScores[lessonId] || 0);
    }, 0);
    
    const averageScore = storyLessons.length > 0 ? totalScore / storyLessons.length : 0;
    
    const totalStars = storyLessons.reduce((sum, lessonId) => {
      const score = lessonScores[lessonId] || 0;
      return sum + this.calculateStarsFromScore(score);
    }, 0);
    
    const maxStars = storyLessons.length * 3; // 3 stars per lesson
    
    return {
      completed: completedInStory.length,
      total: storyLessons.length,
      percentage: storyLessons.length > 0 ? (completedInStory.length / storyLessons.length) * 100 : 0,
      averageScore: Math.round(averageScore),
      totalStars,
      maxStars,
      isCompleted: completedInStory.length === storyLessons.length,
      nextLessonId: this.getNextLessonId(userProgress)
    };
  }

  /**
   * Get story theme configuration
   * @returns {Object} Theme configuration
   */
  getTheme() {
    return {
      color: this.theme.color || '#8B4513',
      backgroundColor: this.theme.backgroundColor || '#F5F5DC',
      textColor: this.theme.textColor || '#333',
      accentColor: this.theme.accentColor || '#FFD700',
      images: this.theme.images || {},
      sounds: this.theme.sounds || {},
      fonts: this.theme.fonts || {},
      animations: this.theme.animations || {}
    };
  }

  /**
   * Initialize story resources
   * @returns {Promise<void>}
   */
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log(`🔄 Initializing story: ${this.metadata.name}`);
      
      // Override in subclasses for custom initialization
      await this.customInitialize();
      
      this.isInitialized = true;
      console.log(`✅ Story initialized: ${this.metadata.name}`);
      
    } catch (error) {
      console.error(`❌ Error initializing story ${this.metadata.name}:`, error);
      throw error;
    }
  }

  /**
   * Custom initialization - override in subclasses
   * @returns {Promise<void>}
   */
  async customInitialize() {
    // Override in subclasses
  }

  /**
   * Cleanup story resources
   * @returns {Promise<void>}
   */
  async cleanup() {
    try {
      console.log(`🧹 Cleaning up story: ${this.metadata.name}`);
      
      // Clear cached resources
      this.resources.clear();
      
      // Override in subclasses for custom cleanup
      await this.customCleanup();
      
      this.isInitialized = false;
      console.log(`✅ Story cleaned up: ${this.metadata.name}`);
      
    } catch (error) {
      console.error(`❌ Error cleaning up story ${this.metadata.name}:`, error);
    }
  }

  /**
   * Custom cleanup - override in subclasses
   * @returns {Promise<void>}
   */
  async customCleanup() {
    // Override in subclasses
  }

  /**
   * Get story completion rewards
   * @returns {Object} Rewards configuration
   */
  getRewards() {
    return {
      points: this.rewards.points || 500,
      badges: this.rewards.badges || [],
      unlocks: this.rewards.unlocks || [],
      achievements: this.rewards.achievements || []
    };
  }

  // Helper methods

  /**
   * Validate story data structure
   */
  validateStoryData() {
    if (!this.metadata.id || !this.metadata.name || !this.metadata.title) {
      throw new Error('Story must have id, name, and title in metadata');
    }
    
    if (!Array.isArray(this.lessons) || this.lessons.length === 0) {
      throw new Error('Story must have at least one lesson');
    }
    
    if (!Array.isArray(this.characters) || this.characters.length === 0) {
      throw new Error('Story must have at least one character');
    }
  }

  /**
   * Pre-process lessons (add indexes, validate, etc.)
   */
  preprocessLessons() {
    this.lessons.forEach((lesson, index) => {
      lesson.index = index;
      lesson.storyId = this.metadata.id;
      
      // Ensure lesson has required fields
      if (!lesson.id) {
        throw new Error(`Lesson at index ${index} missing id`);
      }
      
      if (!lesson.title) {
        throw new Error(`Lesson ${lesson.id} missing title`);
      }
    });
  }

  /**
   * Cache story resources (images, audio, etc.)
   * @returns {Promise<void>}
   */
  async cacheResources() {
    // Override in subclasses to implement resource caching
    console.log(`📦 Caching resources for story: ${this.metadata.name}`);
  }

  /**
   * Calculate estimated duration for the story
   * @returns {number} Duration in minutes
   */
  calculateEstimatedDuration() {
    return this.lessons.reduce((total, lesson) => {
      return total + (lesson.duration || 5); // Default 5 minutes per lesson
    }, 0);
  }

  /**
   * Calculate stars from score
   * @param {number} score - Lesson score (0-100)
   * @returns {number} Number of stars (0-3)
   */
  calculateStarsFromScore(score) {
    if (score >= 90) return 3;
    if (score >= 70) return 2;
    if (score >= 50) return 1;
    return 0;
  }

  /**
   * Get next lesson ID for user
   * @param {Object} userProgress - User's progress data
   * @returns {number|null} Next lesson ID or null if story complete
   */
  getNextLessonId(userProgress = {}) {
    const completedLessons = userProgress.completedLessons || [];
    
    for (const lesson of this.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        return lesson.id;
      }
    }
    
    return null; // Story completed
  }

  /**
   * Get resource from cache or load
   * @param {string} resourceId - Resource identifier
   * @param {Function} loader - Function to load resource if not cached
   * @returns {Promise<any>} Resource data
   */
  async getResource(resourceId, loader) {
    if (this.resources.has(resourceId)) {
      return this.resources.get(resourceId);
    }
    
    const resource = await loader();
    this.resources.set(resourceId, resource);
    return resource;
  }
}

export default BaseStory;