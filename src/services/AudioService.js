import { Audio } from 'expo-av';

class AudioService {
  constructor() {
    this.soundObjects = new Map();
    this.isInitialized = false;
    this.settings = {
      soundEnabled: true,
      musicEnabled: true,
      voiceSpeed: 1.0, // normal speed
    };
    this.audioQueue = [];
    this.isPlaying = false;
  }

  async initialize() {
    try {
      // Set audio mode for optimal playback
      await Audio.setAudioModeAsync({
        staysActiveInBackground: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
      });
      
      this.isInitialized = true;
      console.log('🎵 Audio service initialized with pre-recorded audio files');
    } catch (error) {
      console.error('Error initializing audio service:', error);
      // Fallback initialization without iOS specific settings
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        this.isInitialized = true;
        console.log('🎵 Audio service initialized with fallback settings');
      } catch (fallbackError) {
        console.error('Fallback audio initialization failed:', fallbackError);
        this.isInitialized = false;
      }
    }
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    
    // Convert voice speed setting to playback rate
    switch (newSettings.voiceSpeed) {
      case 'slow':
        this.settings.voiceSpeed = 0.7;
        break;
      case 'normal':
        this.settings.voiceSpeed = 1.0;
        break;
      case 'fast':
        this.settings.voiceSpeed = 1.3;
        break;
      default:
        this.settings.voiceSpeed = 1.0;
    }
  }

  // Core audio file loading and playing
  async playSpecificAudioFile(audioUri, fileName) {
    try {
      console.log(`🎵 Playing specific audio file: ${fileName}`);
      
      // Stop any currently playing audio first
      await this.stopAllSounds();
      
      const { sound } = await Audio.Sound.createAsync(
        audioUri,
        { 
          shouldPlay: false, 
          volume: 1.0,
          rate: this.settings.voiceSpeed,
          shouldCorrectPitch: true,
        }
      );

      this.isPlaying = true;
      await sound.playAsync();
      
      return new Promise((resolve, reject) => {
        let statusUpdateCallback = null;
        
        const cleanup = async () => {
          this.isPlaying = false;
          if (statusUpdateCallback) {
            sound.setOnPlaybackStatusUpdate(null);
            statusUpdateCallback = null;
          }
          try {
            await sound.unloadAsync();
          } catch (cleanupError) {
            console.warn(`Cleanup warning for ${fileName}:`, cleanupError);
          }
        };
        
        statusUpdateCallback = async (status) => {
          if (status.didJustFinish || !status.isPlaying) {
            console.log(`✅ Finished playing: ${fileName}`);
            await cleanup();
            resolve();
          } else if (status.error) {
            console.error(`Audio playback error for ${fileName}:`, status.error);
            await cleanup();
            reject(status.error);
          }
        };
        
        sound.setOnPlaybackStatusUpdate(statusUpdateCallback);
        
        // Safety timeout
        setTimeout(async () => {
          if (this.isPlaying) {
            console.warn(`⚠️ Audio playback timeout for ${fileName}, forcing completion`);
            await cleanup();
            resolve();
          }
        }, 8000); // 8 second timeout
      });
      
    } catch (error) {
      console.error(`Error playing specific audio file ${fileName}:`, error);
      this.isPlaying = false;
      throw error;
    }
  }

  async loadAudioFile(fileName, lessonId = null, character = null, language = null) {
    try {
      const fullKey = lessonId && character && language 
        ? `${lessonId}_${character}_${language}_${fileName}`
        : fileName;
        
      if (this.soundObjects.has(fullKey)) {
        return this.soundObjects.get(fullKey);
      }

      let audioUri;
      
      // If lesson structure is provided, use lesson-based path
      if (lessonId && character && language) {
        // For React Native, we need to map to the actual require paths
        const audioMap = this.getAudioFileMap();
        const mapKey = `lesson_${lessonId}/${character}/${language}/${fileName}`;
        audioUri = audioMap[mapKey];
        
        if (!audioUri) {
          console.warn(`⚠️ Audio file not found in map: ${mapKey}`);
          return null;
        }
      } else {
        // Fallback for other audio files - use require for React Native
        const audioFiles = {
          'characters/bjorn_placeholder.mp3': require('../../assets/audio/characters/bjorn_placeholder.mp3'),
          'characters/emma_placeholder.mp3': require('../../assets/audio/characters/emma_placeholder.mp3'),
          'characters/max_placeholder.mp3': require('../../assets/audio/characters/max_placeholder.mp3'),
          'effects/button_click.mp3': require('../../assets/audio/effects/button_click.mp3'),
          'effects/success.mp3': require('../../assets/audio/effects/success.mp3'),
          'effects/error.mp3': require('../../assets/audio/effects/error.mp3'),
          'sounds/click.mp3': require('../../assets/audio/effects/button_click.mp3'),
          'sounds/success.mp3': require('../../assets/audio/effects/success.mp3'),
          'sounds/error.mp3': require('../../assets/audio/effects/error.mp3'),
        };
        
        audioUri = audioFiles[fileName];
        
        if (!audioUri) {
          console.warn(`⚠️ Audio file not found: ${fileName}`);
          // Use a fallback placeholder
          audioUri = audioFiles['characters/bjorn_placeholder.mp3'];
        }
      }
      
      console.log(`🎵 Loading audio file: ${fileName} (${fullKey})`);
      
      const { sound } = await Audio.Sound.createAsync(
        audioUri,
        { 
          shouldPlay: false, 
          volume: 1.0,
          rate: this.settings.voiceSpeed,
          shouldCorrectPitch: true,
        }
      );

      this.soundObjects.set(fullKey, sound);
      return sound;
    } catch (error) {
      console.warn(`⚠️ Audio file not found: ${fileName}, error:`, error);
      return null;
    }
  }

  // Map audio files to require statements for React Native
  getAudioFileMap() {
    return {
      // Björn files - Lesson 1
      'lesson_1/bjorn/de/story_1.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/de/story_1.mp3'),
      'lesson_1/bjorn/de/story_2.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/de/story_2.mp3'),
      'lesson_1/bjorn/de/story_3.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/de/story_3.mp3'),
      'lesson_1/bjorn/ro/story_1.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/story_1.mp3'),
      'lesson_1/bjorn/ro/story_2.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/story_2.mp3'),
      'lesson_1/bjorn/ro/story_3.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/story_3.mp3'),
      
      // Emma files - Lesson 1 DE
      'lesson_1/emma/de/story_1.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/story_1.mp3'),
      'lesson_1/emma/de/story_2.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/story_2.mp3'),
      'lesson_1/emma/de/vocabulary_hallo.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/vocabulary_hallo.mp3'),
      'lesson_1/emma/de/vocabulary_ich_bin.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/vocabulary_ich_bin.mp3'),
      'lesson_1/emma/de/vocabulary_der_baer.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/vocabulary_der_baer.mp3'),
      'lesson_1/emma/de/vocabulary_die_ente.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/vocabulary_die_ente.mp3'),
      'lesson_1/emma/de/vocabulary_die_familie.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/vocabulary_die_familie.mp3'),
      'lesson_1/emma/de/vocabulary_gut.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/vocabulary_gut.mp3'),
      'lesson_1/emma/de/vocabulary_danke.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/vocabulary_danke.mp3'),
      'lesson_1/emma/de/vocabulary_die_kinder.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/vocabulary_die_kinder.mp3'),
      'lesson_1/emma/de/speaking_hallo.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/speaking_hallo.mp3'),
      'lesson_1/emma/de/speaking_ich_bin.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/speaking_ich_bin.mp3'),
      'lesson_1/emma/de/speaking_danke.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/speaking_danke.mp3'),
      'lesson_1/emma/de/speaking_instruction.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/speaking_instruction.mp3'),
      'lesson_1/emma/de/speaking_feedback.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/speaking_feedback.mp3'),
      'lesson_1/emma/de/feedback_well_done.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/feedback_well_done.mp3'),
      'lesson_1/emma/de/feedback_excellent.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/feedback_excellent.mp3'),
      'lesson_1/emma/de/feedback_try_again.mp3': require('../../assets/audio/lessons/lesson_1/emma/de/feedback_try_again.mp3'),
      
      // Emma files - Lesson 1 RO (only story files exist)
      'lesson_1/emma/ro/story_1.mp3': require('../../assets/audio/lessons/lesson_1/emma/ro/story_1.mp3'),
      'lesson_1/emma/ro/story_2.mp3': require('../../assets/audio/lessons/lesson_1/emma/ro/story_2.mp3'),
      
      // Use Björn's RO files for Emma's missing vocabulary in Romanian
      'lesson_1/emma/ro/vocabulary_hallo.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/vocabulary_hallo.mp3'),
      'lesson_1/emma/ro/vocabulary_ich_bin.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/vocabulary_ich_bin.mp3'),
      'lesson_1/emma/ro/vocabulary_der_baer.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/vocabulary_der_baer.mp3'),
      'lesson_1/emma/ro/vocabulary_die_ente.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/vocabulary_die_ente.mp3'),
      'lesson_1/emma/ro/vocabulary_die_familie.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/vocabulary_die_familie.mp3'),
      'lesson_1/emma/ro/vocabulary_gut.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/vocabulary_gut.mp3'),
      'lesson_1/emma/ro/vocabulary_danke.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/vocabulary_danke.mp3'),
      'lesson_1/emma/ro/vocabulary_die_kinder.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/vocabulary_die_kinder.mp3'),
      'lesson_1/emma/ro/speaking_instruction.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/speaking_instruction.mp3'),
      'lesson_1/emma/ro/speaking_feedback.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/speaking_feedback.mp3'),
      'lesson_1/emma/ro/feedback_well_done.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/feedback_well_done.mp3'),
      'lesson_1/emma/ro/feedback_excellent.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/feedback_excellent.mp3'),
      'lesson_1/emma/ro/feedback_try_again.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/feedback_try_again.mp3'),
      
      // Max files - Lesson 1
      'lesson_1/max/de/game_1_instruction.mp3': require('../../assets/audio/lessons/lesson_1/max/de/game_1_instruction.mp3'),
      'lesson_1/max/de/game_3_question_1.mp3': require('../../assets/audio/lessons/lesson_1/max/de/game_3_question_1.mp3'),
      'lesson_1/max/de/game_3_question_2.mp3': require('../../assets/audio/lessons/lesson_1/max/de/game_3_question_2.mp3'),
      'lesson_1/max/ro/game_1_instruction.mp3': require('../../assets/audio/lessons/lesson_1/max/ro/game_1_instruction.mp3'),
      'lesson_1/max/ro/game_3_question_1.mp3': require('../../assets/audio/lessons/lesson_1/max/ro/game_3_question_1.mp3'),
      'lesson_1/max/ro/game_3_question_2.mp3': require('../../assets/audio/lessons/lesson_1/max/ro/game_3_question_2.mp3'),
    };
  }

  async playAudioFile(fileName, lessonId = null, character = null, language = null) {
    if (!this.settings.soundEnabled) return;
    
    try {
      // Stop any currently playing audio to prevent overlap
      await this.stopAllSounds();
      
      const sound = await this.loadAudioFile(fileName, lessonId, character, language);
      if (!sound) {
        console.warn(`Audio file ${fileName} not available`);
        return;
      }

      console.log(`🔊 Playing audio: ${fileName} (lesson ${lessonId}, ${character}, ${language})`);
      this.isPlaying = true;
      
      // Play the audio and wait for completion
      await sound.replayAsync();
      
      // Wait for audio to complete with proper cleanup
      return new Promise((resolve, reject) => {
        let statusUpdateCallback = null;
        
        const cleanup = () => {
          this.isPlaying = false;
          if (statusUpdateCallback) {
            sound.setOnPlaybackStatusUpdate(null);
            statusUpdateCallback = null;
          }
        };
        
        statusUpdateCallback = (status) => {
          if (status.didJustFinish || !status.isPlaying) {
            console.log(`✅ Finished playing: ${fileName}`);
            cleanup();
            resolve();
          } else if (status.error) {
            console.error(`Audio playback error for ${fileName}:`, status.error);
            cleanup();
            reject(status.error);
          }
        };
        
        sound.setOnPlaybackStatusUpdate(statusUpdateCallback);
        
        // Safety timeout to prevent hanging
        setTimeout(() => {
          if (this.isPlaying) {
            console.warn(`⚠️ Audio playback timeout for ${fileName}, forcing completion`);
            cleanup();
            resolve();
          }
        }, 10000); // 10 second timeout
      });
      
    } catch (error) {
      console.error(`Error playing audio file ${fileName}:`, error);
      this.isPlaying = false;
      throw error;
    }
  }

  // Play audio files sequentially (German then Romanian)
  async playBilingualAudio(baseName, character = 'bjorn') {
    try {
      console.log(`🌍 Playing bilingual audio: ${baseName} by ${character}`);
      
      // Play German first
      const germanFile = `${baseName}_${character}_de.mp3`;
      await this.playAudioFile(germanFile);
      
      // Short pause between languages
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Then play Romanian
      const romanianFile = `${baseName}_${character}_ro.mp3`;
      await this.playAudioFile(romanianFile);
      
      console.log(`✅ Completed bilingual audio: ${baseName}`);
    } catch (error) {
      console.error(`Error playing bilingual audio ${baseName}:`, error);
    }
  }

  // Character voice methods with pre-recorded audio
  async playBjornVoice(textKey, language = 'de') {
    console.log(`🐻 Björn voice: ${textKey} (${language})`);
    
    // Use placeholder audio files that exist in assets
    if (language === 'de') {
      await this.playAudioFile('characters/bjorn_placeholder.mp3');
    } else {
      await this.playAudioFile('characters/bjorn_placeholder.mp3');
    }
  }

  async playEmmaVoice(textKey, language = 'de') {
    console.log(`🦆 Emma voice: ${textKey} (${language})`);
    
    // Use placeholder audio files that exist in assets
    await this.playAudioFile('characters/emma_placeholder.mp3');
  }

  async playMaxVoice(textKey, language = 'de') {
    console.log(`🐰 Max voice: ${textKey} (${language})`);
    
    // Use placeholder audio files that exist in assets
    await this.playAudioFile('characters/max_placeholder.mp3');
  }

  // Character voice methods with bilingual support
  async playBjornBilingual(textKey) {
    console.log(`🐻🌍 Björn bilingual: ${textKey}`);
    await this.playBilingualAudio(textKey, 'bjorn');
  }

  async playEmmaBilingual(textKey) {
    console.log(`🦆🌍 Emma bilingual: ${textKey}`);
    await this.playBilingualAudio(textKey, 'emma');
  }

  async playMaxBilingual(textKey) {
    console.log(`🐰🌍 Max bilingual: ${textKey}`);
    await this.playBilingualAudio(textKey, 'max');
  }

  // UI Sound effects with audio files
  async playButtonSound() {
    if (!this.settings.soundEnabled) return;
    await this.playAudioFile('effects/button_click.mp3');
  }

  async playSuccessSound() {
    if (!this.settings.soundEnabled) return;
    await this.playAudioFile('effects/success.mp3');
  }

  async playErrorSound() {
    if (!this.settings.soundEnabled) return;
    await this.playAudioFile('effects/error.mp3');
  }

  async playRewardSound() {
    if (!this.settings.soundEnabled) return;
    await this.playAudioFile('effects/success.mp3');
  }

  // Vocabulary pronunciation
  async playVocabulary(word, language = 'de') {
    console.log(`📚 Playing vocabulary: ${word} (${language})`);
    const fileName = `vocabulary_${word}_emma_${language}.mp3`;
    await this.playAudioFile(fileName);
  }

  async playVocabularyBilingual(word) {
    console.log(`📚🌍 Playing bilingual vocabulary: ${word}`);
    await this.playBilingualAudio(`vocabulary_${word}`, 'emma');
  }

  // Game instructions
  async playGameInstruction(gameType, language = 'de') {
    console.log(`� Playing game instruction: ${gameType} (${language})`);
    const fileName = `game_${gameType}_instruction_max_${language}.mp3`;
    await this.playAudioFile(fileName);
  }

  async playGameInstructionBilingual(gameType) {
    console.log(`🎮🌍 Playing bilingual game instruction: ${gameType}`);
    await this.playBilingualAudio(`game_${gameType}_instruction`, 'max');
  }

  // Feedback messages
  async playFeedback(feedbackType, language = 'de') {
    console.log(`� Playing feedback: ${feedbackType} (${language})`);
    const fileName = `feedback_${feedbackType}_emma_${language}.mp3`;
    await this.playAudioFile(fileName);
  }

  // UI Text Audio for young children (bilingv)
  async playUIText(textKey, language = 'de') {
    if (!this.settings.soundEnabled) return;
    
    const audioKey = `ui_${textKey}_${language}`;
    const uiTexts = {
      // Navigation texts
      'home': { de: 'Startseite', ro: 'Acasă' },
      'german_lessons': { de: 'Deutsche Lektionen', ro: 'Lecții de germană' },
      'math_exercises': { de: 'Mathe-Übungen', ro: 'Exerciții de matematică' },
      'settings': { de: 'Einstellungen', ro: 'Setări' },
      'profile': { de: 'Profil', ro: 'Profil' },
      
      // App texts
      'app_title': { de: 'Björns Welt', ro: 'Lumea lui Björn' },
      'app_subtitle': { de: 'Lerne und spiele mit Björn und Freunden', ro: 'Învață și joacă-te cu Björn și prietenii' },
      'your_guides': { de: 'Deine Guides', ro: 'Ghizii tăi' },
      
      // Lesson navigation
      'start_lesson': { de: 'Lektion beginnen', ro: 'Începe lecția' },
      'continue_lesson': { de: 'Lektion fortsetzen', ro: 'Continuă lecția' },
      'lesson_completed': { de: 'Lektion abgeschlossen', ro: 'Lecție completată' },
      'next_lesson': { de: 'Nächste Lektion', ro: 'Următoarea lecție' },
      'previous_lesson': { de: 'Vorherige Lektion', ro: 'Lecția anterioară' },
      
      // Story navigation
      'story': { de: 'Geschichte', ro: 'Poveste' },
      'vocabulary': { de: 'Wortschatz', ro: 'Vocabular' },
      'games': { de: 'Spiele', ro: 'Jocuri' },
      'exercises': { de: 'Übungen', ro: 'Exerciții' },
      
      // Game instructions
      'drag_and_drop': { de: 'Ziehen und Ablegen', ro: 'Trage și plasează' },
      'memory_game': { de: 'Memory-Spiel', ro: 'Jocul memoriei' },
      'word_matching': { de: 'Wörter zuordnen', ro: 'Potrivește cuvintele' },
      'pronunciation_practice': { de: 'Aussprache üben', ro: 'Exersează pronunția' },
      
      // Action buttons
      'play': { de: 'Abspielen', ro: 'Redă' },
      'pause': { de: 'Pause', ro: 'Pauză' },
      'stop': { de: 'Stopp', ro: 'Oprește' },
      'repeat': { de: 'Wiederholen', ro: 'Repetă' },
      'next': { de: 'Weiter', ro: 'Următorul' },
      'back': { de: 'Zurück', ro: 'Înapoi' },
      'help': { de: 'Hilfe', ro: 'Ajutor' },
      
      // Reward messages
      'well_done': { de: 'Gut gemacht!', ro: 'Bravo!' },
      'excellent': { de: 'Ausgezeichnet!', ro: 'Excelent!' },
      'try_again': { de: 'Noch einmal versuchen', ro: 'Încearcă din nou' },
      'almost_there': { de: 'Fast geschafft!', ro: 'Aproape ai reușit!' },
      
      // Zone names
      'family_castle': { de: 'Familienschloss', ro: 'Castelul Familiei' },
      'animal_farm': { de: 'Tierfarm', ro: 'Ferma Animalelor' },
      'color_garden': { de: 'Farbgarten', ro: 'Grădina Culorilor' },
      'number_village': { de: 'Zahlendorf', ro: 'Satul Numerelor' },
      
      // Character introductions
      'björn_intro': { de: 'Hallo, ich bin Björn der Bär!', ro: 'Salut, sunt Björn Ursul!' },
      'emma_intro': { de: 'Hi, ich bin Emma die Ente!', ro: 'Bună, sunt Emma Rața!' },
      'max_intro': { de: 'Hey, ich bin Max der Hase!', ro: 'Hei, sunt Max Iepurașul!' },
      
      // Family vocabulary
      'familie': { de: 'Familie', ro: 'Familie' },
      'mutter': { de: 'Mutter', ro: 'Mamă' },
      'vater': { de: 'Vater', ro: 'Tată' },
      'kind': { de: 'Kind', ro: 'Copil' },
      'bruder': { de: 'Bruder', ro: 'Frate' },
      'schwester': { de: 'Schwester', ro: 'Soră' },
      'oma': { de: 'Oma', ro: 'Bunica' },
      'opa': { de: 'Opa', ro: 'Bunicul' },
      
      // Common greetings for children
      'hello': { de: 'Hallo!', ro: 'Salut!' },
      'goodbye': { de: 'Auf Wiedersehen!', ro: 'La revedere!' },
      'please': { de: 'Bitte', ro: 'Te rog' },
      'thank_you': { de: 'Danke', ro: 'Mulțumesc' },
      'yes': { de: 'Ja', ro: 'Da' },
      'no': { de: 'Nein', ro: 'Nu' }
    };
    
    const text = uiTexts[textKey]?.[language];
    if (!text) {
      console.warn(`UI text not found: ${textKey} in ${language}`);
      return;
    }
    
    try {
      console.log(`📱 UI Audio: "${text}" (${language})`);
      
      // Use Emma's voice for UI elements (friendly and clear)
      await this.playEmmaVoice(text, language);
      
    } catch (error) {
      console.error(`Error playing UI text ${textKey}:`, error);
    }
  }

  // Zone and lesson introductions
  async playZoneIntro(zoneId, language = 'de') {
    console.log(`🏰 Playing zone intro: ${zoneId} (${language})`);
    const fileName = `zone_${zoneId}_bjorn_${language}.mp3`;
    await this.playAudioFile(fileName);
  }

  async playZoneIntroBilingual(zoneId) {
    console.log(`🏰🌍 Playing bilingual zone intro: ${zoneId}`);
    await this.playBilingualAudio(`zone_${zoneId}`, 'bjorn');
  }

  // Character introductions
  async playCharacterIntro(character, language = 'de') {
    console.log(`👋 Playing character intro: ${character} (${language})`);
    const fileName = `intro_${character}_${language}.mp3`;
    await this.playAudioFile(fileName);
  }

  async playCharacterIntroBilingual(character) {
    console.log(`👋🌍 Playing bilingual character intro: ${character}`);
    await this.playBilingualAudio('intro', character);
  }

  // Lesson audio methods
  async playLessonStory(lessonId, language = 'de') {
    console.log(`📚 Playing lesson story: ${lessonId} (${language})`);
    const fileName = `lesson_${lessonId}_story_bjorn_${language}.mp3`;
    await this.playAudioFile(fileName);
  }

  async playLessonStoryBilingual(lessonId) {
    console.log(`📚🌍 Playing bilingual lesson story: ${lessonId}`);
    await this.playBilingualAudio(`lesson_${lessonId}_story`, 'bjorn');
  }

  async playLessonVocabulary(lessonId, language = 'de') {
    console.log(`📖 Playing lesson vocabulary: ${lessonId} (${language})`);
    const fileName = `lesson_${lessonId}_vocabulary_emma_${language}.mp3`;
    await this.playAudioFile(fileName);
  }

  async playLessonVocabularyBilingual(lessonId) {
    console.log(`📖🌍 Playing bilingual lesson vocabulary: ${lessonId}`);
    await this.playBilingualAudio(`lesson_${lessonId}_vocabulary`, 'emma');
  }

  async playLessonGames(lessonId, language = 'de') {
    console.log(`🎮 Playing lesson games: ${lessonId} (${language})`);
    const fileName = `lesson_${lessonId}_games_max_${language}.mp3`;
    await this.playAudioFile(fileName);
  }

  async playLessonGamesBilingual(lessonId) {
    console.log(`🎮🌍 Playing bilingual lesson games: ${lessonId}`);
    await this.playBilingualAudio(`lesson_${lessonId}_games`, 'max');
  }

  // Interactive element audio helper
  async playInteractiveHelp(elementType, language = 'de') {
    const helpTexts = {
      'button': {
        de: 'Tippe mich an!',
        ro: 'Apasă pe mine!'
      },
      'image': {
        de: 'Tippe auf das Bild!',
        ro: 'Apasă pe imagine!'
      },
      'word': {
        de: 'Tippe auf das Wort!',
        ro: 'Apasă pe cuvânt!'
      },
      'character': {
        de: 'Hallo! Tippe mich an!',
        ro: 'Salut! Apasă pe mine!'
      },
      'drag_item': {
        de: 'Ziehe mich an den richtigen Ort!',
        ro: 'Trage-mă la locul potrivit!'
      },
      'drop_zone': {
        de: 'Lass hier fallen!',
        ro: 'Lasă aici!'
      }
    };
    
    const helpText = helpTexts[elementType]?.[language];
    if (helpText) {
      await this.playMaxVoice(helpText, language);
    }
  }

  async playSuccessSound() {
    if (!this.settings.soundEnabled) return;
    
    console.log('🎉 Success sound');
    await this.playQuickSound('success');
  }

  async playErrorSound() {
    if (!this.settings.soundEnabled) return;
    
    console.log('❌ Error sound');
    await this.playQuickSound('error');
  }

  async playRewardSound() {
    if (!this.settings.soundEnabled) return;
    
    console.log('🏆 Reward sound');
    await this.playQuickSound('reward');
  }

  // Background music
  async playBackgroundMusic(musicKey) {
    if (!this.settings.musicEnabled) return;
    
    try {
      console.log(`🎼 Playing background music: ${musicKey}`);
      await this.simulateAudioPlayback(musicKey, {
        type: 'music',
        duration: 5000, // Continuous
        loop: true
      });
    } catch (error) {
      console.error(`Error playing background music ${musicKey}:`, error);
    }
  }

  async stopBackgroundMusic() {
    try {
      console.log('🔇 Stopping background music');
      // Stop all music sounds
      for (const [key, sound] of this.soundObjects.entries()) {
        if (sound.type === 'music') {
          sound.isPlaying = false;
        }
      }
    } catch (error) {
      console.error('Error stopping background music:', error);
    }
  }

  // Pronunciation practice
  async playPronunciation(word, language = 'de', character = 'emma') {
    const audioKey = `pronunciation_${character}_${language}_${word}`;
    try {
      console.log(`🗣️ Playing pronunciation: ${word} by ${character} in ${language}`);
      
      // Use character-specific voice
      switch (character) {
        case 'björn':
          await this.playBjornVoice(word, language);
          break;
        case 'emma':
          await this.playEmmaVoice(word, language);
          break;
        case 'max':
          await this.playMaxVoice(word, language);
          break;
        default:
          await this.playEmmaVoice(word, language);
      }
    } catch (error) {
      console.error(`Error playing pronunciation ${audioKey}:`, error);
    }
  }

  // Lesson audio methods - use specific audio files for each lesson
  async playLessonStory(lessonId, character = 'bjorn', language = 'de') {
    const fileName = `lesson_${lessonId}_story_${character}_${language}.mp3`;
    console.log(`📚 Playing lesson ${lessonId} story by ${character} in ${language}`);
    await this.playAudioFile(fileName);
  }

  async playLessonVocabulary(lessonId, language = 'de') {
    const fileName = `lesson_${lessonId}_vocabulary_emma_${language}.mp3`;
    console.log(`📚 Playing lesson ${lessonId} vocabulary in ${language}`);
    await this.playAudioFile(fileName);
  }

  async playLessonGames(lessonId, language = 'de') {
    const fileName = `lesson_${lessonId}_games_max_${language}.mp3`;
    console.log(`🎮 Playing lesson ${lessonId} games in ${language}`);
    await this.playAudioFile(fileName);
  }

  // Vocabulary methods - individual word pronunciation
  async playVocabularyWord(word, language = 'de') {
    const fileName = `vocabulary_${word}_emma_${language}.mp3`;
    console.log(`🔤 Playing vocabulary: ${word} in ${language}`);
    await this.playAudioFile(fileName);
  }

  // Game audio methods
  async playGameInstruction(gameType, gameNumber, language = 'de') {
    const fileName = `game_${gameNumber}_${gameType}_instruction_max_${language}.mp3`;
    console.log(`🎮 Playing game ${gameNumber} (${gameType}) instruction in ${language}`);
    await this.playAudioFile(fileName);
  }

  async playGameFeedback(feedbackType, language = 'de') {
    const fileName = `feedback_${feedbackType}_emma_${language}.mp3`;
    console.log(`🎉 Playing feedback: ${feedbackType} in ${language}`);
    await this.playAudioFile(fileName);
  }

  // Zone introductions
  async playZoneIntro(zoneId, language = 'de') {
    const fileName = `zone_${zoneId}_bjorn_${language}.mp3`;
    console.log(`🏰 Playing zone intro: ${zoneId} in ${language}`);
    await this.playAudioFile(fileName);
  }

  // Character introductions
  async playCharacterIntro(character, language = 'de') {
    const fileName = `intro_${character}_${language}.mp3`;
    console.log(`👋 Playing ${character} intro in ${language}`);
    await this.playAudioFile(fileName);
  }

  // Math audio methods (for future use)
  async playMathAudio(exerciseId, audioType, language = 'de') {
    const fileName = `math_${exerciseId}_${audioType}_${language}.mp3`;
    console.log(`🔢 Playing math audio: ${fileName}`);
    await this.playAudioFile(fileName);
  }

  // Status methods
  isAudioPlaying() {
    return this.isPlaying;
  }

  // Cleanup methods
  async stopAllSounds() {
    try {
      console.log('🔇 Stopping all sounds');
      this.isPlaying = false;
      
      // Stop and unload all sound objects
      const stopPromises = [];
      for (const [key, sound] of this.soundObjects.entries()) {
        stopPromises.push(
          (async () => {
            try {
              // Remove any status update callbacks first to prevent recursion
              sound.setOnPlaybackStatusUpdate(null);
              await sound.stopAsync();
              await sound.unloadAsync();
            } catch (error) {
              console.warn(`Error stopping sound ${key}:`, error);
            }
          })()
        );
      }
      
      // Wait for all sounds to stop
      await Promise.allSettled(stopPromises);
      this.soundObjects.clear();
      
      console.log('✅ All sounds stopped successfully');
    } catch (error) {
      console.error('Error stopping all sounds:', error);
      // Force clear even if there were errors
      this.soundObjects.clear();
      this.isPlaying = false;
    }
  }

  async cleanup() {
    try {
      await this.stopAllSounds();
      console.log('🧹 Audio service cleaned up');
    } catch (error) {
      console.error('Error cleaning up audio service:', error);
    }
  }

  // Get settings
  getSettings() {
    return { ...this.settings };
  }

  // ================================
  // LESSON-SPECIFIC AUDIO METHODS
  // ================================

  // LESSON 1: Salutul lui Björn
  async playLesson1Story(partNumber, language = 'de') {
    // Map story parts to characters and audio files
    let character;
    let audioFileNumber;
    
    // Determine character and audio file based on story part
    if (partNumber === 1) {
      character = 'bjorn';    // Björn: "Hallo! Ich bin Björn der Bär!"
      audioFileNumber = 1;
    } else if (partNumber === 2) {
      character = 'emma';     // Emma: "Hallo Björn! Ich bin Emma die Ente. Wie geht es dir?"
      audioFileNumber = 1;
    } else if (partNumber === 3) {
      character = 'bjorn';    // Björn: "Mir geht es gut, danke! Und dir?"
      audioFileNumber = 2;
    } else if (partNumber === 4) {
      character = 'emma';     // Emma: "Auch gut! Lass uns die Kinder begrüßen!"
      audioFileNumber = 2;
    } else if (partNumber === 5) {
      character = 'bjorn';    // Björn: "Hallo Kinder! Willkommen in unserem Schloss!"
      audioFileNumber = 3;
    } else {
      console.warn(`Invalid story part number: ${partNumber}`);
      return;
    }
    
    // Use the correct file path that exists in assets
    const audioPath = `lessons/lesson_1/${character}/${language}/story_${audioFileNumber}.mp3`;
    console.log(`📖 Playing Lesson 1 story part ${partNumber} -> ${audioPath}`);
    
    // Create require map for lesson 1 files
    const lesson1Files = {
      'lessons/lesson_1/bjorn/de/story_1.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/de/story_1.mp3'),
      'lessons/lesson_1/bjorn/de/story_2.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/de/story_2.mp3'),
      'lessons/lesson_1/bjorn/de/story_3.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/de/story_3.mp3'),
      'lessons/lesson_1/bjorn/ro/story_1.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/story_1.mp3'),
      'lessons/lesson_1/bjorn/ro/story_2.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/story_2.mp3'),
      'lessons/lesson_1/bjorn/ro/story_3.mp3': require('../../assets/audio/lessons/lesson_1/bjorn/ro/story_3.mp3'),
    };
    
    const audioUri = lesson1Files[audioPath];
    if (audioUri) {
      await this.playSpecificAudioFile(audioUri, audioPath);
    } else {
      console.warn(`Audio file not found: ${audioPath}`);
      // Fallback to placeholder
      await this.playAudioFile('characters/bjorn_placeholder.mp3');
    }
  }

  async playLesson1StoryBilingual(partNumber) {
    console.log(`📖🌍 Playing Lesson 1 story part ${partNumber} (bilingual)`);
    await this.playLesson1Story(partNumber, 'de');
    await new Promise(resolve => setTimeout(resolve, 800)); // pause between languages
    await this.playLesson1Story(partNumber, 'ro');
  }

  // Emma's vocabulary for Lesson 1
  async playLesson1Vocabulary(word, language = 'de') {
    // Map vocabulary words to correct file names (handle diacritics)
    const wordMapping = {
      'der_bär': 'der_baer',
      'hallo': 'hallo',
      'ich_bin': 'ich_bin',
      'danke': 'danke',
      'gut': 'gut',
      'die_ente': 'die_ente',
      'die_familie': 'die_familie',
      'die_kinder': 'die_kinder'
    };
    
    const mappedWord = wordMapping[word] || word;
    const fileName = `vocabulary_${mappedWord}.mp3`;
    console.log(`📚 Playing Lesson 1 vocabulary: ${word} -> ${mappedWord} (${language})`);
    await this.playAudioFile(fileName, '1', 'emma', language);
  }

  async playLesson1VocabularyBilingual(word) {
    console.log(`📚🌍 Playing Lesson 1 vocabulary: ${word} (bilingual)`);
    await this.playLesson1Vocabulary(word, 'de');
    await new Promise(resolve => setTimeout(resolve, 600));
    await this.playLesson1Vocabulary(word, 'ro');
  }

  // Emma's speaking exercises for Lesson 1
  async playLesson1Speaking(exerciseType, language = 'de') {
    const fileName = `speaking_${exerciseType}.mp3`;
    console.log(`🗣️ Playing Lesson 1 speaking: ${exerciseType} (${language})`);
    await this.playAudioFile(fileName, '1', 'emma', language);
  }

  // Emma's feedback for Lesson 1
  async playLesson1Feedback(feedbackType, language = 'de') {
    const fileName = `feedback_${feedbackType}.mp3`;
    console.log(`🎉 Playing Lesson 1 feedback: ${feedbackType} (${language})`);
    await this.playAudioFile(fileName, '1', 'emma', language);
  }

  // Max's games for Lesson 1
  async playLesson1Game(gameNumber, audioType, language = 'de') {
    const fileName = `game_${gameNumber}_${audioType}.mp3`;
    console.log(`🎮 Playing Lesson 1 game ${gameNumber} ${audioType} (${language})`);
    await this.playAudioFile(fileName, '1', 'max', language);
  }

  // ================================
  // COMPLETE LESSON 1 SEQUENCES
  // ================================

  async playCompleteLesson1Story(language = 'de') {
    console.log(`📖 Playing complete Lesson 1 story (${language})`);
    await this.playLesson1Story(1, language);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.playLesson1Story(2, language);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.playLesson1Story(3, language);
  }

  async playCompleteLesson1StoryBilingual() {
    console.log(`📖🌍 Playing complete Lesson 1 story (bilingual)`);
    await this.playCompleteLesson1Story('de');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await this.playCompleteLesson1Story('ro');
  }

  // Convenience method for all Lesson 1 vocabulary
  async playAllLesson1Vocabulary(language = 'de') {
    const vocabulary = ['hallo', 'ich_bin', 'danke', 'gut', 'der_bär', 'die_ente', 'die_familie', 'die_kinder'];
    console.log(`📚 Playing all Lesson 1 vocabulary (${language})`);
    
    for (const word of vocabulary) {
      await this.playLesson1Vocabulary(word, language);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // ================================
  // LESSON TEMPLATES (for future lessons)
  // ================================

  async playLessonStory(lessonId, partNumber, language = 'de') {
    const fileName = `story_${partNumber}.mp3`;
    console.log(`📖 Playing Lesson ${lessonId} story part ${partNumber} (${language})`);
    await this.playAudioFile(fileName, lessonId.toString(), 'bjorn', language);
  }

  async playLessonVocabulary(lessonId, word, language = 'de') {
    const fileName = `vocabulary_${word}.mp3`;
    console.log(`📚 Playing Lesson ${lessonId} vocabulary: ${word} (${language})`);
    await this.playAudioFile(fileName, lessonId.toString(), 'emma', language);
  }

  async playLessonGame(lessonId, gameNumber, audioType, language = 'de') {
    const fileName = `game_${gameNumber}_${audioType}.mp3`;
    console.log(`🎮 Playing Lesson ${lessonId} game ${gameNumber} ${audioType} (${language})`);
    await this.playAudioFile(fileName, lessonId.toString(), 'max', language);
  }
}

export default new AudioService();
