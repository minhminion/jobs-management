import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { cookie } from '../../utils'
import { authApi, AuthResponse } from './authApi'
import { authActions, AuthLoginPayload } from './authSlice'

function* handleLogout() {
  cookie.setCookie('token', '')
  cookie.setCookie('user', '')
  yield put(authActions.logout())
}
function* handleLogin(payload: AuthLoginPayload) {
  try {
    const response: AuthResponse = yield call(authApi.login, payload.data)
    if (response.user && response.token) {
      yield put(authActions.loginSuccess(response.user))
      cookie.setCookie('token', response.token)
      cookie.setCookie('user', JSON.stringify(response.user))
      yield payload.onLoginSuccess && call(payload.onLoginSuccess())
    }
  } catch (error: any) {
    const msg = error?.response.data.msg
    yield put(authActions.loginFailture())
    if (payload.onLoginFailture) yield call(payload.onLoginFailture(msg))
  } finally {
    return true
  }
}

function* watchLoginFlow() {
  while (true) {
    let isLogin = Boolean(cookie.getCookie('token'))
    if (!isLogin) {
      const action: PayloadAction<AuthLoginPayload> = yield take(
        authActions.login.type,
      )
      yield fork(handleLogin, action.payload)
    }

    yield take([authActions.logout.type, authActions.loginFailture.type])
    yield call(handleLogout)
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow)
}
