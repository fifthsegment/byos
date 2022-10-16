import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import { Asset } from '../../services/types'
import { getAsset } from '../../services/s3'
import { GetObjectCommandOutput, S3Client } from '@aws-sdk/client-s3'
import { ApplicationState } from '../../contexts/application/ApplicationContext'
import { fileToIcon } from '../../services/file-icon-service'
// import { RNFetchBlob } from 'rn-fetch-blob'

const imageExtensions = ['png', 'jpeg', 'jpg']

/*
async function collectStream(stream: ReadableStream): Promise<Uint8Array> {
  let res = new Uint8Array(0)
  const reader = stream.getReader()
  let isDone = false
  while (!isDone) {
    const { done, value } = await reader.read()
    if (value) {
      const prior = res
      res = new Uint8Array(prior.length + value.length)
      res.set(prior)
      res.set(value, prior.length)
    }
    isDone = done
  }
  return res
}
*/

export const mobileResponse = (stream): Response => {
  return new Response(stream, {})
}

export const GridItemImagePreview = ({
  item,
  onPress,
  s3client,
  s3Initialized,
  appState
}: {
  item: Asset
  onPress: any
  s3client: S3Client
  s3Initialized: boolean
  appState: ApplicationState
}): JSX.Element => {
  const [d, setD] = useState<string | ArrayBuffer>()
  const [error, setError] = useState<Error | undefined>(undefined)

  const [loaded, setLoaded] = useState(false)
  const [, setShowPreview] = useState(false)
  const fileExtension = item.fileName.split('.').pop()
  const isImage = imageExtensions.includes(fileExtension)
  const fileIcon = !item.isFolder ? fileToIcon(fileExtension) : 'folder'
  const loadImage = item.fileSize < 1000000
  useEffect(() => {
    if (!item.isFolder) {
      if (isImage && loadImage) {
        /* getAssetV2(s3client, {
          Key: item.key,
          Bucket: appState.s3credentials.bucket,
        }) */
        setShowPreview(true)
        getAsset(s3client, {
          Key: item.key,
          Bucket: appState.s3credentials.bucket
        })
          .then((response: GetObjectCommandOutput) => {
            mobileResponse(response.Body)
              .blob()
              .then((blobIn) => {
                const fileReaderInstance = new FileReader()
                fileReaderInstance.readAsDataURL(blobIn)
                fileReaderInstance.onload = () => {
                  const base64 = fileReaderInstance.result
                  setD(base64)
                  setLoaded(true)
                }
              })
              .catch((error: Error) => {
                setError(error)
              })
          })
          .catch((error: Error) => {
            setError(error)
          })
      }
    }
  }, [s3Initialized])

  const onPressPreview = (): void => {
    onPress(item)
  }
  /* eslint-disable */
  return (
    <TouchableOpacity onPress={onPressPreview}>
      {isImage && loadImage ? (
        loaded && !error ? (
          <Image source={{ uri: d.toString() }} style={styles.preview} />
        ) : (
          <Feather name="alert-triangle" size={100} style={styles.errorIcon} />
        )
      ) : (
        <Feather name={fileIcon as any} size={100} style={styles.icon} />
      )}
      <Text
        style={styles.fileName}
        onPress={() => {
          onPress(item)
        }}
      >
        {item.fileName}
      </Text>
    </TouchableOpacity>
  )
  /** eslint-enable */
}

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 200,
  },
  icon: {
    marginTop: 20,
  },
  wrapper: {},
  fileName: {
    bottom: 0,
    textAlign: 'center',
  },
  errorIcon: {
    color: 'red',
  },
})
