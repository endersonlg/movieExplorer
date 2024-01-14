import { FlatList } from 'react-native'
import { Movie, MovieCard } from '../MovieCard'
import { Container, Separator, Title } from './styles'

type Props = {
  movies: Movie[]
  title: string
}

export function ListOfMovie({ movies, title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>

      <FlatList
        data={movies}
        horizontal
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id}
      />
    </Container>
  )
}
