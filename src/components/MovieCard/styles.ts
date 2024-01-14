import styled from 'styled-components/native'

export const Container = styled.View`
  position: relative;
  width: 128px;
`

export const Poster = styled.Image`
  height: 160px;
  width: 100%;

  border-radius: 6px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  text-align: center;
`

export const Year = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  text-align: center;
`

export const FavoriteTouch = styled.TouchableOpacity`
  position: absolute;

  top: 2px;
  right: 2px;
`
