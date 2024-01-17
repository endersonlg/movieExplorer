import { memo } from 'react'

import { Container, Title, Year } from './styles'

import { MovieWithFavorite } from '../ListOfMovies'
import { Poster } from '../Poster'
import Animated, { SlideInRight } from 'react-native-reanimated'

const ContainerAnimated = Animated.createAnimatedComponent(Container)

type Props = {
  movie: MovieWithFavorite
  index: number
  onFavoriteClick: (movie: MovieWithFavorite) => void
}

// eslint-disable-next-line react/display-name
export const MovieCard = memo(
  ({ movie, onFavoriteClick, index }: Props) => {
    function handleFavorite() {
      onFavoriteClick(movie)
    }

    return (
      <ContainerAnimated entering={SlideInRight.delay(index * 100)}>
        <Poster
          img={movie.img}
          title={movie.title}
          isFavorite={movie.isFavorite}
          voteAverage={movie.voteAverage}
          onHeartTouch={handleFavorite}
        />
        <Title numberOfLines={2}>{movie.title}</Title>
        <Year>{new Date(movie.releaseDate).getFullYear()}</Year>
      </ContainerAnimated>
    )
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.movie) === JSON.stringify(nextProps.movie)
  },
)
