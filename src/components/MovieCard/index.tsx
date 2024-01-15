import { memo } from 'react'
import { Average } from '../Average'
import { Container, FavoriteTouch, Poster, Title, Year } from './styles'
import { useTheme } from 'styled-components'

import { Heart } from 'phosphor-react-native'

import { Movie } from '../../context/favoriteMoviesContext'
import { useFavoriteMovies } from '../../hooks/useFavoriteMovies'

type MovieWithFavorite = Movie & {
  isFavorite?: boolean
}

type Props = {
  movie: MovieWithFavorite
}

// eslint-disable-next-line react/display-name
export const MovieCard = memo(
  ({ movie }: Props) => {
    const { addFavorite, removeFavorite } = useFavoriteMovies()

    const { COLORS } = useTheme()

    const heartWeight = movie.isFavorite ? 'fill' : 'regular'

    // console.log('renderizou')

    // function addFavorite() {
    //   try {
    //     // realm.write(() => {
    //     //   realm.create(
    //     //     'Favorite',
    //     //     Favorite.generate({
    //     //       user_id: user.id,
    //     //       movie_id: movie.id,
    //     //       title: movie.title,
    //     //       img: movie.img,
    //     //       vote_average: movie.voteAverage,
    //     //       year: movie.year,
    //     //     }),
    //     //   )
    //     // })
    //     setIsChecked(true)
    //   } catch (e) {
    //     console.log(e)
    //     setIsChecked(false)
    //   }
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
      console.log('click')

      // if (movie.isFavorite) {
      //   startTransition(() => {
      //     removeFavorite(movie)
      //   })
      // } else {
      //   startTransition(() => {
      addFavorite(movie)
      //   })
      // }
    }

    // console.log('id', movie.id)

    return (
      <Container>
        <Poster
          source={{
            uri: movie.img,
          }}
          resizeMode="cover"
          alt="title"
        />
        <FavoriteTouch onPress={handleFavorite}>
          <Heart size={32} color={COLORS.RED_600} weight={heartWeight} />
        </FavoriteTouch>

        <Average average={movie.voteAverage} />

        <Title numberOfLines={2}>{movie.title}</Title>
        <Year>{movie.year}</Year>
      </Container>
    )
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.movie) === JSON.stringify(nextProps.movie)
  },
)
