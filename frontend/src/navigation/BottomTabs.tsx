import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import PlanTripScreen from '../screens/PlanTripScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const icons = {
  Home: require('../assets/icons/home.png'),
  Explore: require('../assets/icons/explore.png'),
  Chatbot: require('../assets/icons/chatbot.png'),
  PlanTrip: require('../assets/icons/plan.png'),
  Profile: require('../assets/icons/profile.png'),
};

const TAB_BAR_HEIGHT = 60;
const ICON_SIZE = 46;
const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_COUNT = 5;
const TAB_WIDTH = (SCREEN_WIDTH - 32) / TAB_COUNT; // 16 + 16 padding

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarIconStyle: styles.iconWrapper,

        tabBarIcon: ({ focused }) => {
          const icon = icons[route.name as keyof typeof icons];

          return (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Image source={icon} style={styles.iconImage} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="PlanTrip" component={PlanTripScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  /* FLOATING NAV BAR */
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: TAB_BAR_HEIGHT,
    borderRadius: TAB_BAR_HEIGHT / 2,
    backgroundColor: '#fff',

    paddingTop: 10,
    paddingBottom: 0,

    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
  },

  /* EACH TAB SLOT (EQUAL WIDTH) */
  tabItem: {
    width: TAB_WIDTH,
    height: TAB_BAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* REMOVE DEFAULT ICON OFFSET */
  iconWrapper: {
    marginTop: 0,
    marginBottom: 0,
  },

  /* ICON HOLDER */
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ACTIVE STATE */
  activeIcon: {
    backgroundColor: '#1B9CFC',
  },

  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
