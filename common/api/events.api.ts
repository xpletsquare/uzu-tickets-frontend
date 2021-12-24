import { createAxiosInstance, getAuthHeaders } from "."
import { AnyObject } from "../models/types";


const events = createAxiosInstance('/events');

export const EventsApi = {
  createEvent(details: AnyObject) {
    return events.post('', details);
  },

  createEventTicket(details: AnyObject) {
    return events.post('/tickets', details, getAuthHeaders());
  },

  listEvents() {
    return events.get('');
  },

  getEventDetails(eventid: string) {
    return events.get(`/${eventid}`);
  }
}