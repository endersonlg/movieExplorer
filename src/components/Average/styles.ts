import styled from 'styled-components/native'

import theme from '../../theme'

export const MOVIE_IS = {
  good: theme.COLORS.GREEN_600,
  medium: theme.COLORS.YELLOW_500,
  bad: theme.COLORS.RED_600,
} as const

export type MovieIs = keyof typeof MOVIE_IS

type ContainerProps = {
  size: number
}

export const Container = styled.View<ContainerProps>`
  position: absolute;
  top: ${({ size }) => 160 - size + 4}px;
  right: -4px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 999999px;

  background: ${({ theme }) => theme.COLORS.GRAY_800};
`

type AverageTextProps = {
  movieIs: MovieIs
}

export const AverageText = styled.Text<AverageTextProps>`
  position: absolute;

  color: ${({ movieIs }) => MOVIE_IS[movieIs]};
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`
