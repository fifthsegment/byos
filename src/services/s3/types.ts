export type S3Credentials = {
    accessKeyId: string
    secretAccessKey: string
}

export type S3Initializer = {
    region: string
    credentials: S3Credentials
    endpoint: string
}

export type Asset = {
    prefix: string | undefined,
    etag: string,
    name: string | undefined
    size: number | undefined
    lastModified: Date | undefined
}

export type GetAssetArgs = {
    Bucket: string
    Delimiter?: string // e.g /
    Prefix?: string // e.g 'foldername/'
}
