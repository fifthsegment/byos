import { ApplicationState } from '../../contexts/application/ApplicationContext'
import {
  authorizeAccount,
  getAuthorizationToken,
  getDownloadToken,
  isBackblaze
} from '../backblaze/backblaze'
import { getDownloadLink, getDownloadLink as S3GetDownloadUrl } from '../s3'

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
  key: string
): Promise<string> => {
  if (isBackblaze(appState.s3credentials.endpoint)) {
    const token = getAuthorizationToken(
      appState.s3credentials.apiKey,
      appState.s3credentials.apiSecret
    )
    const authToken = await getDownloadToken(
      token,
      appState.s3credentials.bucket,
      key
    )
    const dllink = await getDownloadLink(appState.s3client, {
      Bucket: appState.s3credentials.bucket,
      Key: key
    })
    console.log(authToken)
    console.log('aws', dllink)
    return await new Promise((resolve) => {
      resolve('fail')
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
    return await S3GetDownloadUrl(appState.s3Client, {
      Key: key,
      Bucket: appState.s3credentials.bucket
    })
  }
}
