import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';
import DestinationScreen from '../screens/DestinationScreen';

export type RootStackParamList = {
  Tabs: undefined;
  Destination: { destinationId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Bottom Tab Navigator */}
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
      />

      {/* Destination Details Screen */}
      <Stack.Screen
        name="Destination"
        component={DestinationScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
