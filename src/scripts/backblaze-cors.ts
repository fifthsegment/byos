const B2 = require('backblaze-b2')
const axios = require('axios')

export const getBaseUrl = (): string => 'https://api.backblazeb2.com/b2api/v2/'

export const getAuthorizationToken = (key: string, secret: string): string => {
  return btoa(`${key}:${secret}`)
}

export interface authorizationType {
  [key: string]: string
}

export const authorizeAccount = async (
  authorizationToken: string
): Promise<{ [key: string]: any }> => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${getBaseUrl()}b2_authorize_account`,
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${authorizationToken}`,
      },
    })
    return response.data
  } catch (error) {
    return null
  }
}

export const updateBucket = async (
  url,
  authorizationToken: string,
  data
): Promise<{ [key: string]: any }> => {
  const genurl = `${url}/b2api/v2/b2_update_bucket`
  console.log('Calling url = ', genurl)
  const response = await axios({
    method: 'post',
    url: genurl,
    data: data,
    headers: {
      Accept: 'application/json',
      Authorization: `${authorizationToken}`,
    },
  })
  return response.data
}

export const listBuckets = async (
  url,
  accountId: string,
  authorizationToken: string
): Promise<{ [key: string]: any }> => {
  const genurl = `${getBaseUrl()}b2_list_buckets`
  console.log('Calling url = ', genurl)
  const response = await axios({
    method: 'post',
    url: genurl,
    data: {
      accountId,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authorizationToken}`,
    },
  })
  return response.data
}

export const listBuckets2 = async (key, secret, bucket) => {
  const b2 = new B2({
    applicationKeyId: key, // or accountId: 'accountId'
    applicationKey: secret, // or masterApplicationKey
  })

  async function GetBucket() {
    try {
      await b2.authorize() // must authorize first (authorization lasts 24 hrs)
      let response = await b2.getBucket({ bucketName: bucket })
      return response.data
    } catch (err) {
      console.log('Error getting bucket:', err)
      return null
    }
  }
  return await GetBucket()
}

export const updateCors = (key: string, secret: string, bucket: string) => {
  async function GetBucket() {
    try {
      const token = getAuthorizationToken(key, secret)
      const authorized = await authorizeAccount(token) // must authorize first (authorization lasts 24 hrs)
      const bucketData = await listBuckets2(key, secret, bucket)
      console.log('bucketData', bucketData)
      const bucketId = bucketData.buckets[0].bucketId
      const bucketUpdateData = {
        accountId: authorized.accountId,
        bucketId: bucketId,
        corsRules: [
          {
            corsRuleName: 'allAccessbyos',
            allowedOrigins: ['*'],
            allowedHeaders: ['*'],
            allowedOperations: [
              's3_delete',
              's3_get',
              's3_head',
              's3_post',
              's3_put',
            ],
            exposeHeaders: ['x-bz-content-sha1'],
            maxAgeSeconds: 3600,
          },
        ],
      }
      const bucketUpdateResponse = await updateBucket(
        authorized.apiUrl,
        authorized.authorizationToken,
        bucketUpdateData
      )
      console.debug(bucketUpdateResponse)
      return bucketUpdateResponse
    } catch (err) {
      console.error('Error :', err.response.data)
      return null
    }
  }

  GetBucket()
}

updateCors(process.env.KEY, process.env.SECRET, process.env.BUCKET)
