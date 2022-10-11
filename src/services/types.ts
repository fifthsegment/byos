export interface Asset {
  fileName: string
  createdAt?: string
  updatedAt?: Date
  assetId: string
  fileType?: string
  fileSize?: number
  isFolder: boolean
  prefix?: string
}
