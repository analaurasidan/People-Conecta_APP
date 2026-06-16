import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from '@/navigation/RootNavigator';
import { useAuthListener } from '@/hooks/useAuth';
import { fontFamily } from '@/tokens';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,  // 2 min
      retry: 1,
    },
  },
});

function AppInner() {
  useAuthListener();
  return <RootNavigator />;
}

export default function App() {
  // TODO: agregar fuentes cuando estén en assets/fonts/
  useEffect(() => {
    if (Platform.OS === 'web') {
      const styleId = 'people-conecta-web-typography';
      let style = document.getElementById(styleId);
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
      }
      style.textContent = `
        html, body, #root {
          font-family: ${fontFamily.bodyRegular};
        }
        button, input, textarea, select {
          font-family: ${fontFamily.bodyRegular};
        }
      `;
    }
    SplashScreen.hideAsync();
  }, []);

  const app = (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor="transparent" translucent />
          <AppInner />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );

  if (Platform.OS !== 'web') return app;

  return (
    <View style={styles.webStage}>
      <View style={styles.phoneFrame}>
        {app}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF3F6',
    padding: 8,
  },
  phoneFrame: {
    width: '100%',
    maxWidth: 393,
    height: '100%',
    maxHeight: 900,
    overflow: 'hidden',
    backgroundColor: '#FDFAF5',
    borderWidth: 8,
    borderColor: '#1D1D22',
    borderRadius: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 36,
  },
});
