import { createAxiosInstance, getAuthHeaders } from '.'
import { AnyObject } from '../models/types'
import { catchAsync } from '~/common/utilities'

const events = createAxiosInstance('/events')

export const EventsApi = {
  createEvent(details: AnyObject) {
    return catchAsync(() => events.post('', details))
  },

  createEventTicket(details: AnyObject) {
    return catchAsync(() => events.post('/tickets', details, getAuthHeaders()))
  },

  listEvents() {
    return catchAsync(() => events.get(''))
  },

  getEventDetails(eventid: string) {
    return catchAsync(() => events.get(`/${eventid}`))
  },
}
