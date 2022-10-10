import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { S3Initializer, GetAssetArgs, Asset } from './types'
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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
    console.log("[s3:getAssets] Making a List Objects command")
    const command = new ListObjectsCommand(params)
    console.log("[s3:getAssets] Command ", command)
    console.log("[s3:getAssets] Our s3 Client", client)
    console.log("[s3:getAssets] Sending command using client.send")

    const response = await client.send(command)
    const folders = response.CommonPrefixes?.map((item) => {
        return {
            prefix: item.Prefix,
            etag: undefined,
            name: item.Prefix,
            lastModified: undefined,
            size: 0
        } as Asset
    }) || []
    const files = response.Contents?.map((item) => {
        return {
            etag: item.ETag,
            name: item?.Key,
            lastModified: item?.LastModified,
            size: item?.Size
        } as Asset
    }) || []
    return [...folders, ...files].splice(0, 30);
}

export const deleteAsset: (assetId: string) => void = (_assetId) => {
    /**
     * Implementation here
     */
}
