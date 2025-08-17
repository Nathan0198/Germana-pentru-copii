import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Morgen Story - "Dimineața în Familie" (Lesson 4)
 * Learning about morning routines and daily activities
 */
export class MorgenStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'morgen',
        name: 'Dimineața în Familie',
        description: 'Învață despre rutina de dimineață și activitățile zilnice',
        order: 4,
        difficulty: 'beginner',
        estimatedDuration: 12, // minutes
        color: '#EF4444', // Red theme
        icon: '🌅'
      },

      lessons: this.createMorgenLessons(),
      characters: this.generateCharacters(),
      themes: this.generateThemes(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {
        prerequisiteStories: ['castle', 'familie', 'haus'],
        minimumProgress: {
          'haus': 80
        }
      }
    };

    await this.initializeWithData(storyData);
  }

  /**
   * Create Morgen lesson content based on provided story
   */
  createMorgenLessons() {
    return [
      {
        id: 4,
        title: "Dimineața în Familie", 
        subtitle: "Rutina de dimineață",
        duration: 4,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Guten Morgen! Ich stehe früh auf.",
              romanian: "Bună dimineața! Mă scol devreme.",
              image: "morgen_bjorn_aufstehen",
              audio: "morgen_L04_scene_01"
            },
            {
              character: "papa_baer",
              german: "Guten Morgen, Björn! Hast du gut geschlafen?",
              romanian: "Bună dimineața, Björn! Ai dormit bine?",
              image: "morgen_papa_greeting",
              audio: "morgen_L04_scene_02"
            },
            {
              character: "björn",
              german: "Ja, sehr gut! Wo ist das Frühstück?",
              romanian: "Da, foarte bine! Unde este micul dejun?",
              image: "bjorn_happy",
              audio: "morgen_L04_scene_03"
            },
            {
              character: "mama_baer",
              german: "Das Frühstück ist fertig! Kommt zum Tisch!",
              romanian: "Micul dejun este gata! Veniți la masă!",
              image: "morgen_mama_fruehstueck",
              audio: "morgen_L04_scene_04"
            },
            {
              character: "emma",
              german: "Mmm, es riecht so gut!",
              romanian: "Mmm, miroase atât de bine!",
              image: "emma_excited_food",
              audio: "morgen_L04_scene_05"
            }
          ]
        },

        vocabulary: [
          { german: "Guten Morgen", romanian: "Bună dimineața", category: "salutări", audio: "vocab_guten_morgen" },
          { german: "aufstehen", romanian: "a se scula", category: "verbe", audio: "vocab_aufstehen" },
          { german: "schlafen", romanian: "a dormi", category: "verbe", audio: "vocab_schlafen" },
          { german: "das Frühstück", romanian: "micul dejun", category: "hrană", audio: "vocab_das_fruehstueck" },
          { german: "fertig", romanian: "gata", category: "adjective", audio: "vocab_fertig" },
          { german: "der Tisch", romanian: "masa", category: "mobilier", audio: "vocab_der_tisch" },
          { german: "ja", romanian: "da", category: "răspunsuri", audio: "vocab_ja" },
          { german: "früh", romanian: "devreme", category: "timp", audio: "vocab_frueh" }
        ],

        games: [
          {
            id: "morgen_drag_drop",
            type: "drag_drop",
            title: "Activitățile dimineții",
            instructions: "Trage fiecare activitate la imaginea corespunzătoare",
            items: [
              { german: "aufstehen", romanian: "a se scula", image: "morgen_bjorn_aufstehen", audio: "vocab_aufstehen" },
              { german: "das Frühstück", romanian: "micul dejun", image: "morgen_fruehstueck_table", audio: "vocab_das_fruehstueck" },
              { german: "der Tisch", romanian: "masa", image: "morgen_dining_table", audio: "vocab_der_tisch" },
              { german: "schlafen", romanian: "a dormi", image: "morgen_bjorn_sleeping", audio: "vocab_schlafen" }
            ]
          },
          {
            id: "morgen_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Dimineața",
            instructions: "Max: 'Cum spui 'Bună dimineața' în germană?'",
            questions: [
              {
                question: "Cum spui 'Bună dimineața' în germană?",
                options: ["Guten Tag", "Guten Morgen", "Gute Nacht"],
                correct: 1,
                audio: "question_guten_morgen"
              },
              {
                question: "Ce înseamnă 'das Frühstück'?", 
                options: ["cina", "micul dejun", "prânzul"],
                correct: 1,
                audio: "question_fruehstueck"
              },
              {
                question: "Cum spui 'a dormi' în germană?",
                options: ["aufstehen", "essen", "schlafen"],
                correct: 2,
                audio: "question_schlafen"
              }
            ]
          },
          {
            id: "morgen_memory",
            type: "memory",
            title: "Jocul memoriei - Dimineața",
            instructions: "Găsește perechile dimineții",
            pairs: [
              { german: "Guten Morgen", romanian: "Bună dimineața", audio: "vocab_guten_morgen" },
              { german: "schlafen", romanian: "a dormi", audio: "vocab_schlafen" },
              { german: "das Frühstück", romanian: "micul dejun", audio: "vocab_das_fruehstueck" },
              { german: "der Tisch", romanian: "masa", audio: "vocab_der_tisch" }
            ]
          }
        ]
      }
    ];
  }

  /**
   * Generate character definitions for morgen story
   */
  generateCharacters() {
    return {
      björn: {
        name: "Björn", 
        fullName: "Björn der Bär",
        type: "bear",
        description: "Un urs care se trezește devreme și are o rutină de dimineață",
        personality: "matinal, energic, disciplinat",
        images: {
          default: "bjorn_default",
          aufstehen: "morgen_bjorn_aufstehen",
          happy: "bjorn_happy"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      emma: {
        name: "Emma",
        fullName: "Emma die Ente", 
        type: "duck",
        description: "O rățușcă care savurează dimineața și mâncarea",
        personality: "entuziastă, foame, apreciativă",
        images: {
          default: "emma_excited",
          excited_food: "emma_excited_food"
        },
        voice: "female_cheerful",
        color: "#FFD700"
      },
      papa_baer: {
        name: "Papa Bär",
        fullName: "Papa Bär",
        type: "bear",
        description: "Tatăl lui Björn care salută dimineața",
        personality: "grijuliu, blând, interesat",
        images: {
          default: "familie_papa_baer", 
          greeting: "morgen_papa_greeting"
        },
        voice: "male_deep",
        color: "#654321"
      },
      mama_baer: {
        name: "Mama Bär",
        fullName: "Mama Bär",
        type: "bear", 
        description: "Mama lui Björn care pregătește micul dejun",
        personality: "grijulie, organizată, caldă",
        images: {
          default: "familie_mama_baer",
          fruehstueck: "morgen_mama_fruehstueck"
        },
        voice: "female_warm",
        color: "#D2691E"
      },
      max: {
        name: "Max",
        fullName: "Max der Hase",
        type: "rabbit",
        description: "Un iepuraș care pune întrebări în jocuri",
        personality: "curios, inteligent, util",
        images: {
          default: "max_default",
          questioning: "max_questioning"
        },
        voice: "male_young",
        color: "#A0522D"
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
          background: "#FEF2F2",
          primary: "#EF4444",
          secondary: "#F87171", 
          accent: "#F59E0B",
          text: "#991B1B"
        },
        images: {
          background: "morgen_sunrise",
          scenery: ["morgen_bedroom", "morgen_kitchen", "morgen_dining_room"]
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
        id: "drag_drop_morning_activities",
        type: "drag_drop",
        difficulty: "easy", 
        category: "morning_routine"
      },
      {
        id: "quick_choice_morning",
        type: "quick_choice",
        difficulty: "easy",
        category: "morning_vocabulary"
      },
      {
        id: "memory_morning",
        type: "memory",
        difficulty: "medium",
        category: "morning_phrases"
      }
    ];
  }

  /**
   * Generate audio configuration
   */
  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/morgen",
      files: {
        // Story scenes
        "morgen_L04_scene_01": "L04_scene_bjorn_guten_morgen.mp3",
        "morgen_L04_scene_02": "L04_scene_papa_greeting.mp3",
        "morgen_L04_scene_03": "L04_scene_bjorn_fruehstueck.mp3",
        "morgen_L04_scene_04": "L04_scene_mama_ready.mp3",
        "morgen_L04_scene_05": "L04_scene_emma_smell.mp3",
        
        // Vocabulary
        "vocab_guten_morgen": "L04_vocab_guten_morgen.mp3",
        "vocab_aufstehen": "L04_vocab_aufstehen.mp3",
        "vocab_schlafen": "L04_vocab_schlafen.mp3",
        "vocab_das_fruehstueck": "L04_vocab_das_fruehstueck.mp3", 
        "vocab_fertig": "L04_vocab_fertig.mp3",
        "vocab_der_tisch": "L04_vocab_der_tisch.mp3",
        "vocab_ja": "L04_vocab_ja.mp3",
        "vocab_frueh": "L04_vocab_frueh.mp3",
        
        // Game audio
        "question_guten_morgen": "L04_game_question_guten_morgen.mp3",
        "question_fruehstueck": "L04_game_question_fruehstueck.mp3",
        "question_schlafen": "L04_game_question_schlafen.mp3"
      }
    };
  }
}