import React, { useState, useContext } from 'react'
import { SaveCredentialsForm } from '../SaveCredentialsForm'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'

import Modal from '@mui/material/Modal'

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
                <>
                    <SaveCredentialsForm />
                </>
            </Modal>
        </div>
    )
}
