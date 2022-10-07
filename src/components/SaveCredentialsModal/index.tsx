import React, { useState, useContext } from 'react'
import { SaveCredentialsForm } from '../SaveCredentialsForm'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'

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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export function SaveCredentialsModal() {
    const [appState, setAppState] = useContext(ApplicationContext)
    const { s3credentials } = appState
    const [open, setOpen] = useState<boolean>(false)

    if (Object.keys(s3credentials).length === 0) {
        setTimeout(() => {
            setOpen(true)
        }, 1000)
    }
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Modal
                aria-labelledby="Modal for Api credentials"
                aria-describedby="modal with a form holding 2 reuired input fields"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                disableEnforceFocus
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <SaveCredentialsForm />
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
