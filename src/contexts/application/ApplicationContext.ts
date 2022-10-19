/**
 * This context will hold all of our application data like the current
 * user's api Keys, currently viewed directory, etc
 */

import { S3Client } from '@aws-sdk/client-s3'
import React, { createContext } from 'react'
import { BackblazeB2Config } from '../../services/types'

export interface ApplicationState {
  s3credentials: {
    apiKey: string | undefined
    apiSecret: string | undefined
    region: string | undefined
    endpoint: string | undefined
    bucket: string | undefined
  }
  backblaze: BackblazeB2Config | undefined
  otherStuff: string | undefined
  s3client: S3Client | undefined
  mutatedAt: Date | undefined
}

export const initialData: ApplicationState = {
  s3credentials: {
    apiKey: undefined,
    apiSecret: undefined,
    region: undefined,
    endpoint: undefined,
    bucket: undefined
  },
  backblaze: {
    authorizationToken: '',
    downloadUrl: '',
    s3ApiUrl: ''
  },
  s3client: undefined,
  otherStuff: '',
  mutatedAt: undefined
}

export type ApplicationContextType = [
  ApplicationState,
  React.Dispatch<React.SetStateAction<ApplicationState>>
]

export const ApplicationContext = createContext<ApplicationContextType>(
  Object.create(null)
)
