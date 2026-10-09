import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '../components/Icon';
import { colors } from '../constants/colors';
import { ColorsViewScreen } from '../screens/HomeScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { CaptureScreen } from '../screens/CaptureScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textTertiary,
  tabBarIconStyle: {
    marginTop: 6,
  },
};

const screenOptions = (icon: React.ComponentProps<typeof Icon>['name']) => ({
  headerTitleStyle: {
    fontWeight: '600' as const,
  },
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Icon name={icon} size={size} color={color} />
  ),
});

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={ColorsViewScreen}
        options={{
          title: 'Home',
          ...screenOptions('home'),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: 'Library',
          ...screenOptions('book-open'),
        }}
      />
      <Tab.Screen
        name="Capture"
        component={CaptureScreen}
        options={{
          title: 'Capture',
          ...screenOptions('camera'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          ...screenOptions('settings'),
        }}
      />
    </Tab.Navigator>
  );
}
