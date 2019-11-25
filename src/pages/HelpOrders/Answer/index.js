import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Content, Header, Title, Time, Text } from './styles';

export default function Answer({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Container>
      <Content>
        <Header>
          <Title>PERGUNTA</Title>
          <Time>{helpOrder.createdAt}</Time>
        </Header>
        <Text>{helpOrder.question}</Text>
        {helpOrder.answer && (
          <>
            <Header>
              <Title>RESPOSTA</Title>
              <Time>{helpOrder.answer_at}</Time>
            </Header>
            <Text>{helpOrder.answer}</Text>
          </>
        )}
      </Content>
    </Container>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={24} color="#000000" />
    </TouchableOpacity>
  ),
});

Answer.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
