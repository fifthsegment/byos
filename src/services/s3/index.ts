import { Asset } from "./types";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
var AWS = require("aws-sdk");
var uuid = require("node-uuid");

async function initFn() {
  const client: any = new S3Client({
    region: "West",
    credentials: {
      accessKeyId: "a",
      secretAccessKey: "a",
      expiration: new Date(),
    },
    endpoint: "https://s3.us-west-002.backblazeb2.com",
  });
  const params = {
    Bucket: "Bucket_Name",
    Delimiter: "/",
    Prefix: "foldername/",
  };
  const command = new ListObjectsV2Command(params);
  const response = await client.send(command);
}

export const getAssets: (directoryId: string) => Asset[] = (_directoryId) => {
  /**
   * Implementation here
   */
  return [];
};

export const deleteAsset: (assetId: string) => void = (_assetId) => {
  /**
   * Implementation here
   */
};

export const init = initFn;
