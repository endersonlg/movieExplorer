import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { Layout } from '../Layout'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = 'transparent'

  return (
    <NavigationContainer>
      <Layout>
        <AppRoutes />
      </Layout>
    </NavigationContainer>
  )
}
