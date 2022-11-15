import { DeleteObjectsCommand, S3Client } from '@aws-sdk/client-s3'
import { Asset } from '../services/types'

export const deleteAssets = async (
  s3client: S3Client,
  bucket: string,
  assets: Asset[]
): Promise<void> => {
  const folders = assets.filter((item) => item.isFolder)
  // const files = assets.filter((item) => !item.isFolder)
  /* let itemsToDelete = []
  if (folders.length > 0) {
    for (let i = 0; i < folders.length; i++) {
      const command = new ListObjectsCommand({
        Bucket: bucket,
        Prefix: folders[i].prefix,
      })
      const output = await s3client.send(command)
      itemsToDelete = [...itemsToDelete, ...output.Contents]
    }
  } */
  const command = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: { Objects: folders.map((item) => ({ Key: item.key })) }
  })
  const output = await s3client.send(command)
  console.log('Output = ', output)
  // console.log('Items to delete = ', itemsToDelete, 'Files = ', files)
}
