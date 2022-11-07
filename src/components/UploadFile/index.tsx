import { S3Client } from '@aws-sdk/client-s3'
// import { Upload } from '@aws-sdk/lib-storage'
import * as _DocumentPicker from 'expo-document-picker'
import { IconButton, Text } from 'react-native-paper'
import React, { useState } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { ApplicationState } from '../../contexts/application/ApplicationContext'
import { FileUploadProgress } from '../FileUploadProgress'

/* eslint-disable */
const styles = StyleSheet.create({
  snackbarcontainer: {
    left: '-45%',
    // marginTop: 20
  },
  snackbarinner: {
    // padding: 10,
    backgroundColor: 'grey',
    width: 250,
    height: 50,
  },
  snackbartext: {
    color: 'white',
  },
  uploadcontainer: {
    padding: 10,
    flexDirection: 'row',
  },
  activityindicator: {
    marginLeft: 5,
  },
  dialog: {
    width: 250,
    left: '39%',
  },
})

type Props = {
  appState: ApplicationState
  s3client: S3Client
  prefix: string
  doReload: () => void
  doCloseModal: () => void
}

export const UploadFile = ({
  appState,
  s3client,
  prefix,
  doReload,
  doCloseModal,
}: Props): JSX.Element => {
  const { s3credentials } = appState

  const [, setIsLoading] = useState(false)
  const [filesToUpload, setFilesToUpload] = useState<FileList | undefined>(
    undefined
  )

  return (
    <>
      <Text>Upload location : {prefix}</Text>

      <View style={styles.uploadcontainer}>
        {filesToUpload &&
          Array.from(filesToUpload).map((file) => (
            <FileUploadProgress
              prefix={prefix}
              file={file}
              s3credentials={s3credentials}
              s3client={s3client}
              onSuccess={() => {
                doReload()
                doCloseModal()
              }}
              onError={() => {}}
            />
          ))}
        <IconButton
          icon="cloud-upload"
          onPress={async () => {
            const selectFile = await _DocumentPicker.getDocumentAsync({
              multiple: true,
            })
            setIsLoading(true)
            let toUpload: FileList = selectFile?.output
            setFilesToUpload(toUpload)
            if (Platform.OS === 'ios') {
              const resp = await fetch(selectFile.uri)
              const blob = await resp.blob()
              toUpload = [blob]
              /*StreamingUploader(
                  s3client,
                  s3credentials.bucket,
                  selectFile.name,
                  blob
                )*/
            }
          }}
        />
      </View>
    </>
  )
}

// export const StreamingUploader = async (
//     s3Client: S3Client,
//     Bucket: string,
//     Key: string,
//     Body: any
// ) => {
//     try {
//         const parallelUploads3 = new Upload({
//             client: s3Client,
//             params: { Bucket, Key, Body },

//             tags: [
//                 /*...*/
//             ], // optional tags
//             queueSize: 4, // optional concurrency configuration
//             partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
//             leavePartsOnError: false, // optional manually handle dropped parts
//         })

//         parallelUploads3.on('httpUploadProgress', (progress) => {
//             console.log(progress)
//         })

//         await parallelUploads3.done()
//     } catch (e) {
//         console.log(e)
//     }
// }
