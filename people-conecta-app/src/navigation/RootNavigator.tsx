import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from './types';
import { useAuthStore } from '@/store/authStore';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import PlanDetailScreen from '@/screens/explore/PlanDetailScreen';
import CreatePlanNavigator from '@/screens/create/CreatePlanNavigator';
import ChatScreen from '@/screens/chat/ChatScreen';
import OnboardingScreen from '@/screens/auth/OnboardingScreen';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootNavigator() {
  const { session, profile, isLoading } = useAuthStore();

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  );

  const isAuthenticated = !!session && !!profile?.aprobado;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen
            name="PlanDetail"
            component={PlanDetailScreen}
            options={{ presentation: 'card' }}
          />
          <Stack.Screen
            name="CreatePlan"
            component={CreatePlanNavigator}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ presentation: 'card' }}
          />
          <Stack.Screen
            name="OnboardingPreview"
            component={OnboardingScreen}
            options={{ presentation: 'modal' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
