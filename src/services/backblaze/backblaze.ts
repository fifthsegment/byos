import axios from 'axios'
import { BackblazeB2Config } from '../types'

export const getBaseUrl = (): string => 'https://api.backblazeb2.com/b2api/v2/'

export const getAuthorizationToken = (key: string, secret: string): string => {
  return btoa(`${key}:${secret}`)
}

export interface authorizationType {
  [key: string]: string
}

export const authorizeAccount = async (
  authorizationToken: string
): Promise<{ [key: string]: string }> => {
  const response = await axios({
    method: 'GET',
    url: `${getBaseUrl()}b2_authorize_account`,
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${authorizationToken}`
    }
  })
  return response.data
}

export const getDownloadToken = async (
  authorizationToken: string,
  bucket: string,
  key: string
): Promise<authorizationType> => {
  const response = await axios({
    method: 'POST',
    url: `${getBaseUrl()}b2_get_download_authorization`,
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${authorizationToken}`
    },
    body: {
      bucketId: bucket,
      fileNamePrefix: key,
      validDurationInSeconds: 86400
    }
  })
  return response.data
}

export const isBackblaze = (endpoint: string): boolean => {
  return endpoint.toLowerCase().includes('backblazeb2')
}

export const getDownloadUrl = (
  config: BackblazeB2Config,
  bucket: string,
  fileKey: string
): string => {
  const { downloadUrl } = config
  return `${downloadUrl}/file/${bucket}/${fileKey}?Authorization=${config.authorizationToken}`
}
