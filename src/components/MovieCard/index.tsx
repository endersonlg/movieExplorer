import { memo } from 'react'

import { Container, Title, Year } from './styles'

import { MovieWithFavorite } from '../ListOfMovies'
import { Poster } from '../Poster'

type Props = {
  movie: MovieWithFavorite
  onFavoriteClick: (movie: MovieWithFavorite) => void
}

// eslint-disable-next-line react/display-name
export const MovieCard = memo(
  ({ movie, onFavoriteClick }: Props) => {
    // console.log('renderizou')

    // function addFavorite() {

    // }

    // function removeFavorite() {
    //   console.log('clicou')
    //   // const movieToDelete = favorite.filtered(
    //   //   `movie_id = ${movie.id}	&& user_id = ${user.id}`,
    //   // )
    //   // if (!movieToDelete) {
    //   //   return
    //   // }
    //   try {
    //     // realm.write(() => {
    //     //   realm.delete(movieToDelete)
    //     // })
    //     setIsChecked(false)
    //   } catch (err) {
    //     console.log(err)
    //     setIsChecked(true)
    //   }
    // }

    function handleFavorite() {
      onFavoriteClick(movie)
    }

    return (
      <Container>
        <Poster
          img={movie.img}
          title={movie.title}
          isFavorite={movie.isFavorite}
          voteAverage={movie.voteAverage}
          onHeartTouch={handleFavorite}
        />
        <Title numberOfLines={2}>{movie.title}</Title>
        <Year>{new Date(movie.releaseDate).getFullYear()}</Year>
      </Container>
    )
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.movie) === JSON.stringify(nextProps.movie)
  },
)
