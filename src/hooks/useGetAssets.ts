import { S3Client } from '@aws-sdk/client-s3'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { S3TypeToInternalAdapter } from '../adapters/s3'
import { getAssets } from '../services/s3'
import { GetAssetArgs } from '../services/s3/types'
import { Asset } from '../services/types'

export const useGetAssets = (
  client: S3Client,
  clientInitialized: boolean,
  params: GetAssetArgs,
  rerun: string = '',
  mutatedAt: Date | undefined
): UseQueryResult<Asset[], unknown> => {
  const queryResponse = useQuery(
    [
      'getAssets',
      rerun,
      params.Bucket || '',
      params.Delimiter || '',
      params.Prefix || '',
      mutatedAt || ''
    ],
    async () => {
      try {
        const data = await getAssets(client, params)
        const assets = S3TypeToInternalAdapter(data, params)
        return assets
      } catch (error) {
        console.log('[useGetAssets] Error : ', error)
      }
      return []
    },
    {
      enabled: clientInitialized,
      refetchOnWindowFocus: false
    }
  )
  return queryResponse
}
