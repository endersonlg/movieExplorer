import React from 'react'
import { Container, FavoriteTouch, Image } from './styles'
import { useTheme } from 'styled-components'
import { Heart } from 'phosphor-react-native'
import { Average } from '../Average'

type Props = {
  img: string
  title: string
  isFavorite: boolean
  voteAverage: number
  onHeartTouch: () => void
}

export function Poster({
  img,
  title,
  isFavorite,
  voteAverage,
  onHeartTouch,
}: Props) {
  const { COLORS } = useTheme()

  const heartWeight = isFavorite ? 'fill' : 'regular'

  return (
    <Container>
      <Image
        source={{
          uri: img,
        }}
        resizeMode="cover"
        alt={title}
      />
      <FavoriteTouch onPress={onHeartTouch}>
        <Heart size={32} color={COLORS.RED_600} weight={heartWeight} />
      </FavoriteTouch>

      <Average average={voteAverage} />
    </Container>
  )
}
