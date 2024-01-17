import React from 'react'
import { Container } from './styles'
import { FlatList, ScrollView } from 'react-native'

import { FavoriteMovieCard } from '../../components/FavoriteMovieCard'
import { Separator } from '../../components/Separator'
import { useQuery, useRealm } from '../../libs/realm'
import { Favorite } from '../../libs/realm/schemas/Favorite'
import { Movie } from '../../@types/movie'
import { useUser } from '@realm/react'
import Animated, {
  Layout,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated'
import { CardTitle } from '../../components/CardTitle'

export function Favorites() {
  const realm = useRealm()
  const favorite = useQuery(Favorite)
  const user = useUser()

  const favoriteMovies = favorite.filtered(
    `user_id = '${user.id}' SORT(created_at DESC)`,
  )

  const movies = favoriteMovies.map((movie) => ({
    id: movie.movie_id,
    img: movie.img,
    overview: movie.overview,
    releaseDate: movie.release_date,
    title: movie.title,
    voteAverage: movie.vote_average,
    isFavorite: true,
  }))

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

  return (
    <Container>
      <CardTitle title={'Favorites'} />
      <Animated.ScrollView>
        {movies.map((movie, index) => (
          <Animated.View
            entering={SlideInRight.delay(index * 100)}
            exiting={SlideOutLeft}
            layout={Layout.springify()}
            key={`favorite-${movie.id}`}
          >
            <FavoriteMovieCard movie={movie} onHeartTouch={removeFavorite} />
            {movies.length - 1 !== index && <Separator />}
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </Container>
  )
}
