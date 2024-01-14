import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 48px;
  max-height: 48px;

  padding: 0 8px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GREEN_700};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  text-align: center;
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100,
}))``
