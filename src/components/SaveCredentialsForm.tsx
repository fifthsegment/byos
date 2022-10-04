import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ApplicationContext } from '../contexts/application/ApplicationContext'

export const SaveCredentialsForm = () => {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { register, handleSubmit } = useForm()
    const [saved, setSaved] = useState(false)

    const onSubmit = (data: any) => {
        setAppState({ ...appState, s3credentials: data })
        setSaved(true)
        setTimeout(() => {
            setSaved(false)
        }, 1000)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('apiKey')} placeholder="apiKey" />
            <input {...register('apiSecret')} placeholder="apiSecret" />
            <input type="submit" />
            <div>{saved && 'Saved!'}</div>
        </form>
    )
}
