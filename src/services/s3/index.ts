import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { S3Initializer, GetAssetArgs, Asset } from './types'
import * as dayjs from 'dayjs'


export const buildS3Client = (initializationData: S3Initializer) => {
    const { credentials, region, endpoint } = initializationData
    const client = new S3Client({
        region: region,
        credentials: credentials,
        endpoint: endpoint,
    })
    return client
}

export const getAssets: (
    client: S3Client,
    params: GetAssetArgs
) => Promise<Asset[] | undefined> = async (client, params) => {
    client.config.logger = console;
    const command = new ListObjectsCommand(params)

    command.middlewareStack.add((next, context) => async (args) => {
        console.log(args.request);
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
        tags: ["METADATA", "FOO"],
    })
    const response = await client.send(command)
    return response.Contents?.map((item) => {
        return {
            name: item?.ETag,
            lastModified: item?.LastModified,
        } as Asset
    })
}

export const deleteAsset: (assetId: string) => void = (_assetId) => {
    /**
     * Implementation here
     */
}
