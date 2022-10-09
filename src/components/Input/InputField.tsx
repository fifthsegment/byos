import { Controller } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

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
    /*const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields }
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
    });*/

    return <>
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur } }: any) => {
                return <>
                    <InternalInputField
                        style={styles.input}
                        name={name}
                        label={label}
                        value={value}
                        onChangeText={(text) => {
                            console.log("[InputChange] name = ", name, " value = ", text)
                            onChange(text)
                        }}
                        onBlur={onBlur}
                    />
                </>
            }}
        />
    </>
}