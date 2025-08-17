# MiniDeutsch Game System Complete Overhaul

## 🎯 Project Overview
This document outlines the complete transformation of MiniDeutsch from a generic game system to **unique games per lesson** across all 25 lessons.

## 📋 Master Plan

### Phase 1: Foundation Setup
- [x] Create project documentation structure
- [ ] Receive complete game script for all 25 lessons
- [ ] Generate audio mapping JSON with ElevenLabs specifications
- [ ] Refactor core game engine architecture

### Phase 2: Systematic Lesson Implementation (1-25)
**Per Lesson Workflow:**
1. **Game Implementation**: Replace generic games with unique lesson-specific games
2. **Image Generation**: Create 15-20+ images per lesson (games + story scenes)
3. **Character Continuity**: Ensure consistent character design across all images
4. **Integration**: Update lesson data and implement in project structure
5. **Testing**: Verify functionality before moving to next lesson

## 🎮 Game System Architecture

### Current System (To Be Replaced)
- Generic game types: DragDropGame, MemoryGame, SpeakingChallenge
- Shared game logic across all lessons
- Limited visual diversity

### New System (Target)
- **Unique games per lesson** - no two lessons share the same game type
- **Rich visual content** - dedicated images for each game and story
- **Enhanced interactivity** - lesson-specific game mechanics
- **Character continuity** - consistent character design across all content

## 📚 Lesson Progress Tracker

### ✅ Completed Lessons
*None yet - awaiting game script*

### 🔄 In Progress
- **Lesson 1**: Awaiting game definitions

### ⏳ Pending (2-25)
- Lessons 2-25: Awaiting systematic implementation

## 🎨 Visual Content Requirements

### Character Design Standards
- **Consistency**: Same characters across all 25 lessons
- **Style**: [To be defined based on first lesson images]
- **Quality**: High-resolution images suitable for mobile and web
- **Accessibility**: Clear, distinguishable visual elements

### Image Categories per Lesson
1. **Story Scene Images** (3-5 per lesson)
   - Opening scene
   - Key story moments
   - Character interactions
   - Closing scene

2. **Game-Specific Images** (10-15 per lesson)
   - Game backgrounds
   - Interactive elements
   - Character animations/poses
   - Game-specific objects and props

### Image Integration Locations
```
/assets/images/
├── lessons/
│   ├── lesson1/
│   │   ├── story/
│   │   └── games/
│   ├── lesson2/
│   └── ... (lesson3-25)
├── characters/
└── shared/
```

## 🔊 Audio System Specifications

### ElevenLabs Voice IDs
**German Voice (Male)**: `pqHfZKP75CvOlQylNhV4`
**Romanian Voice (Female)**: `EXAVITQu4vr4xnSDxMaL`

### Audio File Naming Convention
```
Format: [lesson]_[type]_[index]_[language].mp3

Examples:
- lesson1_story_1_de.mp3 (Lesson 1, Story part 1, German)
- lesson1_story_1_ro.mp3 (Lesson 1, Story part 1, Romanian)
- lesson1_game1_intro_de.mp3 (Lesson 1, Game 1 intro, German)
- lesson1_game1_intro_ro.mp3 (Lesson 1, Game 1 intro, Romanian)
```

### Audio Integration Structure
```
/assets/audio/
├── lessons/
│   ├── lesson1/
│   │   ├── story/
│   │   └── games/
│   ├── lesson2/
│   └── ... (lesson3-25)
└── shared/
    ├── ui_sounds/
    └── feedback/
```

## 🛠 Technical Implementation

### Core Files to Modify
1. **LessonsData.js** - Complete restructure for new game definitions
2. **GameTypes.js** - New game engines for unique game types
3. **DetailedLessonScreen.js** - Enhanced game coordination
4. **AppData.js** - Updated data structures
5. **AudioService.js** - Enhanced audio management

### New Game Engine Requirements
- **Modular Design**: Each game type as separate component
- **Completion Callbacks**: Proper game completion handling
- **Progress Tracking**: Individual game progress within lessons
- **Audio Integration**: Seamless German/Romanian audio playback
- **Image Loading**: Dynamic image loading for game-specific content

## 📝 Development Notes

### Character Continuity Guidelines
- [ ] Establish main character designs in Lesson 1
- [ ] Document character appearance specifications
- [ ] Create character reference sheet
- [ ] Maintain consistency across all image generation

### Quality Assurance Checklist (Per Lesson)
- [ ] All games function correctly
- [ ] Images load properly on mobile and web
- [ ] Audio plays in correct sequence (German → Romanian)
- [ ] Game completion triggers properly
- [ ] Navigation between games works
- [ ] Character designs are consistent
- [ ] Performance is acceptable

## 🔄 Version Control Strategy
- Commit after each lesson completion
- Create PR for each major milestone
- Maintain separate branch for development
- Regular syncing with main branch

---

## 📋 Detailed Lesson Breakdown

*This section will be populated as we receive the game script and implement each lesson*

### Lesson 1: [Title TBD]
**Status**: Awaiting game definitions

**Planned Games**: TBD
**Planned Images**: TBD
**Implementation Notes**: Will establish character design standards

### Lesson 2-25: [Titles TBD]
**Status**: Pending
**Notes**: Will be implemented systematically after Lesson 1

---

**Last Updated**: [Current Date]
**Next Action**: Awaiting complete game script from user