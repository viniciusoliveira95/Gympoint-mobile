import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  background: ${colors.backGroundPrimary};
`;

export const Content = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  align-self: stretch;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
  margin-top: 9px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  width: 100%;
  height: 45px;
  margin-top: 20px;
  padding: 0 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const SignInButton = styled(Button)`
  margin-top: 15px;
  align-self: stretch;
`;
