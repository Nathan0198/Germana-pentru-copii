import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import GermanMapScreen from '../screens/GermanMapScreen';
import MathLevelsScreen from '../screens/MathLevelsScreen';
import DetailedLessonScreen from '../screens/DetailedLessonScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ZoneLessonsScreen from '../screens/ZoneLessonsScreen';
import AudioTestScreen from '../screens/AudioTestScreen';
import StoryModulesScreen from '../screens/StoryModulesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator pentru ecranele principale
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Acasă',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="German"
        component={GermanMapScreen}
        options={{
          title: 'Germană',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🇩🇪</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Math"
        component={MathLevelsScreen}
        options={{
          title: 'Matematică',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🔢</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator principal
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8B4513',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Tab Navigator ca ecran principal */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        
        {/* Ecranele pentru lecții */}
        <Stack.Screen
          name="ZoneLessons"
          component={ZoneLessonsScreen}
          options={({ route }) => ({
            title: route.params?.zoneName || 'Lecții',
            headerBackTitle: 'Înapoi',
          })}
        />
        
        <Stack.Screen
          name="DetailedLesson"
          component={DetailedLessonScreen}
          options={({ route }) => ({
            title: `Lecția ${route.params?.lessonId || ''}`,
            headerBackTitle: 'Lecții',
          })}
        />
        
        {/* Ecrane suplimentare */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Setări',
            headerBackTitle: 'Profil',
          }}
        />
        
        <Stack.Screen
          name="AudioTest"
          component={AudioTestScreen}
          options={{
            title: 'Test Audio TTS',
            headerBackTitle: 'Setări',
          }}
        />
        
        <Stack.Screen
          name="StoryModules"
          component={StoryModulesScreen}
          options={{
            title: '📚 Story Modules',
            headerBackTitle: 'Home',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export pentru utilizare în App.js
export { AppNavigator };
