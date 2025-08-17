import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userName, setUserName] = useState('Copilul Meu');
  const [userAge, setUserAge] = useState('5');
  const [tempName, setTempName] = useState(userName);
  const [tempAge, setTempAge] = useState(userAge);

  // Placeholder data - va fi înlocuit cu date reale din AsyncStorage
  const profileData = {
    totalStars: 0,
    germanProgress: {
      completedLessons: 0,
      totalLessons: 200,
      currentZone: 1,
      stars: 0,
      badges: [],
    },
    mathProgress: {
      completedExercises: 0,
      totalExercises: 150,
      currentLevel: 1,
      stars: 0,
      badges: [],
    },
    streak: 0,
    weeklyStats: {
      lessonsThisWeek: 0,
      exercisesThisWeek: 0,
      starsThisWeek: 0,
    },
    achievements: [],
  };

  const badges = [
    { id: 1, name: 'Primul Pas', emoji: '👶', description: 'Prima lecție completă', earned: false },
    { id: 2, name: 'Vorbitor', emoji: '🗣️', description: '10 lecții de pronunție', earned: false },
    { id: 3, name: 'Matematician', emoji: '🔢', description: '25 exerciții matematică', earned: false },
    { id: 4, name: 'Stelist', emoji: '⭐', description: '50 stele câștigate', earned: false },
    { id: 5, name: 'Explorător', emoji: '🗺️', description: 'O zonă completă', earned: false },
    { id: 6, name: 'Perseverent', emoji: '🔥', description: '7 zile consecutiv', earned: false },
  ];

  const handleSaveProfile = () => {
    setUserName(tempName);
    setUserAge(tempAge);
    setShowEditModal(false);
    // Aici va fi logica pentru salvarea în AsyncStorage
  };

  const calculateGermanProgress = () => {
    return (profileData.germanProgress.completedLessons / profileData.germanProgress.totalLessons) * 100;
  };

  const calculateMathProgress = () => {
    return (profileData.mathProgress.completedExercises / profileData.mathProgress.totalExercises) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>👤 Profilul Meu</Text>
        </View>

        <ScrollView 
          style={styles.scrollContainer} 
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          bounces={true}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>🧒</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userAge}>{userAge} ani</Text>
                <Text style={styles.userLevel}>Începător</Text>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => {
                  setTempName(userName);
                  setTempAge(userAge);
                  setShowEditModal(true);
                }}
              >
                <Text style={styles.editButtonText}>✏️</Text>
              </TouchableOpacity>
            </View>

            {/* Streak Counter */}
            <View style={styles.streakContainer}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <View style={styles.streakInfo}>
                <Text style={styles.streakNumber}>{profileData.streak}</Text>
                <Text style={styles.streakLabel}>zile consecutive</Text>
              </View>
              <Text style={styles.totalStars}>⭐ {profileData.totalStars}</Text>
            </View>
          </View>

          {/* Progress Overview */}
          <View style={styles.progressSection}>
            <Text style={styles.sectionTitle}>📊 Progresul Meu</Text>
            
            {/* German Progress */}
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>📚 Germană</Text>
                <Text style={styles.progressPercentage}>
                  {Math.round(calculateGermanProgress())}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    styles.germanProgress,
                    { width: `${calculateGermanProgress()}%` }
                  ]} 
                />
              </View>
              <View style={styles.progressStats}>
                <Text style={styles.progressStat}>
                  {profileData.germanProgress.completedLessons}/{profileData.germanProgress.totalLessons} lecții
                </Text>
                <Text style={styles.progressStat}>
                  Zona {profileData.germanProgress.currentZone}/8
                </Text>
              </View>
            </View>

            {/* Math Progress */}
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>🔢 Matematică</Text>
                <Text style={styles.progressPercentage}>
                  {Math.round(calculateMathProgress())}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    styles.mathProgress,
                    { width: `${calculateMathProgress()}%` }
                  ]} 
                />
              </View>
              <View style={styles.progressStats}>
                <Text style={styles.progressStat}>
                  {profileData.mathProgress.completedExercises}/{profileData.mathProgress.totalExercises} exerciții
                </Text>
                <Text style={styles.progressStat}>
                  Nivelul {profileData.mathProgress.currentLevel}/3
                </Text>
              </View>
            </View>
          </View>

          {/* Weekly Stats */}
          <View style={styles.weeklySection}>
            <Text style={styles.sectionTitle}>📅 Această Săptămână</Text>
            <View style={styles.weeklyStats}>
              <View style={styles.weeklyStat}>
                <Text style={styles.weeklyNumber}>{profileData.weeklyStats.lessonsThisWeek}</Text>
                <Text style={styles.weeklyLabel}>Lecții</Text>
              </View>
              <View style={styles.weeklyStat}>
                <Text style={styles.weeklyNumber}>{profileData.weeklyStats.exercisesThisWeek}</Text>
                <Text style={styles.weeklyLabel}>Exerciții</Text>
              </View>
              <View style={styles.weeklyStat}>
                <Text style={styles.weeklyNumber}>{profileData.weeklyStats.starsThisWeek}</Text>
                <Text style={styles.weeklyLabel}>Stele</Text>
              </View>
            </View>
          </View>

          {/* Badges Section */}
          <View style={styles.badgesSection}>
            <Text style={styles.sectionTitle}>🏆 Badge-urile Mele</Text>
            <View style={styles.badgesGrid}>
              {badges.map((badge) => (
                <View 
                  key={badge.id} 
                  style={[
                    styles.badgeCard,
                    !badge.earned && styles.badgeCardLocked
                  ]}
                >
                  <Text style={[
                    styles.badgeEmoji,
                    !badge.earned && styles.badgeEmojiLocked
                  ]}>
                    {badge.earned ? badge.emoji : '🔒'}
                  </Text>
                  <Text style={[
                    styles.badgeName,
                    !badge.earned && styles.badgeNameLocked
                  ]}>
                    {badge.name}
                  </Text>
                  <Text style={[
                    styles.badgeDescription,
                    !badge.earned && styles.badgeDescriptionLocked
                  ]}>
                    {badge.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Edit Profile Modal */}
        <Modal
          visible={showEditModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editează Profilul</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nume:</Text>
                <TextInput
                  style={styles.textInput}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Numele copilului"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Vârsta:</Text>
                <TextInput
                  style={styles.textInput}
                  value={tempAge}
                  onChangeText={setTempAge}
                  placeholder="5"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setShowEditModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Anulează</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveButtonText}>Salvează</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    fontSize: 30,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  userAge: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 2,
  },
  userLevel: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
    marginTop: 2,
  },
  editButton: {
    padding: 10,
  },
  editButtonText: {
    fontSize: 20,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F39C12',
    borderRadius: 15,
    padding: 15,
  },
  streakEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  streakLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  totalStars: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  germanProgress: {
    backgroundColor: '#E74C3C',
  },
  mathProgress: {
    backgroundColor: '#2ECC71',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStat: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  weeklySection: {
    marginBottom: 20,
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    paddingVertical: 20,
  },
  weeklyStat: {
    alignItems: 'center',
  },
  weeklyNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  weeklyLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  badgesSection: {
    marginBottom: 30,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  badgeCardLocked: {
    opacity: 0.6,
  },
  badgeEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  badgeEmojiLocked: {
    opacity: 0.5,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 5,
  },
  badgeNameLocked: {
    color: '#95A5A6',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  badgeDescriptionLocked: {
    color: '#BDC3C7',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 5,
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#95A5A6',
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3498DB',
    borderRadius: 10,
    padding: 12,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
