import React from 'react'
import { SaveCredentialsModal } from '../../components/SaveCredentialsModal'

import Container from '@mui/material/Container'

export default function Home() {
    return (
        <>
            <div>Home</div>
            <Container maxWidth="xs" sx={{ backgroundColor: 'white' }}>
                <SaveCredentialsModal />
            </Container>
        </>
    )
}
