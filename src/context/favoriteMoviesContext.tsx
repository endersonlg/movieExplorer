import { ReactNode, createContext, useState } from 'react'

export type Movie = {
  id: string
  title: string
  voteAverage: number
  img: string
  year: number
}

type FavoriteMoviesContextValues = {
  favoriteMovies: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (movie: Movie) => void
}

export const FavoriteMoviesContext = createContext(
  {} as FavoriteMoviesContextValues,
)

type FavoriteMoviesProviderProps = {
  children: ReactNode
}

export const FavoriteMoviesProvider = ({
  children,
}: FavoriteMoviesProviderProps) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

  function addFavorite(movie: Movie) {
    setFavoriteMovies((state) => [...state, movie])
  }

  function removeFavorite(movie: Movie) {
    setFavoriteMovies((state) =>
      state.filter((movieFavorite) => movieFavorite.id !== movie.id),
    )
  }

  return (
    <FavoriteMoviesContext.Provider
      value={{
        favoriteMovies,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  )
}
