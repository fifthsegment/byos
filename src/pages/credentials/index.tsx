import React, { useEffect, useState } from 'react'
import { useLinkClickHandler } from 'react-router-dom'
import { AppModal } from '../../components/AppModal';
import { SaveCredentialsForm } from '../../components/SaveCredentialsForm';

export default function Credentials() {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = useLinkClickHandler("/credentials");
    useEffect(() => {
        setIsOpen(true)
    }, [onClick, setIsOpen])

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <AppModal isOpen={isOpen} handleClose={handleClose}><SaveCredentialsForm /></AppModal>
        </>
    )
}