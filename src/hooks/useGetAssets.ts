import { S3Client } from '@aws-sdk/client-s3';
import { useQuery } from '@tanstack/react-query'
import { getAssets } from '../services/s3';
import { GetAssetArgs } from '../services/s3/types';

export const useGetAssets = (client: S3Client, params: GetAssetArgs) => {
    const queryResponse = useQuery(['getAssets', params.Bucket || "", params.Delimiter || "", params.Prefix || ""], () =>
        getAssets(client, params)
    )
    return queryResponse;
}
export { }