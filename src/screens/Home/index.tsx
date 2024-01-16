import { useEffect, useState } from 'react'
import { api } from '../../libs/axios/api'
import { ListOfMovie } from '../../components/ListOfMovies'
import { Container } from './styles'
import { FlatList, useWindowDimensions } from 'react-native'

import { Loading } from '../../components/Loading'
import { Movie } from '../../context/favoriteMoviesContext'
import { Separator } from '../../components/Separator'

interface MoviesPerCategory {
  name: string
  movies: Movie[]
}

interface ResponseMovie {
  page: string
  results: {
    id: number
    title: string
    vote_average: number
    poster_path: string
    release_date: string
    overview: string
  }[]
}

interface ResponseMovieGenre {
  genres: {
    id: string
    name: string
  }[]
}

async function loadByGenre(genre: string) {
  const { data } = await api.get<ResponseMovie>(
    `/discover/movie?with_genres=${genre}`,
  )

  return data.results
}

async function loadPopular() {
  const { data } = await api.get<ResponseMovie>('/movie/popular')

  return data.results
}

export function Home() {
  const [moviesPerCategory, setMoviesPerCategory] = useState<
    MoviesPerCategory[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  const { height } = useWindowDimensions()

  useEffect(() => {
    async function load() {
      try {
        const {
          data: { genres },
        } = await api.get<ResponseMovieGenre>(
          '/genre/movie/list?language=pt-BR',
        )

        const responses = await Promise.all([
          loadPopular(),
          ...genres.map((genre) => loadByGenre(genre.id)),
        ])

        const categories = ['Popular', ...genres.map((genre) => genre.name)]

        const moviesPerCategory = responses.map((movieCategory, index) => ({
          name: categories[index],
          movies: movieCategory.map((movie) => ({
            id: String(movie.id),
            title: movie.title,
            voteAverage: movie.vote_average,
            img: `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`,
            releaseDate: movie.release_date,
            overview: movie.overview,
          })),
        }))

        setMoviesPerCategory(moviesPerCategory)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const windowSize = Math.ceil(height / 300)

  return (
    <Container>
      <FlatList
        data={moviesPerCategory}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <ListOfMovie movies={item.movies} title={item.name} key={item.name} />
        )}
        initialNumToRender={windowSize}
        windowSize={windowSize}
        maxToRenderPerBatch={windowSize}
      />
    </Container>
  )
}
