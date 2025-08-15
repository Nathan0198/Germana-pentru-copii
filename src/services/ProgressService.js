import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_PROFILE: '@minideutsch_user_profile',
  GERMAN_PROGRESS: '@minideutsch_german_progress',
  MATH_PROGRESS: '@minideutsch_math_progress',
  SETTINGS: '@minideutsch_settings',
  ACHIEVEMENTS: '@minideutsch_achievements',
};

class ProgressService {
  // User Profile
  async getUserProfile() {
    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : {
        name: 'Copilul Meu',
        age: 5,
        createdAt: new Date().toISOString(),
        totalStars: 0,
        streak: 0,
        lastActiveDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  async saveUserProfile(profile) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      return true;
    } catch (error) {
      console.error('Error saving user profile:', error);
      return false;
    }
  }

  // German Progress
  async getGermanProgress() {
    try {
      const progress = await AsyncStorage.getItem(STORAGE_KEYS.GERMAN_PROGRESS);
      return progress ? JSON.parse(progress) : {
        completedLessons: [],
        currentZone: 1,
        stars: 0,
        badges: [],
        lastCompletedLesson: null,
        totalTimeSpent: 0,
        lessonStats: {},
      };
    } catch (error) {
      console.error('Error getting German progress:', error);
      return null;
    }
  }

