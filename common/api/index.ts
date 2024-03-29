import axios from 'axios'

export const getAuthHeaders = (ct?: string) => {
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
      'Content-Type': ct || 'application/json',
    },
  }
}

// export const LOCAL_API_BASE = 'http://localhost:3200/v1/api'
// export const API_BASE = process.env.API_BASE ?? 'https://uzu-dev-server-0d8c885a022e.herokuapp.com/v1/api'
// export const API_BASE = 'http://localhost:3200/v1/api';

// export const API_BASE = 'http://localhost:3200/v1/api'
export const API_BASE = process.env.apiBASE || 'http://localhost:3200/v1/api'

export const createAxiosInstance = (base: string) => {
  // const baseURL = base.startsWith('http') ? base : `${API_BASE}${base}`
  const baseURL = base.startsWith('http') ? base : `${API_BASE}${base}`

  return axios.create({
    baseURL,
    headers: {
      ...getAuthHeaders(),
    },
  })
}
