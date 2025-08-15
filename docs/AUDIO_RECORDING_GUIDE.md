# Ghid pentru înregistrarea audio-ului - MiniDeutsch

## 🎯 Obiectiv
Crearea unui sistem audio complet bilingv (germană-română) pentru copii români din Germania care învață limba germană.

## 👥 Personajele principale

### 🐻 Björn der Bär (Naratorul)
- **Voce**: Caldă, paternală, reconfortantă
- **Rol**: Povestește scenele principale, introduce zonele
- **Ton**: Calm, înțelept, protector
- **Viteză**: Lentă, clar articulată
- **Folosit pentru**: 
  - Povestiri (scene din lecții)
  - Introduceri zone și lecții
  - Explicații importante

### 🦆 Emma die Ente (Specialista pronunție)
- **Voce**: Melodioasă, prietenească, clară
- **Rol**: Învață pronunția, spune cuvinte noi
- **Ton**: Vesel, încurajator, energic
- **Viteză**: Moderată, foarte clară
- **Folosit pentru**:
  - Vocabular și pronunție
  - Texte UI (meniuri, butoane)
  - Recompense și felicitări
  - Instrucțiuni generale

### 🐰 Max der Hase (Maestrul jocurilor)
- **Voce**: Energică, jucăușă, entuziastă
- **Rol**: Conduce jocurile și exercițiile
- **Ton**: Foarte energic, amuzant
- **Viteză**: Rapidă dar clară
- **Folosit pentru**:
  - Instrucțiuni jocuri
  - Indicatori de ajutor
  - Provocări și competiții

## 📁 Structura fișierelor audio

### Lecții și povești
```
assets/audio/lessons/lesson{X}/
├── story/
│   ├── scene1_bjorn_de.mp3    # Björn povestește scena 1 în germană
│   ├── scene1_bjorn_ro.mp3    # Björn povestește scena 1 în română
│   ├── scene2_bjorn_de.mp3
│   └── scene2_bjorn_ro.mp3
├── vocabulary/
│   ├── {word}_emma_de.mp3     # Emma pronunță cuvântul în germană
│   ├── {word}_emma_ro.mp3     # Emma explică în română
│   └── ...
└── games/
    ├── intro_max_de.mp3       # Max introduce jocul în germană
    ├── intro_max_ro.mp3       # Max introduce jocul în română
    ├── help_max_de.mp3        # Max dă instrucțiuni în germană
    └── help_max_ro.mp3        # Max dă instrucțiuni în română
```

### Audio UI (interfață)
```
assets/audio/ui/
├── ui_texts_emma_de.mp3      # Toate textele UI în germană
├── ui_texts_emma_ro.mp3      # Toate textele UI în română
└── effects/
    ├── button_click.mp3      # Sunet click buton
    ├── success.mp3           # Sunet succes
    ├── error.mp3             # Sunet eroare
    └── reward.mp3            # Sunet recompensă
```

### Personaje
```
assets/audio/characters/
├── bjorn_intro_de.mp3        # "Hallo, ich bin Björn der Bär!"
├── bjorn_intro_ro.mp3        # "Salut, sunt Björn Ursul!"
├── emma_intro_de.mp3         # "Hi, ich bin Emma die Ente!"
├── emma_intro_ro.mp3         # "Bună, sunt Emma Rața!"
├── max_intro_de.mp3          # "Hey, ich bin Max der Hase!"
└── max_intro_ro.mp3          # "Hei, sunt Max Iepurașul!"
```

## 🎵 Specificații tehnice

### Format
- **Tip**: MP3
- **Calitate**: 44.1kHz, 128-192 kbps
- **Mono/Stereo**: Stereo
- **Durată**: Variabilă (1-10 secunde pentru cuvinte, 10-60 secunde pentru scene)

