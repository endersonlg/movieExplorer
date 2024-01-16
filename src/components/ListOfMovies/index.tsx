import { FlatList, useWindowDimensions } from 'react-native'
import { MovieCard } from '../MovieCard'
import { Container, GapItem, Title } from './styles'
import { useFavoriteMovies } from '../../hooks/useFavoriteMovies'
import { Movie } from '../../context/favoriteMoviesContext'

type Props = {
  movies: Movie[]
  title: string
}

export type MovieWithFavorite = Movie & {
  isFavorite: boolean
}

const MOVIE_CARD_WIDTH = 128

// eslint-disable-next-line react/display-name
export function ListOfMovie({ movies, title }: Props) {
  const { addFavorite, removeFavorite, favoriteMovies } = useFavoriteMovies()

  const { width } = useWindowDimensions()

  const moviesAdjusted = movies.map((movie) => ({
    ...movie,
    isFavorite: favoriteMovies.some(
      (favoriteMovie) => favoriteMovie.id === movie.id,
    ),
  }))

  function handleHeartClick(movie: MovieWithFavorite) {
    if (movie.isFavorite) {
      removeFavorite(movie)
    } else {
      addFavorite(movie)
    }
  }

  const windowSize = Math.ceil(width / MOVIE_CARD_WIDTH)

  return (
    <Container>
      <Title>{title}</Title>

      <FlatList
        data={moviesAdjusted}
        horizontal
        ItemSeparatorComponent={() => <GapItem />}
        renderItem={({ item }) => (
          <MovieCard movie={item} onFavoriteClick={handleHeartClick} />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={windowSize}
        windowSize={windowSize}
        maxToRenderPerBatch={windowSize}
      />
    </Container>
  )
}
