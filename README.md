# 🌟 MiniDeutsch - Lumea lui Björn 🌟

O aplicație educațională React Native cu Expo pentru copii români din Germania să învețe limba germană și matematică prin jocuri interactive și povești captivante.

## 📱 Despre Aplicație

MiniDeutsch este o aplicație educațională concepută special pentru copii români din Germania (4-10 ani) care doresc să învețe limba germană și să își îmbunătățească cunoștințele de matematică într-un mod distractiv și interactiv.

### 🎭 Personaje Principale

- **🐻 Björn der Bär** - Naratorul principal cu voce caldă și paternală
- **🦆 Emma die Ente** - Specialista pronunție cu voce melodioasă și prietenească  
- **🐰 Max der Hase** - Maestrul jocurilor cu voce energică și jucăușă

## 🗺️ Structura Aplicației

### 📚 Modulul Germană
8 zone cu câte 25 de lecții fiecare (200 total):
1. 🏰 Castelul Familiei (lecțiile 1-25)
2. 🌲 Pădurea Cuvintelor (lecțiile 26-50)
3. 🏫 Școala din Sat (lecțiile 51-75)
4. 🍎 Piața Mare (lecțiile 76-100)
5. 🎪 Carnavalul (lecțiile 101-125)
6. 🚂 Călătoria (lecțiile 126-150)
7. ⚽ Parcul de Joacă (lecțiile 151-175)
8. 🌍 Lumea Mare (lecțiile 176-200)

### 🔢 Modulul Matematică
3 nivele cu câte 50 de exerciții fiecare (150 total):
- **🌱 Nivel 1** (4-6 ani): Număratul 1-20
- **🌿 Nivel 2** (6-8 ani): Adunări simple
- **🌳 Nivel 3** (8+ ani): Scăderi și probleme

### 🎮 Tipuri de Jocuri
1. **Drag & Drop** - Conectează cuvinte cu imagini
2. **Memory Game** - Perechile română-germană
3. **Speaking Challenge** - Repetă după Emma (fără voice recognition)
4. **Quick Choice** - Alege răspunsul din 3 opțiuni
5. **Story Sequence** - Aranjează imaginile în ordine
6. **Word Builder** - Construiește cuvinte din litere

## 🛠️ Tehnologii Folosite

- **React Native** cu Expo
- **React Navigation** pentru navigare
- **Expo Audio** pentru sistem audio pre-înregistrat
- **AsyncStorage** pentru salvare locală
- **Supabase** pentru backend și backup
- **Lottie** pentru animații recompense
- **Expo Linear Gradient** pentru interfața vizuală

## 🏗️ **NOUĂ Arhitectură Modulară pentru Povești**

MiniDeutsch acum utilizează un sistem modular de povești care permite adăugarea ușoară de noi conținuturi fără modificarea codului principal:

### ✨ Caracteristici Noi:
- **🔧 Modularitate Completă**: Fiecare poveste este un modul independent
- **⚡ Încărcare Dinamică**: Poveștile se încarcă la cerere
- **🎯 Progresie Automată**: Deblocarea automată a poveștilor pe baza progresului
- **🎨 Teme Personalizabile**: Fiecare poveste își poate defini propria temă vizuală
- **📦 Gestionare Resurse**: Management automat al resurselor (imagini, audio)
- **🛠️ CLI pentru Dezvoltatori**: Instrument în linia de comandă pentru crearea rapidă de povești

### 📁 Structura Modulară:
```
src/
├── stories/                    # 📚 Module de povești
│   ├── castle/                # 🏰 Castelul Familiei (implementat)
│   ├── forest/                # 🌲 Pădurea Cuvintelor (șablon generat)
│   └── index.js               # Registry pentru înregistrarea poveștilor
├── services/story/            # 🔧 Servicii pentru sistemul de povești
│   ├── StoryManager.js        # Manager central pentru povești
│   ├── StoryInterface.js      # Interfața pentru module
│   ├── BaseStory.js          # Clasa de bază pentru povești
│   ├── StoryProgressionService.js # Logica de progresie
│   └── StoryTemplate.js       # Generator de șabloane
└── data/
    └── ModularAppData.js      # 🔄 Nou layer de date modular
```

### 🚀 Cum să Adaugi o Poveste Nouă:

1. **Folosind CLI-ul (Recomandat)**:
```bash
# Vezi șabloanele disponibile
node tools/story-cli.js list

# Creează o nouă poveste
node tools/story-cli.js create forest

# Verifică starea sistemului
node tools/story-cli.js status
```

2. **Înregistrare Automată**:
```javascript
// Povestea se înregistrează automat în src/stories/index.js
StoryManager.registerStory('forest', ForestStory, {
  dependencies: ['castle'],
  autoLoad: false
});
```

3. **Zero Modificări la Codul Principal**:
- ✅ Aplicația principală rămâne intactă
- ✅ UI-ul funcționează automat cu modulele noi
- ✅ Progresul se gestionează automat

### 📖 Documentație Detaliată:
Vezi `docs/MODULAR_STORY_ARCHITECTURE.md` pentru ghidul complet de dezvoltare.

