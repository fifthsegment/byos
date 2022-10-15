import React, { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextProps } from 'react-native-paper'

export interface TextLinkProps {
  isUnderlined: boolean
}

export const TextLink = ({
  children,
  isUnderlined,
  ...args
}: PropsWithChildren<TextLinkProps & TextProps>): JSX.Element => {
  return (
        <Text {...args} style={isUnderlined ? [styles.underline] : []}>
            {children}
        </Text>
  )
}

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline'
  }
})
