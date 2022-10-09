import { S3Client } from '@aws-sdk/client-s3';
import { useQuery } from '@tanstack/react-query'
import { S3TypeToInternalAdapter } from '../adapters/s3';
import { getAssets } from '../services/s3';
import { GetAssetArgs } from '../services/s3/types';

export const useGetAssets = (client: S3Client, params: GetAssetArgs, rerun: string = "") => {
    const queryResponse = useQuery(['getAssets', rerun, params.Bucket || "", params.Delimiter || "", params.Prefix || ""], async () => {
        try {
            console.log("[useGetAssets] Getting data ")
            const data = await getAssets(client, params)
            const assets = S3TypeToInternalAdapter(data);
            return assets;
        } catch (error) {
            console.log("[useGetAssets] Error : ", error)
        }
        return []
    })
    return queryResponse;
}
