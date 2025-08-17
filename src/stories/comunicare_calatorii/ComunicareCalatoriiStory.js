import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Comunicare și Călătorii Story - Lecțiile 21-25
 * Învățarea despre telefon, călătorii, picnic, școală și sărbătoarea finală
 */
export class ComunicareCalatoriiStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'comunicare_calatorii',
        name: 'Comunicare și Călătorii',
        description: 'Aventuri finale: învață să comunici și să explorezi lumea',
        order: 6,
        difficulty: 'intermediate',
        estimatedDuration: 20, // minutes per lesson
        color: '#AB47BC', // Purple
        icon: '✈️',
        lessonsRange: '21-25',
        totalLessons: 5
      },

      lessons: this.createLessons(),
      characters: this.generateCharacters(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {
        prerequisiteStories: ['iesiri_activitati'],
        minimumProgress: {
          'iesiri_activitati': 80
        }
      }
    };

    await this.initializeWithData(storyData);
  }

  createLessons() {
    return [
      // Lecția 21: Vorbim la telefon
      {
        id: 21,
        title: "Vorbim la telefon",
        subtitle: "Comunicarea la distanță",
        duration: 7,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Ring, ring! Das Telefon klingelt! Wer ruft uns an?",
              romanian: "Ring, ring! Sună telefonul! Cine ne sună?",
              image: "bjorn_phone_ringing",
              audio: "L21_scene_01_phone_ringing"
            },
            {
              character: "oma_baer",
              german: "Hallo, mein lieber Björn! Ich bin es, deine Oma!",
              romanian: "Salut, dragul meu Björn! Sunt eu, bunica ta!",
              image: "oma_calling_phone",
              audio: "L21_scene_02_oma_calling"
            },
            {
              character: "björn",
              german: "Hallo, Oma! Wie geht es dir? Ich freue mich, deine Stimme zu hören!",
              romanian: "Salut, bunico! Ce mai faci? Mă bucur să-ți aud vocea!",
              image: "bjorn_happy_phone_talk",
              audio: "L21_scene_03_bjorn_happy_hear"
            },
            {
              character: "anna",
              german: "Kann ich auch mit Oma sprechen? Ich vermisse sie!",
              romanian: "Pot să vorbesc și eu cu bunica? Mi-e dor de ea!",
              image: "anna_wants_phone",
              audio: "L21_scene_04_anna_wants_talk"
            },
            {
              character: "emma",
              german: "Telefonate verbinden uns mit Menschen, die weit weg sind!",
              romanian: "Convorbirile telefonice ne conectează cu oamenii care sunt departe!",
              image: "emma_explaining_phone",
              audio: "L21_scene_05_emma_phone_connection"
            }
          ]
        },

        vocabulary: [
          { german: "das Telefon", romanian: "telefonul", category: "comunicare", audio: "vocab_das_telefon" },
          { german: "klingeln", romanian: "a suna", category: "sunete", audio: "vocab_klingeln" },
          { german: "anrufen", romanian: "a suna pe cineva", category: "comunicare", audio: "vocab_anrufen" },
          { german: "sprechen", romanian: "a vorbi", category: "comunicare", audio: "vocab_sprechen" },
          { german: "die Stimme", romanian: "vocea", category: "comunicare", audio: "vocab_die_stimme" },
          { german: "vermissen", romanian: "a-i fi dor", category: "sentimente", audio: "vocab_vermissen" },
          { german: "das Telefonat", romanian: "convorbirea", category: "comunicare", audio: "vocab_das_telefonat" },
          { german: "verbinden", romanian: "a conecta", category: "tehnologie", audio: "vocab_verbinden" }
        ],

        games: [
          {
            id: "L21_drag_drop",
            type: "drag_drop",
            title: "Conversația telefonică",
            instructions: "Aranjează partea conversației în ordinea corectă",
            items: [
              { german: "Hallo", romanian: "Salut", image: "phone_greeting", category: "greeting", audio: "vocab_hallo" },
              { german: "Wie geht es dir?", romanian: "Ce mai faci?", image: "phone_question", category: "question", audio: "vocab_wie_geht_es" },
              { german: "Ich vermisse dich", romanian: "Mi-e dor de tine", image: "phone_missing", category: "emotion", audio: "vocab_vermissen" },
              { german: "Auf Wiederhören", romanian: "Pe curând", image: "phone_goodbye", category: "goodbye", audio: "vocab_auf_wiederhoeren" }
            ]
          },
          {
            id: "L21_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să vorbim la telefon!",
            instructions: "Emma: 'Răspunde la telefon ca un adevărat german!'",
            challenges: [
              {
                phrase: "Hallo, hier ist Björn",
                romanian: "Salut, aici este Björn",
                audio: "speaking_hallo_hier_ist",
                difficulty: "easy"
              },
              {
                phrase: "Wie geht es dir?",
                romanian: "Ce mai faci?",
                audio: "speaking_wie_geht_es_dir",
                difficulty: "easy"
              },
              {
                phrase: "Ich freue mich, deine Stimme zu hören",
                romanian: "Mă bucur să-ți aud vocea",
                audio: "speaking_freue_stimme_hoeren",
                difficulty: "hard"
              }
            ]
          },
          {
            id: "L21_memory",
            type: "memory",
            title: "Jocul memoriei - Telefon",
            instructions: "Găsește perechile cu expresiile telefonice",
            pairs: [
              { german: "das Telefon", romanian: "telefonul", audio: "vocab_das_telefon" },
              { german: "anrufen", romanian: "a suna pe cineva", audio: "vocab_anrufen" },
              { german: "sprechen", romanian: "a vorbi", audio: "vocab_sprechen" },
              { german: "die Stimme", romanian: "vocea", audio: "vocab_die_stimme" }
            ]
          }
        ]
      },

      // Lecția 22: Călătoria cu trenul
      {
        id: 22,
        title: "Călătoria cu trenul",
        subtitle: "Aventura pe șine",
        duration: 7,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Heute fahren wir mit dem Zug zu Tante Lisa!",
              romanian: "Astăzi călătorim cu trenul la mătușa Lisa!",
              image: "bjorn_train_station",
              audio: "L22_scene_01_train_journey"
            },
            {
              character: "papa_baer",
              german: "Hier sind unsere Fahrkarten. Der Zug kommt um 10 Uhr.",
              romanian: "Iată biletele noastre. Trenul vine la ora 10.",
              image: "papa_train_tickets",
              audio: "L22_scene_02_papa_tickets"
            },
            {
              character: "anna",
              german: "Schau! Der Zug ist so lang und schnell!",
              romanian: "Uită-te! Trenul este atât de lung și rapid!",
              image: "anna_amazed_train",
              audio: "L22_scene_03_anna_amazed_train"
            },
            {
              character: "schaffner",
              german: "Fahrkarten bitte! Habt eine schöne Reise!",
              romanian: "Biletele, vă rog! Să aveți o călătorie frumoasă!",
              image: "train_conductor_tickets",
              audio: "L22_scene_04_conductor_tickets"
            },
            {
              character: "björn",
              german: "Aus dem Fenster sehen wir Felder, Häuser und Berge! Reisen ist wunderbar!",
              romanian: "Pe fereastră vedem câmpuri, case și munți! Călătoria e minunată!",
              image: "train_window_view",
              audio: "L22_scene_05_beautiful_journey"
            }
          ]
        },

        vocabulary: [
          { german: "der Zug", romanian: "trenul", category: "transport", audio: "vocab_der_zug" },
          { german: "fahren", romanian: "a călători", category: "transport", audio: "vocab_fahren" },
          { german: "die Fahrkarte", romanian: "biletul", category: "transport", audio: "vocab_die_fahrkarte" },
          { german: "der Bahnhof", romanian: "gara", category: "locuri", audio: "vocab_der_bahnhof" },
          { german: "schnell", romanian: "rapid", category: "viteză", audio: "vocab_schnell" },
          { german: "der Schaffner", romanian: "conductorul", category: "meserii", audio: "vocab_der_schaffner" },
          { german: "die Reise", romanian: "călătoria", category: "transport", audio: "vocab_die_reise" },
          { german: "die Berge", romanian: "munții", category: "natură", audio: "vocab_die_berge" }
        ],

        games: [
          {
            id: "L22_story_sequence",
            type: "story_sequence",
            title: "Călătoria cu trenul pas cu pas",
            instructions: "Aranjează momentele călătoriei în ordine",
            sequence: [
              {
                step: 1,
                german: "Familia ajunge la gară",
                romanian: "Familie kommt zum Bahnhof",
                image: "family_arriving_station",
                audio: "sequence_01_arriving_station"
              },
              {
                step: 2,
                german: "Papa cumpără biletele",
                romanian: "Papa kauft Fahrkarten",
                image: "papa_buying_tickets",
                audio: "sequence_02_buying_tickets"
              },
              {
                step: 3,
                german: "Trenul sosește în gară",
                romanian: "Der Zug kommt im Bahnhof an",
                image: "train_arriving",
                audio: "sequence_03_train_arriving"
              },
              {
                step: 4,
                german: "Familia urcă în tren",
                romanian: "Familie steigt in den Zug ein",
                image: "family_boarding_train",
                audio: "sequence_04_boarding"
              },
              {
                step: 5,
                german: "Se bucură de peisaj pe fereastră",
                romanian: "Sie genießen die Aussicht",
                image: "enjoying_train_view",
                audio: "sequence_05_enjoying_view"
              }
            ]
          },
          {
            id: "L22_drag_drop",
            type: "drag_drop",
            title: "Elementele călătoriei",
            instructions: "Asociază elementele călătoriei cu locurile lor",
            items: [
              { german: "die Fahrkarte", romanian: "biletul", image: "train_ticket", category: "document", audio: "vocab_die_fahrkarte" },
              { german: "der Bahnhof", romanian: "gara", image: "train_station", category: "location", audio: "vocab_der_bahnhof" },
              { german: "der Schaffner", romanian: "conductorul", image: "train_conductor", category: "person", audio: "vocab_der_schaffner" },
              { german: "die Berge", romanian: "munții", image: "mountain_view", category: "landscape", audio: "vocab_die_berge" }
            ]
          },
          {
            id: "L22_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Călătorie",
            instructions: "Max: 'Ce știi despre călătoria cu trenul?'",
            questions: [
              {
                question: "Ce îți trebuie pentru a călători cu trenul?",
                options: ["ein Auto", "eine Fahrkarte", "ein Fahrrad"],
                correct: 1,
                audio: "question_fahrkarte_needed"
              },
              {
                question: "Cine verifică biletele în tren?",
                options: ["der Schaffner", "der Arzt", "der Verkäufer"],
                correct: 0,
                audio: "question_who_checks_tickets"
              }
            ]
          }
        ]
      },

      // Lecția 23: Picnicul în natură
      {
        id: 23,
        title: "Picnicul în natură",
        subtitle: "Mâncăm în aer liber",
        duration: 7,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Was für ein schöner Tag für ein Picknick! Die Sonne scheint!",
              romanian: "Ce zi frumoasă pentru un picnic! Soarele strălucește!",
              image: "bjorn_sunny_picnic_day",
              audio: "L23_scene_01_beautiful_picnic_day"
            },
            {
              character: "mama_baer",
              german: "Ich habe Sandwiches, Obst und Limonade eingepackt!",
              romanian: "Am împachetat sandvișuri, fructe și limonadă!",
              image: "mama_picnic_basket",
              audio: "L23_scene_02_mama_packed_food"
            },
            {
              character: "emma",
              german: "Lasst uns eine schöne Wiese mit Blumen finden!",
              romanian: "Hai să găsim o pajiște frumoasă cu flori!",
              image: "emma_looking_meadow",
              audio: "L23_scene_03_emma_meadow"
            },
            {
              character: "anna",
              german: "Hier ist perfekt! Wir können die Vögel singen hören!",
              romanian: "Aici e perfect! Putem auzi păsările cântând!",
              image: "anna_perfect_spot",
              audio: "L23_scene_04_anna_perfect_spot"
            },
            {
              character: "familie",
              german: "Picknicken in der Natur ist so entspannend! Wir lieben die frische Luft!",
              romanian: "Picnicul în natură e atât de relaxant! Iubim aerul curat!",
              image: "family_enjoying_nature_picnic",
              audio: "L23_scene_05_relaxing_nature"
            }
          ]
        },

        vocabulary: [
          { german: "das Picknick", romanian: "picnicul", category: "activități", audio: "vocab_das_picknick" },
          { german: "scheinen", romanian: "a străluci", category: "vreme", audio: "vocab_scheinen" },
          { german: "einpacken", romanian: "a împacheta", category: "pregătire", audio: "vocab_einpacken" },
          { german: "das Sandwich", romanian: "sandvișul", category: "mâncare", audio: "vocab_das_sandwich" },
          { german: "das Obst", romanian: "fructele", category: "mâncare", audio: "vocab_das_obst" },
          { german: "die Limonade", romanian: "limonada", category: "băuturi", audio: "vocab_die_limonade" },
          { german: "die Wiese", romanian: "pajistea", category: "natură", audio: "vocab_die_wiese" },
          { german: "entspannend", romanian: "relaxant", category: "sentimente", audio: "vocab_entspannend" }
        ],

        games: [
          {
            id: "L23_drag_drop",
            type: "drag_drop",
            title: "Pregătirea picnicului",
            instructions: "Pune alimentele în coșul de picnic",
            items: [
              { german: "das Sandwich", romanian: "sandvișul", image: "sandwich_picnic", category: "food", audio: "vocab_das_sandwich" },
              { german: "das Obst", romanian: "fructele", image: "fresh_fruits", category: "food", audio: "vocab_das_obst" },
              { german: "die Limonade", romanian: "limonada", image: "lemonade_bottle", category: "drink", audio: "vocab_die_limonade" },
              { german: "die Decke", romanian: "plapuma", image: "picnic_blanket", category: "equipment", audio: "vocab_die_decke" }
            ]
          },
          {
            id: "L23_memory",
            type: "memory",
            title: "Jocul memoriei - Picnic",
            instructions: "Găsește perechile cu elementele picnicului",
            pairs: [
              { german: "das Picknick", romanian: "picnicul", audio: "vocab_das_picknick" },
              { german: "die Wiese", romanian: "pajistea", audio: "vocab_die_wiese" },
              { german: "einpacken", romanian: "a împacheta", audio: "vocab_einpacken" },
              { german: "entspannend", romanian: "relaxant", audio: "vocab_entspannend" }
            ]
          },
          {
            id: "L23_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm despre picnic!",
            instructions: "Emma: 'Vorbește despre picnicul în natură!'",
            challenges: [
              {
                phrase: "Die Sonne scheint",
                romanian: "Soarele strălucește",
                audio: "speaking_sonne_scheint",
                difficulty: "easy"
              },
              {
                phrase: "Wir machen ein Picknick",
                romanian: "Facem un picnic",
                audio: "speaking_machen_picknick",
                difficulty: "easy"
              },
              {
                phrase: "Die Natur ist entspannend",
                romanian: "Natura este relaxantă",
                audio: "speaking_natur_entspannend",
                difficulty: "medium"
              }
            ]
          }
        ]
      },

      // Lecția 24: Primul zi de școală
      {
        id: 24,
        title: "Prima zi de școală",
        subtitle: "Björn începe școala",
        duration: 7,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Heute ist mein erster Schultag! Ich bin aufgeregt und ein bisschen nervös!",
              romanian: "Astăzi e prima mea zi de școală! Sunt entuziasmat și puțin nervos!",
              image: "bjorn_first_school_day",
              audio: "L24_scene_01_first_school_day"
            },
            {
              character: "mama_baer",
              german: "Du hast deinen Schulranzen, deine Bücher und deine Stifte. Du bist bereit!",
              romanian: "Ai ghiozdanul, cărțile și creioanele. Ești pregătit!",
              image: "mama_school_supplies",
              audio: "L24_scene_02_mama_school_ready"
            },
            {
              character: "lehrerin",
              german: "Guten Morgen, Kinder! Willkommen in der Schule! Ich bin eure Lehrerin!",
              romanian: "Bună dimineața, copii! Bun veniți la școală! Sunt învățătoarea voastră!",
              image: "teacher_welcoming_students",
              audio: "L24_scene_03_teacher_welcome"
            },
            {
              character: "björn",
              german: "Wir lernen lesen, schreiben und rechnen! Das macht Spaß!",
              romanian: "Învățăm să citim, să scriem și să calculăm! E distractiv!",
              image: "bjorn_learning_activities",
              audio: "L24_scene_04_bjorn_learning_fun"
            },
            {
              character: "emma",
              german: "Bildung ist wichtig! In der Schule lernst du viele neue Dinge!",
              romanian: "Educația e importantă! La școală înveți multe lucruri noi!",
              image: "emma_education_important",
              audio: "L24_scene_05_education_important"
            }
          ]
        },

        vocabulary: [
          { german: "die Schule", romanian: "școala", category: "educație", audio: "vocab_die_schule" },
          { german: "der Schultag", romanian: "ziua de școală", category: "educație", audio: "vocab_der_schultag" },
          { german: "aufgeregt", romanian: "entuziasmat", category: "sentimente", audio: "vocab_aufgeregt" },
          { german: "nervös", romanian: "nervos", category: "sentimente", audio: "vocab_nervoes" },
          { german: "der Schulranzen", romanian: "ghiozdanul", category: "școală", audio: "vocab_der_schulranzen" },
          { german: "die Lehrerin", romanian: "învățătoarea", category: "meserii", audio: "vocab_die_lehrerin" },
          { german: "lernen", romanian: "a învăța", category: "educație", audio: "vocab_lernen" },
          { german: "die Bildung", romanian: "educația", category: "educație", audio: "vocab_die_bildung" }
        ],

        games: [
          {
            id: "L24_drag_drop",
            type: "drag_drop",
            title: "Rechizitele școlare",
            instructions: "Pune rechizitele în ghiozdan pentru primul zi",
            items: [
              { german: "das Buch", romanian: "cartea", image: "school_book", category: "supplies", audio: "vocab_das_buch" },
              { german: "der Stift", romanian: "stiloul", image: "pen_pencil", category: "supplies", audio: "vocab_der_stift" },
              { german: "das Heft", romanian: "caietul", image: "school_notebook", category: "supplies", audio: "vocab_das_heft" },
              { german: "der Radiergummi", romanian: "guma", image: "eraser", category: "supplies", audio: "vocab_der_radiergummi" }
            ]
          },
          {
            id: "L24_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Școala",
            instructions: "Max: 'Ce știi despre școală?'",
            questions: [
              {
                question: "Unde păstrezi cărțile și creioanele?",
                options: ["im Schulranzen", "im Auto", "im Bett"],
                correct: 0,
                audio: "question_schulranzen"
              },
              {
                question: "Cine predă la școală?",
                options: ["der Arzt", "die Lehrerin", "der Schaffner"],
                correct: 1,
                audio: "question_lehrerin"
              },
              {
                question: "Ce facem la școală?",
                options: ["schlafen", "lernen", "kochen"],
                correct: 1,
                audio: "question_what_at_school"
              }
            ]
          },
          {
            id: "L24_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm despre școală!",
            instructions: "Emma: 'Vorbește despre prima zi de școală!'",
            challenges: [
              {
                phrase: "Ich gehe zur Schule",
                romanian: "Merg la școală",
                audio: "speaking_gehe_zur_schule",
                difficulty: "easy"
              },
              {
                phrase: "Ich bin aufgeregt",
                romanian: "Sunt entuziasmat",
                audio: "speaking_bin_aufgeregt",
                difficulty: "easy"
              },
              {
                phrase: "Lernen macht Spaß",
                romanian: "Învățatul e distractiv",
                audio: "speaking_lernen_macht_spass",
                difficulty: "medium"
              }
            ]
          }
        ]
      },

      // Lecția 25: Marea sărbătoare finală
      {
        id: 25,
        title: "Marea sărbătoare finală",
        subtitle: "Festivitatea de absolvire",
        duration: 8,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Heute feiern wir! Wir haben alle 25 Lektionen gelernt!",
              romanian: "Astăzi sărbătorim! Am învățat toate cele 25 de lecții!",
              image: "bjorn_celebration_25_lessons",
              audio: "L25_scene_01_celebrating_25_lessons"
            },
            {
              character: "emma",
              german: "Du kannst jetzt so viele deutsche Wörter! Du bist ein echter Sprachschüler!",
              romanian: "Acum știi atât de multe cuvinte germane! Ești un adevărat elev de limbă!",
              image: "emma_proud_language_student",
              audio: "L25_scene_02_emma_proud_student"
            },
            {
              character: "alle_charaktere",
              german: "Herzlichen Glückwunsch! Du hast Deutsch mit uns gelernt!",
              romanian: "Felicitări! Ai învățat germana cu noi!",
              image: "all_characters_congratulating",
              audio: "L25_scene_03_all_congratulating"
            },
            {
              character: "björn",
              german: "Wir sind stolz auf dich! Du kannst schon sprechen, verstehen und lesen!",
              romanian: "Suntem mândri de tine! Deja poți vorbi, înțelege și citi!",
              image: "bjorn_proud_achievements",
              audio: "L25_scene_04_proud_achievements"
            },
            {
              character: "alle_charaktere",
              german: "Auf Wiedersehen und viel Erfolg beim weiteren Deutschlernen!",
              romanian: "La revedere și mult succes în continuare la învățatul limbii germane!",
              image: "final_farewell_success",
              audio: "L25_scene_05_farewell_success"
            }
          ]
        },

        vocabulary: [
          { german: "feiern", romanian: "a sărbători", category: "sărbători", audio: "vocab_feiern" },
          { german: "die Lektion", romanian: "lecția", category: "educație", audio: "vocab_die_lektion" },
          { german: "der Sprachschüler", romanian: "elevul de limbă", category: "educație", audio: "vocab_der_sprachschueler" },
          { german: "stolz", romanian: "mândru", category: "sentimente", audio: "vocab_stolz" },
          { german: "verstehen", romanian: "a înțelege", category: "comunicare", audio: "vocab_verstehen" },
          { german: "der Erfolg", romanian: "succesul", category: "realizări", audio: "vocab_der_erfolg" },
          { german: "weiterlernen", romanian: "a continua să înveți", category: "educație", audio: "vocab_weiterlernen" },
          { german: "Auf Wiedersehen", romanian: "La revedere", category: "salutări", audio: "vocab_auf_wiedersehen" }
        ],

        games: [
          {
            id: "L25_story_sequence",
            type: "story_sequence",
            title: "Călătoria de învățare completă",
            instructions: "Reamintește-ți călătoria ta de învățare",
            sequence: [
              {
                step: 1,
                german: "Björn te-a întâmpinat în castel",
                romanian: "Björn begrüßte dich im Schloss",
                image: "bjorn_castle_welcome",
                audio: "sequence_01_castle_welcome"
              },
              {
                step: 2,
                german: "Ai învățat despre familie și casă",
                romanian: "Du lerntest über Familie und Haus",
                image: "learning_family_house",
                audio: "sequence_02_family_house"
              },
              {
                step: 3,
                german: "Ai descoperit jocuri și culori",
                romanian: "Du entdecktest Spiele und Farben",
                image: "discovering_games_colors",
                audio: "sequence_03_games_colors"
              },
              {
                step: 4,
                german: "Ai explorat lumea din afara casei",
                romanian: "Du erforschtest die Welt draußen",
                image: "exploring_outside_world",
                audio: "sequence_04_outside_world"
              },
              {
                step: 5,
                german: "Acum ești un adevărat vorbitor de germană!",
                romanian: "Jetzt bist du ein echter Deutschsprecher!",
                image: "proud_german_speaker",
                audio: "sequence_05_german_speaker"
              }
            ]
          },
          {
            id: "L25_memory",
            type: "memory",
            title: "Marele joc final de memorie",
            instructions: "Găsește perechile cu toate personajele tale preferate",
            pairs: [
              { german: "Björn der Bär", romanian: "Björn ursul", audio: "vocab_bjorn_baer" },
              { german: "Emma die Ente", romanian: "Emma rățușca", audio: "vocab_emma_ente" },
              { german: "Anna die Schwester", romanian: "Anna sora", audio: "vocab_anna_schwester" },
              { german: "Max der Hase", romanian: "Max iepurașul", audio: "vocab_max_hase" },
              { german: "die deutsche Sprache", romanian: "limba germană", audio: "vocab_deutsche_sprache" },
              { german: "der Erfolg", romanian: "succesul", audio: "vocab_der_erfolg" }
            ]
          },
          {
            id: "L25_speaking_challenge",
            type: "speaking_challenge",
            title: "Marea provocare finală de vorbire!",
            instructions: "Toți prietenii: 'Arată-ne cât de bine vorbești germana!'",
            challenges: [
              {
                phrase: "Ich habe Deutsch gelernt",
                romanian: "Am învățat germana",
                audio: "speaking_deutsch_gelernt",
                difficulty: "easy"
              },
              {
                phrase: "Ich kann sprechen und verstehen",
                romanian: "Pot vorbi și înțelege",
                audio: "speaking_sprechen_verstehen",
                difficulty: "medium"
              },
              {
                phrase: "Vielen Dank für alles, meine Freunde!",
                romanian: "Mulțumesc pentru totul, prietenii mei!",
                audio: "speaking_vielen_dank_freunde",
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
        description: "Ursul principal care te-a ghidat prin toată călătoria de învățare",
        personality: "mândru de progresul tău, înțelept mentor, prieten adevărat",
        images: {
          default: "bjorn_default",
          phone: "bjorn_phone_ringing",
          train: "bjorn_train_station",
          picnic: "bjorn_sunny_picnic_day",
          school: "bjorn_first_school_day",
          celebration: "bjorn_celebration_25_lessons"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      emma: {
        name: "Emma",
        fullName: "Emma die Ente",
        type: "duck",
        description: "Rățușca înțeleaptă care a explicat multe concepte importante",
        personality: "intelectuală, mândră mentoare, prietenoasă înțeleaptă",
        images: {
          default: "emma_excited",
          phone: "emma_explaining_phone",
          meadow: "emma_looking_meadow",
          education: "emma_education_important",
          proud: "emma_proud_language_student"
        },
        voice: "female_cheerful",
        color: "#FFD700"
      },
      anna: {
        name: "Anna",
        fullName: "Anna die kleine Schwester",
        type: "bear",
        description: "Sora mică care a crescut alături de tine în această călătorie",
        personality: "crescută, mai încrezătoare, fericită pentru progres",
        images: {
          default: "anna_default",
          phone: "anna_wants_phone",
          train: "anna_amazed_train",
          picnic: "anna_perfect_spot"
        },
        voice: "child_female",
        color: "#F4A460"
      },
      mama_baer: {
        name: "Mama Bär",
        fullName: "Mama Bär",
        type: "bear",
        description: "Mama care a organizat toate aventurile și te-a sprijinit",
        personality: "mândră ca o mamă, organizată, caldă",
        images: {
          default: "mama_baer_default",
          picnic: "mama_picnic_basket",
          school: "mama_school_supplies"
        },
        voice: "female_warm",
        color: "#D2691E"
      },
      papa_baer: {
        name: "Papa Bär",
        fullName: "Papa Bär",
        type: "bear",
        description: "Tata care a organizat călătoriile și aventurile",
        personality: "organizat, călător experimentat, înțelegător",
        images: {
          default: "papa_baer_default",
          tickets: "papa_train_tickets"
        },
        voice: "male_paternal",
        color: "#8B4513"
      },
      oma_baer: {
        name: "Oma Bär",
        fullName: "Oma Bär",
        type: "bear",
        description: "Bunica care a menținut legătura prin telefon",
        personality: "afectuoasă la distanță, conectată prin tehnologie",
        images: {
          default: "oma_baer_portrait",
          calling: "oma_calling_phone"
        },
        voice: "female_elderly",
        color: "#DDA0DD"
      },
      schaffner: {
        name: "Herr Schaffner",
        fullName: "Der freundliche Schaffner",
        type: "human",
        description: "Conductorul prietenos de tren care a făcut călătoria plăcută",
        personality: "profesionist, prietenos, util",
        images: {
          default: "train_conductor_tickets"
        },
        voice: "male_professional",
        color: "#2E8B57"
      },
      lehrerin: {
        name: "Frau Lehrerin",
        fullName: "Die freundliche Lehrerin",
        type: "human",
        description: "Învățătoarea care a marcat începutul educației formale",
        personality: "educată, prietenoasă, încurajatoare",
        images: {
          default: "teacher_welcoming_students"
        },
        voice: "female_teacher",
        color: "#4682B4"
      },
      alle_charaktere: {
        name: "Alle Freunde",
        fullName: "Alle deine deutschen Freunde",
        type: "group",
        description: "Toți prietenii tăi care te-au acompaniat în această călătorie",
        personality: "colectiv mândru, recunoscători, prietenoși pentru totdeauna",
        images: {
          default: "all_characters_congratulating",
          farewell: "final_farewell_success"
        },
        voice: "group_celebration",
        color: "#FFD700"
      }
    };
  }

  generateGames() {
    return [
      {
        id: "phone_communication",
        type: "speaking_challenge",
        difficulty: "intermediate",
        category: "communication_skills"
      },
      {
        id: "travel_adventure",
        type: "story_sequence",
        difficulty: "intermediate",
        category: "travel_transport"
      },
      {
        id: "nature_picnic",
        type: "drag_drop",
        difficulty: "easy",
        category: "outdoor_activities"
      },
      {
        id: "school_beginning",
        type: "quick_choice",
        difficulty: "intermediate",
        category: "education_learning"
      },
      {
        id: "final_celebration",
        type: "memory",
        difficulty: "advanced",
        category: "achievement_celebration"
      }
    ];
  }

  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/comunicare_calatorii",
      files: {
        // Lecția 21 - Vorbim la telefon
        "L21_scene_01_phone_ringing": "L21_bjorn_phone_ringing.mp3",
        "L21_scene_02_oma_calling": "L21_oma_calling_bjorn.mp3",
        "L21_scene_03_bjorn_happy_hear": "L21_bjorn_happy_hear_voice.mp3",
        "L21_scene_04_anna_wants_talk": "L21_anna_wants_talk_oma.mp3",
        "L21_scene_05_emma_phone_connection": "L21_emma_phone_connects_people.mp3",
        
        // Lecția 22 - Călătoria cu trenul
        "L22_scene_01_train_journey": "L22_bjorn_train_journey_tante.mp3",
        "L22_scene_02_papa_tickets": "L22_papa_train_tickets_10am.mp3",
        "L22_scene_03_anna_amazed_train": "L22_anna_amazed_fast_train.mp3",
        "L22_scene_04_conductor_tickets": "L22_conductor_nice_journey.mp3",
        "L22_scene_05_beautiful_journey": "L22_bjorn_beautiful_journey_view.mp3",
        
        // Lecția 23 - Picnicul în natură
        "L23_scene_01_beautiful_picnic_day": "L23_bjorn_beautiful_picnic_sunshine.mp3",
        "L23_scene_02_mama_packed_food": "L23_mama_packed_sandwiches_fruit.mp3",
        "L23_scene_03_emma_meadow": "L23_emma_find_beautiful_meadow.mp3",
        "L23_scene_04_anna_perfect_spot": "L23_anna_perfect_spot_birds.mp3",
        "L23_scene_05_relaxing_nature": "L23_family_relaxing_fresh_air.mp3",
        
        // Lecția 24 - Prima zi de școală
        "L24_scene_01_first_school_day": "L24_bjorn_first_school_excited_nervous.mp3",
        "L24_scene_02_mama_school_ready": "L24_mama_school_supplies_ready.mp3",
        "L24_scene_03_teacher_welcome": "L24_teacher_welcome_children.mp3",
        "L24_scene_04_bjorn_learning_fun": "L24_bjorn_learning_read_write_fun.mp3",
        "L24_scene_05_education_important": "L24_emma_education_important_new_things.mp3",
        
        // Lecția 25 - Marea sărbătoare finală
        "L25_scene_01_celebrating_25_lessons": "L25_bjorn_celebrating_25_lessons_learned.mp3",
        "L25_scene_02_emma_proud_student": "L25_emma_proud_language_student.mp3",
        "L25_scene_03_all_congratulating": "L25_all_characters_congratulations_deutsch.mp3",
        "L25_scene_04_proud_achievements": "L25_bjorn_proud_speak_understand_read.mp3",
        "L25_scene_05_farewell_success": "L25_all_farewell_success_german_learning.mp3",
        
        // Vocabular L21 - Telefon
        "vocab_das_telefon": "vocab_L21_das_telefon.mp3",
        "vocab_klingeln": "vocab_L21_klingeln.mp3",
        "vocab_anrufen": "vocab_L21_anrufen.mp3",
        "vocab_sprechen": "vocab_L21_sprechen.mp3",
        "vocab_die_stimme": "vocab_L21_die_stimme.mp3",
        "vocab_vermissen": "vocab_L21_vermissen.mp3",
        "vocab_das_telefonat": "vocab_L21_das_telefonat.mp3",
        "vocab_verbinden": "vocab_L21_verbinden.mp3",
        "vocab_hallo": "vocab_L21_hallo.mp3",
        "vocab_wie_geht_es": "vocab_L21_wie_geht_es.mp3",
        "vocab_auf_wiederhoeren": "vocab_L21_auf_wiederhoeren.mp3",
        
        // Vocabular L22 - Călătorie
        "vocab_der_zug": "vocab_L22_der_zug.mp3",
        "vocab_fahren": "vocab_L22_fahren.mp3",
        "vocab_die_fahrkarte": "vocab_L22_die_fahrkarte.mp3",
        "vocab_der_bahnhof": "vocab_L22_der_bahnhof.mp3",
        "vocab_schnell": "vocab_L22_schnell.mp3",
        "vocab_der_schaffner": "vocab_L22_der_schaffner.mp3",
        "vocab_die_reise": "vocab_L22_die_reise.mp3",
        "vocab_die_berge": "vocab_L22_die_berge.mp3",
        
        // Vocabular L23 - Picnic
        "vocab_das_picknick": "vocab_L23_das_picknick.mp3",
        "vocab_scheinen": "vocab_L23_scheinen.mp3",
        "vocab_einpacken": "vocab_L23_einpacken.mp3",
        "vocab_das_sandwich": "vocab_L23_das_sandwich.mp3",
        "vocab_das_obst": "vocab_L23_das_obst.mp3",
        "vocab_die_limonade": "vocab_L23_die_limonade.mp3",
        "vocab_die_wiese": "vocab_L23_die_wiese.mp3",
        "vocab_entspannend": "vocab_L23_entspannend.mp3",
        "vocab_die_decke": "vocab_L23_die_decke.mp3",
        
        // Vocabular L24 - Școală
        "vocab_die_schule": "vocab_L24_die_schule.mp3",
        "vocab_der_schultag": "vocab_L24_der_schultag.mp3",
        "vocab_aufgeregt": "vocab_L24_aufgeregt.mp3",
        "vocab_nervoes": "vocab_L24_nervoes.mp3",
        "vocab_der_schulranzen": "vocab_L24_der_schulranzen.mp3",
        "vocab_die_lehrerin": "vocab_L24_die_lehrerin.mp3",
        "vocab_lernen": "vocab_L24_lernen.mp3",
        "vocab_die_bildung": "vocab_L24_die_bildung.mp3",
        "vocab_der_stift": "vocab_L24_der_stift.mp3",
        "vocab_das_heft": "vocab_L24_das_heft.mp3",
        "vocab_der_radiergummi": "vocab_L24_der_radiergummi.mp3",
        
        // Vocabular L25 - Finala
        "vocab_feiern": "vocab_L25_feiern.mp3",
        "vocab_die_lektion": "vocab_L25_die_lektion.mp3",
        "vocab_der_sprachschueler": "vocab_L25_der_sprachschueler.mp3",
        "vocab_stolz": "vocab_L25_stolz.mp3",
        "vocab_verstehen": "vocab_L25_verstehen.mp3",
        "vocab_der_erfolg": "vocab_L25_der_erfolg.mp3",
        "vocab_weiterlernen": "vocab_L25_weiterlernen.mp3",
        "vocab_auf_wiedersehen": "vocab_L25_auf_wiedersehen.mp3",
        "vocab_bjorn_baer": "vocab_L25_bjorn_baer.mp3",
        "vocab_emma_ente": "vocab_L25_emma_ente.mp3",
        "vocab_anna_schwester": "vocab_L25_anna_schwester.mp3",
        "vocab_max_hase": "vocab_L25_max_hase.mp3",
        "vocab_deutsche_sprache": "vocab_L25_deutsche_sprache.mp3",
        
        // Speaking challenges
        "speaking_hallo_hier_ist": "speaking_L21_hallo_hier_ist_bjorn.mp3",
        "speaking_wie_geht_es_dir": "speaking_L21_wie_geht_es_dir.mp3",
        "speaking_freue_stimme_hoeren": "speaking_L21_freue_stimme_hoeren.mp3",
        "speaking_sonne_scheint": "speaking_L23_sonne_scheint.mp3",
        "speaking_machen_picknick": "speaking_L23_machen_picknick.mp3",
        "speaking_natur_entspannend": "speaking_L23_natur_entspannend.mp3",
        "speaking_gehe_zur_schule": "speaking_L24_gehe_zur_schule.mp3",
        "speaking_bin_aufgeregt": "speaking_L24_bin_aufgeregt.mp3",
        "speaking_lernen_macht_spass": "speaking_L24_lernen_macht_spass.mp3",
        "speaking_deutsch_gelernt": "speaking_L25_deutsch_gelernt.mp3",
        "speaking_sprechen_verstehen": "speaking_L25_sprechen_verstehen.mp3",
        "speaking_vielen_dank_freunde": "speaking_L25_vielen_dank_freunde.mp3",
        
        // Game questions
        "question_fahrkarte_needed": "game_L22_question_fahrkarte_needed.mp3",
        "question_who_checks_tickets": "game_L22_question_schaffner_checks.mp3",
        "question_schulranzen": "game_L24_question_schulranzen.mp3",
        "question_lehrerin": "game_L24_question_lehrerin.mp3",
        "question_what_at_school": "game_L24_question_lernen_at_school.mp3",
        
        // Story sequences L22
        "sequence_01_arriving_station": "sequence_L22_01_family_arriving_station.mp3",
        "sequence_02_buying_tickets": "sequence_L22_02_papa_buying_tickets.mp3",
        "sequence_03_train_arriving": "sequence_L22_03_train_arriving_station.mp3",
        "sequence_04_boarding": "sequence_L22_04_family_boarding_train.mp3",
        "sequence_05_enjoying_view": "sequence_L22_05_enjoying_window_view.mp3",
        
        // Story sequences L25 - Final journey recap
        "sequence_01_castle_welcome": "sequence_L25_01_bjorn_castle_welcome.mp3",
        "sequence_02_family_house": "sequence_L25_02_learning_family_house.mp3",
        "sequence_03_games_colors": "sequence_L25_03_discovering_games_colors.mp3",
        "sequence_04_outside_world": "sequence_L25_04_exploring_outside_world.mp3",
        "sequence_05_german_speaker": "sequence_L25_05_proud_german_speaker.mp3"
      }
    };
  }
}