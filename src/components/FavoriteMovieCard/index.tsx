import dayjs from 'dayjs'
import {
  Container,
  Description,
  Information,
  ReleaseDate,
  Title,
} from './styles'
import { Movie } from '../../context/favoriteMoviesContext'
import { Poster } from '../Poster'

type FavoriteMovieCardProps = {
  movie: Movie
  onHeartTouch: (movie: Movie) => void
}

export function FavoriteMovieCard({
  movie,
  onHeartTouch,
}: FavoriteMovieCardProps) {
  function handleHeartTouch() {
    onHeartTouch(movie)
  }

  const dateFormatted = dayjs(new Date(movie.releaseDate)).format(
    'MMMM DD, YYYY',
  )

  return (
    <Container>
      <Poster
        img={movie.img}
        title={movie.title}
        isFavorite
        voteAverage={movie.voteAverage}
        onHeartTouch={handleHeartTouch}
      />
      <Information>
        <Title numberOfLines={1}>{movie.title}</Title>
        <ReleaseDate>{dateFormatted}</ReleaseDate>
        <Description>{movie.overview}</Description>
      </Information>
    </Container>
  )
}
