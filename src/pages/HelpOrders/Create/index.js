import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, Content, TextBox, SubmitButton } from './styles';

export default function Create({ navigation }) {
  const studentId = useSelector(state => state.auth.id);
  const [inputText, setInputText] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  async function handleSubmit() {
    const question = inputText.trim();

    if (question === '')
      Alert.alert(
        'Falha na validação',
        'O pedido de auxílio não pode estar em branco'
      );
    else {
      try {
        setButtonLoading(true);
        await api.post(`students/${studentId}/help-orders`, {
          question,
        });

        setButtonLoading(false);
        Alert.alert('Sucesso', 'Pedido de auxílio criado');
        navigation.navigate('HelpOrders', { refresh: true });
      } catch (error) {
        const message = error.response
          ? error.response.data.error
          : 'Erro ao enviar pedido de auxílio';
        Alert.alert('Falha no servidor', message);
        setButtonLoading(false);
      }
    }
  }

  return (
    <Container>
      <Content>
        <TextBox
          value={inputText}
          onChangeText={setInputText}
          placeholder="Inclua seu pedido de auxílio"
        />
        <SubmitButton loading={buttonLoading} onPress={handleSubmit}>
          Enviar pedido
        </SubmitButton>
      </Content>
    </Container>
  );
}

Create.navigationOptions = ({ navigation }) => ({
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

Create.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
