import { AnyObject } from '../models/types'
import { catchAsync } from '../utilities'
import { createAxiosInstance, getAuthHeaders } from '.'

const pay = createAxiosInstance('/purchase-tickets')

const purchases = createAxiosInstance('/purchase-tickets')

export const payApi = {
  pay(details: AnyObject) {
    return catchAsync(() => pay.post('/initiate', { ...details }))
  },

  verify( txref: AnyObject ) {
    return catchAsync(() => pay.get('/webhook', { params: { txref }}))
  },

  listEventPurchases(eventId: string) {
    return catchAsync(() => purchases.get(`/event/${eventId}`, getAuthHeaders() as any))
  }
}
//

