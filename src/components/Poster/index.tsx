import React from 'react'
import { Container, FavoriteTouch, Image } from './styles'
import { useTheme } from 'styled-components'
import { Heart } from 'phosphor-react-native'
import { Average } from '../Average'
import Animated, {
  BounceIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const FavoriteTouchAnimated = Animated.createAnimatedComponent(FavoriteTouch)

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
  const scale = useSharedValue(1)

  const animatedFavoriteTouch = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const heartWeight = isFavorite ? 'fill' : 'regular'

  function handlePress() {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1)
    })
    onHeartTouch()
  }

  return (
    <Container>
      <Image
        source={{
          uri: img,
        }}
        resizeMode="cover"
        alt={title}
      />
      <FavoriteTouchAnimated
        onPress={handlePress}
        entering={BounceIn}
        style={[animatedFavoriteTouch]}
      >
        <Heart size={32} color={COLORS.RED_600} weight={heartWeight} />
      </FavoriteTouchAnimated>

      <Average average={voteAverage} />
    </Container>
  )
}
