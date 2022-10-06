import React, { useContext, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'

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
            <input type="submit" value={'Submit'} />
            <div>{saved && 'Saved!'}</div>
        </form>
    )
}
