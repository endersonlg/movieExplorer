import { memo, useState } from 'react'
import { Average } from '../Average'
import { Container, FavoriteTouch, Poster, Title, Year } from './styles'
import { useTheme } from 'styled-components'

import { Heart } from 'phosphor-react-native'
import { Favorite } from '../../libs/realm/schemas/Favorite'
import { useRealm, useQuery } from '../../libs/realm'
import { useUser } from '@realm/react'

export interface Movie {
  id: string
  title: string
  voteAverage: number
  img: string
  year: number
}

type Props = {
  movie: Movie
}

// eslint-disable-next-line react/display-name
export const MovieCard = memo(
  ({ movie }: Props) => {
    const [isChecked, setIsChecked] = useState(false)

    const realm = useRealm()
    const favorite = useQuery('Favorite')
    const user = useUser()

    const { COLORS } = useTheme()

    const heartWeight = isChecked ? 'fill' : 'regular'

    console.log('renderizou')

    function addFavorite() {
      try {
        realm.write(() => {
          realm.create(
            'Favorite',
            Favorite.generate({
              user_id: user.id,
              movie_id: movie.id,
              title: movie.title,
              img: movie.img,
              vote_average: movie.voteAverage,
              year: movie.year,
            }),
          )
        })
        setIsChecked(true)
      } catch (e) {
        console.log(e)
        setIsChecked(false)
      }
    }

    function removeFavorite() {
      console.log('clicou')
      // const movieToDelete = favorite.filtered(
      //   `movie_id = ${movie.id}	&& user_id = ${user.id}`,
      // )
      // if (!movieToDelete) {
      //   return
      // }
      try {
        // realm.write(() => {
        //   realm.delete(movieToDelete)
        // })
        setIsChecked(false)
      } catch (err) {
        console.log(err)
        setIsChecked(true)
      }
    }

    function handleFavorite() {
      console.log('handle')
      if (isChecked) {
        console.log('isChecked')
        removeFavorite()
      } else {
        console.log('no Checked')
        addFavorite()
      }
    }

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
    return JSON.stringify(prevProps.movie) !== JSON.stringify(nextProps.movie)
  },
)
