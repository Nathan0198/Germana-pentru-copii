import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Familie Story - "Familia lui Björn" (Lesson 2)
 * Learning about family members and relationships
 */
export class FamilieStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'familie',
        name: 'Familia lui Björn',
        description: 'Învață despre membrii familiei și relațiile de rudenie',
        order: 2,
        difficulty: 'beginner',
        estimatedDuration: 12, // minutes
        color: '#10B981', // Green theme
        icon: '👨‍👩‍👧‍👦'
      },

      lessons: this.createFamilieLessons(),
      characters: this.generateCharacters(),
      themes: this.generateThemes(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {
        prerequisiteStories: ['castle'],
        minimumProgress: {
          'castle': 80
        }
      }
    };

    await this.initializeWithData(storyData);
  }

  /**
   * Create Familie lesson content based on provided story
   */
  createFamilieLessons() {
    return [
      {
        id: 2,
        title: "Familia lui Björn",
        subtitle: "Membrii familiei",
        duration: 4,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Das ist meine Familie! Hier ist mein Vater. Er heißt Papa Bär.",
              romanian: "Aceasta este familia mea! Aici este tatăl meu. El se numește Papa Bear.",
              image: "familie_papa_baer",
              audio: "familie_L02_scene_01"
            },
            {
              character: "emma",
              german: "Und wo ist deine Mutter, Björn?",
              romanian: "Și unde este mama ta, Björn?",
              image: "emma_curious",
              audio: "familie_L02_scene_02"
            },
            {
              character: "björn",
              german: "Hier ist sie! Das ist Mama Bär. Sie ist sehr lieb.",
              romanian: "Aici este! Aceasta este Mama Bear. Ea este foarte drăguță.",
              image: "familie_mama_baer",
              audio: "familie_L02_scene_03"
            },
            {
              character: "björn",
              german: "Ich habe auch eine kleine Schwester. Sie heißt Anna.",
              romanian: "Am și o surioară mică. Ea se numește Anna.",
              image: "familie_schwester_anna",
              audio: "familie_L02_scene_04"
            },
            {
              character: "emma",
              german: "Was für eine schöne Familie!",
              romanian: "Ce familie frumoasă!",
              image: "familie_complete",
              audio: "familie_L02_scene_05"
            }
          ]
        },

        vocabulary: [
          { german: "der Vater", romanian: "tatăl", category: "familie", audio: "vocab_der_vater" },
          { german: "die Mutter", romanian: "mama", category: "familie", audio: "vocab_die_mutter" },
          { german: "Papa", romanian: "tata", category: "familie", audio: "vocab_papa" },
          { german: "Mama", romanian: "mama", category: "familie", audio: "vocab_mama" },
          { german: "er", romanian: "el", category: "pronume", audio: "vocab_er" },
          { german: "sie", romanian: "ea", category: "pronume", audio: "vocab_sie" },
          { german: "die Schwester", romanian: "sora", category: "familie", audio: "vocab_die_schwester" },
          { german: "schön", romanian: "frumos/frumoasă", category: "adjective", audio: "vocab_schoen" }
        ],

        games: [
          {
            id: "familie_drag_drop",
            type: "drag_drop",
            title: "Conectează membrii familiei",
            instructions: "Trage fiecare cuvânt la imaginea corespunzătoare",
            items: [
              { german: "der Vater", romanian: "tatăl", image: "familie_papa_baer", audio: "vocab_der_vater" },
              { german: "die Mutter", romanian: "mama", image: "familie_mama_baer", audio: "vocab_die_mutter" },
              { german: "die Schwester", romanian: "sora", image: "familie_schwester_anna", audio: "vocab_die_schwester" },
              { german: "die Familie", romanian: "familia", image: "familie_complete", audio: "vocab_die_familie" }
            ]
          },
          {
            id: "familie_memory",
            type: "memory",
            title: "Jocul memoriei - Familie",
            instructions: "Găsește perechile română-germană",
            pairs: [
              { german: "Papa", romanian: "Tata", audio: "vocab_papa" },
              { german: "Mama", romanian: "Mama", audio: "vocab_mama" },
              { german: "die Schwester", romanian: "Sora", audio: "vocab_die_schwester" },
              { german: "die Familie", romanian: "Familia", audio: "vocab_die_familie" }
            ]
          },
          {
            id: "familie_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Familie",
            instructions: "Alege răspunsul corect",
            questions: [
              {
                question: "Cum spui 'sora' în germană?",
                options: ["der Bruder", "die Schwester", "die Mutter"],
                correct: 1,
                audio: "question_schwester"
              },
              {
                question: "Ce înseamnă 'der Vater'?",
                options: ["mama", "tatăl", "sora"],
                correct: 1,
                audio: "question_vater"
              }
            ]
          }
        ]
      }
    ];
  }

  /**
   * Generate character definitions for familie story
   */
  generateCharacters() {
    return {
      björn: {
        name: "Björn",
        fullName: "Björn der Bär",
        type: "bear",
        description: "Un urs prietenos care își prezintă familia",
        personality: "mândru, iubitor, familist",
        images: {
          default: "bjorn_default",
          familie: "bjorn_familie",
          proud: "bjorn_proud"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      emma: {
        name: "Emma",
        fullName: "Emma die Ente",
        type: "duck",
        description: "O rățușcă curioasă care învață despre familie",
        personality: "curioasă, prietenoasă, interesată",
        images: {
          default: "emma_excited",
          curious: "emma_curious"
        },
        voice: "female_cheerful",
        color: "#FFD700"
      },
      papa_baer: {
        name: "Papa Bär",
        fullName: "Papa Bär",
        type: "bear",
        description: "Tatăl lui Björn, un urs mare și puternic",
        personality: "protector, înțelept, calm",
        images: {
          default: "familie_papa_baer"
        },
        voice: "male_deep",
        color: "#654321"
      },
      mama_baer: {
        name: "Mama Bär",
        fullName: "Mama Bär", 
        type: "bear",
        description: "Mama lui Björn, o ursoaică blândă și iubitoare",
        personality: "blândă, iubitoare, grijulie",
        images: {
          default: "familie_mama_baer"
        },
        voice: "female_warm",
        color: "#D2691E"
      },
      anna: {
        name: "Anna",
        fullName: "Anna die kleine Schwester",
        type: "bear",
        description: "Sora mică a lui Björn, o ursoaică jucăușă",
        personality: "jucăușă, veselă, mică",
        images: {
          default: "familie_schwester_anna"
        },
        voice: "child_female",
        color: "#F4A460"
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
          background: "#F0FDF4",
          primary: "#10B981",
          secondary: "#34D399",
          accent: "#F59E0B",
          text: "#047857"
        },
        images: {
          background: "familie_living_room",
          scenery: ["familie_house", "familie_garden", "familie_kitchen"]
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
        id: "drag_drop_familie",
        type: "drag_drop",
        difficulty: "easy",
        category: "familie_members"
      },
      {
        id: "memory_familie",
        type: "memory", 
        difficulty: "easy",
        category: "familie_vocabulary"
      },
      {
        id: "quick_choice_familie",
        type: "quick_choice",
        difficulty: "easy",
        category: "familie_comprehension"
      }
    ];
  }

  /**
   * Generate audio configuration
   */
  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/familie",
      files: {
        // Story scenes
        "familie_L02_scene_01": "L02_scene_papa_intro.mp3",
        "familie_L02_scene_02": "L02_scene_emma_question.mp3",
        "familie_L02_scene_03": "L02_scene_mama_intro.mp3", 
        "familie_L02_scene_04": "L02_scene_schwester_intro.mp3",
        "familie_L02_scene_05": "L02_scene_emma_conclusion.mp3",
        
        // Vocabulary
        "vocab_der_vater": "L02_vocab_der_vater.mp3",
        "vocab_die_mutter": "L02_vocab_die_mutter.mp3",
        "vocab_papa": "L02_vocab_papa.mp3",
        "vocab_mama": "L02_vocab_mama.mp3",
        "vocab_er": "L02_vocab_er.mp3",
        "vocab_sie": "L02_vocab_sie.mp3",
        "vocab_die_schwester": "L02_vocab_die_schwester.mp3",
        "vocab_schoen": "L02_vocab_schoen.mp3",
        "vocab_die_familie": "L02_vocab_die_familie.mp3",
        
        // Game audio
        "question_schwester": "L02_game_question_schwester.mp3",
        "question_vater": "L02_game_question_vater.mp3"
      }
    };
  }
}