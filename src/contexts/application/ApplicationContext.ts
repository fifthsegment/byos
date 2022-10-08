/**
 * This context will hold all of our application data like the current
 * user's api Keys, currently viewed directory, etc
 */

import { S3Client } from '@aws-sdk/client-s3'
import React, { createContext } from 'react'

export type ApplicationState = {
    s3credentials: {
        apiKey: string | undefined
        apiSecret: string | undefined
        region: string | undefined
        endpoint: string | undefined
        bucket: string | undefined
    }
    otherStuff: string
    s3client: S3Client | undefined
}

export const initialData: ApplicationState = {
    s3credentials: {
        apiKey: undefined,
        apiSecret: undefined,
        region: undefined,
        endpoint: undefined,
        bucket: undefined,
    },
    s3client: undefined,
    otherStuff: '',
}

export type ApplicationContextType = [
    ApplicationState,
    React.Dispatch<React.SetStateAction<ApplicationState>>
]

export const ApplicationContext = createContext<ApplicationContextType>(
    Object.create(null)
)
