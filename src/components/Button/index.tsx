import React from 'react'
import { Container, Loading, Title } from './styles'
import { IconProps } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'

type IconBoxProps = (props: IconProps) => JSX.Element

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
  icon?: IconBoxProps | null
}

export function Button({
  title,
  isLoading = false,
  icon: Icon = null,
  ...rest
}: Props) {
  const { COLORS } = useTheme()

  return (
    <Container activeOpacity={0.7} disabled={isLoading} {...rest}>
      <Title>{title}</Title>
      <>
        {isLoading ? (
          <Loading size={24} />
        ) : (
          Icon && <Icon size={24} color={COLORS.GRAY_100} weight="bold" />
        )}
      </>
    </Container>
  )
}
