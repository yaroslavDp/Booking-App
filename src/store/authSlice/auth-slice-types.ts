export interface AuthStateType {
  auth:boolean,
  userId: string | null,
  email: string,
  password: string,
  error: ErrorType | null,
  fullName:string,
  loading: boolean
}
export interface ErrorType {
  statusCode: number,
  error: string,
  message: string
}