import { memo, useMemo } from 'react'
import { FlatList } from 'react-native'
import { MovieCard } from '../MovieCard'
import { Container, Separator, Title } from './styles'
import { useFavoriteMovies } from '../../hooks/useFavoriteMovies'
import { Movie } from '../../context/favoriteMoviesContext'

type Props = {
  movies: Movie[]
  title: string
}

// eslint-disable-next-line react/display-name
export const ListOfMovie = memo(
  ({ movies, title }: Props) => {
    const { favoriteMovies } = useFavoriteMovies()

    const moviesAdjusted = useMemo(
      () =>
        movies.map((movie) => ({
          ...movie,
          isFavorite: favoriteMovies.some(
            (favoriteMovie) => favoriteMovie.id === movie.id,
          ),
        })),
      [movies],
    )

    console.log('title', title)

    return (
      <Container>
        <Title>{title}</Title>

        <FlatList
          data={moviesAdjusted}
          horizontal
          debug
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: 128,
            offset: 128 * index,
            index,
          })}
          maxToRenderPerBatch={3}
          initialNumToRender={3}
        />
      </Container>
    )
  },
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.movies) === JSON.stringify(nextProps.movies) &&
      prevProps.title === nextProps.title
    )
  },
)
