import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Ieșiri și Activități Story - Lecțiile 16-20
 * Învățarea despre cumpărături, doctor, distracții în familie, sărbători și prieteni
 */
export class IesiriActivitatiStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'iesiri_activitati',
        name: 'Ieșiri și Activități',
        description: 'Explorează lumea din afara casei: cumpărături, vizite și sărbători',
        order: 5,
        difficulty: 'intermediate',
        estimatedDuration: 18, // minutes per lesson
        color: '#FFA726', // Orange
        icon: '🏪',
        lessonsRange: '16-20',
        totalLessons: 5
      },

      lessons: this.createLessons(),
      characters: this.generateCharacters(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {
        prerequisiteStories: ['viata_zilnica'],
        minimumProgress: {
          'viata_zilnica': 80
        }
      }
    };

    await this.initializeWithData(storyData);
  }

  createLessons() {
    return [
      // Lecția 16: Cumpărăturile cu Mama
      {
        id: 16,
        title: "Cumpărăturile cu Mama",
        subtitle: "La magazin să cumpărăm",
        duration: 6,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Heute gehen wir mit Mama einkaufen!",
              romanian: "Astăzi mergem cu mama la cumpărături!",
              image: "bjorn_excited_shopping",
              audio: "L16_scene_01_going_shopping"
            },
            {
              character: "mama_baer",
              german: "Wir brauchen Brot, Milch und Äpfel aus dem Supermarkt.",
              romanian: "Avem nevoie de pâine, lapte și mere de la supermarket.",
              image: "mama_shopping_list",
              audio: "L16_scene_02_shopping_list"
            },
            {
              character: "anna",
              german: "Können wir auch Bonbons kaufen?",
              romanian: "Putem să cumpărăm și bomboane?",
              image: "anna_asking_candy",
              audio: "L16_scene_03_anna_candy"
            },
            {
              character: "verkäuferin",
              german: "Guten Tag! Kann ich Ihnen helfen?",
              romanian: "Bună ziua! Pot să vă ajut?",
              image: "friendly_shopkeeper",
              audio: "L16_scene_04_shopkeeper_greeting"
            },
            {
              character: "björn",
              german: "Das Einkaufen macht Spaß! Danke für die Hilfe!",
              romanian: "Cumpărăturile sunt distractive! Mulțumim pentru ajutor!",
              image: "family_happy_shopping",
              audio: "L16_scene_05_shopping_fun"
            }
          ]
        },

        vocabulary: [
          { german: "einkaufen", romanian: "a face cumpărături", category: "activități", audio: "vocab_einkaufen" },
          { german: "der Supermarkt", romanian: "supermarketul", category: "locuri", audio: "vocab_der_supermarkt" },
          { german: "brauchen", romanian: "a avea nevoie", category: "verbe", audio: "vocab_brauchen" },
          { german: "kaufen", romanian: "a cumpăra", category: "verbe", audio: "vocab_kaufen" },
          { german: "die Bonbons", romanian: "bomboanele", category: "dulciuri", audio: "vocab_die_bonbons" },
          { german: "der Verkäufer", romanian: "vânzătorul", category: "meserii", audio: "vocab_der_verkaeufer" },
          { german: "helfen", romanian: "a ajuta", category: "verbe", audio: "vocab_helfen" },
          { german: "das Einkaufen", romanian: "cumpărăturile", category: "activități", audio: "vocab_das_einkaufen" }
        ],

        games: [
          {
            id: "L16_drag_drop",
            type: "drag_drop",
            title: "Lista de cumpărături",
            instructions: "Pune alimentele în coșul de cumpărături potrivit",
            items: [
              { german: "das Brot", romanian: "pâinea", image: "bread_loaf", category: "bakery", audio: "vocab_das_brot" },
              { german: "die Milch", romanian: "laptele", image: "milk_bottle", category: "dairy", audio: "vocab_die_milch" },
              { german: "die Äpfel", romanian: "merele", image: "red_apples", category: "fruits", audio: "vocab_die_aepfel" },
              { german: "die Bonbons", romanian: "bomboanele", image: "colorful_candy", category: "sweets", audio: "vocab_die_bonbons" }
            ]
          },
          {
            id: "L16_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Magazin",
            instructions: "Max: 'Ce cumpărăm astăzi?'",
            questions: [
              {
                question: "Unde cumpărăm alimentele?",
                options: ["im Park", "im Supermarkt", "im Garten"],
                correct: 1,
                audio: "question_supermarkt"
              },
              {
                question: "Ce înseamnă 'kaufen' în română?",
                options: ["a vinde", "a cumpăra", "a găti"],
                correct: 1,
                audio: "question_kaufen"
              }
            ]
          },
          {
            id: "L16_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să cumpărăm!",
            instructions: "Emma: 'Spune ce cumperi!'",
            challenges: [
              {
                phrase: "Wir gehen einkaufen",
                romanian: "Mergem la cumpărături",
                audio: "speaking_wir_gehen_einkaufen",
                difficulty: "easy"
              },
              {
                phrase: "Ich brauche Brot und Milch",
                romanian: "Am nevoie de pâine și lapte",
                audio: "speaking_brauche_brot_milch",
                difficulty: "medium"
              }
            ]
          }
        ]
      },

      // Lecția 17: La doctor cu Anna
      {
        id: 17,
        title: "La doctor cu Anna",
        subtitle: "Vizita medicală",
        duration: 6,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "mama_baer",
              german: "Anna fühlt sich nicht gut. Wir müssen zum Arzt gehen.",
              romanian: "Anna nu se simte bine. Trebuie să mergem la doctor.",
              image: "mama_worried_anna",
              audio: "L17_scene_01_anna_sick"
            },
            {
              character: "anna",
              german: "Mein Bauch tut weh und ich habe Kopfschmerzen.",
              romanian: "Mă doare burtica și am dureri de cap.",
              image: "anna_feeling_sick",
              audio: "L17_scene_02_anna_pain"
            },
            {
              character: "doktor",
              german: "Guten Tag, Anna! Lass mich dich untersuchen.",
              romanian: "Bună ziua, Anna! Lasă-mă să te examinez.",
              image: "kind_doctor_examining",
              audio: "L17_scene_03_doctor_examination"
            },
            {
              character: "doktor",
              german: "Du hast nur eine kleine Erkältung. Trinke viel Wasser und ruhe dich aus!",
              romanian: "Ai doar o răceală mică. Bea multă apă și odihnește-te!",
              image: "doctor_giving_advice",
              audio: "L17_scene_04_doctor_advice"
            },
            {
              character: "anna",
              german: "Vielen Dank, Herr Doktor! Ich werde gesund werden!",
              romanian: "Mulțumesc mult, domnule doctor! Mă voi vindeca!",
              image: "anna_feeling_better",
              audio: "L17_scene_05_anna_grateful"
            }
          ]
        },

        vocabulary: [
          { german: "sich fühlen", romanian: "a se simți", category: "sănătate", audio: "vocab_sich_fuehlen" },
          { german: "der Arzt", romanian: "doctorul", category: "meserii", audio: "vocab_der_arzt" },
          { german: "wehtun", romanian: "a durea", category: "sănătate", audio: "vocab_wehtun" },
          { german: "der Bauch", romanian: "burtica", category: "corp", audio: "vocab_der_bauch" },
          { german: "die Kopfschmerzen", romanian: "durerile de cap", category: "sănătate", audio: "vocab_die_kopfschmerzen" },
          { german: "untersuchen", romanian: "a examina", category: "medical", audio: "vocab_untersuchen" },
          { german: "die Erkältung", romanian: "răceala", category: "boli", audio: "vocab_die_erkaeltung" },
          { german: "gesund werden", romanian: "a se vindeca", category: "sănătate", audio: "vocab_gesund_werden" }
        ],

        games: [
          {
            id: "L17_drag_drop",
            type: "drag_drop",
            title: "Părțile corpului și durerile",
            instructions: "Conectează durerea cu partea corpului",
            items: [
              { german: "der Kopf", romanian: "capul", image: "head_icon", category: "body_part", audio: "vocab_der_kopf" },
              { german: "der Bauch", romanian: "burtica", image: "stomach_icon", category: "body_part", audio: "vocab_der_bauch" },
              { german: "Kopfschmerzen", romanian: "durere de cap", image: "headache_icon", category: "pain", audio: "vocab_die_kopfschmerzen" },
              { german: "Bauchschmerzen", romanian: "durere de burtă", image: "stomach_ache", category: "pain", audio: "vocab_bauchschmerzen" }
            ]
          },
          {
            id: "L17_memory",
            type: "memory",
            title: "Jocul memoriei - La doctor",
            instructions: "Găsește perechile medicale",
            pairs: [
              { german: "der Arzt", romanian: "doctorul", audio: "vocab_der_arzt" },
              { german: "die Erkältung", romanian: "răceala", audio: "vocab_die_erkaeltung" },
              { german: "untersuchen", romanian: "a examina", audio: "vocab_untersuchen" },
              { german: "gesund werden", romanian: "a se vindeca", audio: "vocab_gesund_werden" }
            ]
          },
          {
            id: "L17_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să vorbim despre sănătate!",
            instructions: "Emma: 'Spune cum te simți!'",
            challenges: [
              {
                phrase: "Ich fühle mich nicht gut",
                romanian: "Nu mă simt bine",
                audio: "speaking_nicht_gut_fuehlen",
                difficulty: "easy"
              },
              {
                phrase: "Mein Kopf tut weh",
                romanian: "Mă doare capul",
                audio: "speaking_kopf_tut_weh",
                difficulty: "medium"
              },
              {
                phrase: "Ich will gesund werden",
                romanian: "Vreau să mă vindec",
                audio: "speaking_gesund_werden",
                difficulty: "medium"
              }
            ]
          }
        ]
      },

      // Lecția 18: Distracție în familie
      {
        id: 18,
        title: "Distracție în familie",
        subtitle: "Weekend distractiv",
        duration: 6,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Heute ist Wochenende! Was können wir Spaßiges machen?",
              romanian: "Astăzi e weekend! Ce putem face distractiv?",
              image: "bjorn_weekend_excitement",
              audio: "L18_scene_01_weekend_fun"
            },
            {
              character: "papa_baer",
              german: "Lass uns in den Park gehen und dort spielen!",
              romanian: "Hai să mergem în parc să ne jucăm acolo!",
              image: "papa_suggests_park",
              audio: "L18_scene_02_papa_park_idea"
            },
            {
              character: "emma",
              german: "Wir können Fußball spielen oder auf die Schaukel gehen!",
              romanian: "Putem să jucăm fotbal sau să mergem pe leagăn!",
              image: "emma_park_activities",
              audio: "L18_scene_03_emma_activities"
            },
            {
              character: "anna",
              german: "Und danach können wir Eis essen! Das ist lecker!",
              romanian: "Și după aceea putem să mâncăm înghețată! E delicioasă!",
              image: "anna_ice_cream_idea",
              audio: "L18_scene_04_anna_ice_cream"
            },
            {
              character: "familie",
              german: "Was für ein schöner Familientag! Wir haben viel Spaß zusammen!",
              romanian: "Ce zi frumoasă în familie! Ne distrăm mult împreună!",
              image: "happy_family_day",
              audio: "L18_scene_05_beautiful_family_day"
            }
          ]
        },

        vocabulary: [
          { german: "das Wochenende", romanian: "weekend-ul", category: "timp", audio: "vocab_das_wochenende" },
          { german: "spaßig", romanian: "distractiv", category: "adjective", audio: "vocab_spassig" },
          { german: "der Park", romanian: "parcul", category: "locuri", audio: "vocab_der_park" },
          { german: "Fußball spielen", romanian: "a juca fotbal", category: "sporturi", audio: "vocab_fussball_spielen" },
          { german: "die Schaukel", romanian: "leagănul", category: "joacă", audio: "vocab_die_schaukel" },
          { german: "das Eis", romanian: "înghețata", category: "dulciuri", audio: "vocab_das_eis" },
          { german: "lecker", romanian: "delicious", category: "gust", audio: "vocab_lecker" },
          { german: "der Familientag", romanian: "ziua în familie", category: "familie", audio: "vocab_der_familientag" }
        ],

        games: [
          {
            id: "L18_story_sequence",
            type: "story_sequence",
            title: "Ziua perfectă în familie",
            instructions: "Aranjează activitățile familiei în ordinea corectă",
            sequence: [
              {
                step: 1,
                german: "Familie decide să iasă în parc",
                romanian: "Familie entscheidet in den Park zu gehen",
                image: "family_deciding_park",
                audio: "sequence_01_deciding"
              },
              {
                step: 2,
                german: "Se joacă fotbal în parc",
                romanian: "Sie spielen Fußball im Park",
                image: "family_playing_football",
                audio: "sequence_02_football"
              },
              {
                step: 3,
                german: "Anna merge pe leagăn",
                romanian: "Anna geht auf die Schaukel",
                image: "anna_on_swing",
                audio: "sequence_03_swing"
              },
              {
                step: 4,
                german: "Toți mănâncă înghețată",
                romanian: "Alle essen Eis",
                image: "family_eating_ice_cream",
                audio: "sequence_04_ice_cream"
              },
              {
                step: 5,
                german: "Se întorc acasă fericiți",
                romanian: "Sie gehen glücklich nach Hause",
                image: "happy_family_returning",
                audio: "sequence_05_returning_happy"
              }
            ]
          },
          {
            id: "L18_drag_drop",
            type: "drag_drop",
            title: "Activitățile din parc",
            instructions: "Conectează activitatea cu locul din parc",
            items: [
              { german: "Fußball spielen", romanian: "a juca fotbal", image: "football_field", category: "sport", audio: "vocab_fussball_spielen" },
              { german: "die Schaukel", romanian: "leagănul", image: "playground_swing", category: "playground", audio: "vocab_die_schaukel" },
              { german: "das Eis", romanian: "înghețata", image: "ice_cream_vendor", category: "treat", audio: "vocab_das_eis" },
              { german: "der Park", romanian: "parcul", image: "beautiful_park", category: "location", audio: "vocab_der_park" }
            ]
          },
          {
            id: "L18_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Familie",
            instructions: "Max: 'Ce facem în weekend?'",
            questions: [
              {
                question: "Când se întâmplă povestea?",
                options: ["Montag", "Wochenende", "Mittwoch"],
                correct: 1,
                audio: "question_wochenende"
              },
              {
                question: "Ce mănâncă familia la sfârșit?",
                options: ["Kuchen", "Eis", "Brot"],
                correct: 1,
                audio: "question_eis"
              }
            ]
          }
        ]
      },

      // Lecția 19: Sărbătoarea de Crăciun
      {
        id: 19,
        title: "Sărbătoarea de Crăciun",
        subtitle: "Weihnachten cu familia",
        duration: 6,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Es ist Weihnachtszeit! Überall sind Lichter und Schmuck!",
              romanian: "E timpul Crăciunului! Peste tot sunt lumini și decorațiuni!",
              image: "christmas_lights_decorations",
              audio: "L19_scene_01_christmas_time"
            },
            {
              character: "emma",
              german: "Wir haben einen wunderschönen Weihnachtsbaum geschmückt!",
              romanian: "Am decorat un brad de Crăciun foarte frumos!",
              image: "beautiful_christmas_tree",
              audio: "L19_scene_02_christmas_tree"
            },
            {
              character: "anna",
              german: "Ich habe Kekse für den Weihnachtsmann gebacken!",
              romanian: "Am copt biscuiți pentru Moș Crăciun!",
              image: "anna_baking_cookies",
              audio: "L19_scene_03_anna_cookies"
            },
            {
              character: "weihnachtsmann",
              german: "Ho ho ho! Ich bringe Geschenke für alle braven Kinder!",
              romanian: "Ho ho ho! Aduc cadouri pentru toți copiii cuminți!",
              image: "santa_with_gifts",
              audio: "L19_scene_04_santa_gifts"
            },
            {
              character: "familie",
              german: "Fröhliche Weihnachten! Das ist das schönste Fest des Jahres!",
              romanian: "Crăciun fericit! Aceasta e cea mai frumoasă sărbătoare a anului!",
              image: "merry_christmas_family",
              audio: "L19_scene_05_merry_christmas"
            }
          ]
        },

        vocabulary: [
          { german: "Weihnachten", romanian: "Crăciunul", category: "sărbători", audio: "vocab_weihnachten" },
          { german: "die Lichter", romanian: "luminile", category: "decorațiuni", audio: "vocab_die_lichter" },
          { german: "der Schmuck", romanian: "decorațiunile", category: "ornamente", audio: "vocab_der_schmuck" },
          { german: "der Weihnachtsbaum", romanian: "bradul de Crăciun", category: "sărbători", audio: "vocab_der_weihnachtsbaum" },
          { german: "schmücken", romanian: "a decora", category: "activități", audio: "vocab_schmuecken" },
          { german: "die Kekse", romanian: "biscuiții", category: "dulciuri", audio: "vocab_die_kekse" },
          { german: "der Weihnachtsmann", romanian: "Moș Crăciun", category: "personaje", audio: "vocab_der_weihnachtsmann" },
          { german: "fröhlich", romanian: "vesel", category: "sentimente", audio: "vocab_froehlich" }
        ],

        games: [
          {
            id: "L19_drag_drop",
            type: "drag_drop",
            title: "Decorațiunile de Crăciun",
            instructions: "Decorează bradul cu ornamentele potrivite",
            items: [
              { german: "die Lichter", romanian: "luminile", image: "christmas_lights", category: "decoration", audio: "vocab_die_lichter" },
              { german: "der Schmuck", romanian: "decorațiunile", image: "christmas_ornaments", category: "decoration", audio: "vocab_der_schmuck" },
              { german: "der Stern", romanian: "steaua", image: "christmas_star", category: "decoration", audio: "vocab_der_stern" },
              { german: "die Kugeln", romanian: "globulețele", image: "christmas_balls", category: "decoration", audio: "vocab_die_kugeln" }
            ]
          },
          {
            id: "L19_memory",
            type: "memory",
            title: "Jocul memoriei - Crăciun",
            instructions: "Găsește perechile cu elementele de Crăciun",
            pairs: [
              { german: "Weihnachten", romanian: "Crăciunul", audio: "vocab_weihnachten" },
              { german: "der Weihnachtsbaum", romanian: "bradul de Crăciun", audio: "vocab_der_weihnachtsbaum" },
              { german: "die Kekse", romanian: "biscuiții", audio: "vocab_die_kekse" },
              { german: "der Weihnachtsmann", romanian: "Moș Crăciun", audio: "vocab_der_weihnachtsmann" }
            ]
          },
          {
            id: "L19_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să urăm Crăciun fericit!",
            instructions: "Emma: 'Urează Crăciun fericit!'",
            challenges: [
              {
                phrase: "Fröhliche Weihnachten",
                romanian: "Crăciun fericit",
                audio: "speaking_froehliche_weihnachten",
                difficulty: "easy"
              },
              {
                phrase: "Wir schmücken den Weihnachtsbaum",
                romanian: "Decorăm bradul de Crăciun",
                audio: "speaking_schmuecken_baum",
                difficulty: "medium"
              },
              {
                phrase: "Der Weihnachtsmann bringt Geschenke",
                romanian: "Moș Crăciun aduce cadouri",
                audio: "speaking_weihnachtsmann_geschenke",
                difficulty: "hard"
              }
            ]
          }
        ]
      },

      // Lecția 20: Prietenii lui Björn
      {
        id: 20,
        title: "Prietenii lui Björn",
        subtitle: "Să ne cunoaștem prietenii",
        duration: 6,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Heute stelle ich euch meine besten Freunde vor!",
              romanian: "Astăzi vă prezint cei mai buni prieteni ai mei!",
              image: "bjorn_introducing_friends",
              audio: "L20_scene_01_introducing_friends"
            },
            {
              character: "felix",
              german: "Hallo! Ich bin Felix der Fuchs! Ich spiele gern Verstecken!",
              romanian: "Salut! Sunt Felix vulpea! Îmi place să mă joc de-a v-ați ascunselea!",
              image: "felix_fox_hiding",
              audio: "L20_scene_02_felix_introduction"
            },
            {
              character: "luna",
              german: "Ich heiße Luna und ich bin eine Eule. Ich lese sehr gern Bücher!",
              romanian: "Mă numesc Luna și sunt o bufniță. Îmi place foarte mult să citesc cărți!",
              image: "luna_owl_reading",
              audio: "L20_scene_03_luna_books"
            },
            {
              character: "tom",
              german: "Mein Name ist Tom! Ich bin ein Tiger und liebe Sport!",
              romanian: "Numele meu este Tom! Sunt un tigru și iubesc sportul!",
              image: "tom_tiger_sports",
              audio: "L20_scene_04_tom_sports"
            },
            {
              character: "björn",
              german: "Freunde sind das Beste auf der Welt! Wir helfen uns immer!",
              romanian: "Prietenii sunt cel mai frumos lucru din lume! Ne ajutăm mereu!",
              image: "friends_helping_each_other",
              audio: "L20_scene_05_friendship_best"
            }
          ]
        },

        vocabulary: [
          { german: "der Freund", romanian: "prietenul", category: "relații", audio: "vocab_der_freund" },
          { german: "vorstellen", romanian: "a prezenta", category: "socializare", audio: "vocab_vorstellen" },
          { german: "der Fuchs", romanian: "vulpea", category: "animale", audio: "vocab_der_fuchs" },
          { german: "verstecken", romanian: "a se ascunde", category: "jocuri", audio: "vocab_verstecken" },
          { german: "die Eule", romanian: "bufnița", category: "animale", audio: "vocab_die_eule" },
          { german: "der Tiger", romanian: "tigrul", category: "animale", audio: "vocab_der_tiger" },
          { german: "der Sport", romanian: "sportul", category: "activități", audio: "vocab_der_sport" },
          { german: "sich helfen", romanian: "a se ajuta", category: "comportament", audio: "vocab_sich_helfen" }
        ],

        games: [
          {
            id: "L20_drag_drop",
            type: "drag_drop",
            title: "Prietenii și hobby-urile lor",
            instructions: "Conectează fiecare prieten cu activitatea lui preferată",
            items: [
              { german: "Felix der Fuchs", romanian: "Felix vulpea", image: "felix_portrait", category: "friend", audio: "vocab_der_fuchs" },
              { german: "Luna die Eule", romanian: "Luna bufnița", image: "luna_portrait", category: "friend", audio: "vocab_die_eule" },
              { german: "Tom der Tiger", romanian: "Tom tigrul", image: "tom_portrait", category: "friend", audio: "vocab_der_tiger" },
              { german: "verstecken spielen", romanian: "de-a v-ați ascunselea", image: "hide_and_seek", category: "activity", audio: "vocab_verstecken" }
            ]
          },
          {
            id: "L20_memory",
            type: "memory",
            title: "Jocul memoriei - Prietenii",
            instructions: "Găsește perechile cu prietenii și caracteristicile lor",
            pairs: [
              { german: "der Fuchs", romanian: "vulpea", audio: "vocab_der_fuchs" },
              { german: "die Eule", romanian: "bufnița", audio: "vocab_die_eule" },
              { german: "der Tiger", romanian: "tigrul", audio: "vocab_der_tiger" },
              { german: "der Freund", romanian: "prietenul", audio: "vocab_der_freund" }
            ]
          },
          {
            id: "L20_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Prieteni",
            instructions: "Max: 'Ce știi despre prietenii lui Björn?'",
            questions: [
              {
                question: "Ce animal este Felix?",
                options: ["ein Tiger", "ein Fuchs", "eine Eule"],
                correct: 1,
                audio: "question_felix_animal"
              },
              {
                question: "Ce îi place lui Luna să facă?",
                options: ["Sport", "Verstecken", "Lesen"],
                correct: 2,
                audio: "question_luna_activity"
              },
              {
                question: "Ce înseamnă 'Freunde sind das Beste'?",
                options: ["Prietenii sunt cei mai buni", "Prietenii sunt mari", "Prietenii sunt frumoși"],
                correct: 0,
                audio: "question_freunde_beste"
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
        description: "Un urs care explorează lumea prin cumpărături, vizite și prietenii",
        personality: "aventuros, sociabil, prietenos",
        images: {
          default: "bjorn_default",
          shopping: "bjorn_excited_shopping",
          weekend: "bjorn_weekend_excitement",
          friends: "bjorn_introducing_friends"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      anna: {
        name: "Anna",
        fullName: "Anna die kleine Schwester",
        type: "bear",
        description: "Sora mică care învață despre sănătate și sărbători",
        personality: "curios despre lume, curajoasă la doctor",
        images: {
          default: "anna_default",
          candy: "anna_asking_candy",
          sick: "anna_feeling_sick",
          cookies: "anna_baking_cookies"
        },
        voice: "child_female",
        color: "#F4A460"
      },
      emma: {
        name: "Emma",
        fullName: "Emma die Ente",
        type: "duck",
        description: "O rățușcă care participă la toate activitățile familiei",
        personality: "activă, entuziastă, plină de idei",
        images: {
          default: "emma_excited",
          park: "emma_park_activities"
        },
        voice: "female_cheerful",
        color: "#FFD700"
      },
      mama_baer: {
        name: "Mama Bär",
        fullName: "Mama Bär",
        type: "bear",
        description: "Mama care organizează ieșirile familiei și se îngrijește de sănătate",
        personality: "organizată, grijulie, responsabilă",
        images: {
          default: "mama_baer_default",
          shopping_list: "mama_shopping_list",
          worried: "mama_worried_anna"
        },
        voice: "female_warm",
        color: "#D2691E"
      },
      papa_baer: {
        name: "Papa Bär",
        fullName: "Papa Bär",
        type: "bear",
        description: "Tata care propune activități distractive pentru weekend",
        personality: "distractiv, activ, iubitor de familie",
        images: {
          default: "papa_baer_default",
          park_idea: "papa_suggests_park"
        },
        voice: "male_paternal",
        color: "#8B4513"
      },
      verkäuferin: {
        name: "Verkäuferin",
        fullName: "Die freundliche Verkäuferin",
        type: "human",
        description: "Vânzătoarea prietenoasă din supermarket",
        personality: "amabilă, serviabilă, profesionistă",
        images: {
          default: "friendly_shopkeeper"
        },
        voice: "female_professional",
        color: "#20B2AA"
      },
      doktor: {
        name: "Herr Doktor",
        fullName: "Der freundliche Arzt",
        type: "human", 
        description: "Doctorul prietenos care îi ajută pe copii",
        personality: "calm, competent, înțelegător",
        images: {
          default: "kind_doctor_examining",
          advice: "doctor_giving_advice"
        },
        voice: "male_professional",
        color: "#4169E1"
      },
      weihnachtsmann: {
        name: "Weihnachtsmann",
        fullName: "Der Weihnachtsmann",
        type: "magical",
        description: "Moș Crăciun care aduce cadouri și bucurie",
        personality: "vesel, generos, magic",
        images: {
          default: "santa_with_gifts"
        },
        voice: "male_jolly",
        color: "#DC143C"
      },
      felix: {
        name: "Felix",
        fullName: "Felix der Fuchs",
        type: "fox",
        description: "Prietenul vulpe care adoră să se joace de-a v-ați ascunselea",
        personality: "viclean într-un mod prietenos, jucăuș, îndemânatic",
        images: {
          default: "felix_portrait",
          hiding: "felix_fox_hiding"
        },
        voice: "male_playful",
        color: "#FF8C00"
      },
      luna: {
        name: "Luna",
        fullName: "Luna die Eule",
        type: "owl",
        description: "Prietena bufniță care iubește cărțile și înțelepciunea",
        personality: "intelectuală, calmă, înțeleaptă",
        images: {
          default: "luna_portrait",
          reading: "luna_owl_reading"
        },
        voice: "female_wise",
        color: "#8A2BE2"
      },
      tom: {
        name: "Tom",
        fullName: "Tom der Tiger",
        type: "tiger",
        description: "Prietenul tigru care este pasionat de sport",
        personality: "energic, competitiv într-un mod prietenos, sportiv",
        images: {
          default: "tom_portrait",
          sports: "tom_tiger_sports"
        },
        voice: "male_energetic",
        color: "#FF6347"
      }
    };
  }

  generateGames() {
    return [
      {
        id: "shopping_master",
        type: "drag_drop",
        difficulty: "easy",
        category: "shopping_activities"
      },
      {
        id: "health_helper",
        type: "memory",
        difficulty: "medium",
        category: "health_medical"
      },
      {
        id: "family_fun_day",
        type: "story_sequence",
        difficulty: "medium",
        category: "family_activities"
      },
      {
        id: "christmas_magic",
        type: "drag_drop",
        difficulty: "easy",
        category: "holiday_celebrations"
      },
      {
        id: "friendship_circle",
        type: "quick_choice",
        difficulty: "easy",
        category: "social_friends"
      }
    ];
  }

  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/iesiri_activitati",
      files: {
        // Lecția 16 - Cumpărăturile cu Mama
        "L16_scene_01_going_shopping": "L16_bjorn_going_shopping.mp3",
        "L16_scene_02_shopping_list": "L16_mama_shopping_list.mp3",
        "L16_scene_03_anna_candy": "L16_anna_wants_candy.mp3",
        "L16_scene_04_shopkeeper_greeting": "L16_shopkeeper_helpful_greeting.mp3",
        "L16_scene_05_shopping_fun": "L16_bjorn_shopping_fun.mp3",
        
        // Lecția 17 - La doctor cu Anna
        "L17_scene_01_anna_sick": "L17_mama_anna_not_feeling_well.mp3",
        "L17_scene_02_anna_pain": "L17_anna_stomach_headache.mp3",
        "L17_scene_03_doctor_examination": "L17_doctor_kind_examination.mp3",
        "L17_scene_04_doctor_advice": "L17_doctor_cold_advice.mp3",
        "L17_scene_05_anna_grateful": "L17_anna_grateful_doctor.mp3",
        
        // Lecția 18 - Distracție în familie
        "L18_scene_01_weekend_fun": "L18_bjorn_weekend_excitement.mp3",
        "L18_scene_02_papa_park_idea": "L18_papa_park_suggestion.mp3",
        "L18_scene_03_emma_activities": "L18_emma_park_activities.mp3",
        "L18_scene_04_anna_ice_cream": "L18_anna_ice_cream_idea.mp3",
        "L18_scene_05_beautiful_family_day": "L18_family_beautiful_day.mp3",
        
        // Lecția 19 - Sărbătoarea de Crăciun
        "L19_scene_01_christmas_time": "L19_bjorn_christmas_lights.mp3",
        "L19_scene_02_christmas_tree": "L19_emma_christmas_tree.mp3",
        "L19_scene_03_anna_cookies": "L19_anna_baking_cookies.mp3",
        "L19_scene_04_santa_gifts": "L19_santa_ho_ho_gifts.mp3",
        "L19_scene_05_merry_christmas": "L19_family_merry_christmas.mp3",
        
        // Lecția 20 - Prietenii lui Björn
        "L20_scene_01_introducing_friends": "L20_bjorn_introducing_friends.mp3",
        "L20_scene_02_felix_introduction": "L20_felix_fox_hiding_game.mp3",
        "L20_scene_03_luna_books": "L20_luna_owl_loves_reading.mp3",
        "L20_scene_04_tom_sports": "L20_tom_tiger_loves_sports.mp3",
        "L20_scene_05_friendship_best": "L20_bjorn_friendship_helping.mp3",
        
        // Vocabular L16 - Cumpărături
        "vocab_einkaufen": "vocab_L16_einkaufen.mp3",
        "vocab_der_supermarkt": "vocab_L16_der_supermarkt.mp3",
        "vocab_brauchen": "vocab_L16_brauchen.mp3",
        "vocab_kaufen": "vocab_L16_kaufen.mp3",
        "vocab_die_bonbons": "vocab_L16_die_bonbons.mp3",
        "vocab_der_verkaeufer": "vocab_L16_der_verkaeufer.mp3",
        "vocab_das_einkaufen": "vocab_L16_das_einkaufen.mp3",
        "vocab_die_aepfel": "vocab_L16_die_aepfel.mp3",
        
        // Vocabular L17 - Sănătate
        "vocab_sich_fuehlen": "vocab_L17_sich_fuehlen.mp3",
        "vocab_der_arzt": "vocab_L17_der_arzt.mp3",
        "vocab_wehtun": "vocab_L17_wehtun.mp3",
        "vocab_der_bauch": "vocab_L17_der_bauch.mp3",
        "vocab_die_kopfschmerzen": "vocab_L17_die_kopfschmerzen.mp3",
        "vocab_untersuchen": "vocab_L17_untersuchen.mp3",
        "vocab_die_erkaeltung": "vocab_L17_die_erkaeltung.mp3",
        "vocab_gesund_werden": "vocab_L17_gesund_werden.mp3",
        "vocab_der_kopf": "vocab_L17_der_kopf.mp3",
        "vocab_bauchschmerzen": "vocab_L17_bauchschmerzen.mp3",
        
        // Vocabular L18 - Familie distracție
        "vocab_das_wochenende": "vocab_L18_das_wochenende.mp3",
        "vocab_spassig": "vocab_L18_spassig.mp3",
        "vocab_der_park": "vocab_L18_der_park.mp3",
        "vocab_fussball_spielen": "vocab_L18_fussball_spielen.mp3",
        "vocab_die_schaukel": "vocab_L18_die_schaukel.mp3",
        "vocab_das_eis": "vocab_L18_das_eis.mp3",
        "vocab_lecker": "vocab_L18_lecker.mp3",
        "vocab_der_familientag": "vocab_L18_der_familientag.mp3",
        
        // Vocabular L19 - Crăciun
        "vocab_weihnachten": "vocab_L19_weihnachten.mp3",
        "vocab_die_lichter": "vocab_L19_die_lichter.mp3",
        "vocab_der_schmuck": "vocab_L19_der_schmuck.mp3",
        "vocab_der_weihnachtsbaum": "vocab_L19_der_weihnachtsbaum.mp3",
        "vocab_schmuecken": "vocab_L19_schmuecken.mp3",
        "vocab_die_kekse": "vocab_L19_die_kekse.mp3",
        "vocab_der_weihnachtsmann": "vocab_L19_der_weihnachtsmann.mp3",
        "vocab_froehlich": "vocab_L19_froehlich.mp3",
        "vocab_der_stern": "vocab_L19_der_stern.mp3",
        "vocab_die_kugeln": "vocab_L19_die_kugeln.mp3",
        
        // Vocabular L20 - Prieteni
        "vocab_der_freund": "vocab_L20_der_freund.mp3",
        "vocab_vorstellen": "vocab_L20_vorstellen.mp3",
        "vocab_der_fuchs": "vocab_L20_der_fuchs.mp3",
        "vocab_verstecken": "vocab_L20_verstecken.mp3",
        "vocab_die_eule": "vocab_L20_die_eule.mp3",
        "vocab_der_tiger": "vocab_L20_der_tiger.mp3",
        "vocab_der_sport": "vocab_L20_der_sport.mp3",
        "vocab_sich_helfen": "vocab_L20_sich_helfen.mp3",
        
        // Speaking challenges
        "speaking_wir_gehen_einkaufen": "speaking_L16_wir_gehen_einkaufen.mp3",
        "speaking_brauche_brot_milch": "speaking_L16_brauche_brot_milch.mp3",
        "speaking_nicht_gut_fuehlen": "speaking_L17_nicht_gut_fuehlen.mp3",
        "speaking_kopf_tut_weh": "speaking_L17_kopf_tut_weh.mp3",
        "speaking_gesund_werden": "speaking_L17_gesund_werden.mp3",
        "speaking_froehliche_weihnachten": "speaking_L19_froehliche_weihnachten.mp3",
        "speaking_schmuecken_baum": "speaking_L19_schmuecken_baum.mp3",
        "speaking_weihnachtsmann_geschenke": "speaking_L19_weihnachtsmann_geschenke.mp3",
        
        // Game questions
        "question_supermarkt": "game_L16_question_supermarkt.mp3",
        "question_kaufen": "game_L16_question_kaufen.mp3",
        "question_wochenende": "game_L18_question_wochenende.mp3",
        "question_eis": "game_L18_question_eis.mp3",
        "question_felix_animal": "game_L20_question_felix_animal.mp3",
        "question_luna_activity": "game_L20_question_luna_activity.mp3",
        "question_freunde_beste": "game_L20_question_freunde_beste.mp3",
        
        // Story sequences L18
        "sequence_01_deciding": "sequence_L18_01_family_deciding.mp3",
        "sequence_02_football": "sequence_L18_02_playing_football.mp3",
        "sequence_03_swing": "sequence_L18_03_anna_swing.mp3",
        "sequence_04_ice_cream": "sequence_L18_04_eating_ice_cream.mp3",
        "sequence_05_returning_happy": "sequence_L18_05_returning_home.mp3"
      }
    };
  }
}