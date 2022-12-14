import { ListObjectsV2Command, ListObjectsV2CommandInput, ListObjectsV2CommandOutput, S3Client } from '@aws-sdk/client-s3'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { Asset } from '../services/s3/types'

export interface Returns {
  assets: Asset[]
  response: ListObjectsV2CommandOutput
}

export const useGetInfiniteAssets = (
  client: S3Client,
  params: ListObjectsV2CommandInput,
  enabled: boolean

): UseInfiniteQueryResult<Returns, unknown> => {
  const queryResponse = useInfiniteQuery(
    ['infiniteAssets'],
    async ({ pageParam }: any) => {
      const command = new ListObjectsV2Command({ ...params, ContinuationToken: pageParam })
      const response = await client.send(command)
      const folders: Asset[] =
                response.CommonPrefixes?.map((item) => {
                  return {
                    prefix: item.Prefix,
                    etag: undefined,
                    name: item.Prefix,
                    lastModified: undefined,
                    size: 0,
                    key: item.Prefix
                  }
                }) || []
      const files: Asset[] =
                response.Contents?.map((item) => {
                  return {
                    prefix: '',
                    etag: item.ETag,
                    name: item?.Key,
                    lastModified: item?.LastModified,
                    size: item?.Size,
                    key: item.Key
                  }
                }) || []
      const assets = [...folders, ...files]
      return { assets, response }
    }
    , {
      enabled,
      getNextPageParam: (lastPage) => lastPage.response.NextContinuationToken
    })
  return queryResponse
}
