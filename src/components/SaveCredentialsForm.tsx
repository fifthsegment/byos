import { useForm } from 'react-hook-form'

export const SaveCredentialsForm = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data: any) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('firstName')} />
            <select {...register('gender')}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
            </select>
            <input type="submit" />
        </form>
    )
}
