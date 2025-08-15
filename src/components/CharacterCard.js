import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CharacterCard = ({ character, onPress, style }) => {
  if (!character) return null;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <LinearGradient
        colors={character.colors || ['#FFE4B5', '#FFA500']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.emoji}>{character.emoji}</Text>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.role}>{character.role}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 10,
    width: 150,
    height: 180,
  },
  gradient: {
    borderRadius: 20,
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 5,
  },
  role: {
    fontSize: 12,
    color: '#34495E',
    textAlign: 'center',
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },
});

export default CharacterCard;
