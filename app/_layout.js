import { useCallback } from 'react';
import { AppStateStatus, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useAppState } from '../hooks/useAppState';
import { useOnlineManager } from '../hooks/useOnlineManager';

function onAppStateChange(status) {
  // React Query already supports in web browser refetch on window focus by default
  if(Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  useOnlineManager();
  useAppState(onAppStateChange);

  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack onLayout={onLayoutRootView} />
    </QueryClientProvider>
  )
}

export default Layout;