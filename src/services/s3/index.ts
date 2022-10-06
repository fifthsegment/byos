import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import * as AWS from '@aws-sdk/client-s3'
import { S3Initializer, GetAssetArgs, Asset } from './types'
//const { S3Client, AbortMultipartUploadCommand } = require('@aws-sdk/client-s3')

class S3VirtualClient {
    constructor() {
        const client = new S3Client({ region: 'REGION' })
        return client
    }
}

export const buildS3Client = (initializationData: S3Initializer) => {
    /* tslint:disable */
    console.log('Attempting to create a S3 Client')
    // @ts-ignore:
    const client = new AWS.S3({ region: 'REGION' })
    console.log('After client ', client)
    /* tslint:enable */
    const { credentials, region, endpoint } = initializationData
    /*console.log('Attempting to create a S3 Client')
    const client = new S3Client({
        region: region,
        credentials: credentials,
        endpoint: endpoint,
    })
    console.log('s3client creation result = ', client)*/
    //return client
}

/*export const getAssets: (
    client: S3Client,
    params: GetAssetArgs
) => Promise<Asset[] | undefined> = async (client, params) => {
    const command = new ListObjectsV2Command(params)
    const response = await client.send(command)
    return response.Contents?.map((item) => {
        return {
            name: item?.ETag,
            lastModified: item?.LastModified,
        } as Asset
    })
}*/

export const deleteAsset: (assetId: string) => void = (_assetId) => {
    /**
     * Implementation here
     */
}
