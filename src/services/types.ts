export interface Asset {
  fileName: string
  createdAt?: string
  updatedAt?: Date
  assetId: string
  fileType?: string
  fileSize?: number
  isFolder: boolean
  prefix?: string
  etag?: string
  key?: string
}

export interface BackblazeB2Config {
  authorizationToken: string | undefined
  downloadUrl: string | undefined
  s3ApiUrl: string | undefined
  updatedAt: Date | undefined
}
