import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Haus Story - "Casa Noastră" (Lesson 3) 
 * Learning about rooms and parts of the house
 */
export class HausStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'haus',
        name: 'Casa Noastră',
        description: 'Explorează camerele casei și învață despre spațiile de locuit',
        order: 3,
        difficulty: 'beginner',
        estimatedDuration: 12, // minutes
        color: '#F59E0B', // Orange theme
        icon: '🏠'
      },

      lessons: this.createHausLessons(),
      characters: this.generateCharacters(),
      themes: this.generateThemes(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {
        prerequisiteStories: ['castle', 'familie'],
        minimumProgress: {
          'familie': 80
        }
      }
    };

    await this.initializeWithData(storyData);
  }

  /**
   * Create Haus lesson content based on provided story
   */
  createHausLessons() {
    return [
      {
        id: 3,
        title: "Casa Noastră",
        subtitle: "Camerele casei",
        duration: 4,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Willkommen in unserem Haus! Das ist unser Wohnzimmer.",
              romanian: "Bun veniți în casa noastră! Aceasta este camera noastră de zi.",
              image: "haus_wohnzimmer",
              audio: "haus_L03_scene_01"
            },
            {
              character: "emma",
              german: "Sehr gemütlich! Und wo ist die Küche?",
              romanian: "Foarte confortabil! Și unde este bucătăria?",
              image: "emma_curious",
              audio: "haus_L03_scene_02"
            },
            {
              character: "björn",
              german: "Die Küche ist hier. Mama kocht hier das Essen.",
              romanian: "Bucătăria este aici. Mama gătește aici mâncarea.",
              image: "haus_kueche",
              audio: "haus_L03_scene_03"
            },
            {
              character: "björn",
              german: "Oben sind die Schlafzimmer. Das ist mein Zimmer!",
              romanian: "Sus sunt dormitoarele. Aceasta este camera mea!",
              image: "haus_bjorn_zimmer",
              audio: "haus_L03_scene_04"
            },
            {
              character: "emma",
              german: "Dein Zimmer ist sehr ordentlich!",
              romanian: "Camera ta este foarte ordonată!",
              image: "emma_impressed",
              audio: "haus_L03_scene_05"
            }
          ]
        },

        vocabulary: [
          { german: "das Haus", romanian: "casa", category: "locuință", audio: "vocab_das_haus" },
          { german: "das Wohnzimmer", romanian: "camera de zi", category: "camere", audio: "vocab_das_wohnzimmer" },
          { german: "die Küche", romanian: "bucătăria", category: "camere", audio: "vocab_die_kueche" },
          { german: "das Schlafzimmer", romanian: "dormitorul", category: "camere", audio: "vocab_das_schlafzimmer" },
          { german: "mein", romanian: "al meu", category: "pronume posesive", audio: "vocab_mein" },
          { german: "das Zimmer", romanian: "camera", category: "camere", audio: "vocab_das_zimmer" },
          { german: "das Essen", romanian: "mâncarea", category: "hrană", audio: "vocab_das_essen" },
          { german: "hier", romanian: "aici", category: "adverbe de loc", audio: "vocab_hier" }
        ],

        games: [
          {
            id: "haus_drag_drop",
            type: "drag_drop",
            title: "Conectează camerele casei",
            instructions: "Trage fiecare cuvânt la imaginea corespunzătoare",
            items: [
              { german: "die Küche", romanian: "bucătăria", image: "haus_kueche", audio: "vocab_die_kueche" },
              { german: "das Wohnzimmer", romanian: "camera de zi", image: "haus_wohnzimmer", audio: "vocab_das_wohnzimmer" },
              { german: "das Schlafzimmer", romanian: "dormitorul", image: "haus_schlafzimmer", audio: "vocab_das_schlafzimmer" },
              { german: "mein Zimmer", romanian: "camera mea", image: "haus_bjorn_zimmer", audio: "vocab_mein_zimmer" }
            ]
          },
          {
            id: "haus_speaking_challenge",
            type: "speaking_challenge",
            title: "Provocarea vorbirii",
            instructions: "Emma: 'Repetă numele camerelor!'",
            challenges: [
              {
                phrase: "Das Wohnzimmer",
                romanian: "Camera de zi",
                audio: "vocab_das_wohnzimmer",
                difficulty: "easy"
              },
              {
                phrase: "Die Küche", 
                romanian: "Bucătăria",
                audio: "vocab_die_kueche",
                difficulty: "easy"
              },
              {
                phrase: "Mein Zimmer",
                romanian: "Camera mea", 
                audio: "vocab_mein_zimmer",
                difficulty: "medium"
              }
            ]
          },
          {
            id: "haus_story_sequence",
            type: "story_sequence",
            title: "Secvența poveștii",
            instructions: "Aranjează în ordine povestea",
            sequence: [
              {
                step: 1,
                german: "Björn arată casa",
                romanian: "Björn shows the house",
                image: "haus_exterior",
                audio: "sequence_01"
              },
              {
                step: 2,
                german: "Intră în living",
                romanian: "Enter the living room",
                image: "haus_wohnzimmer",
                audio: "sequence_02"
              },
              {
                step: 3,
                german: "Vizitează bucătăria",
                romanian: "Visit the kitchen", 
                image: "haus_kueche",
                audio: "sequence_03"
              },
              {
                step: 4,
                german: "Urcă la dormitoare",
                romanian: "Go up to bedrooms",
                image: "haus_schlafzimmer",
                audio: "sequence_04"
              }
            ]
          }
        ]
      }
    ];
  }

  /**
   * Generate character definitions for haus story
   */
  generateCharacters() {
    return {
      björn: {
        name: "Björn",
        fullName: "Björn der Bär",
        type: "bear",
        description: "Un urs prietenos care face turul casei",
        personality: "gazda perfectă, organizat, mândru de casa lui",
        images: {
          default: "bjorn_default",
          pointing: "bjorn_pointing",
          proud: "bjorn_proud_house"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      emma: {
        name: "Emma", 
        fullName: "Emma die Ente",
        type: "duck",
        description: "O rățușcă curioasă care explorează casa",
        personality: "curioasă, impresionată, aventuroasă",
        images: {
          default: "emma_excited",
          curious: "emma_curious",
          impressed: "emma_impressed"
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
          background: "#FFF7ED",
          primary: "#F59E0B",
          secondary: "#FBBF24",
          accent: "#10B981",
          text: "#92400E"
        },
        images: {
          background: "haus_interior",
          scenery: ["haus_exterior", "haus_garden", "haus_entrance"]
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
        id: "drag_drop_rooms",
        type: "drag_drop", 
        difficulty: "easy",
        category: "rooms"
      },
      {
        id: "speaking_challenge_rooms",
        type: "speaking_challenge",
        difficulty: "medium",
        category: "pronunciation"
      },
      {
        id: "story_sequence_house_tour",
        type: "story_sequence",
        difficulty: "medium", 
        category: "comprehension"
      }
    ];
  }

  /**
   * Generate audio configuration
   */
  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/haus",
      files: {
        // Story scenes
        "haus_L03_scene_01": "L03_scene_wohnzimmer_intro.mp3",
        "haus_L03_scene_02": "L03_scene_emma_question_kueche.mp3",
        "haus_L03_scene_03": "L03_scene_kueche_intro.mp3",
        "haus_L03_scene_04": "L03_scene_schlafzimmer_intro.mp3",
        "haus_L03_scene_05": "L03_scene_emma_compliment.mp3",
        
        // Vocabulary
        "vocab_das_haus": "L03_vocab_das_haus.mp3",
        "vocab_das_wohnzimmer": "L03_vocab_das_wohnzimmer.mp3",
        "vocab_die_kueche": "L03_vocab_die_kueche.mp3",
        "vocab_das_schlafzimmer": "L03_vocab_das_schlafzimmer.mp3",
        "vocab_mein": "L03_vocab_mein.mp3",
        "vocab_das_zimmer": "L03_vocab_das_zimmer.mp3",
        "vocab_das_essen": "L03_vocab_das_essen.mp3",
        "vocab_hier": "L03_vocab_hier.mp3",
        "vocab_mein_zimmer": "L03_vocab_mein_zimmer.mp3",
        
        // Game audio
        "sequence_01": "L03_sequence_house_show.mp3",
        "sequence_02": "L03_sequence_living_room.mp3", 
        "sequence_03": "L03_sequence_kitchen.mp3",
        "sequence_04": "L03_sequence_bedrooms.mp3"
      }
    };
  }
}