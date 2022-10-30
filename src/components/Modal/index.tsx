/* eslint-disable */
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Modal, Portal } from 'react-native-paper'

export interface ModalProps {
  isVisible: boolean
  onClose: () => void
}

const AppModal = ({
  isVisible,
  onClose,
  children,
}: React.PropsWithChildren<ModalProps>): JSX.Element => {
  if (!isVisible) {
    return null
  }
  return (
    <Portal>
      {/* <View style={styles.centeredView}> */}
      <Modal
        // animationType="slide"
        // transparent={true}
        visible={isVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.')
        //   onClose()
        // }}
        onDismiss={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onClose()}
            > */}
            {/* </Pressable> */}
          </View>
        </View>
      </Modal>
      {/* </View> */}
    </Portal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22
  },
  modalView: {
    // margin: 20,
    // width: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    // color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center',
    // marginTop: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default AppModal
