import { format } from 'date-fns'
import { AxiosError, AxiosResponse } from 'axios'
import { AnyObject, AsyncFunction } from '../models/types'
import { AsyncResponse, User } from '../models/interfaces'

export const getErrorMessage = (error: AxiosError & Error) => {
  if (error.response?.data?.message) {
    const message = error.response?.data?.message
    const errorIsArray = Array.isArray(message)

    return errorIsArray ? message[0] : message
  }

  if (error?.response?.data?.defaultUserMessage) {
    const message = error.response?.data?.defaultUserMessage
    const errorIsArray = Array.isArray(message)

    return errorIsArray ? message[0] : message
  }

  return error.message || 'Sorry, an error occurred'
}

export const catchAsync = async (asyncMethod: AsyncFunction): Promise<AsyncResponse> => {
  try {
    const response: AxiosResponse = await asyncMethod()

    return {
      data: response.data,
      error: null,
      status: response.status,
    }
  } catch (error: any) {
    const status = error.response?.status || 0
    const message = getErrorMessage(error)

    return {
      data: null,
      error: message,
      status,
    }
  }
}

export const cleanObject = (data: AnyObject) => {
  const copy = { ...data }

  Object.keys(data).forEach((key) => {
    const value = data[key]
    const isEmpty = [null, undefined, ''].includes(value)

    if (isEmpty) {
      delete copy[key]
    }
  })

  return copy
}

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MMM dd, yyyy')
}

export const formatCurrency = (value: string) => {
  if (!value) {
    return 'Not Available'
  }

  const stringAsNumber = Number(value)
  const formattedVAlue = new Intl.NumberFormat().format(stringAsNumber)
  return '₦' + formattedVAlue
}

export const formatPercentage = (value: string) => {
  if (!value) {
    return 'please provide a float value as param'
  }
  const stringAsFloat = parseFloat(value)
  return stringAsFloat + '%'
}

export const truncateText = (str: string) => {
  if (str && str.length > 15) {
    return str.substring(0, 15) + '...'
  } else return str
}

export const getUserFullName = (user: User) => {
  if (!user) {
    return 'Unknown'
  }

  const { firstName, lastName, middleName } = user

  if (middleName) {
    return [firstName, middleName, lastName].join(' ')
  }

  return [firstName, lastName].join(' ')
}

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  // const hours = date.getHours().toString().padStart(2, '0')
  // const minutes = date.getMinutes().toString().padStart(2, '0')
  // const seconds = date.getSeconds().toString().padStart(2, '0')

  const formattedDate = `${day}-${month}-${year}`
  // const formattedTime = `${hours}:${minutes}:${seconds}`

  return formattedDate
}
