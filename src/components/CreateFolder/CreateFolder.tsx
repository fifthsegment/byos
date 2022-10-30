import { S3Client } from '@aws-sdk/client-s3'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { ApplicationState } from '../../contexts/application/ApplicationContext'
import { uploadFileS3 } from '../../services/s3'

export const CreateFolder = ({
  appState,
  s3client,
  prefix,
  doReload,
  doCloseModal
}: {
  prefix: string
  s3client: S3Client
  appState: ApplicationState
  doReload: () => void
  doCloseModal: () => void
}): JSX.Element => {
  const [folderName, setFolderName] = React.useState('')
  const createFolder = async (): Promise<void> => {
    const filename = folderName
    await uploadFileS3(
      s3client,
      prefix + filename + '/',
      appState.s3credentials.bucket
    )
    doReload()
    doCloseModal()
  }
  return (
    <View>
      <Text>Create Folder</Text>
      <TextInput
        label="Name"
        value={folderName}
        onChangeText={(text) => setFolderName(text)}
      />
      <Button
        icon="folder"
        mode="contained"
        style={styles.ButtonWrapper}
        onPress={() => {
          createFolder().catch((e) => {
            console.log('[CreateFolder] Exception = ', e)
          })
        }}
      >
        Save
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  ButtonWrapper: {
    marginTop: '10px'
  }
})
