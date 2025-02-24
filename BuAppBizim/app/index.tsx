import 'react-native-gesture-handler';
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from '../src/contexts/AuthContext';
import { useAuth } from '../src/hooks/auth/useAuth';
import AuthNavigator from '../src/navigation/AuthNavigator';
import AppNavigator from '../src/navigation/AppNavigator';
import { ThemeProvider } from 'styled-components/native';
import theme from '../src/theme';

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme ={theme}>
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
