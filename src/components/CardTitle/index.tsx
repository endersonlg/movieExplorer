import { Title } from './styles'

type Props = {
  title: string
}

export function CardTitle({ title }: Props) {
  return <Title>{title}</Title>
}
