import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const ButtonContainer = styled(RectButton)`
  height: 45px;
  align-items: center;
  justify-content: center;
  background: ${colors.primary};
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
`;
