import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Castle Story - "Castelul Familiei" (Lesson 1)
 * The first story where children meet Björn the bear and Emma the duck
 */
export class CastleStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'castle',
        name: 'Castelul Familiei',
        description: 'Întâlnire cu Björn ursulețul și Emma rățușca în castelul magic',
        order: 1,
        difficulty: 'beginner',
        estimatedDuration: 15, // minutes
        color: '#6B46C1', // Purple theme
        icon: '🏰'
      },

      lessons: this.importExistingLessons(),
      characters: this.generateCharacters(),
      themes: this.generateThemes(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {} // First story - always unlocked
    };

    await this.initializeWithData(storyData);
  }

  /**
   * Import existing lesson 1 data and adapt to modular format
   */
  importExistingLessons() {
    return [
      {
        id: 1,
        title: "Salutul lui Björn",
        subtitle: "Primele cuvinte în germană",
        duration: 4,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Hallo! Ich bin Björn der Bär! Ich wohne hier im Schloss mit meiner Familie.",
              romanian: "Salut! Eu sunt Björn ursulețul! Locuiesc aici în castel cu familia mea.",
              image: "bjorn_familie",
              audio: "castle_L01_scene_01"
            },
            {
              character: "emma",
              german: "Hallo Björn! Ich bin Emma die Ente. Wie geht es dir?",
              romanian: "Salut Björn! Eu sunt Emma rățușca. Ce mai faci?",
              image: "bjorn_und_emma",
              audio: "castle_L01_scene_02"
            },
            {
              character: "björn",
              german: "Mir geht es gut, danke! Und dir?",
              romanian: "Îmi merge bine, mulțumesc! Și ție?",
              image: "bjorn_und_emma",
              audio: "castle_L01_scene_03"
            },
            {
              character: "emma",
              german: "Auch gut! Lass uns die Kinder begrüßen!",
              romanian: "Și mie bine! Hai să salutăm copiii!",
              image: "emma_excited",
              audio: "castle_L01_scene_04"
            },
            {
              character: "björn",
              german: "Hallo Kinder! Willkommen in unserem Schloss!",
              romanian: "Salut copii! Bun veniți în castelul nostru!",
              image: "bjorn_und_emma_gruessen",
              audio: "castle_L01_scene_05"
            }
          ]
        },

        vocabulary: [
          { german: "Hallo", romanian: "Salut", category: "salutări", audio: "vocab_hallo" },
          { german: "Ich bin", romanian: "Eu sunt", category: "prezentare", audio: "vocab_ich_bin" },
          { german: "der Bär", romanian: "ursul", category: "animale", audio: "vocab_der_baer" },
          { german: "die Ente", romanian: "rața", category: "animale", audio: "vocab_die_ente" },
          { german: "das Schloss", romanian: "castelul", category: "locuri", audio: "vocab_das_schloss" },
          { german: "die Familie", romanian: "familia", category: "familie", audio: "vocab_die_familie" },
          { german: "Wie geht es dir?", romanian: "Ce mai faci?", category: "întrebări", audio: "vocab_wie_geht_es_dir" },
          { german: "gut", romanian: "bine", category: "adjective", audio: "vocab_gut" },
          { german: "danke", romanian: "mulțumesc", category: "politețe", audio: "vocab_danke" },
          { german: "Willkommen", romanian: "Bun venit", category: "salutări", audio: "vocab_willkommen" }
        ],

        games: [
          {
            id: "castle_drag_drop",
            type: "drag_drop",
            title: "Conectează personajele",
            instructions: "Trage fiecare cuvânt germán la imaginea corespunzătoare",
            items: [
              { german: "der Bär", romanian: "ursul", image: "bjorn_default", audio: "vocab_der_baer" },
              { german: "die Ente", romanian: "rața", image: "emma_excited", audio: "vocab_die_ente" },
              { german: "das Schloss", romanian: "castelul", image: "castle_exterior", audio: "vocab_das_schloss" },
              { german: "die Familie", romanian: "familia", image: "bjorn_familie", audio: "vocab_die_familie" }
            ]
          },
          {
            id: "castle_memory",
            type: "memory",
            title: "Jocul memoriei",
            instructions: "Găsește perechile română-germană",
            pairs: [
              { german: "Hallo", romanian: "Salut", audio: "vocab_hallo" },
              { german: "danke", romanian: "mulțumesc", audio: "vocab_danke" },
              { german: "gut", romanian: "bine", audio: "vocab_gut" },
              { german: "Willkommen", romanian: "Bun venit", audio: "vocab_willkommen" }
            ]
          },
          {
            id: "castle_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă",
            instructions: "Alege răspunsul corect",
            questions: [
              {
                question: "Cum spui 'Salut' în germană?",
                options: ["Guten Tag", "Hallo", "Auf Wiedersehen"],
                correct: 1,
                audio: "question_hallo"
              },
              {
                question: "Ce înseamnă 'der Bär'?",
                options: ["rața", "ursul", "castelul"],
                correct: 1,
                audio: "question_der_baer"
              }
            ]
          }
        ]
      }
    ];
  }

  /**
   * Generate character definitions for castle story
   */
  generateCharacters() {
    return {
      björn: {
        name: "Björn",
        fullName: "Björn der Bär",
        type: "bear",
        description: "Un urs prietenos în salopetă albastră care locuiește în castel",
        personality: "prietenos, râzător, util",
        images: {
          default: "bjorn_default",
          familie: "bjorn_familie", 
          pointing: "bjorn_pointing",
          thanking: "bjorn_thanking"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      emma: {
        name: "Emma",
        fullName: "Emma die Ente", 
        type: "duck",
        description: "O rățușcă energică și entuziastă",
        personality: "energică, curioasă, încurajatoare",
        images: {
          default: "emma_excited",
          excited: "emma_excited"
        },
        voice: "female_cheerful",
        color: "#FFD700"
      }
    };
  }

  /**
   * Generate theme configuration
   */  
  generateThemes() {
    return {
      primary: {
        colors: {
          background: "#F3F4F6",
          primary: "#6B46C1",
          secondary: "#8B5CF6", 
          accent: "#F59E0B",
          text: "#374151"
        },
        images: {
          background: "castle_interior",
          scenery: ["castle_exterior", "castle_courtyard", "castle_garden"]
        }
      }
    };
  }

  /**
   * Generate games configuration
   */
  generateGames() {
    return [
      {
        id: "drag_drop_characters",
        type: "drag_drop",
        difficulty: "easy",
        category: "vocabulary"
      },
      {
        id: "memory_greetings", 
        type: "memory",
        difficulty: "easy",
        category: "phrases"
      },
      {
        id: "quick_choice_basic",
        type: "quick_choice", 
        difficulty: "easy",
        category: "comprehension"
      }
    ];
  }

  /**
   * Generate audio configuration
   */
  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/castle",
      files: {
        // Story scenes
        "castle_L01_scene_01": "L01_scene_bjorn_intro.mp3",
        "castle_L01_scene_02": "L01_scene_emma_intro.mp3", 
        "castle_L01_scene_03": "L01_scene_bjorn_response.mp3",
        "castle_L01_scene_04": "L01_scene_emma_excited.mp3",
        "castle_L01_scene_05": "L01_scene_welcome.mp3",
        
        // Vocabulary
        "vocab_hallo": "L01_vocab_hallo.mp3",
        "vocab_ich_bin": "L01_vocab_ich_bin.mp3", 
        "vocab_der_baer": "L01_vocab_der_baer.mp3",
        "vocab_die_ente": "L01_vocab_die_ente.mp3",
        "vocab_das_schloss": "L01_vocab_das_schloss.mp3",
        "vocab_die_familie": "L01_vocab_die_familie.mp3",
        "vocab_wie_geht_es_dir": "L01_vocab_wie_geht_es_dir.mp3",
        "vocab_gut": "L01_vocab_gut.mp3",
        "vocab_danke": "L01_vocab_danke.mp3", 
        "vocab_willkommen": "L01_vocab_willkommen.mp3",
        
        // Game audio
        "question_hallo": "L01_game_question_hallo.mp3",
        "question_der_baer": "L01_game_question_der_baer.mp3"
      }
    };
  }
}