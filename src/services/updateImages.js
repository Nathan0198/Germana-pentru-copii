// Script pentru actualizarea automată a ImageService.js
// Rulează acest script după adăugarea imaginilor pentru a actualiza mapping-ul

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../../assets/images');
const SERVICE_FILE = path.join(__dirname, 'ImageService.js');

function updateImageService() {
  console.log('🔄 Updating ImageService with available images...');
  
  // Verifică ce imagini sunt disponibile
  const availableImages = [];
  
  // Verifică personajele
  const charactersDir = path.join(IMAGES_DIR, 'characters');
  if (fs.existsSync(charactersDir)) {
    const characters = ['bjorn_default.png', 'emma_default.png', 'max_default.png'];
    characters.forEach(char => {
      if (fs.existsSync(path.join(charactersDir, char))) {
        const name = char.replace('.png', '');
        availableImages.push(`'${name}': require('../../assets/images/characters/${char}'),`);
      }
    });
  }
  
  // Verifică povestea Lecției 1
  const storyDir = path.join(IMAGES_DIR, 'lessons/lesson_1/story');
  if (fs.existsSync(storyDir)) {
    const storyImages = ['bjorn_introduction.png', 'emma_greeting.png', 'bjorn_happy.png', 'emma_excited.png', 'castle_welcome.png'];
    storyImages.forEach(img => {
      if (fs.existsSync(path.join(storyDir, img))) {
        const name = img.replace('.png', '');
        availableImages.push(`'${name}': require('../../assets/images/lessons/lesson_1/story/${img}'),`);
      }
    });
  }
  
  // Verifică vocabularul Lecției 1
  const vocabDir = path.join(IMAGES_DIR, 'lessons/lesson_1/vocabulary');
  if (fs.existsSync(vocabDir)) {
    const vocabImages = ['hallo.png', 'ich_bin.png', 'der_baer.png', 'die_ente.png', 'die_familie.png', 'gut.png', 'danke.png', 'die_kinder.png'];
    vocabImages.forEach(img => {
      if (fs.existsSync(path.join(vocabDir, img))) {
        const name = 'vocabulary_' + img.replace('.png', '');
        availableImages.push(`'${name}': require('../../assets/images/lessons/lesson_1/vocabulary/${img}'),`);
      }
    });
  }
  
  // Verifică fundalurile
  const backgroundsDir = path.join(IMAGES_DIR, 'backgrounds');
  if (fs.existsSync(backgroundsDir)) {
    const backgrounds = ['castle.png', 'garden.png', 'forest.png'];
    backgrounds.forEach(bg => {
      if (fs.existsSync(path.join(backgroundsDir, bg))) {
        const name = bg.replace('.png', '_background');
        availableImages.push(`'${name}': require('../../assets/images/backgrounds/${bg}'),`);
      }
    });
  }
  
  console.log(`✅ Found ${availableImages.length} available images`);
  
  if (availableImages.length > 0) {
    console.log('📸 Available images:');
    availableImages.forEach(img => console.log('  -', img));
    
    console.log('\n🔧 To activate these images, uncomment the corresponding lines in ImageService.js');
    console.log('   or run the update script to automatically update the mapping.');
  } else {
    console.log('📁 No images found yet. Add images to the directories and run this script again.');
  }
}

// Rulează update-ul dacă scriptul este apelat direct
if (require.main === module) {
  updateImageService();
}

module.exports = { updateImageService };
