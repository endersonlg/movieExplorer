import React from 'react'
import { Container } from './styles'
import { FlatList } from 'react-native'
import { useFavoriteMovies } from '../../hooks/useFavoriteMovies'
import { FavoriteMovieCard } from '../../components/FavoriteMovieCard'
import { Separator } from '../../components/Separator'

export function Favorites() {
  const { favoriteMovies, removeFavorite } = useFavoriteMovies()

  return (
    <Container>
      <FlatList
        data={favoriteMovies}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <FavoriteMovieCard movie={item} onHeartTouch={removeFavorite} />
        )}
      />
    </Container>
  )
}
