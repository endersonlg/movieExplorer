import React, { useState } from 'react'
import { Realm, useApp } from '@realm/react'
import { ArrowRight } from 'phosphor-react-native'

import background from '../../assets/splash.png'
import { Button } from '../../components/Button'

import { Container, Description, Title } from './styles'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { WEB_CLIENT_ID } from '@env'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp()

  async function handleGoogleSign() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken)

        await app.logIn(credentials)
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <Container source={background}>
      <Title>Movie Explorer</Title>
      <Description>
        Descubra filmes facilmente e obtenha informações rápidas.
      </Description>
      <Button
        title="Entrar com o Google"
        icon={ArrowRight}
        onPress={handleGoogleSign}
        isLoading={isAuthenticating}
      />
    </Container>
  )
}
