import { useEffect, useState } from 'react'
import { Dimensions, EmitterSubscription } from 'react-native'
import { getScreenType, ScreenType } from './constants'

const window = Dimensions.get('window')
const screenType: ScreenType = getScreenType(window.width)

export const useScreenSize = (): string => {
  const [dimensions, setDimensions] = useState<ScreenType>(screenType)

  useEffect(() => {
    const subscription: EmitterSubscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        const screenType: ScreenType = getScreenType(window.width)
        setDimensions(screenType)
      }
    )
    return () => subscription?.remove()
  }, [])

  return dimensions
}
