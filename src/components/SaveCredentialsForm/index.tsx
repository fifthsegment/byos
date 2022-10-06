import React, { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { buildS3Client, getAssets } from '../../services/s3'

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
        getAssets(s3Client, { Bucket: "testingbyos", Delimiter: "/", Prefix: "" })
    }

    const connectToS3 = () => {
        const s3Client = buildS3Client({
            credentials: {
                accessKeyId: '',
                secretAccessKey: '',
            },
            region: 'west',
            endpoint: 'https://ask.com',
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('apiKey')} placeholder="apiKey" />
                <input {...register('apiSecret')} placeholder="apiSecret" />
                <input {...register('region')} placeholder="region" />
                <input
                    {...register('endpoint')}
                    placeholder="https://s3.yourcompany.io"
                />
                <input type="submit" value={'Submit'} />
                <div>{saved && 'Saved!'}</div>
            </form>
            <button onClick={connectToS3}>Attempt connection</button>
        </>
    )
}
