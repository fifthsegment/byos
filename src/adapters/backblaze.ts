export const BackblazeB2AuthToLocalAdapter = (backblazeData: {
  [key: string]: string
}): BackblazeB2Config => {
  return {
    authorizationToken: backblazeData.authorizationToken,
    downloadUrl: backblazeData.downloadUrl,
    s3ApiUrl: backblazeData.s3ApiUrl,
    updatedAt: new Date()
  }
}
