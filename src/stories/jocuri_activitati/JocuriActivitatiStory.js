import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Jocuri și Activități Story - Lecțiile 5-7
 * Învățarea despre jocuri, culori și mâncare prin aventuri distractive
 */
export class JocuriActivitatiStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'jocuri_activitati',
        name: 'Jocuri și Activități',
        description: 'Învață despre jocuri, culori și mâncare alături de Björn și Anna',
        order: 2,
        difficulty: 'beginner',
        estimatedDuration: 12, // minutes per lesson
        color: '#FF6B6B', // Playful red
        icon: '🎮',
        lessonsRange: '5-7',
        totalLessons: 3
      },

      lessons: this.createLessons(),
      characters: this.generateCharacters(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {
        prerequisiteStories: ['castle', 'familie', 'haus', 'morgen'],
        minimumProgress: {
          'morgen': 80
        }
      }
    };

    await this.initializeWithData(storyData);
  }

  createLessons() {
    return [
      // Lecția 5: Jocurile cu Anna
      {
        id: 5,
        title: "Jocurile cu Anna",
        subtitle: "Activități distractive",
        duration: 4,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Anna, willst du spielen?",
              romanian: "Anna, vrei să te joci?",
              image: "bjorn_anna_playing",
              audio: "L05_scene_01_spielen_question"
            },
            {
              character: "anna",
              german: "Ja! Was wollen wir spielen?",
              romanian: "Da! Ce vrem să ne jucăm?",
              image: "anna_excited_games",
              audio: "L05_scene_02_anna_excited"
            },
            {
              character: "björn",
              german: "Wir können mit dem Ball spielen oder lesen.",
              romanian: "Ne putem juca cu mingea sau să citim.",
              image: "games_options",
              audio: "L05_scene_03_game_options"
            },
            {
              character: "emma",
              german: "Lesen ist toll! Ich liebe Bücher!",
              romanian: "Cititul este minunat! Îmi plac cărțile!",
              image: "emma_books_love",
              audio: "L05_scene_04_emma_books"
            },
            {
              character: "anna",
              german: "Ich auch! Lass uns zusammen lesen!",
              romanian: "Și mie! Hai să citim împreună!",
              image: "reading_together",
              audio: "L05_scene_05_reading_together"
            }
          ]
        },

        vocabulary: [
          { german: "spielen", romanian: "a se juca", category: "activități", audio: "vocab_spielen" },
          { german: "wollen", romanian: "a vrea", category: "verbe", audio: "vocab_wollen" },
          { german: "der Ball", romanian: "mingea", category: "jucării", audio: "vocab_der_ball" },
          { german: "lesen", romanian: "a citi", category: "activități", audio: "vocab_lesen" },
          { german: "das Buch", romanian: "cartea", category: "obiecte", audio: "vocab_das_buch" },
          { german: "lieben", romanian: "a iubi/a plăcea", category: "sentimente", audio: "vocab_lieben" },
          { german: "zusammen", romanian: "împreună", category: "adverbe", audio: "vocab_zusammen" },
          { german: "toll", romanian: "minunat", category: "adjective", audio: "vocab_toll" }
        ],

        games: [
          {
            id: "L05_drag_drop",
            type: "drag_drop",
            title: "Jocurile și activitățile",
            instructions: "Conectează fiecare activitate cu imaginea corespunzătoare",
            items: [
              { german: "spielen", romanian: "a se juca", image: "bjorn_anna_playing", category: "activity", audio: "vocab_spielen" },
              { german: "der Ball", romanian: "mingea", image: "colorful_ball", category: "object", audio: "vocab_der_ball" },
              { german: "das Buch", romanian: "cartea", image: "open_book", category: "object", audio: "vocab_das_buch" },
              { german: "lesen", romanian: "a citi", image: "reading_scene", category: "activity", audio: "vocab_lesen" }
            ]
          },
          {
            id: "L05_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să spunem ce ne place să facem!",
            instructions: "Emma: 'Repetă după mine!'",
            challenges: [
              {
                phrase: "Ich spiele gern",
                romanian: "Îmi place să mă joc",
                audio: "speaking_ich_spiele_gern",
                difficulty: "easy"
              },
              {
                phrase: "Ich lese gern",
                romanian: "Îmi place să citesc", 
                audio: "speaking_ich_lese_gern",
                difficulty: "easy"
              },
              {
                phrase: "Wir spielen zusammen",
                romanian: "Ne jucăm împreună",
                audio: "speaking_wir_spielen_zusammen",
                difficulty: "medium"
              }
            ]
          },
          {
            id: "L05_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Activități",
            instructions: "Max: 'Răspunde la întrebări!'",
            questions: [
              {
                question: "Ce înseamnă 'zusammen' în română?",
                options: ["singur", "împreună", "repede"],
                correct: 1,
                audio: "question_zusammen"
              }
            ]
          }
        ]
      },

      // Lecția 6: Culorile Casei
      {
        id: 6,
        title: "Culorile Casei", 
        subtitle: "Lumea colorată",
        duration: 4,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Schau, Emma! Unser Haus ist bunt!",
              romanian: "Uită-te, Emma! Casa noastră este colorată!",
              image: "colorful_house",
              audio: "L06_scene_01_colorful_house"
            },
            {
              character: "emma",
              german: "Ja! Die Wände sind gelb wie die Sonne!",
              romanian: "Da! Pereții sunt galbeni ca soarele!",
              image: "yellow_walls_sun",
              audio: "L06_scene_02_yellow_walls"
            },
            {
              character: "björn",
              german: "Und die Türen sind braun wie Schokolade!",
              romanian: "Și ușile sunt maro ca ciocolata!",
              image: "brown_doors_chocolate",
              audio: "L06_scene_03_brown_doors"
            },
            {
              character: "emma",
              german: "Die Blumen im Garten sind rot und blau!",
              romanian: "Florile din grădină sunt roșii și albastre!",
              image: "garden_red_blue_flowers",
              audio: "L06_scene_04_garden_flowers"
            },
            {
              character: "björn",
              german: "Alles ist so schön und farbenfroh!",
              romanian: "Totul este atât de frumos și colorat!",
              image: "colorful_everything",
              audio: "L06_scene_05_everything_colorful"
            }
          ]
        },

        vocabulary: [
          { german: "bunt", romanian: "colorat", category: "adjective", audio: "vocab_bunt" },
          { german: "gelb", romanian: "galben", category: "culori", audio: "vocab_gelb" },
          { german: "braun", romanian: "maro", category: "culori", audio: "vocab_braun" },
          { german: "rot", romanian: "roșu", category: "culori", audio: "vocab_rot" },
          { german: "blau", romanian: "albastru", category: "culori", audio: "vocab_blau" },
          { german: "die Blumen", romanian: "florile", category: "natură", audio: "vocab_die_blumen" },
          { german: "der Garten", romanian: "grădina", category: "locuri", audio: "vocab_der_garten" },
          { german: "farbenfroh", romanian: "colorat", category: "adjective", audio: "vocab_farbenfroh" }
        ],

        games: [
          {
            id: "L06_drag_drop",
            type: "drag_drop", 
            title: "Asociază culorile",
            instructions: "Trage fiecare culoare la imaginea corespunzătoare",
            items: [
              { german: "gelb", romanian: "galben", image: "yellow_sun", category: "color", audio: "vocab_gelb" },
              { german: "rot", romanian: "roșu", image: "red_apple", category: "color", audio: "vocab_rot" },
              { german: "blau", romanian: "albastru", image: "blue_sky", category: "color", audio: "vocab_blau" },
              { german: "braun", romanian: "maro", image: "brown_bear", category: "color", audio: "vocab_braun" }
            ]
          },
          {
            id: "L06_memory",
            type: "memory",
            title: "Jocul memoriei - Culori",
            instructions: "Găsește perechile de culori română-germană",
            pairs: [
              { german: "gelb", romanian: "galben", audio: "vocab_gelb" },
              { german: "rot", romanian: "roșu", audio: "vocab_rot" },
              { german: "blau", romanian: "albastru", audio: "vocab_blau" },
              { german: "braun", romanian: "maro", audio: "vocab_braun" }
            ]
          },
          {
            id: "L06_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Culori",
            instructions: "Max: 'Alege culoarea corectă!'",
            questions: [
              {
                question: "Ce culoare are cerul?",
                options: ["gelb", "rot", "blau"],
                correct: 2,
                audio: "question_sky_color"
              }
            ]
          }
        ]
      },

      // Lecția 7: Mâncarea Preferată
      {
        id: 7,
        title: "Mâncarea Preferată",
        subtitle: "Gusturi și preferințe",
        duration: 4,

        story: {
          narrator: "björn", 
          scenes: [
            {
              character: "björn",
              german: "Ich bin hungrig! Was gibt es zum Mittagessen?",
              romanian: "Mi-e foame! Ce avem la prânz?",
              image: "bjorn_hungry",
              audio: "L07_scene_01_hungry_bjorn"
            },
            {
              character: "mama_baer",
              german: "Heute gibt es Suppe und Brot!",
              romanian: "Astăzi avem supă și pâine!",
              image: "mama_cooking_soup_bread",
              audio: "L07_scene_02_mama_cooking"
            },
            {
              character: "emma",
              german: "Ich esse gern Äpfel und Käse!",
              romanian: "Îmi place să mănânc mere și brânză!",
              image: "emma_apples_cheese",
              audio: "L07_scene_03_emma_preferences"
            },
            {
              character: "björn",
              german: "Und ich trinke gern Milch dazu!",
              romanian: "Și îmi place să beau lapte cu ele!",
              image: "bjorn_drinking_milk",
              audio: "L07_scene_04_bjorn_milk"
            },
            {
              character: "anna",
              german: "Nach dem Essen können wir Kuchen haben!",
              romanian: "După mâncare putem să avem prăjitură!",
              image: "anna_cake_dessert",
              audio: "L07_scene_05_anna_cake"
            }
          ]
        },

        vocabulary: [
          { german: "hungrig", romanian: "flămând", category: "sentimente", audio: "vocab_hungrig" },
          { german: "das Mittagessen", romanian: "prânzul", category: "mese", audio: "vocab_das_mittagessen" },
          { german: "die Suppe", romanian: "supa", category: "mâncare", audio: "vocab_die_suppe" },
          { german: "das Brot", romanian: "pâinea", category: "mâncare", audio: "vocab_das_brot" },
          { german: "der Apfel", romanian: "mărul", category: "fructe", audio: "vocab_der_apfel" },
          { german: "der Käse", romanian: "brânza", category: "mâncare", audio: "vocab_der_kaese" },
          { german: "die Milch", romanian: "laptele", category: "băuturi", audio: "vocab_die_milch" },
          { german: "der Kuchen", romanian: "prăjitura", category: "deserturi", audio: "vocab_der_kuchen" }
        ],

        games: [
          {
            id: "L07_drag_drop",
            type: "drag_drop",
            title: "Mâncarea și băutura", 
            instructions: "Conectează fiecare aliment cu imaginea sa",
            items: [
              { german: "die Suppe", romanian: "supa", image: "bowl_soup", category: "food", audio: "vocab_die_suppe" },
              { german: "das Brot", romanian: "pâinea", image: "bread_loaf", category: "food", audio: "vocab_das_brot" },
              { german: "der Apfel", romanian: "mărul", image: "red_apple", category: "food", audio: "vocab_der_apfel" },
              { german: "die Milch", romanian: "laptele", image: "glass_milk", category: "drink", audio: "vocab_die_milch" }
            ]
          },
          {
            id: "L07_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să spunem ce mâncăm!",
            instructions: "Emma: 'Repetă după mine!'",
            challenges: [
              {
                phrase: "Ich esse Brot",
                romanian: "Mănânc pâine",
                audio: "speaking_ich_esse_brot",
                difficulty: "easy"
              },
              {
                phrase: "Ich trinke Milch",
                romanian: "Beau lapte",
                audio: "speaking_ich_trinke_milch", 
                difficulty: "easy"
              },
              {
                phrase: "Ich bin hungrig",
                romanian: "Mi-e foame",
                audio: "speaking_ich_bin_hungrig",
                difficulty: "medium"
              }
            ]
          },
          {
            id: "L07_word_builder",
            type: "word_puzzle",
            title: "Construiește cuvântul pentru 'măr'!",
            instructions: "Max: 'Aranjează literele în ordine corectă!'",
            targetWord: "APFEL",
            availableLetters: ["A", "P", "F", "E", "L", "X", "B", "R"],
            difficulty: "easy"
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
        description: "Un urs jucăuș care adoră să exploreze activități noi",
        personality: "curios, energic, prietenos",
        images: {
          default: "bjorn_default",
          playing: "bjorn_anna_playing",
          hungry: "bjorn_hungry",
          excited: "bjorn_excited_games"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      anna: {
        name: "Anna",
        fullName: "Anna die kleine Schwester",
        type: "bear",
        description: "Sora mică a lui Björn, plină de energie și creativitate",
        personality: "jucăușă, creativă, entuziastă",
        images: {
          default: "anna_default",
          excited: "anna_excited_games",
          cake: "anna_cake_dessert"
        },
        voice: "child_female",
        color: "#F4A460"
      },
      emma: {
        name: "Emma",
        fullName: "Emma die Ente",
        type: "duck",
        description: "O rățușcă care iubește cărțile și culorile",
        personality: "intelectuală, artistică, încurajatoare",
        images: {
          default: "emma_excited",
          books: "emma_books_love",
          colors: "emma_apples_cheese"
        },
        voice: "female_cheerful",
        color: "#FFD700"
      },
      mama_baer: {
        name: "Mama Bär",
        fullName: "Mama Bär",
        type: "bear",
        description: "Mama iubitoare care pregătește mâncare delicioasă",
        personality: "grijulie, caldă, creativă în bucătărie",
        images: {
          default: "mama_baer_default",
          cooking: "mama_cooking_soup_bread"
        },
        voice: "female_warm",
        color: "#D2691E"
      }
    };
  }

  generateGames() {
    return [
      {
        id: "activities_master",
        type: "drag_drop",
        difficulty: "easy",
        category: "activities_learning"
      },
      {
        id: "colors_magic",
        type: "memory",
        difficulty: "easy", 
        category: "colors_learning"
      },
      {
        id: "food_adventure",
        type: "word_puzzle",
        difficulty: "easy",
        category: "food_learning"
      }
    ];
  }

  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/jocuri_activitati",
      files: {
        // Lecția 5 - Jocurile cu Anna
        "L05_scene_01_spielen_question": "L05_bjorn_spielen_question.mp3",
        "L05_scene_02_anna_excited": "L05_anna_excited_games.mp3",
        "L05_scene_03_game_options": "L05_bjorn_game_options.mp3", 
        "L05_scene_04_emma_books": "L05_emma_loves_books.mp3",
        "L05_scene_05_reading_together": "L05_anna_reading_together.mp3",
        
        // Lecția 6 - Culorile Casei
        "L06_scene_01_colorful_house": "L06_bjorn_colorful_house.mp3",
        "L06_scene_02_yellow_walls": "L06_emma_yellow_walls.mp3",
        "L06_scene_03_brown_doors": "L06_bjorn_brown_doors.mp3",
        "L06_scene_04_garden_flowers": "L06_emma_garden_flowers.mp3", 
        "L06_scene_05_everything_colorful": "L06_bjorn_everything_colorful.mp3",
        
        // Lecția 7 - Mâncarea Preferată
        "L07_scene_01_hungry_bjorn": "L07_bjorn_hungry.mp3",
        "L07_scene_02_mama_cooking": "L07_mama_soup_bread.mp3",
        "L07_scene_03_emma_preferences": "L07_emma_apples_cheese.mp3",
        "L07_scene_04_bjorn_milk": "L07_bjorn_drinks_milk.mp3",
        "L07_scene_05_anna_cake": "L07_anna_wants_cake.mp3",
        
        // Vocabular
        "vocab_spielen": "vocab_L05_spielen.mp3",
        "vocab_wollen": "vocab_L05_wollen.mp3",
        "vocab_der_ball": "vocab_L05_der_ball.mp3",
        "vocab_lesen": "vocab_L05_lesen.mp3",
        "vocab_das_buch": "vocab_L05_das_buch.mp3",
        "vocab_lieben": "vocab_L05_lieben.mp3",
        "vocab_zusammen": "vocab_L05_zusammen.mp3",
        "vocab_toll": "vocab_L05_toll.mp3",
        
        "vocab_bunt": "vocab_L06_bunt.mp3",
        "vocab_gelb": "vocab_L06_gelb.mp3",
        "vocab_braun": "vocab_L06_braun.mp3",
        "vocab_rot": "vocab_L06_rot.mp3",
        "vocab_blau": "vocab_L06_blau.mp3",
        "vocab_die_blumen": "vocab_L06_die_blumen.mp3",
        "vocab_der_garten": "vocab_L06_der_garten.mp3",
        "vocab_farbenfroh": "vocab_L06_farbenfroh.mp3",
        
        "vocab_hungrig": "vocab_L07_hungrig.mp3",
        "vocab_das_mittagessen": "vocab_L07_das_mittagessen.mp3", 
        "vocab_die_suppe": "vocab_L07_die_suppe.mp3",
        "vocab_das_brot": "vocab_L07_das_brot.mp3",
        "vocab_der_apfel": "vocab_L07_der_apfel.mp3",
        "vocab_der_kaese": "vocab_L07_der_kaese.mp3",
        "vocab_die_milch": "vocab_L07_die_milch.mp3",
        "vocab_der_kuchen": "vocab_L07_der_kuchen.mp3",
        
        // Game audio
        "speaking_ich_spiele_gern": "speaking_L05_ich_spiele_gern.mp3",
        "speaking_ich_lese_gern": "speaking_L05_ich_lese_gern.mp3",
        "speaking_wir_spielen_zusammen": "speaking_L05_wir_spielen_zusammen.mp3",
        "speaking_ich_esse_brot": "speaking_L07_ich_esse_brot.mp3",
        "speaking_ich_trinke_milch": "speaking_L07_ich_trinke_milch.mp3",
        "speaking_ich_bin_hungrig": "speaking_L07_ich_bin_hungrig.mp3",
        
        "question_zusammen": "game_L05_question_zusammen.mp3",
        "question_sky_color": "game_L06_question_sky_color.mp3"
      }
    };
  }
}