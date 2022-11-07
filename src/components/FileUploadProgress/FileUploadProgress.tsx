import { StyleSheet, View } from 'react-native'
import * as React from 'react'
import { checkFileExists, uploadFileS3 } from '../../services/s3'
import { S3Client } from '@aws-sdk/client-s3'
import { Dialog_ } from './Dialog'
import { Text } from 'react-native-paper'

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex'
  }
})

export interface Props {
  file: File
  s3client: S3Client
  prefix: string
  s3credentials: any
  onSuccess: () => void
  onError: () => void
}

export const FileUploadProgress = ({
  file,
  s3client,
  prefix,
  s3credentials,
  onSuccess,
  onError
}: Props): JSX.Element => {
  const [uploadProgress, setUploadProgress] = React.useState(0)

  const [showOverwite, setShowOverwrite] = React.useState(false)

  const onUpload = (file: File): void => {
    uploadFileS3(
      s3client,
      prefix + file.name,
      s3credentials.bucket,
      (progress) => {
        setUploadProgress(progress)
      },
      file
    )
      .then(() => {
        onSuccess()
      })
      .catch(() => {
        onError()
      })
  }

  React.useEffect(() => {
    const resultFileExists = checkFileExists(
      s3client,
      prefix + file.name,
      s3credentials.bucket
    )
    resultFileExists
      .then((_x) => {
        setShowOverwrite(true)
      })
      .catch(() => {
        onUpload(file)
      })
  }, [])
  return (
    <>
      <View style={styles.wrapper}>
        <Text>
          Uploading {file.name} : {uploadProgress}%
        </Text>
      </View>
      <Dialog_
        onOverwrite={() => {
          onUpload(file)
          setShowOverwrite(false)
        }}
        onSkip={() => {
          onSuccess()
          setShowOverwrite(false)
        }}
        showOverwite={showOverwite}
      />
    </>
  )
}
