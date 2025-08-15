import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Service pentru managementul limbii aplicației
 * Permite schimbarea între germană și română pentru copii mici
 */
class LanguageService {
  constructor() {
    this.currentLanguage = 'de'; // default germană
    this.availableLanguages = ['de', 'ro'];
    this.listeners = new Set();
  }

  async initialize() {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage && this.availableLanguages.includes(savedLanguage)) {
        this.currentLanguage = savedLanguage;
      }
      console.log(`🌐 Language service initialized with: ${this.currentLanguage}`);
    } catch (error) {
      console.error('Error initializing language service:', error);
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  async setLanguage(language) {
    if (!this.availableLanguages.includes(language)) {
      console.warn(`Language ${language} is not supported`);
      return false;
    }

    const oldLanguage = this.currentLanguage;
    this.currentLanguage = language;

    try {
      await AsyncStorage.setItem('app_language', language);
      console.log(`🌐 Language changed from ${oldLanguage} to ${language}`);
      
      // Notify all listeners
      this.listeners.forEach(listener => {
        listener(language, oldLanguage);
      });
      
      return true;
    } catch (error) {
      console.error('Error saving language preference:', error);
      this.currentLanguage = oldLanguage; // Revert on error
      return false;
    }
  }

  toggleLanguage() {
    const newLanguage = this.currentLanguage === 'de' ? 'ro' : 'de';
    return this.setLanguage(newLanguage);
  }

  addLanguageChangeListener(listener) {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  getLanguageName(code) {
    const names = {
      'de': { de: 'Deutsch', ro: 'Germană' },
      'ro': { de: 'Rumänisch', ro: 'Română' }
    };
    return names[code] || { de: code, ro: code };
  }

  getLanguageFlag(code) {
    const flags = {
      'de': '🇩🇪',
      'ro': '🇷🇴'
    };
    return flags[code] || '🌐';
  }

  // Helper pentru obținerea textului în limba curentă
  getText(textObject) {
    if (typeof textObject === 'string') {
      return textObject;
    }
    
    if (typeof textObject === 'object') {
      return textObject[this.currentLanguage] || textObject['de'] || textObject['ro'] || '';
    }
    
    return '';
  }

  // Helper pentru formatarea textelor de afișare
  formatText(key, textObject) {
    const text = this.getText(textObject);
    const flag = this.getLanguageFlag(this.currentLanguage);
    return `${flag} ${text}`;
  }

  // Validează dacă un text există în ambele limbi
  isTextComplete(textObject) {
    if (!textObject || typeof textObject !== 'object') {
      return false;
    }
    
    return this.availableLanguages.every(lang => 
      textObject[lang] && textObject[lang].trim().length > 0
    );
  }

  // Obține toate textele incomplete (pentru debug)
  findIncompleteTexts(textsObject, path = '') {
    const incomplete = [];
    
    for (const [key, value] of Object.entries(textsObject)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        if (this.availableLanguages.some(lang => lang in value)) {
          // Este un obiect de text
          if (!this.isTextComplete(value)) {
            incomplete.push({
              path: currentPath,
              text: value,
              missing: this.availableLanguages.filter(lang => !value[lang])
            });
          }
        } else {
          // Este un obiect încorporat - verifică recursiv
          incomplete.push(...this.findIncompleteTexts(value, currentPath));
        }
      }
    }
    
    return incomplete;
  }

  // Pentru dezvoltatori - raportează textele lipsă
  debugMissingTexts(textsObject, name = 'Texts') {
    const incomplete = this.findIncompleteTexts(textsObject);
    
    if (incomplete.length > 0) {
      console.warn(`🌐 ${name} - Found ${incomplete.length} incomplete texts:`);
      incomplete.forEach(item => {
        console.warn(`  - ${item.path}: missing ${item.missing.join(', ')}`);
      });
    } else {
      console.log(`✅ ${name} - All texts are complete in both languages`);
    }
    
    return incomplete;
  }
}

export default new LanguageService();
