import React from 'react';
import { ActivityIndicator } from 'react-native';

import { LoadingContainer } from './styles';

export default function Loading() {
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color="#EE4D64" />
    </LoadingContainer>
  );
}
