export interface AuthType {
    token: string,
    user: {
    id: string,
    fullName: string,
    email: string,
    createdAt: string
  }
}

export interface getAuthUser {
    id: string,
    fullName: string,
    email: string,
    createdAt: string
}