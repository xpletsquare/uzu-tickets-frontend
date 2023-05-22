import { AnyObject } from '../models/types'
import { catchAsync } from '../utilities'
import { createAxiosInstance } from '.'

const pay = createAxiosInstance('/purchase-tickets')

export const payApi = {
  pay(details: AnyObject) {
    return catchAsync(() => pay.post('/initiate', { ...details }))
  },
}
//
