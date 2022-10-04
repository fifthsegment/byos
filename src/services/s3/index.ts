import { Asset } from "./types";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
var AWS = require("aws-sdk");
var uuid = require("node-uuid");

export const init = (initializationData: S3Initializer) => {
  const { credentials, region, endpoint } = initializationData;
  const client: any = new S3Client({
    region: region,
    credentials: credentials,
    endpoint: endpoint,
  });
  return client;
};

export const getAssets: (client: any, directoryId: string) => Asset[] = async (
  _directoryId
) => {
  const params = {
    Bucket: "Bucket_Name",
    Delimiter: "/",
    Prefix: "foldername/",
  };
  const command = new ListObjectsV2Command(params);
  const response = await client.send(command);
  return [];
};

export const deleteAsset: (assetId: string) => void = (_assetId) => {
  /**
   * Implementation here
   */
};
