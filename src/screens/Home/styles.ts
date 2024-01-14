import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.DARK_100};

  margin: 4px 0;
`
