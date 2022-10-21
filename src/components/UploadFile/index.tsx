import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client
} from '@aws-sdk/client-s3'
import * as _DocumentPicker from 'expo-document-picker'
import {
  IconButton,
  Snackbar,
  Text,
  ActivityIndicator
} from 'react-native-paper'
import { buildS3Client } from '../../services/s3'
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ApplicationContextType } from '../../contexts/application/ApplicationContext'

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
})

type Props = {
  appState: ApplicationContextType
  s3client: S3Client
}

export const UploadFile = ({ appState, s3client }): JSX.Element => {
  const { s3credentials } = appState

  const [isLoading, setIsLoading] = useState(false)
  const [isRejected, setIsRejected] = useState(true)

  // snackbar
  const [visible, setVisible] = React.useState<boolean>(false)
  const onToggleSnackBar: () => void = () => setVisible(!visible)
  const onDismissSnackBar: () => void = () => {
    setVisible(false)
    setIsLoading(false)
  }

  return (
    <>
      <Text>Click on the button below to select & upload file</Text>

      <View style={styles.uploadcontainer}>
        <IconButton
          icon="cloud-upload"
          onPress={async () => {
            const selectFile = await _DocumentPicker.getDocumentAsync({})
            console.log(selectFile)
            setIsLoading(true)

            const result = uploadFileS3(
              s3client,
              selectFile.name,
              s3credentials.bucket,
              selectFile.file
            )
            result.then(() => {
              setIsRejected(false)
              onToggleSnackBar()
            })
            result.catch(() => {
              onToggleSnackBar()
            })
          }}
        />

        {isLoading && (
          <ActivityIndicator style={styles.activityindicator} animating />
        )}
      </View>

      <View style={styles.snackbarcontainer}>
        <Snackbar
          style={styles.snackbarinner}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Dismiss',
            onPress: () => {
              // Do something
            },
          }}
        >
          {isRejected ? (
            <Text style={styles.snackbartext}>Failed to upload file</Text>
          ) : (
            <Text style={styles.snackbartext}>File upload successfull</Text>
          )}
        </Snackbar>
      </View>
    </>
  )
}

export const buildClient = (
  region: string,
  apiKey: string,
  apiSecret: string,
  endpoint: string
) => {
  return buildS3Client({
    region,
    credentials: {
      accessKeyId: apiKey,
      secretAccessKey: apiSecret,
    },
    endpoint,
  })
}

export const uploadFileS3 = async (
  s3Client: S3Client,
  filename: string,
  bucket: string,
  file: File
) => {
  const input = {
    Body: file,
    Key: filename,
    Bucket: bucket,
  } as PutObjectCommandInput
  const cmd = new PutObjectCommand(input)
  const response = await s3Client.send(cmd)
  return response
}
