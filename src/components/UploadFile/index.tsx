import { S3Client } from '@aws-sdk/client-s3'
// import { Upload } from '@aws-sdk/lib-storage'
import * as _DocumentPicker from 'expo-document-picker'
import {
  IconButton,
  Snackbar,
  Text
} from 'react-native-paper'
import { checkFileExists, uploadFileS3 } from '../../services/s3'
import React, { useState } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { ApplicationContextType } from '../../contexts/application/ApplicationContext'
import { Dialog_ } from './Dialog'

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
        left: '39%'
    }
})

type Props = {
    appState: ApplicationContextType
    s3client: S3Client
}

interface uploadFileConset {
    overwrite: boolean,
    file: File
}

export const UploadFile = ({ appState, s3client }): JSX.Element => {
    const { s3credentials } = appState

    const [isLoading, setIsLoading] = useState(false)
    const [isRejected, setIsRejected] = useState(true)

    //array to hold files requireing consent to overwrite
    const filesOverwriteInitial: uploadFileConset[] = []
    const [filesOverwrite, setFilesOverwrite] = React.useState(filesOverwriteInitial)
    const processingOverwriteInitial: uploadFileConset = { overwrite: false, file: null }
    const [porcessingOverwrite, setProcessingOverwrite] = React.useState(processingOverwriteInitial)

    // snackbar
    const [visibleSnackbar, setVisibleSnackbar] = React.useState<boolean>(false)
    const onToggleSnackBar: () => void = () => setVisibleSnackbar(!visibleSnackbar)
    const onDismissSnackBar: () => void = () => {
        setVisibleSnackbar(false)
        setIsLoading(false)
    }

    return (
        <>
            <Dialog_ filesOverwrite={filesOverwrite} porcessingOverwrite={porcessingOverwrite} setProcessingOverwrite={setProcessingOverwrite} setFilesOverwrite={setFilesOverwrite} s3credentials={s3credentials} s3client={s3client} />

            <Text>Click on the button below to select & upload file</Text>

            <View style={styles.uploadcontainer}>
                <IconButton
                    icon="cloud-upload"
                    onPress={async () => {
                        const selectFile = await _DocumentPicker.getDocumentAsync({ multiple: true })
                        setIsLoading(true)
                        let toUpload = selectFile?.output
                        console.log(toUpload)
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

                        for (const file of toUpload) {
                            const resultFileExists = checkFileExists(s3client, file.name, s3credentials.bucket)
                            console.log(resultFileExists)
                            resultFileExists.then((x) => {
                                // console.log('file exists')
                                setFilesOverwrite(current => [...current, { overwrite: false, file: file }])
                                // showDialog()
                            })
                            resultFileExists.catch(() => {
                                // console.log('file does not exist, uploading')
                                const resultUploadFile = uploadFileS3(
                                    s3client,
                                    file.name,
                                    s3credentials.bucket,
                                    file
                                )
                                resultUploadFile.then(() => {
                                    setIsRejected(false)
                                    onToggleSnackBar()
                                })
                                resultUploadFile.catch(() => {
                                    onToggleSnackBar()
                                })
                            })

                        }
                    }}
                />

            </View>

            <View style={styles.snackbarcontainer}>
                <Snackbar
                    style={styles.snackbarinner}
                    visible={visibleSnackbar}
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