  async saveGermanProgress(progress) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.GERMAN_PROGRESS, JSON.stringify(progress));
      return true;
    } catch (error) {
      console.error('Error saving German progress:', error);
      return false;
    }
  }

  async completeGermanLesson(lessonId, stars, timeSpent) {
    try {
      const progress = await this.getGermanProgress();
      const profile = await this.getUserProfile();

      // Update lesson completion
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }

      // Update stats
      progress.stars += stars;
      progress.totalTimeSpent += timeSpent;
      progress.lastCompletedLesson = lessonId;
      
      // Store lesson stats
      progress.lessonStats[lessonId] = {
        stars,
        timeSpent,
        completedAt: new Date().toISOString(),
      };

      // Update zone progression
      const completedInZone = progress.completedLessons.filter(id => {
        const lessonNumber = parseInt(id.split('_')[1]);
        const zoneStart = (progress.currentZone - 1) * 25 + 1;
        const zoneEnd = progress.currentZone * 25;
        return lessonNumber >= zoneStart && lessonNumber <= zoneEnd;
      }).length;

      if (completedInZone >= 25 && progress.currentZone < 8) {
        progress.currentZone += 1;
      }

      // Update user profile
      profile.totalStars += stars;
      profile.lastActiveDate = new Date().toISOString();

      await this.saveGermanProgress(progress);
      await this.saveUserProfile(profile);

      return { progress, profile };
    } catch (error) {
      console.error('Error completing German lesson:', error);
      return null;
    }
  }

  // Math Progress
  async getMathProgress() {
    try {
      const progress = await AsyncStorage.getItem(STORAGE_KEYS.MATH_PROGRESS);
      return progress ? JSON.parse(progress) : {
        completedExercises: [],
        currentLevel: 1,
        stars: 0,
        badges: [],
        lastCompletedExercise: null,
        totalTimeSpent: 0,
        exerciseStats: {},
      };
    } catch (error) {
      console.error('Error getting Math progress:', error);
      return null;
    }
  }

  async saveMathProgress(progress) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MATH_PROGRESS, JSON.stringify(progress));
      return true;
    } catch (error) {
      console.error('Error saving Math progress:', error);
      return false;
    }
  }

  async completeMathExercise(exerciseId, stars, timeSpent, accuracy) {
    try {
      const progress = await this.getMathProgress();
      const profile = await this.getUserProfile();

      // Update exercise completion
      if (!progress.completedExercises.includes(exerciseId)) {
        progress.completedExercises.push(exerciseId);
      }

      // Update stats
      progress.stars += stars;
      progress.totalTimeSpent += timeSpent;
      progress.lastCompletedExercise = exerciseId;
      
      // Store exercise stats
      progress.exerciseStats[exerciseId] = {
        stars,
        timeSpent,
        accuracy,
        completedAt: new Date().toISOString(),
      };

      // Update level progression
      const completedInLevel = progress.completedExercises.filter(id => {
        const exerciseNumber = parseInt(id.split('_')[1]);
        const levelStart = (progress.currentLevel - 1) * 50 + 1;
        const levelEnd = progress.currentLevel * 50;
        return exerciseNumber >= levelStart && exerciseNumber <= levelEnd;
      }).length;

      if (completedInLevel >= 50 && progress.currentLevel < 3) {
        progress.currentLevel += 1;
      }

      // Update user profile
      profile.totalStars += stars;
      profile.lastActiveDate = new Date().toISOString();

      await this.saveMathProgress(progress);
      await this.saveUserProfile(profile);

      return { progress, profile };
    } catch (error) {
      console.error('Error completing Math exercise:', error);
      return null;
    }
  }

  // Settings
  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        soundEnabled: true,
        musicEnabled: true,
        voiceSpeed: 'normal',
        language: 'romanian',
        notifications: true,
        autoplay: false,
        difficultMode: false,
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  }

  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  }

  // Achievements
  async getAchievements() {
    try {
      const achievements = await AsyncStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return achievements ? JSON.parse(achievements) : [];
    } catch (error) {
      console.error('Error getting achievements:', error);
      return [];
    }
  }

  async saveAchievements(achievements) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
      return true;
    } catch (error) {
      console.error('Error saving achievements:', error);
      return false;
    }
  }

  async checkAndAwardAchievements() {
    try {
      const profile = await this.getUserProfile();
      const germanProgress = await this.getGermanProgress();
      const mathProgress = await this.getMathProgress();
      const currentAchievements = await this.getAchievements();

      const newAchievements = [];

      // Define achievement conditions
      const achievementConditions = [
        {
          id: 'first_lesson',
          condition: germanProgress.completedLessons.length >= 1,
          name: 'Primul Pas',
          description: 'Prima lecție completă',
          emoji: '👶'
        },
        {
          id: 'first_math',
          condition: mathProgress.completedExercises.length >= 1,
          name: 'Matematician Începător',
          description: 'Primul exercițiu matematică',
          emoji: '🔢'
        },
        {
          id: 'ten_lessons',
          condition: germanProgress.completedLessons.length >= 10,
          name: 'Vorbitor',
          description: '10 lecții de germană',
          emoji: '🗣️'
        },
        {
          id: 'fifty_stars',
          condition: profile.totalStars >= 50,
          name: 'Stelist',
          description: '50 stele câștigate',
          emoji: '⭐'
        },
        {
          id: 'zone_complete',
          condition: germanProgress.currentZone > 1,
          name: 'Explorător',
          description: 'O zonă completă',
          emoji: '🗺️'
        },
        {
          id: 'week_streak',
          condition: profile.streak >= 7,
          name: 'Perseverent',
          description: '7 zile consecutiv',
          emoji: '🔥'
        }
      ];

      // Check each achievement
      for (const achievement of achievementConditions) {
        const alreadyEarned = currentAchievements.some(a => a.id === achievement.id);
        if (achievement.condition && !alreadyEarned) {
          newAchievements.push({
            ...achievement,
            earnedAt: new Date().toISOString()
          });
        }
      }

      // Save new achievements
      if (newAchievements.length > 0) {
        const updatedAchievements = [...currentAchievements, ...newAchievements];
        await this.saveAchievements(updatedAchievements);
      }

      return newAchievements;
    } catch (error) {
      console.error('Error checking achievements:', error);
      return [];
    }
  }

  // Utility functions
  async updateStreak() {
    try {
      const profile = await this.getUserProfile();
      const today = new Date().toDateString();
      const lastActive = new Date(profile.lastActiveDate).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (lastActive === today) {
        // Already active today, no change
        return profile.streak;
      } else if (lastActive === yesterday) {
        // Continued streak
        profile.streak += 1;
      } else {
        // Streak broken
        profile.streak = 1;
      }

      profile.lastActiveDate = new Date().toISOString();
      await this.saveUserProfile(profile);
      return profile.streak;
    } catch (error) {
      console.error('Error updating streak:', error);
      return 0;
    }
  }

  async getWeeklyStats() {
    try {
      const germanProgress = await this.getGermanProgress();
      const mathProgress = await this.getMathProgress();
      
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      
      // Count lessons this week
      const lessonsThisWeek = Object.values(germanProgress.lessonStats || {}).filter(
        stat => new Date(stat.completedAt) > oneWeekAgo
      ).length;
      
      // Count exercises this week
      const exercisesThisWeek = Object.values(mathProgress.exerciseStats || {}).filter(
        stat => new Date(stat.completedAt) > oneWeekAgo
      ).length;
      
      // Count stars this week
      const starsThisWeek = [
        ...Object.values(germanProgress.lessonStats || {}),
        ...Object.values(mathProgress.exerciseStats || {})
      ].filter(
        stat => new Date(stat.completedAt) > oneWeekAgo
      ).reduce((sum, stat) => sum + stat.stars, 0);

      return {
        lessonsThisWeek,
        exercisesThisWeek,
        starsThisWeek
      };
    } catch (error) {
      console.error('Error getting weekly stats:', error);
      return {
        lessonsThisWeek: 0,
        exercisesThisWeek: 0,
        starsThisWeek: 0
      };
    }
  }

  // Reset all data
  async resetAllProgress() {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.GERMAN_PROGRESS,
        STORAGE_KEYS.MATH_PROGRESS,
        STORAGE_KEYS.ACHIEVEMENTS
      ]);
      return true;
    } catch (error) {
      console.error('Error resetting progress:', error);
      return false;
    }
  }

  // Export all data
  async exportAllData() {
    try {
      const profile = await this.getUserProfile();
      const germanProgress = await this.getGermanProgress();
      const mathProgress = await this.getMathProgress();
      const settings = await this.getSettings();
      const achievements = await this.getAchievements();

      return {
        profile,
        germanProgress,
        mathProgress,
        settings,
        achievements,
        exportedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }
}

export default new ProgressService();
