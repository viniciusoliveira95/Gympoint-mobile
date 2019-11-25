import React from 'react';

import logo from '~/assets/logo.png';
import { Container, Logo, Title } from './styles';

export default function Header() {
  return (
    <Container>
      <Logo source={logo} />
      <Title>GYMPOINT</Title>
    </Container>
  );
}
