import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { signInSuccess, signInFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    yield call(api.post, 'students/sessions', {
      id,
    });

    api.defaults.params = { id };

    yield put(signInSuccess(id));

    // history.push('/students');
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : 'verifique seus dados';
    Alert.alert('Falha na autenticação', errorMessage);

    yield put(signInFailure());
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
