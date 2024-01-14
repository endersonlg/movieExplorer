import { BlurMask, Canvas, Path, Skia } from '@shopify/react-native-skia'
import { AverageText, Container, MovieIs, MOVIE_IS } from './styles'
import { useTheme } from 'styled-components'

type Props = {
  average: number
}

const CHECK_SIZE = 32
const CHECK_STROKE = 3

const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2

export function Average({ average }: Props) {
  const { COLORS } = useTheme()
  const movieIs: MovieIs =
    average >= 7 ? 'good' : average >= 4 ? 'medium' : 'bad'

  const path = Skia.Path.Make()
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS)

  return (
    <Container size={CHECK_SIZE}>
      <Canvas
        style={{
          height: CHECK_SIZE * 2,
          width: CHECK_SIZE * 2,
          transform: [{ rotate: '-90deg' }],
        }}
      >
        <Path
          path={path}
          color={COLORS.GRAY_700}
          style={'stroke'}
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={MOVIE_IS[movieIs]}
          style={'stroke'}
          strokeWidth={CHECK_STROKE}
          start={0}
          end={average / 10}
        >
          <BlurMask blur={1} style={'solid'} />
        </Path>
      </Canvas>
      <AverageText movieIs={movieIs}>{average.toFixed(1)}</AverageText>
    </Container>
  )
}
