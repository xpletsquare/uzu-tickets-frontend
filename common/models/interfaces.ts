
// THIS FILE HOLDS ALL THE INTERFACES FOR THE APPLICATION
export interface AsyncResponse {
  data: any
  error: string | string[] | null
  status: number | string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  middleName?: string
  phone: string
  flagged: boolean
  activated: boolean
  token?: string
}

export type RegisterUserPayload = Partial<User> & { password: string };
