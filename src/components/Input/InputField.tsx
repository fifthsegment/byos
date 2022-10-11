import { Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import React from 'react'

export const InputField: (props: any) => JSX.Element = ({ control, name, label }: any) => {
  if (control === undefined) {
    return null
  }
  /* const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields }
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
    }); */

  const styles = StyleSheet.create({
    textInput: {
      height: 40,
      // borderColor: "#000000",
      // borderBottomWidth: 1,
      marginTop: 20
    }
  })

  return <>
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }: any) => {
        return <>
          <TextInput
            label={label}
            value={value}
            onChangeText={(text) => {
              console.log('[InputChange] name = ', name, ' value = ', text)
              onChange(text)
            }}
            onBlur={onBlur}
            style={styles.textInput}
          />
        </>
      }}
    />
  </>
}
