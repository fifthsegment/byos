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
  }
  return await new Promise((resolve) => {
    resolve('')
  })
}
