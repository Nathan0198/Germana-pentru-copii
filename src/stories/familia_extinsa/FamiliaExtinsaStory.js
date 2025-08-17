import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * Familia Extinsă Story - Lecțiile 8-10
 * Învățarea despre bunici, rutina de seară și sărbători
 */
export class FamiliaExtinsaStory extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: 'familia_extinsa',
        name: 'Familia Extinsă',
        description: 'Întâlnește bunicii și sărbătorește împreună cu toată familia',
        order: 3,
        difficulty: 'beginner',
        estimatedDuration: 12, // minutes per lesson
        color: '#4ECDC4', // Teal/turquoise
        icon: '👴👵',
        lessonsRange: '8-10',
        totalLessons: 3
      },

      lessons: this.createLessons(),
      characters: this.generateCharacters(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: {
        prerequisiteStories: ['jocuri_activitati'],
        minimumProgress: {
          'jocuri_activitati': 80
        }
      }
    };

    await this.initializeWithData(storyData);
  }

  createLessons() {
    return [
      // Lecția 8: Bunicii Dragi
      {
        id: 8,
        title: "Bunicii Dragi",
        subtitle: "Vizita bunicilor",
        duration: 4,
        
        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Heute kommen Opa und Oma zu Besuch!",
              romanian: "Astăzi vin bunicul și bunica în vizită!",
              image: "bjorn_excited_grandparents",
              audio: "L08_scene_01_grandparents_visit"
            },
            {
              character: "emma",
              german: "Wie schön! Ich freue mich darauf!",
              romanian: "Ce frumos! Mă bucur de asta!",
              image: "emma_happy_visit",
              audio: "L08_scene_02_emma_excited"
            },
            {
              character: "opa_baer",
              german: "Hallo, meine lieben Enkelkinder!",
              romanian: "Salut, dragi nepoței ai mei!",
              image: "opa_baer_greeting",
              audio: "L08_scene_03_opa_greeting"
            },
            {
              character: "oma_baer",
              german: "Wir haben Geschenke für euch mitgebracht!",
              romanian: "Am adus cadouri pentru voi!",
              image: "oma_baer_gifts",
              audio: "L08_scene_04_oma_gifts"
            },
            {
              character: "björn",
              german: "Danke, Oma! Wir lieben euch sehr!",
              romanian: "Mulțumesc, bunico! Vă iubim foarte mult!",
              image: "family_hug_grandparents",
              audio: "L08_scene_05_family_love"
            }
          ]
        },

        vocabulary: [
          { german: "der Opa", romanian: "bunicul", category: "familie", audio: "vocab_der_opa" },
          { german: "die Oma", romanian: "bunica", category: "familie", audio: "vocab_die_oma" },
          { german: "zu Besuch", romanian: "în vizită", category: "expresii", audio: "vocab_zu_besuch" },
          { german: "sich freuen", romanian: "a se bucura", category: "sentimente", audio: "vocab_sich_freuen" },
          { german: "die Enkelkinder", romanian: "nepoții", category: "familie", audio: "vocab_die_enkelkinder" },
          { german: "das Geschenk", romanian: "cadoul", category: "obiecte", audio: "vocab_das_geschenk" },
          { german: "mitbringen", romanian: "a aduce cu sine", category: "verbe", audio: "vocab_mitbringen" },
          { german: "sehr", romanian: "foarte", category: "adverbe", audio: "vocab_sehr" }
        ],

        games: [
          {
            id: "L08_drag_drop",
            type: "drag_drop",
            title: "Familia extinsă",
            instructions: "Conectează membrii familiei extinse cu imaginile lor",
            items: [
              { german: "der Opa", romanian: "bunicul", image: "opa_baer_portrait", category: "family", audio: "vocab_der_opa" },
              { german: "die Oma", romanian: "bunica", image: "oma_baer_portrait", category: "family", audio: "vocab_die_oma" },
              { german: "das Geschenk", romanian: "cadoul", image: "wrapped_gift", category: "object", audio: "vocab_das_geschenk" },
              { german: "die Enkelkinder", romanian: "nepoții", image: "grandchildren_happy", category: "family", audio: "vocab_die_enkelkinder" }
            ]
          },
          {
            id: "L08_memory",
            type: "memory",
            title: "Jocul memoriei - Familia mare",
            instructions: "Găsește perechile cu membrii familiei",
            pairs: [
              { german: "der Opa", romanian: "bunicul", audio: "vocab_der_opa" },
              { german: "die Oma", romanian: "bunica", audio: "vocab_die_oma" },
              { german: "das Geschenk", romanian: "cadoul", audio: "vocab_das_geschenk" },
              { german: "die Enkelkinder", romanian: "nepoții", audio: "vocab_die_enkelkinder" }
            ]
          },
          {
            id: "L08_quick_choice",
            type: "quick_choice",
            title: "Alegere rapidă - Familie",
            instructions: "Max: 'Răspunde corect!'",
            questions: [
              {
                question: "Cum spui 'bunica' în germană?",
                options: ["der Opa", "die Oma", "die Mutter"],
                correct: 1,
                audio: "question_oma"
              }
            ]
          }
        ]
      },

      // Lecția 9: Seara în Familie
      {
        id: 9,
        title: "Seara în Familie",
        subtitle: "Rutina de seară",
        duration: 4,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Der Tag ist fast vorbei. Es wird dunkel.",
              romanian: "Ziua aproape s-a terminat. Se întunecă.",
              image: "evening_sunset",
              audio: "L09_scene_01_day_ending"
            },
            {
              character: "emma",
              german: "Was macht ihr am Abend?",
              romanian: "Ce faceți seara?",
              image: "emma_curious_evening",
              audio: "L09_scene_02_emma_question"
            },
            {
              character: "björn",
              german: "Wir schauen zusammen fern oder hören Musik.",
              romanian: "Privim împreună la televizor sau ascultăm muzică.",
              image: "family_watching_tv",
              audio: "L09_scene_03_evening_activities"
            },
            {
              character: "anna",
              german: "Ich putze meine Zähne vor dem Schlafengehen.",
              romanian: "Îmi spăl dinții înainte de culcare.",
              image: "anna_brushing_teeth",
              audio: "L09_scene_04_anna_teeth"
            },
            {
              character: "björn",
              german: "Gute Nacht, alle zusammen!",
              romanian: "Noapte bună, tuturor!",
              image: "family_goodnight",
              audio: "L09_scene_05_goodnight"
            }
          ]
        },

        vocabulary: [
          { german: "der Abend", romanian: "seara", category: "timp", audio: "vocab_der_abend" },
          { german: "vorbei", romanian: "terminat", category: "stări", audio: "vocab_vorbei" },
          { german: "dunkel", romanian: "întunecat", category: "adjective", audio: "vocab_dunkel" },
          { german: "fernsehen", romanian: "a privi la televizor", category: "activități", audio: "vocab_fernsehen" },
          { german: "die Musik", romanian: "muzica", category: "artă", audio: "vocab_die_musik" },
          { german: "putzen", romanian: "a spăla/a curăța", category: "verbe", audio: "vocab_putzen" },
          { german: "die Zähne", romanian: "dinții", category: "corp", audio: "vocab_die_zaehne" },
          { german: "Gute Nacht", romanian: "Noapte bună", category: "salutări", audio: "vocab_gute_nacht" }
        ],

        games: [
          {
            id: "L09_story_sequence",
            type: "story_sequence",
            title: "Activitățile serii în ordine",
            instructions: "Aranjează activitățile serii în ordinea corectă",
            sequence: [
              {
                step: 1,
                german: "Se întunecă afară",
                romanian: "Es wird dunkel",
                image: "evening_sunset",
                audio: "sequence_01_dark"
              },
              {
                step: 2,
                german: "Familia privește la televizor",
                romanian: "Familie schaut fern",
                image: "family_watching_tv",
                audio: "sequence_02_tv"
              },
              {
                step: 3,
                german: "Ascultă muzică",
                romanian: "Musik hören",
                image: "family_listening_music",
                audio: "sequence_03_music"
              },
              {
                step: 4,
                german: "Björn își spală dinții",
                romanian: "Björn putzt Zähne",
                image: "anna_brushing_teeth",
                audio: "sequence_04_teeth"
              },
              {
                step: 5,
                german: "Toți spun 'Gute Nacht'",
                romanian: "Alle sagen 'Gute Nacht'",
                image: "family_goodnight",
                audio: "sequence_05_goodnight"
              }
            ]
          },
          {
            id: "L09_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să urăm noapte bună!",
            instructions: "Emma: 'Repetă după mine!'",
            challenges: [
              {
                phrase: "Gute Nacht",
                romanian: "Noapte bună",
                audio: "speaking_gute_nacht",
                difficulty: "easy"
              },
              {
                phrase: "Es wird dunkel",
                romanian: "Se întunecă",
                audio: "speaking_es_wird_dunkel",
                difficulty: "medium"
              },
              {
                phrase: "Ich putze meine Zähne",
                romanian: "Îmi spăl dinții",
                audio: "speaking_ich_putze_zaehne",
                difficulty: "medium"
              }
            ]
          },
          {
            id: "L09_drag_drop",
            type: "drag_drop",
            title: "Activitățile serii",
            instructions: "Conectează activitățile cu imaginile lor",
            items: [
              { german: "fernsehen", romanian: "a privi la televizor", image: "television_screen", category: "activity", audio: "vocab_fernsehen" },
              { german: "die Musik", romanian: "muzica", image: "musical_notes", category: "activity", audio: "vocab_die_musik" },
              { german: "die Zähne putzen", romanian: "a spăla dinții", image: "toothbrush", category: "activity", audio: "vocab_putzen" },
              { german: "Gute Nacht", romanian: "Noapte bună", image: "moon_stars", category: "phrase", audio: "vocab_gute_nacht" }
            ]
          }
        ]
      },

      // Lecția 10: Ziua de Naștere
      {
        id: 10,
        title: "Ziua de Naștere",
        subtitle: "Sărbătoarea lui Björn",
        duration: 4,

        story: {
          narrator: "björn",
          scenes: [
            {
              character: "björn",
              german: "Heute ist mein Geburtstag! Ich werde fünf Jahre alt!",
              romanian: "Astăzi este ziua mea de naștere! Împlinesc cinci ani!",
              image: "bjorn_birthday_crown",
              audio: "L10_scene_01_birthday_announcement"
            },
            {
              character: "emma",
              german: "Herzlichen Glückwunsch zum Geburtstag, Björn!",
              romanian: "La mulți ani, Björn!",
              image: "emma_congratulating",
              audio: "L10_scene_02_emma_congratulations"
            },
            {
              character: "björn",
              german: "Danke! Wir haben eine Torte mit Kerzen!",
              romanian: "Mulțumesc! Avem un tort cu lumânări!",
              image: "birthday_cake_candles",
              audio: "L10_scene_03_birthday_cake"
            },
            {
              character: "max",
              german: "Und viele bunte Luftballons!",
              romanian: "Și multe baloane colorate!",
              image: "colorful_balloons",
              audio: "L10_scene_04_max_balloons"
            },
            {
              character: "familie",
              german: "Zum Geburtstag viel Glück! Zum Geburtstag viel Glück!",
              romanian: "La mulți ani! La mulți ani!",
              image: "family_singing_birthday",
              audio: "L10_scene_05_birthday_song"
            }
          ]
        },

        vocabulary: [
          { german: "der Geburtstag", romanian: "ziua de naștere", category: "sărbători", audio: "vocab_der_geburtstag" },
          { german: "Jahre alt", romanian: "ani în vârstă", category: "vârstă", audio: "vocab_jahre_alt" },
          { german: "Herzlichen Glückwunsch", romanian: "Felicitări", category: "urări", audio: "vocab_herzlichen_glueckwunsch" },
          { german: "die Torte", romanian: "tortul", category: "mâncare", audio: "vocab_die_torte" },
          { german: "die Kerzen", romanian: "lumânările", category: "obiecte", audio: "vocab_die_kerzen" },
          { german: "die Luftballons", romanian: "baloanele", category: "decorațiuni", audio: "vocab_die_luftballons" },
          { german: "viel Glück", romanian: "multă fericire", category: "urări", audio: "vocab_viel_glueck" },
          { german: "werden", romanian: "a deveni", category: "verbe", audio: "vocab_werden" }
        ],

        games: [
          {
            id: "L10_drag_drop",
            type: "drag_drop",
            title: "Elementele zilei de naștere",
            instructions: "Conectează elementele petrecerii cu imaginile lor",
            items: [
              { german: "der Geburtstag", romanian: "ziua de naștere", image: "bjorn_birthday_crown", category: "celebration", audio: "vocab_der_geburtstag" },
              { german: "die Torte", romanian: "tortul", image: "birthday_cake_candles", category: "food", audio: "vocab_die_torte" },
              { german: "die Kerzen", romanian: "lumânările", image: "birthday_candles", category: "decoration", audio: "vocab_die_kerzen" },
              { german: "die Luftballons", romanian: "baloanele", image: "colorful_balloons", category: "decoration", audio: "vocab_die_luftballons" }
            ]
          },
          {
            id: "L10_memory",
            type: "memory",
            title: "Jocul memoriei - Sărbătoarea",
            instructions: "Găsește perechile cu elementele zilei de naștere",
            pairs: [
              { german: "der Geburtstag", romanian: "ziua de naștere", audio: "vocab_der_geburtstag" },
              { german: "die Torte", romanian: "tortul", audio: "vocab_die_torte" },
              { german: "die Kerzen", romanian: "lumânările", audio: "vocab_die_kerzen" },
              { german: "Herzlichen Glückwunsch", romanian: "La mulți ani", audio: "vocab_herzlichen_glueckwunsch" }
            ]
          },
          {
            id: "L10_speaking_challenge",
            type: "speaking_challenge",
            title: "Să învățăm să urăm la mulți ani!",
            instructions: "Emma: 'Să cântăm la mulți ani!'",
            challenges: [
              {
                phrase: "Herzlichen Glückwunsch",
                romanian: "La mulți ani",
                audio: "speaking_herzlichen_glueckwunsch",
                difficulty: "medium"
              },
              {
                phrase: "Zum Geburtstag viel Glück",
                romanian: "La mulți ani",
                audio: "speaking_zum_geburtstag",
                difficulty: "hard"
              },
              {
                phrase: "Ich werde fünf Jahre alt",
                romanian: "Împlinesc cinci ani",
                audio: "speaking_fuenf_jahre_alt",
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
        description: "Un urs fericit care sărbătorește cu familia sa extinsă",
        personality: "fericit, recunoscător, familist",
        images: {
          default: "bjorn_default",
          excited: "bjorn_excited_grandparents",
          birthday: "bjorn_birthday_crown"
        },
        voice: "male_friendly",
        color: "#8B5A2B"
      },
      emma: {
        name: "Emma",
        fullName: "Emma die Ente",
        type: "duck",
        description: "O rățușcă care participă la toate sărbătorile familiei",
        personality: "festivă, participativă, prietenoasă",
        images: {
          default: "emma_excited",
          happy: "emma_happy_visit",
          congratulating: "emma_congratulating"
        },
        voice: "female_cheerful",
        color: "#FFD700"
      },
      anna: {
        name: "Anna",
        fullName: "Anna die kleine Schwester",
        type: "bear",
        description: "Sora mică care învață rutina de seară",
        personality: "disciplinată, grijulie cu igiena",
        images: {
          default: "anna_default",
          teeth: "anna_brushing_teeth"
        },
        voice: "child_female",
        color: "#F4A460"
      },
      opa_baer: {
        name: "Opa Bär",
        fullName: "Opa Bär",
        type: "bear",
        description: "Bunicul iubitor care aduce bucurie în familie",
        personality: "înțelept, iubitor, generos",
        images: {
          default: "opa_baer_portrait",
          greeting: "opa_baer_greeting"
        },
        voice: "male_elderly",
        color: "#8B7355"
      },
      oma_baer: {
        name: "Oma Bär",
        fullName: "Oma Bär",
        type: "bear",
        description: "Bunica caldă care aduce cadouri și dragoste",
        personality: "caldă, grijulie, generoză",
        images: {
          default: "oma_baer_portrait",
          gifts: "oma_baer_gifts"
        },
        voice: "female_elderly",
        color: "#DDA0DD"
      },
      max: {
        name: "Max",
        fullName: "Max der Hase",
        type: "rabbit",
        description: "Un iepuraș care ajută la organizarea petrecerilor",
        personality: "organizat, vesel, util",
        images: {
          default: "max_default",
          balloons: "max_with_balloons"
        },
        voice: "male_young",
        color: "#A0522D"
      }
    };
  }

  generateGames() {
    return [
      {
        id: "grandparents_love",
        type: "drag_drop",
        difficulty: "easy",
        category: "extended_family"
      },
      {
        id: "evening_routine",
        type: "story_sequence",
        difficulty: "medium",
        category: "daily_routine"
      },
      {
        id: "birthday_celebration",
        type: "memory",
        difficulty: "easy",
        category: "celebrations"
      }
    ];
  }

  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/familia_extinsa",
      files: {
        // Lecția 8 - Bunicii Dragi
        "L08_scene_01_grandparents_visit": "L08_bjorn_grandparents_visit.mp3",
        "L08_scene_02_emma_excited": "L08_emma_excited_visit.mp3",
        "L08_scene_03_opa_greeting": "L08_opa_greeting_grandchildren.mp3",
        "L08_scene_04_oma_gifts": "L08_oma_brings_gifts.mp3",
        "L08_scene_05_family_love": "L08_bjorn_loves_grandparents.mp3",
        
        // Lecția 9 - Seara în Familie
        "L09_scene_01_day_ending": "L09_bjorn_day_ending.mp3",
        "L09_scene_02_emma_question": "L09_emma_evening_question.mp3",
        "L09_scene_03_evening_activities": "L09_bjorn_evening_activities.mp3",
        "L09_scene_04_anna_teeth": "L09_anna_brushing_teeth.mp3",
        "L09_scene_05_goodnight": "L09_bjorn_goodnight.mp3",
        
        // Lecția 10 - Ziua de Naștere
        "L10_scene_01_birthday_announcement": "L10_bjorn_birthday_announcement.mp3",
        "L10_scene_02_emma_congratulations": "L10_emma_congratulations.mp3",
        "L10_scene_03_birthday_cake": "L10_bjorn_birthday_cake.mp3",
        "L10_scene_04_max_balloons": "L10_max_balloons.mp3",
        "L10_scene_05_birthday_song": "L10_family_birthday_song.mp3",
        
        // Vocabular L8
        "vocab_der_opa": "vocab_L08_der_opa.mp3",
        "vocab_die_oma": "vocab_L08_die_oma.mp3",
        "vocab_zu_besuch": "vocab_L08_zu_besuch.mp3",
        "vocab_sich_freuen": "vocab_L08_sich_freuen.mp3",
        "vocab_die_enkelkinder": "vocab_L08_die_enkelkinder.mp3",
        "vocab_das_geschenk": "vocab_L08_das_geschenk.mp3",
        "vocab_mitbringen": "vocab_L08_mitbringen.mp3",
        "vocab_sehr": "vocab_L08_sehr.mp3",
        
        // Vocabular L9
        "vocab_der_abend": "vocab_L09_der_abend.mp3",
        "vocab_vorbei": "vocab_L09_vorbei.mp3",
        "vocab_dunkel": "vocab_L09_dunkel.mp3",
        "vocab_fernsehen": "vocab_L09_fernsehen.mp3",
        "vocab_die_musik": "vocab_L09_die_musik.mp3",
        "vocab_putzen": "vocab_L09_putzen.mp3",
        "vocab_die_zaehne": "vocab_L09_die_zaehne.mp3",
        "vocab_gute_nacht": "vocab_L09_gute_nacht.mp3",
        
        // Vocabular L10
        "vocab_der_geburtstag": "vocab_L10_der_geburtstag.mp3",
        "vocab_jahre_alt": "vocab_L10_jahre_alt.mp3",
        "vocab_herzlichen_glueckwunsch": "vocab_L10_herzlichen_glueckwunsch.mp3",
        "vocab_die_torte": "vocab_L10_die_torte.mp3",
        "vocab_die_kerzen": "vocab_L10_die_kerzen.mp3",
        "vocab_die_luftballons": "vocab_L10_die_luftballons.mp3",
        "vocab_viel_glueck": "vocab_L10_viel_glueck.mp3",
        "vocab_werden": "vocab_L10_werden.mp3",
        
        // Speaking challenges
        "speaking_gute_nacht": "speaking_L09_gute_nacht.mp3",
        "speaking_es_wird_dunkel": "speaking_L09_es_wird_dunkel.mp3",
        "speaking_ich_putze_zaehne": "speaking_L09_ich_putze_zaehne.mp3",
        "speaking_herzlichen_glueckwunsch": "speaking_L10_herzlichen_glueckwunsch.mp3",
        "speaking_zum_geburtstag": "speaking_L10_zum_geburtstag.mp3",
        "speaking_fuenf_jahre_alt": "speaking_L10_fuenf_jahre_alt.mp3",
        
        // Game questions
        "question_oma": "game_L08_question_oma.mp3",
        
        // Story sequence
        "sequence_01_dark": "sequence_L09_01_dark.mp3",
        "sequence_02_tv": "sequence_L09_02_tv.mp3",
        "sequence_03_music": "sequence_L09_03_music.mp3",
        "sequence_04_teeth": "sequence_L09_04_teeth.mp3",
        "sequence_05_goodnight": "sequence_L09_05_goodnight.mp3"
      }
    };
  }
}