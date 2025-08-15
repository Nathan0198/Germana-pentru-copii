// Structura principală a aplicației MiniDeutsch
import { CASTLE_LESSONS, CASTLE_ZONE_STATS, NEXT_ZONE_PREVIEW } from './LessonsData';

// Zonele principale pentru învățarea germanei
export const GERMAN_ZONES = [
  {
    id: 'castle',
    name: 'Castelul Familiei',
    title: '🏰 Castelul Familiei',
    subtitle: 'Lecțiile 1-25',
    description: 'Începe aventura în germană alături de Björn și familia lui!',
    color: '#8B4513',
    totalLessons: 25,
    isUnlocked: true,
    lessons: CASTLE_LESSONS,
    zoneStats: CASTLE_ZONE_STATS,
    characters: [
      { id: 'björn', name: 'Björn der Bär', emoji: '🐻', role: 'narrator' },
      { id: 'emma', name: 'Emma die Ente', emoji: '🦆', role: 'pronunciation' },
      { id: 'max', name: 'Max der Hase', emoji: '🐰', role: 'games' },
      { id: 'anna', name: 'Anna', emoji: '🐻‍❄️', role: 'child' },
      { id: 'papa_bear', name: 'Papa Bär', emoji: '🐻', role: 'father' },
      { id: 'mama_bear', name: 'Mama Bär', emoji: '🐻', role: 'mother' }
    ]
  },
  {
    id: 'forest',
    name: 'Pădurea Cuvintelor',
    title: '🌲 Pădurea Cuvintelor',
    subtitle: 'Lecțiile 26-50',
    description: 'Continuă în pădurea magică cu noi prieteni!',
    color: '#228B22',
    totalLessons: 25,
    isUnlocked: false,
    lessons: [],
    characters: [
      { id: 'felix', name: 'Felix der Igel', emoji: '🦔', role: 'guide' },
      { id: 'nora', name: 'Nora das Eichhörnchen', emoji: '🐿️', role: 'helper' },
      { id: 'leo', name: 'Leo der Fuchs', emoji: '🦊', role: 'storyteller' }
    ],
    comingSoon: true
  },
  {
    id: 'village',
    name: 'Satul Prietenilor',
    title: '🏘️ Satul Prietenilor',
    subtitle: 'Lecțiile 51-75',
    description: 'Explorează satul și întâlnește noi prieteni!',
    color: '#FF6347',
    totalLessons: 25,
    isUnlocked: false,
    lessons: [],
    characters: [],
    comingSoon: true
  },
  {
    id: 'city',
    name: 'Orașul Mare',
    title: '🏙️ Orașul Mare',
    subtitle: 'Lecțiile 76-100',
    description: 'Aventuri urbane și conversații complexe!',
    color: '#4682B4',
    totalLessons: 25,
    isUnlocked: false,
    lessons: [],
    characters: [],
    comingSoon: true
  },
  {
    id: 'ocean',
    name: 'Oceanul Cunoașterii',
    title: '🌊 Oceanul Cunoașterii',
    subtitle: 'Lecțiile 101-125',
    description: 'Înot în oceanul vast al cunoașterii!',
    color: '#1E90FF',
    totalLessons: 25,
    isUnlocked: false,
    lessons: [],
    characters: [],
    comingSoon: true
  },
  {
    id: 'mountains',
    name: 'Munții Înțelepciunii',
    title: '⛰️ Munții Înțelepciunii',
    subtitle: 'Lecțiile 126-150',
    description: 'Urcă pe vârfurile cunoașterii!',
    color: '#696969',
    totalLessons: 25,
    isUnlocked: false,
    lessons: [],
    characters: [],
    comingSoon: true
  },
  {
    id: 'space',
    name: 'Spațiul Cosmic',
    title: '🚀 Spațiul Cosmic',
    subtitle: 'Lecțiile 151-175',
    description: 'Explorează universul cuvintelor!',
    color: '#4B0082',
    totalLessons: 25,
    isUnlocked: false,
    lessons: [],
    characters: [],
    comingSoon: true
  },
  {
    id: 'magic',
    name: 'Tărâmul Magic',
    title: '✨ Tărâmul Magic',
    subtitle: 'Lecțiile 176-200',
    description: 'Magia finală a stăpânirii germanei!',
    color: '#800080',
    totalLessons: 25,
    isUnlocked: false,
    lessons: [],
    characters: [],
    comingSoon: true
  }
];

