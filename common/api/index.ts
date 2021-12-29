import axios, { AxiosRequestConfig } from 'axios'

// Api Logic goes here

export const getAuthHeaders = () => {
  const userInSession = localStorage.getItem('auth') || ''
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

export const API_BASE = 'https://uzu-dev.herokuapp.com/v1/api';

export const createAxiosInstance = (base: string) => {
  const baseURL = base.startsWith('http') ? base : `${API_BASE}${base}`;

  return axios.create({
    baseURL,
    headers: {
      ...getAuthHeaders(),
    },
  })
}