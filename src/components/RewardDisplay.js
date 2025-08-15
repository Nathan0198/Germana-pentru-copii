import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RewardDisplay({ 
  stars = 0, 
  coins = 0, 
  streak = 0, 
  badges = [],
  style 
}) {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>⭐</Text>
              <Text style={styles.rewardValue}>{stars}</Text>
            </View>
            
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>🪙</Text>
              <Text style={styles.rewardValue}>{coins}</Text>
            </View>
            
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>🔥</Text>
              <Text style={styles.rewardValue}>{streak}</Text>
            </View>
          </View>
          
          {badges.length > 0 && (
            <View style={styles.badgesContainer}>
              <Text style={styles.badgesTitle}>Badge-uri:</Text>
              <View style={styles.badgesRow}>
                {badges.slice(0, 3).map((badge, index) => (
                  <Text key={index} style={styles.badge}>{badge.icon}</Text>
                ))}
                {badges.length > 3 && (
                  <Text style={styles.moreBadges}>+{badges.length - 3}</Text>
                )}
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    margin: 10,
  },
  gradient: {
    borderRadius: 15,
    padding: 15,
  },
  content: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  rewardItem: {
    alignItems: 'center',
    flex: 1,
  },
  rewardIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  rewardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  badgesContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  badgesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    fontSize: 20,
    marginHorizontal: 3,
  },
  moreBadges: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 5,
    fontWeight: '600',
  },
});
