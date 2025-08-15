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

1. **Adăugare conținut educațional**
   - Poveștile pentru fiecare lecție
   - Exercițiile matematice
   - Înregistrări audio pentru personaje

2. **Implementare logică jocuri**
   - Completarea logicii pentru fiecare tip de joc
   - Sistemul de punctare detaliat

3. **Integrare Supabase**
   - Backend pentru sincronizare
   - Sistem de autentificare

4. **Polish și optimizări**
   - Animații și tranziții
   - Optimizări performanță
   - Testing extensiv

## 📝 Licență

Toate drepturile rezervate. Aceasta este o aplicație educațională pentru copii români din Germania.

## 👥 Echipa

Creat cu ❤️ pentru învățarea distractivă a copiilor români din Germania.

---

**Status**: Framework complet + Componente UI profesionale - pregătit pentru testare și adăugarea conținutului educațional 🚀
