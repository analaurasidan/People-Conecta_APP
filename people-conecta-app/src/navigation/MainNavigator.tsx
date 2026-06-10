import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParams } from './types';
import { colors } from '@/tokens';
import ExploreScreen from '@/screens/explore/ExploreScreen';
import MyPlansScreen from '@/screens/plans/MyPlansScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import TabBarIcon from '@/components/atoms/TabBarIcon';

const Tab = createBottomTabNavigator<MainTabParams>();

function EmptyScreen() {
  return null;
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.neutral[200],
          height: 84,
          paddingBottom: 28,
          paddingTop: 8,
        },
        tabBarActiveTintColor:   colors.primary[500],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'DMSans-Medium',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.getParent()?.navigate('CreatePlan');
          },
        })}
        options={{
          title: 'Crear',
          tabBarLabel: '',
          tabBarIcon: () => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: colors.primary[500],
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -18,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.18,
                shadowRadius: 14,
                elevation: 6,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 32,
                  lineHeight: 32,
                  textAlign: 'center',
                  includeFontPadding: false,
                  transform: [{ translateY: -1 }],
                }}
              >
                +
              </Text>
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={0.9} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPlans"
        component={MyPlansScreen}
        options={{
          title: 'Mis planes',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Mi perfil',
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