## 🏗️ Arhitectura Proiectului

```
src/
├── navigation/         # Sistemul de navigare
├── screens/           # Ecranele aplicației
├── components/        # Componente reutilizabile
├── services/          # Servicii (Audio, Progress, etc.)
├── data/             # Structura de date și conținut
├── games/            # Tipurile de jocuri
└── utils/            # Funcții utilitare

assets/
├── audio/            # Fișiere audio pentru voci și efecte
├── images/           # Imagini și ilustrații
└── animations/       # Animații Lottie
```

## 🚀 Instalare și Rulare

### Cerințe
- Node.js 18+
- npm sau yarn
- Expo CLI
- Dispozitiv Android/iOS sau emulator

### Pași de instalare

1. **Clonează repository-ul**
```bash
git clone <repository-url>
cd MiniDeutsch
```

2. **Instalează dependențele**
```bash
npm install
```

3. **Pornește serverul de dezvoltare**
```bash
npm start
```

4. **Rulează pe dispozitiv**
```bash
# Pentru Android
npm run android

# Pentru iOS (numai pe macOS)
npm run ios

# Pentru web
npm run web
```

## 📊 Sistemul de Progres

### 🌟 Recompense
- **Stele**: 1-3 stele per lecție/exercițiu
- **Puncte**: 10 puncte per stea + bonusuri
- **Badge-uri**: La fiecare 10 lecții complete
- **Streak**: Contador pentru zile consecutive

### 💾 Salvare Date
- **Local**: AsyncStorage pentru acces rapid
- **Backup**: Supabase pentru sincronizare
- **Export**: Funcție de export pentru părinți

## 🎵 Sistemul Audio

### 🗣️ Voci Personaje
- **Björn**: Voce caldă, paternală (narator)
- **Emma**: Voce melodioasă (pronunție)
- **Max**: Voce energică (jocuri)

### 🔊 Setări Audio
- Control volum general
- Viteza pronunției (încet/normal/rapid)
- Muzică de fundal activă/dezactivată
- Redare automată

## 🎯 Funcționalități Cheie

- ✅ **Framework complet implementat**
- ✅ **Componente UI profesionale** (CharacterCard, ProgressCard, LevelButton, RewardDisplay)
- ✅ **Navigare fluidă între ecrane**
- ✅ **Sistemul de progres funcțional**
- ✅ **6 tipuri de jocuri pregătite**
- ✅ **Serviciul audio configurat**
- ✅ **Salvare locală și backup**
- ✅ **Interfață în română**
- ✅ **Design adaptat pentru copii**
- ✅ **HomeScreen modernizat cu componente**

## 🔄 Următorii Pași

### ✅ Arhitectura Modulară (COMPLETATĂ)
- ✅ **Sistem modular pentru povești implementat**
- ✅ **Castle Story refactorizat ca primul modul**
- ✅ **CLI pentru generarea automată de povești**
- ✅ **Sistem de progresie automată**
- ✅ **Template generator pentru dezvoltatori**

### 🎯 Următoarele Implementări

1. **📚 Extindere Conținut folosind sistemul modular**
   - Finalizare poveste Forest folosind template-ul generat
   - Adăugare conținut pentru Village, City, Ocean, Mountains, Space, Magic
   - Folosire CLI pentru generarea rapidă: `node tools/story-cli.js create village`

2. **🎮 Îmbunătățiri Jocuri**
   - Completarea logicii pentru fiecare tip de joc în modulele de povești
   - Sistemul de punctare detaliat per poveste

3. **🎵 Integrare Assets**
   - Adăugarea sistemului de cache pentru imagini și audio
   - Implementarea loading-ului automat de resurse per poveste

4. **☁️ Integrare Supabase**
   - Backend pentru sincronizare progres modular
   - Sistem de autentificare
   - Backup pentru progresul din fiecare poveste

5. **✨ Polish și optimizări**
   - Animații și tranziții între povești
   - Optimizări performanță pentru încărcare modulară
   - Testing extensiv pentru sistemul modular

### 🛠️ Instrumente pentru Dezvoltatori

- **Story CLI**: `node tools/story-cli.js help`
- **Template Generator**: Generare automată de povești noi
- **Story Manager**: Gestionare centralizată a modulelor
- **Progress Tracking**: Urmărire automată a progresului între povești

## 📝 Licență

Toate drepturile rezervate. Aceasta este o aplicație educațională pentru copii români din Germania.

## 👥 Echipa

Creat cu ❤️ pentru învățarea distractivă a copiilor români din Germania.

---

**Status**: 🎯 **SISTEM MODULAR IMPLEMENTAT** - Framework complet cu arhitectură modulară pentru povești + CLI pentru dezvoltatori - pregătit pentru adăugarea ușoară de noi povești! 🚀

### 🎉 **PROGRES MAJOR**: 
Aplicația are acum un sistem complet modular care permite adăugarea de noi povești fără modificarea codului principal. Fiecare poveste trăiește în propriul modul și se gestionează automat!
