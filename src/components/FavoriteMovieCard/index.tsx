import dayjs from 'dayjs'
import {
  Container,
  Description,
  Information,
  ReleaseDate,
  Title,
} from './styles'

import { Poster } from '../Poster'
import { Movie } from '../../@types/movie'

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

  if (movie.voteAverage?.toFixed(1) === undefined) {
    console.log(movie.title)
  }

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
