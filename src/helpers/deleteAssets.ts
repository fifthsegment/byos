import { S3Client } from '@aws-sdk/client-s3'
import { Asset } from '../services/types'

export const deleteAssets = async (
  s3client: S3Client,
  assets: Asset[]
): Promise<void> => {}
