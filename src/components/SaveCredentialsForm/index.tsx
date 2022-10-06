import React, { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'
import { init } from '../../services/s3'

export const SaveCredentialsForm = () => {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { register, handleSubmit } = useForm()
    const [saved, setSaved] = useState(false)

    const onSubmit = (data: FieldValues) => {
        /**
         * Build the s3 client here
         */
        const s3Client = init({
            credentials: {
                accessKeyId: '',
                secretAccessKey: '',
            },
            region: '',
            endpoint: 'west',
        })
        setAppState({
            ...appState,
            s3credentials: data as any,
            s3client: s3Client,
        })
        setSaved(true)
        setTimeout(() => {
            setSaved(false)
        }, 1000)
    }

    const { s3credentials } = appState
    const { apiKey, apiSecret, region } = s3credentials
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('apiKey')}
                placeholder="apiKey"
                value={apiKey}
            />
            <input
                {...register('apiSecret')}
                placeholder="apiSecret"
                value={apiSecret}
            />
            <input
                {...register('region')}
                placeholder="region"
                value={region}
            />
            <input type="submit" value={'Submit'} />
            <div>{saved && 'Saved!'}</div>
        </form>
    )
}
