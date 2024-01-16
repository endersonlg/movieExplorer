import { ReactNode, createContext, useState } from 'react'
import { useRealm } from '../libs/realm'
import { Favorite } from '../libs/realm/schemas/Favorite'
import { useUser } from '@realm/react'

export type Movie = {
  id: string
  title: string
  voteAverage: number
  img: string
  releaseDate: string
  overview: string
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

  const realm = useRealm()

  const user = useUser()

  async function addFavorite(movie: Movie) {
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
      setFavoriteMovies((state) => [...state, movie])
    } catch (e) {
      console.log(e)
    }
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
