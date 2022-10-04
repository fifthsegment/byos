import React, { useContext } from 'react'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'

export const ListAssets = () => {
    const [appState] = useContext(ApplicationContext)
    const { s3credentials } = appState

    return <>{s3credentials.apiKey}</>
}
