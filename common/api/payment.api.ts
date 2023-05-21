import axios from 'axios'
// import { AnyObject } from '../models/types'
// import { catchAsync } from '../utilities'
// import { createAxiosInstance } from '.'

// const pay = createAxiosInstance('/purchase-tickets')

export const payApi = {
  // pay(details: AnyObject) {
  //   return catchAsync(() => pay.post('/initiate', { ...details }, getAuthHeaders()))
  // },
}
// interface PurchasesInterface {
//   ticketId: string
//   count: number
//   labels?: string[]
// }

// interface PayReqInterface {
//   eventId: string
//   userEmail: string
//   userFirstName: string
//   userLastName: string
//   purchases: PurchasesInterface[]
// }
export const payNow = async () => {

  const {data} = await axios.post('https://uzu-tickets.herokuapp.com/v1/api/purchase-tickets/initiate', {
    eventId: 'aaa807e6-8001-467b-83a9-1ce7704917da',
      userEmail: 'jonesbgabriel@gmail.com',
      userFirstName: 'ken',
      userLastName: 'test',
      purchases: [
        {
          ticketId: '14ec431d-023b-46b6-b1be-83cbd6f1b721',
          count: 1,
          labels: ['ken'],
        },
      ],
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  console.log(data)
}
