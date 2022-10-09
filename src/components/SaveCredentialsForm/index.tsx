import React, { useContext, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { buildS3Client, getAssets } from '../../services/s3'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
//import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import { Text as Typography } from 'react-native-paper';
import { InputField } from '../Input/InputField'
import { Button } from '../Button'



export const SaveCredentialsForm = () => {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { s3credentials } = appState
    const { control, register, handleSubmit, formState } = useForm({
        defaultValues: s3credentials,
    })

    console.log("control", control)
    const [saved, setSaved] = useState(false)

    const onSubmit = (data: FieldValues) => {
        console.log("Submitting form = ", data);
        setAppState({
            ...appState,
            s3credentials: data as any,
            s3client: undefined,
        })
        setSaved(true)
        setTimeout(() => {
            setSaved(false)
        }, 1000)
        /**
         * Build the s3 client here
         */
        const s3Client = buildS3Client({
            credentials: {
                accessKeyId: data.apiKey,
                secretAccessKey: data.apiSecret,
            },
            region: data.region,
            endpoint: data.endpoint,
        })
        getAssets(s3Client, { Bucket: "testinghumza" })
    }

    const [text, setText] = React.useState("");

    // @ts-ignore


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography >
                Api Credentials
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField
                    control={control}
                    name="apiKey"
                    label="API KEY"
                />
                <InputField
                    control={control}
                    name="apiSecret"
                    label="Api Secret"
                />
                <InputField
                    control={control}
                    name="endpoint"
                    label="Endpoint"
                />

                <InputField
                    control={control}
                    name="bucket"
                    label="Bucket"
                />

                <InputField
                    control={control}
                    name="region"
                    label="Region"
                />

                <Button
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    disabled={!formState.isValid}>
                    Save
                </Button>

                {saved && (
                    <Alert severity="success">Credentials are saved!</Alert>
                )}

            </form>
        </div>
    )
}