// Zonele pentru matematică
export const MATH_LEVELS = [
  {
    id: 'basic',
    name: 'Numere și Operații de Bază',
    title: '🔢 Numere de Bază',
    subtitle: 'Nivel 1 - 50 exerciții',
    description: 'Învață numerele și operațiile simple!',
    color: '#FF4500',
    totalExercises: 50,
    isUnlocked: true,
    exercises: [], // Va fi adăugat când implementăm matematica
    characters: [
      { id: 'björn', name: 'Björn der Bär', emoji: '🐻', role: 'teacher' },
      { id: 'max', name: 'Max der Hase', emoji: '🐰', role: 'helper' }
    ]
  },
  {
    id: 'intermediate',
    name: 'Geometrie și Măsurări',
    title: '📐 Forme și Măsuri',
    subtitle: 'Nivel 2 - 50 exerciții',
    description: 'Explorează formele și măsurătorile!',
    color: '#32CD32',
    totalExercises: 50,
    isUnlocked: false,
    exercises: [],
    characters: [],
    comingSoon: true
  },
  {
    id: 'advanced',
    name: 'Probleme și Logică',
    title: '🧠 Probleme Logice',
    subtitle: 'Nivel 3 - 50 exerciții',
    description: 'Rezolvă probleme complexe!',
    color: '#9932CC',
    totalExercises: 50,
    isUnlocked: false,
    exercises: [],
    characters: [],
    comingSoon: true
  }
];

// Sistemul de recompense și badge-uri
export const BADGE_SYSTEM = {
  german_badges: [
    {
      id: 'friends_castle',
      name: 'Prietenii Castelului',
      description: 'Completează primele 10 lecții din Castelul Familiei',
      icon: '👫',
      requirements: { lessons_completed: 10, zone: 'castle' },
      points: 100
    },
    {
      id: 'castle_explorer',
      name: 'Exploratorul Castelului',
      description: 'Completează lecțiile 11-20 din Castelul Familiei',
      icon: '🗝️',
      requirements: { lessons_completed: 20, zone: 'castle' },
      points: 150
    },
    {
      id: 'castle_master',
      name: 'Maestrul Castelului',
      description: 'Completează toate cele 25 de lecții din Castelul Familiei',
      icon: '👑',
      requirements: { lessons_completed: 25, zone: 'castle', minimum_score: 80 },
      points: 250
    },
    {
      id: 'pronunciation_expert',
      name: 'Expert în Pronunție',
      description: 'Obține scor perfect la 10 challenge-uri de pronunție',
      icon: '🎤',
      requirements: { perfect_pronunciation: 10 },
      points: 200
    },
    {
      id: 'vocabulary_champion',
      name: 'Campion la Vocabular',
      description: 'Învață 100 de cuvinte noi',
      icon: '📚',
      requirements: { vocabulary_learned: 100 },
      points: 300
    }
  ],
  math_badges: [
    {
      id: 'number_ninja',
      name: 'Ninja al Numerelor',
      description: 'Completează primul nivel de matematică',
      icon: '🥷',
      requirements: { exercises_completed: 50, level: 'basic' },
      points: 200
    },
    {
      id: 'geometry_genius',
      name: 'Geniul Geometriei',
      description: 'Stăpânește formele și măsurătorile',
      icon: '📐',
      requirements: { exercises_completed: 50, level: 'intermediate' },
      points: 250
    },
    {
      id: 'logic_master',
      name: 'Maestrul Logicii',
      description: 'Rezolvă toate problemele logice',
      icon: '🧠',
      requirements: { exercises_completed: 50, level: 'advanced' },
      points: 300
    }
  ]
};

// Setări pentru sistem de progres
export const PROGRESS_SETTINGS = {
  stars_per_lesson: 3,
  points_per_star: 10,
  bonus_points: {
    perfect_score: 20,
    first_try: 10,
    speed_bonus: 5,
    no_hints: 15
  },
  unlock_requirements: {
    zone_completion_percentage: 80,
    minimum_lesson_score: 70,
    badge_requirements: true
  }
};

