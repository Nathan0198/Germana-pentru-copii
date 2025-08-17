import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import AudioService from '../services/AudioService';
import ImageService from '../services/ImageService';

const { width } = Dimensions.get('window');

// Joc de tip Drag & Drop - Conectează cuvinte cu imagini
export const DragDropGame = ({ gameData, onComplete }) => {
  const [selectedWord, setSelectedWord] = React.useState(null);
  const [selectedTarget, setSelectedTarget] = React.useState(null);
  const [matches, setMatches] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [attempts, setAttempts] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = React.useState(false);

  // Folosim datele din gameData.items
  const items = gameData?.items || [];
  const totalItems = items.length;

  // Play introduction audio when component mounts
  React.useEffect(() => {
    // Debug - test ImageService
    console.log('🎮 DragDropGame: Testing ImageService...');
    console.log('🎮 Available images:', ImageService.getAvailableImages());
    
    // Test each target image specifically
    items.forEach(item => {
      const hasImage = ImageService.hasImage(item.target);
      console.log(`🎮 Target '${item.target}' has image: ${hasImage}`);
    });
    
    if (!hasPlayedIntro && gameData?.instructor === 'max') {
      // Play Max's instruction audio
      setTimeout(() => {
        AudioService.playLesson1Game(1, 'instruction', 'de');
        setHasPlayedIntro(true);
      }, 500);
    }
  }, [hasPlayedIntro, gameData?.instructor, items]);

  React.useEffect(() => {
    // Verifică dacă jocul este complet
    if (matches.length === totalItems && totalItems > 0) {
      setCompleted(true);
      const finalScore = Math.max(30, 100 - (attempts - totalItems) * 10);
      
      setTimeout(() => {
        Alert.alert(
          '🎉 Felicitări!',
          `Ai completat jocul!\nScor: ${finalScore}/100`,
          [
            {
              text: 'Continuă',
              onPress: () => onComplete && onComplete(finalScore)
            }
          ]
        );
      }, 500);
    }
  }, [matches, totalItems, attempts]);

  const handleWordSelect = (item, index) => {
    if (matches.some(m => m.wordIndex === index)) return; // Deja potrivit
    
    // Play vocabulary audio for the selected word
    playVocabularyAudio(item.text);
    
    setSelectedWord({ item, index });
    setSelectedTarget(null);
  };

  const playVocabularyAudio = (text) => {
    // Map text to audio file names
    const audioMap = {
      'Hallo': 'hallo',
      'Ich bin Björn': 'ich_bin',
      'die Familie': 'die_familie',
      'danke': 'danke'
    };
    
    const audioKey = audioMap[text];
    if (audioKey) {
      AudioService.playLesson1Vocabulary(audioKey, 'de');
    }
  };

  const handleTargetSelect = (targetKey) => {
    if (!selectedWord) return;
    if (matches.some(m => m.target === targetKey)) return; // Target deja folosit

    setAttempts(prev => prev + 1);

    // Verifică dacă este corect
    if (selectedWord.item.target === targetKey) {
      // Potrivire corectă!
      setMatches(prev => [...prev, {
        wordIndex: selectedWord.index,
        target: targetKey,
        correct: true
      }]);
      setScore(prev => prev + 10);
      
      // Feedback pozitiv
      Alert.alert('✅ Bravo!', selectedWord.item.feedback || 'Foarte bine!');
    } else {
      // Potrivire greșită
      Alert.alert('❌ Încearcă din nou!', 'Această potrivire nu este corectă.');
    }

    setSelectedWord(null);
    setSelectedTarget(null);
  };

  const isWordMatched = (index) => {
    return matches.some(m => m.wordIndex === index);
  };

  const isTargetMatched = (targetKey) => {
    return matches.some(m => m.target === targetKey);
  };

  return (
    <View style={styles.gameContainer}>
      {/* Max's large image header - bigger version */}
      <View style={styles.maxImageContainerLarge}>
        <Image 
          source={ImageService.getImage('max')} 
          style={styles.maxHeaderImageLarge}
          resizeMode="contain"
        />
        <Text style={styles.gameTitleOverlay}>{gameData.title || "Conectează cuvintele!"}</Text>
      </View>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Scor: {score}</Text>
        <Text style={styles.progressText}>{matches.length}/{totalItems}</Text>
      </View>

      <Text style={styles.instructions}>
        Apasă pe un cuvânt, apoi pe imaginea corespunzătoare!
      </Text>
      
      <View style={styles.dragDropArea}>
        <View style={styles.wordsSection}>
          <Text style={styles.sectionTitle}>Cuvinte:</Text>
          {items.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.wordItem,
                selectedWord?.index === index && styles.selectedItem,
                isWordMatched(index) && styles.matchedItem
              ]}
              onPress={() => handleWordSelect(item, index)}
              disabled={isWordMatched(index)}
            >
              <Text style={[
                styles.wordText,
                isWordMatched(index) && styles.matchedText
              ]}>
                {item.text}
              </Text>
              {isWordMatched(index) && <Text style={styles.checkMark}>✅</Text>}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.imageColumn}>
          <Text style={styles.sectionTitle}>Imagini:</Text>
          {items.map((item, index) => (
            <TouchableOpacity 
              key={`target_${index}`}
              style={[
                styles.imageTile,
                selectedTarget === item.target && styles.selectedTile,
                isTargetMatched(item.target) && styles.matchedTile
              ]}
              onPress={() => handleTargetSelect(item.target)}
              disabled={isTargetMatched(item.target)}
            >
              <Image 
                source={ImageService.getImage(item.target)} 
                style={styles.tileImage}
                resizeMode="cover"
              />
              {isTargetMatched(item.target) && (
                <View style={styles.checkMarkOverlay}>
                  <Text style={styles.checkMarkText}>✅</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {completed && (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>🎉 Joc completat!</Text>
        </View>
      )}
    </View>
  );
};

// Joc de memorie - Perechile română-germană
export const MemoryGame = ({ gameData, onComplete }) => {
  const [flippedCards, setFlippedCards] = React.useState([]);
  const [matchedPairs, setMatchedPairs] = React.useState([]);
  const [attempts, setAttempts] = React.useState(0);
  const [score, setScore] = React.useState(0);

  // Folosim datele din gameData.pairs
  const pairs = gameData?.pairs || [];
  
  // Creăm array-ul de cărți (fiecare pereche devine 2 cărți)
  const cards = React.useMemo(() => {
    const cardArray = [];
    pairs.forEach((pair, pairIndex) => {
      cardArray.push({ 
        id: `${pairIndex}_ro`, 
        text: pair.romanian, 
        type: 'romanian', 
        pairIndex,
        feedback: pair.feedback 
      });
      cardArray.push({ 
        id: `${pairIndex}_de`, 
        text: pair.german, 
        type: 'german', 
        pairIndex,
        feedback: pair.feedback 
      });
    });
    // Amestecăm cărțile
    return cardArray.sort(() => Math.random() - 0.5);
  }, [pairs]);

  const totalPairs = pairs.length;

  React.useEffect(() => {
    if (matchedPairs.length === totalPairs && totalPairs > 0) {
      const finalScore = Math.max(50, 100 - (attempts - totalPairs) * 5);
      setTimeout(() => {
        Alert.alert(
          '🎉 Felicitări!',
          `Ai găsit toate perechile!\nScor: ${finalScore}/100`,
          [
            {
              text: 'Continuă',
              onPress: () => onComplete && onComplete(finalScore)
            }
          ]
        );
      }, 500);
    }
  }, [matchedPairs, totalPairs, attempts]);

  const handleCardFlip = (cardIndex) => {
    const card = cards[cardIndex];
    
    // Nu poate apăsa pe cărti deja potrivite sau deja întoarse
    if (matchedPairs.includes(card.pairIndex) || flippedCards.includes(cardIndex)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setAttempts(prev => prev + 1);
      
      const [firstCardIndex, secondCardIndex] = newFlippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      // Verifică dacă formează o pereche
      if (firstCard.pairIndex === secondCard.pairIndex) {
        // Pereche corectă!
        setMatchedPairs(prev => [...prev, firstCard.pairIndex]);
        setScore(prev => prev + 10);
        setFlippedCards([]);
        
        setTimeout(() => {
          Alert.alert('✅ Bravo!', firstCard.feedback || 'Pereche corectă!');
        }, 300);
      } else {
        // Pereche greșită - întoarce cărțile după 1.5 secunde
        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const isCardFlipped = (cardIndex) => {
    const card = cards[cardIndex];
    return flippedCards.includes(cardIndex) || matchedPairs.includes(card.pairIndex);
  };

  const isCardMatched = (cardIndex) => {
    const card = cards[cardIndex];
    return matchedPairs.includes(card.pairIndex);
  };

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameTitle}>{gameData.title || "Găsește perechile!"}</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Scor: {score}</Text>
        <Text style={styles.progressText}>{matchedPairs.length}/{totalPairs}</Text>
      </View>

      <Text style={styles.instructions}>
        Apasă pe două cărți pentru a vedea dacă formează o pereche!
      </Text>
      
      <View style={styles.memoryGrid}>
        {cards.map((card, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.memoryCard,
              isCardMatched(index) && styles.matchedCard
            ]}
            onPress={() => handleCardFlip(index)}
            disabled={isCardMatched(index)}
          >
            <Text style={[
              styles.memoryCardText,
              card.type === 'romanian' && styles.romanianCardText,
              card.type === 'german' && styles.germanCardText
            ]}>
              {isCardFlipped(index) ? card.text : '❓'}
            </Text>
            {isCardMatched(index) && <Text style={styles.cardCheckMark}>✅</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.memoryStats}>
        Încercări: {attempts} | Perechi găsite: {matchedPairs.length}/{totalPairs}
      </Text>
    </View>
  );
};

// Speaking Challenge - Repetă după Emma
export const SpeakingChallenge = ({ gameData, onComplete }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState(0);
  const [isListening, setIsListening] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [completed, setCompleted] = React.useState([]);

  // Folosim datele din gameData.phrases
  const phrases = gameData?.phrases || [];
  const currentPhrase = phrases[currentPhraseIndex];
  const totalPhrases = phrases.length;

  const handlePlayAudio = () => {
    console.log('Playing audio for:', currentPhrase?.german);
    // Aici va fi integrarea cu AudioService pentru redarea audio-ului
    // AudioService.playCharacterVoice(gameData.instructor, currentPhrase.german, 'de');
  };

  const handleRecord = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Începe "înregistrarea" (simulată)
      console.log('Recording pronunciation attempt');
      
      // Simulăm feedback după 2 secunde
      setTimeout(() => {
        setIsListening(false);
        
        // Simulăm scor random între 70-100
        const phraseScore = Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 50;
        setScore(prev => prev + phraseScore);
        setCompleted(prev => [...prev, currentPhraseIndex]);
        
        const feedback = phraseScore >= 70 
          ? currentPhrase?.feedback || "Foarte bine! Pronunția ta este excelentă!"
          : "Bine! Încearcă să pronunți mai clar.";
          
        Alert.alert(
          phraseScore >= 70 ? '🎉 Excelent!' : '👍 Bine!',
          `${feedback}\nScor: ${phraseScore}/100`,
          [
            {
              text: 'Continuă',
              onPress: () => {
                if (currentPhraseIndex < totalPhrases - 1) {
                  setCurrentPhraseIndex(prev => prev + 1);
                } else {
                  // Jocul s-a terminat
                  const finalScore = Math.round(score / totalPhrases);
                  setTimeout(() => {
                    Alert.alert(
                      '🎤 Challenge completat!',
                      `Scor final: ${finalScore}/100`,
                      [
                        {
                          text: 'Termină',
                          onPress: () => onComplete && onComplete(finalScore)
                        }
                      ]
                    );
                  }, 300);
                }
              }
            }
          ]
        );
      }, 2000);
    }
  };

  if (!currentPhrase) {
    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>Nu există fraze disponibile</Text>
      </View>
    );
  }

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameTitle}>{gameData.title || "Repetă după Emma 🦆"}</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Scor: {Math.round(score / Math.max(1, completed.length))}</Text>
        <Text style={styles.progressText}>{currentPhraseIndex + 1}/{totalPhrases}</Text>
      </View>
      
      <View style={styles.speakingArea}>
        <View style={styles.characterContainer}>
          <Text style={styles.characterEmoji}>
            {gameData.instructor === 'emma' ? '🦆' : gameData.instructor === 'björn' ? '🐻' : '🐰'}
          </Text>
          <Text style={styles.characterName}>
            {gameData.instructor === 'emma' ? 'Emma' : gameData.instructor === 'björn' ? 'Björn' : 'Max'}
          </Text>
        </View>

        <View style={styles.wordDisplay}>
          <Text style={styles.currentWord}>{currentPhrase.german}</Text>
          <Text style={styles.wordTranslation}>{currentPhrase.romanian}</Text>
        </View>

        <TouchableOpacity 
          style={styles.audioButton}
          onPress={handlePlayAudio}
          disabled={isListening}
        >
          <Text style={styles.audioButtonText}>🔊 Ascultă</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.recordButton,
            isListening && styles.recordButtonActive
          ]}
          onPress={handleRecord}
        >
          <Text style={styles.recordButtonText}>
            {isListening ? '🔴 Se înregistrează...' : '🎤 Înregistrează-te'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.instructions}>
          {isListening 
            ? "Spune fraza în germană..." 
            : "Apasă butonul și repetă fraza!"
          }
        </Text>
      </View>

      <View style={styles.completedIndicator}>
        {phrases.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.phraseIndicator,
              completed.includes(index) && styles.phraseCompleted,
              index === currentPhraseIndex && styles.phraseCurrent
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Quick Choice - Alege răspunsul din 3 opțiuni
export const QuickChoice = ({ gameData, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [showResult, setShowResult] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [totalCorrect, setTotalCorrect] = React.useState(0);

  // Folosim datele din gameData.questions
  const questions = gameData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleOptionSelect = (optionIndex) => {
    if (showResult) return;
    
    setSelectedOption(optionIndex);
    setShowResult(true);

    const isCorrect = optionIndex === currentQuestion.correct;
    if (isCorrect) {
      setScore(prev => prev + 20);
      setTotalCorrect(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      // Următoarea întrebare
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Jocul s-a terminat
      const finalScore = Math.round((totalCorrect / totalQuestions) * 100);
      Alert.alert(
        '🎉 Joc completat!',
        `Răspunsuri corecte: ${totalCorrect}/${totalQuestions}\nScor: ${finalScore}/100`,
        [
          {
            text: 'Continuă',
            onPress: () => onComplete && onComplete(finalScore)
          }
        ]
      );
    }
  };

  if (!currentQuestion) {
    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>Nu există întrebări disponibile</Text>
      </View>
    );
  }

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameTitle}>{gameData.title || "Alege răspunsul corect"}</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Scor: {score}</Text>
        <Text style={styles.progressText}>{currentQuestionIndex + 1}/{totalQuestions}</Text>
      </View>
      
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {currentQuestion.question}
        </Text>
        {currentQuestion.questionSubtext && (
          <Text style={styles.questionSubtext}>
            {currentQuestion.questionSubtext}
          </Text>
        )}
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.option,
              selectedOption === index && styles.selectedOption,
              showResult && index === currentQuestion.correct && styles.correctOption,
              showResult && selectedOption === index && index !== currentQuestion.correct && styles.wrongOption
            ]}
            onPress={() => handleOptionSelect(index)}
            disabled={showResult}
          >
            <Text style={[
              styles.optionText,
              showResult && index === currentQuestion.correct && styles.correctOptionText,
              showResult && selectedOption === index && index !== currentQuestion.correct && styles.wrongOptionText
            ]}>
              {option}
            </Text>
            {showResult && index === currentQuestion.correct && (
              <Text style={styles.correctMark}>✅</Text>
            )}
            {showResult && selectedOption === index && index !== currentQuestion.correct && (
              <Text style={styles.wrongMark}>❌</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {showResult && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>
            {selectedOption === currentQuestion.correct 
              ? (currentQuestion.feedback || "Foarte bine! Răspuns corect!")
              : "Nu este corect. Încearcă să îți amintești!"
            }
          </Text>
        </View>
      )}

      {showResult && (
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.completeButtonText}>
            {currentQuestionIndex < totalQuestions - 1 ? 'Următoarea întrebare' : 'Completează jocul!'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Story Sequence - Aranjează imaginile în ordine
export const StorySequence = ({ gameData, onComplete }) => {
  const [currentOrder, setCurrentOrder] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [attempts, setAttempts] = React.useState(0);
  const [score, setScore] = React.useState(0);

  // Folosim datele din gameData.sequence
  const correctSequence = gameData?.sequence || [
    { order: 1, text: "Björn se trezește", emoji: "🛏️" },
    { order: 2, text: "Se spală pe dinți", emoji: "🦷" },
    { order: 3, text: "Ia micul dejun", emoji: "🥣" },
    { order: 4, text: "Merge la școală", emoji: "🚌" }
  ];

  // Amestecăm ordinea pentru a începe jocul
  React.useEffect(() => {
    const shuffled = [...correctSequence].sort(() => Math.random() - 0.5);
    setCurrentOrder(shuffled);
  }, []);

  const handleItemSelect = (item, index) => {
    if (selectedItems.length === 0) {
      // Primul element selectat
      setSelectedItems([{ item, index }]);
    } else if (selectedItems.length === 1) {
      // Al doilea element selectat - schimbă locurile
      const firstSelection = selectedItems[0];
      
      if (firstSelection.index === index) {
        // Același element - deselectează
        setSelectedItems([]);
        return;
      }

      // Schimbă elementele de loc
      const newOrder = [...currentOrder];
      [newOrder[firstSelection.index], newOrder[index]] = [newOrder[index], newOrder[firstSelection.index]];
      
      setCurrentOrder(newOrder);
      setSelectedItems([]);
      setAttempts(prev => prev + 1);
    }
  };

  const checkSequence = () => {
    const isCorrect = currentOrder.every((item, index) => item.order === index + 1);
    
    if (isCorrect) {
      const finalScore = Math.max(60, 100 - (attempts * 5));
      setScore(finalScore);
      
      Alert.alert(
        '🎉 Perfect!',
        `Ai aranjat povestea în ordinea corectă!\nScor: ${finalScore}/100`,
        [
          {
            text: 'Continuă',
            onPress: () => onComplete && onComplete(finalScore)
          }
        ]
      );
    } else {
      Alert.alert(
        '🤔 Încearcă din nou',
        'Ordinea nu este corectă. Apasă pe două elemente pentru a le schimba locurile.',
        [{ text: 'OK' }]
      );
    }
  };

  const resetSequence = () => {
    const shuffled = [...correctSequence].sort(() => Math.random() - 0.5);
    setCurrentOrder(shuffled);
    setSelectedItems([]);
    setAttempts(0);
  };

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameTitle}>{gameData.title || "Aranjează povestea în ordine"}</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Încercări: {attempts}</Text>
        <Text style={styles.progressText}>Secvența: {currentOrder.length}</Text>
      </View>
      
      <View style={styles.storyContainer}>
        <Text style={styles.storyTitle}>
          {gameData.story_title || "Björn se trezește dimineața"}
        </Text>
        
        <Text style={styles.instructions}>
          Apasă pe două elemente pentru a le schimba locurile!
        </Text>
        
        <ScrollView style={styles.sequenceArea} showsVerticalScrollIndicator={false}>
          {currentOrder.map((item, index) => (
            <TouchableOpacity 
              key={`${item.order}_${index}`}
              style={[
                styles.sequenceItem,
                selectedItems.some(s => s.index === index) && styles.selectedSequenceItem
              ]}
              onPress={() => handleItemSelect(item, index)}
            >
              <View style={styles.sequenceNumber}>
                <Text style={styles.sequenceNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.sequenceEmoji}>{item.emoji}</Text>
              <Text style={styles.sequenceText}>{item.text}</Text>
              {selectedItems.some(s => s.index === index) && (
                <Text style={styles.selectedMark}>👆</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.storyButtons}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetSequence}
          >
            <Text style={styles.resetButtonText}>🔄 Amestecă din nou</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.completeButton}
        onPress={checkSequence}
      >
        <Text style={styles.completeButtonText}>Verifică Ordinea</Text>
      </TouchableOpacity>
    </View>
  );
};

// Word Builder - Construiește cuvinte din litere
export const WordBuilder = ({ gameData, onComplete }) => {
  const [currentWord, setCurrentWord] = React.useState('');
  const [attempts, setAttempts] = React.useState(0);
  const [score, setScore] = React.useState(0);

  // Folosim datele din gameData
  const targetWord = gameData?.target_word || 'HALLO';
  const availableLetters = gameData?.available_letters || ['H', 'A', 'L', 'L', 'O', 'X', 'Y'];
  const feedback = gameData?.feedback || 'Foarte bine!';

  const handleLetterSelect = (letter, letterIndex) => {
    if (currentWord.length < targetWord.length) {
      setCurrentWord(prev => prev + letter);
    }
  };

  const handleLetterRemove = () => {
    setCurrentWord(prev => prev.slice(0, -1));
  };

  const handleVerifyWord = () => {
    setAttempts(prev => prev + 1);

    if (currentWord === targetWord) {
      // Cuvânt corect!
      const finalScore = Math.max(60, 100 - (attempts * 10));
      setScore(finalScore);
      
      Alert.alert(
        '🎉 Excelent!',
        `${feedback}\nAi construit cuvântul corect!\nScor: ${finalScore}/100`,
        [
          {
            text: 'Continuă',
            onPress: () => onComplete && onComplete(finalScore)
          }
        ]
      );
    } else {
      // Cuvânt greșit
      if (attempts >= 3) {
        // Prea multe încercări
        Alert.alert(
          '🤔 Să încercăm din nou',
          `Cuvântul corect era: ${targetWord}\nÎncearcă să îți amintești pentru data viitoare!`,
          [
            {
              text: 'Continuă',
              onPress: () => onComplete && onComplete(30)
            }
          ]
        );
      } else {
        Alert.alert(
          '❌ Nu este corect',
          `Încearcă din nou! Mai ai ${3 - attempts} încercări.`,
          [
            {
              text: 'OK',
              onPress: () => setCurrentWord('')
            }
          ]
        );
      }
    }
  };

  const handleReset = () => {
    setCurrentWord('');
  };

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameTitle}>{gameData.title || "Construiește cuvântul"}</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Încercări: {attempts}/3</Text>
        <Text style={styles.progressText}>{currentWord.length}/{targetWord.length}</Text>
      </View>
      
      <View style={styles.wordBuilderArea}>
        <View style={styles.targetContainer}>
          <Text style={styles.targetLabel}>Cuvântul țintă:</Text>
          <Text style={styles.targetWord}>
            🇩🇪 {targetWord} = 🇷🇴 {gameData.target_translation || 'Salut'}
          </Text>
        </View>

        <View style={styles.currentWordContainer}>
          <Text style={styles.currentWordLabel}>Cuvântul tău:</Text>
          <View style={styles.currentWordDisplay}>
            {targetWord.split('').map((targetLetter, index) => (
              <View key={index} style={[
                styles.letterSlot,
                currentWord[index] && styles.letterSlotFilled,
                currentWord[index] === targetLetter && styles.letterSlotCorrect
              ]}>
                <Text style={styles.letterSlotText}>
                  {currentWord[index] || '_'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.lettersContainer}>
          <Text style={styles.lettersLabel}>Alege literele:</Text>
          <View style={styles.lettersGrid}>
            {availableLetters.map((letter, index) => {
              const usedCount = currentWord.split('').filter(l => l === letter).length;
              const totalCount = targetWord.split('').filter(l => l === letter).length;
              const canUse = usedCount < totalCount;
              
              return (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.letterButton,
                    !canUse && styles.letterButtonDisabled
                  ]}
                  onPress={() => handleLetterSelect(letter, index)}
                  disabled={!canUse || currentWord.length >= targetWord.length}
                >
                  <Text style={[
                    styles.letterButtonText,
                    !canUse && styles.letterButtonTextDisabled
                  ]}>
                    {letter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.wordBuilderButtons}>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={handleLetterRemove}
            disabled={currentWord.length === 0}
          >
            <Text style={styles.removeButtonText}>← Șterge</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>🔄 Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.completeButton,
          currentWord.length === 0 && styles.completeButtonDisabled
        ]}
        onPress={handleVerifyWord}
        disabled={currentWord.length === 0}
      >
        <Text style={styles.completeButtonText}>Verifică Cuvântul</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  completeButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Shared styles for games
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  instructions: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: '#F39C12',
    backgroundColor: '#F39C12',
  },
  matchedItem: {
    backgroundColor: '#2ECC71',
    opacity: 0.7,
  },
  matchedText: {
    color: '#FFFFFF',
  },
  checkMark: {
    fontSize: 16,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  // Image column with fixed 4 tiles
  imageColumn: {
    width: 96,
    alignItems: 'center',
  },
  imageTile: {
    width: 96,
    height: 96,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  selectedTile: {
    borderColor: '#F39C12',
    borderWidth: 3,
  },
  matchedTile: {
    opacity: 0.7,
  },
  tileImage: {
    width: '100%',
    height: '100%',
  },
  checkMarkOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  checkMarkText: {
    fontSize: 16,
  },
  targetItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderWidth: 2,
    borderColor: '#ECF0F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedTarget: {
    borderColor: '#F39C12',
    backgroundColor: '#FEF9E7',
  },
  matchedTarget: {
    backgroundColor: '#D5DBDB',
    opacity: 0.7,
  },
  targetEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  targetText: {
    fontSize: 12,
    color: '#2C3E50',
    textAlign: 'center',
  },
  completedContainer: {
    backgroundColor: '#2ECC71',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Drag Drop styles
  dragDropArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  wordsSection: {
    flex: 0.45,
  },
  imagesSection: {
    flex: 0.45,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  wordItem: {
    backgroundColor: '#3498DB',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  wordText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageItem: {
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  imageEmoji: {
    fontSize: 30,
  },
  placeholderImages: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  // Memory Game styles
  memoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  memoryCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#3498DB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#2980B9',
    position: 'relative',
  },
  matchedCard: {
    backgroundColor: '#2ECC71',
    borderColor: '#27AE60',
  },
  memoryCardText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  romanianCardText: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    borderRadius: 5,
    padding: 2,
  },
  germanCardText: {
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
    borderRadius: 5,
    padding: 2,
  },
  cardCheckMark: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontSize: 12,
  },
  memoryStats: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 10,
  },

  // Speaking Challenge styles
  speakingArea: {
    alignItems: 'center',
    flex: 1,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  characterEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  wordDisplay: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  wordTranslation: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  audioButton: {
    backgroundColor: '#3498DB',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  audioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  recordButtonActive: {
    backgroundColor: '#C0392B',
    transform: [{ scale: 1.05 }],
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  phraseIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#BDC3C7',
    marginHorizontal: 4,
  },
  phraseCompleted: {
    backgroundColor: '#2ECC71',
  },
  phraseCurrent: {
    backgroundColor: '#3498DB',
    transform: [{ scale: 1.2 }],
  },

  // Quick Choice styles
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  questionSubtext: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ECF0F1',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedOption: {
    borderColor: '#3498DB',
    backgroundColor: '#EBF3FD',
  },
  correctOption: {
    borderColor: '#2ECC71',
    backgroundColor: '#E8F5E8',
  },
  wrongOption: {
    borderColor: '#E74C3C',
    backgroundColor: '#FDEBEB',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  correctOptionText: {
    color: '#27AE60',
  },
  wrongOptionText: {
    color: '#E74C3C',
  },
  correctMark: {
    position: 'absolute',
    right: 15,
    fontSize: 18,
  },
  wrongMark: {
    position: 'absolute',
    right: 15,
    fontSize: 18,
  },
  feedbackContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB',
  },
  feedbackText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Story Sequence styles
  storyContainer: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 15,
  },
  sequenceArea: {
    flex: 1,
    maxHeight: 400,
  },
  sequenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#ECF0F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  selectedSequenceItem: {
    borderColor: '#F39C12',
    backgroundColor: '#FEF9E7',
    transform: [{ scale: 1.02 }],
  },
  sequenceNumber: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sequenceNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sequenceEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  sequenceText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
    fontWeight: '500',
  },
  selectedMark: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 16,
  },
  storyButtons: {
    alignItems: 'center',
    marginVertical: 15,
  },

  // Word Builder styles
  wordBuilderArea: {
    flex: 1,
  },
  targetContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  targetLabel: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  targetWord: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  currentWordContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentWordLabel: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  currentWordDisplay: {
    flexDirection: 'row',
  },
  letterSlot: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 2,
    borderColor: '#ECF0F1',
  },
  letterSlotFilled: {
    borderColor: '#3498DB',
    backgroundColor: '#EBF3FD',
  },
  letterSlotCorrect: {
    borderColor: '#2ECC71',
    backgroundColor: '#E8F5E8',
  },
  letterSlotText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  lettersContainer: {
    marginBottom: 20,
  },
  lettersLabel: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lettersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letterButton: {
    width: 45,
    height: 45,
    backgroundColor: '#3498DB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  letterButtonDisabled: {
    backgroundColor: '#BDC3C7',
    opacity: 0.5,
  },
  letterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  letterButtonTextDisabled: {
    color: '#95A5A6',
  },
  wordBuilderButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  removeButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#95A5A6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeButtonDisabled: {
    backgroundColor: '#BDC3C7',
    opacity: 0.6,
  },
  
  // New styles for DragDropGame enhancements
  maxImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
  },
  maxImageContainerLarge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 15,
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  maxHeaderImage: {
    width: 120,
    height: 120,
  },
  maxHeaderImageLarge: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  gameTitleOverlay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 5,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  instructorImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  targetImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  targetImageGrid: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  checkMarkImage: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 3,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 24,
    marginBottom: 5,
  },
  placeholderSubtext: {
    fontSize: 8,
    color: '#6C757D',
    textAlign: 'center',
  },
});
