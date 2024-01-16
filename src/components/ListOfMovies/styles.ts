import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 8px 16px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  margin-bottom: 16px;

  align-self: flex-start;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.RED_600};
`

export const GapItem = styled.View`
  margin: 0 8px;
`
