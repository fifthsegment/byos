import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';


export const InternalInputField = (...args) => {
    // @ts-ignore
    return <TextInput
        {...args[0]}
    />
}

export const InputField = ({ control, name, label }: any) => {
    if (control === undefined) {
        return null;
    }
    return <>
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur } }: any) => {
                console.log("Field value = ", value)
                return <InternalInputField
                    name={name}
                    label={label}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            }}
        />
    </>
}