### Înregistrare
- **Mediu**: Studio sau cameră foarte liniștită
- **Microfon**: Calitate profesională sau semi-profesională
- **Background noise**: Complet eliminat
- **Normalizare**: -3dB to -6dB peak
- **Compresie**: Ușoară, pentru consistență

### Timing
- **Pauze între cuvinte**: 0.5 secunde
- **Pauze între fraze**: 1 secundă
- **Respirație**: Editată să nu se audă
- **Început/sfârșit**: Fade in/out de 0.1 secunde

## 📝 Textele pentru înregistrare

### Vocabular Familie (Lecția 1)
**Emma în germană (pronunție clară):**
- Familie
- Mutter 
- Vater
- Kind
- Bruder
- Schwester
- Oma
- Opa

**Emma în română (explicații):**
- Familie - "Aceasta este familia"
- Mutter - "Aceasta înseamnă mamă"
- Vater - "Aceasta înseamnă tată"
- Kind - "Aceasta înseamnă copil"
- Bruder - "Aceasta înseamnă frate"
- Schwester - "Aceasta înseamnă soră"
- Oma - "Aceasta înseamnă bunica"
- Opa - "Aceasta înseamnă bunicul"

### Poveste Lecția 1 - Scena 1
**Björn în germană:**
"Willkommen im Familienschloss! Hier wohnt die Familie Müller. Heute lernen wir die Familienmitglieder kennen."

**Björn în română:**
"Bun venit la Castelul Familiei! Aici locuiește familia Müller. Astăzi vom cunoaște membrii familiei."

### UI principal
**Emma - Texte meniuri (vezi fișierele din assets/audio/ui/)**

## 🎯 Ghiduri pentru înregistrare

### Pentru Björn (Narator)
1. **Pregătire**: Citește textul complet înainte
2. **Ritm**: Lent, ca să înțeleagă copiii mici
3. **Pauze**: După fiecare frază importantă
4. **Ton**: Patern, înțelept, protector
5. **Emoție**: Transmite siguranță și căldură

### Pentru Emma (Pronunție)
1. **Claritate**: Fiecare silabă foarte clară
2. **Repetiție**: Pronunță fiecare cuvânt de 2 ori cu pauză
3. **Energia**: Veselă și încurajatoare
4. **Viteză**: Moderată, ușor de imitat
5. **Emoție**: Prietenească și accesibilă

### Pentru Max (Jocuri)
1. **Energie**: Foarte energic și entuziast
2. **Ritm**: Rapid dar foarte clar
3. **Distractiv**: Ton amuzant și jucăuș
4. **Instrucțiuni**: Simple și directe
5. **Emoție**: Provocator și motivant

## ✅ Lista de verificare finală

### Înaintea înregistrării:
- [ ] Studio/cameră liniștită
- [ ] Microfon testat și calibrat
- [ ] Textele tipărite și marcate
- [ ] Paharul cu apă la îndemână
- [ ] Timer pentru pauze

### În timpul înregistrării:
- [ ] 3-4 variante pentru fiecare text
- [ ] Verifică claritatea după fiecare înregistrare
- [ ] Pauze regulate pentru a evita oboseala vocală
- [ ] Notează variantele preferate

### După înregistrare:
- [ ] Editare pentru eliminarea zgomotelor
- [ ] Normalizare volum
- [ ] Export în MP3 la specificațiile cerute
- [ ] Denumire fișiere conform conventiilor
- [ ] Test redare pe difuzoare de calitate medie

## 🔗 Instrucțiuni pentru dezvoltatori

Pentru integrarea fișierelor audio în aplicație:
1. Plasați fișierele MP3 în structura de foldere specificată
2. Verificați că numele fișierelor corespund cu cele din AudioService.js
3. Testați redarea pe device fizic (nu doar emulator)
4. Verificați că toate textele au corespondent audio în ambele limbi

## 📞 Contact
Pentru întrebări despre specificații sau probleme tehnice, contactați echipa de dezvoltare.
