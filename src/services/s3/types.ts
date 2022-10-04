export type S3Credentials = {
  accessKeyId: string;
  secretAccessKey: string;
};

export type S3Initializer = {
  region: string;
  credentials: S3Credentials;
  endpoint: string;
};
