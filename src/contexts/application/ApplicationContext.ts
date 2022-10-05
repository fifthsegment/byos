/**
 * This context will hold all of our application data like the current
 * user's api Keys, currently viewed directory, etc
 */

import React, { createContext } from 'react'

export type ApplicationState = {
    s3credentials: {
        apiKey: string | undefined
        apiSecret: string | undefined
    }
    otherStuff: string
}

export type ApplicationContextType = [
    ApplicationState,
    React.Dispatch<React.SetStateAction<ApplicationState>>
]

export const ApplicationContext = createContext<ApplicationContextType>(
    Object.create(null)
)
