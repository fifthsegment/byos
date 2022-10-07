import React, { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

export const SaveCredentialsForm = () => {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { register, handleSubmit } = useForm()
    const [saved, setSaved] = useState(false)

    const onSubmit = (data: FieldValues) => {
        /**
         * Build the s3 client here
         */
        setAppState({ ...appState, s3credentials: data as any })
        setSaved(true)
        setTimeout(() => {
            setSaved(false)
        }, 1000)
    }

    const { s3credentials } = appState
    const { apiKey, apiSecret } = s3credentials
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
                    value={apiKey}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="api-secret"
                    label="Api secret"
                    autoComplete="api-secret"
                    {...register('apiSecret')}
                    value={apiSecret}
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
