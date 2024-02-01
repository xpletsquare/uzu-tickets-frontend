import { AnyObject } from '../models/types'
import { EventDetailsFull } from '../models/interfaces'
import { createAxiosInstance, getAuthHeaders } from '.'
import { catchAsync } from '~/common/utilities'

const events = createAxiosInstance('/events')

export const EventsApi = {
  createEvent(details: AnyObject) {
    return catchAsync(() => events.post('', details, getAuthHeaders('multipart/form-data')));
  },

  update(id: string, payload: Partial<EventDetailsFull>) {
    return catchAsync(() => events.put(id, payload, getAuthHeaders()))
  },

  createEventTicket(details: AnyObject) {
    return catchAsync(() => events.post('/tickets', details, getAuthHeaders()))
  },

  getUserEvents(userId: string) {
    return catchAsync(() => events.get(`/mine/${userId}`, getAuthHeaders()))
  },

  listEvents() {
    return catchAsync(() => events.get(''))
  },

  getEventDetails(eventid: string) {
    return catchAsync(() => events.get(`/${eventid}`))
  },

  changeStatus(id: string, status: string) {
    return catchAsync(() => events.put(`${id}/status`, { status }, getAuthHeaders()))
  },
}
