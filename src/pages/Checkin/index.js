import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Alert, FlatList } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Loading from '~/components/Loading';

import {
  Container,
  Content,
  CheckinButton,
  FlatItem,
  ChckinText,
  TimeText,
} from './styles';

export default function Checkin() {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [checkins, setChekins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const studentId = useSelector(state => state.auth.id);

  const loadCheckins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`students/${studentId}/checkins`, {
        params: {
          page: 1,
        },
      });

      const { checkinList, ...pageInfo } = response.data;

      checkinList.map(checkin => {
        checkin.createdAt = formatRelative(
          parseISO(checkin.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        );
        return checkin;
      });

      setChekins(checkinList);
      setPagination(pageInfo);
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Erro ao carregar checkins';
      Alert.alert('Falha no servidor', message);
      setRefreshing(false);
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadCheckins();
  }, [loadCheckins, studentId]);

  async function loadMore() {
    if (!pagination.nextPage) return;

    try {
      const response = await api.get(`students/${studentId}/checkins`, {
        params: {
          page: page + 1,
        },
      });

      const { checkinList, ...pageInfo } = response.data;

      checkinList.map(checkin => {
        checkin.createdAt = formatRelative(
          parseISO(checkin.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        );
        return checkin;
      });

      setChekins([...checkins, ...checkinList]);
      setPagination(pageInfo);
      setPage(page + 1);
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Erro ao carregar checkins';
      Alert.alert('Falha no servidor', message);
    }
  }

  async function handleNewChekin() {
    try {
      setButtonLoading(true);
      await api.post(`students/${studentId}/checkins`);

      const checkin_count =
        checkins.length > 0 ? checkins[0].checkin_count + 1 : 1;

      const checkin = {
        createdAt: 'Agora',
        checkin_count,
      };

      setChekins([checkin, ...checkins]);
      setButtonLoading(false);
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Erro ao realizar checkin';
      Alert.alert('Falha no servidor', message);
      setButtonLoading(false);
    }
  }

  function refreshList() {
    setRefreshing(true);
    setPage(1);
    loadCheckins();
  }

  return (
    <Container>
      <Content>
        <CheckinButton loading={buttonLoading} onPress={handleNewChekin}>
          Novo check-in
        </CheckinButton>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={checkins}
            keyExtractor={checkin => String(checkin.checkin_count)}
            onEndReachedThreshold={0.3}
            onEndReached={loadMore}
            onRefresh={refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <FlatItem>
                <ChckinText>Check-in #{item.checkin_count}</ChckinText>
                <TimeText>{item.createdAt}</TimeText>
              </FlatItem>
            )}
          />
        )}
      </Content>
    </Container>
  );
}
