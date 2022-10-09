import { Controller, useController } from 'react-hook-form';
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
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields }
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
    });

    return <>
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur } }: any) => {
                return <>
                    <InternalInputField
                        name={name}
                        label={label}
                        value={value}
                        onChange={onChange}
                        onChageText={onChange}
                        onBlur={onBlur}
                    />
                </>
            }}
        />
    </>
}