import { S3Client } from '@aws-sdk/client-s3'
import { ApplicationState } from '../../contexts/application/ApplicationContext'
import {
  authorizeAccount,
  getAuthorizationToken,
  isBackblaze
} from '../backblaze/backblaze'
import { getDownloadLink as S3GetDownloadUrl } from '../s3'

export const getBackblazeB2Data = async (
  appState: ApplicationState
): Promise<{ [key: string]: string }> => {
  const { apiKey, apiSecret } = appState.s3credentials
  const token = getAuthorizationToken(apiKey, apiSecret)
  const backblazeData = await authorizeAccount(token)
  return backblazeData
}

export const isBackblazeB2TokenValid = (
  appState: ApplicationState
): boolean => {
  const lastUpdated: number = appState.backblaze.updatedAt.getTime() / 1000
  const timeNow: number = new Date().getTime() / 1000
  const difference = timeNow - lastUpdated
  return difference < 86400
}

export const getDownloadLinkByKey = async (
  appState: ApplicationState,
  setAppState: React.Dispatch<React.SetStateAction<ApplicationState>>,
  s3Client: S3Client,
  key: string
): Promise<string> => {
  if (isBackblaze(appState.s3credentials.endpoint)) {
    /* const token = getAuthorizationToken(
      appState.s3credentials.apiKey,
      appState.s3credentials.apiSecret
    ) */
    /* const authToken = await getDownloadToken(
      token,
      appState.s3credentials.bucket,
      key
    ) */
    return await S3GetDownloadUrl(s3Client, {
      Key: key,
      Bucket: appState.s3credentials.bucket
    })

    /* if (isBackblazeB2TokenValid(appState)) {
      return getDownloadUrl(
        appState.backblaze,
        appState.s3credentials.bucket,
        key
      )
    } else {
      const backblazeData = await getBackblazeB2Data(appState)
      const b2Data = BackblazeB2AuthToLocalAdapter(backblazeData)
      setAppState({ ...appState, backblaze: b2Data })
      return getDownloadUrl(b2Data, appState.s3credentials.bucket, key)
    } */
  } else {
    return await S3GetDownloadUrl(appState.s3client, {
      Key: key,
      Bucket: appState.s3credentials.bucket
    })
  }
}
