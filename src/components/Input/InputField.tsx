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
    return <Controller
        control={control}
        name={name}
        render={({ field: { value } }: any) => {
            return <InternalInputField
                label={label}
                value={value}
            />
        }}
    />
}