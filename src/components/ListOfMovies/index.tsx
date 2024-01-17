import { FlatList, useWindowDimensions } from 'react-native'
import { MovieCard } from '../MovieCard'
import { GapItem } from './styles'
import { useUser } from '@realm/react'
import { Favorite } from '../../libs/realm/schemas/Favorite'
import { useRealm, useQuery } from '../../libs/realm'
import { Movie } from '../../@types/movie'
import { CardTitle } from '../CardTitle'
import Animated, { FadeInUp } from 'react-native-reanimated'

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
  const realm = useRealm()
  const favorite = useQuery(Favorite)
  const user = useUser()

  const { width } = useWindowDimensions()

  const favoriteMovies = favorite.filtered(`user_id = '${user.id}'`)

  const moviesAdjusted = movies.map((movie) => ({
    ...movie,
    isFavorite: favoriteMovies.some(
      (favoriteMovie) => favoriteMovie.movie_id === movie.id,
    ),
  }))

  function addFavorite(movie: Movie) {
    try {
      realm.write(() => {
        realm.create(
          'Favorite',
          Favorite.generate({
            user_id: user.id,
            movie_id: movie.id,
            title: movie.title,
            overview: movie.overview,
            img: movie.img,
            vote_average: movie.voteAverage,
            release_date: movie.releaseDate,
          }),
        )
      })
    } catch (err) {
      console.log('aqui')
      console.log(err)
    }
  }

  function removeFavorite(movie: Movie) {
    const movieRealm = favoriteMovies.find(
      (favoriteMovie) => favoriteMovie.movie_id === movie.id,
    )
    if (movieRealm) {
      try {
        realm.write(() => {
          realm.delete(movieRealm)
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  function handleHeartClick(movie: MovieWithFavorite) {
    try {
      if (movie.isFavorite) {
        removeFavorite(movie)
      } else {
        addFavorite(movie)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const windowSize = Math.ceil(width / MOVIE_CARD_WIDTH)

  return (
    <Animated.View entering={FadeInUp.delay(100)}>
      <CardTitle title={title} />

      <FlatList
        data={moviesAdjusted}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <GapItem />}
        renderItem={({ item, index }) => (
          <MovieCard
            movie={item}
            onFavoriteClick={handleHeartClick}
            index={index}
          />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={windowSize}
        windowSize={windowSize}
        maxToRenderPerBatch={windowSize}
      />
    </Animated.View>
  )
}
