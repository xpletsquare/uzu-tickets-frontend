import { createAxiosInstance } from "."
import { AnyObject } from "../models/types";
import { catchAsync } from "../utilities";


const auth = createAxiosInstance('/auth');

export const AuthApi = {
  login(email: string, password: string) {
    return catchAsync(() => auth.post('/login', { email, password }))
  },

  signup(details: AnyObject) {
    return catchAsync(() => auth.post('/register', { ...details }));
  },

  verifyAccount(email: string, otp: number) {
    return catchAsync(() => auth.post('/activate', { email, otp }));
  }
}