import { axiosClient } from "../../api/axiosClient"
import { AccessToken, RefreshToken, User } from "../../models"

export interface LoginPayload {
  email: string,
  password: string,
}

export interface AuthResponse {
  user?: User,
  accessToken?: AccessToken
  refreshToken?: RefreshToken

  msg?:string 
}

export interface RegisterPayload {
  name: string,
  email: string,
  password: string
}


export const authApi = {
  login (params: LoginPayload): Promise<AuthResponse> {
    const url = '/auth/login'
    return axiosClient.post(url, params)
  },
  register  (params: RegisterPayload): Promise<{user: User}> {
    const url = '/auth/register'
    return axiosClient.post(url, params)
  }
}