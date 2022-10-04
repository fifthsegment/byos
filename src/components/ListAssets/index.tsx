import React, { useContext } from 'react'
import { ApplicationContext } from '../../contexts/application/ApplicationContext'

export const ListAssets = () => {
    const [appState] = useContext(ApplicationContext);
    const { s3credentials } = appState;

    return (<div>{s3credentials.apiKey}</div>)
}
