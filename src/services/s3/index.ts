import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  CopyObjectCommandInput,
  CopyObjectCommand,
  HeadObjectCommandInput,
  HeadObjectCommand,
  PutObjectCommandInput,
  PutObjectCommand
  PutBucketCorsCommandInput,
  PutBucketCorsCommand,
  CORSRule,
  PutBucketCorsCommandOutput
} from '@aws-sdk/client-s3'
import { S3Initializer, GetAssetArgs, Asset } from './types'
import 'react-native-url-polyfill/auto'
import 'react-native-get-random-values'
// eslint-disable-next-line
import { v4 as uuidv4 } from 'uuid'
// eslint-disable-next-line
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

export const buildS3Client = (initializationData: S3Initializer): S3Client => {
  const { credentials, region, endpoint } = initializationData

  const client = new S3Client({
    region,
    credentials,
    endpoint,
    bucketEndpoint: false,
    forcePathStyle: true
  })
  client.middlewareStack.add(
    (next, context) => async (args) => {
      // args.request.headers["Custom-Header"] = "value";
      // eslint-disable-next-line
      // @ts-ignore
      // delete args.request.headers["amz-sdk-request"];
      // delete args.request.headers["amz-sdk-invocation-id"];//x-amz-content-sha256
      // delete args.request.headers["x-amz-content-sha256"];
      // args.request.headers["date"] = (new Date()).toUTCString();
      // delete args.request.headers["x-amz-date"];
      // delete args.request.headers["x-amz-user-agent"];
      const result = await next(args)
      return result
    },
    {
      step: 'finalizeRequest',
      name: 'removeHeaders'
    }
  )
  return client
}

export const getAssets: (
  client: S3Client,
  params: GetAssetArgs
) => Promise<Asset[] | undefined> = async (client, params) => {
  const command = new ListObjectsCommand(params)

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
  return [...folders, ...files]
}

export const updateAsset: (
  client: S3Client,
  params: CopyObjectCommandInput
) => Promise<any> = async (client, params) => {
  try {
    const data = await client.send(new CopyObjectCommand(params))
    console.log('updated asset', data)
    return data // For unit tests.
  } catch (err) {
    console.log('Error', err)
  }
}

export const deleteAsset: (
  client: S3Client,
  params: DeleteObjectCommandInput
) => Promise<any> = async (client, params) => {
  try {
    const data = await client.send(new DeleteObjectCommand(params))
    return data // For unit tests.
  } catch (err) {
    console.log('Error', err)
  }
}

export const getAsset: (
  client: S3Client,
  params: GetObjectCommandInput
) => Promise<any> = async (client, params) => {
  const command = new GetObjectCommand(params)

  const response: GetObjectCommandOutput = await client.send(command)
  return response
}

export const getDownloadLink = async (
  s3Client: s3Client,
  params: GetObjectCommandInput
): Promise<string> => {
  const command = new GetObjectCommand(params)
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  return url
}

/* eslint-disable */
export const getAssetV2: (
  client: S3Client,
  params: GetObjectCommandInput
) => Promise<any> = async (client, params) => {
  const command = new GetObjectCommand(params)
  const endpoint = await client.config.endpoint()
  command.middlewareStack.add(
    (next) => async (args: any) => {
      // @ts-ignore
      const { headers, path } = args.request
      const { hostname, protocol } = endpoint
      fetch(`${protocol}//${hostname}/${params.Bucket}${path}`, {
        headers: headers,
      }).then((response) => {
        console.log('Response = ', response)
      })

      return new Promise((_resolve, reject) =>
        reject(new Error('Intentional Failure'))
      )
    },
    {
      step: 'finalizeRequest',
      name: 'rH',
    }
  )
  try {
    await client.send(command)
  } catch (error) { }
  /* eslint-enable */

  /* return new Promise((resolve, reject) => {
    RNFetchBlob.fetch("GET", "http://www.example.com/images/img1.png", {
      Authorization: "Bearer access-token...",
      // more headers  ..
    })
      .then((res) => {
        let status = res.info().status;

        if (status == 200) {
          // the conversion is done in native code
          let base64Str = res.base64();
          // the following conversions are done in js, it's SYNC
          let text = res.text();
          let json = res.json();
        } else {
          // handle other status codes
        }
      })
      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        // error handling
      });
  }) */
}

/* eslint-disable */
export const buildClient = (
  region: string,
  apiKey: string,
  apiSecret: string,
  endpoint: string
) => {
  return buildS3Client({
    region,
    credentials: {
      accessKeyId: apiKey,
      secretAccessKey: apiSecret,
    },
    endpoint,
  })
}

export const uploadFileS3 = async (
  s3Client: S3Client,
  filename: string,
  bucket: string,
  file: File
) => {
  const input = {
    Body: file,
    Key: filename,
    Bucket: bucket,
  } as PutObjectCommandInput
  const cmd = new PutObjectCommand(input)
  const response = await s3Client.send(cmd)
  return response
}

export const checkFileExists = async (
  s3Client: S3Client,
  fileKey: string,
  bucket: string,
) => {
  const input = {
    Key: fileKey,
    Bucket: bucket,
  } as HeadObjectCommandInput
  const cmd = new HeadObjectCommand(input)
  const response = await s3Client.send(cmd)
  return response
}

export const updateCors = async (
  s3Client: S3Client,
  params: PutBucketCorsCommandInput
): Promise<PutBucketCorsCommandOutput> => {
  const rule: CORSRule = {
    ID: 'allaccess',
    AllowedHeaders: [''],
    AllowedMethods: [''],
    AllowedOrigins: [''],
    MaxAgeSeconds: 3600,
    ExposeHeaders: ['x-bz-content-sha1']
  }
  params.CORSConfiguration.CORSRules.push(rule)
  const command = new PutBucketCorsCommand(params)

  const response: PutBucketCorsCommandOutput = await s3Client.send(command)
  return response
}
