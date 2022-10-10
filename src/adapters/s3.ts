import { Asset, GetAssetArgs } from "../services/s3/types";
import { Asset as AppAssetType } from "../services/types"
export const S3TypeToInternalAdapter = (assets: Asset[], params: GetAssetArgs) => {
    return assets.map((asset: Asset) => {
        const fileName = asset.name.replace(params.Prefix, "");
        return {
            assetId: asset.etag,
            fileName,
            fileSize: asset.size,
            updatedAt: asset.lastModified,
            isFolder: asset.prefix?.length > 0,
            prefix: asset.prefix
        } as AppAssetType
    })
}