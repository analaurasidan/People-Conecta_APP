import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@/tokens';
import Step1NameCategory from './Step1NameCategory';
import Step2DatePlace from './Step2DatePlace';
import Step3Image from './Step3Image';
import Step4Review from './Step4Review';

export type CreatePlanStackParams = {
  Step1: undefined;
  Step2: { nombre: string; categoria: string; descripcion: string };
  Step3: { nombre: string; categoria: string; descripcion: string; zona: string; fecha: string; hora: string; cupoMax: number; esGratuito: boolean };
  Step4: { nombre: string; categoria: string; descripcion: string; zona: string; fecha: string; hora: string; cupoMax: number; esGratuito: boolean; fotoUrl?: string };
};

const Stack = createNativeStackNavigator<CreatePlanStackParams>();

export default function CreatePlanNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.primary[500],
        headerTitleStyle: { fontFamily: 'DMSans-SemiBold', color: colors.textPrimary },
      }}
    >
      <Stack.Screen name="Step1" component={Step1NameCategory} options={{ title: 'Nuevo plan · 1/4' }} />
      <Stack.Screen name="Step2" component={Step2DatePlace}    options={{ title: 'Nuevo plan · 2/4' }} />
      <Stack.Screen name="Step3" component={Step3Image}        options={{ title: 'Nuevo plan · 3/4' }} />
      <Stack.Screen name="Step4" component={Step4Review}       options={{ title: 'Revisar y publicar' }} />
    </Stack.Navigator>
  );
}
