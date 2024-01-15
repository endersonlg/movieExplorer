import 'react-native-get-random-values'

import { ThemeProvider } from 'styled-components/native'
import { useFonts } from 'expo-font'
import { AppProvider, UserProvider } from '@realm/react'
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import theme from './src/theme'
import { REALM_APP_ID } from '@env'

import { Layout } from './src/Layout'

import { Home } from './src/screens/Home'
import { SignIn } from './src/screens/SignIn'

import { Loading } from './src/components/Loading'
import { RealmProvider } from './src/libs/realm'
import { FavoriteMoviesProvider } from './src/context/favoriteMoviesContext'

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={'transparent'}
            translucent
          />

          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Layout>
                <FavoriteMoviesProvider>
                  <Home />
                </FavoriteMoviesProvider>
              </Layout>
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
