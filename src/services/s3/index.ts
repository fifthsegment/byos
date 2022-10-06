import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { S3Initializer, GetAssetArgs, Asset } from './types'

export const buildS3Client = (initializationData: S3Initializer) => {
    const { credentials, region, endpoint } = initializationData
    const client = new S3Client({
        region: region,
        credentials: credentials,
        endpoint: endpoint,
    })
    return client
}

export const getAssets: (
    client: S3Client,
    params: GetAssetArgs
) => Promise<Asset[] | undefined> = async (client, params) => {
    const command = new ListObjectsCommand({ Bucket: "testingbyos" })
    const response = await client.send(command)
    return response.Contents?.map((item) => {
        return {
            name: item?.ETag,
            lastModified: item?.LastModified,
        } as Asset
    })
}

export const deleteAsset: (assetId: string) => void = (_assetId) => {
    /**
     * Implementation here
     */
}
