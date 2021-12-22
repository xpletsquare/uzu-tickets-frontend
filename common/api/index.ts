import axios, { AxiosRequestConfig } from 'axios'

// Api Logic goes here

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

export const createAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      ...getAuthHeaders(),
    },
  })
}