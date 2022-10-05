import React, { useContext } from 'react'
import {
    ApplicationContext,
    ApplicationContextType,
} from '../../contexts/application/ApplicationContext'

export const ListAssets = () => {
    const [appState] = useContext<ApplicationContextType>(ApplicationContext)
    const { s3credentials } = appState
    const { apiKey, apiSecret } = s3credentials
    if (apiKey === undefined || apiSecret === undefined) {
        return <></>
    }
    return <div>{s3credentials.apiKey}</div>
}
