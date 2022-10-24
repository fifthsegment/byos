import React, { useEffect } from 'react'
import {
  Text,
  Dialog,
  Button,
  Portal
} from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { uploadFileS3 } from '../../services/s3'

/* eslint-disable */
const styles = StyleSheet.create({
    dialog: {
        width: 250,
        left: '39%'
    }
})


export const Dialog_ = ({ filesOverwrite, porcessingOverwrite, setProcessingOverwrite, setFilesOverwrite, s3credentials, s3client }): JSX.Element => {

    //dialog
    const [visibleDialog, setVisibleDialog] = React.useState<boolean>(false)
    const showDialog = () => {
        setVisibleDialog(true);
    }
    const hideDialog = () => setVisibleDialog(false);

    useEffect(() => {
        if (filesOverwrite.length === 0) {
            hideDialog()
        } else {
            // filesOverwrite.map(obj => {
            //     console.log(obj)
            // })
            const x = filesOverwrite[0]
            setProcessingOverwrite(x)
            showDialog()
        }

    }, [filesOverwrite])

    return (<>
        <Portal>
            <Dialog visible={visibleDialog} style={styles.dialog} dismissable={false}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                    <Text><>File "{porcessingOverwrite?.file?.name}" already exists, do you want to overwrite</></Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {
                        //skip file
                        setFilesOverwrite(current => current.filter((obj) => {
                            return (obj != porcessingOverwrite)
                        }))
                    }}>Skip</Button>
                    <Button onPress={() => {
                        //do file upload
                        const resultUploadFile = uploadFileS3(
                            s3client,
                            porcessingOverwrite.file.name,
                            s3credentials.bucket,
                            porcessingOverwrite.file
                        )
                        resultUploadFile.then(() => {
                            // setIsRejected(false)
                            // onToggleSnackBar()
                        })
                        resultUploadFile.catch(() => {
                            // onToggleSnackBar()
                        })
                        //remove file from list
                        setFilesOverwrite(current => current.filter((obj) => {
                            return (obj != porcessingOverwrite)
                        }))
                    }}>Yes</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </>)
}