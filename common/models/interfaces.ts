
// THIS FILE HOLDS ALL THE INTERFACES FOR THE APPLICATION
export interface AsyncResponse {
  data: any
  error: string | string[] | null
  status: number | string
}

export interface User {
  firstName: string
  lastName: string
  middleName: string
  email: string
  phone: string
}