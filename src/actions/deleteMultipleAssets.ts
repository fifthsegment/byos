import { Asset } from '../services/types'

export const deleteMultipleAssets = async (assets: Asset[]): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    resolve(true)
  })
}
