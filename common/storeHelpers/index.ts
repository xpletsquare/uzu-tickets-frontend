import { User } from '../models/interfaces'

export interface AppState {
  currentUser: AuthUser | null
}

export class AuthUser implements User {
  id = ''
  email = ''
  firstName = ''
  lastName = ''
  middleName = ''
  dob = '' // date of birth
  gender = ''
  phone = ''
  activated = false
  flagged = false
  token = ''
  events = []
}

export enum StoreMutations {
  setUser = 'setUser',
  setEvent = 'setEvent',
}
