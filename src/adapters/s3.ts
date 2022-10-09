import { Asset } from "../services/s3/types";
import { Asset as AppAssetType } from "../services/types"
export const S3TypeToInternalAdapter = (assets: Asset[]) => {
    return assets.map((asset: Asset) => {
        return {
            assetId: asset.etag,
            fileName: asset.name,
            fileSize: asset.size,
            updatedAt: asset.lastModified
        } as AppAssetType
    })
}