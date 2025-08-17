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
      'bjorn_waving': require('../../assets/images/characters/bjorn_waving.png'),
      'bjorn_happy': require('../../assets/images/characters/bjorn_happy.png'),
      'bjorn_standing': require('../../assets/images/characters/bjorn_standing.png'),
      'emma_smiling': require('../../assets/images/characters/emma_smiling.png'),
      'emma_happy': require('../../assets/images/characters/emma_happy.png'),
      'emma_duck': require('../../assets/images/characters/emma_duck.png'),
      'max': require('../../assets/images/characters/max.png'),

      // ================================
      // LESSON 1 - Salutul lui Björn - Story Images
      // ================================
      'bjorn_familie': require('../../assets/images/lessons/lesson1/story/bear_family.png'),
      'bjorn_und_emma': require('../../assets/images/characters/bjorn_waving.png'), // Folosim bjorn_waving pentru scenele împreună
      'emma_excited': require('../../assets/images/characters/emma_happy.png'), // Folosim emma_happy pentru emma entuziasmată
      'bjorn_und_emma_gruessen': require('../../assets/images/lessons/lesson1/story/bear_family.png'), // Pentru salutul final
      'bear_family': require('../../assets/images/lessons/lesson1/story/bear_family.png'),
      
      // ================================
      // LESSON 1 - Game Images
      // ================================
      'happy_children': require('../../assets/images/lessons/lesson1/games/happy_children.png'),
      'hand_waving': require('../../assets/images/lessons/lesson1/games/hand_waving.png'),
      'house': require('../../assets/images/lessons/lesson1/games/house.png'),
      'children_playing': require('../../assets/images/lessons/lesson1/games/children_playing.png'),
      'children_group': require('../../assets/images/lessons/lesson1/games/children_group.png'),

      // ================================
      // LESSON 2 - Familia lui Björn - Story Images (with castle backgrounds)
      // ================================
      'bjorn_with_papa': require('../../assets/images/lessons/lesson2/story/bjorn_with_papa.png'),
      'emma_curious': require('../../assets/images/lessons/lesson2/story/emma_curious.png'),
      'bjorn_with_mama': require('../../assets/images/lessons/lesson2/story/bjorn_with_mama.png'),
      'bjorn_with_anna': require('../../assets/images/lessons/lesson2/story/bjorn_with_anna.png'),
      'whole_bear_family': require('../../assets/images/lessons/lesson2/story/whole_bear_family.png'),

      // ================================
      // LESSON 2 - Family Members & Game Images
      // ================================
      'papa_bear': require('../../assets/images/characters/papa_bear.png'),
      'mama_bear': require('../../assets/images/characters/mama_bear.png'),
      'anna_bear': require('../../assets/images/characters/anna_bear.png'),
      'anna_shy': require('../../assets/images/lessons/lesson2/games/anna_shy.png'),
      'emma_excited': require('../../assets/images/characters/emma_happy.png'), // Use existing emma_happy for excited

      // ================================
      // LESSON 3 - Casa noastră - Story Images (with castle backgrounds)
      // ================================
      'bjorn_shows_house': require('../../assets/images/lessons/lesson3/story/bjorn_shows_house.png'),
      'emma_curious_house': require('../../assets/images/lessons/lesson3/story/emma_curious_house.png'),
      'living_room_scene': require('../../assets/images/lessons/lesson3/story/living_room_scene.png'),
      'kitchen_scene': require('../../assets/images/lessons/lesson3/story/kitchen_scene.png'),
      'bedroom_scene': require('../../assets/images/lessons/lesson3/story/bedroom_scene.png'),
      'castle_scenes_combined': require('../../assets/images/lessons/lesson3/story/castle_scenes_combined.png'),

      // ================================
      // LESSON 3 - Game Images
      // ================================
      'house_cross_section': require('../../assets/images/lessons/lesson3/games/house_cross_section.png'),
      'bjorn_pointing': require('../../assets/images/lessons/lesson3/games/bjorn_pointing.png'),
      'room_icons': require('../../assets/images/lessons/lesson3/games/room_icons.png'),
      'furniture_collection': require('../../assets/images/lessons/lesson3/games/furniture_collection.png'),
      'detailed_rooms': require('../../assets/images/lessons/lesson3/games/detailed_rooms.png'),

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
