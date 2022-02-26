export interface PaginationParams {
  totalPage: number
  items: number
  currentPage: number
}

export interface ListResponse<T> {
  result: T[]
  totalPage: number
  items: number
  currentPage: number
}

export interface ListParams {
  page: number
  limit: number

  [key: string]: any
}

export interface Token {
  token: string,
  exp: string
}
export interface AccessToken extends Token {}
export interface RefreshToken extends Token {}

