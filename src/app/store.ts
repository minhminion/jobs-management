import createSagaMiddleware from '@redux-saga/core'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../features/auth/authSlice'
import { cookie } from '../utils'
import { rootSaga } from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

function mapCookieToState() {
  const currentUser = cookie.getCookie('user')
  let auth: AuthState = {
    isLogin: false,
    currentUser: undefined,
    logging: false,
  }
  try {
    auth = {
      isLogin: Boolean(currentUser),
      currentUser: JSON.parse(currentUser),
      logging: false,
    }
    return auth
  } catch (error) {
    return auth
  }
}

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    }).concat(sagaMiddleware),
  preloadedState: {
    auth: mapCookieToState(),
  },
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
