// Test script pentru verificarea încărcării imaginilor

console.log('Testing image loading...');

try {
  const bjorn_familie = require('./assets/images/lessons/lesson_1/story/bjorn_familie.png');
  console.log('✅ bjorn_familie loaded:', bjorn_familie);
} catch (error) {
  console.log('❌ bjorn_familie failed:', error.message);
}

try {
  const bjorn_pointing = require('./assets/images/lessons/lesson_1/story/bjorn_pointing.png');
  console.log('✅ bjorn_pointing loaded:', bjorn_pointing);
} catch (error) {
  console.log('❌ bjorn_pointing failed:', error.message);
}

try {
  const bjorn_thanking = require('./assets/images/lessons/lesson_1/story/bjorn_thanking.png');
  console.log('✅ bjorn_thanking loaded:', bjorn_thanking);
} catch (error) {
  console.log('❌ bjorn_thanking failed:', error.message);
}

try {
  const bjorn_und_emma_gruessen = require('./assets/images/lessons/lesson_1/story/bjorn_und_emma_gruessen.png');
  console.log('✅ bjorn_und_emma_gruessen loaded:', bjorn_und_emma_gruessen);
} catch (error) {
  console.log('❌ bjorn_und_emma_gruessen failed:', error.message);
}
