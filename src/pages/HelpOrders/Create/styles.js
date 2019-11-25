import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Content = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})``;

export const TextBox = styled.TextInput.attrs({
  multiline: true,
  textAlignVertical: 'top',
  placeholderTextColor: '#999999',
})`
  height: 300px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
