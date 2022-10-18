import axios from 'axios'

export const getBaseUrl = (): string => 'https://api.backblazeb2.com/b2api/v2/'

export const getAuthorizationToken = (key: string, secret: string): string => {
  return btoa(`${key}:${secret}`)
}

export interface authorizationType {
  [key: string]: string
}

export const authorizeAccount = async (
  authorizationToken: string
): Promise<authorizationType> => {
  const response = await axios({
    method: 'GET',
    url: `${getBaseUrl()}b2_authorize_account`,
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${authorizationToken}`
    }
  })
  console.log('backblaze response ', response)
  return response.data
}

export const isBackblaze = (endpoint: string): boolean => {
  return endpoint.toLowerCase().includes('backblazeb2')
}
