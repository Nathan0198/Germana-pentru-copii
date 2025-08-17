/**
 * MiniDeutsch Story Progression Service
 * Manages story unlocking, progression, and completion logic
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import StoryManager from './StoryManager';
import ProgressService from '../ProgressService';

class StoryProgressionService {
  constructor() {
    this.initialized = false;
    this.progressCache = new Map();
    this.unlockCallbacks = new Map(); // Callbacks for when stories unlock
  }

  /**
   * Initialize the Story Progression Service
   */
  async initialize() {
    if (this.initialized) return;

    try {
      console.log('🎯 Initializing Story Progression Service...');
      
      // Load cached progress
      await this.loadProgressCache();
      
      // Initialize story manager if not done
      await StoryManager.initialize();
      
      this.initialized = true;
      console.log('✅ Story Progression Service initialized');
      
    } catch (error) {
      console.error('❌ Error initializing Story Progression Service:', error);
      throw error;
    }
  }

  /**
   * Check story progression after lesson completion
   * @param {number} lessonId - Completed lesson ID
   * @param {number} score - Lesson score
   * @returns {Promise<Object>} Progression updates
   */
  async checkProgression(lessonId, score) {
    try {
      const userProgress = await ProgressService.getUserProgress();
      const progressionUpdates = {
        storiesUnlocked: [],
        storiesCompleted: [],
        badgesEarned: [],
        achievementsUnlocked: []
      };

      // Find which story this lesson belongs to
      const storyId = await this.getStoryForLesson(lessonId);
      if (!storyId) return progressionUpdates;

      const story = await StoryManager.getStory(storyId);
      if (!story) return progressionUpdates;

      // Update lesson completion
      await this.updateLessonCompletion(lessonId, score, storyId);

      // Check if story is completed
      const storyProgress = story.calculateProgress(userProgress);
      if (storyProgress.isCompleted && !userProgress.completedStories?.includes(storyId)) {
        await this.completeStory(storyId);
        progressionUpdates.storiesCompleted.push(storyId);
        
        // Award story completion badges and rewards
        const rewards = story.getRewards();
        progressionUpdates.badgesEarned.push(...rewards.badges);
      }

      // Check for newly unlocked stories
      const newlyUnlocked = await this.checkUnlockedStories(userProgress);
      progressionUpdates.storiesUnlocked.push(...newlyUnlocked);

      // Check for badge achievements
      const newBadges = await this.checkBadgeAchievements(userProgress, storyId);
      progressionUpdates.badgesEarned.push(...newBadges);

      // Save progression updates
      await this.saveProgressionUpdates(progressionUpdates);

      console.log(`📈 Progression check completed for lesson ${lessonId}:`, progressionUpdates);
      return progressionUpdates;

    } catch (error) {
      console.error(`❌ Error checking progression for lesson ${lessonId}:`, error);
      return {
        storiesUnlocked: [],
        storiesCompleted: [],
        badgesEarned: [],
        achievementsUnlocked: []
      };
    }
  }

  /**
   * Complete a story
   * @param {string} storyId - Story identifier
   */
  async completeStory(storyId) {
    try {
      const userProgress = await ProgressService.getUserProgress();
      const completedStories = userProgress.completedStories || [];
      
      if (!completedStories.includes(storyId)) {
        completedStories.push(storyId);
        
        await ProgressService.updateProgress({
          completedStories
        });

        // Award story completion rewards
        const story = await StoryManager.getStory(storyId);
        if (story) {
          const rewards = story.getRewards();
          await this.awardStoryRewards(storyId, rewards);
        }

        console.log(`🏆 Story completed: ${storyId}`);
        
        // Trigger unlock callbacks
        this.triggerUnlockCallbacks(storyId);
      }
      
    } catch (error) {
      console.error(`❌ Error completing story ${storyId}:`, error);
    }
  }

  /**
   * Update lesson completion
   * @param {number} lessonId - Lesson ID
   * @param {number} score - Lesson score
   * @param {string} storyId - Story ID
   */
  async updateLessonCompletion(lessonId, score, storyId) {
    try {
      const userProgress = await ProgressService.getUserProgress();
      
      // Update completed lessons
      const completedLessons = userProgress.completedLessons || [];
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
      }

      // Update lesson scores
      const lessonScores = userProgress.lessonScores || {};
      lessonScores[lessonId] = Math.max(lessonScores[lessonId] || 0, score);

      // Update story-specific progress
      const storyProgress = userProgress.storyProgress || {};
      if (!storyProgress[storyId]) {
        storyProgress[storyId] = {
          lessonsCompleted: [],
          totalScore: 0,
          averageScore: 0,
          lastPlayed: Date.now()
        };
      }

      const storyData = storyProgress[storyId];
      if (!storyData.lessonsCompleted.includes(lessonId)) {
        storyData.lessonsCompleted.push(lessonId);
      }

      // Recalculate story statistics
      const story = await StoryManager.getStory(storyId);
      if (story) {
        const progress = story.calculateProgress(userProgress);
        storyData.totalScore = progress.totalStars;
        storyData.averageScore = progress.averageScore;
      }
      storyData.lastPlayed = Date.now();

      await ProgressService.updateProgress({
        completedLessons,
        lessonScores,
        storyProgress
      });

      console.log(`📝 Updated lesson completion: ${lessonId} in story ${storyId}`);
      
    } catch (error) {
      console.error(`❌ Error updating lesson completion:`, error);
    }
  }

  /**
   * Check which stories should be newly unlocked
   * @param {Object} userProgress - Current user progress
   * @returns {Promise<Array>} Array of newly unlocked story IDs
   */
  async checkUnlockedStories(userProgress) {
    try {
      const newlyUnlocked = [];
      const stories = await StoryManager.getAllStories(false);

      for (const storyMeta of stories) {
        if (storyMeta.isUnlocked) continue; // Already unlocked
        
        const story = await StoryManager.getStory(storyMeta.id);
        if (story && story.isUnlocked(userProgress)) {
          newlyUnlocked.push(storyMeta.id);
          console.log(`🔓 Story unlocked: ${storyMeta.id}`);
        }
      }

      return newlyUnlocked;

    } catch (error) {
      console.error('❌ Error checking unlocked stories:', error);
      return [];
    }
  }

  /**
   * Check for badge achievements
   * @param {Object} userProgress - Current user progress
   * @param {string} storyId - Current story ID
   * @returns {Promise<Array>} Array of newly earned badges
   */
  async checkBadgeAchievements(userProgress, storyId) {
    try {
      const newBadges = [];
      const story = await StoryManager.getStory(storyId);
      if (!story) return newBadges;

      const rewards = story.getRewards();
      const userBadges = userProgress.badges || [];

      for (const badge of rewards.badges) {
        const hasBadge = userBadges.some(b => b.id === badge.id);
        if (!hasBadges && this.checkBadgeRequirements(badge, userProgress, storyId)) {
          newBadges.push(badge);
        }
      }

      return newBadges;

    } catch (error) {
      console.error(`❌ Error checking badge achievements:`, error);
      return [];
    }
  }

  /**
   * Check if badge requirements are met
   * @param {Object} badge - Badge configuration
   * @param {Object} userProgress - User progress data
   * @param {string} storyId - Current story ID
   * @returns {boolean} True if requirements are met
   */
  checkBadgeRequirements(badge, userProgress, storyId) {
    const requirements = badge.requirements;
    
    // Check lessons completed requirement
    if (requirements.lessons_completed) {
      const storyProgress = userProgress.storyProgress?.[storyId];
      const completed = storyProgress?.lessonsCompleted?.length || 0;
      if (completed < requirements.lessons_completed) return false;
    }

    // Check story requirement
    if (requirements.story && requirements.story !== storyId) {
      return false;
    }

    // Check minimum score requirement
    if (requirements.minimum_score) {
      const storyProgress = userProgress.storyProgress?.[storyId];
      const averageScore = storyProgress?.averageScore || 0;
      if (averageScore < requirements.minimum_score) return false;
    }

    // Check stories completed requirement
    if (requirements.stories_completed) {
      const completedStories = userProgress.completedStories?.length || 0;
      if (completedStories < requirements.stories_completed) return false;
    }

    // Check vocabulary learned requirement
    if (requirements.vocabulary_learned) {
      const vocabularyLearned = userProgress.masteredVocabulary?.length || 0;
      if (vocabularyLearned < requirements.vocabulary_learned) return false;
    }

    // Check perfect pronunciation requirement
    if (requirements.perfect_pronunciation) {
      const perfectPronunciations = userProgress.perfectPronunciations || 0;
      if (perfectPronunciations < requirements.perfect_pronunciation) return false;
    }

    return true;
  }

  /**
   * Award story completion rewards
   * @param {string} storyId - Story identifier
   * @param {Object} rewards - Rewards configuration
   */
  async awardStoryRewards(storyId, rewards) {
    try {
      const userProgress = await ProgressService.getUserProgress();
      
      // Award points
      const currentPoints = userProgress.totalPoints || 0;
      const newPoints = currentPoints + (rewards.points || 0);

      // Award badges
      const userBadges = userProgress.badges || [];
      const newBadges = [...userBadges];
      
      for (const badge of rewards.badges) {
        const hasBadge = userBadges.some(b => b.id === badge.id);
        if (!hassBadge) {
          newBadges.push({
            ...badge,
            earnedAt: Date.now(),
            storyId
          });
        }
      }

      // Update achievements
      const achievements = userProgress.achievements || [];
      const newAchievements = [...achievements];
      
      for (const achievement of rewards.achievements) {
        if (!achievements.includes(achievement)) {
          newAchievements.push(achievement);
        }
      }

      await ProgressService.updateProgress({
        totalPoints: newPoints,
        badges: newBadges,
        achievements: newAchievements
      });

      console.log(`🎁 Awarded rewards for story ${storyId}:`, rewards);

    } catch (error) {
      console.error(`❌ Error awarding story rewards:`, error);
    }
  }

  /**
   * Get story ID for a given lesson
   * @param {number} lessonId - Lesson ID
   * @returns {Promise<string|null>} Story ID or null
   */
  async getStoryForLesson(lessonId) {
    try {
      const stories = await StoryManager.getAllStories(true);
      
      for (const storyMeta of stories) {
        const story = await StoryManager.getStory(storyMeta.id);
        if (story) {
          const lesson = story.getLesson(lessonId);
          if (lesson) {
            return storyMeta.id;
          }
        }
      }
      
      return null;

    } catch (error) {
      console.error(`❌ Error getting story for lesson ${lessonId}:`, error);
      return null;
    }
  }

  /**
   * Get next recommended lesson for user
   * @returns {Promise<Object|null>} Next lesson data or null
   */
  async getNextLesson() {
    try {
      const userProgress = await ProgressService.getUserProgress();
      
      // Get current/next story
      const nextStory = await StoryManager.getNextStory();
      if (!nextStory) return null;

      const story = await StoryManager.getStory(nextStory.id);
      if (!story) return null;

      const nextLessonId = story.calculateProgress(userProgress).nextLessonId;
      if (!nextLessonId) return null;

      const lesson = story.getLesson(nextLessonId);
      return lesson ? {
        ...lesson,
        storyId: nextStory.id,
        storyTitle: nextStory.title,
        storyTheme: nextStory.theme
      } : null;

    } catch (error) {
      console.error('❌ Error getting next lesson:', error);
      return null;
    }
  }

  /**
   * Register callback for when a story is unlocked
   * @param {string} storyId - Story identifier
   * @param {Function} callback - Callback function
   */
  registerUnlockCallback(storyId, callback) {
    if (!this.unlockCallbacks.has(storyId)) {
      this.unlockCallbacks.set(storyId, []);
    }
    this.unlockCallbacks.get(storyId).push(callback);
  }

  /**
   * Trigger unlock callbacks for a story
   * @param {string} storyId - Story identifier
   */
  triggerUnlockCallbacks(storyId) {
    const callbacks = this.unlockCallbacks.get(storyId) || [];
    for (const callback of callbacks) {
      try {
        callback(storyId);
      } catch (error) {
        console.error(`❌ Error in unlock callback for ${storyId}:`, error);
      }
    }
  }

  /**
   * Load progress cache from storage
   */
  async loadProgressCache() {
    try {
      const cache = await AsyncStorage.getItem('story_progress_cache');
      if (cache) {
        const parsedCache = JSON.parse(cache);
        for (const [key, value] of Object.entries(parsedCache)) {
          this.progressCache.set(key, value);
        }
        console.log('📖 Loaded story progress cache');
      }
    } catch (error) {
      console.warn('⚠️ Error loading progress cache:', error);
    }
  }

  /**
   * Save progression updates
   * @param {Object} updates - Progression updates
   */
  async saveProgressionUpdates(updates) {
    try {
      // Cache the updates
      const cacheKey = `progression_${Date.now()}`;
      this.progressCache.set(cacheKey, updates);

      // Save to storage
      const cacheData = {};
      for (const [key, value] of this.progressCache.entries()) {
        cacheData[key] = value;
      }
      
      await AsyncStorage.setItem('story_progress_cache', JSON.stringify(cacheData));
      console.log('💾 Saved progression updates');

    } catch (error) {
      console.error('❌ Error saving progression updates:', error);
    }
  }

  /**
   * Get progression statistics
   * @returns {Promise<Object>} Progression statistics
   */
  async getProgressionStatistics() {
    try {
      const userProgress = await ProgressService.getUserProgress();
      const stories = await StoryManager.getAllStories(false);

      const statistics = {
        totalStories: stories.length,
        unlockedStories: stories.filter(s => s.isUnlocked).length,
        completedStories: (userProgress.completedStories || []).length,
        totalLessons: stories.reduce((sum, s) => sum + s.totalLessons, 0),
        completedLessons: (userProgress.completedLessons || []).length,
        totalBadges: (userProgress.badges || []).length,
        currentStreak: userProgress.streak || 0,
        totalPoints: userProgress.totalPoints || 0
      };

      statistics.overallProgress = statistics.totalLessons > 0 
        ? (statistics.completedLessons / statistics.totalLessons) * 100 
        : 0;

      return statistics;

    } catch (error) {
      console.error('❌ Error getting progression statistics:', error);
      return {
        totalStories: 0,
        unlockedStories: 0,
        completedStories: 0,
        totalLessons: 0,
        completedLessons: 0,
        totalBadges: 0,
        currentStreak: 0,
        totalPoints: 0,
        overallProgress: 0
      };
    }
  }

  /**
   * Cleanup service
   */
  async cleanup() {
    this.progressCache.clear();
    this.unlockCallbacks.clear();
    this.initialized = false;
    console.log('🧹 Story Progression Service cleaned up');
  }
}

// Create singleton instance
const storyProgressionService = new StoryProgressionService();

export default storyProgressionService;