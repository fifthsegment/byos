import { ApplicationState } from '../../contexts/application/ApplicationContext'
import { getDownloadUrl, isBackblaze } from '../backblaze/backblaze'

export const getDownloadLinkByKey = async (
  appState: ApplicationState,
  key: string
): Promise<string> => {
  if (isBackblaze(appState.s3credentials.endpoint)) {
    return getDownloadUrl(
      appState.backblaze,
      appState.s3credentials.bucket,
      key
    )
  } else {
    return getDownloadLink(appState.s3Client, {
      Key: key,
      Bucket: appState.s3credentials.bucket
    })
  }
}
