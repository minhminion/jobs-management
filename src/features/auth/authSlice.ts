import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { User } from '../../models'
import { LoginPayload } from './authApi'

export interface AuthState {
  currentUser: User | undefined
  isLogin: boolean
  logging: boolean
}

export interface AuthLoginPayload {
  data: LoginPayload,
  onLoginSuccess?: Function
  onLoginFailture?: Function
}

const initialState: AuthState = {
  currentUser: undefined,
  isLogin: false,
  logging: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthLoginPayload>) => {
      state.logging = true
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isLogin = true
      state.logging = false
    },
    loginFailture: (state) => {
      state.logging = false
    },
    logout: (state, action: PayloadAction) => {
      state.isLogin = false
      state.currentUser = undefined
    },
  },
})


export const authActions = authSlice.actions

//Selector 

export const selectIsLogging = (state: RootState) => state.auth.logging
export const selectIsLogin = (state: RootState) => state.auth.isLogin
export const selectCurrentUser = (state: RootState) => state.auth.currentUser

const authReducer = authSlice.reducer
export default authReducer
