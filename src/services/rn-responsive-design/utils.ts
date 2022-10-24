import { Dimensions } from 'react-native'
import { getScreenType } from './constants'

export const isMobile = (): boolean => {
  const window = Dimensions.get('window')
  return ['xs'].includes(getScreenType(window.width))
}
