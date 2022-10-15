import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  EmitterSubscription
} from 'react-native'
import React, { useState, useEffect } from 'react'

export type ScreenType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface BlockType {
  hidden?: ScreenType[]
}

const getScreenType = (px: number): ScreenType => {
  if (px < 576) {
    return 'xs'
  } else if (px >= 576 && px < 768) {
    return 'md'
  } else if (px >= 768 && px < 992) {
    return 'lg'
  } else if (px >= 992 && px < 1200) {
    return 'xl'
  } else if (px >= 1200) {
    return 'xxl'
  }
}

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')
const screenType: ScreenType = getScreenType(window.width)
export const Block = ({
  hidden,
  children
}: React.PropsWithChildren<BlockType>): JSX.Element => {
  const [dimensions, setDimensions] = useState({ window, screen, screenType })
  useEffect(() => {
    const subscription: EmitterSubscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        const screenType: ScreenType = getScreenType(window.width)
        setDimensions({ window, screen, screenType })
      }
    )
    return () => subscription?.remove()
  }, [])

  /**
   * A simple function to debug the current dimensions
   * @returns
   */
  // eslint-disable-next-line
  const getDebug: React.FC = () => (
    <>
      <Text>Current type: {dimensions.screenType}</Text>
      <Text style={styles.header}>Window Dimensions</Text>
      {Object.entries(dimensions.window).map(([key, value]) => (
        <Text key={key}>
          {key} - {value}
        </Text>
      ))}
      <Text style={styles.header}>Screen Dimensions</Text>
      {Object.entries(dimensions.screen).map(([key, value]) => (
        <Text key={key}>
          {key} - {value}
        </Text>
      ))}
    </>
  )

  const hideContent = hidden ? hidden.includes(dimensions.screenType) : false

  return <>{!hideContent && <View>{children}</View>}</>
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    marginVertical: 10
  }
})
