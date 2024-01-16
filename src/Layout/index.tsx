import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container } from './styles'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const insets = useSafeAreaInsets()

  console.log('ola renderizou')

  const paddingTop = insets.top + 16

  return <Container style={{ paddingTop }}>{children}</Container>
}
