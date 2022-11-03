import { Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import React from 'react'

const styles = StyleSheet.create({
  textInput: {
    // borderColor: "#000000",
    // borderBottomWidth: 1,
    marginTop: 20
  }
})

export const InputField: (props: any) => JSX.Element = ({
  control,
  name,
  label
}: any) => {
  if (control === undefined) {
    return null
  }
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }: any) => {
          return (
            <>
              <TextInput
                mode="outlined"
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
          )
        }}
      />
    </>
  )
}
