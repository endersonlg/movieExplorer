import { useEffect, useState } from 'react'
import { api } from '../../libs/axios/api'
import { ListOfMovie } from '../../components/ListOfMovies'
import { Container, Separator } from './styles'
import { ScrollView, View } from 'react-native'
import { Movie } from '../../components/MovieCard'
import { Loading } from '../../components/Loading'

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
  }[]
}

interface ResponseMovieGenre {
  genres: {
    id: string
    name: string
  }[]
}

export function Home() {
  const [moviesPerCategory, setMoviesPerCategory] = useState<
    MoviesPerCategory[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

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
            year: new Date(movie.release_date).getFullYear(),
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

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {moviesPerCategory.map((moviesCategory, index) => (
          <View key={moviesCategory.name}>
            <ListOfMovie
              movies={moviesCategory.movies}
              title={moviesCategory.name}
            />
            {index !== moviesPerCategory.length - 1 && <Separator />}
          </View>
        ))}
      </ScrollView>
    </Container>
  )
}