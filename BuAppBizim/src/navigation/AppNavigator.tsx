import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={() => null} />
      <Tab.Screen name="Profile" component={() => null} />
    </Tab.Navigator>
  );
} 