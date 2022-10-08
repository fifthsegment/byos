import React, { PropsWithChildren } from 'react'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'

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

export function AppModal({ children, isOpen, handleClose }: PropsWithChildren<AppModalProps>) {

    return (
        <div>
            <Modal
                aria-labelledby="Modal"
                aria-describedby="Modal"
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                disableEnforceFocus
            >
                <Fade in={isOpen}>
                    <Box sx={style}>
                        {children}
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
