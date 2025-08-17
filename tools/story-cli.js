#!/usr/bin/env node

/**
 * MiniDeutsch Story CLI Tool
 * Command-line interface for managing stories, generating content, and system administration
 */

const fs = require('fs').promises;
const path = require('path');

// CLI Commands
const commands = {
  async create(storyId, options = {}) {
    console.log(`Creating new story: ${storyId}`);
    
    if (!storyId) {
      console.error('Error: Story ID is required');
      showUsage();
      return;
    }

    try {
      await createStoryModule(storyId, options);
      console.log(`✅ Story ${storyId} created successfully!`);
    } catch (error) {
      console.error(`❌ Error creating story ${storyId}:`, error.message);
    }
  },

  async list() {
    console.log('📚 Available Stories:');
    
    try {
      const storiesDir = path.join(__dirname, '../src/stories');
      const items = await fs.readdir(storiesDir);
      
      const stories = [];
      for (const item of items) {
        const itemPath = path.join(storiesDir, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory() && item !== 'index.js') {
          try {
            const storyFile = path.join(itemPath, `${item.charAt(0).toUpperCase() + item.slice(1)}Story.js`);
            await fs.access(storyFile);
            stories.push(item);
          } catch {
            // Story file doesn't exist, skip
          }
        }
      }
      
      if (stories.length === 0) {
        console.log('  No stories found.');
      } else {
        stories.forEach((story, index) => {
          console.log(`  ${index + 1}. ${story}`);
        });
      }
      
    } catch (error) {
      console.error('❌ Error listing stories:', error.message);
    }
  },

  async status() {
    console.log('🔍 System Status:');
    
    try {
      // Check if modular system files exist
      const checkFile = async (filePath, description) => {
        try {
          await fs.access(filePath);
          console.log(`  ✅ ${description}`);
          return true;
        } catch {
          console.log(`  ❌ ${description} (missing)`);
          return false;
        }
      };

      console.log('\n📁 Core System Files:');
      await checkFile(path.join(__dirname, '../src/services/story/StoryInterface.js'), 'StoryInterface');
      await checkFile(path.join(__dirname, '../src/services/story/BaseStory.js'), 'BaseStory');
      await checkFile(path.join(__dirname, '../src/services/story/StoryManager.js'), 'StoryManager');
      await checkFile(path.join(__dirname, '../src/stories/index.js'), 'Stories Index');
      await checkFile(path.join(__dirname, '../src/data/ModularAppData.js'), 'Modular App Data');

      console.log('\n📚 Story Modules:');
      const storiesDir = path.join(__dirname, '../src/stories');
      const stories = ['castle', 'familie', 'haus', 'morgen'];
      
      for (const story of stories) {
        const storyFile = path.join(storiesDir, story, `${story.charAt(0).toUpperCase() + story.slice(1)}Story.js`);
        await checkFile(storyFile, `${story} Story`);
      }

      console.log('\n🎮 Game Components:');
      const gamesDir = path.join(__dirname, '../src/games');
      try {
        const gameFiles = await fs.readdir(gamesDir);
        gameFiles.forEach(file => {
          if (file.endsWith('.js')) {
            console.log(`  📄 ${file}`);
          }
        });
      } catch {
        console.log('  ❌ Games directory not found');
      }

      console.log('\n🎵 Audio Structure:');
      const audioDir = path.join(__dirname, '../assets/audio');
      try {
        const audioDirs = await fs.readdir(audioDir);
        audioDirs.forEach(dir => {
          console.log(`  📁 ${dir}/`);
        });
      } catch {
        console.log('  ❌ Audio directory not found');
      }

    } catch (error) {
      console.error('❌ Error checking system status:', error.message);
    }
  },

  async validate(storyId) {
    console.log(`🔍 Validating story: ${storyId || 'all stories'}`);
    
    try {
      if (storyId) {
        await validateStory(storyId);
      } else {
        await validateAllStories();
      }
    } catch (error) {
      console.error('❌ Validation error:', error.message);
    }
  },

  async generate(type, ...args) {
    console.log(`🏗️  Generating ${type}...`);
    
    switch (type) {
      case 'audio-map':
        await generateAudioMap(args[0]);
        break;
      case 'character-list':
        await generateCharacterList();
        break;
      case 'lesson-summary':
        await generateLessonSummary();
        break;
      default:
        console.error(`Unknown generation type: ${type}`);
        console.log('Available types: audio-map, character-list, lesson-summary');
    }
  }
};

