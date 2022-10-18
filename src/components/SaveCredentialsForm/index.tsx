import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { buildS3Client, getAssets } from '../../services/s3'
import { Text, Card, Snackbar } from 'react-native-paper'
import { InputField } from '../Input/InputField'
import { Button } from '../Button'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { S3Client } from '@aws-sdk/client-s3'
import {
  authorizeAccount,
  getAuthorizationToken,
  isBackblaze
} from '../../services/backblaze/backblaze'

export const SaveCredentialsForm: React.FC = () => {
  const [appState, setAppState] = useContext(ApplicationContext)
  const { s3credentials } = appState
  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: s3credentials
  })

  useEffect(() => {
    reset(s3credentials)
  }, [s3credentials])

  const [, setSaved] = useState(false)

  const onSubmit = async (): void => {
    console.log('Submitting form')
    onToggleSnackBar()
    const data = getValues()

    if (isBackblaze(data?.endpoint)) {
      const token = getAuthorizationToken(data.apiKey, data.apiSecret)
      const backblazeData = await authorizeAccount(token)
      console.log('backblaze', backblazeData)
      setAppState({
        ...appState,
        s3credentials: data as any,
        s3client: undefined,
        backblaze: {
          authorizationToken: backblazeData.authorizationToken,
          downloadUrl: backblazeData.downloadUrl,
          s3ApiUrl: backblazeData.s3ApiUrl
        }
      })
    } else {
      setAppState({
        ...appState,
        s3credentials: data as any,
        s3client: undefined
      })
    }
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 1000)
    /**
     * Build the s3 client here
     */
    const s3Client: S3Client = buildS3Client({
      credentials: {
        accessKeyId: data.apiKey,
        secretAccessKey: data.apiSecret
      },
      region: data.region,
      endpoint: data.endpoint
    })

    getAssets(s3Client, { Bucket: 'testinghumza' }).catch(() => {
      console.log('[SaveCredentialsForm] Promise failure getAssets')
    })
  }

  // snackbar
  const [visible, setVisible] = React.useState<boolean>(false)
  const onToggleSnackBar: () => void = () => setVisible(!visible)
  const onDismissSnackBar: () => void = () => setVisible(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: 'space-around'
    },
    header: {
      fontSize: 36,
      marginBottom: 48
    },
    textInput: {
      height: 40,
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 36
    },
    snackBarContainer: {
      flex: 1,
      justifyContent: 'space-between'
    }
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Card>
        <Card.Content>
          <Text variant="headlineSmall">API Configuration</Text>
          <InputField control={control} name="apiKey" label="API KEY" />

          <InputField control={control} name="apiSecret" label="Api Secret" />

          <InputField control={control} name="endpoint" label="Endpoint" />

          <InputField control={control} name="bucket" label="Bucket" />

          <InputField control={control} name="region" label="Region" />
        </Card.Content>
        <Card.Actions>
          {/* eslint-disable-next-line */}
          <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
        </Card.Actions>
      </Card>
      <View style={styles.snackBarContainer}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Dismiss',
            onPress: () => {
              // Do something
            }
          }}
        >
          Credentials are saved!
        </Snackbar>
      </View>
    </KeyboardAvoidingView>
  )
}
