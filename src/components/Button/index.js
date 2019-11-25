import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { ButtonContainer, ButtonText } from './styles';

export default function Button({ loading, children, ...rest }) {
  return (
    <ButtonContainer {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </ButtonContainer>
  );
}

Button.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  loading: false,
};
