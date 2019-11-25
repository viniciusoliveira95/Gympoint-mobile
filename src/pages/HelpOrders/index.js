import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Alert, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Loading from '~/components/Loading';

import {
  Container,
  Content,
  HelpOrderButton,
  FlatItem,
  OrderHeader,
  Answered,
  WithResponse,
  NoResponse,
  TimeText,
  OrderBodyText,
} from './styles';

export default function HelpOrders({ navigation }) {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [helpOrders, setHelpOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const studentId = useSelector(state => state.auth.id);

  const loadHelpOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`students/${studentId}/help-orders`, {
        params: {
          page: 1,
        },
      });

      const { helpOrderList, ...pageInfo } = response.data;

      console.tron.log(helpOrderList);

      helpOrderList.map(helpOrder => {
        helpOrder.createdAt = formatRelative(
          parseISO(helpOrder.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        );

        if (helpOrder.answer_at !== null)
          helpOrder.answer_at = formatRelative(
            parseISO(helpOrder.answer_at),
            new Date(),
            {
              locale: pt,
              addSuffix: true,
            }
          );

        return helpOrder;
      });

      setHelpOrders(helpOrderList);
      setPagination(pageInfo);
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Erro ao carregar Pedidos de auxílio';
      Alert.alert('Falha no servidor', message);
      setRefreshing(false);
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    setPage(1);
    setPagination({});
    loadHelpOrders();
  }, [loadHelpOrders, studentId, navigation]);

  async function loadMore() {
    if (!pagination.nextPage) return;

    try {
      const response = await api.get(`students/${studentId}/help-orders`, {
        params: {
          page: page + 1,
        },
      });

      const { helpOrderList, ...pageInfo } = response.data;

      helpOrderList.map(helpOrder => {
        helpOrder.createdAt = formatRelative(
          parseISO(helpOrder.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        );

        if (helpOrder.answer_at !== null)
          helpOrder.answer_at = formatRelative(
            parseISO(helpOrder.answer_at),
            new Date(),
            {
              locale: pt,
              addSuffix: true,
            }
          );

        return helpOrder;
      });

      setHelpOrders([...helpOrders, ...helpOrderList]);
      setPagination(pageInfo);
      setPage(page + 1);
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Erro ao carregar pedidos de auxílio';
      Alert.alert('Falha no servidor', message);
    }
  }

  function refreshList() {
    setRefreshing(true);
    setPage(1);
    loadHelpOrders();
  }

  return (
    <Container>
      <Content>
        <HelpOrderButton
          onPress={() => navigation.navigate('HelpOrdersCreate')}
        >
          Novo pedido de auxílio
        </HelpOrderButton>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={helpOrders}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.3}
            onEndReached={loadMore}
            onRefresh={refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <FlatItem
                onPress={() =>
                  navigation.navigate('HelpOrdersAnswer', {
                    helpOrder: item,
                  })
                }
              >
                <OrderHeader>
                  <Answered>
                    <Icon
                      name="check-circle"
                      size={20}
                      color={item.answer ? '#42cb59' : '#999999'}
                    />
                    {item.answer ? (
                      <WithResponse>Respondido</WithResponse>
                    ) : (
                      <NoResponse>Sem resposta</NoResponse>
                    )}
                  </Answered>
                  <TimeText>{item.createdAt}</TimeText>
                </OrderHeader>
                <OrderBodyText>{item.question}</OrderBodyText>
              </FlatItem>
            )}
          />
        )}
      </Content>
    </Container>
  );
}

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
