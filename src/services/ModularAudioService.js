/**
 * Modular Audio Service for MiniDeutsch
 * Handles audio playback for the new modular story system
 */

import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

class ModularAudioServiceClass {
  constructor() {
    this.isInitialized = false;
    this.currentSound = null;
    this.audioCache = new Map();
    this.loadingPromises = new Map();
    this.isPlaying = false;
  }

  /**
   * Initialize the audio service
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Configure audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });

      this.isInitialized = true;
      console.log('ModularAudioService initialized successfully');
    } catch (error) {
      console.error('Error initializing ModularAudioService:', error);
      throw error;
    }
  }

  /**
   * Play audio from story configuration
   * @param {string} storyId Story identifier
   * @param {string} audioKey Audio key from story config
   * @param {Object} storyAudioConfig Story's audio configuration
   */
  async playStoryAudio(storyId, audioKey, storyAudioConfig) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Stop current audio if playing
      await this.stopCurrentAudio();

      // Get audio file path from story configuration
      const audioPath = this.getAudioPath(audioKey, storyAudioConfig);
      if (!audioPath) {
        console.warn(`Audio file not found for key: ${audioKey} in story: ${storyId}`);
        return;
      }

      // Load and play audio
      const sound = await this.loadAudio(audioPath);
      if (sound) {
        await this.playSound(sound);
      }

    } catch (error) {
      console.error(`Error playing story audio ${audioKey} for ${storyId}:`, error);
    }
  }

  /**
   * Play scene audio (story narration)
   * @param {string} storyId Story identifier  
   * @param {string} sceneAudio Scene audio key
   * @param {Object} storyAudioConfig Story's audio configuration
   */
  async playSceneAudio(storyId, sceneAudio, storyAudioConfig) {
    return this.playStoryAudio(storyId, sceneAudio, storyAudioConfig);
  }

  /**
   * Play vocabulary word audio
   * @param {string} storyId Story identifier
   * @param {string} vocabAudio Vocabulary audio key
   * @param {Object} storyAudioConfig Story's audio configuration
   */
  async playVocabularyAudio(storyId, vocabAudio, storyAudioConfig) {
    return this.playStoryAudio(storyId, vocabAudio, storyAudioConfig);
  }

  /**
   * Play game audio (questions, instructions, etc.)
   * @param {string} storyId Story identifier
   * @param {string} gameAudio Game audio key
   * @param {Object} storyAudioConfig Story's audio configuration
   */
  async playGameAudio(storyId, gameAudio, storyAudioConfig) {
    return this.playStoryAudio(storyId, gameAudio, storyAudioConfig);
  }

  /**
   * Get audio file path from story configuration
   * @param {string} audioKey Audio key
   * @param {Object} audioConfig Story's audio configuration
   * @returns {string|null} Full audio file path or null
   */
  getAudioPath(audioKey, audioConfig) {
    if (!audioConfig) return null;

    const basePath = audioConfig.basePath || '/assets/audio';
    
    // Check if specific file mapping exists
    if (audioConfig.files && audioConfig.files[audioKey]) {
      return `${basePath}/${audioConfig.files[audioKey]}`;
    }

    // Fallback to standard naming convention
    return `${basePath}/${audioKey}.mp3`;
  }

  /**
   * Load audio file with caching
   * @param {string} audioPath Path to audio file
   * @returns {Promise<Audio.Sound|null>} Loaded sound object or null
   */
  async loadAudio(audioPath) {
    try {
      // Check cache first
      if (this.audioCache.has(audioPath)) {
        return this.audioCache.get(audioPath);
      }

      // Check if already loading
      if (this.loadingPromises.has(audioPath)) {
        return await this.loadingPromises.get(audioPath);
      }

      // Create loading promise
      const loadingPromise = this.loadAudioFile(audioPath);
      this.loadingPromises.set(audioPath, loadingPromise);

      const sound = await loadingPromise;
      
      // Clean up loading promise
      this.loadingPromises.delete(audioPath);

      // Cache the loaded sound
      if (sound) {
        this.audioCache.set(audioPath, sound);
      }

      return sound;

    } catch (error) {
      console.error(`Error loading audio ${audioPath}:`, error);
      this.loadingPromises.delete(audioPath);
      return null;
    }
  }

  /**
   * Actually load the audio file
   * @param {string} audioPath Path to audio file
   * @returns {Promise<Audio.Sound|null>} Loaded sound or null
   */
  async loadAudioFile(audioPath) {
    try {
      // Try to create sound from local asset
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioPath },
        { shouldPlay: false, isLooping: false }
      );

      return sound;

    } catch (error) {
      console.warn(`Could not load audio file: ${audioPath}`, error);
      
      // Try fallback to placeholder audio
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: '/assets/audio/placeholder.mp3' },
          { shouldPlay: false, isLooping: false }
        );
        return sound;
      } catch (fallbackError) {
        console.error('Could not load fallback audio:', fallbackError);
        return null;
      }
    }
  }

  /**
   * Play a loaded sound
   * @param {Audio.Sound} sound Sound object to play
   */
  async playSound(sound) {
    try {
      this.currentSound = sound;
      this.isPlaying = true;

      // Set up playback status updates
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          this.isPlaying = false;
          this.currentSound = null;
        }
      });

      await sound.playAsync();
      console.log('Audio started playing');

    } catch (error) {
      console.error('Error playing sound:', error);
      this.isPlaying = false;
      this.currentSound = null;
    }
  }

  /**
   * Stop currently playing audio
   */
  async stopCurrentAudio() {
    if (this.currentSound && this.isPlaying) {
      try {
        await this.currentSound.stopAsync();
        this.isPlaying = false;
        console.log('Audio stopped');
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
    }
    this.currentSound = null;
  }

  /**
   * Pause currently playing audio
   */
  async pauseCurrentAudio() {
    if (this.currentSound && this.isPlaying) {
      try {
        await this.currentSound.pauseAsync();
        console.log('Audio paused');
      } catch (error) {
        console.error('Error pausing audio:', error);
      }
    }
  }

  /**
   * Resume paused audio
   */
  async resumeCurrentAudio() {
    if (this.currentSound && !this.isPlaying) {
      try {
        await this.currentSound.playAsync();
        this.isPlaying = true;
        console.log('Audio resumed');
      } catch (error) {
        console.error('Error resuming audio:', error);
      }
    }
  }

  /**
   * Play success sound effect
   */
  async playSuccess() {
    try {
      const successSound = await this.loadAudio('/assets/audio/effects/success.mp3');
      if (successSound) {
        await successSound.playAsync();
      }
    } catch (error) {
      console.error('Error playing success sound:', error);
    }
  }

  /**
   * Play error sound effect
   */
  async playError() {
    try {
      const errorSound = await this.loadAudio('/assets/audio/effects/error.mp3');
      if (errorSound) {
        await errorSound.playAsync();
      }
    } catch (error) {
      console.error('Error playing error sound:', error);
    }
  }

  /**
   * Play button click sound
   */
  async playButtonClick() {
    try {
      const clickSound = await this.loadAudio('/assets/audio/ui/button_click.mp3');
      if (clickSound) {
        await clickSound.playAsync();
      }
    } catch (error) {
      console.error('Error playing button click sound:', error);
    }
  }

  /**
   * Play background music for story
   * @param {string} musicKey Music key
   * @param {boolean} loop Whether to loop the music
   */
  async playBackgroundMusic(musicKey, loop = true) {
    try {
      const musicPath = `/assets/audio/music/${musicKey}.mp3`;
      const musicSound = await this.loadAudio(musicPath);
      
      if (musicSound) {
        await musicSound.setIsLoopingAsync(loop);
        await musicSound.setVolumeAsync(0.3); // Lower volume for background music
        await this.playSound(musicSound);
      }
    } catch (error) {
      console.error('Error playing background music:', error);
    }
  }

  /**
   * Set audio volume
   * @param {number} volume Volume level (0.0 to 1.0)
   */
  async setVolume(volume) {
    if (this.currentSound) {
      try {
        await this.currentSound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  }

  /**
   * Get current playback status
   * @returns {Object} Playback status information
   */
  getPlaybackStatus() {
    return {
      isPlaying: this.isPlaying,
      hasCurrentSound: !!this.currentSound,
      cacheSize: this.audioCache.size,
      loadingCount: this.loadingPromises.size
    };
  }

  /**
   * Clear audio cache
   */
  async clearCache() {
    try {
      // Unload all cached sounds
      for (const [path, sound] of this.audioCache) {
        try {
          await sound.unloadAsync();
        } catch (error) {
          console.warn(`Error unloading sound ${path}:`, error);
        }
      }

      this.audioCache.clear();
      console.log('Audio cache cleared');
    } catch (error) {
      console.error('Error clearing audio cache:', error);
    }
  }

  /**
   * Cleanup service resources
   */
  async cleanup() {
    try {
      await this.stopCurrentAudio();
      await this.clearCache();
      
      // Clear loading promises
      this.loadingPromises.clear();
      
      this.isInitialized = false;
      console.log('ModularAudioService cleanup completed');
    } catch (error) {
      console.error('Error during ModularAudioService cleanup:', error);
    }
  }

  /**
   * Preload audio files for a story
   * @param {Object} storyAudioConfig Story's audio configuration
   * @param {Array} priorityKeys Priority audio keys to load first
   */
  async preloadStoryAudio(storyAudioConfig, priorityKeys = []) {
    if (!storyAudioConfig || !storyAudioConfig.files) return;

    try {
      // Load priority audio files first
      const priorityPromises = priorityKeys.map(async (key) => {
        const audioPath = this.getAudioPath(key, storyAudioConfig);
        if (audioPath) {
          return this.loadAudio(audioPath);
        }
      });

      await Promise.all(priorityPromises.filter(Boolean));

      // Load remaining audio files in background
      const remainingKeys = Object.keys(storyAudioConfig.files)
        .filter(key => !priorityKeys.includes(key));

      remainingKeys.forEach(async (key) => {
        const audioPath = this.getAudioPath(key, storyAudioConfig);
        if (audioPath) {
          this.loadAudio(audioPath); // Don't await, load in background
        }
      });

      console.log(`Preloaded audio for story: ${priorityKeys.length} priority, ${remainingKeys.length} background`);
    } catch (error) {
      console.error('Error preloading story audio:', error);
    }
  }
}

// Export singleton instance
export const ModularAudioService = new ModularAudioServiceClass();
export default ModularAudioService;