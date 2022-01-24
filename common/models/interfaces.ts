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
  dob?: string // date of birth
  gender?: string
  phone: string
  flagged: boolean
  activated: boolean
  token?: string
}

export type RegisterUserPayload = Partial<User> & { password: string }

export interface ITicket {
  // id: string
  title: string
  price: string
  // price: string | number
  schedule: string
}

export interface ISchedule {
  name: string
  date: string
  start: string
  end: string
}

export interface EventDetailsFull {
  id: string
  title: string
  images: {
    landscape: string
    portrait: string
  }
  description: string
  category: string
  location: string
  schedules: ISchedule[]
  tickets: ITicket[]
  tags: string[]
  isPublished: boolean
}

export interface ElementWithValidateFunction {
  validate: () => string
}
