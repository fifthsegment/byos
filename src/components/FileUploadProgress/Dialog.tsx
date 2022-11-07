import React from 'react'
import { Text, Dialog, Button, Portal } from 'react-native-paper'
import { StyleSheet } from 'react-native'

/* eslint-disable */
const styles = StyleSheet.create({
  dialog: {
    width: 250,
    left: '39%',
  },
})

export const Dialog_ = ({ showOverwite, onOverwrite, onSkip }): JSX.Element => {
  return (
    <>
      <Portal>
        <Dialog
          visible={showOverwite}
          style={styles.dialog}
          dismissable={false}
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>
              <>File already exists, do you want to overwrite</>
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                onSkip()
              }}
            >
              Skip
            </Button>
            <Button
              onPress={() => {
                onOverwrite()
              }}
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}
