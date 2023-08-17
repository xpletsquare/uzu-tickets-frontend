// import { AnyObject } from '../models/types'
// import { EventDetailsFull } from '../models/interfaces'
import { createAxiosInstance, getAuthHeaders } from '.'
import { catchAsync } from '~/common/utilities'

const tickets = createAxiosInstance('/tickets')

export const TicketsApi = {

  getTicketsSold( userId: string ) {
    return catchAsync(() => tickets.get('/',  { params: { id : userId }},))
  }
}