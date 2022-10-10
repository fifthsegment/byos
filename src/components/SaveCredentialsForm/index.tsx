import React, { useContext, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { buildS3Client, getAssets } from '../../services/s3'
import { Text, Card, Surface, Title } from 'react-native-paper';
import { InputField } from '../Input/InputField'
import { Button } from '../Button'
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet, View, } from 'react-native';
import { Snackbar } from '../Snackbar/Snackbar';

export const SaveCredentialsForm = () => {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { s3credentials } = appState
    const { control, handleSubmit, formState, getValues, reset } = useForm({
        defaultValues: s3credentials,
    })

    useEffect(() => {
        reset(s3credentials)
    }, [s3credentials])


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

    const styles = StyleSheet.create({
        container: {
          flex: 1
        },
        inner: {
          padding: 24,
          flex: 1,
          justifyContent: "space-around"
        },
        header: {
          fontSize: 36,
          marginBottom: 48
        },
        textInput: {
          height: 40,
          borderColor: "#000000",
          borderBottomWidth: 1,
          marginBottom: 36
        },
        snackBarContainer: {
            flex: 1,
            justifyContent: 'space-between',
        }
      });


    return (
        <ScrollView>
             <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                >
            <Surface style={styles.inner}>
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
            </Surface>
        </KeyboardAvoidingView>
                
        <View style={styles.snackBarContainer}>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                        // Do something
                    },
                }}
                >

                Credentials are saved!

                {/* {saved ? <Text>Credentials are saved!</Text> : <Text>Credentials not saved!</Text>} */}
            </Snackbar>
        </View>
                
            
        </ScrollView>
    )
}
