import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'
import { S3Initializer, GetAssetArgs, Asset } from './types'
import 'react-native-url-polyfill/auto'
import 'react-native-get-random-values'
// eslint-disable-next-line
import { v4 as uuidv4 } from 'uuid'

export const buildS3Client = (initializationData: S3Initializer): S3Client => {
  const { credentials, region, endpoint } = initializationData
  const client = new S3Client({
    region,
    credentials,
    endpoint
  })
  client.middlewareStack.add(
    (next, context) => async (args) => {
      // args.request.headers["Custom-Header"] = "value";
      // eslint-disable-next-line
            // @ts-ignore
      // delete args.request.headers["amz-sdk-request"];
      // delete args.request.headers["amz-sdk-invocation-id"];//x-amz-content-sha256
      // delete args.request.headers["x-amz-content-sha256"];
      // args.request.headers["date"] = (new Date()).toUTCString();
      // delete args.request.headers["x-amz-date"];
      // delete args.request.headers["x-amz-user-agent"];
      const result = await next(args)
      return result
    },
    {
      step: 'finalizeRequest',
      name: 'removeHeaders'
    }
  )
  return client
}

export const getAssets: (
  client: S3Client,
  params: GetAssetArgs
) => Promise<Asset[] | undefined> = async (client, params) => {
  const command = new ListObjectsCommand(params)

  const response = await client.send(command)
  const folders: Asset[] =
        (((response.CommonPrefixes?.map((item) => {
          return {
            prefix: item.Prefix,
            etag: undefined,
            name: item.Prefix,
            lastModified: undefined,
            size: 0
          }
        })))) || []
  const files: Asset[] =
        (((response.Contents?.map((item) => {
          return {
            prefix: '',
            etag: item.ETag,
            name: item?.Key,
            lastModified: item?.LastModified,
            size: item?.Size
          }
        })))) || []
  return [...folders, ...files]
}

export const deleteAsset: (assetId: string) => void = (_assetId) => {
  /**
     * Implementation here
     */
}