// Helper Functions
async function createStoryModule(storyId, options) {
  const storyDir = path.join(__dirname, '../src/stories', storyId);
  const storyClassName = storyId.charAt(0).toUpperCase() + storyId.slice(1) + 'Story';
  const storyFileName = `${storyClassName}.js`;
  
  // Create story directory
  await fs.mkdir(storyDir, { recursive: true });
  
  // Generate story template
  const template = generateStoryTemplate(storyId, storyClassName, options);
  
  // Write story file
  await fs.writeFile(path.join(storyDir, storyFileName), template);
  
  console.log(`Created: src/stories/${storyId}/${storyFileName}`);
}

function generateStoryTemplate(storyId, className, options) {
  const {
    name = `${storyId.charAt(0).toUpperCase() + storyId.slice(1)} Story`,
    description = `Description for ${storyId} story`,
    order = 1,
    color = '#6B46C1',
    icon = '📖',
    difficulty = 'beginner'
  } = options;

  return `import { BaseStory } from '../../services/story/BaseStory.js';

/**
 * ${className} - Generated Story Module
 * ${description}
 */
export class ${className} extends BaseStory {
  async customInitialize() {
    const storyData = {
      metadata: {
        id: '${storyId}',
        name: '${name}',
        description: '${description}',
        order: ${order},
        difficulty: '${difficulty}',
        estimatedDuration: 12, // minutes
        color: '${color}',
        icon: '${icon}'
      },

      lessons: this.createLessons(),
      characters: this.generateCharacters(),
      themes: this.generateThemes(),
      games: this.generateGames(),
      audioConfig: this.generateAudioConfig(),
      unlockRequirements: this.getUnlockRequirements()
    };

    await this.initializeWithData(storyData);
  }

  createLessons() {
    return [
      // TODO: Add lesson data
    ];
  }

  generateCharacters() {
    return {
      // TODO: Add character definitions
    };
  }

  generateThemes() {
    return {
      primary: {
        colors: {
          background: "#F3F4F6",
          primary: "${color}",
          secondary: "${color}80",
          accent: "#F59E0B",
          text: "#374151"
        }
      }
    };
  }

  generateGames() {
    return [
      // TODO: Add game configurations
    ];
  }

  generateAudioConfig() {
    return {
      basePath: "/assets/audio/lessons/${storyId}",
      files: {
        // TODO: Add audio file mappings
      }
    };
  }

  getUnlockRequirements() {
    return {
      // TODO: Add unlock requirements
    };
  }
}
`;
}

async function validateStory(storyId) {
  // TODO: Implement story validation logic
  console.log(`Validating ${storyId}...`);
}

async function validateAllStories() {
  // TODO: Implement all stories validation
  console.log('Validating all stories...');
}

async function generateAudioMap(storyId) {
  console.log(`Generating audio map for ${storyId}...`);
  // TODO: Scan audio files and generate mapping
}

async function generateCharacterList() {
  console.log('Generating character list...');
  // TODO: Extract all characters from all stories
}

async function generateLessonSummary() {
  console.log('Generating lesson summary...');
  // TODO: Create summary of all lessons
}

function showUsage() {
  console.log(`
📚 MiniDeutsch Story CLI Tool

Usage:
  node story-cli.js <command> [options]

Commands:
  create <storyId>     Create a new story module
  list                 List all available stories  
  status               Show system status
  validate [storyId]   Validate story(ies)
  generate <type>      Generate various resources

Examples:
  node story-cli.js create forest --name "Forest Adventure" --order 5
  node story-cli.js list
  node story-cli.js status
  node story-cli.js validate castle
  node story-cli.js generate audio-map castle

For more information, visit: https://github.com/your-repo/minideutsch
`);
}

// Main CLI Logic
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showUsage();
    return;
  }

  const command = args[0];
  const commandArgs = args.slice(1);

  if (commands[command]) {
    await commands[command](...commandArgs);
  } else {
    console.error(`❌ Unknown command: ${command}`);
    showUsage();
  }
}

// Run CLI if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ CLI Error:', error);
    process.exit(1);
  });
}

module.exports = { commands };