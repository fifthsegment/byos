
/* eslint-disable */
import { DeleteObjectsCommand, DeleteObjectsCommandInput, ListObjectsV2Command, ListObjectsV2CommandInput, S3Client } from '@aws-sdk/client-s3'
import { Asset } from '../services/types'

const getInfiniteAssets = async (client: S3Client, folder: Asset, params: ListObjectsV2CommandInput): Promise<any[]> => {
    return new Promise(async (resolve) => {
        const command = new ListObjectsV2Command({ ...params })
        const response = await client.send(command)
        if (response.NextContinuationToken) {
            const data = await getInfiniteAssets(client, folder, { ...params, ContinuationToken: response.NextContinuationToken })
            resolve([...response.Contents, ...data])
        } else {
            resolve([...response.Contents])
        }
    })
}

export const deleteMultipleAssets = async (client: S3Client, bucket: string, assets: Asset[]): Promise<any> => {
    return await new Promise(async (resolve,) => {
        const folders = assets.filter(asset => asset.isFolder);
        const files = assets.filter(asset => !asset.isFolder);
        const params: ListObjectsV2CommandInput = {
            Bucket: bucket,
        }
        const allFolderAssets = await Promise.all(folders.map(async (folder): Promise<any> => {
            const folderAssets = await getInfiniteAssets(client, folder, { ...params, Prefix: folder.key });
            return folderAssets;
        }))
        const allAssets = [...allFolderAssets.flat(), ...files]
        const deleteParams: DeleteObjectsCommandInput = {
            Bucket: bucket,
            Delete: { Objects: allAssets.map(item => ({ Key: item.Key || item.key })) }
        }
        const command = new DeleteObjectsCommand(deleteParams)
        const response = await client.send(command)
        resolve(response)
    })
}
