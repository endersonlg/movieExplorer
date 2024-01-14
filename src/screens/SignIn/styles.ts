import styled from 'styled-components/native'

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 0 16px;

  justify-content: center;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  text-align: center;

  margin-bottom: 4px;
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  text-align: center;

  margin-bottom: 48px;
`
