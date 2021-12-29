import { createAxiosInstance } from "."
import { AnyObject } from "../models/types";


const auth = createAxiosInstance('/auth');

export const AuthApi = {
  login(email: string, password: string) {
    return auth.post('/login', { email, password })
  },

  signup(details: AnyObject) {
    return auth.post('/register', { ...details });
  },

  verifyAccount(email: string, otp: number) {
    return auth.post('/activate', { email, otp })
  }
}