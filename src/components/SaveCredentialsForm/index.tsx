import React, { useContext, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { buildS3Client, getAssets } from '../../services/s3'
import { Text, Card, Surface, Title } from 'react-native-paper';
import { InputField } from '../Input/InputField'
import { Button } from '../Button'
import { ScrollView } from 'react-native';
import { Snackbar } from '../Snackbar/Snackbar';

export const SaveCredentialsForm = () => {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { s3credentials } = appState
    const { control, handleSubmit, formState, getValues, reset, dirtyFields } = useForm({
        defaultValues: s3credentials,
    })

    useEffect(() => {
        reset(s3credentials)
    }, [s3credentials])

    useEffect(() => {
        console.log("Dirty fields = ", dirtyFields)
    }, [dirtyFields])

    const [saved, setSaved] = useState(false)

    const onSubmit = () => {
        onToggleSnackBar();
        const data = getValues();
        console.log("[SaveCredentialsForm] Saving data = ", data)

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

    //snackbar
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    return (
        <ScrollView>
            <Surface>
                <Card>
                    <Card.Content>
                        <Text variant="headlineSmall">API Configuration</Text>
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
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
                    </Card.Actions>
                </Card>

                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {
                            // Do something
                        },
                    }}>

                    Credentials are saved!

                    {/* {saved ? <Text>Credentials are saved!</Text> : <Text>Credentials not saved!</Text>} */}
                </Snackbar>

            </Surface>
        </ScrollView>
    )
}
