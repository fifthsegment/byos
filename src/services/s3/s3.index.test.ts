/*
async function initFn() {
  const client: any = new S3Client({
    region: "West",
    credentials: {
      accessKeyId: "a",
      secretAccessKey: "a",
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
*/
