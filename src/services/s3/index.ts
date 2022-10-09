import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { S3Initializer, GetAssetArgs, Asset } from './types'


export const buildS3Client = (initializationData: S3Initializer) => {
    const { credentials, region, endpoint } = initializationData
    const client = new S3Client({
        region: region,
        credentials: credentials,
        endpoint: endpoint,
    })
    client.middlewareStack.add((next, context) => async (args) => {
        //args.request.headers["Custom-Header"] = "value";
        //eslint-disable-next-line
        // @ts-ignore
        //delete args.request.headers["amz-sdk-request"];
        // @ts-ignore
        //delete args.request.headers["amz-sdk-invocation-id"];//x-amz-content-sha256
        // @ts-ignore
        //delete args.request.headers["x-amz-content-sha256"];
        // @ts-ignore
        //args.request.headers["date"] = (new Date()).toUTCString();
        // @ts-ignore
        //delete args.request.headers["x-amz-date"];
        // @ts-ignore
        //delete args.request.headers["x-amz-user-agent"];
        // @ts-ignore
        const result = await next(args);
        return result;
    }, {
        step: "finalizeRequest",
        name: "removeHeaders",
    })
    return client
}

export const getAssets: (
    client: S3Client,
    params: GetAssetArgs
) => Promise<Asset[] | undefined> = async (client, params) => {
    const command = new ListObjectsCommand(params)
    const response = await client.send(command)
    return response.Contents?.map((item) => {
        return {
            etag: item.ETag,
            name: item?.Key,
            lastModified: item?.LastModified,
            size: item?.Size
        } as Asset
    }) || []
}

export const deleteAsset: (assetId: string) => void = (_assetId) => {
    /**
     * Implementation here
     */
}
