import React, { PropsWithChildren } from 'react'
import { Portal, Button, Provider } from 'react-native-paper';
import Modal from 'modal-react-native-web';
import { Text, TouchableHighlight, View } from 'react-native';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

export type AppModalProps = {
    isOpen: boolean
    handleClose: () => void
}

// @ts-ignore
const ViewVirtual = (...args) => <View {...args[0]} />

// @ts-ignore
const ButtonUntyped = (...args) => <Button {...args[0]} />

export function AppModal({ children, isOpen, handleClose }: PropsWithChildren<AppModalProps>) {
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    return (
        <ViewVirtual style={{ marginTop: 100 }}>
            <Modal visible={isOpen} onDismiss={handleClose} contentContainerStyle={containerStyle}>
                <ButtonUntyped onPress={() => handleClose()}>Close</ButtonUntyped>
                {children}
            </Modal>
        </ViewVirtual>
    )
}