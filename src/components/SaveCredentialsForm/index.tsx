import React, { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { buildS3Client, getAssets } from '../../services/s3'

import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Alert,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export const SaveCredentialsForm = () => {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { s3credentials } = appState
    const { register, handleSubmit } = useForm({
        defaultValues: s3credentials,
    })
    const [saved, setSaved] = useState(false)

    const onSubmit = (data: FieldValues) => {
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
        console.log(getAssets(s3Client, { Bucket: 'testinghumza' }))
        //getAssets(s3Client, { Bucket: "testinghumza" })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Api Credentials
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="api-key"
                    label="Api Key"
                    autoComplete="api-key"
                    autoFocus
                    {...register('apiKey')}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="api-secret"
                    label="Api secret"
                    autoComplete="api-secret"
                    {...register('apiSecret')}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="region"
                    label="Region"
                    autoComplete="region"
                    {...register('region')}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="endpoint"
                    label="Endpoint"
                    autoComplete="endpoint"
                    placeholder="https://s3.yourcompany.io"
                    {...register('endpoint')}
                    helperText="Demo value for Endpoint: https://s3.us-west-004.backblazeb2.com/"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="bucket"
                    label="Bucket"
                    autoComplete="bucket"
                    placeholder="Bucket-name"
                    {...register('bucket')}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save
                </Button>
                {saved && (
                    <Alert severity="success">Credentials are saved!</Alert>
                )}
            </Box>
        </Box>
    )
}
