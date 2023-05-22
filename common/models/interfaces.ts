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

export interface ISchedule {
  name: string
  date: string
  start: string
  end: string
}

export interface ITicket {
  id?: string
  title: string
  price: string 
  schedule: ISchedule
  nLimit: number
}

export interface TicketSalesBreakdown {
  ticket_data: ITicket[]
}

export interface ISalesTx {
  event_id: string
  eventName: string
  BfirstName: string
  BlastName: string
  BEmail: string
  BPhone?: string
  Description: string
  ticketsBreakdown: TicketSalesBreakdown[]
  AmountPayed: number | string
  promoter_code?: string
  Date: string
}

export interface ApiKey {
  api_key: string
}

export interface Transaction {
  type: string // transaction type (Debit / Payout)
  amount: number | string
  account_no: string
  bank: string
  date: string // transaction date
}

export interface Wallet {
  ledger_balance: number | string
  main_balance: number | string
  transactions: Transaction[]
}

export interface EventDetailsFull {
  id: string
  startDate: string
  endDate: string
  title: string
  images: {
    landscape: string
    portrait: string
  }
  image: {
    landscape: string
    portrait: string
  }
  description: string
  category: string
  location: string
  schedules: ISchedule[]
  tickets: ITicket[]
  tags: string[]
  sales: ISalesTx[]
  promoters: string[]
  isPublished: boolean
  occurrence: 'single' | 'multiple' | ''
  address: string
  author: string
  venue: string
  status: 'DRAFT' | 'ACTIVE' | 'CANCELED'
}

export interface Promoter {
  status: string // ACTIVE OR INACTIVE
  code: string // PROMOTER CODE
  promoted_events: EventDetailsFull[] // Selecting all events where promoter code is in promoters
  tickets_sold: ISalesTx[]
  gross: number | string
  net: number | string
  sales: ISalesTx[] // select and show only sales with the corresponding promoter code
}

export interface ElementWithValidateFunction {
  validate: () => string
}
