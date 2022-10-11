export interface S3Credentials {
  accessKeyId: string
  secretAccessKey: string
}

export interface S3Initializer {
  region: string
  credentials: S3Credentials
  endpoint: string
}

export interface Asset {
  prefix: string | undefined
  etag: string | undefined
  name: string | undefined
  size: number | undefined
  lastModified: Date | undefined
}

export interface GetAssetArgs {
  Bucket: string
  Delimiter?: string // e.g /
  Prefix?: string // e.g 'foldername/'
}
