import { useContext } from 'react'
import { FavoriteMoviesContext } from '../context/favoriteMoviesContext'

export function useFavoriteMovies() {
  return useContext(FavoriteMoviesContext)
}
