import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../screens/Home'
import { Favorites } from '../screens/Favorites'
import { useTheme } from 'styled-components'
import { Heart, Popcorn } from 'phosphor-react-native'

export function AppRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator()

  const { COLORS, FONT_SIZE } = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.GRAY_400,
        tabBarInactiveTintColor: COLORS.GRAY_600,
        tabBarLabelStyle: {
          fontSize: FONT_SIZE.SM,
          textAlign: 'center',
        },
        tabBarStyle: {
          backgroundColor: COLORS.DARK_50,
          borderTopWidth: 0,
          marginVertical: 8,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Popcorn size={24} color={color} />,
        }}
      />
      <Screen
        name="favorites"
        component={Favorites}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
    </Navigator>
  )
}