// Configurații audio
export const AUDIO_CONFIG = {
  characters: {
    björn: {
      voice_profile: 'warm_paternal',
      speed: 'normal',
      pitch: 'low'
    },
    emma: {
      voice_profile: 'melodic_friendly',
      speed: 'slightly_slow',
      pitch: 'medium'
    },
    max: {
      voice_profile: 'energetic_playful',
      speed: 'fast',
      pitch: 'high'
    }
  },
  languages: {
    german: {
      voice: 'german_native',
      clarity: 'high'
    },
    romanian: {
      voice: 'romanian_native',
      clarity: 'high'
    }
  }
};

// Configurații pentru Supabase (backend)
export const SUPABASE_CONFIG = {
  tables: {
    user_progress: 'user_progress',
    lesson_completions: 'lesson_completions',
    badge_achievements: 'badge_achievements',
    statistics: 'user_statistics'
  },
  sync_settings: {
    auto_sync: true,
    sync_interval: 300000, // 5 minute
    offline_mode: true
  }
};

// Funcții utilitare pentru accesarea datelor

/**
 * Găsește o lecție după ID în toate zonele
 * @param {number} lessonId - ID-ul lecției
 * @returns {Object|null} - Obiectul lecție sau null dacă nu e găsit
 */
export const getLessonById = (lessonId) => {
  for (const zone of GERMAN_ZONES) {
    const lesson = zone.lessons.find(l => l.id === lessonId);
    if (lesson) {
      return lesson;
    }
  }
  return null;
};

/**
 * Găsește un personaj după ID în toate zonele
 * @param {string} characterId - ID-ul personajului
 * @returns {Object|null} - Obiectul personaj sau null dacă nu e găsit
 */
export const getCharacterById = (characterId) => {
  for (const zone of GERMAN_ZONES) {
    const character = zone.characters.find(c => c.id === characterId);
    if (character) {
      return character;
    }
  }
  return null;
};

/**
 * Găsește o zonă după ID
 * @param {string} zoneId - ID-ul zonei
 * @returns {Object|null} - Obiectul zonă sau null dacă nu e găsit
 */
export const getZoneById = (zoneId) => {
  return GERMAN_ZONES.find(zone => zone.id === zoneId) || null;
};

/**
 * Obține toate lecțiile dintr-o zonă
 * @param {string} zoneId - ID-ul zonei
 * @returns {Array} - Array cu lecțiile din zonă
 */
export const getLessonsByZone = (zoneId) => {
  const zone = getZoneById(zoneId);
  return zone ? zone.lessons : [];
};

/**
 * Verifică dacă o lecție este deblocată
 * @param {number} lessonId - ID-ul lecției
 * @param {Object} userProgress - Progresul utilizatorului
 * @returns {boolean} - True dacă lecția este deblocată
 */
export const isLessonUnlocked = (lessonId, userProgress = {}) => {
  const lesson = getLessonById(lessonId);
  if (!lesson) return false;
  
  // Prima lecție este întotdeauna deblocată
  if (lessonId === 1) return true;
  
  // Verifică dacă lecția anterioară este completată
  if (lesson.unlock_requirements?.lesson_completed) {
    const requiredLessonId = lesson.unlock_requirements.lesson_completed;
    return userProgress.completedLessons?.includes(requiredLessonId) || false;
  }
  
  return true;
};

/**
 * Calculează progresul unei zone
 * @param {string} zoneId - ID-ul zonei
 * @param {Object} userProgress - Progresul utilizatorului
 * @returns {Object} - Obiect cu statisticile de progres
 */
export const calculateZoneProgress = (zoneId, userProgress = {}) => {
  const zone = getZoneById(zoneId);
  if (!zone) return { completed: 0, total: 0, percentage: 0 };
  
  const completedLessons = zone.lessons.filter(lesson => 
    userProgress.completedLessons?.includes(lesson.id)
  ).length;
  
  return {
    completed: completedLessons,
    total: zone.lessons.length,
    percentage: zone.lessons.length > 0 ? (completedLessons / zone.lessons.length) * 100 : 0
  };
};

// Export separat pentru characters (pentru HomeScreen)
export const characters = GERMAN_ZONES[0].characters;
