// Datele complete pentru lecțiile din MiniDeutsch
// Zona 1: Castelul Familiei (lecțiile 1-25) - VERSIUNEA COMPLETĂ

export const CASTLE_LESSONS = [
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
          image: "bjorn_familie"
        },
        {
          character: "emma",
          german: "Hallo Björn! Ich bin Emma die Ente. Wie geht es dir?",
          romanian: "Salut Björn! Eu sunt Emma rățușca. Ce mai faci?",
          image: "bjorn_und_emma"
        },
        {
          character: "björn",
          german: "Mir geht es gut, danke! Und dir?",
          romanian: "Îmi merge bine, mulțumesc! Și ție?",
          image: "bjorn_und_emma"
        },
        {
          character: "emma",
          german: "Auch gut! Lass uns die Kinder begrüßen!",
          romanian: "Și mie bine! Hai să salutăm copiii!",
          image: "emma_excited"
        },
        {
          character: "björn",
          german: "Hallo Kinder! Willkommen in unserem Schloss!",
          romanian: "Salut copii! Bun veniți în castelul nostru!",
          image: "bjorn_und_emma_gruessen"
        }
      ]
    },

    vocabulary: [
      { german: "Hallo", romanian: "Salut", category: "salutări" },
      { german: "Ich bin", romanian: "Eu sunt", category: "prezentare" },
      { german: "der Bär", romanian: "ursul", category: "animale" },
      { german: "die Ente", romanian: "rața", category: "animale" },
      { german: "die Familie", romanian: "familia", category: "familie" },
      { german: "gut", romanian: "bine", category: "stări" },
      { german: "danke", romanian: "mulțumesc", category: "politeță" },
      { german: "die Kinder", romanian: "copiii", category: "familie" }
    ],

    games: [
      {
        type: "touch_and_listen",
        instructor: "björn",
        title: "Touch & Listen Salutări!",
        items: [
          { 
            id: 'bjorn', 
            name: 'Björn', 
            image: 'bjorn_waving', 
            audio: 'hallo_ich_bin_bjorn',
            feedback: "Sehr gut! Das ist Björn der Bär!"
          },
          { 
            id: 'emma', 
            name: 'Emma', 
            image: 'emma_smiling', 
            audio: 'emma_greeting',
            feedback: "Wunderbar! Das ist Emma die Ente!"
          },
          { 
            id: 'familie', 
            name: 'Familie', 
            image: 'bear_family', 
            audio: 'die_familie',
            feedback: "Toll! Das ist die Familie!"
          },
          { 
            id: 'kinder', 
            name: 'Kinder', 
            image: 'happy_children', 
            audio: 'die_kinder',
            feedback: "Perfect! Das sind die Kinder!"
          }
        ]
      },
      {
        type: "drag_match_voices",
        instructor: "emma",
        title: "Drag & Match Voices!",
        audioButtons: [
          { id: 'hallo', text: 'Hallo!', audioFile: 'hallo', targetCharacter: 'bjorn' },
          { id: 'danke', text: 'Danke!', audioFile: 'danke', targetCharacter: 'emma' },
          { id: 'familie', text: 'Familie!', audioFile: 'familie', targetCharacter: 'family' },
          { id: 'baer', text: 'Bär!', audioFile: 'baer', targetCharacter: 'bjorn' }
        ],
        characters: [
          { id: 'bjorn', name: 'Björn', image: 'bjorn_happy' },
          { id: 'emma', name: 'Emma', image: 'emma_happy' },
          { id: 'family', name: 'Familie', image: 'bear_family' }
        ]
      },
      {
        type: "simon_says",
        instructor: "björn",
        title: "Simon Says German!",
        rounds: [
          { 
            command: 'Zeig mir... Hallo!', 
            correctImage: 'hand_waving', 
            images: ['hand_waving', 'bear_family', 'house'],
            audio: 'show_hallo'
          },
          { 
            command: 'Zeig mir... Familie!', 
            correctImage: 'bear_family', 
            images: ['hand_waving', 'bear_family', 'children_playing'],
            audio: 'show_familie'
          },
          { 
            command: 'Zeig mir... Bär!', 
            correctImage: 'bjorn_standing', 
            images: ['emma_duck', 'bjorn_standing', 'children_group'],
            audio: 'show_baer'
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 1 }
    },

    unlock_requirements: null,
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

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
          image: "bjorn_with_papa"
        },
        {
          character: "emma",
          german: "Und wo ist deine Mutter, Björn?",
          romanian: "Și unde este mama ta, Björn?",
          image: "emma_curious"
        },
        {
          character: "björn",
          german: "Hier ist sie! Das ist Mama Bär. Sie ist sehr lieb.",
          romanian: "Aici este! Aceasta este Mama Bear. Ea este foarte drăguță.",
          image: "bjorn_with_mama"
        },
        {
          character: "björn",
          german: "Ich habe auch eine kleine Schwester. Sie heißt Anna.",
          romanian: "Am și o surioară mică. Ea se numește Anna.",
          image: "bjorn_with_anna"
        },
        {
          character: "emma",
          german: "Was für eine schöne Familie!",
          romanian: "Ce familie frumoasă!",
          image: "whole_bear_family"
        }
      ]
    },

    vocabulary: [
      { german: "der Vater", romanian: "tatăl", category: "familie" },
      { german: "die Mutter", romanian: "mama", category: "familie" },
      { german: "Papa", romanian: "tata", category: "familie" },
      { german: "Mama", romanian: "mama", category: "familie" },
      { german: "er", romanian: "el", category: "pronume" },
      { german: "sie", romanian: "ea", category: "pronume" },
      { german: "die Schwester", romanian: "sora", category: "familie" },
      { german: "schön", romanian: "frumos/frumoasă", category: "adjective" }
    ],

    games: [
      {
        type: "family_tree_builder",
        instructor: "björn",
        title: "Construiește Arborele Familiei!",
        familyMembers: [
          { id: 'papa_bear', name: 'Papa Bär', image: 'papa_bear', slot: 'papa' },
          { id: 'mama_bear', name: 'Mama Bär', image: 'mama_bear', slot: 'mama' },
          { id: 'bjorn_bear', name: 'Björn', image: 'bjorn_happy', slot: 'bjorn' },
          { id: 'anna_bear', name: 'Anna', image: 'anna_bear', slot: 'anna' }
        ]
      },
      {
        type: "voice_matching_pairs",
        instructor: "emma",
        title: "Potrivește Vocile cu Personajele!",
        voicePairs: [
          { id: 'papa_voice', audioFile: 'papa_voice', character: 'papa_bear', feedback: 'Das ist Papa Bärs Stimme!' },
          { id: 'mama_voice', audioFile: 'mama_voice', character: 'mama_bear', feedback: 'Das ist Mama Bärs Stimme!' },
          { id: 'bjorn_voice', audioFile: 'bjorn_voice', character: 'bjorn_happy', feedback: 'Das ist Björns Stimme!' },
          { id: 'anna_voice', audioFile: 'anna_voice', character: 'anna_bear', feedback: 'Das ist Annas Stimme!' }
        ],
        characters: [
          { id: 'papa_bear', name: 'Papa Bär', image: 'papa_bear' },
          { id: 'mama_bear', name: 'Mama Bär', image: 'mama_bear' },
          { id: 'bjorn_happy', name: 'Björn', image: 'bjorn_happy' },
          { id: 'anna_bear', name: 'Anna', image: 'anna_bear' }
        ]
      },
      {
        type: "character_emotion_reader",
        instructor: "max",
        title: "Citește Emoțiile Personajelor!",
        emotionScenes: [
          {
            image: 'bjorn_happy',
            text: 'Björn zâmbește larg și pare foarte fericit să-și prezinte familia.',
            correctEmotion: 'happy',
            options: ['happy', 'sad', 'angry', 'surprised']
          },
          {
            image: 'emma_excited',
            text: 'Emma bate din aripi de bucurie când vede familia frumoasă.',
            correctEmotion: 'excited',
            options: ['excited', 'tired', 'confused', 'scared']
          },
          {
            image: 'anna_shy',
            text: 'Anna se ascunde în spatele mamei când vede vizitatorii.',
            correctEmotion: 'shy',
            options: ['shy', 'angry', 'happy', 'sleepy']
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 2 }
    },

    unlock_requirements: { lesson_completed: 1 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 3,
    title: "Casa noastră",
    subtitle: "Camerele din casă",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Willkommen in unserem Haus! Das ist unser Wohnzimmer.",
          romanian: "Bun veniți în casa noastră! Aceasta este camera noastră de zi.",
          image: "living_room_tour"
        },
        {
          character: "emma",
          german: "Sehr gemütlich! Und wo ist die Küche?",
          romanian: "Foarte confortabil! Și unde este bucătăria?",
          image: "emma_impressed"
        },
        {
          character: "björn",
          german: "Die Küche ist hier. Mama kocht hier das Essen.",
          romanian: "Bucătăria este aici. Mama gătește aici mâncarea.",
          image: "kitchen_with_mama"
        },
        {
          character: "björn",
          german: "Oben sind die Schlafzimmer. Das ist mein Zimmer!",
          romanian: "Sus sunt dormitoarele. Aceasta este camera mea!",
          image: "bjorn_bedroom"
        },
        {
          character: "emma",
          german: "Dein Zimmer ist sehr ordentlich!",
          romanian: "Camera ta este foarte ordonată!",
          image: "emma_admiring"
        }
      ]
    },

    vocabulary: [
      { german: "das Haus", romanian: "casa", category: "locuință" },
      { german: "das Wohnzimmer", romanian: "camera de zi", category: "locuință" },
      { german: "die Küche", romanian: "bucătăria", category: "locuință" },
      { german: "das Schlafzimmer", romanian: "dormitorul", category: "locuință" },
      { german: "mein", romanian: "al meu", category: "pronume posesive" },
      { german: "das Zimmer", romanian: "camera", category: "locuință" },
      { german: "das Essen", romanian: "mâncarea", category: "hrană" },
      { german: "hier", romanian: "aici", category: "locații" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Conectează camerele casei:",
        items: [
          { 
            text: "die Küche", 
            target: "kitchen",
            correct: true,
            feedback: "Sehr gut! Das ist die Küche!" 
          },
          { 
            text: "das Wohnzimmer", 
            target: "living_room",
            correct: true,
            feedback: "Perfect! Das ist das Wohnzimmer!" 
          },
          { 
            text: "das Schlafzimmer", 
            target: "bedroom",
            correct: true,
            feedback: "Wunderbar! Das ist das Schlafzimmer!" 
          },
          { 
            text: "mein Zimmer", 
            target: "bjorn_room",
            correct: true,
            feedback: "Toll! Das ist Björns Zimmer!" 
          }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Repetă numele camerelor!",
        phrases: [
          {
            german: "Das Wohnzimmer",
            romanian: "Camera de zi",
            audio: "emma_wohnzimmer",
            feedback: "Sehr gut! Pronunția perfectă!"
          },
          {
            german: "Die Küche",
            romanian: "Bucătăria",
            audio: "emma_küche",
            feedback: "Wunderbar! Excelent!"
          },
          {
            german: "Mein Zimmer",
            romanian: "Camera mea",
            audio: "emma_mein_zimmer",
            feedback: "Toll! Ai învățat!"
          }
        ]
      },
      {
        type: "story_sequence",
        instructor: "max",
        title: "Aranjează în ordine povestea:",
        sequence: [
          { image: "house_showing", text: "Björn arată casa", order: 1 },
          { image: "living_room", text: "Intră în living", order: 2 },
          { image: "kitchen_visit", text: "Vizitează bucătăria", order: 3 },
          { image: "bedroom_upstairs", text: "Urcă la dormitoare", order: 4 }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 3 }
    },

    unlock_requirements: { lesson_completed: 2 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 4,
    title: "Dimineața în familie",
    subtitle: "Activitățile de dimineață",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Guten Morgen! Ich stehe früh auf.",
          romanian: "Bună dimineața! Mă scol devreme.",
          image: "bjorn_waking_up"
        },
        {
          character: "papa_bear",
          german: "Guten Morgen, Björn! Hast du gut geschlafen?",
          romanian: "Bună dimineața, Björn! Ai dormit bine?",
          image: "papa_greeting"
        },
        {
          character: "björn",
          german: "Ja, sehr gut! Wo ist das Frühstück?",
          romanian: "Da, foarte bine! Unde este micul dejun?",
          image: "bjorn_looking_for_breakfast"
        },
        {
          character: "mama_bear",
          german: "Das Frühstück ist fertig! Kommt zum Tisch!",
          romanian: "Micul dejun este gata! Veniți la masă!",
          image: "mama_breakfast_ready"
        },
        {
          character: "emma",
          german: "Mmm, es riecht so gut!",
          romanian: "Mmm, miroase atât de bine!",
          image: "emma_smelling_food"
        }
      ]
    },

    vocabulary: [
      { german: "Guten Morgen", romanian: "Bună dimineața", category: "salutări" },
      { german: "aufstehen", romanian: "a se scula", category: "activități" },
      { german: "schlafen", romanian: "a dormi", category: "activități" },
      { german: "das Frühstück", romanian: "micul dejun", category: "mâncare" },
      { german: "fertig", romanian: "gata", category: "stări" },
      { german: "der Tisch", romanian: "masa", category: "mobilier" },
      { german: "ja", romanian: "da", category: "cuvinte de bază" },
      { german: "früh", romanian: "devreme", category: "timp" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Activitățile dimineții:",
        items: [
          { 
            text: "aufstehen", 
            target: "bjorn_getting_up",
            correct: true,
            feedback: "Sehr gut! Björn se scoală!" 
          },
          { 
            text: "das Frühstück", 
            target: "breakfast_table",
            correct: true,
            feedback: "Perfect! Micul dejun!" 
          },
          { 
            text: "der Tisch", 
            target: "dining_table",
            correct: true,
            feedback: "Wunderbar! Masa!" 
          },
          { 
            text: "schlafen", 
            target: "bjorn_sleeping",
            correct: true,
            feedback: "Toll! Björn doarme!" 
          }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Cum spui 'Bună dimineața' în germană?",
            options: ["Guten Tag", "Guten Morgen", "Gute Nacht"],
            correct: 1,
            feedback: "Richtig! Guten Morgen înseamnă bună dimineața!"
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Perechile dimineții:",
        pairs: [
          { romanian: "BUNĂ DIMINEAȚA", german: "GUTEN MORGEN", feedback: "Perfekt! Salutul dimineții!" },
          { romanian: "A DORMI", german: "SCHLAFEN", feedback: "Sehr gut! Somnul odihnitor!" },
          { romanian: "MICUL DEJUN", german: "DAS FRÜHSTÜCK", feedback: "Toll! Prima masă a zilei!" },
          { romanian: "MASA", german: "DER TISCH", feedback: "Wunderbar! Locul unde mâncăm!" }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 4 }
    },

    unlock_requirements: { lesson_completed: 3 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 5,
    title: "Jocurile cu Anna",
    subtitle: "Activități și jocuri",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Anna, willst du spielen?",
          romanian: "Anna, vrei să te joci?",
          image: "bjorn_asking_anna"
        },
        {
          character: "anna",
          german: "Ja! Was wollen wir spielen?",
          romanian: "Da! Ce vrem să ne jucăm?",
          image: "anna_excited"
        },
        {
          character: "björn",
          german: "Wir können mit dem Ball spielen oder lesen.",
          romanian: "Ne putem juca cu mingea sau să citim.",
          image: "bjorn_suggesting_games"
        },
        {
          character: "emma",
          german: "Lesen ist toll! Ich liebe Bücher!",
          romanian: "Cititul este minunat! Îmi plac cărțile!",
          image: "emma_loves_books"
        },
        {
          character: "anna",
          german: "Ich auch! Lass uns zusammen lesen!",
          romanian: "Și mie! Hai să citim împreună!",
          image: "anna_choosing_reading"
        }
      ]
    },

    vocabulary: [
      { german: "spielen", romanian: "a se juca", category: "activități" },
      { german: "wollen", romanian: "a vrea", category: "verbe" },
      { german: "der Ball", romanian: "mingea", category: "jucării" },
      { german: "lesen", romanian: "a citi", category: "activități" },
      { german: "das Buch", romanian: "cartea", category: "obiecte" },
      { german: "lieben", romanian: "a iubi/a plăcea", category: "emoții" },
      { german: "zusammen", romanian: "împreună", category: "cuvinte de legătură" },
      { german: "toll", romanian: "minunat", category: "adjective" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Jocurile și activitățile:",
        items: [
          { 
            text: "spielen", 
            target: "bjorn_anna_playing",
            correct: true,
            feedback: "Sehr gut! Se joacă împreună!" 
          },
          { 
            text: "der Ball", 
            target: "colorful_ball",
            correct: true,
            feedback: "Perfect! Mingea colorată!" 
          },
          { 
            text: "das Buch", 
            target: "story_book",
            correct: true,
            feedback: "Wunderbar! Cartea cu povești!" 
          },
          { 
            text: "lesen", 
            target: "reading_together",
            correct: true,
            feedback: "Toll! Citesc împreună!" 
          }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm să spunem ce ne place să facem!",
        phrases: [
          {
            german: "Ich spiele gern",
            romanian: "Îmi place să mă joc",
            audio: "emma_spiele_gern",
            feedback: "Sehr gut! Îți place să te joci!"
          },
          {
            german: "Ich lese gern",
            romanian: "Îmi place să citesc",
            audio: "emma_lese_gern",
            feedback: "Wunderbar! Îți place să citești!"
          },
          {
            german: "Wir spielen zusammen",
            romanian: "Ne jucăm împreună",
            audio: "emma_zusammen_spielen",
            feedback: "Toll! Vă jucați împreună!"
          }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Ce înseamnă 'zusammen' în română?",
            options: ["singur", "împreună", "repede"],
            correct: 1,
            feedback: "Richtig! Zusammen înseamnă împreună!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 5 }
    },

    unlock_requirements: { lesson_completed: 4 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 6,
    title: "Culorile casei",
    subtitle: "Învățăm culorile",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Schau, Emma! Unser Haus ist bunt!",
          romanian: "Uită-te, Emma! Casa noastră este colorată!",
          image: "colorful_house"
        },
        {
          character: "emma",
          german: "Ja! Die Wände sind gelb wie die Sonne!",
          romanian: "Da! Pereții sunt galbeni ca soarele!",
          image: "yellow_walls_sun"
        },
        {
          character: "björn",
          german: "Und die Türen sind braun wie Schokolade!",
          romanian: "Și ușile sunt maro ca ciocolata!",
          image: "brown_doors_chocolate"
        },
        {
          character: "emma",
          german: "Die Blumen im Garten sind rot und blau!",
          romanian: "Florile din grădină sunt roșii și albastre!",
          image: "red_blue_flowers"
        },
        {
          character: "björn",
          german: "Alles ist so schön und farbenfroh!",
          romanian: "Totul este atât de frumos și colorat!",
          image: "beautiful_colorful_scene"
        }
      ]
    },

    vocabulary: [
      { german: "bunt", romanian: "colorat", category: "adjective" },
      { german: "gelb", romanian: "galben", category: "culori" },
      { german: "braun", romanian: "maro", category: "culori" },
      { german: "rot", romanian: "roșu", category: "culori" },
      { german: "blau", romanian: "albastru", category: "culori" },
      { german: "die Blumen", romanian: "florile", category: "natură" },
      { german: "der Garten", romanian: "grădina", category: "locuri" },
      { german: "farbenfroh", romanian: "colorat", category: "adjective" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Asociază culorile:",
        items: [
          { 
            text: "gelb", 
            target: "yellow_sun",
            correct: true,
            feedback: "Sehr gut! Galben ca soarele!" 
          },
          { 
            text: "rot", 
            target: "red_apple",
            correct: true,
            feedback: "Perfect! Roșu ca mărul!" 
          },
          { 
            text: "blau", 
            target: "blue_sky",
            correct: true,
            feedback: "Wunderbar! Albastru ca cerul!" 
          },
          { 
            text: "braun", 
            target: "brown_bear",
            correct: true,
            feedback: "Toll! Maro ca ursul!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Perechile de culori:",
        pairs: [
          { romanian: "GALBEN", german: "GELB", feedback: "Perfekt! Culoarea soarelui!" },
          { romanian: "ROȘU", german: "ROT", feedback: "Sehr gut! Culoarea mărul!" },
          { romanian: "ALBASTRU", german: "BLAU", feedback: "Toll! Culoarea cerului!" },
          { romanian: "MARO", german: "BRAUN", feedback: "Wunderbar! Culoarea ursului!" }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Ce culoare are cerul?",
            options: ["gelb", "rot", "blau"],
            correct: 2,
            feedback: "Richtig! Cerul este blau - albastru!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 6 }
    },

    unlock_requirements: { lesson_completed: 5 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 7,
    title: "Mâncarea preferată",
    subtitle: "Mâncăruri și băuturi",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Ich bin hungrig! Was gibt es zum Mittagessen?",
          romanian: "Mi-e foame! Ce avem la prânz?",
          image: "bjorn_hungry"
        },
        {
          character: "mama_bear",
          german: "Heute gibt es Suppe und Brot!",
          romanian: "Astăzi avem supă și pâine!",
          image: "mama_soup_bread"
        },
        {
          character: "emma",
          german: "Ich esse gern Äpfel und Käse!",
          romanian: "Îmi place să mănânc mere și brânză!",
          image: "emma_apples_cheese"
        },
        {
          character: "björn",
          german: "Und ich trinke gern Milch dazu!",
          romanian: "Și îmi place să beau lapte cu ele!",
          image: "bjorn_drinking_milk"
        },
        {
          character: "anna",
          german: "Nach dem Essen können wir Kuchen haben!",
          romanian: "După mâncare putem să avem prăjitură!",
          image: "anna_cake_suggestion"
        }
      ]
    },

    vocabulary: [
      { german: "hungrig", romanian: "flămând", category: "stări" },
      { german: "das Mittagessen", romanian: "prânzul", category: "mâncare" },
      { german: "die Suppe", romanian: "supa", category: "mâncare" },
      { german: "das Brot", romanian: "pâinea", category: "mâncare" },
      { german: "der Apfel", romanian: "mărul", category: "fructe" },
      { german: "der Käse", romanian: "brânza", category: "mâncare" },
      { german: "die Milch", romanian: "laptele", category: "băuturi" },
      { german: "der Kuchen", romanian: "prăjitura", category: "dulciuri" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Mâncarea și băutura:",
        items: [
          { 
            text: "die Suppe", 
            target: "bowl_soup",
            correct: true,
            feedback: "Sehr gut! Supa caldă!" 
          },
          { 
            text: "das Brot", 
            target: "fresh_bread",
            correct: true,
            feedback: "Perfect! Pâinea proaspătă!" 
          },
          { 
            text: "der Apfel", 
            target: "red_apple",
            correct: true,
            feedback: "Wunderbar! Mărul roșu!" 
          },
          { 
            text: "die Milch", 
            target: "glass_milk",
            correct: true,
            feedback: "Toll! Laptele alb!" 
          }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm să spunem ce mâncăm!",
        phrases: [
          {
            german: "Ich esse Brot",
            romanian: "Mănânc pâine",
            audio: "emma_esse_brot",
            feedback: "Sehr gut! Mănânci pâine!"
          },
          {
            german: "Ich trinke Milch",
            romanian: "Beau lapte",
            audio: "emma_trinke_milch",
            feedback: "Wunderbar! Bei lapte!"
          },
          {
            german: "Ich bin hungrig",
            romanian: "Mi-e foame",
            audio: "emma_bin_hungrig",
            feedback: "Toll! Îți este foame!"
          }
        ]
      },
      {
        type: "word_builder",
        instructor: "max",
        title: "Construiește cuvântul pentru 'măr'!",
        target_word: "APFEL",
        available_letters: ["A", "P", "F", "E", "L", "X", "B", "R"],
        feedback: "Richtig! APFEL înseamnă măr!"
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 7 }
    },

    unlock_requirements: { lesson_completed: 6 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 8,
    title: "Bunicii dragi",
    subtitle: "Familia extinsă",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Heute kommen Opa und Oma zu Besuch!",
          romanian: "Astăzi vin bunicul și bunica în vizită!",
          image: "bjorn_excited_grandparents"
        },
        {
          character: "emma",
          german: "Wie schön! Ich freue mich darauf!",
          romanian: "Ce frumos! Mă bucur de asta!",
          image: "emma_happy"
        },
        {
          character: "opa_bear",
          german: "Hallo, meine lieben Enkelkinder!",
          romanian: "Salut, dragi nepoței ai mei!",
          image: "grandpa_greeting"
        },
        {
          character: "oma_bear",
          german: "Wir haben Geschenke für euch mitgebracht!",
          romanian: "Am adus cadouri pentru voi!",
          image: "grandma_with_gifts"
        },
        {
          character: "björn",
          german: "Danke, Oma! Wir lieben euch sehr!",
          romanian: "Mulțumesc, bunico! Vă iubim foarte mult!",
          image: "bjorn_hugging_grandma"
        }
      ]
    },

    vocabulary: [
      { german: "der Opa", romanian: "bunicul", category: "familie" },
      { german: "die Oma", romanian: "bunica", category: "familie" },
      { german: "zu Besuch", romanian: "în vizită", category: "expresii" },
      { german: "sich freuen", romanian: "a se bucura", category: "emoții" },
      { german: "die Enkelkinder", romanian: "nepoții", category: "familie" },
      { german: "das Geschenk", romanian: "cadoul", category: "obiecte" },
      { german: "mitbringen", romanian: "a aduce cu sine", category: "verbe" },
      { german: "sehr", romanian: "foarte", category: "adverbe" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Familia extinsă:",
        items: [
          { 
            text: "der Opa", 
            target: "grandfather_image",
            correct: true,
            feedback: "Sehr gut! Bunicul drag!" 
          },
          { 
            text: "die Oma", 
            target: "grandmother_image",
            correct: true,
            feedback: "Perfect! Bunica drăguță!" 
          },
          { 
            text: "das Geschenk", 
            target: "gift_box",
            correct: true,
            feedback: "Wunderbar! Cadoul frumos!" 
          },
          { 
            text: "die Enkelkinder", 
            target: "grandchildren_image",
            correct: true,
            feedback: "Toll! Nepoții iubiți!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Familia mare:",
        pairs: [
          { romanian: "BUNICUL", german: "DER OPA", feedback: "Perfekt! Bunicul înțelept!" },
          { romanian: "BUNICA", german: "DIE OMA", feedback: "Sehr gut! Bunica dragă!" },
          { romanian: "CADOUL", german: "DAS GESCHENK", feedback: "Toll! Cadoul minunat!" },
          { romanian: "NEPOȚII", german: "DIE ENKELKINDER", feedback: "Wunderbar! Nepoții iubiți!" }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Cum spui 'bunica' în germană?",
            options: ["der Opa", "die Oma", "die Mutter"],
            correct: 1,
            feedback: "Richtig! Die Oma înseamnă bunica!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 8 }
    },

    unlock_requirements: { lesson_completed: 7 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 9,
    title: "Seara în familie",
    subtitle: "Activitățile de seară",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Der Tag ist fast vorbei. Es wird dunkel.",
          romanian: "Ziua aproape s-a terminat. Se întunecă.",
          image: "evening_approaching"
        },
        {
          character: "emma",
          german: "Was macht ihr am Abend?",
          romanian: "Ce faceți seara?",
          image: "emma_curious_evening"
        },
        {
          character: "björn",
          german: "Wir schauen zusammen fern oder hören Musik.",
          romanian: "Privim împreună la televizor sau ascultăm muzică.",
          image: "family_watching_tv"
        },
        {
          character: "anna",
          german: "Ich putze meine Zähne vor dem Schlafengehen.",
          romanian: "Îmi spăl dinții înainte de culcare.",
          image: "anna_brushing_teeth"
        },
        {
          character: "björn",
          german: "Gute Nacht, alle zusammen!",
          romanian: "Noapte bună, tuturor!",
          image: "bjorn_goodnight"
        }
      ]
    },

    vocabulary: [
      { german: "der Abend", romanian: "seara", category: "timp" },
      { german: "vorbei", romanian: "terminat", category: "stări" },
      { german: "dunkel", romanian: "întunecat", category: "adjective" },
      { german: "fernsehen", romanian: "a privi la televizor", category: "activități" },
      { german: "die Musik", romanian: "muzica", category: "divertisment" },
      { german: "putzen", romanian: "a spăla/a curăța", category: "activități" },
      { german: "die Zähne", romanian: "dinții", category: "corp" },
      { german: "Gute Nacht", romanian: "Noapte bună", category: "salutări" }
    ],

    games: [
      {
        type: "story_sequence",
        instructor: "björn",
        title: "Activitățile serii în ordine:",
        sequence: [
          { image: "sunset", text: "Se întunecă afară", order: 1 },
          { image: "family_tv", text: "Familia privește la televizor", order: 2 },
          { image: "listening_music", text: "Ascultă muzică", order: 3 },
          { image: "brushing_teeth", text: "Björn își spală dinții", order: 4 },
          { image: "goodnight_moon", text: "Toți spun \"Gute Nacht\"", order: 5 }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm să urăm noapte bună!",
        phrases: [
          {
            german: "Gute Nacht",
            romanian: "Noapte bună",
            audio: "emma_gute_nacht",
            feedback: "Sehr gut! Urare frumoasă!"
          },
          {
            german: "Es wird dunkel",
            romanian: "Se întunecă",
            audio: "emma_wird_dunkel",
            feedback: "Wunderbar! Seara se apropie!"
          },
          {
            german: "Ich putze meine Zähne",
            romanian: "Îmi spăl dinții",
            audio: "emma_putze_zaehne",
            feedback: "Toll! Igienă bună!"
          }
        ]
      },
      {
        type: "drag_drop",
        instructor: "max",
        title: "Activitățile serii:",
        items: [
          { 
            text: "fernsehen", 
            target: "television",
            correct: true,
            feedback: "Sehr gut! Televizorul!" 
          },
          { 
            text: "die Musik", 
            target: "musical_notes",
            correct: true,
            feedback: "Perfect! Notele muzicale!" 
          },
          { 
            text: "die Zähne putzen", 
            target: "toothbrush",
            correct: true,
            feedback: "Wunderbar! Periuța de dinți!" 
          },
          { 
            text: "Gute Nacht", 
            target: "moon_stars",
            correct: true,
            feedback: "Toll! Luna și stelele!" 
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "friends_castle": 9 }
    },

    unlock_requirements: { lesson_completed: 8 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 10,
    title: "Ziua de naștere",
    subtitle: "Sărbătoarea aniversării",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Heute ist mein Geburtstag! Ich werde fünf Jahre alt!",
          romanian: "Astăzi este ziua mea de naștere! Împlinesc cinci ani!",
          image: "bjorn_birthday_crown"
        },
        {
          character: "emma",
          german: "Herzlichen Glückwunsch zum Geburtstag, Björn!",
          romanian: "La mulți ani, Björn!",
          image: "emma_congratulating"
        },
        {
          character: "björn",
          german: "Danke! Wir haben eine Torte mit Kerzen!",
          romanian: "Mulțumesc! Avem un tort cu lumânări!",
          image: "birthday_cake_candles"
        },
        {
          character: "max",
          german: "Und viele bunte Luftballons!",
          romanian: "Și multe baloane colorate!",
          image: "colorful_balloons"
        },
        {
          character: "familie",
          german: "Zum Geburtstag viel Glück! Zum Geburtstag viel Glück!",
          romanian: "La mulți ani! La mulți ani!",
          image: "family_singing"
        }
      ]
    },

    vocabulary: [
      { german: "der Geburtstag", romanian: "ziua de naștere", category: "sărbători" },
      { german: "Jahre alt", romanian: "ani în vârstă", category: "vârstă" },
      { german: "Herzlichen Glückwunsch", romanian: "Felicitări", category: "urări" },
      { german: "die Torte", romanian: "tortul", category: "dulciuri" },
      { german: "die Kerzen", romanian: "lumânările", category: "obiecte" },
      { german: "die Luftballons", romanian: "baloanele", category: "decorațiuni" },
      { german: "viel Glück", romanian: "multă fericire", category: "urări" },
      { german: "werden", romanian: "a deveni", category: "verbe" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Elementele zilei de naștere:",
        items: [
          { 
            text: "der Geburtstag", 
            target: "bjorn_crown",
            correct: true,
            feedback: "Sehr gut! Björn cu coroană!" 
          },
          { 
            text: "die Torte", 
            target: "birthday_cake",
            correct: true,
            feedback: "Perfect! Tortul aniversar!" 
          },
          { 
            text: "die Kerzen", 
            target: "lit_candles",
            correct: true,
            feedback: "Wunderbar! Lumânările aprinse!" 
          },
          { 
            text: "die Luftballons", 
            target: "party_balloons",
            correct: true,
            feedback: "Toll! Baloanele de petrecere!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Sărbătoarea:",
        pairs: [
          { romanian: "ZIUA DE NAȘTERE", german: "DER GEBURTSTAG", feedback: "Perfekt! Ziua specială!" },
          { romanian: "TORTUL", german: "DIE TORTE", feedback: "Sehr gut! Tortul delicios!" },
          { romanian: "LUMÂNĂRILE", german: "DIE KERZEN", feedback: "Toll! Lumânările strălucitoare!" },
          { romanian: "LA MULȚI ANI", german: "HERZLICHEN GLÜCKWUNSCH", feedback: "Wunderbar! Urarea frumoasă!" }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm să urăm la mulți ani!",
        phrases: [
          {
            german: "Herzlichen Glückwunsch",
            romanian: "Felicitări / La mulți ani",
            audio: "emma_herzlichen_glueckwunsch",
            feedback: "Sehr gut! Urare perfectă!"
          },
          {
            german: "Zum Geburtstag viel Glück",
            romanian: "La mulți ani",
            audio: "emma_zum_geburtstag",
            feedback: "Wunderbar! Cântecul aniversar!"
          },
          {
            german: "Ich werde fünf Jahre alt",
            romanian: "Împlinesc cinci ani",
            audio: "emma_fuenf_jahre",
            feedback: "Toll! Vârsta aniversată!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 50,
      badge_progress: { "friends_castle": 10 },
      special_reward: {
        type: "badge",
        id: "friends_castle",
        name: "Prietenii Castelului",
        description: "Completează primele 10 lecții din Castelul Familiei",
        unlocked: true
      }
    },

    unlock_requirements: { lesson_completed: 9 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 11,
    title: "Hainele noastre",
    subtitle: "Îmbrăcămintea zilnică",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Was soll ich heute anziehen?",
          romanian: "Ce să îmbrac astăzi?",
          image: "bjorn_choosing_clothes"
        },
        {
          character: "mama_bear",
          german: "Es ist kalt draußen. Zieh deine warme Jacke an!",
          romanian: "E frig afară. Îmbracă-ți jacheta caldă!",
          image: "mama_suggesting_jacket"
        },
        {
          character: "emma",
          german: "Und vergiss nicht deine Schuhe und Socken!",
          romanian: "Și nu uita pantofii și șosetele!",
          image: "emma_pointing_shoes"
        },
        {
          character: "björn",
          german: "Ich trage auch meine blaue Hose und das rote T-Shirt!",
          romanian: "Port și pantalonii mei albaștri și tricoul roșu!",
          image: "bjorn_dressed_up"
        },
        {
          character: "anna",
          german: "Du siehst sehr gut aus, Björn!",
          romanian: "Arăți foarte bine, Björn!",
          image: "anna_complimenting"
        }
      ]
    },

    vocabulary: [
      { german: "anziehen", romanian: "a îmbrăca", category: "activități" },
      { german: "kalt", romanian: "frig", category: "vreme" },
      { german: "die Jacke", romanian: "jacheta", category: "haine" },
      { german: "warm", romanian: "cald", category: "proprietăți" },
      { german: "die Schuhe", romanian: "pantofii", category: "încălțăminte" },
      { german: "die Socken", romanian: "șosetele", category: "haine" },
      { german: "die Hose", romanian: "pantalonii", category: "haine" },
      { german: "das T-Shirt", romanian: "tricoul", category: "haine" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Hainele și încălțămintea:",
        items: [
          { 
            text: "die Jacke", 
            target: "winter_jacket",
            correct: true,
            feedback: "Sehr gut! Jacheta caldă!" 
          },
          { 
            text: "die Schuhe", 
            target: "brown_shoes",
            correct: true,
            feedback: "Perfect! Pantofii frumoși!" 
          },
          { 
            text: "die Hose", 
            target: "blue_pants",
            correct: true,
            feedback: "Wunderbar! Pantalonii albaștri!" 
          },
          { 
            text: "das T-Shirt", 
            target: "red_tshirt",
            correct: true,
            feedback: "Toll! Tricoul roșu!" 
          }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Ce porți pe cap?",
            options: ["die Schuhe", "die Mütze", "die Hose"],
            correct: 1,
            feedback: "Richtig! Die Mütze se poartă pe cap!"
          }
        ]
      },
      {
        type: "word_builder",
        instructor: "max",
        title: "Construiește cuvântul pentru 'pantofi'!",
        target_word: "SCHUHE",
        available_letters: ["S", "C", "H", "U", "H", "E", "T", "M"],
        feedback: "Richtig! SCHUHE înseamnă pantofi!"
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 1 }
    },

    unlock_requirements: { lesson_completed: 10 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 12,
    title: "Vremea de afară",
    subtitle: "Fenomenele meteorologice",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Wie ist das Wetter heute?",
          romanian: "Cum este vremea astăzi?",
          image: "bjorn_looking_outside"
        },
        {
          character: "emma",
          german: "Es regnet! Sieh, die Tropfen am Fenster!",
          romanian: "Plouă! Uită-te, picăturile pe fereastră!",
          image: "rain_on_window"
        },
        {
          character: "björn",
          german: "Gestern war es sonnig und warm.",
          romanian: "Ieri a fost însorit și cald.",
          image: "sunny_yesterday"
        },
        {
          character: "emma",
          german: "Und morgen wird es vielleicht schneien!",
          romanian: "Și mâine poate va ninge!",
          image: "snow_forecast"
        },
        {
          character: "björn",
          german: "Ich mag alle Jahreszeiten!",
          romanian: "Îmi plac toate anotimpurile!",
          image: "four_seasons"
        }
      ]
    },

    vocabulary: [
      { german: "das Wetter", romanian: "vremea", category: "natură" },
      { german: "regnen", romanian: "a ploua", category: "vreme" },
      { german: "sonnig", romanian: "însorit", category: "vreme" },
      { german: "schneien", romanian: "a ninge", category: "vreme" },
      { german: "gestern", romanian: "ieri", category: "timp" },
      { german: "morgen", romanian: "mâine", category: "timp" },
      { german: "vielleicht", romanian: "poate", category: "cuvinte de legătură" },
      { german: "die Jahreszeiten", romanian: "anotimpurile", category: "timp" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Fenomenele meteo:",
        items: [
          { 
            text: "regnen", 
            target: "rain_image",
            correct: true,
            feedback: "Sehr gut! Plouă afară!" 
          },
          { 
            text: "sonnig", 
            target: "sunny_sky",
            correct: true,
            feedback: "Perfect! Soarele strălucește!" 
          },
          { 
            text: "schneien", 
            target: "snow_falling",
            correct: true,
            feedback: "Wunderbar! Ninge frumos!" 
          },
          { 
            text: "das Wetter", 
            target: "thermometer",
            correct: true,
            feedback: "Toll! Termometrul arată vremea!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Vremea:",
        pairs: [
          { romanian: "PLOAIA", german: "REGNEN", feedback: "Perfekt! Picăturile de ploaie!" },
          { romanian: "ÎNSORIT", german: "SONNIG", feedback: "Sehr gut! Soarele călduros!" },
          { romanian: "A NINGE", german: "SCHNEIEN", feedback: "Toll! Zăpada albă!" },
          { romanian: "VREMEA", german: "DAS WETTER", feedback: "Wunderbar! Condițiile meteorologice!" }
        ]
      },
      {
        type: "story_sequence",
        instructor: "max",
        title: "Vremea în diferite zile:",
        sequence: [
          { image: "sunny_day", text: "Ieri: sonnig", order: 1 },
          { image: "rainy_day", text: "Astăzi: regnet", order: 2 },
          { image: "snowy_day", text: "Mâine: schneien", order: 3 }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 2 }
    },

    unlock_requirements: { lesson_completed: 11 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 13,
    title: "Animalele de casă",
    subtitle: "Prietenii noștri animali",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Wir haben auch Haustiere! Das ist unser Hund Rex.",
          romanian: "Avem și animale de casă! Acesta este câinele nostru Rex.",
          image: "rex_the_dog"
        },
        {
          character: "emma",
          german: "Und wo ist eure Katze?",
          romanian: "Și unde este pisica voastră?",
          image: "emma_looking_for_cat"
        },
        {
          character: "björn",
          german: "Mimi schläft gern auf dem Sofa.",
          romanian: "Mimi îi place să doarmă pe canapea.",
          image: "mimi_sleeping_sofa"
        },
        {
          character: "emma",
          german: "Anna hat auch einen kleinen Hamster!",
          romanian: "Anna are și un hamster mic!",
          image: "emma_excited_hamster"
        },
        {
          character: "anna",
          german: "Ja! Er heißt Pipo und lebt in einem Käfig.",
          romanian: "Da! El se numește Pipo și trăiește într-o cușcă.",
          image: "pipo_in_cage"
        }
      ]
    },

    vocabulary: [
      { german: "die Haustiere", romanian: "animalele de casă", category: "animale" },
      { german: "der Hund", romanian: "câinele", category: "animale" },
      { german: "die Katze", romanian: "pisica", category: "animale" },
      { german: "das Sofa", romanian: "canapeaua", category: "mobilier" },
      { german: "der Hamster", romanian: "hamsterul", category: "animale" },
      { german: "klein", romanian: "mic", category: "adjective" },
      { german: "leben", romanian: "a trăi", category: "verbe" },
      { german: "der Käfig", romanian: "cușca", category: "obiecte" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Animalele de casă:",
        items: [
          { 
            text: "der Hund", 
            target: "rex_dog",
            correct: true,
            feedback: "Sehr gut! Câinele Rex!" 
          },
          { 
            text: "die Katze", 
            target: "mimi_cat",
            correct: true,
            feedback: "Perfect! Pisica Mimi!" 
          },
          { 
            text: "der Hamster", 
            target: "pipo_hamster",
            correct: true,
            feedback: "Wunderbar! Hamsterul Pipo!" 
          },
          { 
            text: "der Käfig", 
            target: "hamster_cage",
            correct: true,
            feedback: "Toll! Cușca hamsterului!" 
          }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm numele animalelor!",
        phrases: [
          {
            german: "Der Hund heißt Rex",
            romanian: "Câinele se numește Rex",
            audio: "emma_hund_rex",
            feedback: "Sehr gut! Rex este un câine bun!"
          },
          {
            german: "Die Katze schläft",
            romanian: "Pisica doarme",
            audio: "emma_katze_schlaeft",
            feedback: "Wunderbar! Mimi doarme liniștită!"
          },
          {
            german: "Der Hamster ist klein",
            romanian: "Hamsterul este mic",
            audio: "emma_hamster_klein",
            feedback: "Toll! Pipo este foarte mic!"
          }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Unde doarme pisica?",
            options: ["im Käfig", "auf dem Sofa", "im Garten"],
            correct: 1,
            feedback: "Richtig! Pisica doarme auf dem Sofa!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 3 }
    },

    unlock_requirements: { lesson_completed: 12 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 14,
    title: "Jucăriile noastre",
    subtitle: "Obiectele preferate de joacă",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Schau meine Spielsachen! Das ist mein Lieblingsteddy!",
          romanian: "Uită-te la jucăriile mele! Acesta este ursulețul meu preferat!",
          image: "bjorn_favorite_teddy"
        },
        {
          character: "anna",
          german: "Und ich habe eine schöne Puppe!",
          romanian: "Și eu am o păpușă frumoasă!",
          image: "anna_beautiful_doll"
        },
        {
          character: "emma",
          german: "Mit was spielt ihr am liebsten?",
          romanian: "Cu ce vă jucați cel mai mult?",
          image: "emma_curious_toys"
        },
        {
          character: "björn",
          german: "Ich baue gern mit den Bauklötzen!",
          romanian: "Îmi place să construiesc cu cuburile!",
          image: "bjorn_building_blocks"
        },
        {
          character: "anna",
          german: "Und ich male gern mit Buntstiften!",
          romanian: "Și mie îmi place să pictez cu creioanele colorate!",
          image: "anna_coloring_crayons"
        }
      ]
    },

    vocabulary: [
      { german: "die Spielsachen", romanian: "jucăriile", category: "jucării" },
      { german: "der Lieblingsteddy", romanian: "ursulețul preferat", category: "jucării" },
      { german: "die Puppe", romanian: "păpușa", category: "jucării" },
      { german: "am liebsten", romanian: "cel mai mult", category: "expresii" },
      { german: "bauen", romanian: "a construi", category: "activități" },
      { german: "die Bauklötze", romanian: "cuburile", category: "jucării" },
      { german: "malen", romanian: "a picta", category: "activități" },
      { german: "die Buntstifte", romanian: "creioanele colorate", category: "obiecte" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Jucăriile:",
        items: [
          { 
            text: "der Teddy", 
            target: "teddy_bear",
            correct: true,
            feedback: "Sehr gut! Ursulețul drăguț!" 
          },
          { 
            text: "die Puppe", 
            target: "beautiful_doll",
            correct: true,
            feedback: "Perfect! Păpușa frumoasă!" 
          },
          { 
            text: "die Bauklötze", 
            target: "building_blocks",
            correct: true,
            feedback: "Wunderbar! Cuburile colorate!" 
          },
          { 
            text: "die Buntstifte", 
            target: "colored_crayons",
            correct: true,
            feedback: "Toll! Creioanele colorate!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Jocurile și activitățile:",
        pairs: [
          { romanian: "JUCĂRIILE", german: "DIE SPIELSACHEN", feedback: "Perfekt! Obiectele de joacă!" },
          { romanian: "PĂPUȘA", german: "DIE PUPPE", feedback: "Sehr gut! Prietena Annei!" },
          { romanian: "A CONSTRUI", german: "BAUEN", feedback: "Toll! Crearea cu cuburi!" },
          { romanian: "A PICTA", german: "MALEN", feedback: "Wunderbar! Arta cu creioane!" }
        ]
      },
      {
        type: "word_builder",
        instructor: "max",
        title: "Construiește cuvântul pentru 'păpușă'!",
        target_word: "PUPPE",
        available_letters: ["P", "U", "P", "P", "E", "M", "A", "L"],
        feedback: "Richtig! PUPPE înseamnă păpușă!"
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 4 }
    },

    unlock_requirements: { lesson_completed: 13 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 15,
    title: "Îndatoririle casei",
    subtitle: "Ajutăm în gospodărie",
    duration: 4,
    
    story: {
      narrator: "mama_bear",
      scenes: [
        {
          character: "mama_bear",
          german: "Kinder, wir müssen das Haus putzen!",
          romanian: "Copii, trebuie să curățăm casa!",
          image: "mama_cleaning_call"
        },
        {
          character: "björn",
          german: "Was kann ich tun, Mama?",
          romanian: "Ce pot să fac, mama?",
          image: "bjorn_willing_help"
        },
        {
          character: "mama_bear",
          german: "Du kannst dein Zimmer aufräumen!",
          romanian: "Poți să-ți faci ordine în cameră!",
          image: "mama_suggesting_cleanup"
        },
        {
          character: "anna",
          german: "Ich helfe beim Staubsaugen!",
          romanian: "Eu ajut la aspirat!",
          image: "anna_vacuum_help"
        },
        {
          character: "emma",
          german: "Und ich kann die Blumen gießen!",
          romanian: "Și eu pot să ud florile!",
          image: "emma_watering_flowers"
        }
      ]
    },

    vocabulary: [
      { german: "putzen", romanian: "a curăța", category: "activități casnice" },
      { german: "müssen", romanian: "a trebui", category: "verbe modale" },
      { german: "aufräumen", romanian: "a face ordine", category: "activități casnice" },
      { german: "helfen", romanian: "a ajuta", category: "verbe" },
      { german: "staubsaugen", romanian: "a aspira", category: "activități casnice" },
      { german: "gießen", romanian: "a uda", category: "activități" },
      { german: "können", romanian: "a putea", category: "verbe modale" },
      { german: "tun", romanian: "a face", category: "verbe" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Activitățile de curățenie:",
        items: [
          { 
            text: "putzen", 
            target: "house_cleaning",
            correct: true,
            feedback: "Sehr gut! Curățăm casa!" 
          },
          { 
            text: "aufräumen", 
            target: "room_tidying",
            correct: true,
            feedback: "Perfect! Facem ordine!" 
          },
          { 
            text: "staubsaugen", 
            target: "vacuum_cleaner",
            correct: true,
            feedback: "Wunderbar! Aspiratorul merge!" 
          },
          { 
            text: "gießen", 
            target: "watering_plants",
            correct: true,
            feedback: "Toll! Udăm florile!" 
          }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Ce face Anna pentru a ajuta?",
            options: ["aufräumen", "staubsaugen", "gießen"],
            correct: 1,
            feedback: "Richtig! Anna ajută beim Staubsaugen!"
          }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm să spunem ce ajutăm!",
        phrases: [
          {
            german: "Ich kann helfen",
            romanian: "Pot să ajut",
            audio: "emma_kann_helfen",
            feedback: "Sehr gut! Ești gata să ajuți!"
          },
          {
            german: "Ich räume auf",
            romanian: "Fac ordine",
            audio: "emma_raeume_auf",
            feedback: "Wunderbar! Faci ordine frumos!"
          },
          {
            german: "Wir putzen das Haus",
            romanian: "Curățăm casa",
            audio: "emma_putzen_haus",
            feedback: "Toll! Lucrați împreună!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 5 }
    },

    unlock_requirements: { lesson_completed: 14 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 16,
    title: "Vizita la magazine",
    subtitle: "Cumpărăturile familiei",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Heute gehen wir einkaufen!",
          romanian: "Astăzi mergem la cumpărături!",
          image: "bjorn_shopping_excitement"
        },
        {
          character: "mama_bear",
          german: "Wir brauchen Brot vom Bäcker!",
          romanian: "Avem nevoie de pâine de la brutar!",
          image: "mama_shopping_list"
        },
        {
          character: "emma",
          german: "Und frisches Obst vom Markt!",
          romanian: "Și fructe proaspete de la piață!",
          image: "emma_fresh_fruit"
        },
        {
          character: "björn",
          german: "Ich trage die Einkaufstasche!",
          romanian: "Eu car sacoșa de cumpărături!",
          image: "bjorn_carrying_bag"
        },
        {
          character: "verkäufer",
          german: "Guten Tag! Was darf es sein?",
          romanian: "Bună ziua! Cu ce vă pot ajuta?",
          image: "shopkeeper_greeting"
        }
      ]
    },

    vocabulary: [
      { german: "einkaufen", romanian: "a face cumpărături", category: "activități" },
      { german: "brauchen", romanian: "a avea nevoie", category: "verbe" },
      { german: "der Bäcker", romanian: "brutarul", category: "meserii" },
      { german: "frisch", romanian: "proaspăt", category: "adjective" },
      { german: "das Obst", romanian: "fructele", category: "mâncare" },
      { german: "der Markt", romanian: "piața", category: "locuri" },
      { german: "die Einkaufstasche", romanian: "sacoșa", category: "obiecte" },
      { german: "der Verkäufer", romanian: "vânzătorul", category: "meserii" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Cumpărăturile:",
        items: [
          { 
            text: "einkaufen", 
            target: "family_shopping",
            correct: true,
            feedback: "Sehr gut! Familia face cumpărături!" 
          },
          { 
            text: "der Bäcker", 
            target: "baker_shop",
            correct: true,
            feedback: "Perfect! Brutarul cu pâine!" 
          },
          { 
            text: "das Obst", 
            target: "fresh_fruits",
            correct: true,
            feedback: "Wunderbar! Fructele proaspete!" 
          },
          { 
            text: "die Einkaufstasche", 
            target: "shopping_bag",
            correct: true,
            feedback: "Toll! Sacoșa de cumpărături!" 
          }
        ]
      },
      {
        type: "story_sequence",
        instructor: "emma",
        title: "Vizita la magazine:",
        sequence: [
          { image: "leaving_home", text: "Pleacă de acasă", order: 1 },
          { image: "bakery_visit", text: "Merg la brutar", order: 2 },
          { image: "market_fruits", text: "Cumpără fructe de la piață", order: 3 },
          { image: "returning_home", text: "Se întorc acasă cu sacoșele", order: 4 }
        ]
      },
      {
        type: "memory_game",
        instructor: "max",
        title: "Cumpărăturile:",
        pairs: [
          { romanian: "CUMPĂRĂTURI", german: "EINKAUFEN", feedback: "Perfekt! Mersul la magazine!" },
          { romanian: "BRUTARUL", german: "DER BÄCKER", feedback: "Sehr gut! Cel care face pâine!" },
          { romanian: "PROASPĂT", german: "FRISCH", feedback: "Toll! Ceva nou și bun!" },
          { romanian: "PIAȚA", german: "DER MARKT", feedback: "Wunderbar! Locul cu fructe!" }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 6 }
    },

    unlock_requirements: { lesson_completed: 15 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 17,
    title: "Mersul la doctor",
    subtitle: "Vizita medicală",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Autsch! Mein Bauch tut weh!",
          romanian: "Auci! Mă doare burtica!",
          image: "bjorn_stomach_pain"
        },
        {
          character: "mama_bear",
          german: "Wir gehen zum Arzt, Björn!",
          romanian: "Mergem la doctor, Björn!",
          image: "mama_worried"
        },
        {
          character: "dr_fuchs",
          german: "Hallo Björn! Was ist los?",
          romanian: "Salut Björn! Ce s-a întâmplat?",
          image: "doctor_examining"
        },
        {
          character: "björn",
          german: "Mir ist nicht gut. Ich habe Bauchschmerzen.",
          romanian: "Nu mă simt bine. Am dureri de burtă.",
          image: "bjorn_explaining_pain"
        },
        {
          character: "dr_fuchs",
          german: "Das wird schnell besser! Hier ist eine Medizin.",
          romanian: "O să-ți treacă repede! Aici ai o medicină.",
          image: "doctor_giving_medicine"
        }
      ]
    },

    vocabulary: [
      { german: "weh tun", romanian: "a durea", category: "senzații" },
      { german: "der Bauch", romanian: "burta", category: "corp" },
      { german: "der Arzt", romanian: "doctorul", category: "meserii" },
      { german: "was ist los", romanian: "ce s-a întâmplat", category: "expresii" },
      { german: "nicht gut", romanian: "nu bine", category: "stări" },
      { german: "die Bauchschmerzen", romanian: "durerile de burtă", category: "sănătate" },
      { german: "besser", romanian: "mai bine", category: "adjective" },
      { german: "die Medizin", romanian: "medicina", category: "sănătate" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "La doctor:",
        items: [
          { 
            text: "der Arzt", 
            target: "doctor_image",
            correct: true,
            feedback: "Sehr gut! Doctorul ajutător!" 
          },
          { 
            text: "weh tun", 
            target: "bjorn_pain",
            correct: true,
            feedback: "Perfect! Björn îi doare!" 
          },
          { 
            text: "die Medizin", 
            target: "medicine_bottle",
            correct: true,
            feedback: "Wunderbar! Medicamentul vindecător!" 
          },
          { 
            text: "der Bauch", 
            target: "tummy_image",
            correct: true,
            feedback: "Toll! Burtica lui Björn!" 
          }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm să spunem când ne doare ceva!",
        phrases: [
          {
            german: "Mir tut der Bauch weh",
            romanian: "Mă doare burtica",
            audio: "emma_bauch_weh",
            feedback: "Sehr gut! Ai explicat durerea!"
          },
          {
            german: "Ich gehe zum Arzt",
            romanian: "Merg la doctor",
            audio: "emma_zum_arzt",
            feedback: "Wunderbar! Ceri ajutor medical!"
          },
          {
            german: "Mir ist nicht gut",
            romanian: "Nu mă simt bine",
            audio: "emma_nicht_gut",
            feedback: "Toll! Ai descris starea!"
          }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "La cine mergem când ne simțim rău?",
            options: ["zum Bäcker", "zum Arzt", "zum Markt"],
            correct: 1,
            feedback: "Richtig! Mergem zum Arzt - la doctor!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 7 }
    },

    unlock_requirements: { lesson_completed: 16 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 18,
    title: "Distracția în familie",
    subtitle: "Activități de familie",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Was machen wir heute Abend?",
          romanian: "Ce facem astăzi seara?",
          image: "bjorn_asking_plans"
        },
        {
          character: "papa_bear",
          german: "Wir können ein Spiel spielen!",
          romanian: "Putem să ne jucăm un joc!",
          image: "papa_suggesting_game"
        },
        {
          character: "emma",
          german: "Oder wir können singen und tanzen!",
          romanian: "Sau putem să cântăm și să dansăm!",
          image: "emma_music_suggestion"
        },
        {
          character: "anna",
          german: "Ich liebe es zu tanzen!",
          romanian: "Îmi place să dansez!",
          image: "anna_dancing_happy"
        },
        {
          character: "max",
          german: "Und ich kann lustige Witze erzählen!",
          romanian: "Și eu pot să spun glume amuzante!",
          image: "max_telling_jokes"
        }
      ]
    },

    vocabulary: [
      { german: "das Spiel", romanian: "jocul", category: "divertisment" },
      { german: "singen", romanian: "a cânta", category: "activități" },
      { german: "tanzen", romanian: "a dansa", category: "activități" },
      { german: "lieben", romanian: "a iubi", category: "emoții" },
      { german: "lustig", romanian: "amuzant", category: "adjective" },
      { german: "die Witze", romanian: "glumele", category: "divertisment" },
      { german: "erzählen", romanian: "a povesti", category: "comunicare" },
      { german: "oder", romanian: "sau", category: "cuvinte de legătură" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Distracțiile familiei:",
        items: [
          { 
            text: "singen", 
            target: "family_singing",
            correct: true,
            feedback: "Sehr gut! Familia cântă!" 
          },
          { 
            text: "tanzen", 
            target: "dancing_together",
            correct: true,
            feedback: "Perfect! Dansează împreună!" 
          },
          { 
            text: "das Spiel", 
            target: "family_board_game",
            correct: true,
            feedback: "Wunderbar! Jocul de familie!" 
          },
          { 
            text: "lustig", 
            target: "laughing_family",
            correct: true,
            feedback: "Toll! Râd amuzant!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Activitățile de distracție:",
        pairs: [
          { romanian: "A CÂNTA", german: "SINGEN", feedback: "Perfekt! Muzica frumoasă!" },
          { romanian: "A DANSA", german: "TANZEN", feedback: "Sehr gut! Mișcarea ritmică!" },
          { romanian: "JOCUL", german: "DAS SPIEL", feedback: "Toll! Distracția împreună!" },
          { romanian: "GLUMELE", german: "DIE WITZE", feedback: "Wunderbar! Povestiri amuzante!" }
        ]
      },
      {
        type: "word_builder",
        instructor: "max",
        title: "Construiește cuvântul pentru 'a dansa'!",
        target_word: "TANZEN",
        available_letters: ["T", "A", "N", "Z", "E", "N", "S", "M"],
        feedback: "Richtig! TANZEN înseamnă a dansa!"
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 8 }
    },

    unlock_requirements: { lesson_completed: 17 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 19,
    title: "Sărbătorile speciale",
    subtitle: "Celebrări și festivități",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Bald ist Weihnachten! Das ist mein Lieblingsfest!",
          romanian: "Curând este Crăciunul! Aceasta este sărbătoarea mea preferată!",
          image: "bjorn_christmas_excitement"
        },
        {
          character: "emma",
          german: "Und an Ostern suchen wir bunte Eier!",
          romanian: "Și de Paști căutăm ouă colorate!",
          image: "emma_easter_eggs"
        },
        {
          character: "anna",
          german: "Ich mag auch den ersten Tag im neuen Jahr!",
          romanian: "Îmi place și prima zi din anul nou!",
          image: "anna_new_year"
        },
        {
          character: "björn",
          german: "Bei jedem Fest gibt es leckeres Essen!",
          romanian: "La fiecare sărbătoare este mâncare delicioasă!",
          image: "holiday_feast"
        },
        {
          character: "familie",
          german: "Wir feiern gern zusammen!",
          romanian: "Ne place să sărbătorim împreună!",
          image: "family_celebrating"
        }
      ]
    },

    vocabulary: [
      { german: "bald", romanian: "curând", category: "timp" },
      { german: "Weihnachten", romanian: "Crăciunul", category: "sărbători" },
      { german: "das Lieblingsfest", romanian: "sărbătoarea preferată", category: "preferințe" },
      { german: "Ostern", romanian: "Paștele", category: "sărbători" },
      { german: "die Eier", romanian: "ouăle", category: "mâncare" },
      { german: "das neue Jahr", romanian: "anul nou", category: "timp" },
      { german: "lecker", romanian: "delicios", category: "adjective" },
      { german: "feiern", romanian: "a sărbători", category: "activități" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Sărbătorile:",
        items: [
          { 
            text: "Weihnachten", 
            target: "christmas_tree",
            correct: true,
            feedback: "Sehr gut! Bradul de Crăciun!" 
          },
          { 
            text: "Ostern", 
            target: "easter_eggs",
            correct: true,
            feedback: "Perfect! Ouăle de Paști!" 
          },
          { 
            text: "das neue Jahr", 
            target: "fireworks",
            correct: true,
            feedback: "Wunderbar! Artificiile Anului Nou!" 
          },
          { 
            text: "lecker", 
            target: "delicious_food",
            correct: true,
            feedback: "Toll! Mâncarea delicioasă!" 
          }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Ce căutăm de Paști?",
            options: ["Geschenke", "bunte Eier", "Kerzen"],
            correct: 1,
            feedback: "Richtig! De Paști căutăm bunte Eier - ouă colorate!"
          }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm despre sărbători!",
        phrases: [
          {
            german: "Bald ist Weihnachten",
            romanian: "Curând este Crăciunul",
            audio: "emma_bald_weihnachten",
            feedback: "Sehr gut! Așteptarea Crăciunului!"
          },
          {
            german: "Wir feiern zusammen",
            romanian: "Sărbătorim împreună",
            audio: "emma_feiern_zusammen",
            feedback: "Wunderbar! Bucuria împărțită!"
          },
          {
            german: "Das Essen ist lecker",
            romanian: "Mâncarea este delicioasă",
            audio: "emma_essen_lecker",
            feedback: "Toll! Gustul sărbătorilor!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_explorer": 9 }
    },

    unlock_requirements: { lesson_completed: 18 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 20,
    title: "Prietenii noștri",
    subtitle: "Prietenia și jocurile",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Das sind meine besten Freunde: Tim und Lisa!",
          romanian: "Aceștia sunt cei mai buni prieteni ai mei: Tim și Lisa!",
          image: "bjorn_introducing_friends"
        },
        {
          character: "tim",
          german: "Hallo! Wir spielen gern zusammen!",
          romanian: "Salut! Ne place să ne jucăm împreună!",
          image: "tim_greeting"
        },
        {
          character: "lisa",
          german: "Heute können wir Verstecken spielen!",
          romanian: "Astăzi ne putem juca de-a v-ați ascunselea!",
          image: "lisa_hide_seek_suggestion"
        },
        {
          character: "emma",
          german: "Freundschaft ist sehr wichtig!",
          romanian: "Prietenia este foarte importantă!",
          image: "emma_friendship_wise"
        },
        {
          character: "björn",
          german: "Wir helfen uns immer gegenseitig!",
          romanian: "Ne ajutăm întotdeauna unul pe altul!",
          image: "friends_helping_each_other"
        }
      ]
    },

    vocabulary: [
      { german: "die besten Freunde", romanian: "cei mai buni prieteni", category: "relații" },
      { german: "Verstecken spielen", romanian: "a se juca de-a v-ați ascunselea", category: "jocuri" },
      { german: "die Freundschaft", romanian: "prietenia", category: "relații" },
      { german: "wichtig", romanian: "important", category: "adjective" },
      { german: "sich helfen", romanian: "a se ajuta", category: "acțiuni" },
      { german: "immer", romanian: "întotdeauna", category: "timp" },
      { german: "gegenseitig", romanian: "unul pe altul", category: "relații" },
      { german: "heute", romanian: "astăzi", category: "timp" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Prietenia:",
        items: [
          { 
            text: "die Freunde", 
            target: "children_playing",
            correct: true,
            feedback: "Sehr gut! Copiii se joacă împreună!" 
          },
          { 
            text: "Verstecken spielen", 
            target: "hide_and_seek",
            correct: true,
            feedback: "Perfect! Jocul de-a v-ați ascunselea!" 
          },
          { 
            text: "sich helfen", 
            target: "friends_helping",
            correct: true,
            feedback: "Wunderbar! Prietenii se ajută!" 
          },
          { 
            text: "wichtig", 
            target: "friendship_heart",
            correct: true,
            feedback: "Toll! Inima prieteniei!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Prietenii și jocurile:",
        pairs: [
          { romanian: "PRIETENII", german: "DIE FREUNDE", feedback: "Perfekt! Companionii de joacă!" },
          { romanian: "PRIETENIA", german: "DIE FREUNDSCHAFT", feedback: "Sehr gut! Legătura specială!" },
          { romanian: "IMPORTANT", german: "WICHTIG", feedback: "Toll! Ceva de valoare!" },
          { romanian: "ÎNTOTDEAUNA", german: "IMMER", feedback: "Wunderbar! Tot timpul!" }
        ]
      },
      {
        type: "story_sequence",
        instructor: "björn",
        title: "O zi cu prietenii:",
        sequence: [
          { image: "friends_meeting", text: "Prietenii se întâlnesc", order: 1 },
          { image: "deciding_game", text: "Decidem să ne jucăm", order: 2 },
          { image: "hide_and_seek_play", text: "Jucăm de-a v-ați ascunselea", order: 3 },
          { image: "mutual_help", text: "Ne ajutăm unul pe altul", order: 4 }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 50,
      badge_progress: { "castle_explorer": 10 },
      special_reward: {
        type: "badge",
        id: "castle_explorer",
        name: "Exploratori ai Castelului",
        description: "Completează lecțiile 11-20 din Castelul Familiei",
        unlocked: true
      }
    },

    unlock_requirements: { lesson_completed: 19 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 21,
    title: "Telefonul și comunicarea",
    subtitle: "Conversații la telefon",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Ring, ring! Das Telefon klingelt!",
          romanian: "Ring, ring! Telefonul sună!",
          image: "phone_ringing"
        },
        {
          character: "björn",
          german: "Hallo? Björn hier. Wer spricht?",
          romanian: "Alo? Björn aici. Cine vorbește?",
          image: "bjorn_answering_phone"
        },
        {
          character: "oma_bear",
          german: "Hallo mein Schatz! Oma ist am Telefon!",
          romanian: "Salut dragul meu! Bunica este la telefon!",
          image: "grandma_on_phone"
        },
        {
          character: "björn",
          german: "Oma! Ich freue mich, deine Stimme zu hören!",
          romanian: "Bunico! Mă bucur să-ți aud vocea!",
          image: "bjorn_happy_phone_call"
        },
        {
          character: "emma",
          german: "Telefonate sind eine schöne Art zu sprechen!",
          romanian: "Convorbirile telefonice sunt un mod frumos de a vorbi!",
          image: "emma_phone_wisdom"
        }
      ]
    },

    vocabulary: [
      { german: "das Telefon", romanian: "telefonul", category: "tehnologie" },
      { german: "klingeln", romanian: "a suna", category: "sunete" },
      { german: "wer spricht", romanian: "cine vorbește", category: "comunicare" },
      { german: "mein Schatz", romanian: "dragul meu", category: "expresii afectuoase" },
      { german: "am Telefon", romanian: "la telefon", category: "locații" },
      { german: "die Stimme", romanian: "vocea", category: "corp" },
      { german: "hören", romanian: "a auzi", category: "simțuri" },
      { german: "sprechen", romanian: "a vorbi", category: "comunicare" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Comunicarea:",
        items: [
          { 
            text: "das Telefon", 
            target: "telephone_device",
            correct: true,
            feedback: "Sehr gut! Aparatul telefonic!" 
          },
          { 
            text: "klingeln", 
            target: "phone_ringing_sound",
            correct: true,
            feedback: "Perfect! Sunetul telefonului!" 
          },
          { 
            text: "sprechen", 
            target: "person_talking",
            correct: true,
            feedback: "Wunderbar! Persoana vorbind!" 
          },
          { 
            text: "hören", 
            target: "person_listening",
            correct: true,
            feedback: "Toll! Persoana ascultând!" 
          }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm să răspundem la telefon!",
        phrases: [
          {
            german: "Hallo? Björn hier",
            romanian: "Alo? Björn aici",
            audio: "emma_hallo_bjorn_hier",
            feedback: "Sehr gut! Te-ai prezentat la telefon!"
          },
          {
            german: "Wer spricht?",
            romanian: "Cine vorbește?",
            audio: "emma_wer_spricht",
            feedback: "Wunderbar! Ai întrebat cine sună!"
          },
          {
            german: "Ich höre deine Stimme",
            romanian: "Îți aud vocea",
            audio: "emma_hoere_stimme",
            feedback: "Toll! Recunoști vocea!"
          }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Ce facem când telefonul sună?",
            options: ["schlafen", "antworten", "weglaufen"],
            correct: 1,
            feedback: "Richtig! Răspundem - antworten!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_master": 1 }
    },

    unlock_requirements: { lesson_completed: 20 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 22,
    title: "Călătoria cu mașina",
    subtitle: "Excursia la bunici",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "papa_bear",
          german: "Steigt ein! Wir fahren zu Opa und Oma!",
          romanian: "Urcați! Mergem cu mașina la bunici!",
          image: "papa_car_invitation"
        },
        {
          character: "björn",
          german: "Ich sitze hinten und schaue aus dem Fenster!",
          romanian: "Stau în spate și mă uit pe fereastră!",
          image: "bjorn_backseat_window"
        },
        {
          character: "emma",
          german: "Die Landschaft ist so schön!",
          romanian: "Peisajul este atât de frumos!",
          image: "emma_admiring_landscape"
        },
        {
          character: "anna",
          german: "Wie lange dauert die Fahrt, Papa?",
          romanian: "Cât durează călătoria, tata?",
          image: "anna_asking_duration"
        },
        {
          character: "papa_bear",
          german: "Nur eine Stunde. Dann sind wir da!",
          romanian: "Doar o oră. Apoi ajungem!",
          image: "papa_time_estimation"
        }
      ]
    },

    vocabulary: [
      { german: "einsteigen", romanian: "a urca (în mașină)", category: "transport" },
      { german: "fahren", romanian: "a merge cu mașina", category: "transport" },
      { german: "hinten", romanian: "în spate", category: "poziții" },
      { german: "das Fenster", romanian: "fereastra", category: "părți ale casei" },
      { german: "die Landschaft", romanian: "peisajul", category: "natură" },
      { german: "dauern", romanian: "a dura", category: "timp" },
      { german: "die Fahrt", romanian: "călătoria", category: "transport" },
      { german: "die Stunde", romanian: "ora", category: "timp" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Călătoria cu mașina:",
        items: [
          { 
            text: "fahren", 
            target: "car_driving",
            correct: true,
            feedback: "Sehr gut! Mașina în mișcare!" 
          },
          { 
            text: "einsteigen", 
            target: "getting_in_car",
            correct: true,
            feedback: "Perfect! Urcarea în mașină!" 
          },
          { 
            text: "das Fenster", 
            target: "car_window",
            correct: true,
            feedback: "Wunderbar! Fereastra mașinii!" 
          },
          { 
            text: "die Landschaft", 
            target: "beautiful_landscape",
            correct: true,
            feedback: "Toll! Peisajul frumos!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Călătoritul:",
        pairs: [
          { romanian: "A MERGE CU MAȘINA", german: "FAHREN", feedback: "Perfekt! Transportul cu autovehicul!" },
          { romanian: "FEREASTRA", german: "DAS FENSTER", feedback: "Sehr gut! Deschiderea spre exterior!" },
          { romanian: "CĂLĂTORIA", german: "DIE FAHRT", feedback: "Toll! Drumul parcurs!" },
          { romanian: "ORA", german: "DIE STUNDE", feedback: "Wunderbar! Unitatea de timp!" }
        ]
      },
      {
        type: "word_builder",
        instructor: "max",
        title: "Construiește cuvântul pentru 'călătoria'!",
        target_word: "FAHRT",
        available_letters: ["F", "A", "H", "R", "T", "S", "E", "N"],
        feedback: "Richtig! FAHRT înseamnă călătoria!"
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_master": 2 }
    },

    unlock_requirements: { lesson_completed: 21 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 23,
    title: "Picnicul în parc",
    subtitle: "Distracție în natură",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Heute machen wir ein Picknick im Park!",
          romanian: "Astăzi facem un picnic în parc!",
          image: "bjorn_picnic_announcement"
        },
        {
          character: "mama_bear",
          german: "Ich packe Sandwiches und Getränke ein!",
          romanian: "Împachetez sandvichiuri și băuturi!",
          image: "mama_packing_food"
        },
        {
          character: "emma",
          german: "Und ich bringe eine Decke zum Sitzen!",
          romanian: "Și eu aduc o pătură pentru șezut!",
          image: "emma_bringing_blanket"
        },
        {
          character: "björn",
          german: "Nach dem Essen können wir Ball spielen!",
          romanian: "După mâncare ne putem juca cu mingea!",
          image: "bjorn_ball_suggestion"
        },
        {
          character: "anna",
          german: "Picknick macht so viel Spaß!",
          romanian: "Picnicul este atât de distractiv!",
          image: "anna_picnic_joy"
        }
      ]
    },

    vocabulary: [
      { german: "das Picknick", romanian: "picnicul", category: "activități" },
      { german: "der Park", romanian: "parcul", category: "locuri" },
      { german: "einpacken", romanian: "a împacheta", category: "activități" },
      { german: "die Sandwiches", romanian: "sandvichiurile", category: "mâncare" },
      { german: "die Getränke", romanian: "băuturile", category: "băuturi" },
      { german: "die Decke", romanian: "pătura", category: "obiecte" },
      { german: "sitzen", romanian: "a sta jos", category: "poziții" },
      { german: "der Spaß", romanian: "distracția", category: "emoții" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Picnicul:",
        items: [
          { 
            text: "das Picknick", 
            target: "family_picnic",
            correct: true,
            feedback: "Sehr gut! Familia la picnic!" 
          },
          { 
            text: "die Sandwiches", 
            target: "packed_sandwiches",
            correct: true,
            feedback: "Perfect! Sandvichiurile pregătite!" 
          },
          { 
            text: "die Decke", 
            target: "picnic_blanket",
            correct: true,
            feedback: "Wunderbar! Pătura de picnic!" 
          },
          { 
            text: "der Park", 
            target: "green_park",
            correct: true,
            feedback: "Toll! Parcul verde!" 
          }
        ]
      },
      {
        type: "story_sequence",
        instructor: "emma",
        title: "Organizarea picnicului:",
        sequence: [
          { image: "packing_food", text: "Împachetează mâncarea", order: 1 },
          { image: "going_to_park", text: "Merge în parc", order: 2 },
          { image: "spreading_blanket", text: "Întinde pătura", order: 3 },
          { image: "eating_together", text: "Mănâncă împreună", order: 4 },
          { image: "playing_ball", text: "Se joacă cu mingea", order: 5 }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Să învățăm despre picnic!",
        phrases: [
          {
            german: "Wir machen ein Picknick",
            romanian: "Facem un picnic",
            audio: "emma_machen_picknick",
            feedback: "Sehr gut! Planificarea activității!"
          },
          {
            german: "Im Park ist es schön",
            romanian: "În parc este frumos",
            audio: "emma_park_schoen",
            feedback: "Wunderbar! Aprecierea naturii!"
          },
          {
            german: "Picknick macht Spaß",
            romanian: "Picnicul este distractiv",
            audio: "emma_picknick_spass",
            feedback: "Toll! Bucuria activității!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_master": 3 }
    },

    unlock_requirements: { lesson_completed: 22 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 24,
    title: "Pregătirea pentru școală",
    subtitle: "Noul început educațional",
    duration: 4,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Bald gehe ich in die Schule!",
          romanian: "Curând merg la școală!",
          image: "bjorn_school_excitement"
        },
        {
          character: "mama_bear",
          german: "Du brauchst einen Schulranzen und Stifte!",
          romanian: "Ai nevoie de o ghiozdănel și creioane!",
          image: "mama_school_supplies"
        },
        {
          character: "emma",
          german: "Und vergiss nicht deine Hefte und Bücher!",
          romanian: "Și nu uita caietele și cărțile!",
          image: "emma_books_reminder"
        },
        {
          character: "björn",
          german: "Ich bin aufgeregt! Ich werde viele Freunde finden!",
          romanian: "Sunt entuziasmat! O să găsesc mulți prieteni!",
          image: "bjorn_excited_friends"
        },
        {
          character: "papa_bear",
          german: "In der Schule lernst du viele interessante Dinge!",
          romanian: "La școală înveți multe lucruri interesante!",
          image: "papa_learning_wisdom"
        }
      ]
    },

    vocabulary: [
      { german: "die Schule", romanian: "școala", category: "educație" },
      { german: "der Schulranzen", romanian: "ghiozdanul", category: "rechizite" },
      { german: "die Stifte", romanian: "creioanele", category: "rechizite" },
      { german: "die Hefte", romanian: "caietele", category: "rechizite" },
      { german: "die Bücher", romanian: "cărțile", category: "educație" },
      { german: "aufgeregt", romanian: "entuziasmat", category: "emoții" },
      { german: "finden", romanian: "a găsi", category: "acțiuni" },
      { german: "interessant", romanian: "interesant", category: "adjective" }
    ],

    games: [
      {
        type: "drag_drop",
        instructor: "max",
        title: "Pregătirea pentru școală:",
        items: [
          { 
            text: "die Schule", 
            target: "school_building",
            correct: true,
            feedback: "Sehr gut! Clădirea școlii!" 
          },
          { 
            text: "der Schulranzen", 
            target: "school_backpack",
            correct: true,
            feedback: "Perfect! Ghiozdanul școlar!" 
          },
          { 
            text: "die Stifte", 
            target: "colored_pencils",
            correct: true,
            feedback: "Wunderbar! Creioanele colorate!" 
          },
          { 
            text: "die Bücher", 
            target: "school_books",
            correct: true,
            feedback: "Toll! Cărțile de școală!" 
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "emma",
        title: "Materialele școlare:",
        pairs: [
          { romanian: "ȘCOALA", german: "DIE SCHULE", feedback: "Perfekt! Locul învățării!" },
          { romanian: "GHIOZDANUL", german: "DER SCHULRANZEN", feedback: "Sehr gut! Portbagajul elevului!" },
          { romanian: "CAIETELE", german: "DIE HEFTE", feedback: "Toll! Suportul pentru scris!" },
          { romanian: "INTERESANT", german: "INTERESSANT", feedback: "Wunderbar! Ceva captivant!" }
        ]
      },
      {
        type: "quick_choice",
        instructor: "max",
        questions: [
          {
            question: "Ce pui în ghiozdan pentru școală?",
            options: ["Spielsachen", "Bücher und Stifte", "Essen"],
            correct: 1,
            feedback: "Richtig! Pui Bücher und Stifte - cărți și creioane!"
          }
        ]
      }
    ],

    rewards: {
      stars: 3,
      points: 30,
      badge_progress: { "castle_master": 4 }
    },

    unlock_requirements: { lesson_completed: 23 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 70
    }
  },

  {
    id: 25,
    title: "Întoarcerea acasă",
    subtitle: "Finalul aventurii și noi începuturi",
    duration: 6,
    
    story: {
      narrator: "björn",
      scenes: [
        {
          character: "björn",
          german: "Unser Abenteuer war wunderbar, aber jetzt kehren wir nach Hause zurück.",
          romanian: "Aventura noastră a fost minunată, dar acum ne întoarcem acasă.",
          image: "journey_home"
        },
        {
          character: "anna",
          german: "Ich habe so viele neue Dinge gelernt und gesehen!",
          romanian: "Am învățat și văzut atât de multe lucruri noi!",
          image: "anna_reflecting"
        },
        {
          character: "emma",
          german: "Das Schloss sieht noch schöner aus als vorher!",
          romanian: "Castelul arată și mai frumos decât înainte!",
          image: "castle_return"
        },
        {
          character: "max",
          german: "Neue Abenteuer warten auf uns! Seid ihr bereit?",
          romanian: "Ne așteaptă aventuri noi! Sunteți gata?",
          image: "max_new_adventures"
        },
        {
          character: "mama_bear",
          german: "Ihr habt so gut Deutsch gelernt! Ich bin stolz auf euch!",
          romanian: "Ați învățat atât de bine germana! Sunt mândră de voi!",
          image: "proud_mama"
        },
        {
          character: "papa_bear",
          german: "Das war erst der Anfang! Viele spannende Geschichten warten noch!",
          romanian: "Asta a fost doar începutul! Încă ne așteaptă multe povești captivante!",
          image: "future_adventures"
        }
      ]
    },

    vocabulary: [
      { german: "zurückkehren", romanian: "a se întoarce", category: "mișcare" },
      { german: "lernen", romanian: "a învăța", category: "educație" },
      { german: "vorher", romanian: "înainte", category: "timp" },
      { german: "bereit", romanian: "gata", category: "stări" },
      { german: "stolz", romanian: "mândru", category: "emoții" },
      { german: "der Anfang", romanian: "începutul", category: "timp" },
      { german: "spannend", romanian: "captivant", category: "adjective" },
      { german: "warten", romanian: "a aștepta", category: "acțiuni" }
    ],

    games: [
      {
        type: "story_sequence",
        instructor: "björn",
        title: "Povestea completă a aventurii:",
        sequence: [
          { image: "castle_start", text: "Începutul în castel", order: 1 },
          { image: "learning_german", text: "Învățarea germanei", order: 2 },
          { image: "making_friends", text: "Făcând prietenii", order: 3 },
          { image: "exploring_nature", text: "Explorând natura", order: 4 },
          { image: "growing_together", text: "Crescând împreună", order: 5 },
          { image: "new_beginnings", text: "Noi începuturi", order: 6 }
        ]
      },
      {
        type: "speaking_challenge",
        instructor: "emma",
        title: "Celebrarea progresului nostru:",
        phrases: [
          {
            german: "Ich habe viel gelernt",
            romanian: "Am învățat multe",
            audio: "emma_gelernt",
            feedback: "Sehr gut! Recunoașterea progresului!"
          },
          {
            german: "Wir sind eine Familie",
            romanian: "Suntem o familie",
            audio: "emma_familie",
            feedback: "Perfekt! Legătura familială!"
          },
          {
            german: "Neue Abenteuer kommen",
            romanian: "Vin aventuri noi",
            audio: "emma_abenteuer",
            feedback: "Toll! Așteptarea viitorului!"
          },
          {
            german: "Ich bin bereit",
            romanian: "Sunt gata",
            audio: "emma_bereit",
            feedback: "Wunderbar! Pregătirea pentru următorul pas!"
          }
        ]
      },
      {
        type: "memory_game",
        instructor: "max",
        title: "Amintirile din Castelul Familiei:",
        pairs: [
          { romanian: "ÎNCEPUTUL", german: "DER ANFANG", feedback: "Perfekt! Prima noastră întâlnire!" },
          { romanian: "A ÎNVĂȚA", german: "LERNEN", feedback: "Sehr gut! Procesul de creștere!" },
          { romanian: "MÂNDRU", german: "STOLZ", feedback: "Toll! Sentimentul de realizare!" },
          { romanian: "CAPTIVANT", german: "SPANNEND", feedback: "Wunderbar! Emoția aventurii!" },
          { romanian: "A AȘTEPTA", german: "WARTEN", feedback: "Ausgezeichnet! Anticipația viitorului!" }
        ]
      },
      {
        type: "quick_choice",
        instructor: "papa_bear",
        questions: [
          {
            question: "Ce spune mama despre progresul copiilor?",
            options: ["Sie ist müde", "Sie ist stolz", "Sie ist traurig"],
            correct: 1,
            feedback: "Richtig! Mama ist stolz auf euren Fortschritt!"
          },
          {
            question: "Ce ne așteaptă în viitor?",
            options: ["nichts Neues", "neue Abenteuer", "nur Schlaf"],
            correct: 1,
            feedback: "Perfekt! Neue Abenteuer warten auf uns!"
          },
          {
            question: "Cum se simte familia acasă?",
            options: ["glücklich", "langweilig", "kalt"],
            correct: 0,
            feedback: "Wunderbar! Die Familie ist glücklich zusammen!"
          }
        ]
      }
    ],

    rewards: {
      stars: 5,
      points: 60,
      badge_progress: { 
        "nature_master": 2, 
        "castle_master": 1,
        "german_beginner": 1
      },
      special_achievement: {
        badge: "Maestrul Castelului Familiei",
        title: "Completat Castelul Familiei!",
        description: "Ai terminat cu succes toate lecțiile din prima zonă!"
      }
    },

    unlock_requirements: { lesson_completed: 24 },
    completion_requirements: {
      all_games_completed: true,
      minimum_score: 85
    },
    
    completion_celebration: {
      title: "Felicitări! Ai completat Castelul Familiei!",
      message: "Ai învățat primele cuvinte în germană alături de Björn, Emma, Max și familia lor! Acum ești gata pentru noi aventuri!",
      next_zone_unlock: "forest",
      total_stars_earned: 91,
      total_points_earned: 910,
      badges_unlocked: ["Prietenii Castelului", "Maestrul Castelului", "Începător în Germană"]
    }
  }
];

// Statistici pentru zona completă
export const CASTLE_ZONE_STATS = {
  total_lessons: 25,
  total_vocabulary: 195,
  vocabulary_categories: {
    "Familie și relații": 25,
    "Casa și camerele": 20,
    "Activități zilnice": 30,
    "Mâncare și băutură": 18,
    "Haine și îmbrăcăminte": 15,
    "Jocuri și jucării": 20,
    "Comunicare și salutări": 22,
    "Vremea și anotimpurile": 12,
    "Sărbători și evenimente": 15,
    "Cuvinte de legătură și expresii": 18
  },
  grammar_progression: {
    "Lecțiile 1-5": ["Salutări", "Prezentări", "Pronumele personale de bază"],
    "Lecțiile 6-10": ["Articolele der/die/das", "Culorile", "Verbe simple"],
    "Lecțiile 11-15": ["Activități zilnice", "Verbe modale (können, müssen)"],
    "Lecțiile 16-20": ["Construcții mai complexe", "Timp trecut simplu"],
    "Lecțiile 21-25": ["Fraze întregi", "Conversații scurte", "Recapitulare"]
  },
  available_badges: [
    {
      id: "friends_castle",
      name: "Prietenii Castelului",
      description: "Pentru primele 10 lecții",
      requirement: "Complete lessons 1-10"
    },
    {
      id: "castle_explorer",
      name: "Exploratori ai Castelului", 
      description: "Pentru lecțiile 11-20",
      requirement: "Complete lessons 11-20"
    },
    {
      id: "castle_master",
      name: "Maestrul Castelului Familiei",
      description: "Pentru finalizarea tuturor lecțiilor",
      requirement: "Complete all 25 lessons with minimum 80% score"
    }
  ]
};

// Preview pentru următoarea zonă
export const NEXT_ZONE_PREVIEW = {
  id: "forest",
  name: "Pădurea Cuvintelor",
  subtitle: "Lecțiile 26-50",
  description: "Continuă aventura în pădurea magică cu noi prieteni!",
  unlock_requirements: {
    zone_completed: "castle",
    badge_required: "castle_master"
  },
  preview_characters: ["🦔 Felix", "🐿️ Nora", "🦊 Leo"],
  preview_topics: ["Natura", "Animalele sălbatice", "Activități în aer liber"],
  coming_soon: true
};
