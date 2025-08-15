import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LevelButton({ 
  level, 
  isUnlocked, 
  isCompleted, 
  progress, 
  onPress,
  style 
}) {
  const getButtonStyle = () => {
    if (isCompleted) {
      return [styles.button, styles.completed];
    } else if (isUnlocked) {
      return [styles.button, styles.unlocked];
    } else {
      return [styles.button, styles.locked];
    }
  };

  const getStars = () => {
    if (isCompleted) {
      return '⭐⭐⭐';
    } else if (progress > 0) {
      return '⭐'.repeat(Math.floor(progress / 33.33)) + '☆'.repeat(3 - Math.floor(progress / 33.33));
    }
    return '☆☆☆';
  };

  return (
    <TouchableOpacity 
      onPress={isUnlocked ? onPress : null}
      style={[getButtonStyle(), style]}
      disabled={!isUnlocked}
    >
      <View style={styles.content}>
        <Text style={styles.levelNumber}>{level}</Text>
        {isUnlocked && (
          <>
            <Text style={styles.stars}>{getStars()}</Text>
            {progress > 0 && (
              <Text style={styles.progress}>{Math.round(progress)}%</Text>
            )}
          </>
        )}
        {!isUnlocked && (
          <Text style={styles.lockIcon}>🔒</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  completed: {
    backgroundColor: '#4CAF50',
  },
  unlocked: {
    backgroundColor: '#2196F3',
  },
  locked: {
    backgroundColor: '#BDBDBD',
  },
  content: {
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stars: {
    fontSize: 12,
    marginTop: 2,
  },
  progress: {
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 2,
  },
  lockIcon: {
    fontSize: 24,
    marginTop: 5,
  },
});
