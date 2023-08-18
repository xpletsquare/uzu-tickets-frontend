import axios, { } from 'axios'

export const getAuthHeaders = () => {
  const userInSession = sessionStorage.getItem('auth') || ''
  const parsed = userInSession ? JSON.parse(userInSession) : ''

  if (!parsed || !parsed.token) {
    return {
      headers: {
        Authorization: ``,
      },
    }
  }

  return {
    headers: {
      Authorization: `Bearer ${parsed.token}`,
    },
  }
}


export const LOCAL_API_BASE = 'http://localhost:3200/v1/api'
export const API_BASE = 'https://uzu-tickets.herokuapp.com/v1/api'

export const createAxiosInstance = (base: string) => {
  const baseURL = base.startsWith('http') ? base : `${API_BASE}${base}`
  // const baseURL = base.startsWith('http') ? base : `${LOCAL_API_BASE}${base}`

  return axios.create({
    baseURL,
    headers: {
      ...getAuthHeaders(),
    },
  })
}
