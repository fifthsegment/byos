import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import * as _DocumentPicker from 'expo-document-picker'
import { IconButton, Snackbar, Text, ActivityIndicator } from 'react-native-paper'
import { buildS3Client } from '../../services/s3'
import React, { useState } from 'react'
// import { useContext } from 'react'
// import { ApplicationContext, ApplicationState } from '../../contexts/application/ApplicationContext'
import { View, StyleSheet } from 'react-native'

/* eslint-disable */

export const UploadFile = () => {
    // const [appState, setAppState] = useContext(ApplicationContext)
    // const { s3credentials } = appState

    const s3credentials = {
        region: "us-west-004",
        apiKey: "004633294d448950000000002",
        apiSecret: "K0041YcLOjyja085RwUbIGUbQIWth5E",
        endPoint: "https://s3.us-west-004.backblazeb2.com/",
        bucket: "testinghumza"
    }

    // console.log(s3credentials)

    const [isLoading, setIsLoading] = useState(false)
    const [isRejected, setIsRejected] = useState(true)

    // snackbar
    const [visible, setVisible] = React.useState<boolean>(false)
    const onToggleSnackBar: () => void = () => setVisible(!visible)
    const onDismissSnackBar: () => void = () => setVisible(false)

    const styles = StyleSheet.create({
        snackbarcontainer: {
            left: '-45%',
            // marginTop: 20
        },
        snackbarinner: {
            // padding: 10,
            backgroundColor: 'grey',
            width: 250,
            height: 40,
        },
        snackbartext: {
            color: 'white'
        },
        uploadcontainer: {
            padding: 10,
            flexDirection: 'row'
        },
        activityindicator: {
            marginLeft: 5
        }
    })

    return (
        <>
            <Text>Click on the button below to select & upload file</Text>

            <View style={styles.uploadcontainer}>
                <IconButton
                    icon="cloud-upload"
                    onPress={async () => {
                        const selectFile = await _DocumentPicker.getDocumentAsync({});
                        console.log(selectFile);
                        setIsLoading(true)
                        const client = buildClient(s3credentials.region, s3credentials.apiKey, s3credentials.apiSecret, s3credentials.endPoint)
                        const result = uploadFileS3(client, selectFile.name, s3credentials.bucket, selectFile.file)
                        result.then(() => {
                            setIsRejected(false)
                        })
                        setIsLoading(false)
                        onToggleSnackBar()
                    }}
                />

                {isLoading && <ActivityIndicator style={styles.activityindicator} animating />}
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
                        }
                    }}
                >
                    {isRejected ? <Text style={styles.snackbartext}>Failed to upload file</Text> : <Text style={styles.snackbartext}>File upload successfull</Text>}
                </Snackbar>
            </View>
        </>
    )
}

export const buildClient = (region: string, apiKey: string, apiSecret: string, endpoint: string) => {
    return buildS3Client({
        region,
        credentials: {
            accessKeyId: apiKey,
            secretAccessKey: apiSecret
        },
        endpoint
    })
}

export const uploadFileS3 = async (s3Client: S3Client, filename: string, bucket: string, file: File) => {
    const input = {
        Body: file,
        Key: filename,
        Bucket: bucket
    } as PutObjectCommandInput
    const cmd = new PutObjectCommand(input)
    const response = await s3Client.send(cmd)
    return response
}