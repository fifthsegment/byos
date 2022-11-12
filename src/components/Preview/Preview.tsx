import React, { useState, useContext } from 'react'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text, TextInput } from 'react-native-paper'

import { Asset } from '../../services/types'
import { ThemeContextInternal } from '../../contexts/theme/ThemeContextInternal'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { updateAsset as s3UpdateAsset, deleteAsset } from '../../services/s3'
import { useS3Client } from '../../hooks/useS3Client'
import { getDownloadLinkByKey } from '../../services/cross-service-storage/cross-service-storage'
import { useScreenSize } from '../../services/rn-responsive-design/useScreenSize'
import prettyBytes from 'pretty-bytes'

export interface PreviewPropsType {
  asset: Asset
  prefix: string
  onClose: () => void
}

const Preview = ({ asset, onClose, prefix }: PreviewPropsType): JSX.Element => {
  const [appState, setAppState] = useContext(ApplicationContext)
  const { s3credentials } = appState

  const [theme] = useContext(ThemeContextInternal)
  const [isEditing, setIsEditing] = useState(false)
  const [updateAsset, setUpdateAsset] = useState(asset)
  const [text, setText] = useState(asset.fileName)
  const [s3Client] = useS3Client(appState)
  const screenSize = useScreenSize()

  const handleSave = async (): Promise<void> => {
    setIsEditing(false)
    setUpdateAsset((asset) => ({
      ...asset,
      fileName: text
    }))
    await s3UpdateAsset(s3Client, {
      Bucket: s3credentials.bucket,
      Key: asset.key.replace(asset.fileName, text),
      CopySource: s3credentials.bucket + '/' + asset.key
    })
    await deleteAsset(s3Client, {
      Key: asset.key,
      Bucket: s3credentials.bucket
    })
    setAppState({ ...appState, mutatedAt: new Date() })
    onClose()
  }

  const handleDelete = async (): Promise<void> => {
    const deleteParams = {
      Bucket: s3credentials.bucket,
      Key: updateAsset.key
    }
    await deleteAsset(s3Client, deleteParams)
    setAppState({ ...appState, mutatedAt: new Date() })
    onClose()
  }

  const handleDownload = async (): Promise<void> => {
    const link = await getDownloadLinkByKey(
      appState,
      setAppState,
      s3Client,
      asset.key
    )
    const a = document.createElement('a')
    a.href = link
    a.download = asset.key
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  /* eslint-disable */
  return (
    <>
      <View
        style={
          ['xs', 'md'].includes(screenSize)
            ? [styles.mainMobile]
            : [styles.main]
        }
      >
        <IconButton
          theme={theme}
          icon="close"
          onPress={onClose}
          style={styles.closeButton}
        />
        <View
          style={
            ['xs', 'md'].includes(screenSize)
              ? [styles.section2Mobile, styles.centered]
              : [styles.section2, styles.centered]
          }
        >
          <Text
            variant="headlineSmall"
            style={[styles.textCenter, styles.marginBottom]}
          >
            <Feather theme={theme} name="file" size={100} />
          </Text>
          <Text variant="headlineSmall" style={styles.textCenter}>
            {isEditing ? (
              <TextInput
                value={isEditing ? text : updateAsset?.fileName}
                onChangeText={(text) => setText(text)}
              />
            ) : (
              updateAsset?.fileName
            )}
          </Text>
          <Text>{prettyBytes(asset.fileSize)}</Text>
          <View style={[styles.centered, styles.horizontal]}>
            {isEditing ? (
              <IconButton theme={theme} icon="check" onPress={handleSave} />
            ) : (
              <IconButton
                theme={theme}
                icon="pencil"
                onPress={() => setIsEditing(true)}
              />
            )}
            <IconButton theme={theme} icon="trash-can" onPress={handleDelete} />
            <IconButton
              theme={theme}
              icon="download"
              onPress={handleDownload}
            />
          </View>
        </View>
      </View>
    </>
  )
}
/* eslint-enable */

const styles = StyleSheet.create({
  mainMobile: {
    backgroundColor: 'rgb(242, 242, 242)'
  },
  main: {
    display: 'flex',
    flexGrow: 1
  },
  closeButton: {
    display: 'flex',
    textAlign: 'right',
    height: 50
  },
  marginBottom: {
    marginBottom: 10
  },
  textCenter: {
    textAlign: 'center'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: 'row'
  },
  section2: {
    minWidth: '30vw',
    flex: 1,
    flexGrow: 1,
    margin: 20
  },
  section2Mobile: {
    backgroundColor: 'rgb(242, 242, 242)',
    minWidth: '100vw',
    flex: 1,
    flexGrow: 1,
    margin: 20
  }
})

export { Preview }
