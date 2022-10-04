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
    name: string
    lastModified: number
}

export type GetAssetArgs = {
    Bucket: string
    Delimiter: string // e.g /
    Prefix: string // e.g 'foldername/'
}
