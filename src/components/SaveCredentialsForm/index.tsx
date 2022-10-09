import React, { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { buildS3Client, getAssets } from '../../services/s3'
import { Card, Text as Typography } from 'react-native-paper';
import { InputField } from '../Input/InputField'
import { Button } from '../Button'
import { View } from 'react-native';



export const SaveCredentialsForm = () => {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { s3credentials } = appState
    const { control, handleSubmit, formState } = useForm({
        defaultValues: s3credentials,
    })

    const [saved, setSaved] = useState(false)

    const onSubmit = (data: FieldValues) => {
        console.log("FormData = ", data)
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
    return (
        <Card>

            <Typography >
                Api Credentials
            </Typography>

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
                
                <Button onPress={handleSubmit(onSubmit)}>Submit</Button> 


                {saved && <Typography>Credentials are saved!</Typography>}

        </Card>
    )
}
