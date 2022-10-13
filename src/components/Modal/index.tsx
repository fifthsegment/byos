import React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native'

export interface ModalProps {
  isVisible: boolean
  onClose: () => void
}

const AppModal = ({
  isVisible,
  onClose,
  children
}: React.PropsWithChildren<ModalProps>): JSX.Element => {
  return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.')
                  onClose()
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {children}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => onClose()}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})

export default AppModal
