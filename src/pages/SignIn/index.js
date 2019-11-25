import React, { useState } from 'react';
import { Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import { Container, Content, Input, Title, SignInButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [stundentId, setStudentId] = useState('');
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    if (stundentId.length === 0)
      Alert.alert('Falha na validação', 'O campo ID deve ser preenchido');
    else {
      dispatch(signInRequest(stundentId));
    }
  }

  return (
    <Container>
      <Content>
        <Image source={logo} />
        <Title>GYMPOINT</Title>
        <Input
          value={stundentId}
          onChangeText={setStudentId}
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SignInButton onPress={handleSubmit} loading={loading}>
          Entrar no sistema
        </SignInButton>
      </Content>
    </Container>
  );
}
