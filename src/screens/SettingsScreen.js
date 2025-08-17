import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    musicEnabled: true,
    voiceSpeed: 'normal', // slow, normal, fast
    language: 'romanian', // romanian, german
    notifications: true,
    autoplay: false,
    difficultMode: false,
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    // Aici va fi logica pentru salvarea în AsyncStorage
  };

  const resetProgress = () => {
    Alert.alert(
      'Resetează Progresul',
      'Ești sigur că vrei să ștergi tot progresul? Această acțiune nu poate fi anulată.',
      [
        { text: 'Anulează', style: 'cancel' },
        { 
          text: 'Șterge Tot', 
          style: 'destructive',
          onPress: () => {
            // Logica pentru resetarea progresului
            Alert.alert('Progresul a fost resetat!');
          }
        }
      ]
    );
  };

  const exportData = () => {
    Alert.alert(
      'Export Date',
      'Datele au fost exportate cu succes! (Această funcționalitate va fi implementată)',
      [{ text: 'OK' }]
    );
  };

  const aboutApp = () => {
    Alert.alert(
      'Despre MiniDeutsch',
      'MiniDeutsch v1.0\n\nAplicație educațională pentru copii români din Germania.\n\nCreat cu ❤️ pentru învățare distractivă!',
      [{ text: 'OK' }]
    );
  };

  const voiceSpeeds = [
    { key: 'slow', label: 'Încet 🐌', description: 'Pentru începători' },
    { key: 'normal', label: 'Normal 🚶', description: 'Ritm standard' },
    { key: 'fast', label: 'Rapid 🏃', description: 'Pentru avansați' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F093FB', '#F5576C']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⚙️ Setări</Text>
          <Text style={styles.headerSubtitle}>
            Personalizează experiența de învățare
          </Text>
        </View>

        <ScrollView 
          style={styles.scrollContainer} 
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          bounces={true}
        >
          {/* Audio Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔊 Setări Audio</Text>
            
            <View style={styles.settingCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Sunete Aplicație</Text>
                  <Text style={styles.settingDescription}>
                    Activează/dezactivează toate sunetele
                  </Text>
                </View>
                <Switch
                  value={settings.soundEnabled}
                  onValueChange={(value) => updateSetting('soundEnabled', value)}
                  trackColor={{ false: '#BDC3C7', true: '#2ECC71' }}
                  thumbColor={settings.soundEnabled ? '#FFFFFF' : '#ECF0F1'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Muzică de Fundal</Text>
                  <Text style={styles.settingDescription}>
                    Muzică relaxantă în timpul lecțiilor
                  </Text>
                </View>
                <Switch
                  value={settings.musicEnabled}
                  onValueChange={(value) => updateSetting('musicEnabled', value)}
                  trackColor={{ false: '#BDC3C7', true: '#2ECC71' }}
                  thumbColor={settings.musicEnabled ? '#FFFFFF' : '#ECF0F1'}
                />
              </View>

              <TouchableOpacity
                style={styles.testButton}
                onPress={() => navigation.navigate('AudioTest')}
              >
                <Text style={styles.testButtonText}>🎵 Test Audio TTS</Text>
                <Text style={styles.testButtonDescription}>
                  Testează vocile personajelor
                </Text>
              </TouchableOpacity>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Redare Automată</Text>
                  <Text style={styles.settingDescription}>
                    Redă automat următoarea pronunție
                  </Text>
                </View>
                <Switch
                  value={settings.autoplay}
                  onValueChange={(value) => updateSetting('autoplay', value)}
                  trackColor={{ false: '#BDC3C7', true: '#2ECC71' }}
                  thumbColor={settings.autoplay ? '#FFFFFF' : '#ECF0F1'}
                />
              </View>
            </View>
          </View>

          {/* Voice Speed Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🗣️ Viteza Pronunției</Text>
            <View style={styles.settingCard}>
              {voiceSpeeds.map((speed) => (
                <TouchableOpacity
                  key={speed.key}
                  style={[
                    styles.speedOption,
                    settings.voiceSpeed === speed.key && styles.speedOptionSelected
                  ]}
                  onPress={() => updateSetting('voiceSpeed', speed.key)}
                >
                  <View style={styles.speedInfo}>
                    <Text style={[
                      styles.speedLabel,
                      settings.voiceSpeed === speed.key && styles.speedLabelSelected
                    ]}>
                      {speed.label}
                    </Text>
                    <Text style={[
                      styles.speedDescription,
                      settings.voiceSpeed === speed.key && styles.speedDescriptionSelected
                    ]}>
                      {speed.description}
                    </Text>
                  </View>
                  {settings.voiceSpeed === speed.key && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Learning Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📚 Setări Învățare</Text>
            
            <View style={styles.settingCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Notificări</Text>
                  <Text style={styles.settingDescription}>
                    Amintiri zilnice pentru învățare
                  </Text>
                </View>
                <Switch
                  value={settings.notifications}
                  onValueChange={(value) => updateSetting('notifications', value)}
                  trackColor={{ false: '#BDC3C7', true: '#2ECC71' }}
                  thumbColor={settings.notifications ? '#FFFFFF' : '#ECF0F1'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Mod Dificil</Text>
                  <Text style={styles.settingDescription}>
                    Întrebări mai provocatoare (8+ ani)
                  </Text>
                </View>
                <Switch
                  value={settings.difficultMode}
                  onValueChange={(value) => updateSetting('difficultMode', value)}
                  trackColor={{ false: '#BDC3C7', true: '#E74C3C' }}
                  thumbColor={settings.difficultMode ? '#FFFFFF' : '#ECF0F1'}
                />
              </View>
            </View>
          </View>

          {/* Data Management */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💾 Gestionare Date</Text>
            
            <View style={styles.settingCard}>
              <TouchableOpacity style={styles.actionButton} onPress={exportData}>
                <Text style={styles.actionIcon}>📤</Text>
                <View style={styles.actionInfo}>
                  <Text style={styles.actionLabel}>Export Progres</Text>
                  <Text style={styles.actionDescription}>
                    Salvează progresul pe dispozitiv
                  </Text>
                </View>
                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.dangerButton]} 
                onPress={resetProgress}
              >
                <Text style={styles.actionIcon}>🗑️</Text>
                <View style={styles.actionInfo}>
                  <Text style={[styles.actionLabel, styles.dangerText]}>
                    Resetează Progresul
                  </Text>
                  <Text style={styles.actionDescription}>
                    Șterge toate datele salvate
                  </Text>
                </View>
                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ℹ️ Informații</Text>
            
            <View style={styles.settingCard}>
              <TouchableOpacity style={styles.actionButton} onPress={aboutApp}>
                <Text style={styles.actionIcon}>📱</Text>
                <View style={styles.actionInfo}>
                  <Text style={styles.actionLabel}>Despre MiniDeutsch</Text>
                  <Text style={styles.actionDescription}>
                    Versiune, credite și informații legale
                  </Text>
                </View>
                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Characters Footer */}
          <View style={styles.charactersFooter}>
            <View style={styles.characterFooterItem}>
              <Text style={styles.characterFooterEmoji}>🐻</Text>
              <Text style={styles.characterFooterText}>
                Björn îți mulțumește că înveți!
              </Text>
            </View>
          </View>
        </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFE4E6',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  settingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  speedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  speedOptionSelected: {
    backgroundColor: '#E3F2FD',
  },
  speedInfo: {
    flex: 1,
  },
  speedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 3,
  },
  speedLabelSelected: {
    color: '#2196F3',
  },
  speedDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  speedDescriptionSelected: {
    color: '#1976D2',
  },
  checkmark: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  dangerButton: {
    backgroundColor: '#FFEBEE',
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  actionInfo: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 3,
  },
  dangerText: {
    color: '#E74C3C',
  },
  actionDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  actionArrow: {
    fontSize: 20,
    color: '#BDC3C7',
    fontWeight: 'bold',
  },
  testButton: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  testButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  testButtonDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  charactersFooter: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  characterFooterItem: {
    alignItems: 'center',
  },
  characterFooterEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  characterFooterText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '600',
  },
});
