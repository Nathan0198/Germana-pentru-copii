// ImageService pentru MiniDeutsch
// Gestionează încărcarea și maparea imaginilor pentru lecții

class ImageService {
  constructor() {
    this.imageMap = this.getImageMap();
  }

  // Map pentru toate imaginile din aplicație
  getImageMap() {
    return {
      // ================================
      // CHARACTERS - Personajele principale
      // ================================
      'bjorn_default': require('../../assets/images/characters/bjorn_default.png'),
      'max': require('../../assets/images/characters/max.png'),
      // 'emma_default': require('../../assets/images/characters/emma_default.png'),

      // ================================
      // LESSON 1 - Salutul lui Björn - Story Images
      // ================================
      'bjorn_familie': require('../../assets/images/lessons/lesson_1/story/bjorn_familie.png'),
      'bjorn_und_emma': require('../../assets/images/lessons/lesson_1/story/bjorn_und_emma.png'),
      'emma_excited': require('../../assets/images/lessons/lesson_1/story/emma_excited.png'),
      'bjorn_und_emma_gruessen': require('../../assets/images/lessons/lesson_1/story/bjorn_und_emma_gruessen.png'),
      'bjorn_thanking': require('../../assets/images/lessons/lesson_1/story/bjorn_thanking.png'),
      'bjorn_pointing': require('../../assets/images/lessons/lesson_1/story/bjorn_pointing.png'),
      'bjorn_waving': require('../../assets/images/lessons/lesson_1/story/bjorn_und_emma_gruessen.png'), // Folosim bjorn_und_emma_gruessen pentru waving
      'bear_family': require('../../assets/images/lessons/lesson_1/story/bjorn_familie.png'), // Pentru familia de urși

      // ================================
      // BACKGROUNDS - Fundaluri (pentru viitor)
      // ================================
      // 'castle_background': require('../../assets/images/backgrounds/castle.png'),
      // 'garden_background': require('../../assets/images/backgrounds/garden.png'),
      // 'forest_background': require('../../assets/images/backgrounds/forest.png'),
    };
  }

  // Obține o imagine după numele ei
  getImage(imageName) {
    console.log(`📸 Attempting to get image: ${imageName}`);
    const image = this.imageMap[imageName];
    if (!image) {
      console.log(`📸 Image not found in map: ${imageName}`);
      console.log(`📸 Available images:`, Object.keys(this.imageMap));
      return null;
    }
    console.log(`📸 Successfully found image: ${imageName}`);
    return image;
  }

  // Verifică dacă o imagine există
  hasImage(imageName) {
    return !!this.imageMap[imageName];
  }

  // Obține imaginea pentru o scenă din poveste
  getStoryImage(lessonId, imageName) {
    if (lessonId === 1) {
      return this.getImage(imageName);
    }
    
    // Pentru alte lecții, construiește numele imaginii
    const fullImageName = `lesson_${lessonId}_${imageName}`;
    return this.getImage(fullImageName);
  }

  // Obține imaginea pentru vocabular
  getVocabularyImage(word) {
    const imageName = `vocabulary_${word.toLowerCase().replace(/\s+/g, '_')}`;
    return this.getImage(imageName);
  }

  // Obține imaginea pentru un personaj
  getCharacterImage(characterId, expression = 'default') {
    const imageName = `${characterId}_${expression}`;
    return this.getImage(imageName);
  }

  // Obține imaginea de fundal pentru o zonă
  getBackgroundImage(zoneId) {
    const backgroundMap = {
      'castle': 'castle_background',
      'farm': 'garden_background', 
      'forest': 'forest_background',
      'village': 'castle_background', // fallback
      'garden': 'garden_background',
      'playground': 'garden_background'
    };
    
    const backgroundName = backgroundMap[zoneId] || 'castle_background';
    return this.getImage(backgroundName);
  }

  // Listă cu toate imaginile disponibile
  getAvailableImages() {
    return Object.keys(this.imageMap);
  }

  // Debugging - afișează toate imaginile
  debugLogAvailableImages() {
    console.log('📸 Available images:', this.getAvailableImages());
  }
}

export default new ImageService();
