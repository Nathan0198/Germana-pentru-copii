import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import AudioService from '../services/AudioService';

/**
 * Wrapper component pentru elemente interactive cu suport audio bilingv
 * Pentru copii mici - fiecare element poate fi citit în ambele limbi
 */
const InteractiveElement = ({
  children,
  textKey,           // Key-ul pentru textul audio (ex: 'start_lesson')
  elementType = 'button', // Tipul elementului pentru help audio
  onPress,
  style,
  disabled = false,
  showLanguageToggle = true,
  defaultLanguage = 'de',
  audioOnMount = false,  // Redă audio automat la mount
  ...props
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    if (audioOnMount && textKey) {
      handleAudioPlay();
    }
  }, []);

  const handleAudioPlay = async () => {
    if (isPlaying || !textKey) return;
    
    setIsPlaying(true);
    try {
      await AudioService.playUIText(textKey, currentLanguage);
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handlePress = async () => {
    // Play button sound first
    await AudioService.playButtonSound();
    
    // Then play text audio if available
    if (textKey) {
      handleAudioPlay();
    }
    
    // Execute onPress callback
    if (onPress) {
      onPress();
    }
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'de' ? 'ro' : 'de';
    setCurrentLanguage(newLanguage);
    
    // Play audio in new language
    if (textKey) {
      setTimeout(() => handleAudioPlay(), 100);
    }
  };

  const handleHelpPress = async () => {
    await AudioService.playInteractiveHelp(elementType, currentLanguage);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || isPlaying}
        style={[
          styles.element,
          isPlaying && styles.playing,
          disabled && styles.disabled
        ]}
        activeOpacity={0.7}
        {...props}
      >
        {children}
        
        {/* Audio loading indicator */}
        {isPlaying && (
          <View style={styles.audioIndicator}>
            <Text style={styles.audioText}>🔊</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Language toggle and help buttons */}
      {(showLanguageToggle || textKey) && (
        <View style={styles.controls}>
          {/* Audio replay button */}
          {textKey && (
            <TouchableOpacity
              onPress={handleAudioPlay}
              style={[styles.controlButton, styles.audioButton]}
              disabled={isPlaying}
            >
              <Text style={styles.controlIcon}>🔊</Text>
            </TouchableOpacity>
          )}

          {/* Language toggle */}
          {showLanguageToggle && textKey && (
            <TouchableOpacity
              onPress={toggleLanguage}
              style={[styles.controlButton, styles.languageButton]}
            >
              <Text style={styles.languageText}>
                {currentLanguage.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )}

          {/* Help button */}
          <TouchableOpacity
            onPress={handleHelpPress}
            style={[styles.controlButton, styles.helpButton]}
          >
            <Text style={styles.controlIcon}>❓</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

/**
 * Componenta pentru text citibil (pentru copii care încep să citească)
 */
export const ReadableText = ({ 
  text, 
  textKey, 
  language = 'de',
  style,
  ...props 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      if (textKey) {
        await AudioService.playUIText(textKey, language);
      } else if (text) {
        // Fallback pentru text direct
        await AudioService.playEmmaVoice(text, language);
      }
    } catch (error) {
      console.error('Error playing text audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Text style={[styles.readableText, style, isPlaying && styles.playingText]} {...props}>
        {text} {isPlaying && '🔊'}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * Componenta pentru imagini interactive cu audio
 */
export const InteractiveImage = ({
  source,
  alt,
  textKey,
  language = 'de',
  onPress,
  style,
  ...props
}) => {
  return (
    <InteractiveElement
      textKey={textKey}
      elementType="image"
      onPress={onPress}
      style={style}
      defaultLanguage={language}
    >
      <Image source={source} alt={alt} {...props} />
    </InteractiveElement>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  element: {
    position: 'relative',
  },
  playing: {
    opacity: 0.8,
    backgroundColor: '#FFE5B4', // Light orange highlight
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  audioIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioText: {
    fontSize: 12,
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    gap: 8,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  audioButton: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  languageButton: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9800',
  },
  helpButton: {
    backgroundColor: '#F3E5F5',
    borderColor: '#9C27B0',
  },
  controlIcon: {
    fontSize: 16,
  },
  languageText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  readableText: {
    fontSize: 16,
    color: '#333',
    padding: 8,
    borderRadius: 4,
  },
  playingText: {
    backgroundColor: '#FFE5B4',
    color: '#D84315',
  },
});

export default InteractiveElement;
