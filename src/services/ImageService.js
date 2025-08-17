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
      // LESSON 4 - Familie - Story Images
      // ================================
      'bjorn_morning_wakeup': require('../../assets/images/lessons/lesson_4/story/bjorn_morning_wakeup.png'),
      'papa_greeting_bjorn': require('../../assets/images/lessons/lesson_4/story/papa_greeting_bjorn.png'),
      'mama_breakfast_ready': require('../../assets/images/lessons/lesson_4/story/mama_breakfast_ready.png'),
      'emma_smelling_food': require('../../assets/images/lessons/lesson_4/story/emma_smelling_food.png'),
      'bjorn_looking_breakfast': require('../../assets/images/lessons/lesson_4/story/bjorn_looking_breakfast.png'),

      // ================================
      // LESSON 5 - Culorile - Story Images
      // ================================
      'bjorn_asks_anna_play': require('../../assets/images/lessons/lesson_5/story/bjorn_asks_anna_play.png'),
      'anna_excited_to_play': require('../../assets/images/lessons/lesson_5/story/anna_excited_to_play.png'),
      'bjorn_suggests_ball_reading': require('../../assets/images/lessons/lesson_5/story/bjorn_suggests_ball_reading.png'),
      'emma_loves_books': require('../../assets/images/lessons/lesson_5/story/emma_loves_books.png'),
      'anna_suggests_reading_together': require('../../assets/images/lessons/lesson_5/story/anna_suggests_reading_together.png'),

      // ================================
      // LESSON 6 - Animale - Story Images
      // ================================
      'bjorn_house_colorful': require('../../assets/images/lessons/lesson_6/story/bjorn_house_colorful.png'),
      'emma_yellow_walls': require('../../assets/images/lessons/lesson_6/story/emma_yellow_walls.png'),
      'bjorn_brown_doors': require('../../assets/images/lessons/lesson_6/story/bjorn_brown_doors.png'),
      'emma_garden_flowers': require('../../assets/images/lessons/lesson_6/story/emma_garden_flowers.png'),
      'bjorn_everything_colorful': require('../../assets/images/lessons/lesson_6/story/bjorn_everything_colorful.png'),

      // ================================
      // LESSON 7 - Mâncare - Story Images
      // ================================
      'bjorn_hungry': require('../../assets/images/lessons/lesson_7/story/bjorn_hungry.png'),
      'emma_apples_cheese': require('../../assets/images/lessons/lesson_7/story/emma_apples_cheese.png'),
      'mama_soup_bread': require('../../assets/images/lessons/lesson_7/story/mama_soup_bread.png'),
      'anna_cake': require('../../assets/images/lessons/lesson_7/story/anna_cake.png'),
      'bjorn_milk': require('../../assets/images/lessons/lesson_7/story/bjorn_milk.png'),

      // ================================
      // LESSON 8 - Bunicii Dragi - Story Images
      // ================================
      'bjorn_excited_grandparents': require('../../assets/images/lessons/lesson_8/story/bjorn_excited_grandparents.png'),
      'emma_happy_visit': require('../../assets/images/lessons/lesson_8/story/emma_happy_visit.png'),
      'opa_greeting_grandchildren': require('../../assets/images/lessons/lesson_8/story/opa_greeting_grandchildren.png'),
      'oma_gifts': require('../../assets/images/lessons/lesson_8/story/oma_gifts.png'),
      'bjorn_loving_grandparents': require('../../assets/images/lessons/lesson_8/story/bjorn_loving_grandparents.png'),

      // ================================
      // LESSON 9 - Seara în Familie - Story Images
      // ================================
      'evening_approaching': require('../../assets/images/lessons/lesson_9/story/evening_approaching.png'),
      'emma_curious_evening': require('../../assets/images/lessons/lesson_9/story/emma_curious_evening.png'),
      'family_watching_tv': require('../../assets/images/lessons/lesson_9/story/family_watching_tv.png'),
      'anna_brushing_teeth': require('../../assets/images/lessons/lesson_9/story/anna_brushing_teeth.png'),
      'bjorn_goodnight': require('../../assets/images/lessons/lesson_9/story/bjorn_goodnight.png'),

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
    // Pentru lecțiile 1-9, imaginile sunt mapate direct în imageMap
    if (lessonId >= 1 && lessonId <= 9) {
      return this.getImage(imageName);
    }
    
    // Pentru lecțiile viitoare, construiește numele imaginii
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
