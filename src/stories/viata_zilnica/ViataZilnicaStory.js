import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Viața Zilnică Story - Lecțiile 11-15
 * Învățarea despre haine, vreme, animale de companie, jucării și treburi casnice
 */
export class ViataZilnicaStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'viata_zilnica',
        name: 'Viața Zilnică',
        description: 'Descoperă activitățile zilnice: hainele, vremea, animalele și treburile',
        order: 4,
        difficulty: 'beginner',
        estimatedDuration: 15, // minutes per lesson
        color: '#95E1D3', // Mint green
        icon: '🏠',
        lessonsRange: '11-15',
        totalLessons: 5
      },

      lessons: this.createLessons(),
      characters: this.generateCharacters(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {
        prerequisiteStories: ['familia_extinsa'],
        minimumProgress: {
          'familia_extinsa': 80
        }
      }
    };

    await this.initializeWithData(storyData);
  }

  createLessons() {
    return [
      // Lecția 11: Hainele lui Björn
      {
        id: 11,
        title: "Hainele lui Björn",
        subtitle: "Ce se îmbracă astăzi",
        duration: 5,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Es ist kalt heute! Was soll ich anziehen?",
              romanian: "Este frig astăzi! Ce să îmbrac?",
              image: "bjorn_choosing_clothes",
              audio: "L11_scene_01_cold_weather"
            },
            {
              character: "emma",
              german: "Zieh deine warme Jacke und den Hut an!",
              romanian: "Îmbracă-ți jacheta caldă și pălăria!",
              image: "emma_suggesting_clothes",
              audio: "L11_scene_02_emma_suggestion"
            },
            {
              character: "björn",
              german: "Gut! Und ich brauche auch meine Handschuhe!",
              romanian: "Bine! Și am nevoie și de mănuși!",
              image: "bjorn_with_gloves",
              audio: "L11_scene_03_bjorn_gloves"
            },
            {
              character: "anna",
              german: "Ich trage heute mein rotes Kleid und schwarze Schuhe!",
              romanian: "Port astăzi rochia mea roșie și pantofi negri!",
              image: "anna_red_dress_shoes",
              audio: "L11_scene_04_anna_outfit"
            },
            {
              character: "björn",
              german: "Wir sehen alle sehr schön aus!",
              romanian: "Arătăm toți foarte frumos!",
              image: "family_well_dressed",
              audio: "L11_scene_05_looking_good"
            }
          ]
        },

        vocabulary: [
          { german: "kalt", romanian: "rece", category: "vreme", audio: "vocab_kalt" },
          { german: "anziehen", romanian: "a îmbrăca", category: "verbe", audio: "vocab_anziehen" },
          { german: "die Jacke", romanian: "jacheta", category: "haine", audio: "vocab_die_jacke" },
          { german: "der Hut", romanian: "pălăria", category: "haine", audio: "vocab_der_hut" },
          { german: "die Handschuhe", romanian: "mănușile", category: "haine", audio: "vocab_die_handschuhe" },
          { german: "das Kleid", romanian: "rochia", category: "haine", audio: "vocab_das_kleid" },
          { german: "die Schuhe", romanian: "pantofii", category: "haine", audio: "vocab_die_schuhe" },
          { german: "tragen", romanian: "a purta", category: "verbe", audio: "vocab_tragen" }
        ],

        games: [
          {
            id: "L11_drag_drop",
            type: "drag_drop",
            title: "Îmbracă personajele",
            instructions: "Conectează hainele cu partea corpului unde se poartă",
            items: [
              { german: "der Hut", romanian: "pălăria", image: "winter_hat", category: "head", audio: "vocab_der_hut" },
              { german: "die Jacke", romanian: "jacheta", image: "warm_jacket", category: "body", audio: "vocab_die_jacke" },
              { german: "die Handschuhe", romanian: "mănușile", image: "winter_gloves", category: "hands", audio: "vocab_die_handschuhe" },
              { german: "die Schuhe", romanian: "pantofii", image: "black_shoes", category: "feet", audio: "vocab_die_schuhe" }
            ]
          },
          {
            id: "L11_memory",
            type: "memory",
            title: "Jocul memoriei - Haine",
            instructions: "Găsește perechile cu hainele",
            pairs: [
              { german: "die Jacke", romanian: "jacheta", audio: "vocab_die_jacke" },
              { german: "der Hut", romanian: "pălăria", audio: "vocab_der_hut" },
              { german: "die Handschuhe", romanian: "mănușile", audio: "vocab_die_handschuhe" },
              { german: "das Kleid", romanian: "rochia", audio: "vocab_das_kleid" }
            ]
          },
          {
            id: "L11_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să spunem ce purtăm!",
            instructions: "Emma: 'Spune ce porți!'",
            challenges: [
              {
                phrase: "Ich trage eine Jacke",
                romanian: "Port o jachetă",
                audio: "speaking_ich_trage_jacke",
                difficulty: "easy"
              },
              {
                phrase: "Es ist kalt heute",
                romanian: "Este frig astăzi",
                audio: "speaking_es_ist_kalt",
                difficulty: "medium"
              }
            ]
          }
        ]
      },

      // Lecția 12: Vremea de afară
      {
        id: 12,
        title: "Vremea de afară",
        subtitle: "Cum e vremea astăzi?",
        duration: 5,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Schau aus dem Fenster! Wie ist das Wetter heute?",
              romanian: "Uită-te pe fereastră! Cum e vremea astăzi?",
              image: "bjorn_looking_window",
              audio: "L12_scene_01_weather_check"
            },
            {
              character: "emma",
              german: "Es regnet! Die Wolken sind grau und dunkel!",
              romanian: "Plouă! Norii sunt cenușii și întunecați!",
              image: "rainy_gray_clouds",
              audio: "L12_scene_02_emma_rain"
            },
            {
              character: "anna",
              german: "Gestern war es sonnig und warm!",
              romanian: "Ieri a fost însorit și cald!",
              image: "anna_remembering_sunny",
              audio: "L12_scene_03_anna_yesterday"
            },
            {
              character: "björn",
              german: "Morgen wird es vielleicht schneien!",
              romanian: "Mâine poate că va ninge!",
              image: "bjorn_snow_prediction",
              audio: "L12_scene_04_snow_tomorrow"
            },
            {
              character: "emma",
              german: "Ich liebe alle Jahreszeiten!",
              romanian: "Îmi plac toate anotimpurile!",
              image: "emma_four_seasons",
              audio: "L12_scene_05_love_seasons"
            }
          ]
        },

        vocabulary: [
          { german: "das Wetter", romanian: "vremea", category: "natură", audio: "vocab_das_wetter" },
          { german: "regnen", romanian: "a ploua", category: "vreme", audio: "vocab_regnen" },
          { german: "die Wolken", romanian: "norii", category: "natură", audio: "vocab_die_wolken" },
          { german: "sonnig", romanian: "însorit", category: "vreme", audio: "vocab_sonnig" },
          { german: "warm", romanian: "cald", category: "temperatură", audio: "vocab_warm" },
          { german: "schneien", romanian: "a ninge", category: "vreme", audio: "vocab_schneien" },
          { german: "die Jahreszeiten", romanian: "anotimpurile", category: "timp", audio: "vocab_die_jahreszeiten" },
          { german: "gestern", romanian: "ieri", category: "timp", audio: "vocab_gestern" }
        ],

        games: [
          {
            id: "L12_drag_drop",
            type: "drag_drop",
            title: "Vremea și activitățile",
            instructions: "Asociază vremea cu activitatea potrivită",
            items: [
              { german: "sonnig", romanian: "însorit", image: "sunny_day", category: "weather", audio: "vocab_sonnig" },
              { german: "regnen", romanian: "ploios", image: "rainy_day", category: "weather", audio: "vocab_regnen" },
              { german: "schneien", romanian: "ninge", image: "snowy_day", category: "weather", audio: "vocab_schneien" },
              { german: "die Wolken", romanian: "norii", image: "cloudy_sky", category: "weather", audio: "vocab_die_wolken" }
            ]
          },
          {
            id: "L12_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Vremea",
            instructions: "Max: 'Alege vremea corectă!'",
            questions: [
              {
                question: "Cum spui 'plouă' în germană?",
                options: ["es regnet", "es schneit", "es ist sonnig"],
                correct: 0,
                audio: "question_regnet"
              },
              {
                question: "Ce înseamnă 'warm' în română?",
                options: ["rece", "cald", "ploios"],
                correct: 1,
                audio: "question_warm"
              }
            ]
          },
          {
            id: "L12_word_builder",
            type: "word_puzzle",
            title: "Construiește cuvântul pentru 'vreme'!",
            instructions: "Max: 'Aranjează literele pentru WETTER!'",
            targetWord: "WETTER",
            availableLetters: ["W", "E", "T", "T", "E", "R", "S", "A"],
            difficulty: "medium"
          }
        ]
      },

      // Lecția 13: Animalele de companie
      {
        id: 13,
        title: "Animalele de companie",
        subtitle: "Prietenii noștri păroși",
        duration: 5,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Wir haben einen neuen Freund! Einen kleinen Hund!",
              romanian: "Avem un prieten nou! Un căței mic!",
              image: "bjorn_with_puppy",
              audio: "L13_scene_01_new_dog"
            },
            {
              character: "emma",
              german: "Wie süß! Wie heißt er denn?",
              romanian: "Ce drăguț! Cum îl cheamă?",
              image: "emma_admiring_puppy",
              audio: "L13_scene_02_emma_cute"
            },
            {
              character: "björn",
              german: "Sein Name ist Bello! Er kann bellen und laufen!",
              romanian: "Numele lui este Bello! Poate să latre și să aleargă!",
              image: "bello_barking_running",
              audio: "L13_scene_03_bello_actions"
            },
            {
              character: "anna",
              german: "Ich möchte auch eine Katze haben!",
              romanian: "Vreau și eu să am o pisică!",
              image: "anna_dreaming_cat",
              audio: "L13_scene_04_anna_wants_cat"
            },
            {
              character: "emma",
              german: "Haustiere sind wunderbar! Sie sind unsere Freunde!",
              romanian: "Animalele de companie sunt minunate! Sunt prietenii noștri!",
              image: "emma_pets_friends",
              audio: "L13_scene_05_pets_wonderful"
            }
          ]
        },

        vocabulary: [
          { german: "der Hund", romanian: "câinele", category: "animale", audio: "vocab_der_hund" },
          { german: "die Katze", romanian: "pisica", category: "animale", audio: "vocab_die_katze" },
          { german: "das Haustier", romanian: "animalul de companie", category: "animale", audio: "vocab_das_haustier" },
          { german: "bellen", romanian: "a lătra", category: "sunete animale", audio: "vocab_bellen" },
          { german: "laufen", romanian: "a alerga", category: "verbe mișcare", audio: "vocab_laufen" },
          { german: "süß", romanian: "drăguț", category: "adjective", audio: "vocab_suess" },
          { german: "wunderbar", romanian: "minunat", category: "adjective", audio: "vocab_wunderbar" },
          { german: "der Name", romanian: "numele", category: "identitate", audio: "vocab_der_name" }
        ],

        games: [
          {
            id: "L13_drag_drop",
            type: "drag_drop",
            title: "Animalele și sunetele lor",
            instructions: "Conectează animalele cu sunetele pe care le fac",
            items: [
              { german: "der Hund", romanian: "câinele", image: "dog_bello", category: "animal", audio: "vocab_der_hund" },
              { german: "die Katze", romanian: "pisica", image: "cute_cat", category: "animal", audio: "vocab_die_katze" },
              { german: "bellen", romanian: "lătrat", image: "dog_barking", category: "sound", audio: "vocab_bellen" },
              { german: "laufen", romanian: "alergat", image: "running_pet", category: "action", audio: "vocab_laufen" }
            ]
          },
          {
            id: "L13_memory",
            type: "memory",
            title: "Jocul memoriei - Animale",
            instructions: "Găsește perechile cu animalele de companie",
            pairs: [
              { german: "der Hund", romanian: "câinele", audio: "vocab_der_hund" },
              { german: "die Katze", romanian: "pisica", audio: "vocab_die_katze" },
              { german: "das Haustier", romanian: "animalul de companie", audio: "vocab_das_haustier" },
              { german: "wunderbar", romanian: "minunat", audio: "vocab_wunderbar" }
            ]
          },
          {
            id: "L13_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm despre animalele noastre!",
            instructions: "Emma: 'Vorbește despre animale!'",
            challenges: [
              {
                phrase: "Ich habe einen Hund",
                romanian: "Am un câine",
                audio: "speaking_ich_habe_hund",
                difficulty: "easy"
              },
              {
                phrase: "Der Hund kann bellen",
                romanian: "Câinele poate să latre",
                audio: "speaking_hund_bellen",
                difficulty: "medium"
              },
              {
                phrase: "Haustiere sind wunderbar",
                romanian: "Animalele de companie sunt minunate",
                audio: "speaking_haustiere_wunderbar",
                difficulty: "hard"
              }
            ]
          }
        ]
      },

      // Lecția 14: Jucăriile preferate
      {
        id: 14,
        title: "Jucăriile preferate",
        subtitle: "Cu ce ne jucăm",
        duration: 5,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Schau, Anna! Ich habe neue Spielsachen bekommen!",
              romanian: "Uită-te, Anna! Am primit jucării noi!",
              image: "bjorn_new_toys",
              audio: "L14_scene_01_new_toys"
            },
            {
              character: "anna",
              german: "Wow! Ein Auto, ein Zug und ein Flugzeug!",
              romanian: "Wow! O mașină, un tren și un avion!",
              image: "anna_excited_vehicles",
              audio: "L14_scene_02_anna_vehicles"
            },
            {
              character: "emma",
              german: "Ich spiele gern mit meiner Puppe und den Bauklötzen!",
              romanian: "Îmi place să mă joc cu păpușa mea și cu cuburile!",
              image: "emma_doll_blocks",
              audio: "L14_scene_03_emma_toys"
            },
            {
              character: "max",
              german: "Ich habe einen bunten Ball zum Spielen!",
              romanian: "Am o minge colorată cu care să mă joc!",
              image: "max_colorful_ball",
              audio: "L14_scene_04_max_ball"
            },
            {
              character: "björn",
              german: "Lass uns zusammen spielen! Teilen macht Spaß!",
              romanian: "Hai să ne jucăm împreună! A împărți este distractiv!",
              image: "children_sharing_toys",
              audio: "L14_scene_05_sharing_fun"
            }
          ]
        },

        vocabulary: [
          { german: "die Spielsachen", romanian: "jucăriile", category: "jucării", audio: "vocab_die_spielsachen" },
          { german: "das Auto", romanian: "mașina", category: "vehicule", audio: "vocab_das_auto" },
          { german: "der Zug", romanian: "trenul", category: "vehicule", audio: "vocab_der_zug" },
          { german: "das Flugzeug", romanian: "avionul", category: "vehicule", audio: "vocab_das_flugzeug" },
          { german: "die Puppe", romanian: "păpușa", category: "jucării", audio: "vocab_die_puppe" },
          { german: "die Bauklötze", romanian: "cuburile de construcție", category: "jucării", audio: "vocab_die_baukloetze" },
          { german: "teilen", romanian: "a împărți", category: "comportament", audio: "vocab_teilen" },
          { german: "der Spaß", romanian: "distracția", category: "sentimente", audio: "vocab_der_spass" }
        ],

        games: [
          {
            id: "L14_drag_drop",
            type: "drag_drop",
            title: "Jucăriile și categoriile lor",
            instructions: "Grupează jucăriile pe categorii",
            items: [
              { german: "das Auto", romanian: "mașina", image: "toy_car", category: "vehicles", audio: "vocab_das_auto" },
              { german: "der Zug", romanian: "trenul", image: "toy_train", category: "vehicles", audio: "vocab_der_zug" },
              { german: "die Puppe", romanian: "păpușa", image: "toy_doll", category: "dolls", audio: "vocab_die_puppe" },
              { german: "die Bauklötze", romanian: "cuburile", image: "building_blocks", category: "construction", audio: "vocab_die_baukloetze" }
            ]
          },
          {
            id: "L14_story_sequence",
            type: "story_sequence",
            title: "Cum ne jucăm împreună",
            instructions: "Aranjează activitățile de joacă în ordine",
            sequence: [
              {
                step: 1,
                german: "Björn primește jucării noi",
                romanian: "Björn bekommt neue Spielsachen",
                image: "bjorn_receiving_toys",
                audio: "sequence_01_receiving"
              },
              {
                step: 2,
                german: "Anna se uită la jucării",
                romanian: "Anna schaut die Spielsachen an",
                image: "anna_looking_toys",
                audio: "sequence_02_looking"
              },
              {
                step: 3,
                german: "Emma aduce păpușa ei",
                romanian: "Emma bringt ihre Puppe",
                image: "emma_bringing_doll",
                audio: "sequence_03_bringing"
              },
              {
                step: 4,
                german: "Max vine cu mingea lui",
                romanian: "Max kommt mit seinem Ball",
                image: "max_with_ball",
                audio: "sequence_04_ball"
              },
              {
                step: 5,
                german: "Toți se joacă împreună",
                romanian: "Alle spielen zusammen",
                image: "everyone_playing_together",
                audio: "sequence_05_together"
              }
            ]
          },
          {
            id: "L14_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Jucării",
            instructions: "Max: 'Ce jucărie este aceasta?'",
            questions: [
              {
                question: "Cu ce zbori în aer?",
                options: ["das Auto", "der Zug", "das Flugzeug"],
                correct: 2,
                audio: "question_flugzeug"
              },
              {
                question: "Ce înseamnă 'teilen' în română?",
                options: ["a lua", "a împărți", "a ascunde"],
                correct: 1,
                audio: "question_teilen"
              }
            ]
          }
        ]
      },

      // Lecția 15: Treburile casei
      {
        id: 15,
        title: "Treburile casei",
        subtitle: "Ajutăm în gospodărie",
        duration: 5,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "mama_baer",
              german: "Kinder, könnt ihr mir im Haushalt helfen?",
              romanian: "Copii, puteți să mă ajutați la gospodărie?",
              image: "mama_asking_help",
              audio: "L15_scene_01_mama_needs_help"
            },
            {
              character: "björn",
              german: "Ja, Mama! Ich kann mein Zimmer aufräumen!",
              romanian: "Da, mami! Pot să-mi fac curat în cameră!",
              image: "bjorn_cleaning_room",
              audio: "L15_scene_02_bjorn_cleaning"
            },
            {
              character: "anna",
              german: "Ich helfe beim Abwaschen und Tischdecken!",
              romanian: "Ajut la spălat vase și la pus masa!",
              image: "anna_washing_dishes",
              audio: "L15_scene_03_anna_dishes"
            },
            {
              character: "emma",
              german: "Ich kann die Blumen gießen und staubsaugen!",
              romanian: "Pot să ud florile și să aspirez!",
              image: "emma_watering_vacuuming",
              audio: "L15_scene_04_emma_chores"
            },
            {
              character: "mama_baer",
              german: "Ihr seid so hilfsbereit! Vielen Dank!",
              romanian: "Sunteți atât de serviabili! Mulțumesc mult!",
              image: "mama_proud_children",
              audio: "L15_scene_05_mama_grateful"
            }
          ]
        },

        vocabulary: [
          { german: "der Haushalt", romanian: "gospodăria", category: "casă", audio: "vocab_der_haushalt" },
          { german: "helfen", romanian: "a ajuta", category: "comportament", audio: "vocab_helfen" },
          { german: "aufräumen", romanian: "a face curat", category: "treburi", audio: "vocab_aufraeumen" },
          { german: "das Zimmer", romanian: "camera", category: "casă", audio: "vocab_das_zimmer" },
          { german: "abwaschen", romanian: "a spăla vase", category: "treburi", audio: "vocab_abwaschen" },
          { german: "gießen", romanian: "a uda", category: "grădinărit", audio: "vocab_giessen" },
          { german: "staubsaugen", romanian: "a aspira", category: "treburi", audio: "vocab_staubsaugen" },
          { german: "hilfsbereit", romanian: "serviabil", category: "caracteristici", audio: "vocab_hilfsbereit" }
        ],

        games: [
          {
            id: "L15_drag_drop",
            type: "drag_drop",
            title: "Treburile și camerele casei",
            instructions: "Asociază fiecare treabă cu camera potrivită",
            items: [
              { german: "aufräumen", romanian: "a face curat", image: "cleaning_room", category: "bedroom", audio: "vocab_aufraeumen" },
              { german: "abwaschen", romanian: "a spăla vase", image: "washing_dishes", category: "kitchen", audio: "vocab_abwaschen" },
              { german: "gießen", romanian: "a uda florile", image: "watering_plants", category: "garden", audio: "vocab_giessen" },
              { german: "staubsaugen", romanian: "a aspira", image: "vacuuming", category: "living_room", audio: "vocab_staubsaugen" }
            ]
          },
          {
            id: "L15_memory",
            type: "memory",
            title: "Jocul memoriei - Treburi casnice",
            instructions: "Găsește perechile cu treburile casei",
            pairs: [
              { german: "aufräumen", romanian: "a face curat", audio: "vocab_aufraeumen" },
              { german: "abwaschen", romanian: "a spăla vase", audio: "vocab_abwaschen" },
              { german: "gießen", romanian: "a uda", audio: "vocab_giessen" },
              { german: "helfen", romanian: "a ajuta", audio: "vocab_helfen" }
            ]
          },
          {
            id: "L15_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să oferim ajutor!",
            instructions: "Emma: 'Spune cum ajuți acasă!'",
            challenges: [
              {
                phrase: "Ich helfe gern",
                romanian: "Îmi place să ajut",
                audio: "speaking_ich_helfe_gern",
                difficulty: "easy"
              },
              {
                phrase: "Ich räume mein Zimmer auf",
                romanian: "Îmi fac curat în cameră",
                audio: "speaking_zimmer_aufraeumen",
                difficulty: "medium"
              },
              {
                phrase: "Wir helfen im Haushalt",
                romanian: "Ajutăm la gospodărie",
                audio: "speaking_helfen_haushalt",
                difficulty: "hard"
              }
            ]
          }
        ]
      }
    ];
  }

  generateCharacters() {
    return {
      björn: {
        name: "Björn",
        fullName: "Björn der Bär",
        type: "bear",
        description: "Un urs care învață să se îmbrace și să ajute la treburile casei",
        personality: "responsabil, organizat, cooperant",
        images: {
          default: "bjorn_default",
          choosing_clothes: "bjorn_choosing_clothes",
          with_puppy: "bjorn_with_puppy",
          cleaning: "bjorn_cleaning_room"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      emma: {
        name: "Emma",
        fullName: "Emma die Ente",
        type: "duck",
        description: "O rățușcă care îndrăgește toate anotimpurile și animalele",
        personality: "iubitoare de natură, atentă, prietenoasă cu animalele",
        images: {
          default: "emma_excited",
          suggesting: "emma_suggesting_clothes",
          admiring: "emma_admiring_puppy",
          chores: "emma_watering_vacuuming"
        },
        voice: "female_cheerful",
        color: "#FFD700"
      },
      anna: {
        name: "Anna",
        fullName: "Anna die kleine Schwester",
        type: "bear",
        description: "Sora mică care adoră hainele frumoase și jucăriile",
        personality: "fashionistă, jucăușă, serviabilă",
        images: {
          default: "anna_default",
          red_dress: "anna_red_dress_shoes",
          excited_toys: "anna_excited_vehicles",
          dishes: "anna_washing_dishes"
        },
        voice: "child_female",
        color: "#F4A460"
      },
      mama_baer: {
        name: "Mama Bär",
        fullName: "Mama Bär",
        type: "bear",
        description: "Mama care coordonează treburile casei și învață copiii să fie responsabili",
        personality: "organizată, răbdătoare, recunoscătoare",
        images: {
          default: "mama_baer_default",
          asking_help: "mama_asking_help",
          proud: "mama_proud_children"
        },
        voice: "female_warm",
        color: "#D2691E"
      },
      max: {
        name: "Max",
        fullName: "Max der Hase",
        type: "rabbit",
        description: "Un iepuraș energic care adoră să se joace cu mingea",
        personality: "energic, sportiv, prietenos",
        images: {
          default: "max_default",
          ball: "max_colorful_ball",
          with_ball: "max_with_ball"
        },
        voice: "male_young",
        color: "#A0522D"
      },
      bello: {
        name: "Bello",
        fullName: "Bello der Hund",
        type: "dog",
        description: "Cățelul familiei, plin de energie și prietenos",
        personality: "jucăuș, loial, energic",
        images: {
          default: "bello_default",
          barking: "bello_barking_running"
        },
        voice: "dog_bark",
        color: "#8B4513"
      }
    };
  }

  generateGames() {
    return [
      {
        id: "clothing_weather",
        type: "drag_drop",
        difficulty: "easy",
        category: "daily_clothes"
      },
      {
        id: "weather_master",
        type: "word_puzzle",
        difficulty: "medium",
        category: "weather_learning"
      },
      {
        id: "pet_friends",
        type: "memory",
        difficulty: "easy",
        category: "pets_animals"
      },
      {
        id: "toy_sharing",
        type: "story_sequence",
        difficulty: "medium",
        category: "toys_sharing"
      },
      {
        id: "house_helper",
        type: "drag_drop",
        difficulty: "medium",
        category: "household_chores"
      }
    ];
  }

  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/viata_zilnica",
      files: {
        // Lecția 11 - Hainele lui Björn
        "L11_scene_01_cold_weather": "L11_bjorn_cold_weather.mp3",
        "L11_scene_02_emma_suggestion": "L11_emma_clothing_suggestion.mp3",
        "L11_scene_03_bjorn_gloves": "L11_bjorn_needs_gloves.mp3",
        "L11_scene_04_anna_outfit": "L11_anna_red_dress_outfit.mp3",
        "L11_scene_05_looking_good": "L11_bjorn_looking_good.mp3",
        
        // Lecția 12 - Vremea de afară
        "L12_scene_01_weather_check": "L12_bjorn_weather_check.mp3",
        "L12_scene_02_emma_rain": "L12_emma_rainy_clouds.mp3",
        "L12_scene_03_anna_yesterday": "L12_anna_sunny_yesterday.mp3",
        "L12_scene_04_snow_tomorrow": "L12_bjorn_snow_tomorrow.mp3",
        "L12_scene_05_love_seasons": "L12_emma_loves_seasons.mp3",
        
        // Lecția 13 - Animalele de companie
        "L13_scene_01_new_dog": "L13_bjorn_new_puppy.mp3",
        "L13_scene_02_emma_cute": "L13_emma_puppy_cute.mp3",
        "L13_scene_03_bello_actions": "L13_bjorn_bello_actions.mp3",
        "L13_scene_04_anna_wants_cat": "L13_anna_wants_cat.mp3",
        "L13_scene_05_pets_wonderful": "L13_emma_pets_wonderful.mp3",
        
        // Lecția 14 - Jucăriile preferate
        "L14_scene_01_new_toys": "L14_bjorn_new_toys.mp3",
        "L14_scene_02_anna_vehicles": "L14_anna_vehicle_toys.mp3",
        "L14_scene_03_emma_toys": "L14_emma_doll_blocks.mp3",
        "L14_scene_04_max_ball": "L14_max_colorful_ball.mp3",
        "L14_scene_05_sharing_fun": "L14_bjorn_sharing_toys.mp3",
        
        // Lecția 15 - Treburile casei
        "L15_scene_01_mama_needs_help": "L15_mama_needs_help_household.mp3",
        "L15_scene_02_bjorn_cleaning": "L15_bjorn_cleaning_room.mp3",
        "L15_scene_03_anna_dishes": "L15_anna_washing_dishes.mp3",
        "L15_scene_04_emma_chores": "L15_emma_watering_vacuuming.mp3",
        "L15_scene_05_mama_grateful": "L15_mama_grateful_helpful.mp3",
        
        // Vocabular L11 - Haine
        "vocab_kalt": "vocab_L11_kalt.mp3",
        "vocab_anziehen": "vocab_L11_anziehen.mp3",
        "vocab_die_jacke": "vocab_L11_die_jacke.mp3",
        "vocab_der_hut": "vocab_L11_der_hut.mp3",
        "vocab_die_handschuhe": "vocab_L11_die_handschuhe.mp3",
        "vocab_das_kleid": "vocab_L11_das_kleid.mp3",
        "vocab_die_schuhe": "vocab_L11_die_schuhe.mp3",
        "vocab_tragen": "vocab_L11_tragen.mp3",
        
        // Vocabular L12 - Vreme
        "vocab_das_wetter": "vocab_L12_das_wetter.mp3",
        "vocab_regnen": "vocab_L12_regnen.mp3",
        "vocab_die_wolken": "vocab_L12_die_wolken.mp3",
        "vocab_sonnig": "vocab_L12_sonnig.mp3",
        "vocab_warm": "vocab_L12_warm.mp3",
        "vocab_schneien": "vocab_L12_schneien.mp3",
        "vocab_die_jahreszeiten": "vocab_L12_die_jahreszeiten.mp3",
        "vocab_gestern": "vocab_L12_gestern.mp3",
        
        // Vocabular L13 - Animale
        "vocab_der_hund": "vocab_L13_der_hund.mp3",
        "vocab_die_katze": "vocab_L13_die_katze.mp3",
        "vocab_das_haustier": "vocab_L13_das_haustier.mp3",
        "vocab_bellen": "vocab_L13_bellen.mp3",
        "vocab_laufen": "vocab_L13_laufen.mp3",
        "vocab_suess": "vocab_L13_suess.mp3",
        "vocab_wunderbar": "vocab_L13_wunderbar.mp3",
        "vocab_der_name": "vocab_L13_der_name.mp3",
        
        // Vocabular L14 - Jucării
        "vocab_die_spielsachen": "vocab_L14_die_spielsachen.mp3",
        "vocab_das_auto": "vocab_L14_das_auto.mp3",
        "vocab_der_zug": "vocab_L14_der_zug.mp3",
        "vocab_das_flugzeug": "vocab_L14_das_flugzeug.mp3",
        "vocab_die_puppe": "vocab_L14_die_puppe.mp3",
        "vocab_die_baukloetze": "vocab_L14_die_baukloetze.mp3",
        "vocab_teilen": "vocab_L14_teilen.mp3",
        "vocab_der_spass": "vocab_L14_der_spass.mp3",
        
        // Vocabular L15 - Treburi
        "vocab_der_haushalt": "vocab_L15_der_haushalt.mp3",
        "vocab_helfen": "vocab_L15_helfen.mp3",
        "vocab_aufraeumen": "vocab_L15_aufraeumen.mp3",
        "vocab_das_zimmer": "vocab_L15_das_zimmer.mp3",
        "vocab_abwaschen": "vocab_L15_abwaschen.mp3",
        "vocab_giessen": "vocab_L15_giessen.mp3",
        "vocab_staubsaugen": "vocab_L15_staubsaugen.mp3",
        "vocab_hilfsbereit": "vocab_L15_hilfsbereit.mp3",
        
        // Speaking challenges
        "speaking_ich_trage_jacke": "speaking_L11_ich_trage_jacke.mp3",
        "speaking_es_ist_kalt": "speaking_L11_es_ist_kalt.mp3",
        "speaking_ich_habe_hund": "speaking_L13_ich_habe_hund.mp3",
        "speaking_hund_bellen": "speaking_L13_hund_bellen.mp3",
        "speaking_haustiere_wunderbar": "speaking_L13_haustiere_wunderbar.mp3",
        "speaking_ich_helfe_gern": "speaking_L15_ich_helfe_gern.mp3",
        "speaking_zimmer_aufraeumen": "speaking_L15_zimmer_aufraeumen.mp3",
        "speaking_helfen_haushalt": "speaking_L15_helfen_haushalt.mp3",
        
        // Game questions
        "question_regnet": "game_L12_question_regnet.mp3",
        "question_warm": "game_L12_question_warm.mp3",
        "question_flugzeug": "game_L14_question_flugzeug.mp3",
        "question_teilen": "game_L14_question_teilen.mp3",
        
        // Story sequences L14
        "sequence_01_receiving": "sequence_L14_01_receiving_toys.mp3",
        "sequence_02_looking": "sequence_L14_02_anna_looking.mp3",
        "sequence_03_bringing": "sequence_L14_03_emma_doll.mp3",
        "sequence_04_ball": "sequence_L14_04_max_ball.mp3",
        "sequence_05_together": "sequence_L14_05_playing_together.mp3"
      }
    };
  }
}