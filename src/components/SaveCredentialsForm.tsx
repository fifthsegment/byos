import React from "react";
import { useForm } from 'react-hook-form'

export const SaveCredentialsForm = () => {
    //const [appState, setAppState] = useContext(ApplicationContext);
    const { register, handleSubmit } = useForm()
    const onSubmit = (data: any) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('apiKey')} />
            <input {...register('apiSecret')} />
            <input type="submit" />
        </form>
    )
}
