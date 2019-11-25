import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${colors.backGroundPrimary};
  border-top-color: ${colors.backGroundPrimary};
`;

export const Logo = styled.Image`
  width: 36px;
  height: 18px;
  margin-right: 9px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.primary};
`;
